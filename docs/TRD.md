# TRD — Personal Portfolio

Technical spec: stack, dependencies, environment, contracts, and the quality budgets each phase is held to. Pin exact versions at `init` time (`npx create-next-app@latest`) and record them here once locked.

---

## 1. Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 16.2.7 (App Router)** | Initialized 2026-06-09. RSC + static generation. |
| Language | **TypeScript 5.x** (strict) | `strict: true`, no implicit any. |
| UI runtime | **React 19.2.4** | Bundled with Next.js 16. |
| Styling | **Tailwind CSS 4.x** | CSS-variable config (`@theme inline`); no separate `tailwind.config.ts`. |
| Components | **shadcn 4.11.0** | Tailwind v4 + Base UI variant; copy-in components you own. |
| Content | **MDX** | `next-mdx-remote/rsc` for rendering + `gray-matter` for frontmatter. (Optional upgrade: `content-collections` for typed content.) |
| Validation | **Zod** | Frontmatter schema + contact payload. |
| Theming | **next-themes** | Light/dark, system default, no flash. |
| Icons | **lucide-react** | |
| Motion | **motion** (Framer Motion) | Optional, Phase 8; respect `prefers-reduced-motion`. |
| Fonts | **next/font** | Self-hosted, no layout shift. See `DESIGN.md`. |
| Email | **Resend** + **react-email** (optional) | Server-side send only. |
| Analytics | **Vercel Analytics** or **Plausible** | Privacy-friendly, cookieless. |
| Hosting/CI | **Vercel** | Git push → deploy. |
| Lint/format | **ESLint** + **Prettier** | + `prettier-plugin-tailwindcss`. |

> **Phase 0 locked:** Next.js 16.2.7 · React 19.2.4 · Tailwind 4.x · shadcn 4.11.0 · next-themes 0.4.6 · Prettier 3.x · prettier-plugin-tailwindcss 0.8.x. shadcn confirmed compatible with Tailwind v4.

## 2. Dependencies (indicative)

**Runtime:** `next`, `react`, `react-dom`, `next-mdx-remote`, `gray-matter`, `zod`, `next-themes`, `lucide-react`, `clsx`, `tailwind-merge`, `resend`.
**Dev:** `typescript`, `tailwindcss`, `postcss`, `autoprefixer`, `eslint`, `eslint-config-next`, `prettier`, `prettier-plugin-tailwindcss`, `@types/*`.
**Optional:** `motion`, `@vercel/analytics`, `react-email`, `content-collections`.

Pin versions in `package.json`; commit the lockfile.

## 3. Environment variables

| Var | Where | Purpose |
|---|---|---|
| `RESEND_API_KEY` | Vercel (server) + `.env.local` | Auth to Resend. **Never** exposed to client / `NEXT_PUBLIC_`. |
| `CONTACT_TO_EMAIL` | server | Inbox that receives contact messages (e.g. `akash102502@gmail.com`). |
| `CONTACT_FROM_EMAIL` | server | Verified Resend sender/domain. |
| `NEXT_PUBLIC_SITE_URL` | build | Canonical URL for metadata, sitemap, OG. |
| `NEXT_PUBLIC_ANALYTICS_*` | client | Only if a non-Vercel analytics tool is used. |

> **Akash provides these.** You'll create the Resend account, verify a sender domain, and paste keys into Vercel's env settings yourself. I will not enter credentials anywhere on your behalf.

`.env.local` is gitignored. Document the full list in `.env.example` (no values).

## 4. Contracts

### 4.1 Contact endpoint — `POST /api/contact`

Request body (JSON):
```ts
{
  name: string;      // 2–80 chars
  email: string;     // valid email
  message: string;   // 10–2000 chars
  company?: string;  // HONEYPOT — must be empty; if filled → silently 200, no send
}
```
Responses:
```
200 { ok: true }
400 { ok: false, error: "validation", issues: [...] }
429 { ok: false, error: "rate_limited" }
500 { ok: false, error: "send_failed" }
```
Rules:
- Validate with Zod server-side regardless of client validation.
- Honeypot `company` filled → treat as bot, return 200 without sending.
- Rate limit: max 3 submissions / IP / 10 min.
- No persistence; the only side effect is the Resend email.
- Never include secrets in responses or logs.

### 4.2 Project data — `lib/projects.ts`

```ts
getAllProjects(): Project[]                       // sorted by tier then order
getFeaturedProjects(): Project[]                  // tier === "featured"
getProjectBySlug(slug: string): Project | null
getAdjacentProjects(slug): { prev, next }
```
`Project` type is derived from the Zod schema in `lib/schema.ts` (see `CONTENT-SCHEMA.md`). A build **fails loudly** if any MDX frontmatter is invalid.

## 5. Quality budgets (enforced per phase)

| Dimension | Budget |
|---|---|
| Lighthouse Performance | ≥ 95 mobile |
| Lighthouse A11y / SEO / Best practices | ≥ 95 each |
| LCP | < 1.5s on simulated 4G |
| CLS | < 0.05 |
| Total JS on home (gzip) | keep lean; lazy-load motion |
| Images | `next/image`, correct sizes, AVIF/WebP |
| Fonts | `next/font`, `display: swap`, subset |

## 6. Accessibility requirements

- Semantic landmarks (`header`, `nav`, `main`, `footer`); one `h1` per page.
- Visible keyboard focus on every interactive element.
- Color contrast ≥ WCAG AA in both themes.
- All images have meaningful `alt`; decorative images `alt=""`.
- Form fields have associated `<label>`; errors announced (`aria-live`).
- `prefers-reduced-motion` disables non-essential animation.
- Theme toggle reachable and labeled.

## 7. SEO requirements

- Per-page `metadata` (title, description, canonical).
- Open Graph + Twitter card per page; dynamic OG image per project (Phase 7).
- `app/sitemap.ts` and `app/robots.ts` generated.
- JSON-LD `Person` schema on Home/About.
- Clean, human-readable slugs (`/projects/campayn-pipeline`).

## 8. Browser & device support

Modern evergreen browsers (last 2 versions of Chrome, Safari, Firefox, Edge) + mobile Safari/Chrome. Mobile-first; verified at 360px, 768px, 1280px.

## 9. Tooling conventions

- Path alias `@/*` → project root.
- `cn()` utility (`clsx` + `tailwind-merge`) for class composition.
- Components: PascalCase files in `components/`; one component per file.
- No business logic in components — query through `lib/`.
- Commit style: conventional-ish (`feat:`, `fix:`, `chore:`), small PRs per phase.

## 10. Definition of done (global)

A phase is done when: acceptance criteria in `ROADMAP.md` pass, no TypeScript or lint errors, the relevant quality budgets hold, and it deploys cleanly to a Vercel preview.
