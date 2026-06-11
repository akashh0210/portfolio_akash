import Link from "next/link";
import { Container } from "@/components/Container";

const SOCIAL_LINKS = [
  { href: "https://github.com/akashh0210", label: "GitHub" },
  { href: "https://www.linkedin.com/in/sk-akash-ali-5a74b724b/", label: "LinkedIn" },
  { href: "mailto:akash102502@gmail.com", label: "Email" },
  { href: "/resume.pdf", label: "Resume", download: "Sk_Akash_Ali_Resume.pdf" },
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
            {SOCIAL_LINKS.map(({ href, label, ...rest }) => {
              const isDownload = "download" in rest;
              const className = [
                "text-xs text-muted-foreground transition-colors",
                "hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded",
              ].join(" ");
              if (isDownload) {
                return (
                  <a key={label} href={href} download={(rest as { download: string }).download} className={className}>
                    {label}
                  </a>
                );
              }
              return (
                <Link
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className={className}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </footer>
  );
}
