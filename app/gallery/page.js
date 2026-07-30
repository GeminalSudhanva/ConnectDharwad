'use client';

import { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import PageHeader from '@/components/site/PageHeader';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Search } from 'lucide-react';

const IMAGES = [];

const CATEGORIES = ['All', 'Corporate Training', 'Recruitment', 'Consultancy', 'Workshops', 'Seminars', 'Industrial Visits', 'Campus Events'];

export default function GalleryPage() {
  const [images, setImages] = useState(IMAGES);
  const [cat, setCat] = useState('All');
  const [search, setSearch] = useState('');
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    fetch('/api/public/gallery')
      .then((r) => r.json())
      .then((d) => {
        if (d.items && d.items.length > 0) {
          setImages(d.items.map((i) => ({ url: i.url, cat: i.category, title: i.title })));
        }
      })
      .catch((e) => console.error(e));
  }, []);

  const filtered = useMemo(() => images.filter((i) => (cat === 'All' || i.cat === cat) && i.title.toLowerCase().includes(search.toLowerCase())), [images, cat, search]);

  const nav = (delta) => {
    const idx = filtered.findIndex((i) => i.url === lightbox?.url);
    const next = (idx + delta + filtered.length) % filtered.length;
    setLightbox(filtered[next]);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader eyebrow="GALLERY" title={<>Moments from our <span className="brand-gradient-text">journey.</span></>}
        subtitle="Snapshots from workshops, training sessions, consultancy engagements, and campus events."
        crumbs={[{ label: 'Gallery' }]} />

      <section className="pb-8">
        <div className="container flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => setCat(c)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${cat === c ? 'bg-[#8CC63F] text-white shadow-lg shadow-[#8CC63F]/25' : 'bg-[#F7F9FA] text-[#231F20]/70 hover:bg-black/5'}`}>
                {c}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#231F20]/40" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search photos…"
              className="pl-10 pr-4 py-2.5 rounded-full bg-[#F7F9FA] border border-black/5 focus:border-[#8CC63F] outline-none text-sm w-64" />
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-[#231F20]/50">No images match your filter.</div>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {filtered.map((img, i) => (
                <motion.button
                  key={img.url}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (i % 8) * 0.04 }}
                  onClick={() => setLightbox(img)}
                  className="group block w-full break-inside-avoid rounded-2xl overflow-hidden bg-black/5 relative"
                >
                  <img src={img.url} alt={img.title} className="w-full h-auto group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div>
                      <div className="text-xs font-semibold text-[#8CC63F]">{img.cat}</div>
                      <div className="text-sm font-display font-bold text-white">{img.title}</div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <button onClick={(e) => { e.stopPropagation(); nav(-1); }} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); nav(1); }} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center">
              <ChevronRight className="w-6 h-6" />
            </button>
            <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center">
              <X className="w-5 h-5" />
            </button>
            <motion.div
              key={lightbox.url}
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="max-w-5xl w-full max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={lightbox.url} alt={lightbox.title} className="max-h-[80vh] w-auto rounded-2xl shadow-2xl" />
              <div className="mt-4 text-center">
                <div className="text-xs font-semibold text-[#8CC63F] uppercase tracking-wider">{lightbox.cat}</div>
                <div className="mt-1 font-display font-bold text-white text-lg">{lightbox.title}</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
