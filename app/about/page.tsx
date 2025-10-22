"use client"

import { Navbar } from "../navbar";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Hero } from "./components/Hero";
import { AboutV3 } from "./components/AboutV3";
import { V3Concept } from "./components/V3Concept";
import { VisionMission } from "./components/VisionMission";
import { TechStack } from "./components/TechStack";
import { CTA } from "./components/CTA";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black text-slate-100">
            <Navbar />

            {/* Header */}
            <header className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
                <div className="mt-17 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-400 flex items-center justify-center shadow-lg">
                    <span className="font-extrabold">V3</span>
                </div>
                <div>
                    <h1 className="text-xl font-semibold">Transparent Creative Supply Chain</h1>
                    <p className="text-sm text-slate-300">Anti-counterfeit tracking for creative goods • Web3 + IPFS</p>
                </div>
                </div>

                <div className="mt-17">
                  <ConnectButton />
                </div>
              </header>
      
            {/* HERO SECTION */}
            <Hero />

            {/* WHAT IS V3RIFIC */}
            <AboutV3 />

            {/* VeRiFiC CONCEPT */}
            <V3Concept />

            {/* VISION & MISSION */}
            <VisionMission />

            {/* TECH STACK & ADVANTAGES */}
            <TechStack />

            {/* CTA SECTION */}
            <CTA />
        </main>
    )
}