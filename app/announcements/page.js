'use client';

import { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import PageHeader from '@/components/site/PageHeader';
import { Search, ArrowRight, X, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ANNOUNCEMENTS = [
  { title: 'CONNECT Udyog Utsav 2026', date: 'Jul 2026', desc: 'Bridging the gap between North Karnataka\'s talent and leading companies.' },
  { title: 'Soft Skills Training Launch', date: 'Aug 2026', desc: 'New batch starting for communication skills, team building, and leadership training.' },
];

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState(ANNOUNCEMENTS);
  const [search, setSearch] = useState('');
  const [activeAnnouncement, setActiveAnnouncement] = useState(null);

  useEffect(() => {
    fetch('/api/public/announcements')
      .then((r) => r.json())
      .then((d) => {
        if (d.items && d.items.length > 0) setAnnouncements(d.items);
      })
      .catch((e) => console.error(e));
  }, []);

  const filtered = useMemo(() => {
    return announcements.filter((a) => {
      const titleMatch = a.title.toLowerCase().includes(search.toLowerCase());
      const descMatch = (a.description || a.desc || '').toLowerCase().includes(search.toLowerCase());
      return titleMatch || descMatch;
    });
  }, [announcements, search]);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader
        eyebrow="ANNOUNCEMENTS"
        title={<>Stay updated with <span className="brand-gradient-text">Connect Dharwad.</span></>}
        subtitle="Latest news, corporate programs, job drives, and key alerts from our team."
        crumbs={[{ label: 'Announcements' }]}
      />

      <section className="pb-8">
        <div className="container flex flex-col sm:flex-row sm:items-center gap-4 justify-between border-b border-black/5 pb-6">
          <div>
            <h2 className="text-xl font-display font-bold text-[#231F20]">Recent Updates</h2>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#231F20]/40" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search announcements…"
              className="pl-10 pr-4 py-2.5 rounded-full bg-[#F7F9FA] border border-black/5 focus:border-[#8CC63F] outline-none text-sm w-64"
            />
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-[#231F20]/50">No announcements match your search.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((a, i) => (
                <motion.div
                  key={a.id || a.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
                  className="rounded-2xl bg-white border border-black/5 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col"
                >
                  {a.imageUrl && (
                    <div className="relative aspect-[16/9] w-full bg-black/5 overflow-hidden">
                      <img src={a.imageUrl} alt={a.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-xs text-[#8CC63F] font-semibold">
                        <Calendar className="w-3.5 h-3.5" /> {a.date}
                      </div>
                      <h4 className="mt-3 font-display font-bold text-[#231F20] text-lg leading-snug">{a.title}</h4>
                      <p className="mt-2 text-sm text-[#231F20]/65 line-clamp-3 leading-relaxed">
                        {a.description || a.desc}
                      </p>
                    </div>
                    <div className="mt-5">
                      <button
                        onClick={() => setActiveAnnouncement(a)}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#231F20] hover:text-[#8CC63F] transition-colors"
                      >
                        Read More <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Announcement Modal Popup */}
      <AnimatePresence>
        {activeAnnouncement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveAnnouncement(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl relative max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveAnnouncement(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/45 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {activeAnnouncement.imageUrl && (
                <div className="relative aspect-[16/9] w-full bg-black/5 overflow-hidden shrink-0">
                  <img src={activeAnnouncement.imageUrl} alt={activeAnnouncement.title} className="w-full h-full object-cover" />
                </div>
              )}

              <div className="p-6 overflow-y-auto">
                <div className="flex items-center gap-1 text-xs font-semibold text-[#8CC63F] bg-[#8CC63F]/10 px-2.5 py-1 rounded-full w-fit">
                  <Calendar className="w-3.5 h-3.5" /> {activeAnnouncement.date}
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold text-[#231F20]">{activeAnnouncement.title}</h3>
                <p className="mt-4 text-sm text-[#231F20]/80 leading-relaxed whitespace-pre-line">
                  {activeAnnouncement.description || activeAnnouncement.desc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
