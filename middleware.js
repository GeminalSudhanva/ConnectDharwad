import { NextResponse } from 'next/server';
import { SESSION_COOKIE, verifySessionEdge } from './lib/auth-edge.js';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const secret = process.env.SESSION_SECRET || 'dev-secret-change-me-in-production-please';
    const session = await verifySessionEdge(token, secret);
    if (!session) {
      const url = new URL('/login', request.url);
      url.searchParams.set('next', pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
