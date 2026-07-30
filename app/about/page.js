'use client';

import { useState, useEffect } from 'react';
import PageHeader from '@/components/site/PageHeader';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import { Target, Eye, Heart, Award, Users, Rocket } from 'lucide-react';

const TIMELINE = [
  { year: '2013', title: 'CONNECT Founded', desc: 'Started value-added training establishment adopting a unique methodology to bring about desired behavioral changes in individuals.' },
  { year: '2021', title: 'Recruitment Services Established', desc: 'Launched recruitment vertical to meet manpower demands of brands like Toyota Kirloskar, Honda, Tata Marcopolo, etc.' },
  { year: '2025', title: 'Dynamic Impact Milestone', desc: 'Crossed 2.2L+ students, 5.2L+ employees, and 44k+ teachers trained, with 30k+ placements.' },
];

const LEADERS = [
  { name: 'Girish Angadi', role: 'Founder & MD', bio: 'Human Resource Expert and Corporate Trainer leading Connect Dharwad.', initials: 'GA' },
  { name: 'Nagendrappa S', role: 'Co-founder & Executive Director', bio: 'Soft Skill Trainer guiding candidate behavioral growth.', initials: 'NS' },
  { name: 'J Reghupathi', role: 'Co-Founder', bio: 'Soft Skill Trainer driving custom organizational training.', initials: 'JR' },
  { name: 'Mahesh Masal', role: 'Life Coach', bio: 'Helping professionals and students motivate and excel.', initials: 'MM' },
];

export default function AboutPage() {
  const [leaders, setLeaders] = useState(LEADERS);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch('/api/public/trainers')
      .then((r) => r.json())
      .then((d) => {
        if (d.items && d.items.length > 0) setLeaders(d.items);
      })
      .catch((e) => console.error(e));
  }, []);

  const visibleLeaders = showAll ? leaders : leaders.slice(0, 4);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader
        eyebrow="ABOUT US"
        title={<><span className="brand-gradient-text">A decade</span> of building careers, empowering enterprises.</>}
        subtitle="Connect Dharwad is a professional services organization dedicated to industry-oriented training, recruitment, and consultancy — built on trust, delivered with excellence."
        crumbs={[{ label: 'About' }]}
      />

      {/* Mission Vision Values */}
      <section className="py-16 lg:py-20">
        <div className="container grid md:grid-cols-3 gap-6">
          {[
            { icon: Target, title: 'Our Mission', text: 'To empower every learner with industry-ready skills and every enterprise with future-ready talent.' },
            { icon: Eye, title: 'Our Vision', text: 'To be the most trusted career catalyst in India — the bridge between potential and opportunity.' },
            { icon: Heart, title: 'Our Values', text: 'Excellence, integrity, empathy, and impact. These are non-negotiable in everything we do.' },
          ].map((v) => (
            <div key={v.title} className="rounded-3xl p-8 bg-[#F7F9FA] border border-black/5 hover:border-[#8CC63F]/40 hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-xl brand-gradient flex items-center justify-center shadow-lg">
                <v.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="mt-5 text-xl font-display font-bold text-[#231F20]">{v.title}</h3>
              <p className="mt-3 text-[15px] text-[#231F20]/70 leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-24 bg-[#F7F9FA]">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#8CC63F]/30 mb-4">
              <span className="text-xs font-semibold tracking-wider text-[#6EA82F]">OUR JOURNEY</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-[#231F20] text-balance">
              A decade of <span className="brand-gradient-text">purposeful progress.</span>
            </h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#8CC63F] via-[#83B9E6] to-transparent" />
            {TIMELINE.map((t, i) => (
              <div key={t.year} className={`relative flex items-start gap-6 pb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-[#8CC63F] ring-4 ring-white shadow-lg z-10" />
                <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className="rounded-2xl bg-white p-6 border border-black/5 shadow-sm hover:shadow-xl transition-shadow">
                    <div className="text-2xl font-display font-black brand-gradient-text">{t.year}</div>
                    <h4 className="mt-1 text-lg font-display font-bold text-[#231F20]">{t.title}</h4>
                    <p className="mt-2 text-sm text-[#231F20]/65 leading-relaxed">{t.desc}</p>
                  </div>
                </div>
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#83B9E6]/15 border border-[#83B9E6]/30 mb-4">
              <span className="text-xs font-semibold tracking-wider text-[#5C9CD3]">LEADERSHIP</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-[#231F20] text-balance">
              Led by <span className="brand-gradient-text">industry veterans.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {visibleLeaders.map((l) => {
              const initials = l.initials || l.name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase();
              return (
                <div key={l.name} className="rounded-3xl bg-white p-6 border border-black/5 hover:shadow-2xl transition-all">
                  <div className="relative w-full aspect-square rounded-2xl brand-gradient flex items-center justify-center text-white text-5xl font-display font-black overflow-hidden">
                    {l.photoUrl ? (
                      <img src={l.photoUrl} alt={l.name} className="w-full h-full object-cover" />
                    ) : (
                      initials
                    )}
                  </div>
                  <div className="mt-4 font-display font-bold text-[#231F20]">{l.name}</div>
                  <div className="text-sm text-[#8CC63F] font-semibold">{l.role}</div>
                  <p className="mt-2 text-[13px] text-[#231F20]/65 leading-relaxed">{l.bio || l.description}</p>
                </div>
              );
            })}
          </div>

          {leaders.length > 4 && (
            <div className="text-center mt-12">
              <button onClick={() => setShowAll(!showAll)} className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#8CC63F] hover:bg-[#231F20] text-white font-semibold transition-colors shadow-lg shadow-[#8CC63F]/20">
                {showAll ? 'View Less' : 'View More'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 lg:py-24 bg-[#231F20] relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="container relative">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-white">Recognition &amp; <span className="text-[#8CC63F]">Achievements</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: Award, title: 'Best Training Institute 2023', by: 'Karnataka Skill Council' },
              { icon: Users, title: '5000+ Alumni Network', by: 'Across 200+ Companies' },
              { icon: Rocket, title: 'Top MSME Consultancy', by: 'Dharwad Chamber of Commerce' },
            ].map((a) => (
              <div key={a.title} className="glass-dark rounded-2xl p-6 border border-white/10">
                <div className="w-12 h-12 rounded-xl bg-[#8CC63F]/20 flex items-center justify-center">
                  <a.icon className="w-6 h-6 text-[#8CC63F]" />
                </div>
                <h4 className="mt-5 font-display font-bold text-white text-lg">{a.title}</h4>
                <p className="text-sm text-white/60 mt-1">{a.by}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
