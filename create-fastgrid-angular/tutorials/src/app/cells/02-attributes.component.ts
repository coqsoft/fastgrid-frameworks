import { Component } from "@angular/core";
import { FastGridComponent } from "fastgrid-angular";

const src = { //. All layout and data for grid.
      Events: { 
         OnGetAttr: function(G:TGrid,row:TRow,col:TCol,attr:string) { 
            return row&&row.id==13&&attr=="Color"&&col&&col.id>"A"&&col.id<="F" ? "#"+col.id+col.id+col.id : col&&attr=="Color"&&col.id=="T5" ? "#AAA" : null; 
            }
         },
      Cfg : { id: "Attributes", Texts:["Red","Green","Blue"], HideVScroll:1, PrintToolbars:"-,Testbar" }, 
      DefTools: { Edit: { Width:50 }, EditA: { D:"Edit", Color:"#8F8" } }, 
      DefCols: { Col: { Width:43 } },
      DefCells: { 
         "" : { },
         Red: { Color:"#FAA" },
         Green: { Color:"#AFA" },
         Blue: { Color:"#AFF"},
         4: { Color:"#FDA" },
         R8B: { Color:"#D77" },
         R8C: { Color:"#7D7" },
         R8D: { Color:"#77D" },
         R8E: { Color:"#DA7" },
         R9: { ColorFormula:"{F:'#DDD',G:'#CCC',H:'#BBB',I:'#AAA',J:'#999'}[Col.id]||''" },
         R9C: { ColorFormula:"Value%2 ? '#FAA':'#AAF'" }, 
         R9E: { ColorFormula:"Value<0 ? '#FAA':'#AAF'" }
         },
      Cols: [
         { id:"A", Width:100 },
         { id:"B", BCode:3, DA:"B" },
         { id:"C", BCode:3, DA:"C" },
         { id:"D", BCode:3, DA:"D" },
         { id:"E", BCode:1, DA:"E" },
         { id:"F", A:"||Red|Green|Blue|4" },
         { id:"G", A:[,"Red","Green","Blue",4]},
         { id:"H", A:{ 1:"Red", 2:"Green", 3: "Blue", 4:4 } },
         { id:"I", A:[ , {Color:"#F77"}, {D:"Green"}, {Color:"#77F"}, {Color:"#FB7"} ] },
         { id:"J", A:{ 1:{Color:"#F77"}, 2:{D:"Green"},3:{Color:"#77F"},4:{Color:"#FB7"} } },
         { id:"K", Color:"#DDF" }
         ], 
      Head: [ "Header" ],
      Body: [
         { id:1, V:"|A String D", A: "||Red|Green|Blue|4" },
         { id:2, V:"|A Array D", A:[,"Red","Green","Blue",4 ] },
         { id:3, V:"|A Object D", A:{ B:"Red",C:"Green",D:"Blue",E:4 } },
         { id:4, V:"|A Array", A:[ , {Color:"#F77"}, {D:"Green"}, {Color:"#77F"}, {Color:"#FB7"} ] },
         { id:5, V:"|A Object", A:{ B:{Color:"#F77"}, C:{D:"Green"},D:{Color:"#77F"},E:{Color:"#FB7"} } },
         { id:6, V:"|B String D", B:"$%&(" },
         { id:7, V:"|B String D + A", B:"$%&(", A: { C:{ Color:"#7F7" }, E:"Red" } },
         { id:8, V:"|row DA", DA:"R8" },
         { id:9, V:"|cell D Formula||1||1", DA:"R9" },
         { id:10, V:"|cell Formula||2||-2", A: { C: { ColorFormula:"Value%2 ? '#FAA':'#AAF'" }, E: { ColorFormula:"Value<0 ? '#FAA':'#AAF'" } } },
         { id:11, V:"|row attribute", Color:"#DFD" },
         { id:12, V:"|Mirror 1", A: { B: { Mirror:2, MirrorRow:1 }, C: { Mirror:2, MirrorRow:1 }, D: { Mirror:2, MirrorRow:1 }, E: { Mirror:2, MirrorRow:1 } } },
         { id:13, V:"|OnGetAttr" },
         ],
      Top:[
         { id:"Data", Cells:"Settings,Reload,Print,Pdf,Export,Copy,Undo,Redo,ClearSort" }, "Layout",
         { id:"Testbar", Color:"#DFD", NewLine:1, NoUndo:0, Cells: [
            "Edit", 
            { D:"Edit", id:"T1", Color:"#FAA", Value:"cell attr" }, 
            { D:"EditA", Value:"D cell attr", Width:70 }, 
            { D:"Edit", id:"T3", ColorFormula:"Value<0?'#FAA':'#AAF'", Value:"Formula", Width:80 }, 
            { D:"Edit", Mirror:2, MirrorCol:"T1", Value:"Mirror T1" }, 
            { D:"Edit", id:"T5", Value:"OnGetAttr", Width:70 }
            ] }
         ]
   };

@Component({
   selector:"app-tutorial-cells-02-attributes",
   standalone:true,
   imports:[ FastGridComponent ],
   templateUrl:"./02-attributes.component.html",
   host:{ class:"Tutorial" }
   })
export class Cells_02AttributesComponent {
   readonly src = src;
   }
