import { motion } from "framer-motion";
import { FaUserShield, FaLock, FaDatabase } from "react-icons/fa6";

export function Key() {
    return (
        <section className="py-12 px-6 relative">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <FaUserShield className="w-6 h-6" />,
                            title: "IPFS Protection",
                            description: "Your product metadata is securely stored on IPFS with permanent storage guarantees"
                        },
                        {
                            icon: <FaLock className="w-6 h-6" />,
                            title: "Smart Contract Security",
                            description: "Automated and secure token generation through audited smart contracts"
                        },
                        {
                            icon: <FaDatabase className="w-6 h-6" />,
                            title: "Decentralized Access",
                            description: "Product verification data is publicly accessible while maintaining security"
                        }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
                        >
                            <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-4">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-slate-400">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}