import Link from "next/link";
import { cn } from "@/lib/utils";
import { MetricBlock } from "@/components/MetricBlock";
import type { Project } from "@/lib/schema";

const STATUS_STYLES: Record<string, string> = {
  Shipped: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Building: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  PRD: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "Case study": "bg-purple-500/10 text-purple-600 dark:text-purple-400",
};

interface ProjectCardProps {
  project: Project;
  variant?: "featured" | "compact";
}

export function ProjectCard({ project, variant = "featured" }: ProjectCardProps) {
  const href = `/projects/${project.slug}`;

  if (variant === "compact") {
    return (
      <Link
        href={href}
        className={cn(
          "group flex flex-col gap-3 rounded-lg border border-border bg-card p-5",
          "transition-all duration-150 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-sm",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        )}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 font-mono text-[0.65rem] font-medium",
              STATUS_STYLES[project.status] ?? "bg-muted text-muted-foreground"
            )}
          >
            {project.status}
          </span>
          {project.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[0.65rem] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <div>
          <h3 className="font-heading text-base font-semibold text-foreground">
            {project.title}
          </h3>
          <p className="mt-1 text-sm leading-5 text-muted-foreground">{project.summary}</p>
        </div>

        <div className="mt-auto flex items-end justify-between">
          <MetricBlock value={project.metric.value} label={project.metric.label} size="sm" />
          <span className="font-mono text-xs text-accent transition-transform duration-150 group-hover:translate-x-0.5">
            Read →
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col gap-5 rounded-lg border border-border p-6",
        "transition-all duration-150 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "sm:p-8"
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={cn(
            "rounded-full px-3 py-1 font-mono text-xs font-medium",
            STATUS_STYLES[project.status] ?? "bg-muted text-muted-foreground"
          )}
        >
          {project.status}
        </span>
        {project.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <div>
        <h3 className="font-heading text-h3 font-semibold tracking-tight text-foreground">
          {project.title}
        </h3>
        <p className="mt-2 leading-6 text-muted-foreground">{project.summary}</p>
      </div>

      <MetricBlock value={project.metric.value} label={project.metric.label} size="lg" />

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((s) => (
            <span
              key={s}
              className="rounded border border-border px-2 py-0.5 font-mono text-[0.65rem] text-muted-foreground"
            >
              {s}
            </span>
          ))}
        </div>
        <span className="font-mono text-sm text-accent transition-transform duration-150 group-hover:translate-x-0.5">
          Read →
        </span>
      </div>
    </Link>
  );
}
