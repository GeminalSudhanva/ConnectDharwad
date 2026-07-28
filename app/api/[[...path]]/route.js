import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

let cachedClient = null;
async function getDb() {
  if (!cachedClient) {
    cachedClient = new MongoClient(process.env.MONGO_URL);
    await cachedClient.connect();
  }
  const dbName = process.env.DB_NAME || 'connect_dharwad';
  return cachedClient.db(dbName);
}

function json(data, init = {}) {
  return NextResponse.json(data, init);
}

export async function GET(request, { params }) {
  const path = (await params)?.path || [];
  const route = path.join('/');

  try {
    if (route === '' || route === 'health') {
      return json({ ok: true, message: 'Connect Dharwad API' });
    }

    if (route === 'contact') {
      const db = await getDb();
      const items = await db.collection('contacts').find({}).sort({ createdAt: -1 }).limit(50).toArray();
      return json({ items: items.map((i) => ({ ...i, _id: undefined })) });
    }

    if (route === 'enquiries') {
      const db = await getDb();
      const items = await db.collection('enquiries').find({}).sort({ createdAt: -1 }).limit(50).toArray();
      return json({ items: items.map((i) => ({ ...i, _id: undefined })) });
    }

    return json({ error: 'Not found', route }, { status: 404 });
  } catch (e) {
    return json({ error: e.message }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  const path = (await params)?.path || [];
  const route = path.join('/');
  const body = await request.json().catch(() => ({}));

  try {
    if (route === 'contact') {
      const { name, email, phone, subject, message } = body;
      if (!name || !email || !message) {
        return json({ error: 'name, email and message are required' }, { status: 400 });
      }
      const db = await getDb();
      const doc = {
        id: uuidv4(),
        name, email, phone: phone || '', subject: subject || 'General', message,
        createdAt: new Date().toISOString(),
      };
      await db.collection('contacts').insertOne(doc);
      return json({ ok: true, id: doc.id });
    }

    if (route === 'enquiries') {
      const { name, email, phone, program, message, type } = body;
      if (!name || !email) {
        return json({ error: 'name and email are required' }, { status: 400 });
      }
      const db = await getDb();
      const doc = {
        id: uuidv4(),
        type: type || 'training',
        name, email, phone: phone || '', program: program || '', message: message || '',
        createdAt: new Date().toISOString(),
      };
      await db.collection('enquiries').insertOne(doc);
      return json({ ok: true, id: doc.id });
    }

    if (route === 'apply') {
      const { name, email, phone, position, resumeUrl, coverLetter } = body;
      if (!name || !email || !position) {
        return json({ error: 'name, email and position are required' }, { status: 400 });
      }
      const db = await getDb();
      const doc = {
        id: uuidv4(),
        name, email, phone: phone || '', position,
        resumeUrl: resumeUrl || '', coverLetter: coverLetter || '',
        createdAt: new Date().toISOString(),
      };
      await db.collection('applications').insertOne(doc);
      return json({ ok: true, id: doc.id });
    }

    return json({ error: 'Not found', route }, { status: 404 });
  } catch (e) {
    return json({ error: e.message }, { status: 500 });
  }
}
