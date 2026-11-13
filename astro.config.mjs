import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";

export default defineConfig({
  output: "static",

  build: {
    format: "file",
  },

  markdown: {
    processor: unified(),
  },
});
