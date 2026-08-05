<script setup>
import { FastGrid } from "fastgrid-vue";
import "../Tutorial.css";


   const src = { //. All layout and data for grid.
      Events: { 
         OnGetAttr: function(G,row,col,attr) { if(row&&row.id==13&&attr=="Color"&&col&&col.id>"A"&&col.id<="F") return "#"+col.id+col.id+col.id; if(col&&attr=="Color"&&col.id=="T5") return "#AAA"; }
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

   
</script>

<template>

      <h1>2. Attributes</h1>
      <h5>Attributes in cells</h5>
      <section>
         <FastGrid :src="src" style="display:inline-block; max-width:100%;"/>
      </section>

      
      <ul>
         <li>For more information see <a target="FGDoc" href="https://www.treegrid.com/FDoc/Cell.htm#Attributes">Cell attributes</a>.</li>
         <li><h4>A attribute</h4> - <b>attributes in array</b><br />
            <dfn>A</dfn> can be defined in row, default row, column and default column. If defined in column, the values are copied to row on grid start and cannot be later changed in column. The row values are always preferred to column regardless on <b>Important</b> attribute.<br />
            <b>A</b> can be defined in three ways, as first character separated <b>string</b>, as <b>array</b> and as <b>object</b> with column ids. The <b>array</b> definition is the fastest way to process.<br />
            The item in <b>A</b> can be string or number as direct default cell id. Or it can be set to object as the attributes definition.<br />
            Which columns and in which order are set by the <b>array</b> or <b>string</b> definition is set by column attribute <dfn>AIndex</dfn>, by default it is set automatically according to defined columns order.<br />
         </li>
         <li><h4>B attribute</h4> - <b>default cell ids in special UTF8 string</b><br />
            <dfn>B</dfn> can be defined in row or default row. It is always string in <a target="FGDoc" href="https://www.treegrid.com/FDoc/UTF8Store.htm">UTF8Store</a> format. It is very short and fast to process.<br />
            Which columns and in which order are set is controlled by column attribute <dfn>UIndex</dfn>, by default it is set automatically according to defined columns order, but only for columns with <dfn>UCode</dfn> that specifies the type and size of the value.<br />
         </li>
         <li><h4>row / column attribute</h4><br />
            The cell attribute can be defined in row, default row, column and default column. It is read from row before column except if the column has set <b>Important</b> attribute set.<br />
         </li>
         <li><h4><i>attribute</i>Formula</h4> - <b>JavaScript formula</b><br />
            The <dfn><i>attribute</i>Formula</dfn> can be defined in cell or default cell. For example <span class="inline-code">Cell1:&#x7B;ColorFormula:"Value&lt;0?'red':'green'"&#x7D;</span><br />
            There is <b>not</b> called <b>OnGetFormula</b> API event for the attribute Formula.<br />
         </li>
         <li><h4>Mirror attribute</h4> - <b>all attributes from another cell</b><br />
            <dfn>Mirror</dfn> can be defined only in cell or toolbar cell, but not in any default. It reads value from another cell defined by <dfn>Mirror</dfn> / <dfn>MirrorRow</dfn> / <dfn>MirrorCol</dfn> attributes.<br />
            It is read before row / column attribute value. <i>For attributes the <b>MirrorRow</b> should be of the same kind as the source row (toolbar/normal row)!</i><br />
         </li>
         <li><h4>OnGetAttr API event</h4> - <b>dynamic attribute value generating</b><br />
         If defined, <b>OnGetAttr</b> is called on every reading of any cell attribute value, including toolbar attributes.<br />
         <i>Defining <b>OnGetAttr</b> can slow down the paint and scroll!</i><br />
         </li>
      
         <li><h4>Order</h4>: <dfn>OnGetAttr</dfn>, <dfn><i>attribute</i>Formula</dfn>, <dfn>A</dfn>, <dfn>B</dfn>, <dfn>Mirror</dfn>, <b>row</b> / <b>col</b> <dfn><i>attribute</i></dfn><br />
         <b><i>attribute</i>Formula</b> can be defined and are read in this order: <b>cell</b> (in <b>A</b>), <b>default cell</b> (in <b>DefCells</b>).<br/>
         <b>A</b> can be defined and are read in this order: <b>row</b>, <b>default row</b>, <b>column</b>, <b>default column</b>. There is ignored <b>Important</b> attribute.<br />
         <b>B</b> can be defined and are read in this order: <b>row</b>, <b>default row</b>.<br />
         <b>Mirror</b> can be defined only in <b>cell</b> (in <b>A</b> or <b>tool</b>). It cannot be defined in default cell.<br />
         <b><i>attribute</i></b> can be defined and are read in this order: <b>row</b>, <b>default row</b>, <b>column</b>, <b>default column</b>. If column has <b>Important</b> attribute, it is read before row.<br/>
         </li>
         <li><h4>Toolbar cell</h4><br />
         Toolbar cell can read only these items in this order: <dfn>OnGetAttr</dfn>, <dfn><i>attribute</i>Formula</dfn>, <b>cell</b> <dfn><i>attribute</i></dfn>, <dfn>Mirror</dfn>, <b>row</b> <dfn><i>attribute</i></dfn>.<br />
         </li>
      </ul>
      
</template>
