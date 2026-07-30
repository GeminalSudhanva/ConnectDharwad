'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import {
  ArrowRight, Sparkles, GraduationCap, Briefcase, Lightbulb,
  Users, Target, Rocket, Award, HeartHandshake, Building2, Star, MapPin, Phone,
  Linkedin, Quote, CheckCircle2, TrendingUp, Mail,
} from 'lucide-react';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';

/* ---------------- Data ---------------- */

const SERVICES = [
  {
    icon: GraduationCap, href: '/services/corporate-training',
    title: 'Corporate Training',
    desc: 'Industry-oriented programs in technical skills, soft skills, leadership, and campus-to-corporate transitions.',
    features: ['Technical Training', 'Soft Skills', 'Leadership', 'Communication'],
    color: 'from-[#8CC63F] to-[#6EA82F]',
  },
  {
    icon: Briefcase, href: '/services/recruitment',
    title: 'Recruitment',
    desc: 'End-to-end talent acquisition connecting the right candidates with leading organizations across industries.',
    features: ['Talent Sourcing', 'Screening', 'Placements', 'Employer Branding'],
    color: 'from-[#83B9E6] to-[#5C9CD3]',
  },
  {
    icon: Lightbulb, href: '/services/consultancy',
    title: 'Consultancy',
    desc: 'Strategic business, career, and skill-development consulting tailored to your organizational objectives.',
    features: ['Business Consultancy', 'Career Guidance', 'Corporate Advisory', 'Skill Dev.'],
    color: 'from-[#231F20] to-[#3a3435]',
  },
];

const STATS = [
  { value: 228984, suffix: '+', label: 'Students' },
  { value: 523197, suffix: '+', label: 'Employees Trained' },
  { value: 44607, suffix: '+', label: 'Teachers' },
  { value: 30231, suffix: '+', label: 'Placements' },
  { value: 61, suffix: '+', label: 'Udyog Utsavs' },
];

const WHY_US = [
  { icon: Users, title: 'Experienced Trainers', desc: 'Industry veterans with corporate expertise across domains.' },
  { icon: Target, title: 'Industry-Oriented Programs', desc: 'Curriculum designed with real-world corporate requirements.' },
  { icon: Rocket, title: 'Placement Support', desc: 'Dedicated placement cell with successful placements.' },
  { icon: Award, title: 'Expert Consultancy', desc: 'Strategic advisory rooted in deep industry knowledge.' },
  { icon: HeartHandshake, title: 'Corporate Partnerships', desc: 'Strong network with leading organizations.' },
  { icon: Building2, title: 'Hands-on Workshops', desc: 'Practical, project-driven learning experiences.' },
];

const TESTIMONIALS = [
  { name: 'Dr. Purushottam Bung', role: 'Professor & Director, RVIM Bengaluru', quote: 'CONNECT profiling of our MBA students truly mirrors their current standing which wakes them up to standardize their skills.', rating: 5, initials: 'PB' },
  { name: 'Dr. Pushkar Singh Kanwal', role: 'Legal Officer at Agri-industry', quote: 'Workshops was excellent for enhancing my skills and abilities regarding seed business in India. It is highly informative for crop failures and its management. It is very useful and required to all employees of the company etc.', rating: 5, initials: 'PK' },
  { name: 'Dr. Chandrashekar Hunsihal', role: 'Academician', quote: 'Wonderful Outbound Training Programme by Connect. Amazing Learning with Fun & Adventure. Well organized & managed by Team Connect.', rating: 5, initials: 'CH' },
  { name: 'Mr. T Jayaram', role: 'Senior Manager, Tata Motors', quote: 'Kats off to YOU & YOUR team for inspiring OUR students and staff.', rating: 5, initials: 'TJ' },
  { name: 'Mr. MADIVALAPPA', role: 'IR Manager, Toyota Auto Parts Ltd', quote: 'CONNECT through its ODU-GKY program, has transformed many youths & injected Soft Skills in a very interesting way. It has transformed my life.', rating: 5, initials: 'M' },
];

const CLIENTS = [
  'Toyota Kirloskar Motors Ltd',
  'Honda',
  'Tata Marcopolo Ltd',
  'Toyota Auto Parts',
  'TDPS',
  'NTTF',
  'LIC',
  'JSW',
  'PwC',
  'Cargill',
  'Societe Generale',
  'DLF',
  'Tata Motors',
];

const TRAINERS = [
  { name: 'Girish Angadi', role: 'Founder & MD', exp: 'Corporate Trainer', avatar: 'GA' },
  { name: 'Nagendrappa S', role: 'Co-founder & Executive Director', exp: 'Soft Skill Trainer', avatar: 'NS' },
  { name: 'J Reghupathi', role: 'Co-Founder', exp: 'Soft Skill Trainer', avatar: 'JR' },
  { name: 'Mahesh Masal', role: 'Life Coach', exp: 'Life Coach', avatar: 'MM' },
];

const EVENTS = [];

const ANNOUNCEMENTS = [
  { title: 'CONNECT Udyog Utsav 2026', date: 'Jul 2026', desc: 'Bridging the gap between North Karnataka\'s talent and leading companies.' },
  { title: 'Soft Skills Training Launch', date: 'Aug 2026', desc: 'New batch starting for communication skills, team building, and leadership training.' },
];

/* ---------------- Utilities ---------------- */

function Counter({ to, suffix = '', duration = 2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.floor(v).toLocaleString());
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration, ease: 'easeOut' });
    const unsub = rounded.on('change', (v) => setDisplay(v));
    return () => { controls.stop(); unsub(); };
  }, [inView, to, duration, mv, rounded]);

  return <span ref={ref}>{display}{suffix}</span>;
}

/* ---------------- Sections ---------------- */

function Hero() {
  return (
    <section id="home" className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-70" />
      <div className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-[#8CC63F]/25 blur-3xl animate-blob" />
      <div className="absolute -bottom-40 -right-24 w-[560px] h-[560px] rounded-full bg-[#83B9E6]/30 blur-3xl animate-blob" style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/3 right-1/3 w-64 h-64 rounded-full bg-[#8CC63F]/15 blur-3xl animate-blob" style={{ animationDelay: '6s' }} />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          <div className="lg:col-span-7">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[#8CC63F]/30 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#8CC63F]" />
              <span className="text-xs font-semibold tracking-wide text-[#231F20]">Empowering Careers Since 2015</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }}
              className="font-display font-extrabold tracking-tight text-[42px] leading-[1.05] sm:text-6xl lg:text-[76px] text-[#231F20] text-balance">
              Rediscover Life.<br />
              <span className="brand-gradient-text">Pathway to Success.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-xl text-[17px] leading-relaxed text-[#231F20]/70">
              Connect Dharwad empowers students, professionals, and organizations through
              industry-oriented training, recruitment support, and consultancy services.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/services/corporate-training"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#8CC63F] text-white font-semibold shadow-xl shadow-[#8CC63F]/30 hover:bg-[#231F20] hover:shadow-[#231F20]/30 transition-all">
                Explore Services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#231F20] font-semibold border border-black/10 hover:border-[#231F20] hover:-translate-y-0.5 transition-all">
                Contact Us
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                {['#8CC63F', '#83B9E6', '#231F20', '#6EA82F'].map((c, i) => (
                  <div key={i} className="w-10 h-10 rounded-full ring-2 ring-white flex items-center justify-center text-white text-xs font-bold shadow-md" style={{ backgroundColor: c }}>
                    {['A', 'R', 'K', 'M'][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-[#8CC63F] text-[#8CC63F]" />)}
                  <span className="ml-1.5 text-sm font-semibold text-[#231F20]">4.9/5</span>
                </div>
                <p className="text-xs text-[#231F20]/60 mt-0.5">Trusted by 5000+ learners</p>
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative">
            <div className="relative">
              <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-black/20">
                <Image src="https://images.pexels.com/photos/7693729/pexels-photo-7693729.jpeg" alt="Corporate professionals" fill className="object-cover" priority unoptimized />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#231F20]/60 via-transparent to-[#8CC63F]/25" />
              </div>

              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-4 top-10 sm:-left-10 glass rounded-2xl px-4 py-3 shadow-xl w-52">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#8CC63F]/15 flex items-center justify-center"><TrendingUp className="w-5 h-5 text-[#6EA82F]" /></div>
                  <div>
                    <div className="text-lg font-bold text-[#231F20] leading-none">98%</div>
                    <div className="text-[11px] text-[#231F20]/60 mt-0.5">Placement Rate</div>
                  </div>
                </div>
              </motion.div>

              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -right-3 bottom-16 sm:-right-6 glass rounded-2xl px-4 py-3 shadow-xl w-56">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#83B9E6]/25 flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-[#5C9CD3]" /></div>
                  <div>
                    <div className="text-sm font-bold text-[#231F20] leading-none">Industry-Ready</div>
                    <div className="text-[11px] text-[#231F20]/60 mt-0.5">Certified Programs</div>
                  </div>
                </div>
              </motion.div>

              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass rounded-full px-4 py-2 shadow-xl flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#8CC63F] animate-pulse" />
                <span className="text-xs font-semibold text-[#231F20]">Live Workshop Now</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ClientsStrip() {
  const [clients, setClients] = useState(CLIENTS);
  useEffect(() => {
    fetch('/api/public/clients')
      .then((r) => r.json())
      .then((d) => {
        if (d.items && d.items.length > 0) setClients(d.items.map((c) => c.name));
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <section className="py-10 border-y border-black/5 bg-[#F7F9FA]">
      <div className="container">
        <p className="text-center text-xs font-semibold tracking-[0.24em] text-[#231F20]/50 mb-6">TRUSTED BY LEADING ORGANIZATIONS</p>
        <div className="overflow-hidden relative">
          <div className="flex gap-14 animate-marquee whitespace-nowrap">
            {[...clients, ...clients].map((c, i) => (
              <div key={i} className="text-2xl font-display font-bold text-[#231F20]/25 hover:text-[#8CC63F] transition-colors cursor-default">{c}</div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#F7F9FA] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#F7F9FA] to-transparent" />
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24 lg:py-32 relative">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }} className="relative">
            <div className="relative aspect-[5/4] rounded-3xl overflow-hidden shadow-2xl">
              <Image src="https://images.pexels.com/photos/12903168/pexels-photo-12903168.jpeg" alt="Corporate training" fill className="object-cover" unoptimized />
            </div>
            <div className="absolute -bottom-6 -right-6 w-44 h-44 rounded-3xl brand-gradient shadow-2xl flex flex-col items-center justify-center text-white">
              <div className="text-4xl font-display font-extrabold">10+</div>
              <div className="text-xs font-medium tracking-wide mt-1">YEARS OF EXCELLENCE</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8CC63F]/10 border border-[#8CC63F]/20 mb-4">
              <span className="text-xs font-semibold tracking-wider text-[#6EA82F]">ABOUT US</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-[#231F20] leading-tight text-balance">
              Bridging talent with opportunity, <span className="brand-gradient-text">one program at a time.</span>
            </h2>
            <p className="mt-5 text-[16px] leading-relaxed text-[#231F20]/70">
              Connect Dharwad is a professional services organization dedicated to empowering
              students, professionals, and enterprises. From industry-oriented corporate training
              to end-to-end recruitment and strategic consultancy, we design pathways that unlock potential.
            </p>

            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              {[
                { title: 'Mission', desc: 'Empower every learner with industry-ready skills.' },
                { title: 'Vision', desc: 'Be the most trusted career catalyst in India.' },
                { title: 'Values', desc: 'Excellence, integrity, empathy, impact.' },
              ].map((v) => (
                <div key={v.title} className="rounded-2xl p-5 bg-[#F7F9FA] border border-black/5 hover:border-[#8CC63F]/40 hover:shadow-lg transition-all">
                  <div className="text-sm font-display font-bold text-[#8CC63F]">{v.title}</div>
                  <p className="mt-1.5 text-[13px] text-[#231F20]/70 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>

            <Link href="/about" className="mt-8 inline-flex items-center gap-2 text-[#231F20] font-semibold group">
              Read Our Story
              <span className="w-8 h-8 rounded-full bg-[#8CC63F] text-white flex items-center justify-center group-hover:bg-[#231F20] transition-colors">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="py-24 lg:py-32 bg-[#F7F9FA] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-[#8CC63F]/5 blur-3xl" />
      <div className="container relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#8CC63F]/30 mb-4">
            <span className="text-xs font-semibold tracking-wider text-[#6EA82F]">OUR SERVICES</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-[#231F20] text-balance">
            Comprehensive solutions for <span className="brand-gradient-text">every career stage.</span>
          </h2>
          <p className="mt-5 text-[#231F20]/65 text-[16px]">Three pillars that power the growth of individuals and organizations.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-3xl bg-white p-8 border border-black/5 hover:border-transparent hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/10 transition-all duration-500">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform`}>
                <s.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-display font-bold text-[#231F20]">{s.title}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-[#231F20]/65">{s.desc}</p>

              <div className="mt-6 grid grid-cols-2 gap-2">
                {s.features.map((f) => (
                  <div key={f} className="flex items-center gap-1.5 text-xs text-[#231F20]/70">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#8CC63F] shrink-0" />{f}
                  </div>
                ))}
              </div>

              <Link href={s.href} className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-[#231F20] group-hover:text-[#8CC63F] transition-colors">
                Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="absolute top-6 right-6 text-6xl font-display font-black text-black/[0.03] group-hover:text-[#8CC63F]/10 transition-colors">0{i + 1}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const [stats, setStats] = useState(STATS);
  useEffect(() => {
    fetch('/api/public/stats')
      .then((r) => r.json())
      .then((d) => {
        if (d.items && d.items.length > 0) setStats(d.items);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <section className="py-20 lg:py-24 bg-[#231F20] relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-[#8CC63F]/15 blur-3xl" />
      <div className="absolute -bottom-40 -left-20 w-[500px] h-[500px] rounded-full bg-[#83B9E6]/10 blur-3xl" />

      <div className="container relative">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-4">
            <span className="text-xs font-semibold tracking-wider text-[#8CC63F]">OUR IMPACT</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-white text-balance">
            Numbers that speak <span className="text-[#8CC63F]">volumes.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-dark rounded-2xl p-6 lg:p-7 text-center border border-white/10 hover:border-[#8CC63F]/40 transition-all">
              <div className="text-4xl lg:text-5xl font-display font-extrabold text-white">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-xs lg:text-sm text-white/60 font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#83B9E6]/15 border border-[#83B9E6]/30 mb-4">
            <span className="text-xs font-semibold tracking-wider text-[#5C9CD3]">WHY CHOOSE US</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-[#231F20] text-balance">
            Built on trust. Powered by <span className="brand-gradient-text">expertise.</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY_US.map((w, i) => (
            <motion.div key={w.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.45, delay: i * 0.06 }}
              className="group rounded-2xl p-7 bg-white border border-black/5 hover:border-[#8CC63F]/40 hover:shadow-xl hover:shadow-[#8CC63F]/10 hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#8CC63F]/10 flex items-center justify-center group-hover:bg-[#8CC63F] transition-colors">
                <w.icon className="w-5 h-5 text-[#8CC63F] group-hover:text-white transition-colors" />
              </div>
              <h3 className="mt-5 text-lg font-display font-bold text-[#231F20]">{w.title}</h3>
              <p className="mt-2 text-[14px] text-[#231F20]/65 leading-relaxed">{w.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Trainers() {
  const [trainers, setTrainers] = useState(TRAINERS);
  const [showAll, setShowAll] = useState(false);
  useEffect(() => {
    fetch('/api/public/trainers')
      .then((r) => r.json())
      .then((d) => {
        if (d.items && d.items.length > 0) setTrainers(d.items);
      })
      .catch((e) => console.error(e));
  }, []);

  const visibleTrainers = showAll ? trainers : trainers.slice(0, 4);

  return (
    <section className="py-24 lg:py-32 bg-[#F7F9FA]">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#8CC63F]/30 mb-4">
              <span className="text-xs font-semibold tracking-wider text-[#6EA82F]">FEATURED TRAINERS</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-[#231F20] text-balance">
              Industry mentors, <span className="brand-gradient-text">world-class outcomes.</span>
            </h2>
          </div>
          <p className="text-[#231F20]/65 max-w-sm text-[15px]">Meet our senior faculty — practitioners with decades of enterprise experience.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {visibleTrainers.map((t, i) => {
            const initials = t.name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase();
            return (
              <motion.div key={t.id || t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group rounded-3xl bg-white p-6 border border-black/5 hover:shadow-2xl hover:-translate-y-1 transition-all">
                <div className="relative w-full aspect-square rounded-2xl brand-gradient flex items-center justify-center text-white text-5xl font-display font-black overflow-hidden">
                  {t.photoUrl ? (
                    <img src={t.photoUrl} alt={t.name} className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20" />
                      <span className="relative">{t.avatar || initials}</span>
                    </>
                  )}
                </div>
                <div className="mt-5">
                  <div className="font-display font-bold text-[#231F20] text-lg">{t.name}</div>
                  <div className="text-sm text-[#231F20]/60 mt-0.5">{t.role}</div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#8CC63F] bg-[#8CC63F]/10 px-2.5 py-1 rounded-full">{t.experience || t.exp || 'Faculty'}</span>
                    <a href={t.linkedin || '#'} className="w-8 h-8 rounded-full bg-[#F7F9FA] hover:bg-[#0A66C2] hover:text-white flex items-center justify-center text-[#231F20]/60 transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {trainers.length > 4 && (
          <div className="text-center mt-12">
            <button onClick={() => setShowAll(!showAll)} className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#8CC63F] hover:bg-[#231F20] text-white font-semibold transition-colors shadow-lg shadow-[#8CC63F]/20">
              {showAll ? 'View Less' : 'View More'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function Events() {
  const [events, setEvents] = useState(EVENTS);
  useEffect(() => {
    fetch('/api/public/events')
      .then((r) => r.json())
      .then((d) => {
        if (d.items && d.items.length > 0) setEvents(d.items.filter((e) => !e.isPast));
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <section className="py-24 lg:py-28">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8CC63F]/10 border border-[#8CC63F]/20 mb-3">
              <span className="text-xs font-semibold tracking-wider text-[#6EA82F]">UPCOMING EVENTS</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-[#231F20]">Learn, network, and grow.</h2>
          </div>
          <div className="flex lg:justify-end lg:items-end">
            <Link href="/events" className="inline-flex items-center gap-2 text-sm font-semibold text-[#231F20] hover:text-[#8CC63F] transition-colors">
              View all events <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {events.map((e) => (
            <div key={e.title} className="rounded-2xl bg-white border border-black/5 p-6 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8CC63F]/10 text-[#6EA82F] text-xs font-semibold">{e.date}</div>
              <h3 className="mt-4 text-lg font-display font-bold text-[#231F20]">{e.title}</h3>
              {e.registerUrl && e.registerUrl.trim() !== '' ? (
                <a
                  href={e.registerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#8CC63F]"
                >
                  Register <ArrowRight className="w-4 h-4" />
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Announcements() {
  const [announcements, setAnnouncements] = useState(ANNOUNCEMENTS);
  useEffect(() => {
    fetch('/api/public/announcements')
      .then((r) => r.json())
      .then((d) => {
        if (d.items && d.items.length > 0) setAnnouncements(d.items);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <section className="py-16 lg:py-20 bg-[#F7F9FA]">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#83B9E6]/30 mb-3">
            <span className="text-xs font-semibold tracking-wider text-[#5C9CD3]">LATEST ANNOUNCEMENTS</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-[#231F20]">What&apos;s happening at Connect Dharwad.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {announcements.map((a) => (
            <div key={a.title} className="rounded-2xl bg-white border border-black/5 overflow-hidden hover:shadow-lg transition-all flex flex-col">
              {a.imageUrl && (
                <div className="relative aspect-[16/9] w-full bg-black/5 overflow-hidden">
                  <img src={a.imageUrl} alt={a.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-[#8CC63F] font-semibold">{a.date}</div>
                  <h4 className="mt-2 font-display font-bold text-[#231F20]">{a.title}</h4>
                  <p className="mt-2 text-sm text-[#231F20]/65 line-clamp-3">{a.description || a.desc}</p>
                </div>
                <div className="mt-4">
                  <Link href="/events" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#231F20] hover:text-[#8CC63F]">
                    Read More <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryPreview() {
  const [gallery, setGallery] = useState([]);
  useEffect(() => {
    fetch('/api/public/gallery')
      .then((r) => r.json())
      .then((d) => {
        if (d.items && d.items.length > 0) setGallery(d.items.slice(0, 6));
      })
      .catch((e) => console.error(e));
  }, []);

  const fallbackImgs = [
    'https://images.pexels.com/photos/7693729/pexels-photo-7693729.jpeg',
    'https://images.pexels.com/photos/12903168/pexels-photo-12903168.jpeg',
    'https://images.pexels.com/photos/5668498/pexels-photo-5668498.jpeg',
    'https://images.pexels.com/photos/36733315/pexels-photo-36733315.jpeg',
    'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg',
  ];

  const imgs = gallery.length > 0 ? gallery.map((g) => g.url) : fallbackImgs;

  return (
    <section className="py-20 lg:py-24">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8CC63F]/10 border border-[#8CC63F]/20 mb-3">
              <span className="text-xs font-semibold tracking-wider text-[#6EA82F]">GALLERY</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-[#231F20]">Moments from our journey.</h2>
          </div>
          <Link href="/gallery" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-black/10 text-sm font-semibold text-[#231F20] hover:border-[#231F20] hover:-translate-y-0.5 transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {imgs.map((u, i) => (
            <Link key={i} href="/gallery" className={`relative rounded-2xl overflow-hidden group ${i % 5 === 0 ? 'row-span-2 aspect-square lg:aspect-[1/2]' : 'aspect-square'}`}>
              <img src={u} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [testimonials, setTestimonials] = useState(TESTIMONIALS);
  const [i, setI] = useState(0);

  useEffect(() => {
    fetch('/api/public/testimonials')
      .then((r) => r.json())
      .then((d) => {
        if (d.items && d.items.length > 0) setTestimonials(d.items);
      })
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const t = setInterval(() => setI((v) => (v + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, [testimonials]);

  if (testimonials.length === 0) return null;
  const active = testimonials[i];
  const initials = active.name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase();

  return (
    <section id="testimonials" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#83B9E6]/15 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#8CC63F]/10 blur-3xl" />
      <div className="container relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8CC63F]/10 border border-[#8CC63F]/30 mb-4">
            <span className="text-xs font-semibold tracking-wider text-[#6EA82F]">TESTIMONIALS</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-[#231F20] text-balance">
            Stories from those we&apos;ve <span className="brand-gradient-text">empowered.</span>
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}
              className="glass rounded-3xl p-8 lg:p-12 border border-white/60 shadow-2xl shadow-black/5">
              <Quote className="w-10 h-10 text-[#8CC63F]/30" />
              <p className="mt-5 text-xl lg:text-2xl leading-relaxed text-[#231F20] font-display font-medium text-balance">
                &ldquo;{active.quote}&rdquo;
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl brand-gradient flex items-center justify-center text-white text-lg font-display font-bold shadow-lg overflow-hidden">
                  {active.photoUrl ? (
                    <img src={active.photoUrl} alt={active.name} className="w-full h-full object-cover" />
                  ) : (
                    initials
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-display font-bold text-[#231F20]">{active.name}</div>
                  <div className="text-sm text-[#231F20]/60">{active.role}</div>
                </div>
                <div className="flex items-center gap-0.5">
                  {[...Array(active.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-[#8CC63F] text-[#8CC63F]" />)}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-2">
            {testimonials.map((_, idx) => (
              <button key={idx} onClick={() => setI(idx)} aria-label={`Testimonial ${idx + 1}`}
                className={`h-2 rounded-full transition-all ${idx === i ? 'bg-[#8CC63F] w-8' : 'bg-[#231F20]/15 w-2 hover:bg-[#231F20]/30'}`} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/testimonials" className="inline-flex items-center gap-2 text-sm font-semibold text-[#231F20] hover:text-[#8CC63F]">
              Read all testimonials <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="contact" className="py-24 lg:py-28">
      <div className="container">
        <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[36px] bg-[#231F20] p-10 lg:p-16">
          <div className="absolute -top-32 -right-16 w-[500px] h-[500px] rounded-full bg-[#8CC63F]/25 blur-3xl" />
          <div className="absolute -bottom-32 -left-16 w-[500px] h-[500px] rounded-full bg-[#83B9E6]/15 blur-3xl" />
          <div className="absolute inset-0 grid-pattern opacity-20" />

          <div className="relative grid lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-4">
                <span className="text-xs font-semibold tracking-wider text-[#8CC63F]">LET&apos;S TALK</span>
              </div>
              <h2 className="text-4xl lg:text-6xl font-display font-extrabold text-white text-balance leading-[1.05]">
                Let&apos;s Work <span className="text-[#8CC63F]">Together.</span>
              </h2>
              <p className="mt-5 text-white/70 text-[16px] max-w-lg leading-relaxed">
                Partner with Connect Dharwad to design training, recruitment, and consultancy
                programs tailored to your organization&apos;s ambitions.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#8CC63F] text-[#231F20] font-semibold hover:bg-white transition-colors">
                  Contact Us <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="tel:+919845513016" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/25 text-white font-semibold hover:bg-white/10 transition">
                  <Phone className="w-4 h-4" /> Call Now
                </a>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-3">
              {[
                { icon: MapPin, label: 'Visit Us', value: 'Near Court Circle, Dharwad - 580001' },
                { icon: Mail, label: 'Email', value: 'girishangadi2008@gmail.com' },
                { icon: Phone, label: 'Call', value: '+91 98455 13016' },
              ].map((c) => (
                <div key={c.label} className="glass-dark rounded-2xl p-4 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#8CC63F]/20 flex items-center justify-center">
                    <c.icon className="w-5 h-5 text-[#8CC63F]" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-white/50 font-semibold">{c.label}</div>
                    <div className="text-white font-medium mt-0.5">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Main ---------------- */

function App() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <ClientsStrip />
      <About />
      <Services />
      <Stats />
      <WhyUs />
      <Trainers />
      <Events />
      <Announcements />
      <GalleryPreview />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}

export default App;
