import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "node:path";

export default defineConfig({
   plugins:[svelte()],
   resolve:{
      dedupe:["svelte"]
      },
   build:{
      lib:{
         entry:{
            "fastgrid-svelte":path.resolve(import.meta.dirname,"src/index.js"),
            "registered":path.resolve(import.meta.dirname,"src/registered.js")
            },
         formats:["es","cjs"],
         fileName:(format,entryName)=>{
            if(format==="es") return `${entryName}.js`;
            if(format==="cjs") return `${entryName}.cjs`;
            return `${entryName}.${format}.js`;
            }
         },
      rollupOptions:{
         external:(id)=>id==="svelte"||id.startsWith("svelte/")
         }
      }
   });
