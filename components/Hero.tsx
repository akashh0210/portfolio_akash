import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Container } from "@/components/Container";

export function Hero() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-16 lg:gap-20">

          {/* Text column */}
          <div className="flex-1 min-w-0">
            <p className="font-mono text-eyebrow uppercase tracking-[0.12em] text-muted-foreground motion-safe:animate-fade-in-up motion-safe:[animation-delay:0ms]">
              Available for AI PM roles · Remote or Bengaluru
            </p>

            <h1 className="mt-4 font-heading text-hero font-semibold leading-[1.08] tracking-[-0.02em] text-foreground motion-safe:animate-fade-in-up motion-safe:[animation-delay:80ms]">
              AI PM who ships.
              <br />
              Products that move metrics.
            </h1>

            <p className="mt-6 max-w-[520px] text-base leading-7 text-muted-foreground motion-safe:animate-fade-in-up motion-safe:[animation-delay:160ms]">
              I work at the intersection of product thinking and code — from a messy
              problem to a shipped feature. Case studies, not slides.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 motion-safe:animate-fade-in-up motion-safe:[animation-delay:240ms]">
              <Link
                href="/projects"
                className={cn(
                  "rounded-md bg-accent px-5 py-2.5 font-mono text-sm font-medium text-background",
                  "motion-safe:transition-colors hover:bg-accent/90",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                )}
              >
                View work
              </Link>
              <Link
                href="/contact"
                className={cn(
                  "rounded-md border border-border px-5 py-2.5 font-mono text-sm font-medium text-foreground",
                  "motion-safe:transition-colors hover:border-accent hover:text-accent",
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
                  "motion-safe:transition-colors hover:border-accent hover:text-accent",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                )}
              >
                Download resume
              </a>
            </div>
          </div>

          {/* Photo column — drop your photo at public/images/akash.jpg */}
          <div className="w-full flex-shrink-0 md:w-[240px] lg:w-[280px] motion-safe:animate-fade-in-up motion-safe:[animation-delay:120ms]">
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <Image
                src="/images/akash.jpg"
                alt="Sk Akash Ali"
                fill
                sizes="(max-width: 768px) 80vw, 280px"
                className="object-cover object-top"
                priority
              />
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
