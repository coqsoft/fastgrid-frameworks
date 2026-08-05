import js from "@eslint/js";
import globals from "globals";
import svelte from "eslint-plugin-svelte";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  js.configs.recommended,
  ...svelte.configs["flat/recommended"],
  {
    files: ["**/*.{js,mjs,cjs,svelte}"],
    languageOptions: {
      globals: globals.browser
    }
  }
]);
