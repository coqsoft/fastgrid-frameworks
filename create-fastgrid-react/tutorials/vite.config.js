import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
   cacheDir: path.resolve(import.meta.dirname, "../../node_modules/.vite/react-tutorials"),
   plugins: [react()],
   })
