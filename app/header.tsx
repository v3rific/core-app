import { ConnectButton } from "@rainbow-me/rainbowkit"

export function Header() {
    return (
        <header className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
            <div className="mt-17 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-400 flex items-center justify-center shadow-lg">
                    <span className="font-extrabold">V3</span>
                </div>
                <div>
                    <h1 className="text-xl font-semibold">Transparent Creative Supply Chain</h1>
                    <p className="text-sm text-slate-300">Anti-counterfeit tracking for creative goods • Web3 + IPFS</p>
                </div>
            </div>
            <div className="mt-17">
                <ConnectButton />
            </div>
        </header>
    )
}