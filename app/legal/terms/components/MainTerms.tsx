import { motion } from "framer-motion";
import { FaGavel, FaFileContract, FaCertificate, FaShield } from "react-icons/fa6";

export function MainTerms() {
    return (
        <section className="py-12 px-6">
            <div className="max-w-4xl mx-auto space-y-12">
                {[
                    {
                        icon: <FaGavel />,
                        title: "1. Platform Usage Agreement",
                        content: "By using V3rific, you agree to provide accurate product information and maintain the integrity of the verification system. All blockchain transactions are final and immutable."
                    },
                    {
                        icon: <FaFileContract />,
                        title: "2. Product Registration Rights",
                        content: "You maintain full ownership of your product data while granting V3rific the right to store and display verification information on the blockchain and IPFS network."
                    },
                    {
                        icon: <FaCertificate />,
                        title: "3. NFT & Verification Terms",
                        content: "Optional NFT/SBT claims are subject to smart contract conditions. QR codes and unit hashes are unique to each product and cannot be duplicated or transferred."
                    },
                    {
                        icon: <FaShield />,
                        title: "4. Security Obligations",
                        content: "Users must secure their wallet credentials and immediately report any unauthorized access. V3rific maintains the right to suspend services in cases of suspicious activity."
                    }].map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-indigo-500/20 transition-colors duration-300"
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