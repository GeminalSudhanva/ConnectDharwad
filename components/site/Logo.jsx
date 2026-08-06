'use client';

import Link from 'next/link';

function LogoMark({ size = 40 }) {
  return (
    <img
      src="/IMG-20260731-WA0000.jpg.jpeg"
      alt="Connect Dharwad"
      style={{ height: `${size}px`, width: 'auto' }}
      className="object-contain shrink-0 rounded"
    />
  );
}

export default function Logo({ dark = false, size = 'md', showTagline = false }) {
  const iconSize = size === 'lg' ? 72 : size === 'sm' ? 40 : 60;

  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <div className="transition-transform group-hover:scale-105">
        <LogoMark size={iconSize} />
      </div>
    </Link>
  );
}

export { LogoMark };
