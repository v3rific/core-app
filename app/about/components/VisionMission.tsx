import { FaGlobe, FaBolt, FaRegCircleCheck } from "react-icons/fa6";

export function VisionMission() {
    return (
        <section className="max-w-6xl mx-auto px-6 py-12">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Vision */}
                <div className="bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-transparent border border-white/10 rounded-3xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                            <FaGlobe className="w-6 h-6 text-indigo-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Vision</h2>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                        Becoming the global standard for blockchain-based product authentication, creating a supply chain ecosystem that is completely transparent, trusted, and accessible to all stakeholders, from manufacturers to end consumers.
                    </p>
                </div>
        
                {/* Mission */}
                <div className="bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-transparent border border-white/10 rounded-3xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center">
                            <FaBolt className="w-6 h-6 text-violet-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Mission</h2>
                    </div>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                        <FaRegCircleCheck className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-300">Eliminate counterfeit products from the market</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <FaRegCircleCheck className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-300">Providing full transparency to consumers</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <FaRegCircleCheck className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-300">Empower brands with trusted digital product passports</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}