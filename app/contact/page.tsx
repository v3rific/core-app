"use client";

import { useState } from 'react';
import { Navbar } from '../navbar';
import { Hero } from './components/Hero';
import { Sosmed } from './components/Sosmed';
import { FormContact } from './components/FormContact';
import { Footer } from './components/Footer';

type FormContactValue = {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const emptyForm: FormContactValue = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

export default function ContactPage() {
  const [formContact, setFormContact] = useState<FormContactValue>(emptyForm);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // logic form
            await new Promise(resolve => setTimeout(resolve, 1500)); // simulasi API call
            setSubmitted(true);
            setFormContact(emptyForm);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormContact(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black text-slate-100 relative overflow-hidden">

        <Navbar />
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
        
        {/* Hero */}
        <Hero />

        {/* Main Content */}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left Content */}
            <Sosmed />

            {/* Right Content */}
            <FormContact 
              formValues={formContact} 
              isSubmitting={isSubmitting} 
              submitted={submitted} 
              onSubmit={handleSubmit} 
              onChange={handleChange}
            />

          </div>
        </section>

        {/* Footer */}
        <Footer />
        
    </main>
  );
}