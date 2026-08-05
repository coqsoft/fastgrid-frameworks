import { Component, ViewChild } from "@angular/core";
import { FastGridComponent } from "fastgrid-angular";

const src = ({ //. All layout and data for grid

   Cfg: {
      id:"DB", //. Grid identification for saving configuration to cookies 
      FixedScroll:2, FixedScrollType:1,    //. When scrolling vertically by larger amount, it rounds scroll to the row height.
      SelectAllType:7,   //. Shows count of selected rows in the SelectRows icon in header
      DeletingRows:2,    //. Shows deleted rows in red
      },
   Body_Cfg: { 
      Sort:"Project,Resource", Alternate:2, AlternateType:2, 
      GroupTree: { Project:"Resource", Resource:"Project", "Project,Resource":"Week" } //, Group:"Project,Resource"
      },
   LeftCols: [
      { D:"Index", id:"Index", VIndex:-3 },
      { D:"Panel", LeftIcons:"SelectRow,DeleteRow,AddRow" }
      ],
   Cols: [
      { id:"Project", Width:250, Type:"String", GroupWidth:-1 },
      { id:"Resource", Width:140, Type:"String", GroupWidth:-1 },
      { id:"Week", Width:70, Type:"Number", GroupWidth:-1 },
      { id:"Hours", Width:70, Type:"Number", Format:"0.###" }
      ],
   DefRows: {
	   Group: { //. Default row for grouping, calculates summary for its group
         NoCalc:1,
         F: { Week: "Grid.GetPartAttr('Body','Tree')=='Week' ? Value : min()+'-'+max()", Hours:"sum(null,null,null,3)" },
         A: { Week: { Type:"String" } }
         }
      },
   Head: [
      { D:"Header", LevelsPart:"Body", V:{ Index:"Idx"}, A: { Panel: { LeftIcons:"SelectRows,DeleteRows,AddRows" } } }, 
      { D:"Filter", A: { Panel: { LeftIcons:"" } } },
      { id:"Sticky", D:"Sticky", CS: { Project:4 }, A: { Panel: { LeftIcons:"" }, Project: { Static:1 } } }, //. Shows parent values when parent moved above body top, for grouped grid
      ],
   Foot:[
      { id:"Summary", NoEdit:1, NoIndex:1,  //. Calculated summary row
         V:{ Project:"Summary" }, CS: { Project:2 }, 
         F:{ Week:"min(null,'Body',null,3)+'-'+max(null,'Body',null,3)", Hours:"sum(null,'Body',null,3)" }, 
         A: { Panel: { LeftIcons:"" }, Week: { Type:"String", Align:1 }, Hours: { Format:"0.##" } } 
         }
      ],
   Body: { StickyRow:"Sticky", StickyCol:"Project" }, //. Assigns Sticky row for Body
   Top:[
      { id:"Data", Cells:"Save,Reload,Print,Pdf,Export,Copy,AddRowEnd,Undo,Redo,Settings" }, "Layout",
      { Cells:[{ D:"GroupList", Width:130, List:{ "":"none", Project:"Project", Resource:"Resource", "Project,Resource": "Project -> Resource"} }] } //. Grouping row 
      ]

   });

const onLoadError : TFGrid["OnLoadError"] = (G,source,code,message,index) => {
   return { IO:{ Message:"Sample node server is not running on localhost:8000<br>You need to install and start node package in <b>./server/</b>" } };
   }

@Component({
   selector:"app-example-server-file-01-file-json",
   standalone:true,
   imports:[ FastGridComponent ],
   templateUrl:"./01-file-json.component.html",
   host:{ class:"Tutorial" }
   })
export class ServerFile_01FileJsonComponent {
   readonly src = src;
   readonly onLoadError = onLoadError as TFGrid["OnLoadError"];

   @ViewChild("gridRef") gridRef!:FastGridComponent;
   }
