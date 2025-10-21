export function Footer() {
    return (
        <section className="max-w-4xl mx-auto px-6 py-12 text-center">
          <div className="bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 border border-yellow-500/20 rounded-2xl p-8">
            <p className="text-2xl mb-2">☕️</p>
            <p className="text-slate-300 mb-2">
              <span className="font-semibold text-yellow-400">Fun fact:</span> Our team runs on coffee and curiosity.
            </p>
            <p className="text-sm text-slate-400">
              Every message you send makes us smile (and reach for another cup!)
            </p>
          </div>
        </section>
    )
}