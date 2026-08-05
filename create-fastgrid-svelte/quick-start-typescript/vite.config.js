import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "node:path";

export default defineConfig({
  cacheDir: path.resolve(import.meta.dirname, "../../node_modules/.vite/svelte-quick-start-typescript"),
  plugins: [svelte()]
});
