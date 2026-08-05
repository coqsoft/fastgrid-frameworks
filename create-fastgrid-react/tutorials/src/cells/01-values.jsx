import React, { useMemo, useRef } from "react";
import { FastGrid } from "fastgrid-react";
import "../Tutorial.css";

export default function App() {

   const src = useMemo(() => ({ //. All layout and data for grid. Memo is used for simple object created inside the App function to avoid re-creating grid on every React App render
      Events: { 
         OnGetValue: function(G,row,col) { if(row.id==14&&col.id!="A"||col.id=="T6") return "API"+col.id; }
         },
      Cfg : { id: "Values", HideVScroll:1, PrintToolbars:"-,Testbar" }, 
      DefTools: { Edit: { Width:50 }, EditV: { D:"Edit", Value:"D cell" } }, 
      DefCols: { Col: { Width:40, Value:"..." } },
      DefCells: { 
         C1: { Value:"D cell Value" },
         C2: { Value:"DC" } 
         },
      Cols: [
         { id:"A", UCode:3, Texts:["U string","U string + V"], Width:100 },
         { id:"B", UCode:1 },
         { id:"C", UCode:1 },
         { id:"D", UCode:1 },
         { id:"E", UCode:1 },
         { id:"F", V:"||F1|F2|F3|F4|F5|F6|F7|F8|F9|F10|F11|F12|F13|F14" },
         { id:"G", V:[,"G1","G2","G3","G4","G5","G6","G7","G8","G9","G10","G11","G12","G13","G14"]},
         { id:"H", V:{ 1:"H1", 2:"H2", 3: "H3", 4:"H4", 5:"H5", 6:"H6", 7:"H7", 8:"H8", 9:"H9", 10:"H10", 11:"H11", 12:"H12", 13:"H13", 14:"H14" } },
         { id:"I", Value:"col" },
         { id:"J", F:{ 1:"'FR.'+Row.id", 3:"'FC.'+Row.id", 9:"'FC.'+Row.id" } },
         { id:"K", E:{ 1:'"EC."&row()', 3:'"EC."&row()', 9:'"EC."&row()' } },
         { id:"L", Formula:"'FC.'+Row.id", Width:48 }
         ], 
      Head: [ "Header" ],
      Body: [
         { id:1, V: "|V String|1|2|3|4" },
         { id:2, V: [ "V Array",1,2,3,4 ] },
         { id:3, V: { A:"V Object",B:1,C:2,D:3,E:4 } },
         { id:4, U: "$%&'(" }, 
         { id:5, U: "%%&'(", V:{B:"\u0001",D:"V", G:"V"} },
         { id:6, Value:"row", V: { A:"row Value", D:"V", G:"V" } },
         { id:7, A: { A: { Value:"cell Value" }, D: { Value:"C_D" }, G: { Value:"C_G" }, I: { Value:"C_I" } } },
         { id:8, A: { A: "C1", D: "C2", G: "C2", I: "C2" } },
         { id:9, F: { A: "'F Formula'", D:"'F.'+Col.id", G:"'F.'+Col.id", I:"'F.'+Col.id" } },
         { id:10, E: { A: '"E Formula"', D:'"F."&column()', G:'"F."&column()', I:'"F."&column()' } },
         { id:11, Formula:"Col.id=='A'?'row Formula':'FR.'+Col.id" },
         { id:12, A: { A: { ValueFormula:"'ValueFormula'" }, D: { ValueFormula:"'VF.'+Col.id" }, G: { ValueFormula:"'VF.'+Col.id" }, I: { ValueFormula:"'VF.'+Col.id" } } },
         { id:13, V: { A: "cell Mirror 1" }, A: { D: { Mirror:1, MirrorRow:1 }, G: { Mirror:1, MirrorRow:1 }, I: { Mirror:1, MirrorRow:1 }, J: { Mirror:1, MirrorRow:"Testbar", MirrorCol:"T1" } } },
         { id:14, V: { A: "OnGetValue" } }
         ],
      Top:[
         { id:"Data", Cells:"Settings,Reload,Print,Pdf,Export,Copy,Undo,Redo,ClearSort" }, "Layout",
         { id:"Testbar", Value:"row", NewLine:1, Narrow:32, NoUndo:0, Cells: [
            "Edit", 
            { D:"Edit", id:"T1", Value:"cell" }, 
            { D:"EditV" }, 
            { D:"Edit", id:"T3", Formula:"'formula '+Col.id", Width:80 }, 
            { D:"Edit", Mirror:1, MirrorCol:"T1" }, 
            { D:"Edit", Mirror:1, MirrorRow:13, MirrorCol:"A", Width:80 },
            { D:"Edit", id:"T6" }
            ] }
         ]
   }), []);

   return (<>
      <h1>1. Values</h1>
      <h5>Values in cells</h5>
      <section>
         <FastGrid src={src} style={{display:"inline-block", maxWidth:"100%"}}/>
      </section>

      {/*. Description */}
      <ul>
         <li>For more information see <a target="FGDoc" href="https://www.treegrid.com/FDoc/Cell.htm#Value">Cell value</a>.</li>
         <li><h4>V attribute</h4> - <b>values in array</b><br />
            <dfn>V</dfn> can be defined in row, default row, column and default column. If defined in column, the values are copied to row on grid start and cannot be later changed in column. The row values are always preferred to column regardless on <b>Important</b> attribute.<br />
            <b>V</b> can be defined in three ways, as first character separated <b>string</b>, as <b>array</b> and as <b>object</b> with column ids. The <b>array</b> definition is the fastest way to process.<br />
            Which columns and in which order are set by the <b>array</b> or <b>string</b> definition is set by column attribute <dfn>VIndex</dfn>, by default it is set automatically according to defined columns order.<br />
         </li>
         <li><h4>U attribute</h4> - <b>values in special UTF8 string</b><br />
            <dfn>U</dfn> can be defined in row or default row. It is always string in <a target="FGDoc" href="https://www.treegrid.com/FDoc/UTF8Store.htm">UTF8Store</a> format. It is very short and fast to process.<br />
            Which columns and in which order are set is controlled by column attribute <dfn>UIndex</dfn>, by default it is set automatically according to defined columns order, but only for columns with <dfn>UCode</dfn> that specifies the type and size of the value.<br />
         </li>
         <li><h4>E attribute</h4> - <b>editable formula</b><br />
            <dfn>E</dfn> can be defined in row, default row, column and default column. If defined in column, the values are copied to row on grid start and cannot be later changed in column. The row values are always preferred to column regardless on <b>Important</b> attribute.<br />
            The editable formula can be dynamically generated by <dfn>OnGetFormula</dfn> API event.<br />
         </li>
         <li><h4>F, Formula and ValueFormula attributes</h4> - <b>JavaScript formula</b><br />
            <dfn>F</dfn> can be defined in row, default row, column and default column. If defined in column, the values are copied to row on grid start and cannot be later changed in column. The row values are always preferred to column regardless on <b>Important</b> attribute.<br />
            <dfn>Formula</dfn> can be defined in row, default row, column and default column. Read only if not defined the <b>F</b> value for given cell. It is read from row before column except if the column has set <b>Important</b> attribute set.<br />
            <dfn>ValueFormula</dfn> can be defined in cell or default cell. It is calculated attribute.<br />
            The JavaScript formula can be dynamically generated by <dfn>OnGetFormula</dfn> API event.<br />
         </li>
         <li><h4>Value attribute</h4> - <b>default value</b><br />
            <dfn>Value</dfn> can be defined in cell and default cell, row, default row, column, default column. It is read from row before column except if the column has set <b>Important</b> attribute set.<br />
         </li>
         <li><h4>Mirror attribute</h4> - <b>value from another cell</b><br />
            <dfn>Mirror</dfn> can be defined only in cell or toolbar cell, but not in any default. It reads value from another cell defined by <dfn>Mirror</dfn> / <dfn>MirrorRow</dfn> / <dfn>MirrorCol</dfn> attributes.<br />
            It is read after cell <b>Value</b>, but before row / column <b>Value</b>
         </li>
         <li><h4>OnGetValue API event</h4> - <b>dynamic value generating</b><br />
         If defined, <b>OnGetValue</b> is called on every reading of any cell value, including toolbar values.<br />
         </li>
         <li>If defined <b>Cfg</b> <dfn>DefaultValue</dfn> it speeds up reading cell values and uses this value instead of <b>Value</b> and <b>ValueFormula</b> attributes.</li>
         <li><h4>Order</h4>: <dfn>OnGetValue</dfn>, <dfn>E</dfn>, <dfn>F</dfn>, <dfn>Formula</dfn>, <dfn>V</dfn>, <dfn>U</dfn>, <dfn>DefaultValue</dfn>, <dfn>ValueFormula</dfn>, <b>cell</b> <dfn>Value</dfn>, <dfn>Mirror</dfn>, <b>row</b> / <b>col</b> <dfn>Value</dfn><br />
         <b>E</b>, <b>F</b>, <b>Formula</b>, <b>V</b> can be defined and are read in this order: <b>row</b>, <b>default row</b>, <b>column</b>, <b>default column</b>. There is ignored <b>Important</b> attribute.<br />
         <b>U</b> can be defined and are read in this order: <b>row</b>, <b>default row</b>.<br />
         <b>DefaultValue</b> can be defined in <b>Cfg</b> tag.<br />
         <b>Mirror</b> can be defined only in <b>cell</b> (in <b>A</b> or <b>tool</b>). It cannot be defined in default cell.<br />
         <b>ValueFormula</b> can be defined and are read in this order: <b>cell</b> (in <b>A</b>), <b>default cell</b> (in <b>DefCells</b>).<br/>
         <b>Value</b> can be defined and are read in this order: <b>cell</b> (in <b>A</b>), <b>default cell</b> (in <b>DefCells</b>), <b>row</b>, <b>default row</b>, <b>column</b>, <b>default column</b>. If column has <b>Important</b> attribute, it is read before row.<br/>
         </li>
         <li><h4>Toolbar cell</h4><br />
         Toolbar cell can read only these items in this order: <dfn>OnGetValue</dfn>, <dfn>Formula</dfn>, <b>cell</b> <dfn>Value</dfn>, <dfn>Mirror</dfn>, <b>row</b> <dfn>Value</dfn>.<br />
         </li>
      </ul>
      </>);
}