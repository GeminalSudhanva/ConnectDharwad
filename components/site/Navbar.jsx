'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import Logo from './Logo';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    href: '/services/corporate-training',
    children: [
      { label: 'Corporate Training', href: '/services/corporate-training' },
      { label: 'Recruitment', href: '/services/recruitment' },
      { label: 'Consultancy', href: '/services/consultancy' },
    ],
  },
  { label: 'Events', href: '/events' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/services')) return pathname.startsWith('/services');
    return pathname === href;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-2.5 bg-white/85 backdrop-blur-xl border-b border-black/5 shadow-[0_4px_30px_rgba(0,0,0,0.04)]'
          : 'py-4 bg-white/40 backdrop-blur-sm'
      }`}
    >
      <div className="container flex items-center justify-between">
        <Logo />

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button className={`px-4 py-2 text-sm font-medium transition flex items-center gap-1 rounded-full hover:bg-black/5 ${isActive(item.href) ? 'text-[#8CC63F]' : 'text-[#231F20]/80 hover:text-[#231F20]'}`}>
                  {item.label}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                    >
                      <div className="w-60 rounded-2xl bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-black/5 overflow-hidden">
                        {item.children.map((c) => (
                          <Link
                            key={c.label}
                            href={c.href}
                            className="flex items-center justify-between px-5 py-3 text-sm text-[#231F20]/80 hover:text-white hover:bg-[#231F20] transition-colors"
                          >
                            {c.label}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={`px-4 py-2 text-sm font-medium transition rounded-full hover:bg-black/5 ${isActive(item.href) ? 'text-[#8CC63F]' : 'text-[#231F20]/80 hover:text-[#231F20]'}`}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={() => toast.info('Admin login coming soon')}
            className="px-4 py-2 text-sm font-medium text-[#231F20]/70 hover:text-[#231F20] rounded-full"
          >
            Login
          </button>
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#8CC63F] text-white text-sm font-semibold shadow-lg shadow-[#8CC63F]/25 hover:bg-[#231F20] transition-colors"
          >
            Get in Touch
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden p-2 rounded-xl hover:bg-black/5"
          aria-label="Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden bg-white border-t border-black/5"
          >
            <div className="container py-4 flex flex-col">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="py-3 text-[15px] font-medium text-[#231F20]/85 border-b border-black/5 last:border-0"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full bg-[#8CC63F] text-white text-sm font-semibold"
              >
                Get in Touch <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
