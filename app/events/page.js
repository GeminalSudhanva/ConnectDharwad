'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import PageHeader from '@/components/site/PageHeader';
import Image from 'next/image';
import { Calendar, MapPin, ArrowRight, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const UPCOMING = [];

const PAST = [];

export default function EventsPage() {
  const [upcoming, setUpcoming] = useState(UPCOMING);
  const [past, setPast] = useState(PAST);

  useEffect(() => {
    fetch('/api/public/events')
      .then((r) => r.json())
      .then((d) => {
        if (d.items && d.items.length > 0) {
          const up = d.items.filter((e) => !e.isPast);
          const ps = d.items.filter((e) => e.isPast);
          if (up.length > 0) setUpcoming(up);
          if (ps.length > 0) setPast(ps);
        }
      })
      .catch((e) => console.error(e));
  }, []);
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader eyebrow="EVENTS" title={<>Learn. <span className="brand-gradient-text">Network.</span> Grow.</>}
        subtitle="Workshops, summits, and industry meets designed to elevate careers and businesses."
        crumbs={[{ label: 'Events' }]} />

      <section className="pb-16">
        <div className="container">
          <h2 className="text-3xl font-display font-bold text-[#231F20] mb-8">Upcoming Events</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcoming.map((e, i) => (
              <motion.article
                key={e.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group rounded-3xl bg-white border border-black/5 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all"
              >
                <div className="relative aspect-[16/10]">
                  <Image src={e.bannerUrl || e.banner} alt={e.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-semibold text-[#231F20]">
                    {e.date}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-display font-bold text-[#231F20]">{e.title}</h3>
                  <p className="mt-2 text-sm text-[#231F20]/65 line-clamp-2">{e.description || e.desc}</p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-[#231F20]/60">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{e.date}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{e.location || e.loc}</span>
                  </div>
                  {e.registerUrl && e.registerUrl.trim() !== '' ? (
                    <a
                      href={e.registerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 w-full inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-[#8CC63F] text-white text-sm font-semibold hover:bg-[#231F20] transition-colors"
                    >
                      Register <ArrowRight className="w-4 h-4" />
                    </a>
                  ) : null}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F7F9FA]">
        <div className="container">
          <h2 className="text-3xl font-display font-bold text-[#231F20] mb-8">Past Events</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {past.map((e) => (
              <div key={e.title} className="rounded-2xl bg-white p-5 border border-black/5 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#83B9E6]/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#5C9CD3]" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-[#231F20] text-sm">{e.title}</div>
                    <div className="text-xs text-[#231F20]/60 mt-0.5">{e.date} • {e.location || e.loc}</div>
                  </div>
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
