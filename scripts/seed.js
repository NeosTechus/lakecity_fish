const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || 'lakecityfish';

async function seed() {
  if (!MONGODB_URI) {
    console.error('Set MONGODB_URI environment variable before running seed.');
    console.error('Example: MONGODB_URI="mongodb+srv://user:pass@cluster.mongodb.net" node scripts/seed.js');
    process.exit(1);
  }

  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);

    const filePath = path.join(__dirname, '..', 'data', 'products.json');
    const products = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    await db.collection('products').deleteMany({});
    console.log('Cleared existing products');

    const result = await db.collection('products').insertMany(products);
    console.log(`Inserted ${result.insertedCount} products`);

    await db.collection('orders').createIndex({ order_number: 1 }, { unique: true });
    await db.collection('products').createIndex({ category: 1 });
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    console.log('Created indexes');

    console.log('Seed completed successfully!');
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seed();
