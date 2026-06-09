import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

type ImgProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
};

function Img({ src, alt, width = 1200, height = 630, caption }: ImgProps) {
  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="rounded-lg border border-border"
      />
      {caption && (
        <figcaption className="mt-2 text-center font-mono text-xs text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export const mdxComponents: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="mt-12 mb-4 font-heading text-h2 font-semibold tracking-tight text-foreground">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 mb-3 font-heading text-h3 font-semibold tracking-tight text-foreground">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-5 leading-7 text-foreground/90">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-5 ml-6 list-disc space-y-1.5 text-foreground/90">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-5 ml-6 list-decimal space-y-1.5 text-foreground/90">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-7">{children}</li>,
  a: ({ href = "#", children }) => (
    <Link
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={cn(
        "text-accent underline underline-offset-4 decoration-accent/40",
        "hover:decoration-accent transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
      )}
    >
      {children}
    </Link>
  ),
  code: ({ children }) => (
    <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-sm text-foreground/80 border border-border">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="my-6 overflow-x-auto rounded-lg border border-border bg-surface p-4 font-mono text-sm leading-6">
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-2 border-accent pl-4 text-muted-foreground italic">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-border" />,
  Img,
};
