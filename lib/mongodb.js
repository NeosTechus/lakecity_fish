import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || 'lakecityfish';

let clientPromise = null;

if (MONGODB_URI) {
  let cached = global._mongoClientPromise;
  if (!cached) {
    const client = new MongoClient(MONGODB_URI);
    cached = global._mongoClientPromise = client.connect();
  }
  clientPromise = cached;
}

export default clientPromise;

export async function getDatabase() {
  if (!clientPromise) return null;
  const client = await clientPromise;
  return client.db(MONGODB_DB);
}
