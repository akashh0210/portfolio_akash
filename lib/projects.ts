import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { projectSchema, type Project } from "@/lib/schema";

const CONTENT_DIR = path.join(process.cwd(), "content", "projects");

function readAllProjects(): Project[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  return files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf8");
    const { data, content } = matter(raw);

    const parsed = projectSchema.safeParse({ slug, ...data });
    if (!parsed.success) {
      throw new Error(
        `Invalid frontmatter in content/projects/${filename}:\n${parsed.error.toString()}`
      );
    }

    return { ...parsed.data, slug: parsed.data.slug ?? slug, content };
  });
}

export function getAllProjects(): Project[] {
  return readAllProjects()
    .filter((p) => !p.draft)
    .sort((a, b) => a.order - b.order);
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects()
    .filter((p) => p.tier === "featured")
    .sort((a, b) => (a.featured_order ?? a.order) - (b.featured_order ?? b.order));
}

export function getPmProjects(): Project[] {
  return getAllProjects()
    .filter((p) => p.tier === "prd" || p.status === "PRD")
    .sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const all = getAllProjects();
  const idx = all.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
}
