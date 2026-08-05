import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
   globalIgnores(["dist"]),
   js.configs.recommended,
   ...pluginVue.configs["flat/recommended"],
   {
      files:["**/*.{js,vue}"],
      languageOptions:{
         globals:globals.browser,
         },
      },
   ]);
