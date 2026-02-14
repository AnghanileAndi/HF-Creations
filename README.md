HF Creations — Minimal fast web app

Run locally:

```bash
# Option 1: Open index.html in browser (fast)
# Option 2: Use a lightweight static server (recommended)
npx serve . -l 3000
# then open http://localhost:3000
```

What I included:
- `index.html`: Single-page, semantic and SEO-friendly structure
- `styles.css`: Main styles (critical CSS inlined in index.html)
- `app.js`: Small JS for lazy-loading, FAQ, and newsletter UX
- `sitemap.xml` and `robots.txt` for SEO
- `manifest.json` for PWA basics

Next recommended steps:
- Add optimized, sized images (WebP) and a CDN
- Add server-side rendering or prerendering for richer SEO
- Hook newsletter to an email provider (Mailchimp, SendGrid)
- Add analytics and performance monitoring

Adding optimized images and Mailchimp subscription
- Images: place optimized images under `public/images/` using the naming convention used in the gallery component:
	- `work-1-400.avif`, `work-1-800.avif`, `work-1-400.webp`, `work-1-800.webp` etc.
	- The `picture`/`srcset` markup will prefer AVIF then WebP then fallback.

- Mailchimp (serverless): a Netlify function is provided at `netlify/functions/subscribe.js`. Configure these environment variables in your host:
	- `MAILCHIMP_API_KEY` (do NOT commit this key)
	- `MAILCHIMP_LIST_ID`

	The client form will POST to `/api/subscribe` (Vercel) or `/.netlify/functions/subscribe` (Netlify) — the client attempts both endpoints.

Local preview (dev):
```bash
npm install
npm run dev
```

Build (prerendered/static):
```bash
npm run build
npm run preview
```

Deploy notes
- Netlify: the `netlify/functions/subscribe.js` function will be published automatically when you deploy; set env vars in Netlify dashboard.
- Vercel: create an equivalent `api/subscribe` function (serverless) and set environment variables in Vercel dashboard.
