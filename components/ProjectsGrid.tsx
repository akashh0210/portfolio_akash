"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ProjectCard } from "@/components/ProjectCard";
import { PmArtifactCard } from "@/components/PmArtifactCard";
import type { Project } from "@/lib/schema";

const FILTER_OPTIONS = [
  { value: "all", label: "All" },
  { value: "featured", label: "Case studies" },
  { value: "build", label: "Shipped builds" },
  { value: "prd", label: "PM work" },
] as const;

type FilterValue = (typeof FILTER_OPTIONS)[number]["value"];

interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [filter, setFilter] = useState<FilterValue>("all");

  const visible =
    filter === "all"
      ? projects
      : filter === "prd"
      ? projects.filter((p) => p.tier === "prd" || p.status === "PRD")
      : projects.filter((p) => p.tier === filter);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter projects"
        className="mb-10 flex flex-wrap gap-2"
      >
        {FILTER_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            role="tab"
            aria-selected={filter === value}
            type="button"
            onClick={() => setFilter(value)}
            className={cn(
              "rounded-full border px-4 py-1.5 font-mono text-xs motion-safe:transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              filter === value
                ? "border-accent bg-accent text-background"
                : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="text-sm text-muted-foreground">No projects match this filter.</p>
      ) : filter === "prd" ? (
        <div className="flex flex-col gap-3">
          {visible.map((project) => (
            <PmArtifactCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              variant={project.tier === "featured" ? "featured" : "compact"}
            />
          ))}
        </div>
      )}
    </div>
  );
}
