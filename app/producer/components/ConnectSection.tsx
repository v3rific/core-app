import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";

export function ConnectSection() {
  return (
    <motion.section
      className="w-full rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-white/10 p-10 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="max-w-xl space-y-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-4 py-1 text-sm font-medium text-indigo-200">
          Producer Portal
        </span>
        <h1 className="text-4xl font-extrabold text-slate-100">
          Manage your manufacturer identity transparently with V3rific.
        </h1>
        <p className="text-slate-300">
          Connect your wallet to register as a producer and unlock the dashboard with registration status,
          verification insights, and admin controls.
        </p>
        <div className="pt-2">
          <ConnectButton chainStatus="icon" accountStatus="address" showBalance={false} />
        </div>
      </div>
    </motion.section>
  );
}
