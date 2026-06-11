import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/schema";

const TYPE_STYLES: Record<string, { badge: string; bar: string }> = {
  PRD: {
    badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    bar: "bg-amber-500/20",
  },
  "Case study": {
    badge: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    bar: "bg-purple-500/20",
  },
  Shipped: {
    badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    bar: "bg-emerald-500/20",
  },
};

interface PmArtifactCardProps {
  project: Project;
}

export function PmArtifactCard({ project }: PmArtifactCardProps) {
  const styles = TYPE_STYLES[project.status] ?? TYPE_STYLES["Case study"];
  const hasDoc = !!project.links?.document;

  return (
    <article
      className={cn(
        "group relative flex flex-col gap-4 rounded-lg border border-border bg-card p-5",
        "sm:flex-row sm:items-start sm:gap-6 sm:p-6",
        "hover:border-accent/40 motion-safe:transition-all motion-safe:duration-150"
      )}
    >
      {/* Accent bar */}
      <div className={cn("absolute left-0 top-4 bottom-4 w-[3px] rounded-full", styles.bar)} />

      {/* Type badge — stacked on mobile, sidebar on desktop */}
      <div className="flex-shrink-0 sm:w-24 sm:pt-0.5">
        <span
          className={cn(
            "inline-block rounded-full px-2.5 py-0.5 font-mono text-[0.65rem] font-medium",
            styles.badge
          )}
        >
          {project.status}
        </span>
        <p className="mt-1.5 font-mono text-[0.65rem] text-muted-foreground">
          {project.timeframe}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="font-heading text-base font-semibold tracking-tight text-foreground">
          {project.title}
        </h3>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          {project.summary}
        </p>

        {/* Metric */}
        <p className="mt-3 font-mono text-xs text-muted-foreground">
          <span className="text-foreground font-semibold">{project.metric.value}</span>
          {" "}
          {project.metric.label}
        </p>

        {/* Tags */}
        {project.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-2 py-0.5 font-mono text-[0.6rem] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* CTAs */}
      <div className="flex flex-shrink-0 flex-wrap items-center gap-2 sm:flex-col sm:items-end sm:gap-2">
        {hasDoc && (
          <a
            href={project.links!.document}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "rounded border border-border px-3 py-1.5 font-mono text-xs text-muted-foreground",
              "motion-safe:transition-colors hover:border-accent hover:text-accent",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
          >
            View PDF
          </a>
        )}
        <Link
          href={`/projects/${project.slug}`}
          className={cn(
            "font-mono text-xs text-accent motion-safe:transition-transform motion-safe:duration-150",
            "motion-safe:group-hover:translate-x-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          )}
        >
          Read →
        </Link>
      </div>
    </article>
  );
}
