'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, Lock, Mail } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import Logo from '@/components/site/Logo';

function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const next = search.get('next') || '/admin';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const r = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'Login failed');
      toast.success('Welcome back!');
      router.push(next);
      router.refresh();
    } catch (err) { toast.error(err.message); } finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-[#F7F9FA] relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-[#8CC63F]/20 blur-3xl animate-blob" />
      <div className="absolute -bottom-32 -right-24 w-[440px] h-[440px] rounded-full bg-[#83B9E6]/25 blur-3xl animate-blob" style={{ animationDelay: '3s' }} />

      <div className="relative w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Logo size="lg" />
        </div>

        <form onSubmit={submit} className="bg-white rounded-3xl p-8 border border-black/5 shadow-2xl shadow-black/5">
          <h1 className="text-2xl font-display font-bold text-[#231F20]">Admin Login</h1>
          <p className="mt-1 text-sm text-[#231F20]/60">Sign in to manage your content.</p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#231F20]/70 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#231F20]/40" />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#F7F9FA] border border-black/5 focus:border-[#8CC63F] focus:ring-2 focus:ring-[#8CC63F]/20 outline-none text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#231F20]/70 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#231F20]/40" />
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#F7F9FA] border border-black/5 focus:border-[#8CC63F] focus:ring-2 focus:ring-[#8CC63F]/20 outline-none text-sm" />
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading} className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#8CC63F] text-white font-semibold shadow-lg shadow-[#8CC63F]/25 hover:bg-[#231F20] transition-colors disabled:opacity-60">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in…</> : 'Sign In'}
          </button>

          <div className="mt-4 text-xs text-[#231F20]/50 text-center">
            Default: <code className="text-[#231F20]/80">admin@connectdharwad.org</code> / <code className="text-[#231F20]/80">admin123</code>
          </div>
        </form>

        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-[#231F20]/60 hover:text-[#8CC63F]">← Back to site</Link>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-[#8CC63F]" /></div>}><LoginForm /></Suspense>;
}
