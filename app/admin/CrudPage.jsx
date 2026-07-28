'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Loader2, Search, Upload } from 'lucide-react';
import { toast } from 'sonner';

async function fileToDataUrl(file) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

export default function CrudPage({ resource, title, description, fields }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(null); // object or 'new' or null
  const [query, setQuery] = useState('');

  const load = async () => {
    setLoading(true);
    const r = await fetch(`/api/admin/${resource}`);
    const d = await r.json();
    setItems(d.items || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, [resource]);

  const save = async (formData) => {
    setSaving(true);
    try {
      const isEdit = editing && editing.id;
      const url = isEdit ? `/api/admin/${resource}/${editing.id}` : `/api/admin/${resource}`;
      const r = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'Failed');
      toast.success(isEdit ? 'Updated' : 'Created');
      setEditing(null);
      load();
    } catch (err) { toast.error(err.message); } finally { setSaving(false); }
  };

  const del = async (id) => {
    if (!confirm('Delete this item?')) return;
    const r = await fetch(`/api/admin/${resource}/${id}`, { method: 'DELETE' });
    if (r.ok) { toast.success('Deleted'); load(); } else { toast.error('Delete failed'); }
  };

  const filtered = items.filter((i) => JSON.stringify(i).toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-display font-bold text-[#231F20]">{title}</h1>
          {description && <p className="text-sm text-[#231F20]/60 mt-1">{description}</p>}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#231F20]/40" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search…" className="pl-9 pr-3 py-2 rounded-full bg-white border border-black/5 text-sm outline-none focus:border-[#8CC63F] w-56" />
          </div>
          <button onClick={() => setEditing({})} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#8CC63F] text-white text-sm font-semibold hover:bg-[#231F20] transition-colors">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-black/5 overflow-hidden">
        {loading ? (
          <div className="py-20 flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-[#8CC63F]" /></div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-sm text-[#231F20]/50">No {resource} yet. Click Add to create one.</div>
        ) : (
          <div className="divide-y divide-black/5">
            {filtered.map((item) => (
              <div key={item.id} className="p-4 flex items-center gap-4 hover:bg-[#F7F9FA]/50 transition-colors">
                {fields.find((f) => f.type === 'image') && (
                  <div className="w-12 h-12 rounded-xl bg-black/5 overflow-hidden shrink-0 flex items-center justify-center">
                    {item[fields.find((f) => f.type === 'image').key] ? (
                      <img src={item[fields.find((f) => f.type === 'image').key]} alt="" className="w-full h-full object-cover" />
                    ) : <span className="text-xs text-[#231F20]/40">no img</span>}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[#231F20] truncate">{item[fields[0].key] || '(untitled)'}</div>
                  <div className="text-xs text-[#231F20]/60 truncate">
                    {fields.slice(1, 4).filter((f) => f.type !== 'image' && f.type !== 'textarea').map((f) => item[f.key]).filter(Boolean).join(' • ')}
                  </div>
                </div>
                <button onClick={() => setEditing(item)} className="p-2 rounded-lg hover:bg-black/5"><Pencil className="w-4 h-4 text-[#231F20]/60" /></button>
                <button onClick={() => del(item.id)} className="p-2 rounded-lg hover:bg-red-50 hover:text-red-500"><Trash2 className="w-4 h-4 text-[#231F20]/60" /></button>
              </div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {editing !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setEditing(null)}>
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 lg:p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-bold text-[#231F20]">{editing.id ? 'Edit' : 'Add'} {title}</h2>
                <button onClick={() => setEditing(null)} className="p-2 rounded-lg hover:bg-black/5"><X className="w-5 h-5" /></button>
              </div>
              <CrudForm fields={fields} initial={editing.id ? editing : {}} onSubmit={save} saving={saving} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CrudForm({ fields, initial, onSubmit, saving }) {
  const [form, setForm] = useState(() => {
    const f = { ...initial };
    fields.forEach((fld) => { if (f[fld.key] === undefined) f[fld.key] = fld.default ?? ''; });
    return f;
  });
  const upd = (k, v) => setForm((s) => ({ ...s, [k]: v }));
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const handleImage = async (key, file) => {
    if (!file) return;
    setUploading(true);
    try {
      const dataUrl = await fileToDataUrl(file);
      const r = await fetch('/api/upload', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ dataUrl, folder: 'connect-dharwad' }) });
      const d = await r.json();
      if (d.url) upd(key, d.url);
      else toast.error('Upload failed');
    } catch (e) { toast.error(e.message); } finally { setUploading(false); }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {fields.map((f) => (
        <div key={f.key}>
          <label className="block text-xs font-semibold text-[#231F20]/70 mb-1.5">{f.label}{f.required && '*'}</label>
          {f.type === 'textarea' ? (
            <textarea rows={4} required={f.required} value={form[f.key] || ''} onChange={(e) => upd(f.key, e.target.value)} className="w-full px-4 py-3 rounded-xl bg-[#F7F9FA] border border-black/5 focus:border-[#8CC63F] outline-none text-sm resize-none" />
          ) : f.type === 'select' ? (
            <select value={form[f.key] || ''} onChange={(e) => upd(f.key, e.target.value)} className="w-full px-4 py-3 rounded-xl bg-[#F7F9FA] border border-black/5 focus:border-[#8CC63F] outline-none text-sm">
              {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          ) : f.type === 'number' ? (
            <input type="number" required={f.required} value={form[f.key] ?? ''} onChange={(e) => upd(f.key, e.target.value === '' ? '' : Number(e.target.value))} className="w-full px-4 py-3 rounded-xl bg-[#F7F9FA] border border-black/5 focus:border-[#8CC63F] outline-none text-sm" />
          ) : f.type === 'boolean' ? (
            <label className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" checked={!!form[f.key]} onChange={(e) => upd(f.key, e.target.checked)} className="w-4 h-4 accent-[#8CC63F]" />
              <span>{f.hint || 'Yes'}</span>
            </label>
          ) : f.type === 'image' ? (
            <div>
              {form[f.key] && <img src={form[f.key]} alt="" className="w-32 h-32 object-cover rounded-xl mb-2" />}
              <input value={form[f.key] || ''} onChange={(e) => upd(f.key, e.target.value)} placeholder="Paste image URL or upload" className="w-full px-4 py-3 rounded-xl bg-[#F7F9FA] border border-black/5 focus:border-[#8CC63F] outline-none text-sm mb-2" />
              <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F7F9FA] border border-black/10 text-xs font-semibold hover:bg-black/5 disabled:opacity-60">
                {uploading ? <><Loader2 className="w-3 h-3 animate-spin" /> Uploading…</> : <><Upload className="w-3 h-3" /> Upload</>}
              </button>
              <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => handleImage(f.key, e.target.files?.[0])} />
            </div>
          ) : (
            <input required={f.required} value={form[f.key] || ''} onChange={(e) => upd(f.key, e.target.value)} placeholder={f.placeholder} className="w-full px-4 py-3 rounded-xl bg-[#F7F9FA] border border-black/5 focus:border-[#8CC63F] outline-none text-sm" />
          )}
          {f.hint && f.type !== 'boolean' && <p className="text-xs text-[#231F20]/50 mt-1">{f.hint}</p>}
        </div>
      ))}

      <div className="pt-2">
        <button disabled={saving || uploading} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#8CC63F] text-white font-semibold shadow-lg shadow-[#8CC63F]/25 hover:bg-[#231F20] transition-colors disabled:opacity-60">
          {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : 'Save'}
        </button>
      </div>
    </form>
  );
}
