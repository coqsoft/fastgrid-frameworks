import { Component, ViewChild } from "@angular/core";
import { FastGridComponent, type FastGridOutputEvent } from "fastgrid-angular";

//. All FastGrid attributes used in src can be found in documentation search at https://www.treegrid.com/FDoc/SearchAttr.html

   //. --- Simple layout and data for sheet  ---
   const src = { //. Sheet configuration
      Cfg: { Style:"Bare" },
      };

   //. --- API definition and usage ---

@Component({
   selector:"app-tutorial-start-04-quick-start-xlsx",
   standalone:true,
   imports:[ FastGridComponent ],
   templateUrl:"./04-quick-start-xlsx.component.html",
   host:{ class:"Tutorial" }
   })
export class Start_04QuickStartXlsxComponent {
   readonly src = src;

   @ViewChild("grid") grid!:FastGridComponent; //. Grid reference received for grid, access the grid object as this.grid

   readValue() : void { alert("Read value from cell [1,A]: "+this.grid.Get(1,"A")); } //. Function called from Read Value button 
   changeValue(grid:FastGridComponent,row:TRow|string|number,col:TCol|string|number,val:any) : void { //. Function called from both Change Value buttons with different parameters
      grid.Set(row,col,"",val,1); 
      }
   readonly onSetValue:TFGrid["OnSetValue"] = (_grid,row,col,value,changes) => { //. FastGrid API event OnSetValue handler. It is assigned as Input event: <fast-grid [onSetValue]="onSetValue" ... It can return value.
      if(changes&&row&&col) console.log("Value "+value+" set to cell ["+row.id+","+col.id+"]"); 
      };
   onClick(e:FastGridOutputEvent<"click">) : void { //. FastGrid API event OnClick handler. It is assigned as Output event: <fast-grid (click)="onClick($event)" ... It cannot return value.
      if(e.row&&e.col) console.log("clicked cell ["+e.row.id+","+e.col.id+"] with value "+e.grid.GetValue(e.row,e.col)); 
      };
   readonly onReady:TFGrid["OnReady"] = grid => { console.log("FastGrid "+grid.id+" is ready"); }; //. FastGrid API event OnReady handler. It is assigned as Input event: <fast-grid [onReady]="onReady" ... It can return value.
   }
