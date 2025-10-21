import { FaWandSparkles } from "react-icons/fa6";

export function Hero() {
    return (
        <section className="mx-auto flex max-w-6xl w-full items-center justify-between px-6 py-8">
            <div className="max-w-6xl mx-auto px-6 py-8 relative">
                <div className="text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-2 mb-8">
                        <FaWandSparkles className="w-4 h-4 text-indigo-400" />
                        <span className="text-sm text-indigo-300">Product Passport On-Chain</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                        About V3rific
                    </h1>
                    <p className="text-xl text-slate-300 leading-relaxed">
                        Building a transparent, trusted, and secure supply chain ecosystem using blockchain technology to ensure every product has an unforgeable digital identity.
                    </p>
                </div>
            </div>
        </section>
    )
}