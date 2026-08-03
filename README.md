# GetLeadFlow Sites — company website

Marketing website for **GetLeadFlow Sites** — done-for-you client acquisition for
ceramic coating & PPF detailers. We run the Meta ads, work every lead, and book the
jobs onto the detailer's calendar.

## Stack

Plain, self-contained **HTML / CSS / JS** — no build step, no framework, hosts
anywhere. Fast, easy to edit, and portable.

```
index.html          Home
services.html       Services (incl. lead follow-up & appointment setting)
how-it-works.html   4-step process
about.html          About + founder
contact.html        Book-a-call + qualifying form
css/styles.css      Shared design system (tokens, components, responsive)
js/main.js          Nav, sticky header, FAQ accordion, scroll reveal, form
assets/             Logo mark, favicon, Open Graph social image (SVG)
sitemap.xml         SEO sitemap
robots.txt          Crawl directives
CNAME               Custom domain for GitHub Pages (getleadflowsites.com)
research/           Competitive teardown of the detailing-marketing market
```

## Run locally

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Deploy

Any static host works — pick one:

- **GitHub Pages:** enable Pages on this branch; the included `CNAME` points it at
  `getleadflowsites.com`. Add the DNS records GitHub shows you.
- **Netlify / Vercel / Cloudflare Pages:** drag-and-drop the folder or connect the
  repo. No build command; publish directory is the repo root.

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
