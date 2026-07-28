'use client';

import { useState } from 'react';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import PageHeader from '@/components/site/PageHeader';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { GraduationCap, CheckCircle2, Users, Target, Rocket, Award, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const PROGRAMS = [
  { title: 'Technical Training', desc: 'Full-stack, Cloud, Data Science, DevOps, AI/ML.', icon: Rocket },
  { title: 'Soft Skills', desc: 'Communication, teamwork, emotional intelligence.', icon: Users },
  { title: 'Leadership', desc: 'People management, strategy, executive presence.', icon: Award },
  { title: 'Communication', desc: 'Business English, presentations, negotiation.', icon: Target },
  { title: 'Campus to Corporate', desc: 'Bridge programs for fresh graduates.', icon: GraduationCap },
  { title: 'Industrial Training', desc: 'Domain-specific, hands-on plant/field programs.', icon: CheckCircle2 },
];

const METHODOLOGY = [
  { step: '01', title: 'Assess', desc: 'Skill-gap analysis and needs assessment.' },
  { step: '02', title: 'Design', desc: 'Custom curriculum aligned to outcomes.' },
  { step: '03', title: 'Deliver', desc: 'Live workshops, hands-on labs, case studies.' },
  { step: '04', title: 'Evaluate', desc: 'Metrics, certifications, and impact tracking.' },
];

export default function CorporateTrainingPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', program: '', message: '' });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, type: 'training' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      toast.success('Enquiry received! Our training team will reach out soon.');
      setForm({ name: '', email: '', phone: '', program: '', message: '' });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader
        eyebrow="CORPORATE TRAINING"
        title={<>Industry-oriented training that <span className="brand-gradient-text">delivers outcomes.</span></>}
        subtitle="From campus-to-corporate transitions to leadership development, our programs are designed with enterprise requirements at their core."
        crumbs={[{ label: 'Services' }, { label: 'Corporate Training' }]}
      />

      {/* Intro image + stats */}
      <section className="pb-16">
        <div className="container grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-[5/4] rounded-3xl overflow-hidden shadow-2xl">
            <Image src="https://images.pexels.com/photos/12903168/pexels-photo-12903168.jpeg" alt="Training" fill className="object-cover" unoptimized />
          </div>
          <div>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-[#231F20]">Programs designed for the modern workplace.</h2>
            <p className="mt-4 text-[#231F20]/70 leading-relaxed">
              Our corporate training programs blend theoretical rigor with real-world application. Delivered by industry veterans, every workshop is crafted to build capability, boost confidence, and drive measurable business impact.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[{ v: '150+', l: 'Workshops' }, { v: '5000+', l: 'Trained' }, { v: '98%', l: 'Satisfaction' }, { v: '10+', l: 'Years' }].map((s) => (
                <div key={s.l} className="rounded-2xl bg-[#F7F9FA] p-4 border border-black/5">
                  <div className="text-2xl font-display font-black brand-gradient-text">{s.v}</div>
                  <div className="text-xs text-[#231F20]/60 mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16 bg-[#F7F9FA]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-[#231F20]">Our <span className="brand-gradient-text">Programs</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROGRAMS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group rounded-2xl bg-white p-6 border border-black/5 hover:border-[#8CC63F]/40 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[#8CC63F]/10 flex items-center justify-center group-hover:bg-[#8CC63F] transition-colors">
                  <p.icon className="w-5 h-5 text-[#8CC63F] group-hover:text-white transition-colors" />
                </div>
                <h3 className="mt-5 text-lg font-display font-bold text-[#231F20]">{p.title}</h3>
                <p className="mt-2 text-sm text-[#231F20]/65">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-[#231F20]">Our <span className="brand-gradient-text">Methodology</span></h2>
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {METHODOLOGY.map((m) => (
              <div key={m.step} className="relative rounded-2xl p-6 bg-white border border-black/5 hover:shadow-xl transition-shadow">
                <div className="text-5xl font-display font-black text-[#8CC63F]/20">{m.step}</div>
                <h3 className="mt-2 text-lg font-display font-bold text-[#231F20]">{m.title}</h3>
                <p className="mt-1 text-sm text-[#231F20]/65">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="py-16 lg:py-24 bg-[#F7F9FA]">
        <div className="container max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-display font-bold text-[#231F20]">Training <span className="brand-gradient-text">Enquiry</span></h2>
            <p className="mt-3 text-[#231F20]/60">Tell us your training needs and we&apos;ll craft a program for you.</p>
          </div>
          <form onSubmit={submit} className="rounded-3xl bg-white p-8 border border-black/5 shadow-xl shadow-black/5 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <TextInput label="Name*" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <TextInput label="Email*" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              <TextInput label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <TextInput label="Interested Program" value={form.program} onChange={(e) => setForm({ ...form, program: e.target.value })} placeholder="e.g., Leadership" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#231F20]/70 mb-1.5">Message</label>
              <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#F7F9FA] border border-black/5 focus:border-[#8CC63F] focus:ring-2 focus:ring-[#8CC63F]/20 outline-none text-sm resize-none" />
            </div>
            <button disabled={loading} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#8CC63F] text-white font-semibold shadow-lg shadow-[#8CC63F]/25 hover:bg-[#231F20] transition-colors disabled:opacity-60">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : <>Submit Enquiry <Send className="w-4 h-4" /></>}
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function TextInput({ label, ...props }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#231F20]/70 mb-1.5">{label}</label>
      <input {...props} className="w-full px-4 py-3 rounded-xl bg-[#F7F9FA] border border-black/5 focus:border-[#8CC63F] focus:ring-2 focus:ring-[#8CC63F]/20 outline-none text-sm" />
    </div>
  );
}
