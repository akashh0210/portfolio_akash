import Link from "next/link";
import { Container } from "@/components/Container";
import { cn } from "@/lib/utils";

export function ContactCta() {
  return (
    <section className="border-t border-border py-16 sm:py-20">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-eyebrow uppercase tracking-[0.12em] text-muted-foreground">
              Open to work
            </p>
            <h2 className="mt-1 font-heading text-h2 font-semibold text-foreground">
              Looking for an AI PM who ships?
            </h2>
            <p className="mt-3 max-w-[460px] text-sm leading-6 text-muted-foreground">
              I bring the full stack — problem framing, PRD, and a working prototype
              to validate it. If you&apos;re building with AI and need a PM who thinks
              in systems and ships in sprints, let&apos;s talk.
            </p>
          </div>
          <div className="flex flex-shrink-0 flex-col gap-2 sm:items-end">
            <Link
              href="/contact"
              className={cn(
                "rounded border border-accent bg-accent px-5 py-2.5 font-mono text-sm font-medium text-background",
                "hover:opacity-90 motion-safe:transition-opacity",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              )}
            >
              Send a message
            </Link>
            <a
              href="https://www.linkedin.com/in/sk-akash-ali-5a74b724b/"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "rounded border border-border px-5 py-2.5 font-mono text-sm text-muted-foreground",
                "hover:border-foreground hover:text-foreground motion-safe:transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              )}
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
