import { Component, ViewChild } from "@angular/core";
import { FastGridComponent, type FastGridOutputEvent } from "fastgrid-angular";

//. All FastGrid attributes used in src can be found in documentation search at https://www.treegrid.com/FDoc/SearchAttr.html

   //. --- Simple layout and data for sheet  ---
   const src = { //. All layout and data for sheet.
      Cfg: { SheetJs:1, Book:'QuickSheet' }, //. SheetJs is used to set to sheet mode, if data is coming from json or csv and not from xlsx.
      Sheets:{
         Sheet1: { Body:[ { V:[100,200,300] }, { V:{ A:400, B:500, C:600 } }, { V:"|700|800|900" } ] }, //. Simple data for the first sheet for 3 rows and 3 columns. Shows 3 ways of passing values to grid. In sheet the columns are always named as A, B, C,...
         "Sheet 2": { Body:[ { V:['AAA','BBB','CCC'] }, { V:"~DDD~EEE~FFF~GGG" } ] } //. Simple data for the second sheet
         }
      };

   //. --- API definition and usage ---

@Component({
   selector:"app-tutorial-start-03-quick-start-sheet",
   standalone:true,
   imports:[ FastGridComponent ],
   templateUrl:"./03-quick-start-sheet.component.html",
   host:{ class:"Tutorial" }
   })
export class Start_03QuickStartSheetComponent {
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
