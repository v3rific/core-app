import { motion } from "framer-motion";
import { FaWallet, FaCubes, FaQrcode, FaFingerprint } from "react-icons/fa6";

export function HowItWorks() {
    return (
        <section className="py-12 px-6">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">How We Protect Your Data</h2>
                <div className="grid md:grid-cols-4 gap-8">
                    {[
                        {
                            icon: <FaWallet className="w-6 h-6" />,
                            title: "Secure Wallet Connection",
                            description: "Your wallet connection is encrypted and secure, ensuring safe product registration"
                        },
                        {
                            icon: <FaCubes className="w-6 h-6" />,
                            title: "Blockchain Storage",
                            description: "Product data is permanently stored on the blockchain for immutable verification"
                        },
                        {
                            icon: <FaQrcode className="w-6 h-6" />,
                            title: "Unique QR Codes",
                            description: "Each product receives a unique, tamper-proof QR code and units hash"
                        },
                        {
                            icon: <FaFingerprint className="w-6 h-6" />,
                            title: "Authentication System",
                            description: "Robust verification system to prevent counterfeiting and ensure authenticity"
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