'use client';

import { useEffect, useState } from 'react';
import { Loader2, Trash2, Mail, Phone, Search } from 'lucide-react';
import { toast } from 'sonner';

const TABS = [
  { key: 'contacts', label: 'Contacts' },
  { key: 'enquiries', label: 'Enquiries' },
  { key: 'applications', label: 'Applications' },
];

export default function LeadsPage() {
  const [data, setData] = useState({ contacts: [], enquiries: [], applications: [] });
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('contacts');
  const [q, setQ] = useState('');

  const load = () => { setLoading(true); fetch('/api/admin/leads').then((r) => r.json()).then((d) => { setData(d); setLoading(false); }); };
  useEffect(() => { load(); }, []);

  const del = async (id) => {
    if (!confirm('Delete this lead?')) return;
    const r = await fetch(`/api/admin/${tab}/${id}`, { method: 'DELETE' });
    if (r.ok) { toast.success('Deleted'); load(); }
    else toast.error('Delete failed');
  };

  const items = (data[tab] || []).filter((i) => JSON.stringify(i).toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-display font-bold text-[#231F20]">Leads &amp; Submissions</h1>
        <p className="text-sm text-[#231F20]/60 mt-1">All incoming contact, enquiry and application form submissions.</p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between">
        <div className="flex gap-2">
          {TABS.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${tab === t.key ? 'bg-[#8CC63F] text-white' : 'bg-white text-[#231F20]/70 border border-black/5 hover:bg-black/5'}`}>
              {t.label} <span className="ml-1 text-xs opacity-70">({(data[t.key] || []).length})</span>
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#231F20]/40" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" className="pl-9 pr-3 py-2 rounded-full bg-white border border-black/5 text-sm outline-none focus:border-[#8CC63F] w-56" />
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-[#8CC63F]" /></div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl bg-white p-20 text-center text-sm text-[#231F20]/50 border border-black/5">No {tab} yet.</div>
      ) : (
        <div className="grid gap-3">
          {items.map((it) => (
            <div key={it.id} className="rounded-2xl bg-white p-5 border border-black/5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="font-display font-bold text-[#231F20]">{it.name}</div>
                    {it.subject && <span className="text-xs px-2 py-0.5 rounded-full bg-[#8CC63F]/10 text-[#6EA82F] font-semibold">{it.subject}</span>}
                    {it.type && <span className="text-xs px-2 py-0.5 rounded-full bg-[#83B9E6]/15 text-[#5C9CD3] font-semibold">{it.type}</span>}
                    {it.position && <span className="text-xs px-2 py-0.5 rounded-full bg-[#F59E0B]/15 text-[#B45309] font-semibold">{it.position}</span>}
                    {it.program && <span className="text-xs px-2 py-0.5 rounded-full bg-white border border-black/10 text-[#231F20]/70">{it.program}</span>}
                  </div>
                  <div className="mt-1.5 flex items-center gap-4 text-xs text-[#231F20]/60 flex-wrap">
                    <a href={`mailto:${it.email}`} className="flex items-center gap-1 hover:text-[#8CC63F]"><Mail className="w-3 h-3" />{it.email}</a>
                    {it.phone && <a href={`tel:${it.phone}`} className="flex items-center gap-1 hover:text-[#8CC63F]"><Phone className="w-3 h-3" />{it.phone}</a>}
                    <span>{new Date(it.createdAt).toLocaleString()}</span>
                  </div>
                  {(it.message || it.coverLetter) && (
                    <div className="mt-3 text-sm text-[#231F20]/75 bg-[#F7F9FA] rounded-xl p-3 leading-relaxed whitespace-pre-wrap">{it.message || it.coverLetter}</div>
                  )}
                </div>
                <button onClick={() => del(it.id)} className="p-2 rounded-lg hover:bg-red-50 hover:text-red-500"><Trash2 className="w-4 h-4 text-[#231F20]/60" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
