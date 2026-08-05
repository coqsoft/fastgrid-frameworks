import { Component } from "@angular/core";
import { FastGridComponent } from "fastgrid-angular";

const src = { //. All layout and data for grid.
      Cfg: { id:"Cols", ColTree:1, OverScroll:2 },
      ColParts:[
         { Clear:1 },
         { id:"C1", Type:"Cols" },
         { id:"S1", Type:"Scroll" },
         { id:"C2", Type:"Cols", Rel:1 },
         { id:"C3", Type:"Cols",Rel:1 },
         { id:"S2", Type:"Scroll" },
         { id:"C4", Type:"Cols" },
         { id:"C5", Type:"Cols" },
         { id:"S3", Type:"Scroll" },
         ],
      C1: [
         { id:"1-1" },
         { id:"1-2" },
         ],
      C2: [
         { id:"2-1" },
         { id:"2-2",L:1 },
         { id:"2-3",L:2 },
         { id:"2-4",L:1 },
         { id:"2-5" },
         { id:"2-6",L:1 },
         ],
      C3: [
         { id:"3-1" },
         { id:"3-2",L:1 },
         { id:"3-3" },
         { id:"3-4" },
         { id:"3-5",L:1 },
         { id:"3-6",L:2 },
         ],
      C4: [
         { id:"4-1" },
         { id:"4-2" },
         ],
      C5: [
         { id:"5-1" },
         { id:"5-2", L:1 },
         { id:"5-3", L:2 },
         ],
      Head:[
         { D:"Header" }
         ],
      Body: [
         {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, 
         ]
   };

@Component({
   selector:"app-tutorial-basic-03-columns",
   standalone:true,
   imports:[ FastGridComponent ],
   templateUrl:"./03-columns.component.html",
   host:{ class:"Tutorial" }
   })
export class Basic_03ColumnsComponent {
   readonly src = src;
   }
