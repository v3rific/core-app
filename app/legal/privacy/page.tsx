"use client"

import { Navbar } from '../../navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HIW';
import { Key } from './components/Key';
import { MainContent } from './components/MainContent';
import { CTA } from './components/CTA';

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black text-slate-100 relative overflow-hidden">
            <Navbar />

            {/* Hero Section - Updated content */}
            <Hero />

            {/* New Section: How It Works */}
            <HowItWorks />

            {/* Key Section */}
            <Key />

            {/* Main Content Section */}
            <MainContent />

            {/* CTA */}
            <CTA />

        </main>
    );
}