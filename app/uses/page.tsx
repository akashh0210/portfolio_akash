import type { Metadata } from "next";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Uses",
  description:
    "The actual stack, tools, and workflow I use for AI product work and full-stack building.",
  openGraph: {
    title: "Uses — Sk Akash Ali",
    description: "Stack, tools, and workflow for AI product work and full-stack building.",
    url: "/uses",
  },
};

const SECTIONS = [
  {
    heading: "Languages & runtimes",
    items: [
      {
        name: "Python",
        detail:
          "LLM pipelines, data ingestion, FastAPI backends. The fastest path from idea to working AI prototype.",
      },
      {
        name: "TypeScript",
        detail:
          "Full-stack Next.js apps, end-to-end type safety, Zod validation. Everything in this portfolio.",
      },
      {
        name: "SQL",
        detail:
          "Data querying, aggregation, and analytics across relational datasets. Used alongside Pandas for product analytics work.",
      },
    ],
  },
  {
    heading: "Frameworks & libraries",
    items: [
      { name: "Next.js 16 (App Router)", detail: "Static generation, RSC, file-based routing. What I reach for for any web project." },
      { name: "FastAPI", detail: "Python REST backends. Pydantic for validation, async by default, OpenAPI docs for free." },
      { name: "Tailwind v4", detail: "CSS-only config, design tokens, no stylesheet sprawl." },
      { name: "Zod", detail: "Runtime schema validation on both frontend (form inputs) and backend (API bodies, frontmatter)." },
      { name: "next-mdx-remote", detail: "MDX rendering in RSC for file-based content pipelines." },
    ],
  },
  {
    heading: "AI & LLM",
    items: [
      {
        name: "Claude (Sonnet / Opus)",
        detail:
          "Primary model for reasoning, structured output, and anything requiring careful judgment. Used in Campayn, FreechargeBiz, Backbone.",
      },
      {
        name: "OpenAI GPT-4o",
        detail: "Baseline model for Backbone calibration experiments. Good for comparison benchmarking.",
      },
      {
        name: "Groq (Llama 3)",
        detail: "Sub-second inference for latency-sensitive pipelines. Zomato recommender and Groww review analyser.",
      },
      {
        name: "ChromaDB",
        detail: "Local vector store for RAG. Used for the Groww FAQ chatbot with 2,916 indexed chunks.",
      },
      {
        name: "Playwright",
        detail: "Browser automation for data collection in the Campayn discovery pipeline.",
      },
    ],
  },
  {
    heading: "Dev tools",
    items: [
      {
        name: "Cursor",
        detail:
          "Primary IDE. The inline AI context aware of the whole repo is the single highest-leverage tool in my workflow.",
      },
      {
        name: "Claude Code",
        detail:
          "CLI-based agentic coding assistant. I use it for multi-file refactors, phase-based builds (like this site), and anything requiring sustained context.",
      },
      { name: "Git + GitHub", detail: "Version control. Content-as-code means MDX case studies have a git history." },
      { name: "Vercel", detail: "Deploys on push. Free tier covers the static site fully." },
    ],
  },
  {
    heading: "Design & prototyping",
    items: [
      { name: "Figma", detail: "Wireframes, flows, hi-fi mockups. The FreechargeBiz prototype was Figma-first." },
      {
        name: "Lovable",
        detail:
          "Rapid UI scaffolding for demos. Generated the Campayn outreach review UI in an afternoon.",
      },
      { name: "shadcn/ui", detail: "Base component primitives. Unstyled-first, easy to override with design tokens." },
    ],
  },
  {
    heading: "PM process",
    items: [
      { name: "RICE scoring", detail: "Reach × Impact × Confidence / Effort. My default prioritization framework for backlog decisions." },
      { name: "MoSCoW", detail: "Must / Should / Could / Won't. Useful for stakeholder alignment on scope." },
      { name: "Structured PRDs", detail: "Problem → Hypothesis → Scope → Success metrics → Risks. The FreechargeBiz PRD follows this template." },
      { name: "Notion", detail: "Docs, project notes, research logs. Markdown-native." },
      { name: "Linear", detail: "Issue tracking for anything with more than three moving parts." },
    ],
  },
  {
    heading: "Data & analytics",
    items: [
      { name: "Power BI", detail: "Dashboards and reports for product and business metrics. Connects directly to SQL and Excel data sources." },
      { name: "Google Analytics", detail: "Funnel analysis, event tracking, and retention metrics. Used for product health monitoring." },
      { name: "Pandas", detail: "Data wrangling and analysis in Python. Core tool for processing review datasets and log files." },
      { name: "Excel (Advanced)", detail: "Pivot tables, VLOOKUP/XLOOKUP, and financial modelling. Still the fastest tool for one-off analysis." },
      { name: "Google APIs", detail: "Sheets, Drive, and Analytics APIs for lightweight data pipelines and automated reporting." },
      { name: "M365", detail: "Teams, SharePoint, and Excel for collaborative product documentation and stakeholder communication." },
    ],
  },
  {
    heading: "Automation",
    items: [
      { name: "n8n", detail: "Self-hosted workflow automation. Used for multi-step pipelines that need custom logic between nodes." },
      { name: "Zapier", detail: "Rapid no-code automation for connecting SaaS tools. Fastest path to a working integration proof-of-concept." },
      { name: "Replit", detail: "Cloud-based coding environment for quick prototypes and shareable demos without local setup." },
      { name: "Streamlit", detail: "Python-native UI for internal data tools and demo interfaces. Used in the Groww review analyser pipeline." },
    ],
  },
] as const;

export default function UsesPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container size="reading">
        <header>
          <p className="font-mono text-eyebrow uppercase tracking-[0.12em] text-muted-foreground">
            Stack · tools · workflow
          </p>
          <h1 className="mt-3 font-heading text-h1 font-semibold tracking-tight text-foreground">
            Uses
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            The actual tools I use for AI product work and full-stack building —
            not aspirational, not exhaustive.
          </p>
        </header>

        <div className="mt-12 space-y-12">
          {SECTIONS.map(({ heading, items }) => (
            <section key={heading} aria-label={heading}>
              <h2 className="font-mono text-eyebrow uppercase tracking-[0.12em] text-accent">
                {heading}
              </h2>
              <dl className="mt-4 space-y-4">
                {items.map(({ name, detail }) => (
                  <div key={name} className="grid grid-cols-[10rem_1fr] gap-4">
                    <dt className="text-sm font-medium text-foreground">{name}</dt>
                    <dd className="text-sm leading-6 text-muted-foreground">{detail}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </Container>
    </div>
  );
}
