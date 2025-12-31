import fs from 'fs';
import path from 'path';

function randomOrderNumber() {
  const n = Math.floor(Math.random() * 900000 + 100000);
  return `LCF-${n}`;
}

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const order = req.body || {};
    const stored = {
      ...order,
      order_number: order.order_number || randomOrderNumber(),
      status: order.status || 'pending',
      created_at: new Date().toISOString()
    };

    const filePath = path.join(process.cwd(), 'data', 'orders.json');
    const existing = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf8') || '[]') : [];
    existing.push(stored);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), 'utf8');

    return res.status(200).json(stored);
  } catch (err) {
    return res.status(500).send(err?.message || 'Failed to create order');
  }
}
