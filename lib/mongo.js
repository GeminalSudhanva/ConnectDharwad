import { MongoClient } from 'mongodb';

let cached = global.__mongo;
if (!cached) cached = global.__mongo = { conn: null, promise: null };

export async function getDb() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    const client = new MongoClient(process.env.MONGO_URL, { maxPoolSize: 5 });
    cached.promise = client.connect().then((c) => c.db(process.env.DB_NAME || 'connect_dharwad'));
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
