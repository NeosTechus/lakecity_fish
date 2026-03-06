const bcrypt = require('bcryptjs');
const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || 'lakecityfish';

async function createUsers() {
  if (!MONGODB_URI) {
    console.error('Set MONGODB_URI in .env.local before running this script.');
    process.exit(1);
  }

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(MONGODB_DB);

  const users = [
    { name: 'Admin', email: process.env.ADMIN_EMAIL, role: 'admin', plainPass: process.env.ADMIN_PASSWORD },
    { name: 'Kitchen', email: process.env.KITCHEN_EMAIL, role: 'kitchen', plainPass: process.env.KITCHEN_PASSWORD },
    { name: 'Customer', email: process.env.CUSTOMER_EMAIL, role: 'customer', plainPass: process.env.CUSTOMER_PASSWORD },
  ].filter(u => u.email && u.plainPass);

  if (users.length === 0) {
    console.error('No user credentials found. Set ADMIN_EMAIL, ADMIN_PASSWORD, etc. in .env.local');
    process.exit(1);
  }

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
