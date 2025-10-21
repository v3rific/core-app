import { motion } from "framer-motion";
import { FaWallet, FaKey, FaQrcode, FaNfcSymbol } from "react-icons/fa6";

export function Service() {
    return (
        <section className="py-12 px-6">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">How V3rific Works</h2>
                <div className="grid md:grid-cols-4 gap-8">
                    {[
                        {
                            icon: <FaWallet className="w-6 h-6" />,
                            title: "1. Wallet Connection",
                            description: "Connect your blockchain wallet to access the product registration system"
                        },
                        {
                            icon: <FaKey className="w-6 h-6" />,
                            title: "2. Product Registration",
                            description: "Submit product metadata and receive unique verification credentials"
                        },
                        {
                            icon: <FaQrcode className="w-6 h-6" />,
                            title: "3. QR Generation",
                            description: "Receive unique QR codes and unit hashes for your products"
                        },
                        {
                            icon: <FaNfcSymbol className="w-6 h-6" />,
                            title: "4. Verification",
                            description: "Enable customers to verify authenticity through our platform"
                        }].map((item, index) => (
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