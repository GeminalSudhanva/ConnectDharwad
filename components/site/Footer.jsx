import Link from 'next/link';
import { MapPin, Mail, Phone, Facebook, Instagram } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-[#231F20] text-white/80 pt-16 pb-8">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Logo dark />
            <p className="mt-5 text-sm text-white/60 leading-relaxed">
              Empowering students, professionals, and enterprises through world-class training,
              recruitment, and consultancy.
            </p>
            <div className="mt-6 flex gap-2">
              {[
                { Icon: Facebook, href: 'https://www.facebook.com/Connectdwd' },
                { Icon: Instagram, href: 'https://instagram.com/_connect_hiring_jobs_' },
              ].map((x, i) => (
                <a
                  key={i}
                  href={x.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#8CC63F] hover:text-[#231F20] border border-white/10 flex items-center justify-center transition-colors"
                >
                  <x.Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="font-display font-bold text-white text-sm tracking-wider mb-4">QUICK LINKS</div>
            <ul className="space-y-2.5 text-sm">
              {[
                { l: 'Home', h: '/' },
                { l: 'About', h: '/about' },
                { l: 'Announcements', h: '/announcements' },
                { l: 'Testimonials', h: '/testimonials' },
                { l: 'Contact', h: '/contact' },
              ].map((x) => (
                <li key={x.l}><Link href={x.h} className="hover:text-[#8CC63F] transition-colors">{x.l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-display font-bold text-white text-sm tracking-wider mb-4">SERVICES</div>
            <ul className="space-y-2.5 text-sm">
              {[
                { l: 'Corporate Training', h: '/services/corporate-training' },
                { l: 'Recruitment', h: '/services/recruitment' },
                { l: 'Consultancy', h: '/services/consultancy' },
                { l: 'Skill Development', h: '/services/corporate-training' },
                { l: 'Workshops', h: '/services/corporate-training' },
                { l: 'Industry Connect', h: '/services/consultancy' },
              ].map((x) => (
                <li key={x.l}><Link href={x.h} className="hover:text-[#8CC63F] transition-colors">{x.l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-display font-bold text-white text-sm tracking-wider mb-4">GET IN TOUCH</div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#8CC63F] mt-0.5 shrink-0" />
                <span className="text-white/70">1st Floor, Above Basappa Khanavali,<br />Near Court Circle, Dharwad - 580001</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#8CC63F] shrink-0" />
                <a href="mailto:girishangadi2008@gmail.com" className="hover:text-[#8CC63F]">girishangadi2008@gmail.com</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#8CC63F] shrink-0" />
                <a href="tel:+919845513016" className="hover:text-[#8CC63F]">+91 98455 13016</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <div>© {new Date().getFullYear()} Connect Dharwad. All rights reserved.</div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-[#8CC63F]">Privacy</a>
            <a href="#" className="hover:text-[#8CC63F]">Terms</a>
            <a href="#" className="hover:text-[#8CC63F]">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
