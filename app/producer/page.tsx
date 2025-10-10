"use client";

import React, { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { QRCodeCanvas } from "qrcode.react";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaDatabase,
  FaFileSignature,
  FaGlobe,
  FaShieldAlt,
  FaUserPlus,
} from "react-icons/fa";

type ProducerProfile = {
  organization: string;
  brand: string;
  email: string;
  website: string;
  headquarters: string;
  statement: string;
};

type ProductDraft = {
  name: string;
  sku: string;
  description: string;
  collection: string;
  image: string;
  manufactureDate: string;
  batch: string;
  materials: string;
};

const blankProducer: ProducerProfile = {
  organization: "",
  brand: "",
  email: "",
  website: "",
  headquarters: "",
  statement: "",
};

const blankProduct: ProductDraft = {
  name: "",
  sku: "",
  description: "",
  collection: "",
  image: "",
  manufactureDate: "",
  batch: "",
  materials: "",
};

export default function ProducerPage() {
  const [producer, setProducer] = useState<ProducerProfile>(blankProducer);
  const [product, setProduct] = useState<ProductDraft>(blankProduct);
  const [showPreview, setShowPreview] = useState(false);

  const metadataPreview = useMemo(() => {
    if (!showPreview) return null;
    return {
      producer: {
        organization: producer.organization || "Untitled Organization",
        brand: producer.brand || "Brand Alias",
        email: producer.email || "producer@example.com",
        website: producer.website || "https://v3rific.io",
        headquarters: producer.headquarters || "Remote",
        statement: producer.statement || "Authenticity-first creator.",
      },
      product: {
        name: product.name || "Sample Collectible",
        sku: product.sku || "SKU-0001",
        collection: product.collection || "Launch Edition",
        description:
          product.description ||
          "Limited run product secured with verifiable on-chain metadata.",
        image: product.image || "ipfs://cid-of-product-image",
        manufactureDate: product.manufactureDate || new Date().toISOString().slice(0, 10),
        batch: product.batch || "Batch-A",
        materials: product.materials || "Recycled paper, eco ink",
      },
      network: {
        chain: "Sepolia Testnet",
        storage: "IPFS (Pinata)",
      },
      timestamp: new Date().toISOString(),
    };
  }, [producer, product, showPreview]);

  const handleProducerChange = (field: keyof ProducerProfile) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProducer((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleProductChange = (field: keyof ProductDraft) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProduct((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handlePreview = (event: FormEvent) => {
    event.preventDefault();
    setShowPreview(true);
  };

  const resetForms = () => {
    setProducer(blankProducer);
    setProduct(blankProduct);
    setShowPreview(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <header className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-400 flex items-center justify-center shadow-lg">
            <span className="font-extrabold">V3</span>
          </div>
          <div>
            <h1 className="text-xl font-semibold">Producer Studio</h1>
            <p className="text-sm text-slate-300">Register your brand & mint verifiable product metadata.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-slate-200 hover:bg-white/5 transition"
          >
            <FaArrowLeft className="text-xs" />
            Back to overview
          </Link>
          <ConnectButton />
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 pb-12">
        <div className="bg-gradient-to-r from-indigo-600/20 to-violet-600/10 border border-white/10 rounded-3xl p-8 md:p-12 shadow-xl backdrop-blur">
          <div className="grid gap-8 md:grid-cols-[3fr,2fr] items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-extrabold leading-tight">
                Launch trusted products with verifiable metadata.
              </h2>
              <p className="text-slate-300">
                Register your producer account, capture product DNA, and mint on Sepolia in minutes. Every unit earns a QR
                tied to its on-chain identity and immutable IPFS metadata.
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="bg-white/5 rounded-xl border border-white/10 p-3 flex flex-col gap-2">
                  <div className="text-indigo-300 text-2xl">
                    <FaUserPlus />
                  </div>
                  <div className="text-xs uppercase tracking-wide text-slate-400">Step 1</div>
                  <p className="text-sm font-semibold text-slate-100">Connect wallet & register producer profile.</p>
                </div>
                <div className="bg-white/5 rounded-xl border border-white/10 p-3 flex flex-col gap-2">
                  <div className="text-indigo-300 text-2xl">
                    <FaFileSignature />
                  </div>
                  <div className="text-xs uppercase tracking-wide text-slate-400">Step 2</div>
                  <p className="text-sm font-semibold text-slate-100">Describe the product batch you want to mint.</p>
                </div>
                <div className="bg-white/5 rounded-xl border border-white/10 p-3 flex flex-col gap-2">
                  <div className="text-indigo-300 text-2xl">
                    <FaShieldAlt />
                  </div>
                  <div className="text-xs uppercase tracking-wide text-slate-400">Step 3</div>
                  <p className="text-sm font-semibold text-slate-100">Finalize metadata & push to chain + IPFS.</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-950/40 rounded-2xl border border-white/10 p-6 space-y-4 shadow-lg">
              <div className="text-sm text-slate-400">Network snapshot</div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-300">Chain</span>
                <span className="font-semibold text-indigo-300">Sepolia Testnet</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-300">Storage</span>
                <span className="font-semibold text-indigo-300">IPFS + Pinata</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-300">Encryption</span>
                <span className="font-semibold text-indigo-300">AES-256 at rest</span>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-sm text-slate-300 leading-relaxed">
                Securely store identity, attach documents, and share read-only access with distributors through RBAC.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-12">
        <div className="grid lg:grid-cols-[3fr,2fr] gap-10 items-start">
          <form
            onSubmit={handlePreview}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-10 shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-slate-100">Register new producer account</h3>
                <span className="flex items-center gap-2 text-xs uppercase tracking-wide text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  <FaCheckCircle className="text-sm" />
                  KYC-ready
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-3">
                Provide your brand details to create a verifiable producer profile. These values anchor future product mints.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <label className="flex flex-col gap-2 text-sm">
                <span className="text-slate-300 font-semibold">Organization name</span>
                <input
                  value={producer.organization}
                  onChange={handleProducerChange("organization")}
                  placeholder="Studio V3 Labs"
                  className="bg-slate-950/60 border border-white/10 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                <span className="text-slate-300 font-semibold">Brand alias</span>
                <input
                  value={producer.brand}
                  onChange={handleProducerChange("brand")}
                  placeholder="V3rific Originals"
                  className="bg-slate-950/60 border border-white/10 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                <span className="text-slate-300 font-semibold">Contact email</span>
                <input
                  type="email"
                  value={producer.email}
                  onChange={handleProducerChange("email")}
                  placeholder="team@v3rific.io"
                  className="bg-slate-950/60 border border-white/10 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                <span className="text-slate-300 font-semibold">Website</span>
                <input
                  type="url"
                  value={producer.website}
                  onChange={handleProducerChange("website")}
                  placeholder="https://v3rific.io"
                  className="bg-slate-950/60 border border-white/10 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </label>
              <label className="md:col-span-2 flex flex-col gap-2 text-sm">
                <span className="text-slate-300 font-semibold">Headquarters / region</span>
                <input
                  value={producer.headquarters}
                  onChange={handleProducerChange("headquarters")}
                  placeholder="Bandung, Indonesia"
                  className="bg-slate-950/60 border border-white/10 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </label>
              <label className="md:col-span-2 flex flex-col gap-2 text-sm">
                <span className="text-slate-300 font-semibold">Mission statement</span>
                <textarea
                  value={producer.statement}
                  onChange={handleProducerChange("statement")}
                  placeholder="We build collectible experiences with transparent provenance."
                  className="bg-slate-950/60 border border-white/10 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-28 resize-none"
                />
              </label>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-slate-100">Product metadata for minting</h4>
              <p className="text-sm text-slate-400 mt-2">
                Define the attributes that will be stored on IPFS and linked to the on-chain token. Add visuals, provenance,
                and material facts for immutable trust.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <label className="flex flex-col gap-2 text-sm">
                <span className="text-slate-300 font-semibold">Product name</span>
                <input
                  value={product.name}
                  onChange={handleProductChange("name")}
                  placeholder="Handcrafted Sketchbook"
                  className="bg-slate-950/60 border border-white/10 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                <span className="text-slate-300 font-semibold">SKU / Token ID</span>
                <input
                  value={product.sku}
                  onChange={handleProductChange("sku")}
                  placeholder="HND-2025-034"
                  className="bg-slate-950/60 border border-white/10 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </label>
              <label className="md:col-span-2 flex flex-col gap-2 text-sm">
                <span className="text-slate-300 font-semibold">Description</span>
                <textarea
                  value={product.description}
                  onChange={handleProductChange("description")}
                  placeholder="Limited edition sketchbook with archival-grade paper and serialized cover."
                  className="bg-slate-950/60 border border-white/10 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-28 resize-none"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                <span className="text-slate-300 font-semibold">Collection</span>
                <input
                  value={product.collection}
                  onChange={handleProductChange("collection")}
                  placeholder="Autumn Launch 2025"
                  className="bg-slate-950/60 border border-white/10 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                <span className="text-slate-300 font-semibold">Primary image (IPFS hash)</span>
                <input
                  value={product.image}
                  onChange={handleProductChange("image")}
                  placeholder="ipfs://cid-of-product-image"
                  className="bg-slate-950/60 border border-white/10 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                <span className="text-slate-300 font-semibold">Manufacture date</span>
                <input
                  type="date"
                  value={product.manufactureDate}
                  onChange={handleProductChange("manufactureDate")}
                  className="bg-slate-950/60 border border-white/10 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                <span className="text-slate-300 font-semibold">Batch / lot</span>
                <input
                  value={product.batch}
                  onChange={handleProductChange("batch")}
                  placeholder="Batch-01 / 50 units"
                  className="bg-slate-950/60 border border-white/10 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </label>
              <label className="md:col-span-2 flex flex-col gap-2 text-sm">
                <span className="text-slate-300 font-semibold">Materials / composition</span>
                <textarea
                  value={product.materials}
                  onChange={handleProductChange("materials")}
                  placeholder="Recycled paper, eco-friendly dyes, FSC certified cover board."
                  className="bg-slate-950/60 border border-white/10 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-28 resize-none"
                />
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-indigo-500 hover:brightness-110 transition font-semibold"
              >
                Generate metadata preview
              </button>
              <button
                type="button"
                onClick={resetForms}
                className="px-6 py-3 rounded-xl border border-white/10 text-slate-200 hover:bg-white/5 transition font-semibold"
              >
                Clear draft
              </button>
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <FaGlobe className="text-base text-indigo-300" />
                All submissions are notarized & shareable with distributors.
              </div>
            </div>
          </form>

          <aside className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-6 shadow-lg">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-slate-100">Mint-ready snapshot</h4>
                <span className="text-xs text-slate-400 uppercase tracking-wide">Preview</span>
              </div>
              {metadataPreview ? (
                <div className="space-y-5">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                    <div>
                      <div className="text-xs text-slate-400 uppercase tracking-wide">PRODUCER</div>
                      <h5 className="text-lg font-bold text-slate-100">{metadataPreview.producer.brand}</h5>
                      <p className="text-sm text-slate-400">{metadataPreview.producer.organization}</p>
                      <p className="text-sm text-slate-400">{metadataPreview.producer.headquarters}</p>
                    </div>
                    <div className="text-xs text-slate-500">
                      Contact: <span className="text-indigo-300">{metadataPreview.producer.email}</span>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-slate-400 uppercase tracking-wide">PRODUCT</div>
                        <h5 className="text-lg font-bold text-slate-100">{metadataPreview.product.name}</h5>
                        <p className="text-sm text-slate-400">{metadataPreview.product.collection}</p>
                      </div>
                      <div className="text-xs text-slate-500">
                        SKU: <span className="text-indigo-300">{metadataPreview.product.sku}</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">{metadataPreview.product.description}</p>
                    <div className="grid grid-cols-2 gap-3 text-xs text-slate-400">
                      <span>Batch: {metadataPreview.product.batch}</span>
                      <span>Manufactured: {metadataPreview.product.manufactureDate}</span>
                      <span>Materials: {metadataPreview.product.materials}</span>
                      <span>Image: {metadataPreview.product.image}</span>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center gap-4">
                    <QRCodeCanvas
                      value={`https://v3rific.io/products/${encodeURIComponent(metadataPreview.product.sku)}`}
                      size={140}
                    />
                    <div className="text-xs text-slate-400 text-center">
                      QR embeds on product packaging to verify Sepolia + IPFS record instantly.
                    </div>
                  </div>
                  <pre className="bg-slate-950/70 border border-white/10 rounded-2xl p-4 text-xs text-left text-slate-200 overflow-x-auto">
                    {JSON.stringify(metadataPreview, null, 2)}
                  </pre>
                </div>
              ) : (
                <div className="text-sm text-slate-400 space-y-3">
                  <p>
                    Fill out your producer and product details, then generate a preview to see the exact metadata bundle
                    that will be pushed on-chain and pinned to IPFS.
                  </p>
                  <p className="flex items-center gap-2">
                    <FaDatabase className="text-indigo-300" />
                    Real minting will serialize this object plus signatures into the smart contract.
                  </p>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-r from-indigo-600/10 to-violet-600/10 border border-white/10 rounded-3xl p-6 space-y-4 shadow-lg">
              <h5 className="text-lg font-semibold text-slate-100">Need asset storage?</h5>
              <p className="text-sm text-slate-300">
                Upload product media (images, certificates, audio tags) via the V3rific uploader to get resilient IPFS CIDs.
              </p>
              <button className="px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-sm font-semibold hover:bg-white/15 transition">
                Launch uploader
              </button>
              <div className="text-xs text-slate-400">
                All assets are mirrored to our redundant gateways and accessible via authenticated distributor links.
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
