import { Container } from "@/components/Container";

const PILLARS = [
  {
    label: "DEFINE",
    title: "Turn ambiguity into specs",
    body: "Structured PRDs, RICE-scored backlogs, and tradeoff tables. Problems stay fuzzy until someone writes them down — that's the job.",
  },
  {
    label: "BUILD",
    title: "Write code alongside the idea",
    body: "Full-stack prototypes and AI pipelines. The fastest path from hypothesis to validated answer is usually a working demo.",
  },
  {
    label: "SHIP",
    title: "Close the loop",
    body: "Instrument what matters, measure outcomes, document the honest learning. A shipped product with no follow-up is just a guess.",
  },
] as const;

export function WhatIDo() {
  return (
    <section className="border-y border-border py-16">
      <Container>
        <p className="mb-10 font-mono text-eyebrow uppercase tracking-[0.12em] text-muted-foreground">
          What I do
        </p>
        <div className="grid gap-10 sm:grid-cols-3">
          {PILLARS.map(({ label, title, body }) => (
            <div key={label}>
              <p className="font-mono text-eyebrow uppercase tracking-[0.12em] text-accent">
                {label}
              </p>
              <p className="mt-2 font-heading text-h3 font-semibold text-foreground">
                {title}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
