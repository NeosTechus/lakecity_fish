import { getTokenFromReq, verifyToken } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = getTokenFromReq(req);
  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  return res.status(200).json({
    user: {
      id: decoded.userId,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
    },
  });
}
