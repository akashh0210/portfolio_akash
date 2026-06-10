import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center py-24">
      <Container>
        <p className="font-mono text-eyebrow uppercase tracking-[0.12em] text-muted-foreground">
          404
        </p>
        <h1 className="mt-3 font-heading text-h1 font-semibold tracking-tight text-foreground">
          Page not found
        </h1>
        <p className="mt-4 max-w-[400px] text-base leading-7 text-muted-foreground">
          This page does not exist. Try going back or browsing the work.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className={cn(
              "rounded-md bg-accent px-5 py-2.5 font-mono text-sm font-medium text-background",
              "motion-safe:transition-colors hover:bg-accent/90",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
          >
            Go home
          </Link>
          <Link
            href="/projects"
            className={cn(
              "rounded-md border border-border px-5 py-2.5 font-mono text-sm font-medium text-foreground",
              "hover:border-accent hover:text-accent motion-safe:transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
          >
            View work
          </Link>
        </div>
      </Container>
    </div>
  );
}
