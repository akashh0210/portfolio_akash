import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Work — Sk Akash Ali",
  description:
    "Case studies and shipped builds by Sk Akash Ali: AI PM and builder.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="py-16 sm:py-24">
      <Container>
        <header className="mb-14">
          <p className="font-mono text-eyebrow uppercase tracking-[0.12em] text-muted-foreground">
            Selected work
          </p>
          <h1 className="mt-3 font-heading text-h1 font-semibold tracking-tight text-foreground">
            Projects
          </h1>
          <p className="mt-3 max-w-[480px] text-sm leading-6 text-muted-foreground">
            Featured case studies go deep on the PM problem. Shipped builds are
            the prototypes and tools I built to learn or prove a point.
          </p>
        </header>

        <ProjectsGrid projects={projects} />
      </Container>
    </div>
  );
}
