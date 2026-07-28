'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function PageHeader({ eyebrow, title, subtitle, crumbs = [] }) {
  return (
    <section className="relative pt-36 pb-16 lg:pt-44 lg:pb-24 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-60" />
      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-[#8CC63F]/20 blur-3xl animate-blob" />
      <div className="absolute -bottom-32 -right-24 w-[440px] h-[440px] rounded-full bg-[#83B9E6]/25 blur-3xl animate-blob" style={{ animationDelay: '3s' }} />

      <div className="container relative">
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-1.5 text-xs font-medium text-[#231F20]/60 mb-5"
        >
          <Link href="/" className="hover:text-[#8CC63F]">Home</Link>
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3" />
              {c.href ? <Link href={c.href} className="hover:text-[#8CC63F]">{c.label}</Link> : <span className="text-[#231F20]">{c.label}</span>}
            </span>
          ))}
        </motion.nav>

        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#8CC63F]/30 mb-4"
          >
            <span className="text-xs font-semibold tracking-wider text-[#6EA82F]">{eyebrow}</span>
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display font-extrabold tracking-tight text-[42px] leading-[1.05] sm:text-6xl text-[#231F20] max-w-4xl text-balance"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-5 text-[17px] leading-relaxed text-[#231F20]/70 max-w-2xl"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
