import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";

export default defineConfig({
  cacheDir: path.resolve(import.meta.dirname, "../../node_modules/.vite/vue-quick-start-typescript"),
  plugins: [vue()]
});
