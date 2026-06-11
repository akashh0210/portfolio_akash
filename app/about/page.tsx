import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { NextLeapSection } from "@/components/NextLeapSection";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "AI PM and builder based in Bengaluru. I structure messy problems into crisp specs, then write the code to validate the solution.",
  openGraph: {
    title: "About — Sk Akash Ali",
    description: "AI PM and builder based in Bengaluru.",
    url: "/about",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sk Akash Ali",
  jobTitle: "AI Product Manager & Builder",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  sameAs: [
    "https://github.com/akashh0210",
    "https://www.linkedin.com/in/sk-akash-ali-5a74b724b/",
  ],
};

const SHIPPING_LOG = [
  {
    period: "Jun 2026",
    title: "Campayn — Brand Discovery Pipeline",
    detail: "Automated discovery → qualification → outreach. Shipped v1.4 with a compliance-checked outreach UI.",
  },
  {
    period: "May 2026",
    title: "FreechargeBiz — AI Card Recommendation PRD",
    detail: "Full PRD + RICE backlog + prototype for a 5-layer AI recommendation engine with explainability at its core.",
  },
  {
    period: "Apr 2026",
    title: "Backbone — Calibration Layer for ChatGPT",
    detail: "Two-pass LLM system that surfaces reasoning and confidence. 91% calibrated answer rate on hand-labelled test set.",
  },
  {
    period: "Mar 2026",
    title: "Groww App Review Insights Analyser + Zomato Recommender",
    detail: "Two full-stack AI tools shipped: review-to-insight pipeline (60s) and personalized restaurant recommendations (<2s).",
  },
  {
    period: "Feb 2026",
    title: "SBI Mutual Fund FAQ Chatbot",
    detail: "RAG pipeline over 2,916 FAQ chunks across four SBI fund schemes. Grounded, cited answers with sub-3s latency on Llama 3.",
  },
] as const;

const LINKS = [
  { href: "https://github.com/akashh0210", label: "GitHub" },
  { href: "https://www.linkedin.com/in/sk-akash-ali-5a74b724b/", label: "LinkedIn" },
  { href: "mailto:akash102502@gmail.com", label: "Email" },
  { href: "/resume.pdf", label: "Resume", download: true },
] as const;

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container size="reading">
        <header>
          <p className="font-mono text-eyebrow uppercase tracking-[0.12em] text-muted-foreground">
            AI PM &amp; builder · Bengaluru
          </p>
          <h1 className="mt-3 font-heading text-h1 font-semibold tracking-tight text-foreground">
            About
          </h1>
        </header>

        <section className="mt-8" aria-label="Introduction">
          <p className="text-base leading-7 text-foreground/90">
            I&apos;m an AI PM and builder. I work at the intersection of product strategy
            and engineering — structuring ambiguous problems into crisp specs, then
            writing the code to validate the solution before anyone else wastes time on it.
          </p>
          <p className="mt-4 text-base leading-7 text-foreground/90">
            My background is split between product management (PRDs, prioritization,
            stakeholder alignment) and hands-on building (full-stack apps, LLM pipelines,
            RAG systems). The combination means I can go from a messy product hypothesis
            to a working, measurable demo faster than most teams can finish their kickoff call.
          </p>
        </section>

        <section className="mt-12" aria-label="How I work">
          <h2 className="font-heading text-h3 font-semibold text-foreground">
            How I work
          </h2>
          <ul className="mt-4 space-y-3">
            {[
              "Structure first. I write the PRD before building the prototype. A one-page problem framing with explicit tradeoffs saves more time than any retrospective.",
              "Ship early. A rough working demo beats a polished mockup for validation. The goal is to be wrong fast, not right eventually.",
              "Measure honestly. If the metric did not move, that is the learning. I document what worked, what did not, and what I would do differently.",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-foreground/90">
                <span className="mt-0.5 font-mono text-accent" aria-hidden="true">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12" aria-label="Shipping log">
          <h2 className="font-heading text-h3 font-semibold text-foreground">
            Shipping log
          </h2>
          <div className="mt-4 space-y-5">
            {SHIPPING_LOG.map(({ period, title, detail }) => (
              <div key={title} className="grid grid-cols-[5rem_1fr] gap-4">
                <span className="font-mono text-eyebrow text-muted-foreground pt-0.5">
                  {period}
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{title}</p>
                  <p className="mt-0.5 text-sm leading-5 text-muted-foreground">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <NextLeapSection />

        <section className="mt-12 border-t border-border pt-8" aria-label="Elsewhere">
          <h2 className="font-heading text-h3 font-semibold text-foreground">
            Elsewhere
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {LINKS.map(({ href, label, ...rest }) => (
              <Link
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                {...("download" in rest && rest.download ? { download: "Sk_Akash_Ali_Resume.pdf" } : {})}
                className={cn(
                  "rounded border px-4 py-2 font-mono text-xs transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  label === "Resume"
                    ? "border-accent text-accent hover:bg-accent hover:text-background"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                )}
              >
                {label}
              </Link>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
