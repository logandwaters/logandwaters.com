import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import health from "./scripts/health.mjs";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
  output: "static",

  site: 'https://logandwaters.com/',

  integrations: [health(), sitemap()],

  build: {
    format: "directory",
  },

  markdown: {
    processor: unified(),
  },
});