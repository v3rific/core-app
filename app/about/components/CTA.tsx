import Link from "next/link";
import { FaSearch, FaArrowRight } from "react-icons/fa";

export function CTA() {
    return (
        <section className="max-w-4xl mx-auto px-6 py-12 text-center">
        <div className="bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-purple-500/10 border border-white/10 rounded-3xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
            </h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Start verifying products now or connect with us to learn how V3rific can protect your brand.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Primary: Search/Verify (main action) */}
            <Link
                href="/search"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-full transition-all hover:scale-105"
            >
                <FaSearch className="w-4 h-4" />
                Verify a Product
            </Link>
            
            {/* Secondary: Contact for business inquiry */}
            <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full border border-white/20 transition-all"
            >
                For Businesses
                <FaArrowRight className="w-4 h-4" />
            </Link>
            </div>
            
            {/* Additional info for businesses */}
            <p className="text-sm text-slate-500 mt-6">
            Looking to integrate V3rific into your supply chain? Let's talk.
            </p>
        </div>
        </section>
    )
}