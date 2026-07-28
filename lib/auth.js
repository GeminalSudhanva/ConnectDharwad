import crypto from 'node:crypto';
import { cookies } from 'next/headers';

const COOKIE = 'cd_session';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getSecret() {
  return process.env.SESSION_SECRET || 'dev-secret-change-me-in-production-please';
}

function b64url(input) {
  return Buffer.from(input).toString('base64url');
}
function b64urlDecode(s) {
  return Buffer.from(s, 'base64url').toString();
}

export function signSession(payload) {
  const body = b64url(JSON.stringify({ ...payload, iat: Date.now(), exp: Date.now() + MAX_AGE * 1000 }));
  const sig = crypto.createHmac('sha256', getSecret()).update(body).digest('base64url');
  return `${body}.${sig}`;
}

export function verifySession(token) {
  if (!token || typeof token !== 'string') return null;
  const [body, sig] = token.split('.');
  if (!body || !sig) return null;
  const expected = crypto.createHmac('sha256', getSecret()).update(body).digest('base64url');
  try {
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  } catch { return null; }
  try {
    const payload = JSON.parse(b64urlDecode(body));
    if (payload.exp && payload.exp < Date.now()) return null;
    return payload;
  } catch { return null; }
}

export async function getSession() {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  return verifySession(token);
}

export async function setSession(payload) {
  const token = signSession(payload);
  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: MAX_AGE,
  });
}

export async function clearSession() {
  const store = await cookies();
  store.delete(COOKIE);
}

export function verifyCredentials(email, password) {
  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@connectdharwad.org').toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  return email?.toLowerCase() === adminEmail && password === adminPassword;
}

export const SESSION_COOKIE = COOKIE;
