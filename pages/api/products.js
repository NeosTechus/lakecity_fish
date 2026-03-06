import { getDatabase } from '../../lib/mongodb';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const db = await getDatabase();

    if (db) {
      const raw = await db.collection('products').find({}).toArray();
      const products = raw.map(({ _id, ...rest }) => ({
        id: _id.toString(),
        ...rest,
      }));
      return res.status(200).json(products);
    }

    const filePath = path.join(process.cwd(), 'data', 'products.json');
    const raw = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '[]';
    const products = JSON.parse(raw || '[]').map((p, i) => ({ id: String(i + 1), ...p }));
    return res.status(200).json(products);
  } catch (err) {
    console.error('Failed to fetch products:', err);
    return res.status(500).json({ error: 'Failed to load products' });
  }
}
