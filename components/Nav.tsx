"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Container } from "@/components/Container";
import { ThemeToggle } from "@/components/ThemeToggle";

const NAV_LINKS = [
  { href: "/projects", label: "Work" },
  { href: "/about", label: "About" },
] as const;

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <Container>
        <nav
          aria-label="Main navigation"
          className="flex h-14 items-center justify-between"
        >
          <Link
            href="/"
            className={cn(
              "font-heading text-sm font-semibold tracking-tight text-foreground",
              "transition-colors hover:text-accent",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            )}
          >
            Sk Akash Ali
          </Link>

          <div className="flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "rounded px-3 py-1.5 text-sm transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive
                      ? "font-medium text-accent"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {label}
                </Link>
              );
            })}
            <a
              href="/resume.pdf"
              download="Akash_Ali_Resume.pdf"
              className={cn(
                "ml-1 rounded border border-border px-2.5 py-1 font-mono text-xs text-muted-foreground",
                "transition-colors hover:border-accent hover:text-accent",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              )}
            >
              Resume
            </a>
            <ThemeToggle />
          </div>
        </nav>
      </Container>
    </header>
  );
}
