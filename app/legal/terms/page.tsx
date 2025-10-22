"use client"

import { Navbar } from '../../navbar';
import { Hero } from './components/Hero';
import { Service } from './components/Service';
import { MainTerms } from './components/MainTerms';
import { CTA } from './components/CTA';

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black text-slate-100 relative overflow-hidden">
            <Navbar />

            {/* Hero */}
            <Hero />

            {/* Service Overview */}
            <Service />

            {/*  Main Terms */}
            <MainTerms />

            {/* CTA */}
            <CTA />

        </main>
    );
}