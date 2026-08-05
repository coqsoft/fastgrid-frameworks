import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: {
        "fastgrid-vue": path.resolve(import.meta.dirname, "src/index.js"),
        "registered": path.resolve(import.meta.dirname, "src/registered.js")
      },
      formats: ["es", "cjs"],
      fileName: (format, entryName) => {
        if (format === "es") return `${entryName}.js`;
        if (format === "cjs") return `${entryName}.cjs`;
        return `${entryName}.${format}.js`;
      }
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue"
        }
      }
    }
  }
});
