import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Container } from "@/components/Container";
import { MetadataBar } from "@/components/MetadataBar";
import { MetricBlock } from "@/components/MetricBlock";
import type { Project } from "@/lib/schema";

const STATUS_STYLES: Record<string, string> = {
  Shipped: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Building: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  PRD: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "Case study": "bg-purple-500/10 text-purple-600 dark:text-purple-400",
};

interface CaseStudyLayoutProps {
  project: Project;
  prev: Project | null;
  next: Project | null;
  children: ReactNode;
}

export function CaseStudyLayout({ project, prev, next, children }: CaseStudyLayoutProps) {
  return (
    <article>
      <header className="border-b border-border py-16">
        <Container size="reading">
          <p className="font-mono text-eyebrow uppercase tracking-[0.12em] text-muted-foreground">
            {project.role} · {project.timeframe}
          </p>

          <h1 className="mt-3 font-heading text-h1 font-semibold tracking-tight text-foreground">
            {project.title}
          </h1>

          <p className="mt-4 text-lg leading-7 text-muted-foreground">{project.summary}</p>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "rounded-full px-3 py-1 font-mono text-xs font-medium",
                STATUS_STYLES[project.status] ?? "bg-muted text-muted-foreground"
              )}
            >
              {project.status}
            </span>
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 border-l-2 border-accent pl-5">
            <MetricBlock
              value={project.metric.value}
              label={project.metric.label}
              size="lg"
            />
          </div>

          <div className="mt-8">
            <MetadataBar
              role={project.role}
              stack={project.stack}
              timeframe={project.timeframe}
              outcome={project.outcome}
            />
          </div>

          {project.links && (project.links.live || project.links.repo) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {project.links.live && (
                <Link
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "rounded border border-accent px-4 py-2 font-mono text-xs text-accent",
                    "hover:bg-accent hover:text-background transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  )}
                >
                  View live
                </Link>
              )}
              {project.links.repo && (
                <Link
                  href={project.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "rounded border border-border px-4 py-2 font-mono text-xs text-muted-foreground",
                    "hover:border-foreground hover:text-foreground transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  )}
                >
                  Source
                </Link>
              )}
            </div>
          )}
        </Container>
      </header>

      <Container size="reading" className="py-16">
        {children}
      </Container>

      {(prev || next) && (
        <nav aria-label="Project navigation" className="border-t border-border py-10">
          <Container>
            <div className="flex justify-between gap-6">
              {prev ? (
                <Link
                  href={`/projects/${prev.slug}`}
                  className="group flex flex-col gap-1"
                >
                  <span className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
                    Previous
                  </span>
                  <span className="text-sm font-medium text-foreground transition-colors group-hover:text-accent">
                    {prev.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
              {next && (
                <Link
                  href={`/projects/${next.slug}`}
                  className="group flex flex-col items-end gap-1"
                >
                  <span className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
                    Next
                  </span>
                  <span className="text-sm font-medium text-foreground transition-colors group-hover:text-accent">
                    {next.title}
                  </span>
                </Link>
              )}
            </div>
          </Container>
        </nav>
      )}
    </article>
  );
}
