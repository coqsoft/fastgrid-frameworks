import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
   cacheDir: path.resolve(import.meta.dirname, "../../node_modules/.vite/vue-tutorials"),
   plugins: [vue()],
   });
