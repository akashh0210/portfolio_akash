# ROADMAP — Phase-by-Phase Build

Build one phase at a time, top to bottom. Each phase has: **Goal · Scope · Tasks · Files touched · Acceptance criteria · Claude Code starter prompt.** Don't move on until the acceptance criteria pass and a Vercel preview deploys clean.

> Workflow: paste the starter prompt into Claude Code in Cursor, iterate until acceptance passes, commit (`feat(phaseN): ...`), open a preview deploy, then ping me to deep-dive the next phase.

---

## Phase 0 — Foundation & tooling
**Goal:** A live, deployable skeleton. Nothing visual yet beyond a blank themed page.

**Scope:** Project init, TypeScript strict, Tailwind, shadcn, lint/format, theme provider, base layout, repo, first Vercel deploy.

**Tasks**
1. `npx create-next-app@latest` (App Router, TS, Tailwind, `@/*` alias, ESLint).
2. Pin versions; commit lockfile. Record versions in `TRD.md` §1.
3. Init shadcn/ui; add `button`, `input`, `textarea`, `label`, `sonner` (toasts).
4. Add Prettier + `prettier-plugin-tailwindcss`; configure ESLint.
5. Install `next-themes`; add `ThemeProvider` + minimal root `layout.tsx`.
6. Add `lib/utils.ts` (`cn`). Set up path alias.
7. `git init`, push to GitHub (`akashh0210`), import to Vercel, deploy.

**Files:** `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `components/theme-provider.tsx`, `components/ui/*`, config files, `.env.example`.

**Acceptance**
- [ ] `npm run build` and `npm run lint` pass with zero errors.
- [ ] Site deploys to a Vercel URL.
- [ ] No theme flash on load (system default respected).

**Starter prompt**
> "Initialize a Next.js App Router + TypeScript (strict) + Tailwind portfolio per ARCHITECTURE.md and TRD.md. Set up shadcn/ui (button, input, textarea, label, sonner), Prettier with the tailwind plugin, the `@/*` alias, and a `cn` util. Add next-themes with a ThemeProvider in a minimal root layout and a placeholder home page. No content or styling yet beyond the token scaffold. Then give me the exact git + Vercel deploy steps."

---

## Phase 1 — Design system & layout shell
**Goal:** Every route renders inside a themed shell (nav + footer + theme toggle) using the tokens in `DESIGN.md`.

**Scope:** Color tokens (light/dark), fonts via `next/font`, type scale, container, `Nav`, `Footer`, `ThemeToggle`.

**Tasks**
1. Define CSS variables (DESIGN §2) in `globals.css` for both themes.
2. Load display / body / mono fonts via `next/font`; wire Tailwind to them.
3. Encode the type scale + spacing scale in Tailwind config.
4. Build `Nav` (sticky, active state in accent), `Footer`, `ThemeToggle`.
5. Put nav/footer in root layout; add a `Container` primitive.

**Files:** `app/globals.css`, `tailwind.config`, `app/layout.tsx`, `components/nav.tsx`, `components/footer.tsx`, `components/theme-toggle.tsx`, `components/container.tsx`.

**Acceptance**
- [ ] Toggling theme switches all tokens with no flash; choice persists.
- [ ] Nav + footer appear on every route; active link styled.
- [ ] Type + spacing match DESIGN; AA contrast in both themes.
- [ ] Keyboard focus visible on nav links and toggle.

**Starter prompt**
> "Implement the design system from DESIGN.md: CSS variables for light/dark, fonts via next/font (display/body/mono), the type and spacing scales in the Tailwind config. Build Nav (sticky, accent active state), Footer, ThemeToggle, and a Container, and mount them in the root layout. Hold to WCAG AA and visible focus states."

---

## Phase 2 — Content engine
**Goal:** A single sample case study renders end-to-end from an MDX file.

**Scope:** MDX pipeline, Zod frontmatter schema + types, `lib/projects.ts` data access, `mdx-components`.

**Tasks**
1. Install `next-mdx-remote`, `gray-matter`, `zod`.
2. Write `lib/schema.ts` (CONTENT-SCHEMA §2) → infer `Project` type.
3. Write `lib/projects.ts`: read `content/projects/*.mdx`, validate, expose `getAllProjects/getFeatured/getBySlug/getAdjacent`. Fail build on invalid frontmatter.
4. Write `components/mdx-components.tsx` (styled prose, `<Img>`, section headers).
5. Add one real sample: `content/projects/campayn-pipeline.mdx`.
6. Temporary `app/projects/[slug]/page.tsx` with `generateStaticParams` to prove rendering.

**Files:** `lib/schema.ts`, `lib/projects.ts`, `components/mdx-components.tsx`, `content/projects/campayn-pipeline.mdx`, `app/projects/[slug]/page.tsx`.

**Acceptance**
- [ ] `/projects/campayn-pipeline` renders MDX with styled prose.
- [ ] Invalid frontmatter fails the build with a clear message.
- [ ] `getAllProjects()` returns typed, sorted data.

**Starter prompt**
> "Build the content engine from ARCHITECTURE.md + CONTENT-SCHEMA.md: a Zod frontmatter schema and inferred Project type in lib/schema.ts, a lib/projects.ts data-access module (read + validate + query, build fails on invalid frontmatter), and styled MDX components. Add one sample MDX case study and a static [slug] route that renders it."

---

## Phase 3 — Home + Projects index
**Goal:** A visitor can land, understand the positioning, and browse all work.

**Scope:** `Hero` (two-line), `WhatIDo` triad, featured metric-forward cards, "also shipped" grid, `CurrentlyBuilding` band, projects index with light filter.

**Tasks**
1. `Hero` — availability eyebrow, two-line statement, one-line positioning, CTAs (view work / contact / resume).
2. `WhatIDo` — three labeled columns (Akash-specific, e.g. SHIP / WRITE / RESEARCH equivalents).
3. `ProjectCard` (status + tags chips, title, one-liner, **metric block**, Read →) + featured section from `getFeaturedProjects()`.
4. "Also shipped" build grid + optional `CurrentlyBuilding` band.
5. `app/projects/page.tsx` — all projects, simple type/tag filter.

**Files:** `app/page.tsx`, `components/hero.tsx`, `components/what-i-do.tsx`, `components/project-card.tsx`, `components/metric-block.tsx`, `components/currently-building.tsx`, `app/projects/page.tsx`.

**Acceptance**
- [ ] Home shows hero + triad + 3 featured (each with a metric) + build grid, all from content.
- [ ] Projects index lists everything; filter works without full reload.
- [ ] Cards are keyboard-navigable; layout holds at 360/768/1280.

**Starter prompt**
> "Build the Home page per DESIGN.md (two-line Hero with CTAs, WhatIDo triad, FEATURED metric-forward cards, also-shipped grid, optional CurrentlyBuilding band) and the Projects index with a lightweight client filter, using lib/projects.ts. Create a reusable ProjectCard and the signature MetricBlock (big number + mono label)."

---

## Phase 4 — Case study pages (deep)
**Goal:** Every case study renders in the full PM-narrative layout with the signature metadata bar.

**Scope:** `CaseStudyLayout`, `MetadataBar` (signature), prev/next, images, and migrating all real content.

**Tasks**
1. `CaseStudyLayout` — eyebrow, title, thesis, `MetadataBar`, prose, prev/next.
2. `MetadataBar` — Role · Stack · Timeframe · Outcome (DESIGN §5).
3. Wire `getAdjacentProjects` for prev/next.
4. Author the 3 featured + the build write-ups (CONTENT-SCHEMA §4); add images.

**Files:** `components/case-study-layout.tsx`, `components/metadata-bar.tsx`, `app/projects/[slug]/page.tsx` (final), `content/projects/*.mdx`, `public/images/projects/*`.

**Acceptance**
- [ ] All listed case studies live, each with metadata bar + prev/next.
- [ ] Narrative sections (problem→hypothesis→build→outcome) render consistently.
- [ ] Per-page metadata (title/description) set from frontmatter.

**Starter prompt**
> "Build CaseStudyLayout and the signature MetadataBar from DESIGN.md, wire prev/next via getAdjacentProjects, and finalize the [slug] route. Then scaffold MDX files for the three featured case studies and the shipped builds per CONTENT-SCHEMA.md (I'll fill final copy)."

---

## Phase 5 — About + Uses + Resume
**Goal:** Secondary pages complete; resume downloadable.

**Scope:** About (story, timeline, links), Uses (stack/tools/workflow), resume download.

**Tasks**
1. `app/about/page.tsx` — short story, what kind of PM, timeline, links (GitHub, LinkedIn, email).
2. `app/uses/page.tsx` — tools & workflow (signals technical fluency).
3. Place `public/resume.pdf`; add a "Download resume" action in nav/footer/hero.

**Files:** `app/about/page.tsx`, `app/uses/page.tsx`, `public/resume.pdf`.

**Acceptance**
- [ ] About + Uses render with correct metadata and theming.
- [ ] Resume opens/downloads in one click from at least two places.

**Starter prompt**
> "Build the About and Uses pages per PRD.md (About: story + timeline + links; Uses: stack, tools, workflow). Add a Download Resume action wired to /resume.pdf in the hero and footer."

---

## Phase 6 — Contact form + backend
**Goal:** A working, spam-resistant contact form that emails Akash.

**Scope:** `ContactForm` UI + states, Zod validation, honeypot, rate limit, Resend route handler.

**Tasks**
1. `ContactForm` (client) — name/email/message + hidden honeypot; inline validation; disabled-on-submit; success + error states (no HTML `<form>` quirks — use handlers).
2. `app/api/contact/route.ts` — Zod validate, honeypot check, rate limit (`lib/rate-limit.ts`), `resend.emails.send()`. Contract in TRD §4.1.
3. Env wiring (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`).

> **You** create the Resend account, verify the sender domain, and add the keys to Vercel + `.env.local`. I won't enter credentials for you.

**Files:** `components/contact-form.tsx`, `app/api/contact/route.ts`, `lib/rate-limit.ts`, `.env.example`.

**Acceptance**
- [ ] Valid submit → you receive the email; UI shows success.
- [ ] Invalid input → inline errors, no send. Honeypot filled → silent 200.
- [ ] >3 rapid submits from one IP → 429.
- [ ] No secret ever reaches the client bundle.

**Starter prompt**
> "Build the contact flow per TRD.md §4.1 and ARCHITECTURE.md: a client ContactForm with inline validation, honeypot, submit states, and toasts; and a POST /api/contact route handler that Zod-validates, checks the honeypot, rate-limits by IP, and sends via Resend. Use env vars only server-side; add a .env.example. Don't ask me for keys — just leave the env names."

---

## Phase 7 — SEO, OG, performance, a11y
**Goal:** Discoverable, shareable, fast, accessible.

**Scope:** Metadata, sitemap, robots, JSON-LD, dynamic OG images, Lighthouse + a11y pass.

**Tasks**
1. Per-page `metadata`; canonical URLs from `NEXT_PUBLIC_SITE_URL`.
2. `app/sitemap.ts`, `app/robots.ts`.
3. JSON-LD `Person` on Home/About.
4. Dynamic per-project OG images via `next/og`.
5. Lighthouse pass to budgets (TRD §5); fix CLS/LCP; verify image sizing.
6. A11y audit (TRD §6): focus order, labels, contrast, reduced motion.

**Files:** `app/sitemap.ts`, `app/robots.ts`, `app/projects/[slug]/opengraph-image.tsx`, metadata across pages.

**Acceptance**
- [ ] Lighthouse ≥ 95 Perf/A11y/SEO/Best-practices on mobile.
- [ ] Sharing any URL shows a correct OG card.
- [ ] Sitemap + robots valid; JSON-LD validates.

**Starter prompt**
> "Add full SEO per TRD.md: per-page metadata + canonicals, app/sitemap.ts, app/robots.ts, Person JSON-LD, and dynamic per-project OG images via next/og. Then run a Lighthouse + accessibility pass against the budgets in TRD §5–6 and fix issues."

---

## Phase 8 — Polish, analytics, launch
**Goal:** Ship it.

**Scope:** Motion, 404, analytics, custom domain, final QA.

**Tasks**
1. Restrained motion (DESIGN §6), gated by `prefers-reduced-motion`.
2. Custom `not-found.tsx`.
3. Analytics (Vercel Analytics or Plausible).
4. Connect custom domain in Vercel; verify HTTPS + redirects.
5. Final QA: cross-device, broken links, meta, form delivery.

**Files:** `app/not-found.tsx`, motion touches, analytics setup.

**Acceptance**
- [ ] Custom domain live over HTTPS.
- [ ] Analytics recording; contact + resume tracked.
- [ ] Launch checklist (PRD §9) fully green.

**Starter prompt**
> "Final polish: add restrained motion (reduced-motion aware) per DESIGN §6, a custom 404, and privacy-friendly analytics. Walk me through connecting a custom domain in Vercel and run a final QA checklist against PRD §9."

---

## Phase dependency order

```
0 → 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8
        └─ 2 unblocks 3 & 4 (content engine before pages that use it)
```
6 (contact) and 5 (secondary pages) are independent of each other and can swap order. 7 should come after content exists. 8 is last.
