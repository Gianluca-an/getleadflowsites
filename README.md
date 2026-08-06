# GetLeadFlow Sites — company website

Marketing website for **GetLeadFlow Sites** — done-for-you client acquisition for
ceramic coating & PPF detailers. We run the Meta ads, work every lead, and book the
jobs onto the detailer's calendar.

## Stack

Plain, self-contained **HTML / CSS / JS** — no build step, no framework, hosts
anywhere. Fast, easy to edit, and portable.

The published website lives in **`public/`** — only that folder is deployed, so
`research/` and other repo files are never exposed on the live site.

```
public/                     ← the deployed site (publish/output directory)
  index.html                Home
  services.html             Services (incl. lead follow-up & appointment setting)
  how-it-works.html         4-step process
  about.html                About + founder
  contact.html              Book-a-call + qualifying form
  css/styles.css            Shared design system (tokens, components, responsive)
  js/main.js                Nav, sticky header, FAQ accordion, scroll reveal, form
  assets/                   Logo mark, favicon, Open Graph social image (SVG)
  sitemap.xml               SEO sitemap
  robots.txt                Crawl directives
  CNAME                     Custom domain hint (getleadflowsites.com) — used by GitHub Pages
wrangler.jsonc              Cloudflare deploy config (serves ./public as a static site)
research/                   Competitive teardown — private, NOT deployed
README.md
```

## Run locally

Serve the `public/` folder:

```bash
cd public && python3 -m http.server 8000   # then visit http://localhost:8000
```

## Deploy

No build step. Whatever host you use, the **publish / output directory is `public`**.

- **Cloudflare (current):** connected to this repo via `wrangler.jsonc`, which serves
  `./public` as a static (assets-only) site. Deploy command: `npx wrangler deploy`.
- **Cloudflare Pages:** connect the repo; set **Build output directory** to `public`,
  no build command.
- **Netlify / Vercel:** connect the repo; publish directory `public`, no build command.
- **GitHub Pages:** publish from `/public` (Pages "folder" option) — requires the repo
  to be public. The `CNAME` in `public/` points it at `getleadflowsites.com`.

## Things to customize

1. **Logo** — swap the inline SVG mark (and `assets/favicon.svg` / `assets/logo-mark.svg`)
   for your real logo. The wordmark text lives in each page's `.brand` element.
2. **Booking / form destination** — the contact form works out of the box: with an
   empty `data-endpoint` it opens the visitor's email app addressed to
   `contact@getleadflowsites.com`. To collect submissions automatically, create a free
   form at [Formspree](https://formspree.io) and set `data-endpoint="https://formspree.io/f/XX:XX"`
   on the `<form id="lead-form">` in `contact.html`. To use a calendar instead (Calendly,
   GoHighLevel, etc.), point the "Book a Call" buttons at your booking link.
3. **Guarantee wording** — the "7–12 jobs in 30–60 days" guarantee and "one shop per
   market" exclusivity appear on Home, Services, How It Works, and About. Update in all
   places if the terms change.
4. **Proof** — add real, named case studies as they land; the strategy (see
   `research/competitive-teardown.md`) is to beat competitors on proof integrity.

## Strategy reference

See **`research/competitive-teardown.md`** for the full competitive teardown of the
10 highest-ranking detailing-marketing agencies, the gap analysis, and the playbook
this site's structure and copy are built on.
