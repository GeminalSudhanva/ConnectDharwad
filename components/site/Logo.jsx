import Link from 'next/link';

export default function Logo({ dark = false }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <div className="w-10 h-10 rounded-xl brand-gradient flex items-center justify-center shadow-lg shadow-[#8CC63F]/20 group-hover:scale-105 transition-transform">
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M4 12 L10 18 L20 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="leading-tight">
        <div className={`font-display font-bold text-[15px] tracking-tight ${dark ? 'text-white' : 'text-[#231F20]'}`}>
          CONNECT
        </div>
        <div className="text-[10px] font-semibold tracking-[0.24em] text-[#8CC63F] -mt-0.5">DHARWAD</div>
      </div>
    </Link>
  );
}
