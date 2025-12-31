import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const filePath = path.join(process.cwd(), 'data', 'products.json');
    const raw = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '[]';
    const products = JSON.parse(raw || '[]');
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({ error: err?.message || 'Failed to load products' });
  }
}
