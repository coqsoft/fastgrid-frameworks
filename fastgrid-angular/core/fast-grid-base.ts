/// <reference path="../types/FastGrid.TypeScript.API.d.ts" />
import { AfterViewInit, Directive, ElementRef, Input, NgZone, OnChanges, OnDestroy, PLATFORM_ID, SimpleChanges, inject } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import type { FastGridEvents, FastGridSource } from "./fast-grid.types";
import { FASTGRID_EVENT_INPUTS, FASTGRID_EVENT_NAMES, FASTGRID_EVENT_OUTPUTS, FASTGRID_EVENT_PAYLOAD_FACTORIES, FastGridEventBindings } from "./fast-grid-events.generated";
@Directive({ standalone:true })
export abstract class FastGridComponentBase extends FastGridEventBindings implements AfterViewInit, OnChanges, OnDestroy {
   private readonly element = inject(ElementRef<HTMLElement>);
   private readonly zone = inject(NgZone);
   private readonly platformId = inject(PLATFORM_ID);
   private createToken = 0;
   private viewReady = false;
   private destroyed = false;

   @Input({ required:true }) src!:FastGridSource;
   @Input() events?:FastGridEvents;
   @Input() runInsideAngular = true;

   grid:TGrid|null = null;

   get api() : TGrid|null { return this.grid; }
   getGrid() : TGrid|null { return this.grid; }

   get id() : TGrid["id"] { return this.requireGrid().id; }
   get Index() : TGrid["Index"] { return this.requireGrid().Index; }
   get Cols() : TGrid["Cols"] { return this.requireGrid().Cols; }
   get Rows() : TGrid["Rows"] { return this.requireGrid().Rows; }
   get FRow() : TGrid["FRow"] { return this.requireGrid().FRow; }
   get FCol() : TGrid["FCol"] { return this.requireGrid().FCol; }
   get Dialog() : TGrid["Dialog"] { return this.requireGrid().Dialog; }
   get Parent() : TGrid["Parent"] { return this.requireGrid().Parent; }

   protected override requireGrid() : TGrid {
      if(!this.grid) throw new Error("FastGrid is not initialized yet.");
      return this.grid;
      }

   ngAfterViewInit() : void { this.viewReady = true; void this.createGrid(); }
   ngOnChanges(changes:SimpleChanges) : void { if(this.viewReady && changes["src"] && !changes["src"].firstChange) void this.createGrid(); }
   ngOnDestroy() : void { this.destroyed = true; this.createToken++; this.dispose(); }
   async reload(src:FastGridSource = this.src, type?:number, onfinish?:any, transparent?:number|boolean) : Promise<TGrid|null> {
      if(!this.grid){ this.src = src; await this.createGrid(src); return this.grid; }
      this.runOutsideAngular(() => this.grid?.Reload(src,type,onfinish,transparent));
      return this.grid;
      }
   dispose() : void { const grid = this.grid; this.grid = null; if(grid) this.runOutsideAngular(() => grid.Dispose(1)); }

   protected abstract ensureEngine() : Promise<TFGrid>;

   private async createGrid(src:FastGridSource = this.src) : Promise<void> {
      if(!isPlatformBrowser(this.platformId) || this.destroyed) return;
      const token = ++this.createToken;
      this.dispose();
      const FG = await this.ensureEngine() as TFGrid & { AngularId?: number; };
      if(this.destroyed || token!==this.createToken) return;
      FG.AngularId = (FG.AngularId ?? 0) + 1;
      const setGridReference = (grid:TGrid|null|undefined) : void => {
         if(!grid) return;
         if(this.destroyed || token!==this.createToken){ grid.Dispose(1); return; }
         if(!grid.Component) grid.Component = this;
         this.grid = grid;
         };
      const hostId = this.element.nativeElement.id;
      const E : { Events:Record<string,(...args:any[])=>any>; Sheet?:string, Cfg?:{ id:string; }; } = { Sheet:".", Events:{}, ...(hostId ? { Cfg:{ id:hostId } } : {}) };
      E.Events['OnTag_AA'] = (grid:TGrid,tag?:HTMLElement) => { setGridReference(grid); return this.dispatchEvent("OnTag",[grid,tag]); };
      for(const eventName of FASTGRID_EVENT_NAMES) {
         const inputName = FASTGRID_EVENT_INPUTS[eventName];
         const direct = inputName ? (this as any)[inputName] : undefined;
         const fromMap = this.events?.[eventName as keyof FastGridEvents];
         const outputName = FASTGRID_EVENT_OUTPUTS[eventName];
         const output = outputName ? (this as any)[outputName] : undefined;
         const outputDefined = !!output && (output.observed===true || output.observers?.length>0);
         if(typeof(direct)==="function" || typeof(fromMap)==="function" || outputDefined) {
            E.Events[eventName+"_A"] = (...args:any[]) => this.dispatchEvent(eventName,args);
            }
         }
      const setGrid = (grid:TGrid|null|undefined) : void => { setGridReference(grid); };
      const grid = this.runOutsideAngular(() => FG.FastGrid(FG.MergeSources(FG.RunSources(src),E),this.element.nativeElement,setGrid));
      setGrid(grid);
      }

   private dispatchEvent(eventName:string,args:any[]) : any {
      const invoke = () => {
         const inputName = FASTGRID_EVENT_INPUTS[eventName];
         const direct = inputName ? (this as any)[inputName] : undefined;
         const fromMap = this.events?.[eventName as keyof FastGridEvents];
         const callback = typeof(direct)==="function" ? direct : fromMap;
         const result = typeof(callback)==="function" ? callback(...args) : undefined;
         const outputName = FASTGRID_EVENT_OUTPUTS[eventName];
         const output = outputName ? (this as any)[outputName] : undefined;
         const factory = FASTGRID_EVENT_PAYLOAD_FACTORIES[eventName];
         if(output && typeof(output.emit)==="function"){ output.emit(factory ? factory(args) : { args }); }
         return result;
         };
      return this.runInsideAngular ? this.zone.run(invoke) : invoke();
      }
   private runOutsideAngular<T>(callback:() => T) : T { return this.zone.runOutsideAngular(callback); }
   }
