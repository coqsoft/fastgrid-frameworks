import { Component, ViewChild } from "@angular/core";
import { FastGridComponent, type FastGridOutputEvent } from "fastgrid-angular";

//. All FastGrid attributes used in src can be found in documentation search at https://www.treegrid.com/FDoc/SearchAttr.html

   //. --- Simple layout and data for grid 1  ---
   const src1 = { //. All layout and data for grid 1.
      Cols:["A","B","C"], //. Simple columns definition, just ids, without any attributes
      Head:[ "Header" ],  //. Adds header to grid to top, without defining captions, so column ids are shown
      Body:[ { V:[100,200,300] }, { V:{A:400,B:500,C:600} }, { V:"|700|800|900" } ] //. Simple data for 3 rows and 3 columns. shows 3 ways of passing values to grid
      };

   //. --- Layout and data for grid 2  ---
   const src2layout = { //. Layout for grid 2 (usually in static object or file)
      Cfg: { id:"Advanced_Grid", Style:"Blue", StyleIcons:"Lucide", Focused:"R1,C2" }, //. Grid configuration sets theme, grid id for FastGrid API, and focuses given cell on start
      DefCols: { //. Defines default columns with attributes that will be inherited by all or specific columns. More information about defaults in FastGrid at https://www.treegrid.com/FDoc/Defaults.htm
         Col: { Width:80 },                     //. Col is special default inherited by all columns without D attribute. Sets width to all columns.
         RedText: { D:"Col", TextColor:"red" }  //. Sets red text to all columns with D:"RedText". Inherits Col default. It is possible to let default to inherit more other defaults.
         }, 
      DefRows: { //. Defines default rows with attributes that will be inherited by all or specific rows. More information about defaults in FastGrid at https://www.treegrid.com/FDoc/Defaults.htm
         Row: { },                              //. Row is special default inherited by all rows without D attribute. Here is just empty
         Child: { TextStyle:2 }                 //. Sets italic text to all rows with D:"Child". It is possible to let default to inherit more other defaults.
         },
      LeftCols: [ //. Defines columns in the left section. The column sections can be re-defined in ColParts. More information about FastGrid parts at https://www.treegrid.com/FDoc/Layout.htm
         { D:"Index" },                         //. Defines Index columns showing row indexes
         { D:"Panel", LeftIcons:"SelectRow,DeleteRow,AddRow" }, //. Defines Panel column with specified row control buttons
         { id:"C1", Width:130 }                 //. Simple String column definition. It shows tree lines and buttons as defined in Body { Tree:"C1" }
         ], 
      Cols: [ //. Defines columns in the main / middle section
         { id:"C2", Type:"Number", Format:",0.00" }, //. Column with formatted number
         { id:"C3", Type:"Date", RightIcons:"Date", Width:120, Format:"yyyy-MM-dd" }, //. Column with formatted date
         { id:"C4", List:"|Red|Green|Blue", LeftIcons:"List" }, //. Column with simple enumeration list and popup button on the left
         { id:"C5", List: { 1:"One", 2:"Two", 3:"Three", 4:"Four", 5:"Five" }, Range:1, RightIcons:"List", Button:"List", Width:120 }, //. Column with enumeration list with keys and more items in value (Range:1) and popup button on the right
         { id:"C6", Type:"Bool" }  //. Simple boolean / checkbox column definition. It should be filled by values 0 / 1, not true / false
         ], 
      RightCols: [ //. Defines columns in the right section.
         { id:"C7", D:"RedText", Width:50, Formula:"C6 ? C2 : 0" } //. Text column with explicitly set width and inheriting red text from RedText default. Row can inherit only one default, but the default itself can inherit more other defaults.
         ], 
      Head: [ //. Defines rows in the top Head section. The row sections can be re-defined in RowParts. More information about FastGrid parts at https://www.treegrid.com/FDoc/Layout.htm
         { D:"Header", V: { C1:"Left", C2:"Number", C3:"Date", C4:"List", C5:"List + keys", C6:"Boolean", C7:"Right" } }, //. Adds header to grid to top, defines the column captions
         { D:"Filter", A: { C3: { DefaultDate:"7/2/2026" }, C4: { RightIcons:"List" }, C5: { LeftIcons:"" }, C6: { LeftIcons:"" } } } //. Filter row to filter by given columns and rows. In C4 moves the List icon from left to right and in C5 and C6 hides the filter icon as it is usually not needed for lists and bools.
         ],
      Foot: [ { id:"Footer", F: { C2:"sum(null,'Body',null,1)", C7:"sum(null,'Body',null,1)" }, A: { C2: { NoEdit:1 }, C3: { Type:"String", RightIcons:"" } } } ], //. Row in grid footer. Calculates summary in column C2 and hides the date in C3
      Top: [ "AI" ],        //. Shows toolbar AI on top
      Bottom: [ //. Shows toolbars Data1 and Settings and custom toolbar with custom icon Custom1 bottom the grid
         { Cells: [{ 
            id:"Custom1", IconHeight:17, Value:"Custom", OnClick:"Grid.Component.increaseValues2()", Tip:"Custom toolbar cell calls Increase values", 
            Icon:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNyAxNyI+PHBhdGggc3Ryb2tlPSIjNjg5IiBzdHJva2Utd2lkdGg9IjIiIGQ9Im0zLjUsM3Y2bTAsM3YybTUsLTExdjZtMCwzdjJtNSwtMTF2Nm0wLDN2MiIvPjwvc3ZnPg==" 
            }] },
         "Data1", "Settings" 
         ], 
      Body: {               //. Body as object defines body attributes (as array it defines rows). To use both definitions in one json, use any _postfix, e.g. { Body:[...], Body_Cfg: { ... } }
         Tree:"C1"          //.  Shows row tree in column C1.
         }
      };
   const src2data = { //. Data for grid 2 (usually read from database or url, there can be also more data objects passed to FastGrid, more information at https://www.treegrid.com/FDoc/Data.htm#Create)
      //. Defines data rows in main Body section
      //. L attribute defines row level in tree, 0 - means root. Row with higher L automatically belongs as a child to above row with lower L. More information about row and column tree at https://www.treegrid.com/FDoc/Tree.htm
      Body: [ 
         { id:"R1", L:0, V:{ C1:"Row 1", C2:20.5, C3:"7/1/2026", C4:"Red", C5:2, C6:1 } }, //. Root row with values in V, assigned to cells as column ids 
         { id:"R1-1", L:1, D:"Child", Color:"lime",                                        //. Child row of R1, sets its background color to lime, inherits default row Child defining italic text style
            V: { C1:"Row 1:1", C2:123.456789, C3:"7/2/2026", C4:"Red", C5:"2;3", C6:0 }, 
            A:{ C2: { Color:"aqua", TextStyle:1 } }                                        //. Sets cell attributes, background color to aqua and italic style in cell in column C2
            }, 
         { id:"R1-1-2", L:2, D:"Child", V:{ C1:"Row 1:1:1", C2:-12.3, C3:"7/7/2026", C4:"Red", C5:1, C6:1 } },                //. Child row of R1-1, grand child row of R1
         { id:"R1-2", L:1, D:"Child", Selected:1, V:{ C1:"Row 1:2", C2:5, C3:"7/3/2026", C4:"Red", C5:3, C6:1 } },            //. Child row of R1. It is marked as selected on start
         { id:"R2", L:0, V:{ C1:"Row 2", C2:24.12, C3:"7/2/2026", C4:"Red", C5:"1;4;5", C6:0 }, RS: { C2:3 }, CS: { C2:2 } }, //. Root row, spans cell C2 to three rows and two columns
         { id:"R3", L:0, V:{ C1:"Row 3", C2:-100, C3:"7/1/2026", C4:"Red", C5:"2;5", C6:0 } }, 
         { id:"R4", L:1, V:{ C1:"Row 3:1", C2:23, C3:"6/29/2026", C4:"Red", C5:"3", C6:1 } },                                 //. Child row of R3
         ] 
      };
   const src2 = [src2layout,src2data];

   //. --- API definition and usage ---

@Component({
   selector:"app-tutorial-start-02-advanced-start-grid",
   standalone:true,
   imports:[ FastGridComponent ],
   templateUrl:"./02-advanced-start-grid.component.html",
   host:{ class:"Tutorial" }
   })
export class Start_02AdvancedStartGridComponent {
   readonly src1 = src1;
   readonly src2layout = src2layout;
   readonly src2data = src2data;
   readonly src2 = src2;

   @ViewChild("grid1") grid1!:FastGridComponent; //. Grid reference received for grid 1, access the grid object as this.grid
   @ViewChild("grid2") grid2!:FastGridComponent; //. Grid reference received for grid 2, access the grid object as this.grid

   readValue1() : void { alert("Read value from grid1 [1,A]: "+this.grid1.Get(1,"A")); } //. Function called from Read Value 1 button
   readValue2() : void { alert("Read value from grid2 [R1,C1]: "+this.grid2.Get("R1","C1")); } //. Function called from Read Value 2 button
   changeValue(grid:FastGridComponent,row:TRow|string|number,col:TCol|string|number,val:any) : void { //. Function called from both Change Value buttons with different parameters
      grid.Set(row,col,"",val,1); 
      }
   increaseValues2() : void { //. Function called from Increase Value 2 button. Demonstrates API usage, increases all numbers by 1 and all dates by 1 day
      const grid = this.grid2, cols = grid.IterAll("C");
      grid.IterAll("Body",(row:TRow) => {
         for(var i=0;i<cols.length;i++){
            const col = cols[i], type = grid.GetAttr(row,col,"Type"); let val = grid.GetValue(row,col);
            if(type=="Number") grid.SetValue(row,col,val-0+1,1);
            else if(type=="Date"){ val = new Date(val-0?val:grid.StringToDate(val)); val.setUTCDate(val.getUTCDate()+1); grid.SetValue(row,col,val-0,1); }
            }
         });
      }
   onSetValue1(e:FastGridOutputEvent<"setValue">) : void { //. FastGrid API event OnSetValue handler assigned to the grid 1. It is assigned as Output event: <fast-grid (setValue)="onSetValue1($event)" ... It cannot return value.
      if(e.changes&&e.row&&e.col) console.log("Value "+e.value+" set in grid 1 to ["+e.row.id+","+e.col.id+"]"); 
      };
   readonly onSetValue2:TFGrid["OnSetValue"] = (_grid,row,col,value,changes) => { //. FastGrid API event OnSetValue handler assigned to the grid 2. It is assigned as Input event: <fast-grid [onSetValue]="onSetValue2" ... It can return value.
      if(changes&&row&&col) console.log("Value "+value+" set in grid 2 to ["+row.id+","+col.id+"]"); 
      };
   readonly onClick:TFGrid["OnClick"] = (grid,row,col) => {  //. FastGrid API event OnClick handler assigned to both grids. It is assigned as Input event: <fast-grid [onClick]="onClick" ... It can return value.
      if(row&&col) console.log("clicked grid "+(grid===this.grid1.grid?1:2)+" ["+row.id+","+col.id+"]"); 
      };
   onReady(e:FastGridOutputEvent<"ready">) : void { //. FastGrid API event OnReady handler. Called on loading of both grids.  It is assigned as Output event: <fast-grid (ready)="onReady($event)" ... It cannot return value.
      console.log("grid "+(e.grid.Index+1)+" [id: "+e.grid.id+"] is ready"); 
      };
   onTag(event:FastGridOutputEvent<"tag">) : void { event.grid.Component = this; } //. To permit calling increaseValues2 from OnClick Custom1 toolbar icon, so it is passed to <fast-grid> grid 2
   }
