import { FaDatabase, FaLock, FaShield } from "react-icons/fa6";

export function AboutV3() {
    return (
        <section className="max-w-6xl mx-auto px-6 py-12">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">
                            What is V3rific?
                        </h2>
                        <p className="text-slate-300 leading-relaxed mb-6">
                            V3rific is a blockchain-based Product Passport platform that enables manufacturers, distributors, and consumers to verify the authenticity of their products.
                        </p>
                        <p className="text-slate-300 leading-relaxed">
                            With Web3 and IPFS technology, each product has a unique Unithash that records its entire journey from production to the hands of consumers and cannot be manipulated by third parties.
                        </p>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-violet-500/20 rounded-2xl blur-3xl" />
                        <div className="relative bg-slate-800/50 border border-white/10 rounded-2xl p-8">
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <FaShield className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold text-white mb-1">Anti-Counterfeit</h3>
                                        <p className="text-sm text-slate-400">Prevent counterfeit products from entering the market</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <FaDatabase className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold text-white mb-1">Full Traceability</h3>
                                        <p className="text-sm text-slate-400">Track product journey</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <FaLock className="w-6 h-6 text-violet-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold text-white mb-1">Immutable Records</h3>
                                        <p className="text-sm text-slate-400">Data is permanently stored on the blockchain</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}