"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { sepolia } from "wagmi/chains";
import type { BaseError } from "viem";
import { FaArrowLeft } from "react-icons/fa";

import { ConnectSection } from "./components/ConnectSection";
import { FeatureHighlights } from "./components/FeatureHighlights";
import { GuideSteps } from "./components/GuideSteps";
import { RegisterForm, type RegisterFormValues } from "./components/RegisterForm";
import {
  ProducerDashboard,
  type ProducerProfile,
  type ProductSummary,
} from "./components/ProducerDashboard";
import { producerRegistryAbi } from "@/lib/abi/producerRegistry";

const registryAddress = (process.env.NEXT_PUBLIC_PRODUCER_REGISTRY_CONTRACT ??
  "0xa9ac835cF754793e9af5c9F3CE7c126b2aa165b6") as `0x${string}`;

type FeedbackState =
  | { type: "success"; message: string }
  | { type: "error"; message: string }
  | { type: "pending"; message: string }
  | null;

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

const mockProducts: ProductSummary[] = [
  {
    id: "0x01",
    name: "Handmade Sketchbook - Midnight Series",
    sku: "HND-2025-001",
    batch: "Batch A",
    status: "In transit",
    mintedAt: "2025-02-01T08:00:00.000Z",
  },
  {
    id: "0x02",
    name: "Artisan Notebook - Copper Edition",
    sku: "ART-2025-014",
    batch: "Batch B",
    status: "Minted",
    mintedAt: "2025-01-26T09:45:00.000Z",
  },
  {
    id: "0x03",
    name: "Canvas Tote - Gallery Capsule",
    sku: "TOTE-2025-003",
    batch: "Batch A",
    status: "Delivered",
    mintedAt: "2025-01-20T11:30:00.000Z",
  },
  {
    id: "0x04",
    name: "Screen Print Poster - V3rific Launch",
    sku: "PRT-2024-221",
    batch: "Batch C",
    status: "Minted",
    mintedAt: "2025-01-12T13:10:00.000Z",
  },
  {
    id: "0x05",
    name: "Limited Vinyl - Ambient Series",
    sku: "VIN-2025-005",
    batch: "Batch A",
    status: "In transit",
    mintedAt: "2024-12-28T16:45:00.000Z",
  },
  {
    id: "0x06",
    name: "Custom Pins - Collector Pack",
    sku: "PIN-2024-111",
    batch: "Batch B",
    status: "Delivered",
    mintedAt: "2024-12-22T10:15:00.000Z",
  },
  {
    id: "0x07",
    name: "Letterpress Cards - Winter Set",
    sku: "PRT-2024-198",
    batch: "Batch B",
    status: "Delivered",
    mintedAt: "2024-12-15T18:05:00.000Z",
  },
  {
    id: "0x08",
    name: "Art Book - Residency Collection",
    sku: "ART-2024-303",
    batch: "Batch A",
    status: "Minted",
    mintedAt: "2024-12-05T07:55:00.000Z",
  },
  {
    id: "0x09",
    name: "Wearable Patch - Pioneer Series",
    sku: "PAT-2024-412",
    batch: "Batch C",
    status: "In transit",
    mintedAt: "2024-11-28T14:20:00.000Z",
  },
  {
    id: "0x10",
    name: "Signed Print - Artist Spotlight",
    sku: "SPT-2024-510",
    batch: "Batch A",
    status: "Delivered",
    mintedAt: "2024-11-20T09:35:00.000Z",
  },
  {
    id: "0x06",
    name: "Custom Pins - Collector Pack",
    sku: "PIN-2024-111",
    batch: "Batch B",
    status: "Delivered",
    mintedAt: "2024-12-22T10:15:00.000Z",
  },
  {
    id: "0x07",
    name: "Letterpress Cards - Winter Set",
    sku: "PRT-2024-198",
    batch: "Batch B",
    status: "Delivered",
    mintedAt: "2024-12-15T18:05:00.000Z",
  },
  {
    id: "0x08",
    name: "Art Book - Residency Collection",
    sku: "ART-2024-303",
    batch: "Batch A",
    status: "Minted",
    mintedAt: "2024-12-05T07:55:00.000Z",
  },
  {
    id: "0x09",
    name: "Wearable Patch - Pioneer Series",
    sku: "PAT-2024-412",
    batch: "Batch C",
    status: "In transit",
    mintedAt: "2024-11-28T14:20:00.000Z",
  },
  {
    id: "0x10",
    name: "Signed Print - Artist Spotlight",
    sku: "SPT-2024-510",
    batch: "Batch A",
    status: "Delivered",
    mintedAt: "2024-11-20T09:35:00.000Z",
  },
];

export default function ProducerPage() {
  const { isConnected, address } = useAccount();
  const { writeContractAsync, isPending: isWriting } = useWriteContract();

  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();
  const [resetSignal, setResetSignal] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const isConnectionReady = isHydrated && isConnected;

  const producerArgs = useMemo(
    () => (isConnectionReady && address ? ([address] as [`0x${string}`]) : undefined),
    [address, isConnectionReady]
  );

  const {
    data: rawProducer,
    isPending: isFetchingProducer,
    error: producerError,
    refetch: refetchProducer,
  } = useReadContract({
    address: registryAddress,
    abi: producerRegistryAbi,
    functionName: "getProducer",
    args: producerArgs,
    chainId: sepolia.id,
    query: {
      enabled: Boolean(isConnectionReady && address),
      refetchOnWindowFocus: false,
    },
  });

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: confirmationError,
  } = useWaitForTransactionReceipt({
    hash: txHash,
    chainId: sepolia.id,
    query: {
      enabled: Boolean(txHash),
    },
  });

  const producerProfile = useMemo<ProducerProfile | null>(() => {
    const producer = rawProducer as RegistryProducer | undefined;
    if (!producer || !producer.registered) {
      return null;
    }

    return {
      name: producer.name,
      description: producer.description,
      website: producer.website,
      contact: producer.contact,
      country: producer.country,
      registered: producer.registered,
      verified: producer.verified,
      registeredAt: producer.registeredAt.toString(),
      admin: producer.admin,
    };
  }, [rawProducer]);

  useEffect(() => {
    if (isConfirming) {
      setFeedback({ type: "pending", message: "Transaction submitted. Awaiting confirmations..." });
    }
  }, [isConfirming]);

  useEffect(() => {
    if (isConfirmed) {
      setFeedback({ type: "success", message: "Producer registration confirmed on-chain." });
      setTxHash(undefined);
      setResetSignal((count) => count + 1);
      refetchProducer();
    }
  }, [isConfirmed, refetchProducer]);

  useEffect(() => {
    if (confirmationError) {
      setFeedback({
        type: "error",
        message: parseError(confirmationError),
      });
      setTxHash(undefined);
    }
  }, [confirmationError]);

  useEffect(() => {
    if (producerProfile) {
      setFeedback(null);
    }
  }, [producerProfile]);

  const handleRegister = async (values: RegisterFormValues) => {
    if (!registryAddress) {
      setFeedback({
        type: "error",
        message: "Producer registry contract address is not configured.",
      });
      return false;
    }

    if (!address) {
      setFeedback({
        type: "error",
        message: "Connect your wallet before registering.",
      });
      return false;
    }

    try {
      setFeedback({ type: "pending", message: "Waiting for wallet signature..." });
      const hash = await writeContractAsync({
        address: registryAddress,
        abi: producerRegistryAbi,
        functionName: "registerProducer",
        chainId: sepolia.id,
        args: [values.name, values.description, values.website, values.contact, values.country],
      });
      setTxHash(hash);
      return false;
    } catch (error) {
      setFeedback({
        type: "error",
        message: parseError(error),
      });
      return false;
    }
  };

  const isRegistering = isWriting || isConfirming;

  const renderContent = () => {
    if (!isConnectionReady) {
      return <ConnectSection />;
    }

    if (isFetchingProducer) {
      return <LoadingState />;
    }

    if (producerError) {
      return <ErrorState message={parseError(producerError)} onRetry={() => void refetchProducer()} />;
    }

    if (!producerProfile) {
      return (
        <div className="grid gap-8 lg:grid-cols-[3fr,2fr]">
          <RegisterForm
            onRegister={handleRegister}
            isSubmitting={isRegistering}
            feedback={feedback}
            resetSignal={resetSignal}
          />
          <div className="space-y-6">
            <WalletStatus address={address} />
            <FeatureHighlights />
            <GuideSteps />
          </div>
        </div>
      );
    }

    return <ProducerDashboard profile={producerProfile} products={mockProducts} />;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <header className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-400 font-extrabold text-slate-900 shadow-lg">
            V3
          </div>
          <div>
            <h1 className="text-xl font-semibold">Producer Studio</h1>
            <p className="text-sm text-slate-300">Register your brand and monitor manufacturer status in one place.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/5"
          >
            <FaArrowLeft className="text-xs" />
            Back to overview
          </Link>
          <ConnectButton chainStatus="icon" accountStatus="address" showBalance={false} />
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-6 pb-16">{renderContent()}</section>
    </main>
  );
}

function LoadingState() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-sm text-slate-300">
      Fetching producer profile from the registry...
    </div>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="space-y-4 rounded-3xl border border-rose-400/40 bg-rose-500/10 p-10 text-sm text-rose-100">
      <div>{message}</div>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center justify-center rounded-lg border border-white/20 px-4 py-2 text-xs font-semibold text-slate-100 transition hover:bg-white/10"
      >
        Retry
      </button>
    </div>
  );
}

function WalletStatus({ address }: { address?: `0x${string}` }) {
  if (!address) {
    return null;
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-slate-100">Wallet status</h3>
      <p className="mt-2 text-sm text-slate-300">
        Connected wallet:{" "}
        <span className="font-mono text-indigo-300">
          {address.slice(0, 6)}…{address.slice(-4)}
        </span>
      </p>
      <p className="mt-4 text-sm text-slate-300">
        Complete the registration form to activate your producer dashboard. Once the smart contract integration is live, the verification state will be updated automatically.
      </p>
    </div>
  );
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
