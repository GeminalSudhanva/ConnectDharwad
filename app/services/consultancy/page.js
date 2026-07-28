'use client';

import { useState } from 'react';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import PageHeader from '@/components/site/PageHeader';
import { Lightbulb, TrendingUp, Users, Building2, Loader2, Send } from 'lucide-react';
import { toast } from 'sonner';

const SERVICES = [
  { icon: TrendingUp, title: 'Business Consultancy', desc: 'Strategy, operations, and go-to-market advisory for SMEs and enterprises.' },
  { icon: Users, title: 'Career Guidance', desc: 'Personalized coaching for students and professionals at every career stage.' },
  { icon: Building2, title: 'Corporate Consultancy', desc: 'Organizational design, culture, and workforce transformation programs.' },
  { icon: Lightbulb, title: 'Skill Development', desc: 'Curriculum design and skill benchmarking for institutions and enterprises.' },
];

const INDUSTRIES = ['IT & Software', 'BFSI', 'Manufacturing', 'Healthcare', 'Retail & E-commerce', 'Education', 'Automotive', 'Pharma'];

export default function ConsultancyPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', program: '', message: '' });
  const [loading, setLoading] = useState(false);
  const submit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      const r = await fetch('/api/enquiries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, type: 'consultancy' }) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error);
      toast.success('Request received. Our consultants will reach out shortly.');
      setForm({ name: '', email: '', phone: '', program: '', message: '' });
    } catch (err) { toast.error(err.message); } finally { setLoading(false); }
  };
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader eyebrow="CONSULTANCY" title={<>Strategic advisory that <span className="brand-gradient-text">drives outcomes.</span></>}
        subtitle="Deep sectoral expertise combined with practical, results-driven approach across business, career, and workforce challenges."
        crumbs={[{ label: 'Services' }, { label: 'Consultancy' }]} />

      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-5">
            {SERVICES.map((s) => (
              <div key={s.title} className="rounded-3xl bg-white p-8 border border-black/5 hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-xl brand-gradient flex items-center justify-center shadow-lg">
                  <s.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="mt-5 text-xl font-display font-bold text-[#231F20]">{s.title}</h3>
                <p className="mt-2 text-[#231F20]/65">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F7F9FA]">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-display font-bold text-[#231F20]">Industries <span className="brand-gradient-text">We Serve</span></h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {INDUSTRIES.map((i) => (
              <div key={i} className="px-6 py-3 rounded-full bg-white border border-black/5 hover:border-[#8CC63F]/50 hover:bg-[#8CC63F]/5 transition-all text-[#231F20] font-medium">
                {i}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-display font-bold text-[#231F20]">Request a <span className="brand-gradient-text">Consultation</span></h2>
          </div>
          <form onSubmit={submit} className="rounded-3xl bg-white p-8 border border-black/5 shadow-xl shadow-black/5 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Fld label="Name*" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <Fld label="Email*" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              <Fld label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <Fld label="Area of Interest" value={form.program} onChange={(e) => setForm({ ...form, program: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#231F20]/70 mb-1.5">Tell us about your requirements</label>
              <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#F7F9FA] border border-black/5 focus:border-[#8CC63F] outline-none text-sm resize-none" />
            </div>
            <button disabled={loading} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#8CC63F] text-white font-semibold shadow-lg shadow-[#8CC63F]/25 hover:bg-[#231F20] transition-colors disabled:opacity-60">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : <>Send Request <Send className="w-4 h-4" /></>}
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
}
function Fld({ label, ...p }) {
  return (<div><label className="block text-xs font-semibold text-[#231F20]/70 mb-1.5">{label}</label><input {...p} className="w-full px-4 py-3 rounded-xl bg-[#F7F9FA] border border-black/5 focus:border-[#8CC63F] outline-none text-sm" /></div>);
}
