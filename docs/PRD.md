# PRD — Personal Portfolio

**Owner:** Sk Akash Ali
**Status:** Draft v1
**Last updated:** June 2026

---

## 1. Problem & opportunity

Recruiters and hiring managers for PM / AI-PM roles form a judgment in under a minute, usually after Googling a candidate. A LinkedIn profile and a PDF resume don't show *how someone thinks*. Akash has shipped real AI products and run structured PM work (Campayn pipeline, FreechargeBiz recommendation engine, Backbone), but that work currently lives in scattered repos, drives, and prototype links.

**Opportunity:** a single, fast, credible site that turns scattered artifacts into a coherent narrative of product judgment — and is itself evidence of the ability to ship.

## 2. Goals

**Primary**
- Convert a cold visitor (recruiter / founder) into a warm lead: a reply, a call booking, or a resume download.
- Demonstrate PM reasoning, not just output. Every project answers: what was the problem, what did you believe, what did you build, what happened.

**Secondary**
- Centralize all shipped work under one URL that's easy to put on a resume / LinkedIn.
- Be maintainable: adding a new project is writing one MDX file, not editing code.

### Success metrics
| Metric | Target |
|---|---|
| Time-to-first-meaningful-paint | < 1.5s on 4G |
| Lighthouse (Perf / A11y / SEO / Best practices) | ≥ 95 each |
| Resume downloads + contact submissions | tracked from day one |
| "Add a new case study" effort | < 30 min, no code changes |

## 3. Non-goals (v1)

- No CMS / admin dashboard — content is git-managed MDX.
- No blog at launch (can add later; not selected).
- No auth, comments, or user accounts.
- No e-commerce, payments, or any financial flows.

## 4. Audience & primary journeys

**P0 — PM recruiter / hiring manager.** Lands from LinkedIn or a job application. Wants to verify depth fast. Journey: Home → scans featured case studies → opens one → reads outcome → downloads resume *or* hits contact.

**P1 — Startup founder / hiring lead.** Came from a referral or DM. Wants signal that this person ships. Journey: Home → Projects → a build-heavy case study → contact.

**P2 — Peer / fellow PM.** Curiosity, possible referral. Journey: any entry → About → Uses page.

## 5. Scope — features (v1)

### Must have (P0)
- **Home** — hero with positioning, 3 featured case studies, "also shipped" grid, clear CTAs (view work / contact / resume).
- **Projects index** — all projects, lightweight filter by type/skill.
- **Case study pages** — structured PM narrative template, metadata bar (role, stack, timeframe, outcome), images, links to live/repo, prev/next.
- **About** — short story, what kind of PM, timeline, links.
- **Resume PDF download** — one-click, opens/downloads `resume.pdf`.
- **Uses / tools page** — stack, tools, workflow (signals technical fluency).
- **Contact form** — name, email, message; sends Akash an email; spam-protected; clear success/error states.
- **Light / dark toggle** — persisted, respects system preference.
- **SEO + sharing** — per-page metadata, Open Graph images, sitemap, robots, JSON-LD person schema.
- **Accessible + responsive** — keyboard nav, focus states, mobile-first, reduced-motion respected.

### Should have (P1)
- Subtle, tasteful motion (load reveal, hover micro-interactions).
- Analytics (privacy-friendly).
- Dynamic per-project OG images.

### Could have (later)
- Blog / writing, RSS.
- Project filtering by year, search.
- "Now" page.

## 6. Content model (summary)

Projects split into two tiers (see `CONTENT-SCHEMA.md`):
- **Featured case studies** — deep PM narratives: *Campayn brand-discovery pipeline, FreechargeBiz card recommendation engine, Backbone (ChatGPT calibration layer).*
- **Shipped builds** — compact cards: *Zomato recommender, Groww FAQ chatbot, Groww review analyser*, plus assignments worth surfacing.

## 7. Constraints & assumptions

- Built by Akash in Cursor + Claude Code; must be approachable to maintain solo.
- Free / low-cost hosting (Vercel). Contact email via Resend free tier.
- Contact form must not expose secrets client-side; email sending happens server-side only.
- No collecting sensitive personal data; contact stores nothing server-side beyond sending the email.

## 8. Risks

| Risk | Mitigation |
|---|---|
| Looks like a template | Distinct design direction in `DESIGN.md`; spend boldness on one signature element |
| Case studies read as feature dumps | Enforce problem→hypothesis→build→outcome template |
| Contact form spam | Honeypot + rate limit + server-side validation |
| Scope creep (blog, fancy CMS) | Locked non-goals above |

## 9. Launch definition

Site is live on a custom domain, all P0 features working, Lighthouse ≥ 95 across the board, contact form delivering email, resume downloadable, at least 4 case studies published (the 3 featured + 1 build).
