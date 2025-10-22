import { FaRegCircleCheck, FaDatabase, FaLock, FaLink } from "react-icons/fa6";

export function V3Concept() {
    return (
        <section className="max-w-6xl mx-auto px-6 py-12">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Concept <span className="text-indigo-400">VeRiFiC</span>
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    The four main pillars that form the foundation of V3rific technology
                </p>
            </div>
        
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Verify */}
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20 rounded-2xl p-6 hover:border-green-500/40 transition-all group">
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <FaRegCircleCheck className="w-6 h-6 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Verify</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                        Ensure product data is authentic and verified via blockchain
                    </p>
                </div>
        
                {/* Retrieve */}
                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20 rounded-2xl p-6 hover:border-blue-500/40 transition-all group">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <FaDatabase className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Retrieve</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                        Retrieve product information and history anytime, anywhere
                    </p>
                </div>
        
                {/* Fidelity */}
                <div className="bg-gradient-to-br from-violet-500/10 to-purple-500/5 border border-violet-500/20 rounded-2xl p-6 hover:border-violet-500/40 transition-all group">
                    <div className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <FaLock className="w-6 h-6 text-violet-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Fidelity</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                        Data is consistent and cannot be manipulated by third parties.
                    </p>
                </div>
        
                {/* Chain */}
                <div className="bg-gradient-to-br from-indigo-500/10 to-blue-500/5 border border-indigo-500/20 rounded-2xl p-6 hover:border-indigo-500/40 transition-all group">
                    <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <FaLink className="w-6 h-6 text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Chain</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                        Everything is safe because it is recorded on the immutable blockchain.
                    </p>
                </div>
            </div>
        </section>
    )
}