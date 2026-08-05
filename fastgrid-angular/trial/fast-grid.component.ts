/// <reference path="../types/FastGrid.TypeScript.API.d.ts" />
import { Component } from "@angular/core";
import { FastGridComponentBase } from "fastgrid-angular/core";
import { FASTGRID_ENGINE_SOURCE } from "./FGridE.source.generated";
@Component({ selector:"fast-grid", standalone:true, template:"" })
export class FastGridComponent extends FastGridComponentBase {
   private enginePromise:Promise<void>|null = null;

   protected override async ensureEngine() : Promise<TFGrid> {
      type FastGridRuntime = TFGrid & { NoFastGridTag?:number|boolean };
      let FG = (globalThis as typeof globalThis & { FGrid?:FastGridRuntime }).FGrid;
      if(!FG || typeof(FG.FastGrid)!=="function"){
         if(!this.enginePromise) this.enginePromise = Promise.resolve().then(() => {
            const current = (globalThis as typeof globalThis & { FGrid?:FastGridRuntime }).FGrid;
            if(current) current.NoFastGridTag = 1;
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.text = FASTGRID_ENGINE_SOURCE;
            document.head.appendChild(script);
            const loaded = (globalThis as typeof globalThis & { FGrid?:FastGridRuntime }).FGrid;
            if(loaded) loaded.NoFastGridTag = 1;
            });
         await this.enginePromise;
         FG = (globalThis as typeof globalThis & { FGrid?:FastGridRuntime }).FGrid;
         }
      if(!FG || typeof(FG.FastGrid)!=="function") throw new Error("FastGrid engine is not loaded. The trial wrapper could not initialize FGridE.js.");
      FG.NoFastGridTag = 1;
      return FG;
      }
   }
