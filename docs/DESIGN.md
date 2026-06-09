# DESIGN — Personal Portfolio

> **Direction locked** against the reference `manav-portfolio-jade.vercel.app` — matching its *spirit*, not copying it. Tokens are centralized so palette/type can shift without touching components.

The brief: a PM who actually ships AI products. The site is **editorial and metric-forward** — confident two-line statements, generous whitespace, and every project led by a single hard outcome number. Personality lives in typography, the metric treatment, and structural labels, not in ornament.

---

## 1. Concept

**"Receipts."** A PM's claims, each backed by one number. Calm near-monochrome canvas; the boldness is spent entirely on the **outcome metric** per project (e.g. a north-star %, a latency, a scale figure). Everything else stays quiet and disciplined.

Avoids the three default AI looks (cream+serif+terracotta; black+acid-green; broadsheet hairlines): this is closer to a clean editorial spread than any of them.

## 2. Color tokens

CSS variables in `globals.css`, themed light/dark. Semantic names so values can be retuned freely.

```
LIGHT
--bg            #FBFBF9   warm off-white (not cream)
--surface       #FFFFFF
--text          #16161A   near-black ink
--text-muted    #6B6B72
--border        #E6E6E1
--accent        #2F4858   deep slate-blue, used only for affordances
--accent-weak   #EEF1F2
--metric        #16161A   metrics read in ink, emphasis via size/weight not hue

DARK
--bg            #0C0C0E
--surface       #141417
--text          #F7F7F5
--text-muted    #9B9BA3
--border        #232327
--accent        #8FB0C4   lifted slate for dark
--accent-weak   #16202A
--metric        #F7F7F5
```

Accent is reserved for links, active nav, arrows (`→`), and focus rings. Metrics get their weight from **scale and typeface**, not color — keeps the page calm and the numbers monumental.

## 3. Typography

Three roles, chosen to feel editorial and precise.

| Role | Face (provisional) | Use |
|---|---|---|
| Display | **General Sans** or **Hanken Grotesk** | Two-line hero, page titles, section heads, big metric numbers. Tight tracking, heavy weights. |
| Body | **Inter** | Paragraphs, UI, card descriptions. |
| Mono / label | **Geist Mono** or **JetBrains Mono** | Uppercase eyebrows, status chips, stack chips, small data. The technical signal. |

Type scale (rem; hero fluid via `clamp()`):
```
hero      clamp(2.6, 7vw, 4.6)   weight 600–700, tracking -0.02em, two lines
metric    clamp(2.0, 4vw, 3.0)   the card's headline number
h1 2.2  h2 1.6  h3 1.25
body 1.0 (line-height 1.65)   small 0.875
eyebrow 0.72  uppercase  tracking 0.12em  (mono)
```
Load via `next/font` (self-hosted, `display: swap`, Latin subset).

## 4. Layout

- **Container:** ~720px for reading (case studies); ~1080px for home/index.
- **Home rhythm** (mirrors the reference's flow):
  1. Eyebrow availability line → two-line hero → one-line positioning → two CTAs.
  2. `WHAT I DO` triad (three labeled columns: e.g. SHIP / WRITE / RESEARCH).
  3. `FEATURED` → "Selected work" → metric-forward cards → "View all →".
  4. `CURRENTLY BUILDING` band (one in-progress project).
  5. Minimal footer: tagline + LinkedIn / GitHub / Email.
- **Spacing scale:** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128.
- **Radius:** small (6–8px). **Mobile-first:** 360 / 768 / 1280.

ASCII — work card (the signature):
```
┌───────────────────────────────────────────┐
│ [Shipped] [AI] [RAG]            (status/tags│ ← mono chips
│ Project title                               │
│ One-sentence problem→fix, plain language.   │
│                                             │
│   91%            ← the metric (display)      │ ← bold outcome number
│   calibrated answer rate   (mono label)     │
│                                  Read →      │
└───────────────────────────────────────────┘
```

ASCII — case study page:
```
EYEBROW (mono)
Big display title
one-line thesis / outcome
[Shipped] [AI] [RAG]      role · stack · timeframe   (mono meta line)
─────────────────────────────────────────────
## Problem  ## Hypothesis  ## What I built  ## Outcome & learning
← prev project                       next project →
```

## 5. Signature element

**The outcome metric.** Each project card and case-study header leads with one large number + a mono caption (e.g. `60s` / "review-to-pulse time", `2,916` / "indexed chunks", `91%` / "calibrated answer rate"). It's the one monumental, brand-defining device; everything else is quiet. This is what a PM portfolio should foreground — results, not features.

## 6. Motion (restrained)

- Hero: one staggered fade/translate-up on load.
- Cards: gentle lift on hover (`translateY(-2px)`, soft shadow), 150ms.
- Arrows (`→`) nudge right ~2px on hover.
- Theme toggle: smooth color transition, no bounce.
- All gated behind `prefers-reduced-motion`. Less is more.

## 7. Components to style

`Nav` (minimal: wordmark + Work/About, active in accent) · `Footer` (tagline + social, mirrors reference) · `ThemeToggle` · `Hero` (two-line) · `WhatIDo` (triad) · `ProjectCard` (chips + title + one-liner + metric + Read →) · `CurrentlyBuilding` band · `CaseStudyLayout` · `MetricBlock` (signature) · `ContactForm` · `Prose` (MDX).

## 8. Copy voice (from the design)

Plain, active, specific, confident — like the reference's "AI products that move metrics", "PRDs people read", "Signal over noise". No buzzwords, no "Hope you're doing well", no em dashes in UI. Buttons name the action ("Send message", "Download resume"). Errors give direction, not mood. The hero is one honest claim, no fluff — consistent with how Akash writes.

## 9. What we deliberately differ on (so it's not a copy)

- Our signature framing is **"Receipts"** (claim → number), our own palette (warm off-white + deep slate accent, not the reference's), and our own hero wording.
- Keep the featured (deep) vs build (compact grid) split — the reference flattens these; we don't.
- Section labels and triad wording will be Akash-specific, not SHIP/WRITE/RESEARCH verbatim.
