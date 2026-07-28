'use client';

import { useEffect, useState } from 'react';
import { Users, Calendar, MessageSquareQuote, Inbox, Briefcase, TrendingUp, Loader2 } from 'lucide-react';
import Link from 'next/link';

const COLORS = {
  contacts: '#8CC63F',
  enquiries: '#83B9E6',
  applications: '#F59E0B',
  trainers: '#8CC63F',
  events: '#83B9E6',
  testimonials: '#EC4899',
};

const ICONS = {
  contacts: Inbox, enquiries: MessageSquareQuote, applications: Briefcase,
  trainers: Users, events: Calendar, testimonials: MessageSquareQuote,
};

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/dashboard').then((r) => r.json()).then((d) => { setData(d); setLoading(false); });
  }, []);

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-[#8CC63F]" /></div>;

  const counts = data?.counts || {};
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-[#231F20]">Welcome back 👋</h1>
        <p className="text-sm text-[#231F20]/60 mt-1">Here&apos;s what&apos;s happening at Connect Dharwad.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(counts).map(([k, v]) => {
          const Icon = ICONS[k] || TrendingUp;
          const color = COLORS[k] || '#8CC63F';
          return (
            <div key={k} className="rounded-2xl bg-white p-5 border border-black/5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}22` }}>
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
              </div>
              <div className="mt-4 text-3xl font-display font-black text-[#231F20]">{v}</div>
              <div className="text-xs text-[#231F20]/60 capitalize mt-1">{k}</div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-4 gap-3">
        {[
          { label: 'Add Trainer', href: '/admin/trainers' },
          { label: 'Post Event', href: '/admin/events' },
          { label: 'Create Announcement', href: '/admin/announcements' },
          { label: 'View Leads', href: '/admin/leads' },
        ].map((a) => (
          <Link key={a.href} href={a.href} className="rounded-2xl p-5 bg-gradient-to-br from-[#231F20] to-[#3a3435] text-white hover:from-[#8CC63F] hover:to-[#6EA82F] transition-all">
            <div className="text-sm font-display font-semibold">{a.label}</div>
            <div className="text-xs text-white/60 mt-1">Click to open</div>
          </Link>
        ))}
      </div>

      {/* Recent */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-white p-6 border border-black/5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-[#231F20]">Recent Contacts</h3>
            <Link href="/admin/leads" className="text-xs text-[#8CC63F] font-semibold">View all</Link>
          </div>
          <div className="space-y-3">
            {(data?.recent?.contacts || []).length === 0 && <div className="text-sm text-[#231F20]/50">No contacts yet.</div>}
            {(data?.recent?.contacts || []).map((c) => (
              <div key={c.id} className="flex items-center gap-3 py-2 border-b border-black/5 last:border-0">
                <div className="w-9 h-9 rounded-full brand-gradient text-white flex items-center justify-center text-xs font-bold">{c.name?.[0] || '?'}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-[#231F20] truncate">{c.name}</div>
                  <div className="text-xs text-[#231F20]/60 truncate">{c.subject || 'General'} — {c.email}</div>
                </div>
                <div className="text-xs text-[#231F20]/50">{new Date(c.createdAt).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 border border-black/5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-[#231F20]">Recent Applications</h3>
            <Link href="/admin/leads" className="text-xs text-[#8CC63F] font-semibold">View all</Link>
          </div>
          <div className="space-y-3">
            {(data?.recent?.applications || []).length === 0 && <div className="text-sm text-[#231F20]/50">No applications yet.</div>}
            {(data?.recent?.applications || []).map((c) => (
              <div key={c.id} className="flex items-center gap-3 py-2 border-b border-black/5 last:border-0">
                <div className="w-9 h-9 rounded-full bg-[#83B9E6]/25 text-[#5C9CD3] flex items-center justify-center text-xs font-bold">{c.name?.[0] || '?'}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-[#231F20] truncate">{c.name}</div>
                  <div className="text-xs text-[#231F20]/60 truncate">{c.position}</div>
                </div>
                <div className="text-xs text-[#231F20]/50">{new Date(c.createdAt).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
