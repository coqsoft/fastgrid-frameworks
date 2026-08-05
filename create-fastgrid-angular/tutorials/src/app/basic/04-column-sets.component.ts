import { Component } from "@angular/core";
import { FastGridComponent } from "fastgrid-angular";

const src = { //. All layout and data for grid.
      Cfg: { id:"ColSets", FillRest:14 },
      DefCols: { 
         C2: { LeftMarginLeft:4, RightMarginRight:4, MarginRestColor:{ Body: "#BFE" }, MarginLeftColor: { Body:"#BFE" }, MarginRightColor: { Body:"#BFE" } },
         C3: { LeftMarginLeft:9, RightMarginRight:9, MarginLeftColor: { Body:"#EFB" }, MarginRightColor: { Body:"#EFB" } },
         },
      LeftCols: [
         { id:"L_1", Width:100 },
         { id:"L_2", Width:40, Index:2 }
         ],
      Cols: [
         { id:"C1_1", Width:70 },
         { id:"C1_2", Width:50 },
         { id:"C1_3", Width:60 },
         { id:"C1_4", Width:70 },
         { id:"C1_5", Width:50 },
         ],
      Cols$Set2: [
         { id:"C2_1", D:"C2", Width:55 },
         { id:"C2_2", D:"C2", Width:50 },
         { id:"C2_3", D:"C2", Width:50 },
         { id:"C2_4", D:"C2", Width:50 },
         { id:"C2_5", D:"C2", Width:50 },
         ],
      Cols$Set3: [
         { id:"C3_1", D:"C3", Width:45 },
         { id:"C3_2", D:"C3", Width:50 },
         { id:"C3_3", D:"C3", Width:80 },
         { id:"C3_4", D:"C3", Width:50 },
         { id:"C3_5", D:"C3", Width:60 },
         { id:"C3_6", D:"C3", Width:70 },
         ],
      RightCols: [
         { id:"R1_1", Width:55 },
         { id:"R1_2", Width:55 }
         ],
      RightCols$Set3: [
         { id:"R3_1", Width:45 },
         { id:"R3_2", Width:45 }
         ],
      Head: [
         { D:"Header", id:"Header1", LevelsPart:"Body", RS: { L_1:3, L_2:3, R1_1:2, R1_2:2 }, MarginBottom:5, MarginBottomColor:"#53556D" },
         { D:"Header", id:"Header2", S:"Set2" },
         { D:"Header", id:"Header3", S:"Set3", MarginTop:5, MarginTopColor:"#53556D" },
         ],
      DefRows: { 
         S1: { D:"Row", V:{ L_1:"Set1" }, MarginRestColor:"#BFE" },
         S2: { D:"Row", S:"Set2", V:{ L_1:"Set2" }, L:1, FirstMarginTop:4, LastMarginBottom:4, MarginTopColor:"#BFE", MarginBottomColor:"#BFE", MarginRestColor:"#BFE" },
         S3: { D:"Row", S:"Set3", V:{ L_1:"Set3" }, L:2, FirstMarginTop:4, LastMarginBottom:4, MarginTopColor:"#EFB", MarginBottomColor:"#EFB", MarginRestColor:"#EFB" },
         },
      Body: [
         { D:"S1", V:["Set1",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21] }, 
         { D:"S2", V:["Set2",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21] }, 
         { D:"S3", V:["Set3",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21] }, 
         { D:"S3", V:{ L_2:0, C3_1:1, C3_2:2, C3_3:3, C3_4:4, C3_5:5, C3_6:6, R3_1:7, R3_2:8} }, 
         { D:"S2", V:{ L_2:0, C2_1:1, C2_2:2, C2_3:3, C2_4:4, C2_5:5, R1_1:6, R1_2:7 } }, 
         { D:"S1", V:{ L_2:0, C1_1:1, C1_2:2, C1_3:3, C1_4:4, C1_5:5, R1_1:6, R1_2:7 } }, 
         { D:"S1" }, 
         { D:"S2" }, 
         { D:"S2" }, 
         { D:"S3" },
         { D:"S2" }, 
         { D:"S3" }, 
         { D:"S3" }
         ],
      Body_Cfg: { Tree:"L_1" }
   };

@Component({
   selector:"app-tutorial-basic-04-column-sets",
   standalone:true,
   imports:[ FastGridComponent ],
   templateUrl:"./04-column-sets.component.html",
   host:{ class:"Tutorial" }
   })
export class Basic_04ColumnSetsComponent {
   readonly src = src;
   }
