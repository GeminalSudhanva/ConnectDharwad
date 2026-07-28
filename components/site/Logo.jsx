'use client';

import Link from 'next/link';

function LogoMark({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      {/* Connector nodes */}
      <rect x="-3" y="27" width="6" height="4" rx="1.2" fill="#D8D8D8"/>
      <rect x="-3" y="33" width="6" height="4" rx="1.2" fill="#D8D8D8"/>
      {/* Grey square (left) */}
      <rect x="1" y="21" width="22" height="22" rx="5" fill="#BDBDBD"/>
      {/* Green square (top) */}
      <rect x="21" y="1" width="22" height="22" rx="5" fill="#8CC63F"/>
      {/* Blue square (bottom) */}
      <rect x="21" y="41" width="22" height="22" rx="5" fill="#83B9E6"/>
      {/* Subtle highlight for depth */}
      <rect x="21" y="1" width="22" height="9" rx="5" fill="url(#lg-highlight)" opacity="0.35"/>
      <rect x="21" y="41" width="22" height="9" rx="5" fill="url(#lg-highlight)" opacity="0.3"/>
      <rect x="1" y="21" width="22" height="9" rx="5" fill="url(#lg-highlight)" opacity="0.3"/>
      <defs>
        <linearGradient id="lg-highlight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff"/>
          <stop offset="1" stopColor="#fff" stopOpacity="0"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Logo({ dark = false, size = 'md', showTagline = false }) {
  const iconSize = size === 'lg' ? 48 : size === 'sm' ? 32 : 40;
  const textColor = dark ? 'text-white' : 'text-[#231F20]';

  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <div className="transition-transform group-hover:scale-105">
        <LogoMark size={iconSize} />
      </div>
      <div className="leading-none">
        <div className={`font-display font-extrabold tracking-[0.05em] text-[16px] ${textColor}`}>
          C<span className="text-[#8CC63F]">O</span><span className="text-[#8CC63F]">N</span><span className="text-[#83B9E6]">N</span>ECT
        </div>
        <div className="text-[10px] font-semibold tracking-[0.28em] text-[#8CC63F] mt-0.5">DHARWAD</div>
        {showTagline && (
          <div className={`text-[9px] italic mt-1 ${dark ? 'text-white/60' : 'text-[#231F20]/60'}`}>
            Rediscover Life... Pathway to Success...
          </div>
        )}
      </div>
    </Link>
  );
}

export { LogoMark };
