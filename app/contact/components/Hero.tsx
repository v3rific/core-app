import { FaWandSparkles } from "react-icons/fa6"

export function Hero() {
  return (
      <section className="max-w-6xl mx-auto px-6 pt-32 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-2 mb-6 animate-fadeIn">
          <FaWandSparkles className="w-4 h-4 text-indigo-400" />
          <span className="text-sm text-indigo-300">We're listening 👋</span>
        </div>        
        <h1 className="text-5xl md:text-6xl font-bold mb-6 pb-2 bg-gradient-to-r from-white via-indigo-200 to-violet-200 bg-clip-text text-transparent animate-fadeIn" style={{ animationDelay: '0.1s' }}>
          Let's Create Something Amazing
        </h1>        
        <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          Got an idea? Found a bug? Want to collaborate? Or just want to say hi? 
          <span className="text-indigo-400 font-medium"> We'd genuinely love to hear from you.</span>
        </p>
      </section>
    )
}