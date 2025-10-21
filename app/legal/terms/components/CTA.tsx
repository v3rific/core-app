import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa6';

export function CTA() {
    return (
      <section className="py-12 px-6">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
        >
            <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl p-12 border border-indigo-500/20">
                <h2 className="text-3xl font-bold mb-4">Ready to Protect Your Products?</h2>
                <p className="text-slate-300 mb-8">Start using V3rific's blockchain-powered verification system today</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                        href="/producer"
                        className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium transition-all group"
                    >
                          Get Started
                        <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-all"
                    >
                        Contact Support
                    </Link>
                </div>
            </div>
        </motion.div>
      </section>
    )
}