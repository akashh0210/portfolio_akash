# ARCHITECTURE — Personal Portfolio

A statically-generated Next.js site with one small server surface (the contact endpoint). Content is file-based MDX. Everything is designed so that **adding a project = adding a file**.

---

## 1. Layered model

Six clean layers, each with a single responsibility:

```
┌─────────────────────────────────────────────────────────────┐
│ 6. DELIVERY        Vercel · custom domain · CI · analytics     │
├─────────────────────────────────────────────────────────────┤
│ 5. SERVICE/BACKEND  /api/contact route → Resend (email send)   │  ← only server-side surface
├─────────────────────────────────────────────────────────────┤
│ 4. APPLICATION      Next App Router · RSC · routing · metadata │
├─────────────────────────────────────────────────────────────┤
│ 3. PRESENTATION/UI  components (cards, layouts, nav, theme)    │
├─────────────────────────────────────────────────────────────┤
│ 2. DATA / ACCESS    lib/projects.ts · typed frontmatter        │
├─────────────────────────────────────────────────────────────┤
│ 1. CONTENT          /content/projects/*.mdx + frontmatter      │  ← where 80% of value lives
└─────────────────────────────────────────────────────────────┘
```

**1. Content layer.** One MDX file per project. Frontmatter holds structured metadata (title, role, stack, outcome, links, tier, order); the MDX body holds the narrative. Schema in `CONTENT-SCHEMA.md`. No code touches content; no content touches code.

**2. Data / access layer.** A small typed module (`lib/projects.ts`) reads MDX files, validates frontmatter against a Zod schema, and exposes pure functions: `getAllProjects()`, `getFeaturedProjects()`, `getProjectBySlug(slug)`, `getAdjacentProjects(slug)`. Components never read the filesystem directly.

**3. Presentation / UI layer.** Dumb, reusable components driven by props: `ProjectCard`, `CaseStudyLayout`, `MetadataBar`, `Hero`, `Nav`, `Footer`, `ThemeToggle`, `ContactForm`, plus shadcn primitives in `components/ui/`. Styling via Tailwind + design tokens.

**4. Application / framework layer.** Next.js App Router owns routing, React Server Components (data fetching at build time), the Metadata API, sitemap/robots, and static generation. Pages compose layer-3 components with layer-2 data.

**5. Service / backend layer.** The *only* dynamic surface: `app/api/contact/route.ts` (or a Server Action). Validates input (Zod), checks honeypot + rate limit, calls Resend to email Akash. Secrets live in env, server-only. Never trust client input; never echo secrets.

**6. Delivery layer.** Vercel builds and hosts; git push = deploy. Custom domain, privacy-friendly analytics, edge caching of static pages.

## 2. Rendering strategy

- **Static by default.** Home, About, Uses, Projects index, and every case study are statically generated at build time via `generateStaticParams`. Fast, cacheable, great SEO.
- **Dynamic only for contact.** The contact endpoint runs server-side per request.
- **Images** optimized via `next/image`. Per-project OG images generated with `next/og` (Phase 7).

## 3. Data flow

**Reading a case study (build time):**
```
content/projects/campayn.mdx
  → lib/projects.ts (read + Zod-validate frontmatter)
  → app/projects/[slug]/page.tsx (generateStaticParams + page)
  → CaseStudyLayout + MetadataBar + MDX body (mdx-components)
  → static HTML at /projects/campayn
```

**Submitting the contact form (runtime):**
```
ContactForm (client) — validates, honeypot, disables on submit
  → POST /api/contact
  → route handler: Zod validate → rate-limit check → Resend.send()
  → 200 {ok} | 4xx {error}  → UI shows success / inline error
```

## 4. Folder structure

```
portfolio/
├── app/
│   ├── layout.tsx                 # root: fonts, theme provider, nav, footer
│   ├── page.tsx                   # Home
│   ├── about/page.tsx
│   ├── uses/page.tsx
│   ├── projects/
│   │   ├── page.tsx               # index + filter
│   │   └── [slug]/page.tsx        # case study (static)
│   ├── api/contact/route.ts       # contact email endpoint
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── opengraph-image.tsx        # default OG
│   └── globals.css                # tokens + base
├── components/
│   ├── ui/                        # shadcn primitives
│   ├── nav.tsx  footer.tsx  theme-toggle.tsx  theme-provider.tsx
│   ├── hero.tsx  project-card.tsx  case-study-layout.tsx
│   ├── metadata-bar.tsx  contact-form.tsx
│   └── mdx-components.tsx          # how MDX elements render
├── content/
│   └── projects/
│       ├── campayn-pipeline.mdx
│       ├── freecharge-cardmatch.mdx
│       ├── backbone.mdx
│       └── ...builds.mdx
├── lib/
│   ├── projects.ts                # data access (read + validate + query)
│   ├── schema.ts                  # Zod frontmatter schema + TS types
│   ├── rate-limit.ts              # contact rate limiting
│   └── utils.ts                   # cn(), formatters
├── public/
│   ├── resume.pdf
│   ├── images/projects/...
│   └── favicon / icons
├── .env.local                     # RESEND_API_KEY, CONTACT_TO, etc. (gitignored)
├── CLAUDE.md
└── config files (next.config, tailwind, tsconfig, eslint, prettier)
```

## 5. Key design decisions (and why)

| Decision | Why | Alternative rejected |
|---|---|---|
| File-based MDX content | Zero infra, git history = content history, easy to maintain solo | Headless CMS (overkill, cost, another service) |
| Zod-validated frontmatter | Catches a malformed project at build, not in prod | Trust frontmatter blindly (silent breakage) |
| Static generation | Speed + SEO + free hosting | SSR everything (slower, needless) |
| Single backend route | Minimize attack surface and complexity | Full API / DB (no need) |
| Resend for email | Simple, generous free tier, no SMTP wrangling | Self-host SMTP / Nodemailer (fragile) |
| `next-themes` for dark mode | Handles SSR flash, system pref, persistence | Hand-rolled (flash-of-wrong-theme bugs) |

## 6. Security & privacy posture

- All secrets server-side only (env), never shipped to client.
- Contact endpoint: server-side Zod validation, honeypot field, IP-based rate limit, no persistence beyond the outbound email.
- No analytics that fingerprint users; cookieless if possible.
- No personal/sensitive data in URLs or query strings.
- `resume.pdf` is intentionally public (it's a resume) — no other private assets in `public/`.

## 7. Extensibility hooks (post-v1)

- Add a `content/posts/*.mdx` collection + `/blog` route → reuse the same data-access pattern.
- Add `type`-based search/filter on the projects index.
- Swap the provisional design tokens for the reference-driven ones without touching components (tokens are centralized).
