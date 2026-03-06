import { getDatabase } from '../../lib/mongodb';
import fs from 'fs';
import path from 'path';

function randomOrderNumber() {
  const n = Math.floor(Math.random() * 900000 + 100000);
  return `LCF-${n}`;
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const db = await getDatabase();
      if (db) {
        const orders = await db.collection('orders').find({}).sort({ created_at: -1 }).toArray();
        return res.status(200).json(orders.map(({ _id, ...rest }) => ({ id: _id.toString(), ...rest })));
      }

      const filePath = path.join(process.cwd(), 'data', 'orders.json');
      const orders = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf8') || '[]') : [];
      return res.status(200).json(orders);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
      return res.status(500).json({ error: 'Failed to load orders' });
    }
  }

  if (req.method === 'POST') {
    try {
      const order = req.body || {};
      const stored = {
        ...order,
        order_number: order.order_number || randomOrderNumber(),
        status: order.status || 'pending',
        created_at: new Date().toISOString(),
      };

      const db = await getDatabase();
      if (db) {
        await db.collection('orders').insertOne(stored);
        return res.status(200).json(stored);
      }

      const filePath = path.join(process.cwd(), 'data', 'orders.json');
      const existing = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf8') || '[]') : [];
      existing.push(stored);
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), 'utf8');
      return res.status(200).json(stored);
    } catch (err) {
      console.error('Failed to create order:', err);
      return res.status(500).json({ error: 'Failed to create order' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
