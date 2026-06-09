# CLAUDE.md

Standing context for Claude Code in Cursor. Read this before acting. Keep it at the repo root.

## What this is

Personal portfolio for Sk Akash Ali (AI PM / builder). Static Next.js site, file-based MDX content, one server route for the contact form. Goal: show PM judgment via case studies framed as **problem → hypothesis → build → outcome**, and act as proof-of-work itself.

Full specs live in `/docs`: `PRD.md`, `ARCHITECTURE.md`, `TRD.md`, `DESIGN.md`, `CONTENT-SCHEMA.md`, `ROADMAP.md`. When a request is ambiguous, those win.

## Stack

Next.js App Router · TypeScript (strict) · Tailwind · shadcn/ui · MDX (`next-mdx-remote` + `gray-matter`) · Zod · next-themes · Resend (contact) · Vercel. Versions pinned in `package.json` / `TRD.md`.

## Architecture in one breath

Six layers: Content (MDX) → Data access (`lib/projects.ts`, Zod-validated) → UI components → Next app/routing → contact backend (`app/api/contact`) → Vercel. Components never read the filesystem; query through `lib/`.

## Conventions

- Static generation by default; the only dynamic surface is `/api/contact`.
- Path alias `@/*`. Use `cn()` for classes. One component per PascalCase file in `components/`.
- Colors/spacing/type come from tokens in `globals.css` / Tailwind config — never hardcode hex in components.
- No business logic in components.
- A11y is non-negotiable: semantic landmarks, one `h1`/page, visible focus, AA contrast, labeled inputs, `prefers-reduced-motion` respected.
- No HTML `<form>` element gimmicks in React — wire `onClick`/`onChange` handlers.

## Content rules

- One MDX file per project in `content/projects/<slug>.mdx`; frontmatter must satisfy the Zod schema (`lib/schema.ts`) or the build fails.
- Two tiers: `featured` (deep narratives — Campayn pipeline, FreechargeBiz cardmatch, Backbone) and `build` (compact cards — Zomato, Groww x2, etc.).
- Body always follows: `## Problem` / `## Hypothesis` / `## What I built` / `## Outcome & learning`.

## Copy voice

Plain, active, specific. No buzzwords, no "Hope you're doing well", no em dashes in UI copy. Buttons name the action ("Send message", "Download resume"). Errors give direction, not mood.

## Security / privacy (hard rules)

- Secrets are server-only env vars; never `NEXT_PUBLIC_` them, never ship to client, never log them.
- Contact endpoint: server-side Zod validation + honeypot + IP rate limit; no persistence beyond the outbound email.
- Do **not** ask the user to paste API keys into chat or commit them. Leave env names in `.env.example`; the user adds real values in Vercel + `.env.local` themselves.
- No sensitive data in URLs/query strings.

## Build / run

```bash
npm run dev      # local
npm run build    # must pass clean before any phase is "done"
npm run lint
```

## How to work

Follow `ROADMAP.md` one phase at a time. Don't jump ahead. A phase is done only when its acceptance criteria pass, build + lint are clean, and a Vercel preview deploys. Commit per phase (`feat(phaseN): ...`).
