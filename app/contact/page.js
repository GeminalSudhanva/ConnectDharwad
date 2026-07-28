'use client';

import { useState } from 'react';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import PageHeader from '@/components/site/PageHeader';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Clock, Send, MessageCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'General', message: '' });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      toast.success('Message sent! We\u2019ll get back to you within 24 hours.');
      setForm({ name: '', email: '', phone: '', subject: 'General', message: '' });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader
        eyebrow="CONTACT US"
        title={<>Let&apos;s <span className="brand-gradient-text">start a conversation.</span></>}
        subtitle="Reach out to us for training programs, recruitment services, consultancy, or partnerships. We respond within 24 hours."
        crumbs={[{ label: 'Contact' }]}
      />

      <section className="pb-20 lg:pb-28">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left — info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 space-y-4"
            >
              {[
                { icon: MapPin, label: 'Visit Us', value: 'Dharwad, Karnataka, India — 580001', color: '#8CC63F' },
                { icon: Mail, label: 'Email Us', value: 'connect@dharwad.org', link: 'mailto:connect@dharwad.org', color: '#83B9E6' },
                { icon: Phone, label: 'Call Us', value: '+91 98765 43210', link: 'tel:+919876543210', color: '#8CC63F' },
                { icon: Clock, label: 'Working Hours', value: 'Mon–Sat, 9:00 AM – 6:30 PM', color: '#83B9E6' },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.link || '#'}
                  className="block rounded-2xl bg-white p-5 border border-black/5 hover:border-[#8CC63F]/40 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${c.color}22` }}>
                      <c.icon className="w-5 h-5" style={{ color: c.color }} />
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-[#231F20]/50 font-semibold">{c.label}</div>
                      <div className="font-medium text-[#231F20] mt-0.5">{c.value}</div>
                    </div>
                  </div>
                </a>
              ))}

              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold transition-colors"
              >
                <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
              </a>

              <div className="rounded-2xl overflow-hidden border border-black/5 h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15380.79!2d75.008!3d15.458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sDharwad!5e0!3m2!1sen!2sin!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.form
              onSubmit={submit}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-3 rounded-3xl bg-white p-8 lg:p-10 border border-black/5 shadow-xl shadow-black/5"
            >
              <h2 className="text-2xl font-display font-bold text-[#231F20]">Send us a message</h2>
              <p className="mt-1 text-sm text-[#231F20]/60">Fill out the form and our team will reach out shortly.</p>

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                <Field label="Full Name*" value={form.name} onChange={update('name')} required />
                <Field label="Email*" type="email" value={form.email} onChange={update('email')} required />
                <Field label="Phone" value={form.phone} onChange={update('phone')} />
                <div>
                  <label className="block text-xs font-semibold text-[#231F20]/70 mb-1.5">Subject</label>
                  <select
                    value={form.subject}
                    onChange={update('subject')}
                    className="w-full px-4 py-3 rounded-xl bg-[#F7F9FA] border border-black/5 focus:border-[#8CC63F] focus:ring-2 focus:ring-[#8CC63F]/20 outline-none text-[#231F20] text-sm transition"
                  >
                    <option>General</option>
                    <option>Corporate Training</option>
                    <option>Recruitment</option>
                    <option>Consultancy</option>
                    <option>Partnership</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs font-semibold text-[#231F20]/70 mb-1.5">Message*</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={update('message')}
                  className="w-full px-4 py-3 rounded-xl bg-[#F7F9FA] border border-black/5 focus:border-[#8CC63F] focus:ring-2 focus:ring-[#8CC63F]/20 outline-none text-[#231F20] text-sm resize-none transition"
                  placeholder="Tell us how we can help..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#8CC63F] text-white font-semibold shadow-lg shadow-[#8CC63F]/25 hover:bg-[#231F20] transition-colors disabled:opacity-60"
              >
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : <>Send Message <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>}
              </button>
            </motion.form>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function Field({ label, ...props }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#231F20]/70 mb-1.5">{label}</label>
      <input
        {...props}
        className="w-full px-4 py-3 rounded-xl bg-[#F7F9FA] border border-black/5 focus:border-[#8CC63F] focus:ring-2 focus:ring-[#8CC63F]/20 outline-none text-[#231F20] text-sm transition"
      />
    </div>
  );
}
