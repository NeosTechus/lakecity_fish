const bcrypt = require('bcryptjs');
const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || 'lakecityfish';

async function createUsers() {
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(MONGODB_DB);

  const users = [
    { name: 'Admin', email: 'admin@lakecityfish.com', role: 'admin', plainPass: 'admin123' },
    { name: 'Kitchen', email: 'kitchen@lakecityfish.com', role: 'kitchen', plainPass: 'kitchen123' },
    { name: 'Customer', email: 'customer@lakecityfish.com', role: 'customer', plainPass: 'customer123' },
  ];

  for (const u of users) {
    const existing = await db.collection('users').findOne({ email: u.email });
    if (existing) {
      console.log(`Already exists: ${u.email} (${u.role})`);
      continue;
    }
    const hashed = await bcrypt.hash(u.plainPass, 12);
    await db.collection('users').insertOne({
      name: u.name,
      email: u.email,
      password: hashed,
      role: u.role,
      created_at: new Date().toISOString(),
    });
    console.log(`Created: ${u.email} (${u.role})`);
  }

  await client.close();
  console.log('Done!');
}

createUsers().catch(err => { console.error(err); process.exit(1); });
