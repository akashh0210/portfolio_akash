import Link from "next/link";
import { cn } from "@/lib/utils";
import { Container } from "@/components/Container";

export function Hero() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <p className="font-mono text-eyebrow uppercase tracking-[0.12em] text-muted-foreground">
          Available for AI PM roles · Remote or Bengaluru
        </p>

        <h1 className="mt-4 font-heading text-hero font-semibold leading-[1.08] tracking-[-0.02em] text-foreground">
          AI PM who ships.
          <br />
          Products that move metrics.
        </h1>

        <p className="mt-6 max-w-[520px] text-base leading-7 text-muted-foreground">
          I work at the intersection of product thinking and code — from a messy
          problem to a shipped feature. Case studies, not slides.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/projects"
            className={cn(
              "rounded-md bg-accent px-5 py-2.5 font-mono text-sm font-medium text-background",
              "transition-colors hover:bg-accent/90",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
          >
            View work
          </Link>
          <Link
            href="mailto:akash102502@gmail.com"
            className={cn(
              "rounded-md border border-border px-5 py-2.5 font-mono text-sm font-medium text-foreground",
              "transition-colors hover:border-accent hover:text-accent",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
          >
            Get in touch
          </Link>
          <a
            href="/resume.pdf"
            download="Akash_Ali_Resume.pdf"
            className={cn(
              "rounded-md border border-border px-5 py-2.5 font-mono text-sm font-medium text-muted-foreground",
              "transition-colors hover:border-accent hover:text-accent",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
          >
            Download resume
          </a>
        </div>
      </Container>
    </section>
  );
}
