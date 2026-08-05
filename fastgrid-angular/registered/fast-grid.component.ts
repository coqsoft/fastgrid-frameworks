/// <reference path="../types/FastGrid.TypeScript.API.d.ts" />
import { Component } from "@angular/core";
import { FastGridComponentBase } from "fastgrid-angular/core";
@Component({ selector:"fast-grid", standalone:true, template:"" })
export class FastGridComponent extends FastGridComponentBase {
   protected override async ensureEngine() : Promise<TFGrid> {
      type FastGridRuntime = TFGrid & { NoFastGridTag?:number|boolean };
      const FG = (globalThis as typeof globalThis & { FGrid?:FastGridRuntime }).FGrid;
      if(!FG || typeof(FG.FastGrid)!=="function") throw new Error("FastGrid engine is not loaded. Load the registered FGridE.js before importing from 'fastgrid-angular/registered'.");
      FG.NoFastGridTag = 1;
      return FG;
      }
   }
