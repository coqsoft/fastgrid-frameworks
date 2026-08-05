import js from "@eslint/js";
import globals from "globals";
import pluginSvelte from "eslint-plugin-svelte";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
   globalIgnores(["dist"]),
   js.configs.recommended,
   ...pluginSvelte.configs["flat/recommended"],
   {
      files:["**/*.{js,svelte}"],
      languageOptions:{
         globals:globals.browser,
         },
      },
   ]);
