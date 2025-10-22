import { FaCubes, FaDatabase, FaGlobe, FaRegCircleCheck } from "react-icons/fa6";

export function TechStack() {
    return (
        <section className="max-w-6xl mx-auto px-6 py-12">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Tech Stack & Advantages
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    Build with modern technology and best practices
                </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
                {/* Blockchain */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-indigo-500/40 transition-all">
                    <FaCubes className="w-10 h-10 text-indigo-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-3">Blockchain</h3>
                    <p className="text-slate-400 text-sm mb-4">Ethereum, Polygon, or custom L2 for scalability</p>
                    <div className="flex flex-wrap gap-2">
                        <span className="text-xs bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full">Smart Contracts</span>
                        <span className="text-xs bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full">ERC-721</span>
                    </div>
                </div>
        
                {/* IPFS */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-violet-500/40 transition-all">
                    <FaDatabase className="w-10 h-10 text-violet-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-3">IPFS Storage</h3>
                    <p className="text-slate-400 text-sm mb-4">Decentralized storage for metadata product</p>
                    <div className="flex flex-wrap gap-2">
                        <span className="text-xs bg-violet-500/20 text-violet-300 px-3 py-1 rounded-full">Pinata</span>
                        <span className="text-xs bg-violet-500/20 text-violet-300 px-3 py-1 rounded-full">Web3.Storage</span>
                    </div>
                </div>
        
                {/* Web3 Integration */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-green-500/40 transition-all">
                    <FaGlobe className="w-10 h-10 text-green-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-3">Web3 Stack</h3>
                    <p className="text-slate-400 text-sm mb-4">Modern frontend with Web3 wallet integration</p>
                    <div className="flex flex-wrap gap-2">
                        <span className="text-xs bg-green-500/20 text-green-300 px-3 py-1 rounded-full">Next.js</span>
                        <span className="text-xs bg-green-500/20 text-green-300 px-3 py-1 rounded-full">RainbowKit</span>
                    </div>
                </div>
            </div>
        
            {/* Advantages Grid */}
            <div className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-3xl px-6 py-12">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                    Why V3rific?
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex gap-4">
                        <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FaRegCircleCheck className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-1">Immutable Data</h4>
                            <p className="text-sm text-slate-400">Once recorded on the blockchain, it cannot be changed or deleted.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FaRegCircleCheck className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-1">Verify Authenticity</h4>
                            <p className="text-sm text-slate-400">Ensure genuine products with on-chain digital identity.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-10 h-10 bg-violet-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FaRegCircleCheck className="w-5 h-5 text-violet-400" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-1">Retrieve History</h4>
                            <p className="text-sm text-slate-400">View product history and journey at any time.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FaRegCircleCheck className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-1">Fidelity on-chain</h4>
                            <p className="text-sm text-slate-400">Data is kept consistent, secure, and cannot be manipulated.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}