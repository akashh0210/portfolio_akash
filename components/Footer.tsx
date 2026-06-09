import Link from "next/link";
import { Container } from "@/components/Container";

const SOCIAL_LINKS = [
  { href: "https://github.com/akashh0210", label: "GitHub" },
  { href: "https://www.linkedin.com/in/sk-akash-ali-5a74b724b/", label: "LinkedIn" },
  { href: "mailto:akash102502@gmail.com", label: "Email" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
            Sk Akash Ali — AI PM &amp; builder
          </p>
          <div className="flex items-center gap-5">
            {SOCIAL_LINKS.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className={[
                  "text-xs text-muted-foreground transition-colors",
                  "hover:text-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded",
                ].join(" ")}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
