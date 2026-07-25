/**
 * GitHub → Portfolio sync script
 * Reads portfolio-sync.json, fetches metadata from each listed repo,
 * and updates links in existing MDX files or creates draft stubs for new ones.
 *
 * Run: node scripts/sync-github-projects.mjs
 * Requires: GH_TOKEN env var (GITHUB_TOKEN in Actions)
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const GH_TOKEN = process.env.GH_TOKEN;
if (!GH_TOKEN) {
  console.error("GH_TOKEN is required");
  process.exit(1);
}

const syncConfig = JSON.parse(
  readFileSync(join(ROOT, "portfolio-sync.json"), "utf8")
);

async function ghFetch(path) {
  const res = await fetch(`https://api.github.com/${path}`, {
    headers: {
      Authorization: `Bearer ${GH_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API ${res.status} for ${path}: ${text}`);
  }
  return res.json();
}

async function fetchRepoMeta(repo) {
  try {
    return await ghFetch(`repos/${repo}`);
  } catch {
    return null;
  }
}

async function fetchPortfolioJson(repo) {
  try {
    const data = await ghFetch(`repos/${repo}/contents/portfolio.json`);
    const content = Buffer.from(data.content, "base64").toString("utf8");
    return JSON.parse(content);
  } catch {
    return null;
  }
}

async function syncRepo({ repo, slug }) {
  console.log(`\nProcessing ${slug} (${repo})...`);

  const [meta, portfolioJson] = await Promise.all([
    fetchRepoMeta(repo),
    fetchPortfolioJson(repo),
  ]);

  if (!meta) {
    console.log(`  ✗ Could not fetch repo metadata, skipping`);
    return;
  }

  const repoUrl = meta.html_url;
  const liveUrl = meta.homepage || null;

  const mdxPath = join(ROOT, "content", "projects", `${slug}.mdx`);

  if (existsSync(mdxPath)) {
    // Update existing MDX — only touch links, preserve everything else
    const raw = readFileSync(mdxPath, "utf8");
    const parsed = matter(raw);

    const links = parsed.data.links ?? {};
    let changed = false;

    if (links.repo !== repoUrl) {
      links.repo = repoUrl;
      changed = true;
    }

    if (liveUrl && links.live !== liveUrl) {
      links.live = liveUrl;
      changed = true;
    }

    if (changed) {
      parsed.data.links = links;
      const updated = matter.stringify(parsed.content, parsed.data);
      writeFileSync(mdxPath, updated, "utf8");
      console.log(`  ✓ Updated links for ${slug}`);
    } else {
      console.log(`  — No changes for ${slug}`);
    }
  } else if (portfolioJson) {
    // Create a draft stub from portfolio.json
    const frontmatter = {
      title: portfolioJson.title ?? slug,
      slug,
      tier: portfolioJson.tier ?? "build",
      order: portfolioJson.order ?? 99,
      status: portfolioJson.status ?? "Shipped",
      summary: portfolioJson.summary ?? "TODO: add summary",
      role: portfolioJson.role ?? "Builder",
      timeframe: portfolioJson.timeframe ?? "2026",
      stack: portfolioJson.stack ?? [],
      tags: portfolioJson.tags ?? [],
      metric: portfolioJson.metric ?? { value: "—", label: "TODO" },
      outcome: portfolioJson.outcome ?? "TODO: add outcome",
      draft: true,
      links: {
        repo: repoUrl,
        ...(liveUrl ? { live: liveUrl } : {}),
      },
    };

    const body = `\n## Problem\n\nTODO: describe the problem\n\n## Hypothesis\n\nTODO: describe the hypothesis\n\n## What I built\n\nTODO: describe what was built\n\n## Outcome & learning\n\nTODO: describe the outcome\n`;

    const mdxContent = matter.stringify(body, frontmatter);
    writeFileSync(mdxPath, mdxContent, "utf8");
    console.log(`  ✓ Created draft for ${slug}`);
  } else {
    console.log(`  — No portfolio.json found, skipping stub creation for ${slug}`);
  }
}

async function main() {
  console.log("Starting portfolio sync...");
  console.log(`Repos to process: ${syncConfig.repos.length}`);

  for (const entry of syncConfig.repos) {
    try {
      await syncRepo(entry);
    } catch (err) {
      console.error(`  ✗ Error syncing ${entry.slug}: ${err.message}`);
    }
  }

  console.log("\nSync complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
