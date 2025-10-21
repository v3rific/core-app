import { motion } from "framer-motion";
import { FaCircleCheck, FaCookie, FaEnvelope } from "react-icons/fa6";

export function MainContent() {
    return (
        <section className="py-16 px-6">
            <div className="max-w-4xl mx-auto space-y-12">
                {[
                    {
                        icon: <FaCircleCheck />,
                        title: "Product Data Collection",
                        content: "We collect only essential product information needed for verification, including product metadata, authentication details, and blockchain transaction data..."
                    },
                    {
                        icon: <FaCookie />,
                        title: "Blockchain Data Usage",
                        content: "Your product data is stored on the blockchain and IPFS, ensuring transparency and immutability while maintaining security..."
                    },
                    {
                        icon: <FaEnvelope />,
                        title: "Verification Access",
                        content: "Anyone can verify product authenticity through our QR codes or units hash system, while only authorized producers can register new products..."
                    }
            ].map((section, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="bg-white/5 rounded-2xl p-8 border border-white/10"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                {section.icon}
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
                                <p className="text-slate-300 leading-relaxed">{section.content}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}