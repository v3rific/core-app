import { FaChevronRight } from 'react-icons/fa';

export function Navbar() {
    return (
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 backdrop-blur-md bg-white/5 border border-white/10 rounded-full shadow-lg px-16 py-3 flex items-center justify-center gap-10 w-[90%] max-w-3xl">
            <a href="/" className="text-slate-300 hover:text-white transition text-sm font-medium">
                Home
            </a>
            <a href="/search" className="text-slate-300 hover:text-white transition text-sm font-medium">
                Search
            </a>
            <a href="/about" className="text-slate-300 hover:text-white transition text-sm font-medium">
                About
            </a>
            <a href="/contact" className="text-slate-300 hover:text-white transition text-sm font-medium">
                Contact
            </a>
            {/* Legal with Dropdown */}
            <div className="relative group">
                <a href="/legal" className="text-slate-300 hover:text-white transition text-sm font-medium flex items-center gap-1">
                    Legal<FaChevronRight className="w-3 h-3" />
                </a>
                {/* Dropdown Subnavbar */}
                <div className="absolute top-full left-1/2 -translate-x-1/4 mt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="backdrop-blur-md bg-slate-900/90 border border-white/10 rounded-lg shadow-lg py-2 px-3 min-w-[140px]">
                        <a href="/legal/privacy" className="block text-slate-300 hover:text-white hover:bg-white/5 transition text-sm font-medium mb-2 py-2 px-3 rounded">
                            Privacy
                        </a>
                        <a href="/legal/terms" className="block text-slate-300 hover:text-white hover:bg-white/5 transition text-sm font-medium py-2 px-3 rounded">
                            Terms
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    )
}