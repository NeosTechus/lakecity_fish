// Compatibility layer for code that was originally written to use "base44".
//
// In this Next.js conversion we keep the same calls:
//   base44.entities.Product.list()
//   base44.entities.Order.create(orderData)
//   base44.integrations.Core.SendEmail(payload)
//
// Locally this works using Next.js API routes under /api/*.
// On Vercel, file storage inside API routes is NOT persistent — use a real database for production.

async function jsonFetch(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `Request failed: ${res.status}`);
  }
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) return res.json();
  return res.text();
}

export const base44 = {
  entities: {
    Product: {
      async list() {
        return jsonFetch('/api/products');
      },
    },
    Order: {
      async create(orderData) {
        return jsonFetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData),
        });
      },
    },
  },
  integrations: {
    Core: {
      async SendEmail(payload) {
        return jsonFetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      },
    },
  },
};
