import { Component } from "@angular/core";
import { FastGridComponent } from "fastgrid-angular";

const src = { //. All layout and data for grid.
      Cfg: { id:"FilterTree", IndexList:1 },
      Cols: [ 
         { id:"N", D:"Header", VIndex:3 }, 
         { id:"A", Type:"String", VIndex:1, Width:250, Formula:"Value+Grid.GetAttr(Row,'L')" },
         { id:"B", Type:"String", VIndex:0, Width:250, List:"|zero|one|two|three|four|five|six|seven|eight|nine|ten", IndexList:1, RightIcons:"List" }, 
         { id:"C", Type:"Bool", VIndex:2, Formula:"Grid.GetFirstChild(Row)?0:1" }  
         ], 
      DefRows: {
         LEAF: { },
         },
      DefTools: {
         BOOL: { Type:"Bool", Value:1 },
         RADIO: { Type:"Bool", RadioRow:1, BoolCycle:-1, BoolIcon:"Radio" },
         },
      Top: [ 
         { id:"FilterTree", Cells:"FilterTree" },
         { id:"Data 1", Cells:"Settings,Reload,Print,Pdf,Export,Copy,Paste" }, 
         { id:"Data 2", Cells:"Undo,Redo,Sort,Filter" }, 
         "Layout",
         { id:"Info", Cells: [ "Empty", { D:"Label", Label:"Shown rows:", Formula:"count(null,'Body',null,3) + ' / ' + count(null,'Body',null,11)", TextColor:"blue" } ] },
         { id:"Filters", NewLine:1, FormulaCache:1, Cells: [
            { D:"RADIO", Text:"Show only found", Formula:"(Grid.FilterTree&6)==0", OnChange:"Grid.SetCfgAttr('FilterTree',0|Grid.FilterTree&1);Grid.ReFilter()", Tip:"Shows all found rows regardless on tree" },
            { D:"RADIO", Text:"Show all found", Formula:"(Grid.FilterTree&6)==2", OnChange:"Grid.SetCfgAttr('FilterTree',2|Grid.FilterTree&1);Grid.ReFilter()", Tip:"Shows all found rows including their parents" },
            { D:"RADIO", Text:"Hide all not found", Formula:"(Grid.FilterTree&6)==4", OnChange:"Grid.SetCfgAttr('FilterTree',4|Grid.FilterTree&1);Grid.ReFilter()", Tip:"Shows only found rows that have found parents" },
            { D:"BOOL", Text:"With all children", Formula:"Grid.FilterTree&1", OnChange:"Grid.SetCfgAttr('FilterTree',(Value?1:0)|Grid.FilterTree&6);Grid.ReFilter()", Tip:"Shows also all children of found rows " },
            ]},
         { id:"FilterOptions", FormulaCache:1, Cells: [
            { D:"BOOL", Text:"Filter parents", Formula:"return Grid.GetAttr(Grid.Rows.Filter,null,'FilterD')!='LEAF'", OnChange:"Grid.SetAttr(Grid.Rows.Filter,null,'FilterD',Value?'':'LEAF',1);Grid.ReFilter()", Tip:"Filters rows that have children" },
            { D:"BOOL", Text:"Filter leaf", Formula:"return Grid.GetAttr(Grid.Rows.Filter,null,'FilterD')!='Row'", OnChange:"Grid.SetAttr(Grid.Rows.Filter,null,'FilterD',Value?'':'Row',1);Grid.ReFilter()", Tip:"Filter rows that don't have children" },
            { D:"BOOL", Text:"Color filtered", Formula:"Grid.ColorFilter ? 1 : 0", OnChange:"Grid.SetCfgAttr('ColorFilter',Value?3:0);Grid.ReFilter()", Tip:"Color the rows that fulfill the filter condition" },
            ] }
         ],
      Head: [
         { D:"Header", id:"Header", V: { N:"ID", A:"Tree", B:"Value", C:"Leaf" } }, 
         { D:"Filter", id:"Filter", V: { B:"1;2;7;10" }, Filter: { B:1 }, NoIndex:2,
            A: { 
               N:"FilterAction", 
               A: { ListMenu: { Script: { Columns:2, Items:"|*FilterOff|*RowsAll" } }, Range:1, DefaultFilter:1, RightIcons:"List" }, 
               B: { Range:1, DefaultFilter:1, FilterRaw:1 } 
               },
            }
         ],
      Media: {
         Mobile: { 
            Cols: [{ id:"A", Width:180 }, { id:"B", Width:180 }]
            }
         },
      Body_Cfg: { Tree:"A" },
      Body: [ 
         { L:0, V:[ 1, "a" ] },
         { L:1, V:[ 1, "aa" ] },
         { L:2, V:[ 1, "aaa" ], D:"LEAF" },
         { L:2, V:[ 2, "aab" ], D:"LEAF" },
         { L:2, V:[ 3, "aac" ], D:"LEAF" },
         { L:1, V:[ 1, "ab" ] },
         { L:2, V:[ 1, "aba" ], D:"LEAF" },
         { L:2, V:[ 2, "abb" ], D:"LEAF" },
         { L:2, V:[ 3, "abc" ], D:"LEAF" },
         { L:1, V:[ 1, "ac" ] },
         { L:2, V:[ 1, "aca" ], D:"LEAF" },
         { L:2, V:[ 2, "acb" ], D:"LEAF" },
         { L:2, V:[ 3, "acc" ], D:"LEAF" },

         { L:0, V:[ 2, "b" ] },
         { L:1, V:[ 4, "ba" ] },
         { L:2, V:[ 7, "baa" ], D:"LEAF" },
         { L:2, V:[ 8, "bab" ], D:"LEAF" },
         { L:1, V:[ 5, "bb" ] },
         { L:2, V:[ 6, "bba" ], D:"LEAF" },
         { L:2, V:[ 8, "bbb" ], D:"LEAF" },

         { L:0, V:[ 3, "c" ] },
         { L:1, V:[ 3, "ca" ] },
         { L:2, V:[ 6, "caa" ] },
         { L:3, V:[ 10, "caaa" ], D:"LEAF" },
         { L:1, V:[ 4, "cb" ], D:"LEAF" },
         { L:1, V:[ 5, "cc" ] },
         { L:2, V:[ 5, "cca" ], D:"LEAF" },
         { L:2, V:[ 6, "ccb" ], D:"LEAF" },
         { L:2, V:[ 7, "ccc" ] },
         { L:3, V:[ 6, "ccca" ] },
         { L:4, V:[ 9, "cccaa" ], D:"LEAF" },
         { L:3, V:[ 8, "cccb" ], D:"LEAF" },
         ], 
   };

@Component({
   selector:"app-tutorial-filter-03-filtering-tree",
   standalone:true,
   imports:[ FastGridComponent ],
   templateUrl:"./03-filtering-tree.component.html",
   host:{ class:"Tutorial" }
   })
export class Filter_03FilteringTreeComponent {
   readonly src = src;
   }
