# LakeFish (Next.js conversion)

## Run locally (VS Code)

1. Install Node.js (LTS recommended).
2. Open this folder in **VS Code**.
3. In the VS Code terminal:

```bash
npm install
npm run dev
```

4. Open:
- http://localhost:3000

## Notes
- This is a **Next.js (pages router)** version of the React app. Pages/content are kept the same; routing is handled by Next.
- Product data is served by a local API route:
  - `GET /api/products` reads `data/products.json`
  - Edit `data/products.json` to add products that should show up on the Menu page.
- Order creation uses:
  - `POST /api/orders` and stores orders in `data/orders.json` (local-dev only).

## Quick share link (demo only)
If you want a link to show the site without deploying:

```bash
npm run dev
npx cloudflared tunnel --url http://localhost:3000
```

Cloudflare will print a `https://*.trycloudflare.com` URL you can share.
