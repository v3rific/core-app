// app/page.tsx
"use client";

import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { QRCodeCanvas } from "qrcode.react";
import { FaCube, FaTruck, FaSearch, FaClock, FaBolt, FaLock } from "react-icons/fa";

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
        <h3 className="text-4xl font-bold mb-6">How it works? 3 simple steps</h3>

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

      {/* Target User */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-4xl font-bold mb-4">Who is it for?</h3>
          <p className="text-slate-400 mb-6 text-lg">
            V3rific adapts to your product scale, from high-value collectibles 
            to everyday consumer goods. Each use case ensures trust, authenticity, 
            and transparency powered by blockchain.
          </p>
          <ul className="space-y-3 text-slate-300 text-lg">
            <li>• <span className="font-semibold text-indigo-300">Luxury brands & limited products</span> → full traceability and digital ownership.</li>
            <li>• <span className="font-semibold text-indigo-300">Manufacturers & distributors</span> → track product journey and status updates.</li>
            <li>• <span className="font-semibold text-indigo-300">Mass producers & SMEs</span> → simple authenticity verification at low cost.</li>
            <li>• <span className="font-semibold text-indigo-300">Consumers</span> → scan to confirm originality and product source.</li>
          </ul>
        </div>
        <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
          <blockquote className="text-slate-300 italic text-lg">
            “Before V3rific, tracking authenticity was difficult.
            <p>Now our verification is automatic, transparent, and tamper-proof.”</p>
          </blockquote>
          <p className="text-slate-500 mt-3 text-sm">- Supply Chain Manager</p>
        </div>
      </section>


      {/* BENEFITS */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h4 className="text-4xl md:text-4xl font-bold text-slate-100">
            Why It Matters
          </h4>
          <p className="text-base text-slate-400 mt-2">
            Empower your products with transparency, traceability, and trust. All powered by blockchain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-center hover:bg-white/10 transition">
            <div className="flex items-center justify-center text-indigo-400 text-3xl mb-3"><FaLock /></div>
            <h4 className="font-semibold text-lg mb-2 text-slate-100">
              Authenticity Guaranteed
            </h4>
            <p className="text-slate-400 text-base">
              Each product is cryptographically linked to a blockchain record, ensuring proof of origin.
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-center hover:bg-white/10 transition">
            <div className="flex items-center justify-center text-emerald-400 text-3xl mb-3"><FaClock /></div>
            <h4 className="font-semibold text-lg mb-2 text-slate-100">
              End-to-End Traceability
            </h4>
            <p className="text-slate-400 text-base">
              Track your item's journey across producers, distributors, and retailers, all verifiable on-chain.
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-center hover:bg-white/10 transition">
            <div className="flex items-center justify-center text-amber-400 text-3xl mb-3"><FaBolt /></div>
            <h4 className="font-semibold text-lg mb-2 text-slate-100">
              Effortless Verification
            </h4>
            <p className="text-slate-400 text-base">
              Scan a QR, get instant metadata and history, no complex tools, no trust issues.
            </p>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="max-w-6xl mx-auto px-6 py-12 text-center">
        <h3 className="text-4xl font-bold text-slate-100 mb-8">
          Building Trust, One Product at a Time
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-b from-indigo-900/20 to-transparent rounded-2xl py-10 px-6 shadow-inner">
            <h4 className="text-5xl font-extrabold text-indigo-400 mb-2">93K+</h4>
            <p className="text-slate-200 text-lg font-medium">Verified Products</p>
            <p className="text-slate-500 text-sm mt-2">Each item permanently stored and traceable on-chain.</p>
          </div>
          <div className="bg-gradient-to-b from-violet-900/20 to-transparent rounded-2xl py-10 px-6 shadow-inner">
            <h4 className="text-5xl font-extrabold text-indigo-400 mb-2">1.3K+</h4>
            <p className="text-slate-200 text-lg font-medium">Manufacturers Joined</p>
            <p className="text-slate-500 text-sm mt-2">Trusted by Artisans, Startups, and Established brands worldwide.</p>
          </div>
          <div className="bg-gradient-to-b from-blue-900/20 to-transparent rounded-2xl py-10 px-6 shadow-inner">
            <h4 className="text-5xl font-extrabold text-indigo-400 mb-2">13</h4>
            <p className="text-slate-200 text-lg font-medium">Industries Connected</p>
            <p className="text-slate-500 text-sm mt-2">Blockchain bridges every supply chain.</p>
          </div>
        </div>
      </section>

      {/* Slogan */}
      <section className="max-w-6xl mx-auto px-6 py-12 text-center">
        <h4 className="text-4xl md:text-4xl font-bold text-slate-100 tracking-wide">
          Verify, Retrieve, Fidelity, <span className="text-indigo-400">Safe in Blockchain</span>
        </h4>
        <p className="text-slate-400 text-lg mt-4">
          Every product tells its own verifiable story, let your product tell its own verifiable story.
        </p>
        <p className="text-slate-400 text-lg mt-1">
          Secure, Immutable, and Transparent.
        </p>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-r from-indigo-700/30 to-violet-700/20 p-8 rounded-2xl border border-white/6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl font-bold">Make your product verifiable today!</h4>
            <p className="text-slate-300">Start by connecting your wallet and registering a sample product. Sepolia testnet friendly.</p>
          </div>
          <div>
            <ConnectButton />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h3 className="text-3xl font-bold text-slate-100 mb-6 text-center">Frequently Asked Questions</h3>
        <div className="space-y-6 text-slate-300">
          <details className="bg-white/5 p-4 rounded-lg border border-white/10">
            <summary className="font-semibold text-lg cursor-pointer">Do I need crypto knowledge to use this?</summary>
            <p className="mt-2 text-slate-400">Not necessarily. The platform handles wallet connections and verification automatically, you just focus on your product.</p>
          </details>
          <details className="bg-white/5 p-4 rounded-lg border border-white/10">
            <summary className="font-semibold text-lg cursor-pointer">Can it scale for mass production?</summary>
            <p className="mt-2 text-slate-400">Yes, batch provenance and QR integration allow thousands of products to be verified instantly.</p>
          </details>
        </div>
      </section>

      {/* Contact */}
      <section className="max-w-7xl mx-auto px-6 py-12 text-center">
        <h4 className="text-3xl font-bold text-slate-100 mb-4">Got an idea or feedback?</h4>
        <p className="text-slate-400 mb-8">Help us make product verification smarter. Reach out or collaborate with the team.</p>
        <a
          href="mailto:team@v3rific.io"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition"
        >
          Contact Us
        </a>
      </section>

      {/* Big Vision */}
      <section className="max-w-7xl mx-auto px-6 py-12 mt-15 border-t border-white/10">
        <div className="flex flex-col md:flex-row md:justify-between gap-5">
          {/* Left side */}
          <div className="md:w-1/2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-400 flex items-center justify-center font-extrabold text-slate-100 shadow-lg">
                V3
              </div>
              <span className="text-slate-400 font-semibold tracking-wide uppercase text-sm">
                Vision
              </span>
            </div>

            <h3 className="text-4xl font-bold text-slate-100 mb-5">
              Towards a Transparent Supply Future
            </h3>
            <p className="text-slate-400 text-lg mb-5 leading-relaxed">
              We’re building a network where every product can be verified, every story retrieved, and every record stays true. Secured by blockchain fidelity.
            </p>
          </div>

          {/* Right side */}
          <div className="md:w-1/2 grid sm:grid-cols-2 gap-8 text-left">
            <div>
              <h4 className="text-slate-100 font-semibold mb-3">For Producers</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>• Register product metadata</li>
                <li>• Link items to Blockchain & IPFS</li>
                <li>• Create verifiable digital twins</li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-100 font-semibold mb-3">For Consumers</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>• Verify authenticity instantly</li>
                <li>• Claim ownership on-chain</li>
                <li>• Access transparent product history</li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-100 font-semibold mb-3">For Distributors</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>• Update product status securely</li>
                <li>• Record transfers with proof</li>
                <li>• Simplify supply verification</li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-100 font-semibold mb-3">For the Future</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>• Universal product provenance</li>
                <li>• Interoperable identity for goods</li>
                <li>• Global standard of trust</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="max-w-7xl mx-auto px-6 py-6 text-slate-400">
        <div className="flex items-center justify-between">
          <div>© {new Date().getFullYear()} Transparent Creative Supply Chain</div>
          <div className="text-sm">Built for hackathon • Demo (Sepolia)</div>
        </div>
      </footer>
    </main>
  );
}
