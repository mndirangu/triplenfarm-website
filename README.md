# Triple N EcoSmart Farm — Deployment Package

Production domain: https://www.triplenfarm.com

## Cloudflare Pages settings
- Framework preset: None
- Build command: leave blank
- Build output directory: `/` or leave blank when the repository root contains `index.html`
- Production branch: `main`

## Important launch edit
Open `index.html` and replace:

`const WHATSAPP_NUMBER='';`

with the official Malawi WhatsApp number in international format without `+`, spaces, or the first zero, for example `265XXXXXXXXX`.

## Files
- `index.html` — complete website
- `_redirects` — redirects apex domain to www and enables SPA fallback
- `_headers` — security and cache headers
- `robots.txt` and `sitemap.xml` — search-engine discovery
- `site.webmanifest` — installable web-app metadata
