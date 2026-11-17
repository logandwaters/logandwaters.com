import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import health from "./scripts/health.mjs";

export default defineConfig({
  output: "static",

  integrations: [health()],

  build: {
    format: "file",
  },

  markdown: {
    processor: unified(),
  },
});
