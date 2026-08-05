<script>
import { FastGrid } from "fastgrid-svelte";
import "../Tutorial.css";


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
</script>

<h1>10. Conditional formatting and styling</h1>
      <h5>FastGrid can calculate cell's look according to its value or any other condition</h5>
      <section>
         <FastGrid src={src} style="display:inline-block; max-width:100%;"/>
      </section>

      
      <ul>
         <li>
            <h4>Conditional Format attribute</h4><br />
            The <dfn>Format</dfn> attribute for numbers and dates can contain sections, separated by semicolon.<br />
            Every section can start by simple condition in <b>[ ]</b> comparing cell value with constant, e.g. [&lt;3] or [=1].<br />
            The value is formatted by the first section that's contition is true.<br />
            If there are more sections without the condition, they are implicit conditions in this order: [&gt;0], [&lt;0], [=0].<br />

            The <b>Format</b> can also contain text color defined in <b>[ ]</b> (placed after the condition), e.g. [red].<br />
            Or the <b>Format</b> can contain HTML code in " or ' with only CSS text attributes. The HTML format must be permitted by <b>Cfg</b> <dfn>HtmlFormat</dfn> = <b>1</b>. <i>But it can slow down paint if used in many cells!</i><br />
         </li>
         <li>
            <h4>Attributes calculated by ...Formula</h4><br />
            Every cell attribute can be calculated by <dfn>xxxFormula</dfn>, where the <b>xxx</b> is the attribute name.<br />
            The <b>xxxFormula</b> can be defined only in the cell attributes in <dfn>A</dfn> or in default cell defined in <dfn>DefCells</dfn>.<br />
            Particular default cell can be assigned to particular column(s) by setting column attribute <dfn>DA</dfn>. And similarly for rows. 
            If defined <b>DA</b> in both row and column, the cell gets default cell of id as concated the two <b>DA</b> values, the row first.<br />
            <i>The <b>xxxFormula</b> <u>cannot</u> be defined in row, default row, column or default column.</i><br />
            Often calculated cell attributes are <dfn>Color</dfn>, <dfn>TextColor</dfn> and <dfn>TextStyle</dfn>.<br />
            To calculate cell icon(s), <u>don't</u> assign <b>xxxFormula</b> to Left/Right/TextIcons, but assign it to the <b>xxxIconFormula</b> attribute, where xxx is the icon name defined in Left/Right/TextIcons.<br />
         </li>
         <li><h4>Conditional Marks attribute</h4><br />
            The <dfn>Marks</dfn> attribute or item in <dfn>M</dfn> can contain JavaScript code in the Mark icon attributes.<br />
            <i>The icon definition must always start by icon name, the JavaScript code can be only used to calculate the mark icon parameter values!</i><br />
            The most common icons used in calculated Marks are <b>Bar</b> to display one colored bar and <b>Chart</b> to display bar or line chart.<br />
            If required, also the full <b>Marks</b> value can be calculated by <b>MarksFormula</b>.<br />
         </li>
         <li>
            <h4>Empty cells</h4><br />
            In empty cell there can be shown <dfn>EmptyString</dfn> value. It can contain HTML code, if set Cfg <dfn>HtmlEmptyString</dfn> = <b>1</b>, <i>but it can slow down paint if HTML used in many cells!</i><br />
            Or the empty cell can contain <dfn>EmptyValue</dfn> value to be formatted and shown instead of empty.<br />
         </li>
      </ul>
