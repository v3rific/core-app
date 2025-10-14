const steps = [
  {
    title: "Connect wallet",
    description: "Use your preferred Web3 wallet to sign in and authorize actions.",
  },
  {
    title: "Register as a producer",
    description: "Fill in your brand profile so the network can verify your identity.",
  },
  {
    title: "Review the dashboard",
    description: "Check registration status, responsible admins, and verification readiness.",
  },
];

export function GuideSteps() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-md">
      <h2 className="text-lg font-semibold text-slate-100">Quick steps</h2>
      <div className="mt-4 space-y-4">
        {steps.map((step, index) => (
          <div key={step.title} className="flex items-start gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/20 text-sm font-semibold text-indigo-200">
              {index + 1}
            </span>
            <div>
              <h3 className="text-sm font-semibold text-slate-100 uppercase tracking-wide">{step.title}</h3>
              <p className="text-sm text-slate-300">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
