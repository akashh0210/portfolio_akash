import Link from "next/link";
import type { Metadata } from "next";
import { getFeaturedProjects, getAllProjects } from "@/lib/projects";
import { Hero } from "@/components/Hero";
import { WhatIDo } from "@/components/WhatIDo";
import { ProjectCard } from "@/components/ProjectCard";
import { CurrentlyBuilding } from "@/components/CurrentlyBuilding";
import { Container } from "@/components/Container";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: { absolute: "Sk Akash Ali — AI PM & Builder" },
  description:
    "Portfolio of Sk Akash Ali: AI PM and builder. Case studies, shipped products, and proof of work.",
  openGraph: {
    title: "Sk Akash Ali — AI PM & Builder",
    description: "Products that move metrics. Case studies, shipped work, and proof of craft.",
    url: "/",
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

export default function Home() {
  const featured = getFeaturedProjects();
  const builds = getAllProjects().filter((p) => p.tier === "build");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <WhatIDo />

      {/* Featured case studies */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="font-mono text-eyebrow uppercase tracking-[0.12em] text-muted-foreground">
                Featured
              </p>
              <p className="mt-1 font-heading text-h2 font-semibold text-foreground">
                Case studies
              </p>
            </div>
            <Link
              href="/projects"
              className={cn(
                "font-mono text-sm text-accent transition-transform duration-150",
                "hover:translate-x-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
              )}
            >
              View all →
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} variant="featured" />
            ))}
          </div>
        </Container>
      </section>

      {/* Also shipped */}
      {builds.length > 0 && (
        <section className="border-t border-border py-16">
          <Container>
            <div className="mb-8">
              <p className="font-mono text-eyebrow uppercase tracking-[0.12em] text-muted-foreground">
                Also shipped
              </p>
              <p className="mt-1 font-heading text-h2 font-semibold text-foreground">
                Builds
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {builds.map((project) => (
                <ProjectCard key={project.slug} project={project} variant="compact" />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CurrentlyBuilding />
    </>
  );
}
