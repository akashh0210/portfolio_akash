import { cn } from "@/lib/utils";

const MILESTONES = [
  {
    code: "M1",
    title: "System Thinking & Mapping Outcomes",
    description:
      "Mapped the market landscape, business goals, and product outcomes using systems-thinking frameworks and outcome-driven mapping.",
    work: "/milestone/M1/MILESTONE%201_Sk_AkashAli.pdf",
    certificate: "/milestone/M1/Milestone%201%20certificate_output.png",
    chipClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  {
    code: "M2",
    title: "User Research & Problem Framing",
    description:
      "Segmented users, conducted primary research across 30+ participants, synthesised findings using JTBD framework and affinity mapping.",
    work: "/milestone/M2/MILESTONE%202_Sk_AkashAli.pdf",
    certificate: "/milestone/M2/Milestone%202.pdf",
    chipClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    code: "M3",
    title: "Prioritisation, Metrics & Growth",
    description:
      "Prioritised solutions via RICE, built wireframes, defined North Star metric (weekly active voice sessions) and 4 supporting KPIs.",
    work: "/milestone/M3/MILESTONE%203_SK_AkashAli.pdf",
    certificate: "/milestone/M3/Milestone%203.pdf",
    chipClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
] as const;

const SPRINT_POINTS = [
  "Mapped the end-to-end user journey for ChatGPT Mobile's Voice Module — identified 3 key drop-off points in the activation funnel using systems-thinking and outcome-driven frameworks.",
  "Conducted primary user research across 30+ mobile users; synthesised findings into JTBD-framed problem statements via affinity mapping.",
  "Authored a PRD with 3 RICE-prioritised feature interventions, defining the North Star metric and 4 supporting KPIs for activation, retention, and engagement.",
];

export function NextLeapSection() {
  return (
    <section className="mt-12" aria-label="NextLeap PM Fellowship">
      {/* Header row */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-eyebrow uppercase tracking-[0.12em] text-muted-foreground">
            PM Fellowship · 2026
          </p>
          <h2 className="mt-1 font-heading text-h3 font-semibold text-foreground">
            NextLeap PM Fellowship
          </h2>
        </div>
        <a
          href="/Nextleap_certificate/Mission_Accomplished_PM_Fellowship_certificate.png"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "self-start rounded border border-accent px-3 py-1.5 font-mono text-xs text-accent",
            "hover:bg-accent hover:text-background motion-safe:transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
        >
          View certificate ↗
        </a>
      </div>

      {/* Product Sprint card */}
      <div className="mt-5 rounded-lg border border-border bg-card p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-purple-500/10 px-2.5 py-0.5 font-mono text-[0.65rem] font-medium text-purple-600 dark:text-purple-400">
            Product Sprint
          </span>
          <span className="font-mono text-[0.65rem] text-muted-foreground">
            ChatGPT Voice Module Adoption
          </span>
        </div>
        <ul className="mt-3 space-y-2">
          {SPRINT_POINTS.map((point) => (
            <li key={point} className="flex gap-2.5 text-sm leading-6 text-foreground/80">
              <span className="mt-1 font-mono text-xs text-accent" aria-hidden="true">
                —
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Milestone cards */}
      <div className="mt-3 divide-y divide-border rounded-lg border border-border bg-card">
        {MILESTONES.map(({ code, title, description, work, certificate, chipClass }) => (
          <div
            key={code}
            className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:gap-5"
          >
            <span
              className={cn(
                "inline-flex h-fit flex-shrink-0 rounded-full px-2.5 py-0.5 font-mono text-[0.65rem] font-medium",
                chipClass
              )}
            >
              {code}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">{title}</p>
              <p className="mt-0.5 text-sm leading-5 text-muted-foreground">{description}</p>
            </div>
            <div className="flex flex-shrink-0 items-center gap-2">
              <a
                href={work}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "rounded border border-border px-2.5 py-1 font-mono text-[0.65rem] text-muted-foreground",
                  "hover:border-accent hover:text-accent motion-safe:transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                )}
              >
                View work
              </a>
              <a
                href={certificate}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "rounded border border-border px-2.5 py-1 font-mono text-[0.65rem] text-muted-foreground",
                  "hover:border-accent hover:text-accent motion-safe:transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                )}
              >
                Certificate
              </a>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 font-mono text-[0.6rem] text-muted-foreground">
        Also completed:{" "}
        <a
          href="/Nextleap_certificate/50-Day%20Daily%20Practice%20Challenge.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-foreground motion-safe:transition-colors"
        >
          50-Day Daily Practice Challenge
        </a>
      </p>
    </section>
  );
}
