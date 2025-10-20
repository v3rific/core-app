"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { usePublicClient } from "wagmi";
import { sepolia } from "wagmi/chains";
import type { BaseError } from "viem";
import { FaSearch } from "react-icons/fa";
import { Navbar } from "../navbar";
import { Header } from "../header";
import { SearchUnithash } from "./components/SearchUnithash";
import { v3rificAbi } from "@/lib/abi/v3rific";
import { producerRegistryAbi } from "@/lib/abi/producerRegistry";
import { resolveIpfsUrl } from "@/lib/utils/ipfs";

const registryAddress = (process.env.NEXT_PUBLIC_PRODUCER_REGISTRY_CONTRACT ??
  "0xa9ac835cF754793e9af5c9F3CE7c126b2aa165b6") as `0x${string}`;

const v3rificAddress = (process.env.NEXT_PUBLIC_V3RIFIC_CONTRACT ??
  "0xbe50a60c2207E7B3d094d7Fcc73EDD0068734e69") as `0x${string}`;

type SearchStatus = "idle" | "loading" | "found" | "not_found" | "error";

type RegistryProducer = {
  name: string;
  description: string;
  website: string;
  contact: string;
  country: string;
  registered: boolean;
  verified: boolean;
  registeredAt: bigint;
  admin: `0x${string}`;
};

type ContractProduct = {
  tokenId: bigint;
  cid: string;
  unitshash: string;
  producer: `0x${string}`;
  claimEnabled: boolean;
  revoked: boolean;
  mintedAt: bigint;
};

type MetadataProducer = {
  address: string;
  name: string;
  verified: boolean;
};

type SearchPayload = {
  unitshash: string;
  cid: string;
  metadataDisplay: Record<string, unknown>;
  metadataRaw: Record<string, unknown>;
  metadataUrl: string;
  imageUrl?: string;
  minted: {
    tokenId: string;
    mintedAtIso?: string;
    mintedAtDisplay: string;
    revoked: boolean;
  };
  producer: {
    name: string;
    description: string;
    website: string;
    contact: string;
    country: string;
    verified: boolean;
    admin: string;
  };
  warnings: string[];
};

type SearchViewProps = {
  initialUnitshash?: string;
};

export function SearchView({ initialUnitshash }: SearchViewProps) {
  const normalizedInitial = initialUnitshash?.toLowerCase() ?? null;
  const router = useRouter();
  const publicClient = usePublicClient({ chainId: sepolia.id });

  const [searchQuery, setSearchQuery] = useState(normalizedInitial ?? "");
  const [status, setStatus] = useState<SearchStatus>(normalizedInitial ? "loading" : "idle");
  const [result, setResult] = useState<SearchPayload | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [metadataWarning, setMetadataWarning] = useState<string | null>(null);

  const performSearch = useCallback(
    async (rawHash: string) => {
      const candidate = normalizeUnitshash(rawHash);

      if (!candidate) {
        setStatus("idle");
        setErrorMessage("Unitshash wajib diisi.");
        return;
      }

      const validationError = validateUnitshash(candidate);
      if (validationError) {
        setStatus("idle");
        setErrorMessage(validationError);
        return;
      }

      if (!publicClient) {
        setStatus("error");
        setErrorMessage("Public client belum tersedia. Pastikan provider Wagmi tersetup.");
        return;
      }

      setStatus("loading");
      setErrorMessage(null);
      setMetadataWarning(null);
      setResult(null);
      setSearchQuery(candidate);

      try {
        const product = (await publicClient.readContract({
          address: v3rificAddress,
          abi: v3rificAbi,
          functionName: "getByUnitshash",
          args: [candidate],
        })) as ContractProduct;

        const producerProfile = (await publicClient.readContract({
          address: registryAddress,
          abi: producerRegistryAbi,
          functionName: "getProducer",
          args: [product.producer],
        })) as RegistryProducer;

        let metadata: Record<string, unknown> = {};
        let warning: string | null = null;

        try {
          metadata = await fetchMetadata(product.cid);
        } catch (error) {
          warning = error instanceof Error ? error.message : "Metadata tidak dapat diambil.";
        }

        const display = buildMetadataDisplay(metadata, product, producerProfile);

        const mintedAtMs = Number(product.mintedAt) ? Number(product.mintedAt) * 1000 : 0;
        const mintedAtIso = mintedAtMs ? new Date(mintedAtMs).toISOString() : undefined;
        const mintedAtDisplay = mintedAtMs
          ? new Date(mintedAtMs).toLocaleString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
          : "N/A";

        const metadataUrl = resolveIpfsUrl(product.cid);
        const imageSource = (display.raw["image"] ?? display.ordered["image"]) as string | undefined;
        const imageUrl = typeof imageSource === "string" ? resolveIpfsUrl(imageSource) : undefined;

        setResult({
          unitshash: product.unitshash,
          cid: product.cid,
          metadataDisplay: display.ordered,
          metadataRaw: display.raw,
          metadataUrl,
          imageUrl,
          minted: {
            tokenId: product.tokenId.toString(),
            mintedAtIso,
            mintedAtDisplay,
            revoked: product.revoked,
          },
          producer: {
            name: producerProfile.name,
            description: producerProfile.description,
            website: producerProfile.website,
            contact: producerProfile.contact,
            country: producerProfile.country,
            verified: producerProfile.verified,
            admin: producerProfile.admin,
          },
          warnings: warning ? [warning] : [],
        });

        if (warning) {
          setMetadataWarning(warning);
        }

        setStatus("found");
      } catch (error) {
        if (isProductNotFoundError(error)) {
          setStatus("not_found");
          setErrorMessage(null);
        } else {
          setStatus("error");
          setErrorMessage(parseError(error));
        }
      }
    },
    [publicClient]
  );

  useEffect(() => {
    if (normalizedInitial) {
      void performSearch(normalizedInitial);
    }
  }, [normalizedInitial, performSearch]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const candidate = normalizeUnitshash(searchQuery);
    const validationError = validateUnitshash(candidate);

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    if (candidate === normalizedInitial) {
      void performSearch(candidate);
      return;
    }

    router.push(`/search/${candidate}`);
  };

  const resetSearch = () => {
    setSearchQuery("");
    setStatus("idle");
    setResult(null);
    setErrorMessage(null);
    setMetadataWarning(null);
    if (normalizedInitial) {
      router.push("/search");
    }
  };

  const idleTip = useMemo(
    () => ({
      title: "Enter your unitshash to begin verification",
      hint: 'Example format: "preview00" or "abc12345". Length 8-10 lowercase alphanumeric.',
    }),
    []
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black text-slate-100">
      <Navbar />

      <Header />

      <SearchUnithash
        onSearch={handleSubmit}
        searchResult={status}
        searchQuery={searchQuery}
        searching={status}
        setSearchQuery={setSearchQuery}
        errorMessage={errorMessage}
      />

      <div className="mx-auto w-full max-w-4xl px-6 pb-16">
        {status === "idle" && (
          <section className="rounded-2xl border border-white/10 bg-white/5 py-16 text-center text-slate-400 backdrop-blur-sm">
            <FaSearch className="mx-auto mb-4 h-16 w-16 text-slate-500" />
            <p className="text-lg">{idleTip.title}</p>
            <p className="mt-2 text-sm text-slate-500">{idleTip.hint}</p>
          </section>
        )}

        {status === "loading" && (
          <section className="rounded-2xl border border-white/10 bg-white/5 py-16 text-center backdrop-blur-sm">
            <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            <p className="text-lg text-slate-300">Verifying on-chain and fetching IPFS metadata…</p>
            <p className="mt-2 text-sm text-slate-500">Please wait</p>
          </section>
        )}

        {status === "found" && result && (
          <section className="space-y-6">
            <header>
              <h2 className="text-2xl font-semibold text-white">Verification Result</h2>
              <p className="text-sm text-slate-400">
                Data dibuat otomatis dari kontrak V3rific dan metadata IPFS yang sudah di-pin.
              </p>
            </header>

            <div className="grid gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 md:grid-cols-[2fr,1fr]">
              <div className="space-y-6">
                <div className="flex flex-col gap-6 md:flex-row">
                  {result.imageUrl ? (
                    <img
                      src={result.imageUrl}
                      alt={String(result.metadataDisplay["name"] ?? "Product image")}
                      className="h-48 w-full rounded-xl object-cover md:h-56 md:w-48"
                    />
                  ) : (
                    <div className="flex h-48 w-full items-center justify-center rounded-xl border border-dashed border-white/10 text-sm text-slate-500 md:h-56 md:w-48">
                      No image metadata
                    </div>
                  )}

                  <div className="flex-1 space-y-4">
                    <div>
                      <span className="text-xs uppercase tracking-wide text-slate-400">Product name</span>
                      <p className="text-lg font-semibold text-white">
                        {String(result.metadataDisplay["name"] ?? "Untitled product")}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <InfoItem label="Unitshash" value={result.unitshash.toUpperCase()} />
                      <InfoItem label="Token ID" value={`#${result.minted.tokenId}`} />
                      <InfoItem
                        label="Minted at"
                        value={result.minted.mintedAtDisplay}
                        tooltip={result.minted.mintedAtIso}
                      />
                      <InfoItem
                        label="CID"
                        value={
                          <a
                            href={result.metadataUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="truncate text-indigo-300 hover:underline"
                          >
                            {result.cid}
                          </a>
                        }
                      />
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wide text-slate-400">Producer</span>
                      <p className="text-sm text-slate-300">
                        {result.producer.name || "Unregistered producer"}{" "}
                        <span className={result.producer.verified ? "text-emerald-400" : "text-amber-400"}>
                          ({result.producer.verified ? "verified" : "pending"})
                        </span>
                      </p>
                      <p className="text-xs text-slate-500">
                        Admin:{" "}
                        <span className="font-mono text-indigo-200">
                          {result.producer.admin
                            ? `${result.producer.admin.slice(0, 6)}…${result.producer.admin.slice(-4)}`
                            : "N/A"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {result.producer.description && (
                  <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
                    <span className="text-xs uppercase tracking-wide text-slate-400">Producer statement</span>
                    <p className="mt-2 text-sm text-slate-200">{result.producer.description}</p>
                    <div className="mt-3 grid grid-cols-1 gap-2 text-xs text-slate-400 sm:grid-cols-3">
                      <span>Website: {result.producer.website || "N/A"}</span>
                      <span>Contact: {result.producer.contact || "N/A"}</span>
                      <span>Country: {result.producer.country || "N/A"}</span>
                    </div>
                  </div>
                )}
              </div>

              <aside className="space-y-4 rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-sm text-slate-300">
                <h3 className="text-lg font-semibold text-white">On-chain state</h3>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li>Minted on Sepolia network via V3rific contract.</li>
                  <li>Metadata pinned to IPFS and resolved through configured gateway.</li>
                  <li>Ownership claim toggle is disabled (minted as non-claimable token).</li>
                </ul>
                {result.minted.revoked && (
                  <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-200">
                    Warning: Product has been revoked by producer.
                  </div>
                )}
                {metadataWarning && (
                  <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-200">
                    Metadata warning: {metadataWarning}
                  </div>
                )}
              </aside>
            </div>

            <div className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Metadata snapshot</h3>
                <span className="text-xs text-slate-500">JSON persisted on IPFS</span>
              </div>
              <pre className="max-h-[420px] overflow-auto rounded-xl border border-white/10 bg-slate-950 p-4 text-xs leading-relaxed text-slate-100">
                {JSON.stringify(result.metadataDisplay, null, 2)}
              </pre>
              <p className="text-xs text-slate-500">
                Metadata disusun ulang mengikuti struktur terbaru: nama, deskripsi, SKU, batch, unitshash, atribut, dan cap waktu.
              </p>
            </div>

            <button
              onClick={resetSearch}
              className="rounded-lg bg-slate-700 px-6 py-2 text-sm font-semibold text-white transition hover:bg-slate-600"
            >
              Search again
            </button>
          </section>
        )}

        {status === "not_found" && (
          <section className="rounded-2xl border border-rose-500/20 bg-rose-500/10 py-16 text-center backdrop-blur-sm">
            <p className="text-xl text-rose-200">No product found for this unitshash.</p>
            <p className="mt-2 text-sm text-slate-400">Please check the value and try again.</p>
            <button
              onClick={resetSearch}
              className="mt-6 rounded-lg bg-slate-700 px-6 py-2 text-sm font-semibold text-white transition hover:bg-slate-600"
            >
              Try again
            </button>
          </section>
        )}

        {status === "error" && (
          <section className="rounded-2xl border border-rose-500/30 bg-rose-500/10 py-16 text-center backdrop-blur-sm">
            <p className="text-lg text-rose-200">Something went wrong while verifying.</p>
            <p className="mt-2 text-sm text-rose-100">{errorMessage}</p>
            <button
              onClick={() => (normalizedInitial ? void performSearch(normalizedInitial) : resetSearch())}
              className="mt-6 rounded-lg bg-slate-700 px-6 py-2 text-sm font-semibold text-white transition hover:bg-slate-600"
            >
              Retry
            </button>
          </section>
        )}
      </div>
    </main>
  );
}

function normalizeUnitshash(value: string) {
  return value.trim().toLowerCase();
}

function validateUnitshash(value: string) {
  if (!value) return "Unitshash wajib diisi.";
  if (value.length < 8 || value.length > 10) {
    return "Unitshash harus 8-10 karakter.";
  }
  if (!/^[0-9a-z]+$/.test(value)) {
    return "Gunakan huruf kecil a-z dan angka 0-9 saja.";
  }
  return null;
}

async function fetchMetadata(cid: string): Promise<Record<string, unknown>> {
  if (!cid) {
    throw new Error("CID metadata kosong.");
  }
  const url = resolveIpfsUrl(cid);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Gagal mengambil metadata dari gateway (${response.status}).`);
  }

  return response.json() as Promise<Record<string, unknown>>;
}

function buildMetadataDisplay(
  metadata: Record<string, unknown>,
  product: ContractProduct,
  producer: RegistryProducer
): { ordered: Record<string, unknown>; raw: Record<string, unknown> } {
  const raw = metadata ?? {};

  const metadataProducer = resolveMetadataProducer(raw.producer, product, producer);

  const ordered: Record<string, unknown> = {
    name: raw.name ?? "",
    description: raw.description ?? "",
    sku: raw.sku ?? "N/A",
    batch: raw.batch ?? "N/A",
    unitshash: raw.unitshash ?? product.unitshash,
  };

  if (raw.collection) {
    ordered.collection = raw.collection;
  }

  if (raw.image) {
    ordered.image = raw.image;
  }

  if (raw.origin) {
    ordered.origin = raw.origin;
  }

  if (raw.external_url) {
    ordered.external_url = raw.external_url;
  }

  if (raw.additionalNotes) {
    ordered.additionalNotes = raw.additionalNotes;
  }

  ordered.producer = metadataProducer;

  const attributes = Array.isArray(raw.attributes) ? raw.attributes : [];
  ordered.attributes = attributes;

  if (raw.generatedAt) {
    ordered.generatedAt = raw.generatedAt;
  } else if (raw.timestamp) {
    ordered.generatedAt = raw.timestamp;
  } else {
    ordered.generatedAt = new Date().toISOString();
  }

  return { ordered, raw };
}

function resolveMetadataProducer(
  rawProducer: unknown,
  product: ContractProduct,
  registryProducer: RegistryProducer
): MetadataProducer {
  if (rawProducer && typeof rawProducer === "object") {
    const candidate = rawProducer as Record<string, unknown>;
    return {
      address: typeof candidate.address === "string" ? candidate.address : product.producer,
      name: typeof candidate.name === "string" ? candidate.name : registryProducer.name,
      verified: typeof candidate.verified === "boolean" ? candidate.verified : registryProducer.verified,
    };
  }

  return {
    address: product.producer,
    name: registryProducer.name || "Unregistered producer",
    verified: registryProducer.verified,
  };
}

function isProductNotFoundError(error: unknown) {
  const message = parseError(error).toLowerCase();
  return message.includes("productnotfound") || message.includes("product not found");
}

function parseError(error: unknown): string {
  if (typeof error === "string") {
    return error;
  }

  if (isBaseError(error)) {
    return error.shortMessage ?? error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unexpected error occurred.";
}

function isBaseError(error: unknown): error is BaseError {
  return typeof error === "object" && error !== null && "shortMessage" in error;
}

function InfoItem({ label, value, tooltip }: { label: string; value: ReactNode; tooltip?: string }) {
  return (
    <div className="space-y-1">
      <span className="text-xs uppercase tracking-wide text-slate-400">{label}</span>
      <p className="text-sm text-slate-100" title={tooltip}>
        {value}
      </p>
    </div>
  );
}
