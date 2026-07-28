'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, Users, MessageSquareQuote, Calendar, Megaphone, Briefcase,
  Image as ImageIcon, BarChart3, Inbox, Building2, LogOut, Menu, X, ExternalLink, Settings,
} from 'lucide-react';
import { toast } from 'sonner';
import { LogoMark } from '@/components/site/Logo';

const LINKS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/trainers', label: 'Trainers', icon: Users },
  { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquareQuote },
  { href: '/admin/events', label: 'Events', icon: Calendar },
  { href: '/admin/announcements', label: 'Announcements', icon: Megaphone },
  { href: '/admin/jobs', label: 'Jobs', icon: Briefcase },
  { href: '/admin/gallery', label: 'Gallery', icon: ImageIcon },
  { href: '/admin/clients', label: 'Clients', icon: Building2 },
  { href: '/admin/stats', label: 'Statistics', icon: BarChart3 },
  { href: '/admin/leads', label: 'Leads', icon: Inbox },
];

export default function AdminShell({ children }) {
  const path = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    toast.success('Signed out');
    router.push('/login');
  };

  const active = (h) => (h === '/admin' ? path === '/admin' : path.startsWith(h));

  return (
    <div className="min-h-screen bg-[#F7F9FA]">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-[#231F20] text-white z-40 flex flex-col transition-transform lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-white/5">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="bg-white rounded-xl p-1.5 shrink-0">
              <LogoMark size={30} />
            </div>
            <div>
              <div className="font-display font-bold text-sm">Connect Dharwad</div>
              <div className="text-[10px] font-semibold text-[#8CC63F] tracking-widest">ADMIN PANEL</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${active(l.href) ? 'bg-[#8CC63F] text-white shadow-lg shadow-[#8CC63F]/25' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
            >
              <l.icon className="w-4 h-4" /> {l.label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-white/5 space-y-1">
          <Link href="/" target="_blank" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/70 hover:bg-white/5 hover:text-white transition-colors">
            <ExternalLink className="w-4 h-4" /> View Site
          </Link>
          <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/70 hover:bg-red-500/20 hover:text-red-300 transition-colors">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {open && <div onClick={() => setOpen(false)} className="fixed inset-0 bg-black/40 z-30 lg:hidden" />}

      {/* Main */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 bg-white/85 backdrop-blur-xl border-b border-black/5 px-6 py-3 flex items-center justify-between">
          <button onClick={() => setOpen(true)} className="lg:hidden p-2 rounded-xl hover:bg-black/5"><Menu className="w-5 h-5" /></button>
          <div className="font-display font-semibold text-[#231F20] text-sm capitalize">{path.split('/').slice(2).join(' / ') || 'Dashboard'}</div>
          <div className="w-9 h-9 rounded-full bg-[#8CC63F] text-white flex items-center justify-center font-bold text-sm">A</div>
        </header>
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
