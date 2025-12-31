export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Demo-only: We don't send real email here.
  // Hook this up to an email provider (Resend, SendGrid, Postmark, etc.) for production.
  try {
    const payload = req.body || {};
    console.log('SendEmail payload:', payload);
    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: err?.message || 'Failed' });
  }
}
