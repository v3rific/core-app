import React from "react";
import { motion } from "framer-motion";
import { FaCheck, FaEnvelope } from "react-icons/fa6";

type FormContactValues = {
    name: string;
    email: string;
    subject: string;
    message: string;
}

type FormContactProps = {
    formValues: FormContactValues;
    isSubmitting: boolean;
    submitted: boolean;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export function FormContact({ 
    formValues, 
    isSubmitting, 
    submitted, 
    onSubmit, 
    onChange 
}: FormContactProps) {
    return (
        <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden">
                {/* Decorative gradient */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-violet-500/10 rounded-full blur-3xl" />
                <div className="relative z-10">
                    {submitted ? (
                    // Success State
                    <div className="text-center py-16 animate-fadeIn">
                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                            <FaCheck className="w-10 h-10 text-green-400" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-4">Message Sent! 🎉</h3>
                        <p className="text-slate-300 mb-2">Thanks for reaching out!</p>
                        <p className="text-sm text-slate-400">We'll get back to you within 24 hours.</p>
                    </div>
                    ) : (
                        // Form
                        <>
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-white mb-2">
                                    Drop us a message
                                </h2>
                                <p className="text-slate-400">Fill in the form below and we'll get back to you ASAP</p>
                            </div>
            
                            <form onSubmit={onSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                                        Your Name <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formValues.name}
                                        onChange={onChange}
                                        required
                                        placeholder="John Doe"
                                        autoComplete="off"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                                        Email Address <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formValues.email}
                                        onChange={onChange}
                                        required
                                        placeholder="john@example.com"
                                        autoComplete="off"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                                        What's this about? <span className="text-red-400">*</span>
                                    </label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formValues.subject}
                                        onChange={onChange}
                                        required
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="" className="bg-slate-800">Select a topic...</option>
                                        <option value="general" className="bg-slate-800">General Inquiry</option>
                                        <option value="partnership" className="bg-slate-800">Partnership Opportunity</option>
                                        <option value="bug" className="bg-slate-800">Report a Bug</option>
                                        <option value="feature" className="bg-slate-800">Feature Request</option>
                                        <option value="support" className="bg-slate-800">Technical Support</option>
                                        <option value="other" className="bg-slate-800">Something Else</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                                        Your Message <span className="text-red-400">*</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formValues.message}
                                        onChange={onChange}
                                        required
                                        rows={6}
                                        placeholder="Tell us what's on your mind..."
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                                    />
                                    <p className="text-xs text-slate-500 mt-2">
                                        {formValues.message.length} characters
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white font-semibold rounded-xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 group"
                                    >
                                    {isSubmitting ? (
                                        <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Sending...
                                        </>
                                    ) : (
                                        <>
                                        Send Message
                                        <FaEnvelope className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>

                                <p className="text-xs text-center text-slate-500">
                                    By submitting, you agree to our Privacy Policy
                                </p>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}