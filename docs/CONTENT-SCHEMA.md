# CONTENT-SCHEMA — Projects & Case Studies

How content is structured so that **adding a project = adding one MDX file**, validated at build time.

---

## 1. File location & naming

```
content/projects/<slug>.mdx
```
The filename (minus `.mdx`) is the URL slug → `/projects/<slug>`. Use kebab-case, stable, human-readable.

## 2. Frontmatter schema

Every MDX file starts with YAML frontmatter validated by Zod (`lib/schema.ts`). Build fails if invalid.

```yaml
---
title: "Campayn — Automated Brand Discovery Pipeline"
slug: "campayn-pipeline"            # optional; defaults to filename
tier: "featured"                     # "featured" | "build"
order: 1                             # sort within tier (asc)
status: "Shipped"                    # "Shipped" | "PRD" | "Case study" | "Building"  (chip)
summary: "An end-to-end system that finds, qualifies, and reaches out to D2C brands automatically."
role: "AI PM · builder"
timeframe: "Jun 2026"
stack: ["Python", "Claude", "Lovable", "Cursor"]
tags: ["automation", "pipelines", "growth", "outreach"]
metric:                              # THE SIGNATURE — one headline outcome number
  value: "v1.4"                      #   short, bold (e.g. "91%", "60s", "2,916")
  label: "qualified-brand pipeline shipped"   # mono caption under it
outcome: "Shipped v1.4; expanded the qualified-brand pool and a compliance-checked outreach UI."
cover: "/images/projects/campayn-cover.png"   # optional
links:
  live: "https://campayn-piper.lovable.app"    # optional
  repo: ""                                       # optional (private repos: omit or note 'private')
  writeup: ""                                    # optional external link
featured_order: 1                    # optional; position on home if tier=featured
draft: false                         # true = excluded from build output
---
```

### Field rules
| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | ✅ | Display title |
| `tier` | `"featured" \| "build"` | ✅ | Drives where it appears |
| `status` | `"Shipped" \| "PRD" \| "Case study" \| "Building"` | ✅ | Chip on cards/header |
| `order` | number | ✅ | Sort within tier |
| `summary` | string (≤160) | ✅ | Card + meta description |
| `role` | string | ✅ | Your role |
| `timeframe` | string | ✅ | e.g. "May–Jun 2026" |
| `stack` | string[] | ✅ | Tech/tools (chips) |
| `tags` | string[] | ⬜ | For future filtering |
| `metric.value` | string | ✅ | **Signature** — short bold number ("91%", "60s", "2,916") |
| `metric.label` | string | ✅ | Mono caption under the metric |
| `outcome` | string | ✅ | One-line result (case-study header) |
| `cover` | string | ⬜ | Path under `/public` |
| `links.live/repo/writeup` | string | ⬜ | Omit if none; never link a private repo publicly without labeling it |
| `featured_order` | number | ⬜ | Home ordering for featured |
| `draft` | boolean | ⬜ | Default false |

## 3. Body template (the PM narrative)

The MDX body should follow the same arc every time. Custom MDX components (Phase 2) make these section headers consistent.

```mdx
## Problem
What was broken or missing, for whom, and why it mattered. Concrete, not abstract.

## Hypothesis
What you believed would move the needle, and the bet you were making.

## What I built
The actual solution. Architecture, key decisions, tradeoffs. Screenshots / diagrams here.

## Outcome & learning
What happened, what you'd measure, what you'd do differently. Honesty reads as senior.
```

Optional extra sections per project: `## Constraints`, `## Why this approach`, `## Next`.

## 4. Featured vs. build (proposed)

**Featured case studies** (deep narratives, on Home). Each needs one headline **metric**:
1. **Campayn — Automated Brand Discovery Pipeline** — end-to-end discovery → qualification → compliance-checked outreach. *Metric idea:* article-pool size, brands qualified, or `v1.4`. Pick a real number.
2. **FreechargeBiz — AI Card Recommendation Engine** — PRD, RICE/MoSCoW, live prototype; thesis "AI explains the recommendation; it never makes it." *Metric idea:* `5-layer` engine, or a prioritized-stories count.
3. **Backbone — Calibration layer for ChatGPT** — surfaces reasoning, confidence, self-critique via two-pass LLM. *Metric idea:* a Calibrated Answer Rate `%` (your north-star metric).

**Shipped builds** (compact cards):
- Zomato restaurant recommendation system (Next.js, FastAPI, Groq)
- Groww mutual-fund FAQ chatbot (RAG, ChromaDB, Llama)
- Groww app-review insights analyser (TypeScript, FastAPI, Groq, Streamlit, MCP)
- (Optional) Subspace.money teardown, Lytmus AI case study — if you want analysis pieces shown.

> Confirm or reorder this list — it's the only content decision blocking Phase 4.

## 5. Images

- Store under `public/images/projects/<slug>/`.
- Reference in MDX with the custom `<Img>` component (wraps `next/image`) for sizing + alt.
- Every image needs meaningful `alt`. Compress before commit.

## 6. Adding a new project (the whole process)

1. Create `content/projects/<slug>.mdx`.
2. Fill frontmatter (schema above) — build will validate it.
3. Write the four narrative sections.
4. Drop images in `public/images/projects/<slug>/`.
5. Commit & push → Vercel rebuilds → live. No code changes.
