import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: {
        "fastgrid-react": path.resolve(import.meta.dirname, "src/index.js"),
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
      external: [
        "react",
        "react/jsx-runtime"
      ],
      output: {
        globals: {
          react: "React"
        }
      }
    }
  }
});