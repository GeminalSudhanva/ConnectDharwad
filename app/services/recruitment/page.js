'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import PageHeader from '@/components/site/PageHeader';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, MapPin, Clock, ArrowRight, ChevronDown, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const JOBS = [
  { title: 'Software Engineer', company: 'TechNova Solutions', loc: 'Bengaluru', type: 'Full-time', exp: '2-4 yrs', posted: '2 days ago' },
  { title: 'HR Business Partner', company: 'Infosys', loc: 'Hubli', type: 'Full-time', exp: '5+ yrs', posted: '5 days ago' },
  { title: 'Digital Marketing Lead', company: 'Wipro', loc: 'Dharwad', type: 'Full-time', exp: '3-5 yrs', posted: '1 week ago' },
  { title: 'Data Analyst (Fresher)', company: 'Cognizant', loc: 'Bengaluru', type: 'Full-time', exp: '0-1 yrs', posted: '3 days ago' },
  { title: 'Operations Manager', company: 'TCS', loc: 'Hubli', type: 'Full-time', exp: '6+ yrs', posted: '4 days ago' },
];

const FAQS = [
  { q: 'Is there a fee for candidates?', a: 'No. Our recruitment services are 100% free for candidates. Employers pay for placement.' },
  { q: 'How long does the process take?', a: 'Typically 2-4 weeks from application to offer, depending on the role and company.' },
  { q: 'Do you support relocation?', a: 'Yes, most partner companies offer relocation assistance for outstation candidates.' },
  { q: 'Can freshers apply?', a: 'Absolutely. We have dedicated campus-to-corporate programs and fresher-friendly openings.' },
];

export default function RecruitmentPage() {
  const [jobs, setJobs] = useState(JOBS);
  const [openFaq, setOpenFaq] = useState(null);
  const [applyFor, setApplyFor] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', coverLetter: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/public/jobs')
      .then((r) => r.json())
      .then((d) => {
        if (d.items && d.items.length > 0) {
          setJobs(d.items.filter((j) => j.active));
        }
      })
      .catch((e) => console.error(e));
  }, []);

  const submitApp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, position: applyFor?.title || 'General' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      toast.success('Application submitted! We\u2019ll review and get back to you.');
      setApplyFor(null);
      setForm({ name: '', email: '', phone: '', coverLetter: '' });
    } catch (err) { toast.error(err.message); } finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader
        eyebrow="RECRUITMENT"
        title={<>Connecting <span className="brand-gradient-text">talent</span> with opportunity.</>}
        subtitle="End-to-end recruitment services. From sourcing to onboarding, we help enterprises hire the right people, faster."
        crumbs={[{ label: 'Services' }, { label: 'Recruitment' }]}
      />

      {/* Openings */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <h2 className="text-4xl font-display font-bold text-[#231F20]">Current <span className="brand-gradient-text">Openings</span></h2>
              <p className="mt-2 text-[#231F20]/60">Curated roles from our partner companies.</p>
            </div>
          </div>
          <div className="space-y-3">
            {jobs.map((j, i) => (
              <motion.div
                key={j.id || i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="group rounded-2xl bg-white p-5 lg:p-6 border border-black/5 hover:border-[#8CC63F]/40 hover:shadow-lg transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#8CC63F]/10 flex items-center justify-center shrink-0">
                    <Briefcase className="w-5 h-5 text-[#8CC63F]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-display font-bold text-[#231F20]">{j.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[#83B9E6]/20 text-[#5C9CD3] font-semibold">{j.type}</span>
                    </div>
                    <div className="mt-1 text-sm text-[#231F20]/60">{j.company}</div>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-[#231F20]/60">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{j.location || j.loc}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{j.experience || j.exp || 'Not specified'}</span>
                      <span className="text-[#8CC63F]">{j.createdAt ? `Posted ${new Date(j.createdAt).toLocaleDateString()}` : `Posted ${j.posted}`}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setApplyFor(j)}
                    className="px-5 py-2.5 rounded-full bg-[#8CC63F] text-white text-sm font-semibold hover:bg-[#231F20] transition-colors inline-flex items-center gap-1.5 shrink-0"
                  >
                    Apply Now <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 lg:py-20 bg-[#F7F9FA]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-[#231F20]">Our <span className="brand-gradient-text">Process</span></h2>
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {[
              { s: '01', t: 'Apply', d: 'Submit your profile online.' },
              { s: '02', t: 'Screen', d: 'Initial screening and skill match.' },
              { s: '03', t: 'Interview', d: 'Interviews with partner companies.' },
              { s: '04', t: 'Onboard', d: 'Offer, joining, and support.' },
            ].map((p) => (
              <div key={p.s} className="rounded-2xl p-6 bg-white border border-black/5 hover:shadow-xl transition-shadow">
                <div className="text-5xl font-display font-black text-[#8CC63F]/20">{p.s}</div>
                <h3 className="mt-2 text-lg font-display font-bold text-[#231F20]">{p.t}</h3>
                <p className="mt-1 text-sm text-[#231F20]/65">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 lg:py-20">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-display font-bold text-[#231F20]">Frequently Asked <span className="brand-gradient-text">Questions</span></h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <div key={i} className="rounded-2xl bg-white border border-black/5 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                  <span className="font-display font-semibold text-[#231F20]">{f.q}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && <div className="px-5 pb-5 text-sm text-[#231F20]/65 leading-relaxed">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply modal */}
      <AnimatePresence>
        {applyFor && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setApplyFor(null)}
          >
            <motion.form
              onSubmit={submitApp}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="text-xs font-semibold text-[#8CC63F] uppercase tracking-wider">Apply for</div>
              <h3 className="mt-1 text-2xl font-display font-bold text-[#231F20]">{applyFor.title}</h3>
              <div className="text-sm text-[#231F20]/60">{applyFor.company} • {applyFor.loc}</div>
              <div className="mt-6 space-y-3">
                <FormInput label="Full Name*" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                <FormInput label="Email*" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                <FormInput label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <div>
                  <label className="block text-xs font-semibold text-[#231F20]/70 mb-1.5">Cover Letter</label>
                  <textarea rows={4} value={form.coverLetter} onChange={(e) => setForm({ ...form, coverLetter: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#F7F9FA] border border-black/5 focus:border-[#8CC63F] outline-none text-sm resize-none" />
                </div>
              </div>
              <div className="mt-6 flex gap-2">
                <button type="button" onClick={() => setApplyFor(null)} className="px-6 py-3 rounded-full border border-black/10 text-[#231F20] font-semibold">Cancel</button>
                <button disabled={loading} className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#8CC63F] text-white font-semibold hover:bg-[#231F20] transition-colors disabled:opacity-60">
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : <>Submit <Send className="w-4 h-4" /></>}
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}

function FormInput({ label, ...props }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#231F20]/70 mb-1.5">{label}</label>
      <input {...props} className="w-full px-4 py-3 rounded-xl bg-[#F7F9FA] border border-black/5 focus:border-[#8CC63F] outline-none text-sm" />
    </div>
  );
}
