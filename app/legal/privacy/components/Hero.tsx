import { motion } from "framer-motion";
import { FaShieldHalved } from "react-icons/fa6";

export function Hero() {
    return (
        <section className="relative pt-24 pb-12 px-6">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center gap-2 border border-indigo-500/20 rounded-full px-4 py-2 mb-8">
                        <FaShieldHalved className="w-4 h-4 text-indigo-400" />
                        <span className="text-sm text-indigo-300">Blockchain-Powered Security</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy & Data Protection</h1>
                    <p className="text-lg text-slate-300 mb-8">Understanding how V3rific protects your product data and ensures authenticity through blockchain technology.</p>
                </motion.div>
            </div>
        </section>
    )
}