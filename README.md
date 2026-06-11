# Sk Akash Ali — Portfolio

Personal portfolio of **Sk Akash Ali**, AI PM and builder. Built to demonstrate product judgment through case studies framed as _problem → hypothesis → build → outcome_, and to act as proof-of-work itself.

Live: [akashali.vercel.app](https://portfolio-akash-seven.vercel.app)

---

## What this is

A statically-generated Next.js site with one small server surface (the contact endpoint). Content is file-based MDX — adding a project means adding a file, nothing else. The site ships with six case studies across two tiers: three deep featured narratives and three compact build write-ups.

---

## Stack

| Layer | Choice | Version |
|---|---|---|
| Framework | Next.js App Router | 16.2.7 |
| Language | TypeScript (strict) | 5.x |
| UI runtime | React | 19.2.4 |
| Styling | Tailwind CSS | 4.x |
| Components | shadcn/ui (Base UI variant) | 4.11.0 |
| Content | MDX via `next-mdx-remote` + `gray-matter` | 6.x / 4.x |
| Validation | Zod | 4.x |
| Theming | next-themes | 0.4.6 |
| Email | Resend | 6.x |
| Analytics | Vercel Analytics | 2.x |
| Hosting | Vercel | — |

---

## Architecture

Six clean layers, each with one responsibility:

```
┌──────────────────────────────────────────────────────────────┐
│ 6. DELIVERY      Vercel · custom domain · CI · analytics      │
├──────────────────────────────────────────────────────────────┤
│ 5. BACKEND       /api/contact → Resend (only server surface)  │
├──────────────────────────────────────────────────────────────┤
│ 4. APPLICATION   Next App Router · RSC · metadata · OG imgs   │
├──────────────────────────────────────────────────────────────┤
│ 3. UI            components — cards, layouts, nav, theme      │
├──────────────────────────────────────────────────────────────┤
│ 2. DATA          lib/projects.ts · Zod-validated frontmatter  │
├──────────────────────────────────────────────────────────────┤
│ 1. CONTENT       content/projects/*.mdx + frontmatter         │
└──────────────────────────────────────────────────────────────┘
```

### Rendering strategy

- **Static by default.** Home, About, Uses, Projects index, and every case study are pre-rendered at build time via `generateStaticParams`. No runtime cost, edge-cached, great SEO.
- **Dynamic only for contact.** `POST /api/contact` runs server-side per request — the only surface with secrets.
- **OG images.** Per-project Open Graph images generated at build time with `next/og`.

### Data flow

**Reading a case study (build time):**
```
content/projects/campayn-pipeline.mdx
  → lib/projects.ts  (filesystem read + Zod validation)
  → app/projects/[slug]/page.tsx  (generateStaticParams + RSC)
  → CaseStudyLayout + MetadataBar + MDXRemote
  → static HTML at /projects/campayn-pipeline
```

**Submitting the contact form (runtime):**
```
ContactForm (client)  →  POST /api/contact
  → Zod validate  →  honeypot check  →  IP rate limit  →  Resend.send()
  → 200 { ok } | 400 | 429 | 500  →  UI success / inline error
```

---

## Project structure

```
portfolio/
├── app/
│   ├── layout.tsx                  # Root: fonts, ThemeProvider, Nav, Footer, Analytics
│   ├── page.tsx                    # Home — Hero, WhatIDo, featured cards, builds, band
│   ├── about/page.tsx              # About — story, shipping log, links
│   ├── uses/page.tsx               # Uses — stack, tools, workflow
│   ├── contact/page.tsx            # Contact form page
│   ├── not-found.tsx               # Custom 404
│   ├── projects/
│   │   ├── page.tsx                # Projects index with client filter
│   │   └── [slug]/
│   │       ├── page.tsx            # Case study (static)
│   │       └── opengraph-image.tsx # Per-project OG image
│   ├── api/contact/route.ts        # Email endpoint (Zod + honeypot + rate limit + Resend)
│   ├── opengraph-image.tsx         # Default OG image
│   ├── sitemap.ts                  # Auto-generated sitemap
│   ├── robots.ts                   # robots.txt
│   └── globals.css                 # Design tokens + Tailwind base
│
├── components/
│   ├── ui/                         # shadcn primitives (owned, not a dep)
│   ├── Nav.tsx                     # Sticky nav with active state + resume link
│   ├── Footer.tsx                  # Footer with social links
│   ├── ThemeToggle.tsx             # Light / dark toggle
│   ├── ThemeProvider.tsx           # next-themes wrapper
│   ├── Container.tsx               # Max-width layout primitive
│   ├── Hero.tsx                    # Home hero with staggered entrance animation
│   ├── WhatIDo.tsx                 # Three-column triad (Define / Build / Ship)
│   ├── ProjectCard.tsx             # Featured + compact card variants
│   ├── MetricBlock.tsx             # Signature metric display (big number + mono label)
│   ├── ProjectsGrid.tsx            # Client-side filter wrapper
│   ├── CurrentlyBuilding.tsx       # In-progress context band
│   ├── CaseStudyLayout.tsx         # Full case study shape: eyebrow, h1, metadata, MDX, prev/next
│   ├── MetadataBar.tsx             # Role · Stack · Timeframe · Outcome card
│   ├── ContactForm.tsx             # Client form: validation, honeypot, states
│   └── MdxComponents.tsx           # Styled MDX elements (h2, p, code, blockquote, Img)
│
├── content/
│   └── projects/
│       ├── campayn-pipeline.mdx    # featured · order 1
│       ├── freecharge-cardmatch.mdx # featured · order 2
│       ├── backbone.mdx            # featured · order 3
│       ├── zomato-recommender.mdx  # build · order 4
│       ├── groww-faq-chatbot.mdx   # build · order 5
│       └── groww-review-analyser.mdx # build · order 6
│
├── lib/
│   ├── projects.ts                 # Data access: read + validate + query (server-only)
│   ├── schema.ts                   # Zod frontmatter schema + Project type
│   ├── rate-limit.ts               # In-memory IP rate limiter (3 req / 10 min)
│   └── utils.ts                    # cn() utility
│
├── public/
│   └── resume.pdf                  # Downloadable resume
│
├── .env.example                    # Env var names (no values)
└── CLAUDE.md                       # AI assistant standing context
```

---

## Content model

Each project is a single MDX file in `content/projects/`. The frontmatter is Zod-validated at build time — an invalid file fails the build with a clear message.

**Required frontmatter fields:**

```yaml
title: string
tier: "featured" | "build"
order: number          # sort order within tier
status: "Shipped" | "PRD" | "Case study" | "Building"
summary: string        # ≤ 160 chars — used as meta description
role: string
timeframe: string
stack: string[]
metric:
  value: string        # e.g. "3×"
  label: string        # e.g. "pipeline throughput"
outcome: string
links:
  live: string
  repo: string
draft: false           # true = excluded from all queries
```

**MDX body structure (required):**

```markdown
## Problem
## Hypothesis
## What I built
## Outcome & learning
```

Two tiers: **featured** (deep narratives with full CaseStudyLayout) and **build** (compact cards on the projects index).

---

## Local development

**Prerequisites:** Node 20+

```bash
# 1. Clone and install
git clone git@github.com:akashh0210/portfolio_akash.git
cd portfolio_akash
npm install

# 2. Set up env vars
cp .env.example .env.local
# Fill in: RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL, NEXT_PUBLIC_SITE_URL

# 3. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Other commands:**

```bash
npm run build       # production build (must pass clean)
npm run start       # serve the production build locally
npm run lint        # ESLint
npx tsc --noEmit    # type check without emitting
```

---

## Environment variables

| Variable | Where | Purpose |
|---|---|---|
| `RESEND_API_KEY` | Vercel + `.env.local` | Resend auth — server-only, never client |
| `CONTACT_TO_EMAIL` | Vercel + `.env.local` | Inbox that receives contact messages |
| `CONTACT_FROM_EMAIL` | Vercel + `.env.local` | Verified Resend sender |
| `NEXT_PUBLIC_SITE_URL` | Vercel + `.env.local` | Canonical base URL — no trailing slash |

`.env.local` is gitignored. Never commit real values. Add them in Vercel's project settings and locally in `.env.local`.

---

## Contact endpoint

`POST /api/contact` — the only dynamic server surface.

```
Request  { name, email, message, company }  (JSON)
         company is a honeypot — must be empty

Response 200 { ok: true }
         400 { ok: false, error: "validation", issues: [...] }
         429 { ok: false, error: "rate_limited" }
         500 { ok: false, error: "send_failed" }
```

Security guarantees: server-side Zod validation, honeypot check (silent 200 if filled), IP-based rate limit (3 requests / 10 minutes), no persistence beyond the outbound email.

---

## Adding a project

1. Create `content/projects/<slug>.mdx` with valid frontmatter.
2. Run `npm run build` — fails loudly if frontmatter is invalid.
3. Push. Vercel deploys automatically.

No code changes required.

---

## Design system

Design tokens live in `app/globals.css` as CSS custom properties and are mapped to Tailwind utilities via `@theme inline`. Components use token classes only — no hardcoded hex.

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#fbfbf9` | `#0c0c0e` |
| `--surface` | `#ffffff` | `#141417` |
| `--text` | `#16161a` | `#f7f7f5` |
| `--accent` | `#2f4858` | `#8fb0c4` |
| `--border` | `#e6e6e1` | `#232327` |

Fonts: **Hanken Grotesk** (display/headings) · **Inter** (body) · **Geist Mono** (mono/code), all loaded via `next/font`.

Motion: restrained entrance animations on the Hero, hover micro-interactions on cards. All gated behind `prefers-reduced-motion: no-preference` using Tailwind's `motion-safe:` prefix.

---

## Deployment

The site deploys to Vercel on every push to `main`. No manual step required.

To connect a custom domain: Vercel dashboard → Project → Settings → Domains → Add domain.

---

## Quality benchmarks

| Dimension | Target |
|---|---|
| Lighthouse Performance | ≥ 95 (mobile) |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse SEO | ≥ 95 |
| Lighthouse Best Practices | ≥ 95 |
| CLS | < 0.05 |
| LCP | < 1.5s (4G simulated) |
