import bcrypt from 'bcryptjs';
import { getDatabase } from '../../../lib/mongodb';
import { signToken } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, password, role = 'customer' } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const validRoles = ['customer', 'kitchen', 'admin'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const db = await getDatabase();
    if (!db) {
      return res.status(503).json({ error: 'Database not configured. Please set MONGODB_URI in .env.local' });
    }

    const existing = await db.collection('users').findOne({ email: email.toLowerCase() });

    if (existing) {
      return res.status(409).json({ error: 'An account with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
      created_at: new Date().toISOString(),
    };

    const result = await db.collection('users').insertOne(user);

    const token = signToken({
      userId: result.insertedId.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    });

    return res.status(201).json({
      token,
      user: {
        id: result.insertedId.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ error: 'Registration failed' });
  }
}
