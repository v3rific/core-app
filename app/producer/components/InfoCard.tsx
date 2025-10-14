import { ReactNode } from "react";

type InfoCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
};

export function InfoCard({ title, description, icon }: InfoCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-md transition hover:border-indigo-400/40 hover:bg-white/10">
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/15 text-indigo-300">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
      <p className="mt-2 text-sm text-slate-300 leading-relaxed">{description}</p>
    </div>
  );
}
