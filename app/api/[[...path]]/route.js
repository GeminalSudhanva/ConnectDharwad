import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const path = (await params)?.path || [];
  return NextResponse.json({
    ok: true,
    message: 'Connect Dharwad API',
    path: path,
  });
}

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  return NextResponse.json({ ok: true, received: body });
}
