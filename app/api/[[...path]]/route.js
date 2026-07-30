import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession, setSession, clearSession, verifyCredentials } from '@/lib/auth';
import { sendEmail, contactAdminTemplate, userAckTemplate } from '@/lib/email';
import { uploadImage } from '@/lib/cloudinary';

const json = (data, init = {}) => NextResponse.json(data, init);

// Map resource name -> prisma model accessor
const RESOURCES = {
  trainers: 'trainer',
  testimonials: 'testimonial',
  events: 'event',
  announcements: 'announcement',
  jobs: 'job',
  gallery: 'galleryItem',
  clients: 'client',
  stats: 'stat',
};

async function requireAuth() {
  const s = await getSession();
  return s || null;
}

function sanitize(body, model) {
  const clean = { ...body };
  delete clean.id;
  delete clean.createdAt;
  delete clean.updatedAt;
  // Coerce number fields
  if ('rating' in clean) clean.rating = Number(clean.rating) || 5;
  if ('order' in clean) clean.order = Number(clean.order) || 0;
  if ('value' in clean) clean.value = Number(clean.value) || 0;
  // Boolean fields
  ['approved', 'pinned', 'isPast', 'active'].forEach((k) => {
    if (k in clean) clean[k] = Boolean(clean[k]);
  });
  return clean;
}

function getOrderBy(resource) {
  if (resource === 'trainers') return [{ order: 'asc' }, { createdAt: 'desc' }];
  if (resource === 'clients' || resource === 'stats') return [{ order: 'asc' }];
  return [{ createdAt: 'desc' }];
}

export async function GET(request, { params }) {
  const path = (await params)?.path || [];
  const [head, sub, id] = path;
  try {
    if (!head || head === 'health') return json({ ok: true, message: 'Connect Dharwad API', db: 'Neon PostgreSQL' });

    if (head === 'auth' && sub === 'me') {
      const s = await getSession();
      return json({ authenticated: !!s, user: s ? { email: s.email, name: s.name } : null });
    }

    // Public reads for landing-page content
    if (head === 'public' && sub && RESOURCES[sub]) {
      const items = await prisma[RESOURCES[sub]].findMany({ orderBy: getOrderBy(sub) });
      return json({ items });
    }

    // Admin
    if (head === 'admin') {
      const s = await requireAuth();
      if (!s) return json({ error: 'Unauthorized' }, { status: 401 });

      if (sub === 'dashboard') {
        const [contacts, enquiries, applications, trainers, events, testimonials] = await Promise.all([
          prisma.contact.count(),
          prisma.enquiry.count(),
          prisma.application.count(),
          prisma.trainer.count(),
          prisma.event.count(),
          prisma.testimonial.count(),
        ]);
        const [recentContacts, recentApplications] = await Promise.all([
          prisma.contact.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
          prisma.application.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
        ]);
        return json({
          counts: { contacts, enquiries, applications, trainers, events, testimonials },
          recent: { contacts: recentContacts, applications: recentApplications },
        });
      }

      if (sub === 'leads') {
        const [contacts, enquiries, applications] = await Promise.all([
          prisma.contact.findMany({ orderBy: { createdAt: 'desc' }, take: 200 }),
          prisma.enquiry.findMany({ orderBy: { createdAt: 'desc' }, take: 200 }),
          prisma.application.findMany({ orderBy: { createdAt: 'desc' }, take: 200 }),
        ]);
        return json({ contacts, enquiries, applications });
      }

      if (RESOURCES[sub]) {
        const items = await prisma[RESOURCES[sub]].findMany({ orderBy: getOrderBy(sub) });
        return json({ items });
      }
    }

    return json({ error: 'Not found', route: path.join('/') }, { status: 404 });
  } catch (e) {
    console.error('[GET]', e);
    return json({ error: e.message }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  const path = (await params)?.path || [];
  const [head, sub] = path;
  const body = await request.json().catch(() => ({}));

  try {
    if (head === 'auth' && sub === 'login') {
      const { email, password } = body;
      if (!verifyCredentials(email, password)) return json({ error: 'Invalid credentials' }, { status: 401 });
      await setSession({ email, name: 'Admin' });
      return json({ ok: true });
    }
    if (head === 'auth' && sub === 'logout') {
      await clearSession();
      return json({ ok: true });
    }

    if (head === 'upload') {
      const s = await requireAuth();
      if (!s) return json({ error: 'Unauthorized' }, { status: 401 });
      const { dataUrl, folder } = body;
      if (!dataUrl) return json({ error: 'dataUrl required' }, { status: 400 });
      const res = await uploadImage(dataUrl, folder);
      return json(res);
    }

    // Public forms
    if (head === 'contact') {
      const { name, email, phone, subject, message } = body;
      if (!name || !email || !message) return json({ error: 'name, email and message are required' }, { status: 400 });
      const doc = await prisma.contact.create({ data: { name, email, phone: phone || null, subject: subject || 'General', message } });
      const notify = process.env.CONTACT_NOTIFY_EMAIL;
      sendEmail({ to: notify, subject: `[Contact] ${subject || 'General'} — ${name}`, html: contactAdminTemplate(doc), replyTo: email }).catch(() => {});
      sendEmail({ to: email, subject: 'We received your message — Connect Dharwad', html: userAckTemplate({ name, type: 'message' }) }).catch(() => {});
      return json({ ok: true, id: doc.id });
    }

    if (head === 'enquiries') {
      const { name, email, phone, program, message, type } = body;
      if (!name || !email) return json({ error: 'name and email are required' }, { status: 400 });
      const doc = await prisma.enquiry.create({ data: { type: type || 'training', name, email, phone: phone || null, program: program || null, message: message || null } });
      const notify = process.env.CONTACT_NOTIFY_EMAIL;
      sendEmail({ to: notify, subject: `[Enquiry] ${type || 'training'} — ${name}`, html: contactAdminTemplate(doc), replyTo: email }).catch(() => {});
      sendEmail({ to: email, subject: 'We received your enquiry — Connect Dharwad', html: userAckTemplate({ name, type: 'enquiry' }) }).catch(() => {});
      return json({ ok: true, id: doc.id });
    }

    if (head === 'apply') {
      const { name, email, phone, position, resumeUrl, coverLetter } = body;
      if (!name || !email || !position) return json({ error: 'name, email and position are required' }, { status: 400 });
      const doc = await prisma.application.create({ data: { name, email, phone: phone || null, position, resumeUrl: resumeUrl || null, coverLetter: coverLetter || null } });
      const notify = process.env.CONTACT_NOTIFY_EMAIL;
      sendEmail({ to: notify, subject: `[Application] ${position} — ${name}`, html: contactAdminTemplate(doc), replyTo: email }).catch(() => {});
      sendEmail({ to: email, subject: 'Application received — Connect Dharwad', html: userAckTemplate({ name, type: 'application' }) }).catch(() => {});
      return json({ ok: true, id: doc.id });
    }

    // Admin create
    if (head === 'admin' && RESOURCES[sub]) {
      const s = await requireAuth();
      if (!s) return json({ error: 'Unauthorized' }, { status: 401 });
      const data = sanitize(body, sub);
      const item = await prisma[RESOURCES[sub]].create({ data });
      return json({ ok: true, item });
    }

    return json({ error: 'Not found', route: path.join('/') }, { status: 404 });
  } catch (e) {
    console.error('[POST]', e);
    return json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const path = (await params)?.path || [];
  const [head, sub, id] = path;
  const body = await request.json().catch(() => ({}));
  try {
    if (head === 'admin' && RESOURCES[sub] && id) {
      const s = await requireAuth();
      if (!s) return json({ error: 'Unauthorized' }, { status: 401 });
      const data = sanitize(body, sub);
      const item = await prisma[RESOURCES[sub]].update({ where: { id }, data });
      return json({ ok: true, item });
    }
    return json({ error: 'Not found' }, { status: 404 });
  } catch (e) {
    console.error('[PUT]', e);
    return json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const path = (await params)?.path || [];
  const [head, sub, id] = path;
  try {
    if (head === 'admin' && RESOURCES[sub] && id) {
      const s = await requireAuth();
      if (!s) return json({ error: 'Unauthorized' }, { status: 401 });
      await prisma[RESOURCES[sub]].delete({ where: { id } });
      return json({ ok: true });
    }
    if (head === 'admin' && ['contacts', 'enquiries', 'applications'].includes(sub) && id) {
      const s = await requireAuth();
      if (!s) return json({ error: 'Unauthorized' }, { status: 401 });
      const model = { contacts: 'contact', enquiries: 'enquiry', applications: 'application' }[sub];
      await prisma[model].delete({ where: { id } });
      return json({ ok: true });
    }
    return json({ error: 'Not found' }, { status: 404 });
  } catch (e) {
    console.error('[DELETE]', e);
    return json({ error: e.message }, { status: 500 });
  }
}
