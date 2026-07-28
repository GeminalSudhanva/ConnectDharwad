import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { getDb } from '@/lib/mongo';
import { getSession, setSession, clearSession, verifyCredentials } from '@/lib/auth';
import { sendEmail, contactAdminTemplate, userAckTemplate } from '@/lib/email';
import { uploadImage } from '@/lib/cloudinary';

const json = (data, init = {}) => NextResponse.json(data, init);

const RESOURCES = {
  trainers: 'trainers',
  testimonials: 'testimonials',
  events: 'events',
  announcements: 'announcements',
  jobs: 'jobs',
  gallery: 'gallery',
  clients: 'clients',
  stats: 'stats',
};

async function requireAuth() {
  const s = await getSession();
  if (!s) return null;
  return s;
}

function stripId(doc) {
  if (!doc) return doc;
  const { _id, ...rest } = doc;
  return rest;
}

export async function GET(request, { params }) {
  const path = (await params)?.path || [];
  const [head, sub, id] = path;
  try {
    if (!head || head === 'health') return json({ ok: true, message: 'Connect Dharwad API' });

    if (head === 'auth' && sub === 'me') {
      const s = await getSession();
      return json({ authenticated: !!s, user: s ? { email: s.email, name: s.name } : null });
    }

    // Public reads for landing-page content
    if (head === 'public' && sub && RESOURCES[sub]) {
      const db = await getDb();
      const items = await db.collection(RESOURCES[sub]).find({}).sort({ order: 1, createdAt: -1 }).limit(200).toArray();
      return json({ items: items.map(stripId) });
    }

    // Admin
    if (head === 'admin') {
      const s = await requireAuth();
      if (!s) return json({ error: 'Unauthorized' }, { status: 401 });

      if (sub === 'dashboard') {
        const db = await getDb();
        const [contacts, enquiries, applications, trainers, events, testimonials] = await Promise.all([
          db.collection('contacts').countDocuments({}),
          db.collection('enquiries').countDocuments({}),
          db.collection('applications').countDocuments({}),
          db.collection('trainers').countDocuments({}),
          db.collection('events').countDocuments({}),
          db.collection('testimonials').countDocuments({}),
        ]);
        const recentContacts = await db.collection('contacts').find({}).sort({ createdAt: -1 }).limit(5).toArray();
        const recentApplications = await db.collection('applications').find({}).sort({ createdAt: -1 }).limit(5).toArray();
        return json({
          counts: { contacts, enquiries, applications, trainers, events, testimonials },
          recent: { contacts: recentContacts.map(stripId), applications: recentApplications.map(stripId) },
        });
      }

      if (sub === 'leads') {
        const db = await getDb();
        const [contacts, enquiries, applications] = await Promise.all([
          db.collection('contacts').find({}).sort({ createdAt: -1 }).limit(200).toArray(),
          db.collection('enquiries').find({}).sort({ createdAt: -1 }).limit(200).toArray(),
          db.collection('applications').find({}).sort({ createdAt: -1 }).limit(200).toArray(),
        ]);
        return json({
          contacts: contacts.map(stripId),
          enquiries: enquiries.map(stripId),
          applications: applications.map(stripId),
        });
      }

      if (RESOURCES[sub]) {
        const db = await getDb();
        const items = await db.collection(RESOURCES[sub]).find({}).sort({ order: 1, createdAt: -1 }).toArray();
        return json({ items: items.map(stripId) });
      }
    }

    // Legacy public listing (kept)
    if (head === 'contact' || head === 'enquiries' || head === 'applications') {
      const s = await requireAuth();
      if (!s) return json({ error: 'Unauthorized' }, { status: 401 });
      const db = await getDb();
      const items = await db.collection(head === 'contact' ? 'contacts' : head).find({}).sort({ createdAt: -1 }).limit(100).toArray();
      return json({ items: items.map(stripId) });
    }

    return json({ error: 'Not found', route: path.join('/') }, { status: 404 });
  } catch (e) {
    return json({ error: e.message }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  const path = (await params)?.path || [];
  const [head, sub] = path;
  const body = await request.json().catch(() => ({}));

  try {
    // Auth
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

    // Upload (Cloudinary or base64 fallback)
    if (head === 'upload') {
      const s = await requireAuth();
      if (!s) return json({ error: 'Unauthorized' }, { status: 401 });
      const { dataUrl, folder } = body;
      if (!dataUrl) return json({ error: 'dataUrl required' }, { status: 400 });
      const res = await uploadImage(dataUrl, folder);
      return json(res);
    }

    // Public form endpoints
    if (head === 'contact') {
      const { name, email, phone, subject, message } = body;
      if (!name || !email || !message) return json({ error: 'name, email and message are required' }, { status: 400 });
      const db = await getDb();
      const doc = { id: uuidv4(), name, email, phone: phone || '', subject: subject || 'General', message, createdAt: new Date().toISOString() };
      await db.collection('contacts').insertOne(doc);
      // Fire and forget email
      const notify = process.env.CONTACT_NOTIFY_EMAIL;
      sendEmail({ to: notify, subject: `[Contact] ${subject || 'General'} — ${name}`, html: contactAdminTemplate(doc), replyTo: email }).catch(() => {});
      sendEmail({ to: email, subject: 'We received your message — Connect Dharwad', html: userAckTemplate({ name, type: 'message' }) }).catch(() => {});
      return json({ ok: true, id: doc.id });
    }

    if (head === 'enquiries') {
      const { name, email, phone, program, message, type } = body;
      if (!name || !email) return json({ error: 'name and email are required' }, { status: 400 });
      const db = await getDb();
      const doc = { id: uuidv4(), type: type || 'training', name, email, phone: phone || '', program: program || '', message: message || '', createdAt: new Date().toISOString() };
      await db.collection('enquiries').insertOne(doc);
      const notify = process.env.CONTACT_NOTIFY_EMAIL;
      sendEmail({ to: notify, subject: `[Enquiry] ${type || 'training'} — ${name}`, html: contactAdminTemplate(doc), replyTo: email }).catch(() => {});
      sendEmail({ to: email, subject: 'We received your enquiry — Connect Dharwad', html: userAckTemplate({ name, type: 'enquiry' }) }).catch(() => {});
      return json({ ok: true, id: doc.id });
    }

    if (head === 'apply') {
      const { name, email, phone, position, resumeUrl, coverLetter } = body;
      if (!name || !email || !position) return json({ error: 'name, email and position are required' }, { status: 400 });
      const db = await getDb();
      const doc = { id: uuidv4(), name, email, phone: phone || '', position, resumeUrl: resumeUrl || '', coverLetter: coverLetter || '', createdAt: new Date().toISOString() };
      await db.collection('applications').insertOne(doc);
      const notify = process.env.CONTACT_NOTIFY_EMAIL;
      sendEmail({ to: notify, subject: `[Application] ${position} — ${name}`, html: contactAdminTemplate(doc), replyTo: email }).catch(() => {});
      sendEmail({ to: email, subject: 'Application received — Connect Dharwad', html: userAckTemplate({ name, type: 'application' }) }).catch(() => {});
      return json({ ok: true, id: doc.id });
    }

    // Admin CRUD create
    if (head === 'admin' && RESOURCES[sub]) {
      const s = await requireAuth();
      if (!s) return json({ error: 'Unauthorized' }, { status: 401 });
      const db = await getDb();
      const doc = { ...body, id: uuidv4(), createdAt: new Date().toISOString() };
      await db.collection(RESOURCES[sub]).insertOne(doc);
      return json({ ok: true, item: stripId(doc) });
    }

    return json({ error: 'Not found', route: path.join('/') }, { status: 404 });
  } catch (e) {
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
      const db = await getDb();
      const { _id, id: bId, createdAt, ...update } = body;
      await db.collection(RESOURCES[sub]).updateOne({ id }, { $set: update });
      const item = await db.collection(RESOURCES[sub]).findOne({ id });
      return json({ ok: true, item: stripId(item) });
    }
    return json({ error: 'Not found' }, { status: 404 });
  } catch (e) {
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
      const db = await getDb();
      await db.collection(RESOURCES[sub]).deleteOne({ id });
      return json({ ok: true });
    }
    if (head === 'admin' && (sub === 'contacts' || sub === 'enquiries' || sub === 'applications') && id) {
      const s = await requireAuth();
      if (!s) return json({ error: 'Unauthorized' }, { status: 401 });
      const db = await getDb();
      await db.collection(sub).deleteOne({ id });
      return json({ ok: true });
    }
    return json({ error: 'Not found' }, { status: 404 });
  } catch (e) {
    return json({ error: e.message }, { status: 500 });
  }
}
