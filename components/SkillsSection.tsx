import { cn } from "@/lib/utils";

const SKILL_GROUPS = [
  {
    label: "Product",
    chipClass: "border-amber-500/30 text-amber-600 dark:text-amber-400",
    dotClass: "bg-amber-500",
    items: [
      "Roadmapping",
      "PRD Writing",
      "User Research",
      "RICE Prioritisation",
      "KPI Definition",
      "Wireframing (Figma)",
      "First-Principle Thinking",
    ],
  },
  {
    label: "AI & Agents",
    chipClass: "border-blue-500/30 text-blue-600 dark:text-blue-400",
    dotClass: "bg-blue-500",
    items: [
      "Multi-Agent Systems",
      "RAG Pipelines",
      "MCP Protocol",
      "LLM API Integration",
      "Voice/Chat AI Agents",
      "Prompt Engineering",
    ],
  },
  {
    label: "Technical",
    chipClass: "border-purple-500/30 text-purple-600 dark:text-purple-400",
    dotClass: "bg-purple-500",
    items: [
      "Python",
      "SQL",
      "FastAPI",
      "Next.js",
      "TypeScript",
      "Node.js",
      "REST APIs",
      "Docker",
      "CI/CD (GitHub Actions)",
    ],
  },
  {
    label: "Data & Analytics",
    chipClass: "border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
    dotClass: "bg-emerald-500",
    items: [
      "Power BI",
      "Google Analytics",
      "Pandas",
      "Excel (Advanced)",
      "Google APIs",
      "M365",
    ],
  },
  {
    label: "Automation",
    chipClass: "border-orange-500/30 text-orange-600 dark:text-orange-400",
    dotClass: "bg-orange-500",
    items: ["n8n", "Zapier", "Cursor", "Claude Code", "Replit", "Streamlit"],
  },
] as const;

export function SkillsSection() {
  return (
    <section className="mt-12" aria-label="Skills">
      <h2 className="font-heading text-h3 font-semibold text-foreground">Skills</h2>
      <div className="mt-5 space-y-5">
        {SKILL_GROUPS.map(({ label, chipClass, dotClass, items }) => (
          <div key={label} className="grid grid-cols-[7rem_1fr] gap-3 sm:gap-4">
            <div className="flex items-start gap-1.5 pt-0.5">
              <span className={cn("mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full", dotClass)} aria-hidden="true" />
              <span className="font-mono text-xs font-medium text-foreground">{label}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {items.map((skill) => (
                <span
                  key={skill}
                  className={cn(
                    "rounded-full border px-2.5 py-0.5 font-mono text-[0.6rem]",
                    chipClass
                  )}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
