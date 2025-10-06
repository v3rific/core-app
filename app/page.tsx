// app/page.tsx
"use client";

import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { QRCodeCanvas } from "qrcode.react";
import { FaCube, FaTruck, FaSearch } from "react-icons/fa";

export default function Page() {
  // sample metadata (static example)
  const sample = {
    name: "Handmade Sketchbook — Limited Edition",
    sku: "HND-2025-034",
    manufacturer: "Studio Ilham",
    mintedOn: "2025-10-04",
    status: "In Transit — Distributor",
    ipfs: "ipfs://bafy...example",
    tx: "0xabc123...sep",
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black text-slate-100">
      <header className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-400 flex items-center justify-center shadow-lg">
            <span className="font-extrabold">V3</span>
          </div>
          <div>
            <h1 className="text-xl font-semibold">Transparent Creative Supply Chain</h1>
            <p className="text-sm text-slate-300">Anti-counterfeit tracking for creative goods • Web3 + IPFS</p>
          </div>
        </div>

        <div>
          <ConnectButton />
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Make authenticity obvious.
            </h2>
            <p className="text-slate-300 max-w-xl">
              Producers mint product records to Sepolia (testnet) and store metadata on IPFS. Each product gets a unique QR
              so customers can instantly verify provenance and distribution history. Simple RBAC for distributors.
            </p>

            <div className="flex flex-wrap gap-3">
              <button className="px-5 py-3 bg-indigo-500 rounded-lg font-semibold shadow hover:brightness-105 transition">
                Connect & Register Product
              </button>
              <a
                className="px-5 py-3 border border-slate-700 rounded-lg text-slate-300 hover:bg-white/5 transition"
                href="#flow"
              >
                View Flow
              </a>
            </div>

            <div className="mt-6 flex gap-4">
              <div className="bg-white/5 px-4 py-2 rounded-lg">
                <div className="text-xs text-slate-400">Network</div>
                <div className="font-semibold">Sepolia (test)</div>
              </div>
              <div className="bg-white/5 px-4 py-2 rounded-lg">
                <div className="text-xs text-slate-400">Storage</div>
                <div className="font-semibold">IPFS (Pinata)</div>
              </div>
            </div>
          </div>

          {/* Mockup card */}
          <div>
            <div className="bg-gradient-to-br from-white/5 to-white/3 border border-white/6 rounded-2xl p-6 shadow-lg backdrop-blur-sm">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold">{sample.name}</h3>
                  <p className="text-xs text-slate-400">{sample.manufacturer} • SKU: {sample.sku}</p>
                </div>
                <div className="text-xs text-slate-400">Minted: {sample.mintedOn}</div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <div className="text-xs text-slate-400">Status</div>
                  <div className="font-semibold">{sample.status}</div>

                  <div className="mt-3 text-xs text-slate-400">On-chain</div>
                  <a
                    className="text-sm truncate block max-w-[200px] text-indigo-300"
                    href="#"
                    title={sample.tx}
                  >
                    {sample.tx}
                  </a>

                  <div className="mt-3 text-xs text-slate-400">IPFS</div>
                  <div className="text-sm truncate text-slate-200 max-w-[200px]">{sample.ipfs}</div>
                </div>

                <div className="col-span-1 flex items-center justify-center">
                  {/* QR placeholder */}
                  <div className="bg-white p-3 rounded-md">
                    <QRCodeCanvas value={`https://example.com/product/${sample.sku}`} size={120} />
                  </div>
                </div>
              </div>

              <div className="mt-5 flex gap-2">
                <button className="px-3 py-2 bg-white/6 rounded-md text-sm">View on Explorer</button>
                <button className="px-3 py-2 border border-white/6 rounded-md text-sm">Download Metadata</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FLOW */}
      <section id="flow" className="max-w-6xl mx-auto px-6 py-12">
        <h3 className="text-2xl font-bold mb-6">How it works — 3 simple steps</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white/5 rounded-xl border border-white/6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-600 rounded-md">
                <FaCube />
              </div>
              <div>
                <div className="text-sm text-slate-300">Producer</div>
                <div className="font-semibold">Connect wallet & register product</div>
              </div>
            </div>

            <p className="mt-4 text-slate-300 text-sm">
              Upload product metadata (images, description, serial) to IPFS and mint a record on Sepolia.
            </p>
          </div>

          <div className="p-6 bg-white/5 rounded-xl border border-white/6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-500 rounded-md">
                <FaTruck />
              </div>
              <div>
                <div className="text-sm text-slate-300">Distributor</div>
                <div className="font-semibold">RBAC updates & status events</div>
              </div>
            </div>

            <p className="mt-4 text-slate-300 text-sm">
              Distributor role updates the shipment status on-chain (or via signed events) so history stays auditable.
            </p>
          </div>

          <div className="p-6 bg-white/5 rounded-xl border border-white/6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500 rounded-md">
                <FaSearch />
              </div>
              <div>
                <div className="text-sm text-slate-300">Consumer</div>
                <div className="font-semibold">Scan QR → Verify provenance</div>
              </div>
            </div>

            <p className="mt-4 text-slate-300 text-sm">
              Scan the product QR to see IPFS metadata and on-chain events. Verify originality in one tap.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-r from-indigo-700/30 to-violet-700/20 p-8 rounded-2xl border border-white/6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl font-bold">Ready to make your products verifiable?</h4>
            <p className="text-slate-300">Start by connecting your wallet and registering a sample product. Sepolia testnet friendly.</p>
          </div>
          <div>
            <ConnectButton />
          </div>
        </div>
      </section>

      <footer className="max-w-6xl mx-auto px-6 py-8 text-slate-400">
        <div className="flex items-center justify-between">
          <div>© {new Date().getFullYear()} Transparent Creative Supply Chain — Ilham</div>
          <div className="text-sm">Built for hackathon • Demo (Sepolia)</div>
        </div>
      </footer>
    </main>
  );
}
