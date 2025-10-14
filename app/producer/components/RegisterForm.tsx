import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";

export type RegisterFormValues = {
  name: string;
  description: string;
  website: string;
  contact: string;
  country: string;
};

type RegisterFormProps = {
  onRegister?: (values: RegisterFormValues) => Promise<boolean | void> | boolean | void;
  isSubmitting?: boolean;
  feedback?: {
    type: "success" | "error" | "pending";
    message: string;
  } | null;
  resetSignal?: number;
};

const emptyForm: RegisterFormValues = {
  name: "",
  description: "",
  website: "",
  contact: "",
  country: "",
};

export function RegisterForm({ onRegister, isSubmitting, feedback, resetSignal }: RegisterFormProps) {
  const [values, setValues] = useState<RegisterFormValues>(emptyForm);

  const handleChange =
    (field: keyof RegisterFormValues) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const shouldReset = await onRegister?.(values);
    if (shouldReset) {
      setValues(emptyForm);
    }
  };

  useEffect(() => {
    if (resetSignal && resetSignal > 0) {
      setValues(emptyForm);
    }
  }, [resetSignal]);

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div>
        <h2 className="text-2xl font-semibold text-slate-100">Register as a producer</h2>
        <p className="text-sm text-slate-300">
          Provide your brand details. This information becomes the manufacturer metadata displayed across the V3rific dashboard.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-slate-200">
          Brand name
          <input
            className="rounded-xl border border-white/15 bg-slate-900/60 px-4 py-3 text-base text-slate-100 outline-none transition focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-500/30"
            placeholder="PT Contoh Sejahtera"
            value={values.name}
            onChange={handleChange("name")}
            disabled={isSubmitting}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-200">
          Website
          <input
            className="rounded-xl border border-white/15 bg-slate-900/60 px-4 py-3 text-base text-slate-100 outline-none transition focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-500/30"
            placeholder="https://contoh.co.id"
            value={values.website}
            onChange={handleChange("website")}
            disabled={isSubmitting}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-200">
          Email / contact
          <input
            className="rounded-xl border border-white/15 bg-slate-900/60 px-4 py-3 text-base text-slate-100 outline-none transition focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-500/30"
            placeholder="support@contoh.co.id"
            value={values.contact}
            onChange={handleChange("contact")}
            disabled={isSubmitting}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-200">
          Country
          <input
            className="rounded-xl border border-white/15 bg-slate-900/60 px-4 py-3 text-base text-slate-100 outline-none transition focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-500/30"
            placeholder="Indonesia"
            value={values.country}
            onChange={handleChange("country")}
            disabled={isSubmitting}
          />
        </label>
      </div>

      <label className="flex flex-col gap-2 text-sm text-slate-200">
        Brand description
        <textarea
          className="min-h-[120px] rounded-xl border border-white/15 bg-slate-900/60 px-4 py-3 text-base text-slate-100 outline-none transition focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-500/30"
          placeholder="Share a short statement about your brand."
          value={values.description}
          onChange={handleChange("description")}
          disabled={isSubmitting}
        />
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-indigo-500 px-6 py-3 text-base font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:bg-indigo-400/60"
      >
        {isSubmitting ? "Registering..." : "Register"}
      </button>

      {feedback && (
        <motion.div
          className={`rounded-xl border px-4 py-3 text-sm ${
            feedback.type === "success"
              ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-200"
              : feedback.type === "error"
              ? "border-rose-400/40 bg-rose-500/10 text-rose-200"
              : "border-indigo-400/40 bg-indigo-500/10 text-indigo-200"
          }`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {feedback.message}
        </motion.div>
      )}
    </motion.form>
  );
}
