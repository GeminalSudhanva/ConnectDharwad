'use client';
import Link from 'next/link';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';

export default function Error({ error, reset }) {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-white overflow-hidden relative">
      <div className="absolute inset-0 grid-pattern opacity-60" />
      <div className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-red-400/15 blur-3xl animate-blob" />
      <div className="absolute -bottom-32 -left-24 w-[440px] h-[440px] rounded-full bg-[#83B9E6]/20 blur-3xl animate-blob" style={{ animationDelay: '3s' }} />

      <div className="relative text-center max-w-lg">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-red-100 flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        <div className="mt-6 text-6xl font-display font-black text-[#231F20]">500</div>
        <h1 className="mt-3 text-2xl font-display font-bold text-[#231F20]">Something went wrong</h1>
        <p className="mt-3 text-sm text-[#231F20]/60">{error?.message || 'An unexpected error occurred. Please try again.'}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={() => reset()} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#8CC63F] text-white font-semibold shadow-lg shadow-[#8CC63F]/25 hover:bg-[#231F20] transition-colors">
            <RefreshCcw className="w-4 h-4" /> Try again
          </button>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-black/10 text-[#231F20] font-semibold hover:border-[#231F20] transition">
            <Home className="w-4 h-4" /> Go Home
          </Link>
        </div>
      </div>
    </main>
  );
}
