import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REQUIRED_PAGES = ["/", "/attribution"];
const REQUIRED_ASSETS = [
  "/assets/brand/ldw-logo.svg",
  "/assets/icons/moon.svg",
  "/assets/icons/sun.svg",
];

async function listFiles(directory, prefix = "") {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const relative = path.posix.join(prefix, entry.name);
    if (entry.isDirectory()) {
      return listFiles(path.join(directory, entry.name), relative);
    }
    return entry.isFile() ? [relative] : [];
  }));
  return files.flat();
}

export default function health() {
  let config;
  let buildOutput;

  return {
    name: "static-health",
    hooks: {
      "astro:config:done": (options) => {
        config = options.config;
        buildOutput = options.buildOutput;
      },
      "astro:build:done": async ({ dir }) => {
        if (buildOutput !== "static") {
          throw new Error("The health report requires a static Astro build.");
        }

        const files = await listFiles(fileURLToPath(dir));
        const output = new Set(files);
        const missingPages = REQUIRED_PAGES.filter((page) => {
          const route = page.replace(/^\/|\/$/g, "");
          return !output.has(route ? `${route}/index.html` : "index.html");
        });
        const missingAssets = REQUIRED_ASSETS.filter((asset) => !output.has(asset.slice(1)));
        const healthy = missingPages.length === 0 && missingAssets.length === 0;
        const packageInfo = JSON.parse(await readFile(new URL("package.json", config.root), "utf8"));
        const sha = [
          process.env.SITE_VERSION_REF,
          process.env.GITHUB_EVENT_NAME === "release" ? undefined : process.env.GITHUB_SHA,
          process.env.VERCEL_GIT_COMMIT_SHA,
        ]
          .find((value) => value && /^[a-f0-9]{7,40}$/i.test(value)) ?? null;
        const environment = [process.env.DEPLOYMENT_ENV, process.env.VERCEL_ENV, process.env.NODE_ENV]
          .find((value) => ["production", "preview", "development", "test"].includes(value)) ?? "production";

        // Uptime Kuma: $.status must be "healthy"; missing paths are in $.missing_pages and $.missing_assets.
        const report = {
          schema: "1.0",
          service: config.site ? new URL(config.site).hostname : packageInfo.name,
          status: healthy ? "healthy" : "unhealthy",
          build: {
            version: sha,
            timestamp: new Date().toISOString(),
            environment,
          },
          site: {
            generator: "Astro",
            mode: "static",
            pages: files.filter((file) => file.endsWith(".html")).length,
            assets: files.filter((file) => !file.endsWith(".html") && file !== "health.json").length,
          },
          checks: {
            build: "passed",
            required_pages: missingPages.length ? "failed" : "passed",
            required_assets: missingAssets.length ? "failed" : "passed",
          },
          missing_pages: missingPages,
          missing_assets: missingAssets,
        };

        await writeFile(new URL("health.json", dir), `${JSON.stringify(report, null, 2)}\n`);
        if (!healthy) {
          throw new Error(`Health validation failed: ${[...missingPages, ...missingAssets].join(", ")}`);
        }
      },
    },
  };
}
