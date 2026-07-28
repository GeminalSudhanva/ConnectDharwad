'use client';

import { useState } from 'react';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import PageHeader from '@/components/site/PageHeader';
import { Quote, Star, Play, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const REVIEWS = [
  { name: 'Priya Kulkarni', role: 'HR Head, TechNova', type: 'Corporate', quote: 'Connect Dharwad transformed our onboarding pipeline. Their trainers deliver corporate-ready talent that hits the ground running.', rating: 5, initials: 'PK' },
  { name: 'Rohan Deshpande', role: 'SE, Infosys', type: 'Student', quote: 'The campus-to-corporate program gave me the confidence and skills that made all the difference in my career.', rating: 5, initials: 'RD' },
  { name: 'Anitha Rao', role: 'Director, MSME Council', type: 'Corporate', quote: 'Professional, insightful, and results-driven. Their consultancy reshaped how we approach workforce development.', rating: 5, initials: 'AR' },
  { name: 'Vikram Patil', role: 'TA, Wipro', type: 'Corporate', quote: 'Their recruitment team delivers pre-vetted candidates matched to our exact requirements. A strategic partner.', rating: 5, initials: 'VP' },
  { name: 'Sneha Kamath', role: 'MBA Student', type: 'Student', quote: 'The leadership training changed how I approach problems. Highly recommended for anyone serious about growth.', rating: 5, initials: 'SK' },
  { name: 'Karthik Rao', role: 'Founder, EduTech Startup', type: 'Corporate', quote: 'Consultancy sessions helped us restructure operations. Real, actionable insights that moved the needle.', rating: 5, initials: 'KR' },
  { name: 'Deepika Nair', role: 'Graduate 2024', type: 'Student', quote: 'Got placed at Cognizant thanks to their placement team. Interview prep was thorough and industry-relevant.', rating: 5, initials: 'DN' },
  { name: 'Manoj Bhat', role: 'HR Manager, TCS', type: 'Corporate', quote: 'Efficient, professional, and always delivered on time. Our go-to training partner for the last 3 years.', rating: 5, initials: 'MB' },
];

const VIDEOS = [
  { title: 'From Campus to Corporate — A Journey', by: 'Rohan D., Infosys', thumb: 'https://images.pexels.com/photos/7693729/pexels-photo-7693729.jpeg' },
  { title: 'Why We Chose Connect Dharwad', by: 'Priya K., TechNova', thumb: 'https://images.pexels.com/photos/5668498/pexels-photo-5668498.jpeg' },
  { title: 'Leadership Program Impact', by: 'Sneha K., Alumni', thumb: 'https://images.pexels.com/photos/12903168/pexels-photo-12903168.jpeg' },
];

export default function TestimonialsPage() {
  const [filter, setFilter] = useState('All');
  const [q, setQ] = useState('');
  const filtered = REVIEWS.filter((r) => (filter === 'All' || r.type === filter) && (r.name.toLowerCase().includes(q.toLowerCase()) || r.quote.toLowerCase().includes(q.toLowerCase())));

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader eyebrow="TESTIMONIALS" title={<>Voices of <span className="brand-gradient-text">success.</span></>}
        subtitle="Real stories from students, professionals, and corporate partners we\u2019ve had the privilege to work with."
        crumbs={[{ label: 'Testimonials' }]} />

      <section className="pb-8">
        <div className="container flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
          <div className="flex gap-2">
            {['All', 'Corporate', 'Student'].map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${filter === f ? 'bg-[#8CC63F] text-white' : 'bg-[#F7F9FA] text-[#231F20]/70 hover:bg-black/5'}`}>{f}</button>
            ))}
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#231F20]/40" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search testimonials…" className="pl-10 pr-4 py-2.5 rounded-full bg-[#F7F9FA] border border-black/5 focus:border-[#8CC63F] outline-none text-sm w-64" />
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.06 }}
                className="rounded-3xl p-7 bg-white border border-black/5 hover:shadow-2xl transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <Quote className="w-7 h-7 text-[#8CC63F]/30" />
                  <div className="flex">{[...Array(r.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-[#8CC63F] text-[#8CC63F]" />)}</div>
                </div>
                <p className="mt-4 text-[15px] text-[#231F20]/80 leading-relaxed">&ldquo;{r.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl brand-gradient flex items-center justify-center text-white font-display font-bold">{r.initials}</div>
                  <div>
                    <div className="font-display font-bold text-[#231F20]">{r.name}</div>
                    <div className="text-xs text-[#231F20]/60">{r.role}</div>
                  </div>
                  <span className={`ml-auto text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full ${r.type === 'Corporate' ? 'bg-[#83B9E6]/20 text-[#5C9CD3]' : 'bg-[#8CC63F]/15 text-[#6EA82F]'}`}>{r.type}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F7F9FA]">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-display font-bold text-[#231F20]">Video <span className="brand-gradient-text">Testimonials</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {VIDEOS.map((v) => (
              <div key={v.title} className="group relative rounded-2xl overflow-hidden aspect-video cursor-pointer">
                <img src={v.thumb} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-[#8CC63F] ml-1" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="font-display font-bold text-white text-sm">{v.title}</div>
                  <div className="text-xs text-white/70 mt-0.5">{v.by}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
