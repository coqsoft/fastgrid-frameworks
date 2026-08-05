import { Component } from "@angular/core";
import { FastGridComponent } from "fastgrid-angular";

const src = { //. All layout and data for grid.
      Cfg: { id:"Conditional Formatting", HtmlFormat:1, HtmlEmptyString:1, RowHeight:20, PrintIcons:7, ExportIcons:7, ExportMarks:7, OverScroll:2 }, 
      DefCells: { 
         D: { TextColorFormula: "Value<-3 ? 'red' : Value>3 ? 'green' : 'blue'" },
         E: { ColorFormula: "Value%1 ? '#FC0' : Value%2?'#DFE' : ''" },
         F: { ColorFormula: "!Value ? '#329632' : Value>0 ? '#'+(Math.floor(Math.sqrt(Value)*50)+97).toString(16)+'9600':'#0096'+(Math.floor(Math.sqrt(-Value)*50)+97).toString(16)" },
         G: { LeftIcons:"Test", TestIconFormula: "Value<-3||Value===''?'RedMark':(Value>0?'GreenMark':'OrangeMark')" }
         },
      DefCols: {
         Col: { Width:100 }
         },
      Cols: [ 
         { id: "A", Type:"Number", Width:50   }, 
         { id: "B", Type:"Number", Format: "[<-5][red]0.## !;[<3][blue]0.## \\?;[green]0.##  ", EmptyString:"" },
         { id: "C", Type:"Number", EmptyString:"<span style='color:silver;'>empty</span>", Align:1,
            Format: "'<span style=\"color:green;font-weight:bold;\">'0.##'</span>';'<span style=\"color:red\">'0.##'</span>';'<span style=\"color:blue\">'0'</span>'",
            },
         { id: "D", Type:"Number", DA:"D", EmptyString: "N/A" }, 
         { id: "E", Type:"Number", DA:"E" }, 
         { id: "F", Type:"Number", DA:"F" }, 
         { id: "G", Type:"Number", DA:"G", EmptyString: "Error" }, 
         { id: "H", Type:"Number", Marks:"Bar({ RelWidth:Math.abs(Grid.GetValue(Row,Col)/10), Fill:Grid.GetValue(Row,Col)<0?'#FA0':'#0AF', Fill2:'white', FillDir:1, FillSingle:1, Stroke:'#952', StrokeDashArray:'3 1', Round:5, StrokeEdge:7, RoundEdge:6, Left:3, Right:33, Top:3, Bottom:3 })" }
         ], 
      Body: [ 
         { V: [ -10,  -10,  -10,  -10,  -10,  -10,  -10,  -10   ] }, 
         { V: [  -8.5, -8.5, -8.5, -8.5, -8.5, -8.5, -8.5, -8.5 ] }, 
         { V: [  -7,   -7,   -7,   -7,   -7,   -7,   -7,   -7   ] }, 
         { V: [  -6,   -6,   -6,   -6,   -6,   -6,   -6,   -6   ] }, 
         { V: [  -5,   -5,   -5,   -5,   -5,   -5,   -5,   -5   ] }, 
         { V: [  -3.5, -3.5, -3.5, -3.5, -3.5, -3.5, -3.5, -3.5 ] }, 
         { V: [  -3,   -3,   -3,   -3,   -3,   -3,   -3,   -3   ] }, 
         { V: [  -2.5, -2.5, -2.5, -2.5, -2.5, -2.5, -2.5, -2.5 ] }, 
         { V: [  -2,   -2,   -2,   -2,   -2,   -2,   -2,   -2   ] }, 
         { V: [  -0.5, -0.5, -0.5, -0.5, -0.5, -0.5, -0.5, -0.5 ] }, 
         { V: [   "",   "",   "",   "",   "",   "",   "",   ""  ] }, 
         { V: [   0,    0,    0,    0,    0,    0,    0,    0   ] }, 
         { V: [   0.5,  0.5,  0.5,  0.5,  0.5,  0.5,  0.5,  0.5 ] }, 
         { V: [   2,    2,    2,    2,    2,    2,    2,    2   ] }, 
         { V: [   2.5,  2.5,  2.5,  2.5,  2.5,  2.5,  2.5,  2.5 ] }, 
         { V: [   3,    3,    3,    3,    3,    3,    3,    3   ] }, 
         { V: [   3.5,  3.5,  3.5,  3.5,  3.5,  3.5,  3.5,  3.5 ] }, 
         { V: [   5,    5,    5,    5,    5,    5,    5,    5   ] }, 
         { V: [   6,    6,    6,    6,    6,    6,    6,    6   ] }, 
         { V: [   7,    7,    7,    7,    7,    7,    7,    7   ] }, 
         { V: [   8.5,  8.5,  8.5,  8.5,  8.5,  8.5,  8.5,  8.5 ] }, 
         { V: [  10,   10,   10,   10,   10,   10,   10,   10   ] }, 
         ], 
      Head: [
         { D:"Header", DA:"Header", Wrap:4, 
            V: { A:"Value", B:"Format [color]\n(-5, <3)", C:"Format HTML\n(+, -, 0)", D:"TextColor\n(-3, 3)", E:"Color\n(odd, decimal)", F:"Color\n(scale)", G:"Icon\n(-3,0)", H:"Marks Bar ( )\n(gauge)" } 
            }, 
         ],
      Top: [
         { id:"Data", Cells:"Settings,Reload,PrintPdf,Export,Copy,Paste,Undo,Redo,ClearSort" }, "Layout",
         ]
   };

@Component({
   selector:"app-tutorial-cells-10-conditional-format",
   standalone:true,
   imports:[ FastGridComponent ],
   templateUrl:"./10-conditional-format.component.html",
   host:{ class:"Tutorial" }
   })
export class Cells_10ConditionalFormatComponent {
   readonly src = src;
   }
