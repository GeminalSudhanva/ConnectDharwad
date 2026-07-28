import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-white overflow-hidden relative">
      <div className="absolute inset-0 grid-pattern opacity-60" />
      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-[#8CC63F]/20 blur-3xl animate-blob" />
      <div className="absolute -bottom-32 -right-24 w-[440px] h-[440px] rounded-full bg-[#83B9E6]/25 blur-3xl animate-blob" style={{ animationDelay: '3s' }} />

      <div className="relative text-center max-w-lg">
        <div className="text-[140px] leading-none font-display font-black brand-gradient-text">404</div>
        <h1 className="mt-4 text-3xl font-display font-bold text-[#231F20]">Page not found</h1>
        <p className="mt-3 text-[#231F20]/60">The page you’re looking for doesn’t exist or has been moved.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#8CC63F] text-white font-semibold shadow-lg shadow-[#8CC63F]/25 hover:bg-[#231F20] transition-colors">
            <Home className="w-4 h-4" /> Go Home
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-black/10 text-[#231F20] font-semibold hover:border-[#231F20] transition">
            <ArrowLeft className="w-4 h-4" /> Contact Support
          </Link>
        </div>
      </div>
    </main>
  );
}
