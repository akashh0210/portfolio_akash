import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/Container";
import { mdxComponents } from "@/components/MdxComponents";
import { getAllProjects, getProjectBySlug, getAdjacentProjects } from "@/lib/projects";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Sk Akash Ali`,
    description: project.summary,
  };
}

const STATUS_COLORS: Record<string, string> = {
  Shipped: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Building: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  PRD: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "Case study": "bg-purple-500/10 text-purple-600 dark:text-purple-400",
};

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);

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

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span
              className={cn(
                "rounded-full px-3 py-1 font-mono text-xs font-medium",
                STATUS_COLORS[project.status] ?? "bg-muted text-muted-foreground"
              )}
            >
              {project.status}
            </span>
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="mt-8 border-l-2 border-accent pl-5">
            <p className="font-mono text-metric font-bold leading-none text-foreground">
              {project.metric.value}
            </p>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
              {project.metric.label}
            </p>
          </div>

          {project.links && (
            <div className="mt-6 flex gap-4">
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
        <MDXRemote source={project.content} components={mdxComponents} />
      </Container>

      {(prev || next) && (
        <nav
          aria-label="Project navigation"
          className="border-t border-border py-10"
        >
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
                  <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
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
                  <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
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
