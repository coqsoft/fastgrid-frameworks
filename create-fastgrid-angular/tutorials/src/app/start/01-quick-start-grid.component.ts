import { Component, ViewChild } from "@angular/core";
import { FastGridComponent, type FastGridOutputEvent } from "fastgrid-angular";

@Component({
   selector:"app-root",
   standalone:true,
   imports:[ FastGridComponent ],
   templateUrl:"./01-quick-start-grid.component.html"
   })
export class Start_01QuickStartGridComponent {

   //. All FastGrid attributes used in src can be found in documentation search at https://www.treegrid.com/FDoc/SearchAttr.html

   //. --- Simple layout and data for grid  ---
   readonly src = {
      Cols:["A","B",{id:"C",Width:80}], //. Simple columns definition
      Head:[ "Header" ],                //. Adds header to grid to top, without defining captions, so column ids are shown
      Body:[ { V:[100,200,300] }, { V:{A:400,B:500,C:600} }, { V:"|700|800|900" } ], //. Simple data for 3 rows and 3 columns. shows 3 ways of passing values to grid
      };

   @ViewChild(FastGridComponent) grid! : FastGridComponent; //. Grid reference received for grid, access the grid object directly as this.grid

   //. --- API definition and usage ---
   readValue() : void { alert("Read value from cell [1,A]: "+this.grid.Get(1,"A")); } //. Function called from Read Value button 
   changeValue(grid:FastGridComponent,row:TRow|string|number,col:TCol|string|number,val:any) : void {  //. Function called from both Change Value button with different parameters
      grid.Set(row,col,"",val,1);  
      } 
   onSetValue(event:FastGridOutputEvent<"setValue">) : void { //. FastGrid API event OnSetValue handler, output event handler assigned to the grid in ( )
      if(event.changes) console.log("Value "+event.value+" set to cell ["+event.row?.id+","+event.col?.id+"]"); 
      } 
   onEndEdit: TFGrid["OnEndEdit"] = (grid,row,col,value,save) => { //. Definition of event handler returning value, Input event handler assigned to the grid in [ ]
         if(!save||!value||!isNaN(Number(value))) return null; //. Number or empty or cancel, finishes editing normally
         grid.ShowMessage("Enter string?","Confirm",(but:string) => { if(but==="Ok") grid.EndEdit(1,1); }); //. String, asks for accept editing
         return true; //. Continues editing
         };
   onClick(event:FastGridOutputEvent<"click">) : void { if(event.row&&event.col) console.log("Clicked",event.row.id,event.col.id); } //. FastGrid API event OnClick handler, output event handler assigned to the grid in ( )
   onReady(event:FastGridOutputEvent<"ready">) : void { console.log("FastGrid "+event.grid.id+" is ready"); } //. FastGrid API event OnReady handler, output event handler assigned to the grid in ( )
   }
