<script setup>
import { FastGrid } from "fastgrid-vue";
import "../Tutorial.css";


   const src = { //. All layout and data for grid.
      Cfg: { 
         id: "Styles", RecalcOn:15, EditingStyle:1, EditingLink:1, HtmlHeight:1, HtmlWidth:1, Focus:2, HideVScroll:1, PrintToolbars:"-,String,Html",
         LinkCSS: { Link:"font-weight:bold;", Hover:"color:green!important;", Visited:"font-weight:normal;", VisitedHover:"color:pink!important;", Active:"font-style:italic;" } 
         },
      DefCols:{
         Col: { Width:115, Wrap:5, FE:127+2048 }
         },
      LeftCols: [
         { id: "id", D:"HeaderFocus" }, 
         ],
      Cols: [
         { id:"A", Type:"String" },
         { id:"B", Type:"String" },
         { id:"C", Type:"Html" },
         { id:"D", Type:"Html" },
         { id:"E", Type:"Html" },
         ],
      Body:[
         { id:1, 
            V: { A:"Bold", B:"Italic", C:"Bold italic", D:"Normal, <b>bold</b>, <i>italic</i>, <b><i>both</i></b>", E:"Whole bold, <span style='font-weight:normal'>normal</span> text" }, 
            A: { A: { TextStyle:1 }, B: { TextStyle:2 }, C: { TextStyle:3 }, E: { TextStyle:1 } }
            },
         { id:2, 
            V: { 
               A:"Underline 2px", B:"Strike double", C:"Two lines wavy", 
               D:"<u>under</u>, <s>strike</s>, <u><s>both</s></u>, <span style='text-decoration:underline;text-decoration-color:blue;text-decoration-thickness:2px;text-decoration-style:dashed;'>more</span>",
               E:"<span style='text-decoration:underline;text-decoration-color:blue;text-decoration-style:dotted;text-decoration-thickness:2px;'>Whole underline</span> normal <span style='text-decoration:underline;text-decoration-color:blue;text-decoration-style:dotted;text-decoration-thickness:2px;'>text</span>"
               },
            A: { A: { TextLine:1+64, TextLineColor:"red" }, B: { TextLine:2+8, TextLineColor:"blue" }, C: { TextLine:1+4+32, TextLineColor:"green" } }
            },
         { id:3, 
            V: { 
               A:"TextSize 17px", B:"TextFont Times New Roman", C:"TextSize 10px + line height 8px + Font Arial", 
               D:"<span style='font-size:10px;'>10px size</span> <span style='font-family:Arial;'>font Arial</span> <span style='font-size:13px;font-family:\"Courier New\",monospace'>13px Courier</span>",
               E:"Whole size&font, <span style='font-size:14.5px;font-family:LucidaSansUnicode'>normal</span> text"
               },
            A: { A: { TextSize:17 }, B: { TextFont:"Times New Roman,Times,serif" }, C: { TextSize:"10px/8px", TextFont:"Arial" }, E: { TextSize:10, TextFont:"serif" } }
            },
         { id:4, 
            V: { 
               A: "TextColor red", B:"TextShadow 1", C:"TextColor yellow TextShadow 10", 
               D:"<span style='color:red'>red</span> <span style='text-shadow:0px 0px 10px red,0px 0px 10px red'>shadow 2</span> <span style='color:lime;text-shadow:0px 0px 5px blue,0px 0px 5px blue,0px 0px 5px blue,0px 0px 5px blue,0px 0px 5px blue'>shadow 9 + lime</span>",
               E:"Whole shadow 18 <span style='color:black;text-shadow:none;'>normal</span> text"
               },
            A: { 
               A: { TextColor:"red" }, B: { TextShadow:1, TextShadowColor:"blue" }, C: { TextColor:"yellow", TextShadow:10, TextShadowColor:"green" }, 
               E: { TextShadow:18, TextShadowColor:"lime", TextColor:"green" } 
               }
            },
         { id:5, 
            V: { 
               A:"VertAlign 0", B:"VertAlign 1", C:"VertAlign 2", 
               D:"<span style='vertical-align:50%;line-height:50%;'>top</span> <span>text</span> <span style='vertical-align:-50%;line-height:50%;'>bottom</span>",
               E:"<span style='vertical-align:50%;line-height:50%;font-size:12px;'>top</span> <span>text</span> <span style='vertical-align:-50%;line-height:50%;font-size:12px;'>bottom</span> <span style='vertical-align:-50%;line-height:50%;font-size:12px;'>bottom</span> <span>text</span> <span style='vertical-align:50%;line-height:50%;font-size:12px;'>top</span>",
               },
            A: { A: { VertAlign:0 }, B: { VertAlign:1 }, C: { VertAlign:2 } }
            },
         { id:6, Wrap:0,
            V: { A:"Align 0", B:"Align 1", C:"Align 2", D:"Align 1+4 overflow", E:"Align 2+8 overflow" },
            A: { A: { Align:0 }, B: { Align:1 }, C: { Align:2 }, D: { Align:1+4 }, E: { Align:2+8 } }
            },
         { id:7, Height: 52,
            V: { A:"Wrap 0 abcdefghijklmopqrstuvwxyz", B:"Wrap 1 abcdefghijklmopqrstuvwxyz", C:"Wrap 2 abcdefghijklmopqrstuvwxyz", D:"Wrap 3 abcdefghijklmopqrstuvwxyz", E:"Wrap 4, &lt;br><br>text\\n\ntext" },
            A: { A: { Wrap:0 }, B: { Wrap:1 }, C: { Wrap:2 }, D: { Wrap:3 }, E: { Wrap:4 }  }
            },
         { id:8, 
            V: { A:"Top and bottom border", B: "No border on all sides", C:"Right border mixed with next", D:"Different border on all edges", E:"Partially visible right border" },
            A: { A: { RowBorder:"brown,2" }, B: { RowBorder:"white", ColBorder:"white" }, C: { ColBorder:",lime,5" }, D: { RowBorder:"red,2,2 2,blue,1", ColBorder:"black,3,6 2 3 2,green,2" }, E: { ColBorder:",red,5" } }
            },
         { id:9, Height:52, Wrap:4,
            V: { A:"Rotate\n= 1", B:"Rotate\n= 2", C:"Rot\nate\n= 3", D:"Rotate\n= 30", E:"Rotate\n= 240" },
            A: { A: { Rotate:1 }, B: { Rotate:2 }, C: { Rotate:3 }, D: { Rotate:30 }, E: { Rotate:240 } }
            },
         { id:10, 
            V: { A:"Background", B:"Linear gradient", C:"Radial gradient", D:"Dashed pattern", E:"Line pattern" },
            A: { 
               A: { Color:"yellow", CellBorder:"Edit,,,,#CFF" }, B: { Pattern:"Linear0", PatternColor:"#F55", Color:"lime", CellBorder:"Edit,,,,#FCF", RightIcons:"List", Wrap:0 }, 
               C: { Pattern:"Radial0", PatternColor:"#5F5", Color:"#55F" }, D: { Pattern:"Dashed0", PatternColor:"#5F5", Color:"#55F" }, 
               E: { Pattern:"Cross6", PatternColor:"red", Color:"#EEF" },
               }
            },
         { id:11, 
            V: { 
               A:"Indent", B:"Indent align right", C:"Link", 
               D:"<a href='http://www.treegrid.com/Grid'>Link 1</a> No link <a href='http://www.treegrid.com/Gantt'>Link 2</a> <a href='http://www.treegrid.com/Sheet'>Link 3</a>",
               E:"<a href='http://www.treegrid.com/Grid'>Link <b style='color:red;'>1</b></a> No link <a href='http://www.treegrid.com/Gantt' style='color:orange;text-decoration:underline;text-decoration-thickness:3px;'>Link 2</a> <a href='http://www.treegrid.com/Sheet' style='color:green;'>Link 3</a>" 
               },
            A: { A: { Indent:5 }, B: { Indent:3, Align:1 }, C: { Link:"http://www.treegrid.com" } }
            }
         ],
      Head: [
         { D:"HeaderFocus", 
            V: { id:"Id", A:"A: String", B:"B: String", C:"C: Html", D:"D: Html", E:"E: Html"  } 
            },
         ],
      Top: [ 
         { id:"Data", Cells:"Settings,AddLink,Reload,Print,Pdf,Export,Copy,Undo,Redo" },
         "Layout", "Text1", "Text2", "Text3", "Text4"
         ],
      Bottom: [
         { id:"String", Height:0, UseResize:3, Narrow:32, NoUndo:0, Cells: [
            { D:"Label", Value:"String:", Width:40, PaddingRight:0 },
            { D:"Edit", Value:"Style + Line", TextStyle:3, TextLine:1+4+24+64, TextLineColor:"#F0F", Width:90  },
            { D:"Edit", id:"Test", Value:"Size + Font", TextFont:"Times New Roman", TextSize:23, Width:110 },
            { D:"Edit", Value:"Color + Shadow", TextColor:"aqua", TextShadow:"9", TextShadowColor:"black", Width:110  },
            { D:"Edit", Value:"Top", VertAlign:0, Align:1, Width:40 },
            { D:"Edit", Value:"Bottom", VertAlign:1, Width:50 },
            { D:"Edit", Value:"Align 2+8 over", Align:10, Width:70 },
            { D:"Edit", Value:"Wrap 1 TextSize 11/11", Wrap:1, TextSize:"11px/11px", Width:75 },
            ] },
         { id:"Html", Height:0, UseResize:3, Narrow:32, NoUndo:0, Cells: [ 
            { D:"Label", Value:"Html:", Width:40, PaddingRight:0 },
            { D:"Edit", Type:"Html", Value:"<span style='font-weight:bold;text-decoration:underline;text-decoration-color:blue;'>Style 1</span>, <span style='font-style:italic;text-decoration:line-through;text-decoration-thickness:3px;text-decoration-style:dotted;text-decoration-color:red;'>style 2</span>", Width:90 },
            { D:"Edit", Type:"Html", Value:"<span style='font-size:23px;font-family:\"Courier New\";'>Size1</span>, <span style='font-size:12px;'>size 2</span>", Width:110 },
            { D:"Edit", Type:"Html", Value:"<span style='text-shadow:1px 1px 0px lime,2px 2px 0px lime,3px 3px 0px lime,4px 4px 0px lime,5px 5px 0px lime'>Shadow</span>, <span style='color:red;text-shadow:3px -3px 1px orange;'>shadow</span>", Width:110  },
            { D:"Edit", Type:"Html", Value:"<span style='vertical-align:50%;line-height:50%;font-size:12px;'>top</span> <span>text</span> <span style='vertical-align:-50%;line-height:50%;font-size:12px;'>bottom</span>", Width:86 },
            { D:"Edit", Type:"Html", Value:"Pattern", Pattern:"Dotted3", PatternColor:"blue", Color:"yellow", Width:70, MarginLeft:16 },
            { D:"Edit", Type:"Html", Value:"Wrap 3 TextSize 11/11", Wrap:3, TextSize:"11px/11px", Width:75 },
            ] }
         ]
   };

   
</script>

<template>

      <h1>6. Cell style and border</h1>
      <h5>Cell text and background style and border</h5>
      <section>
         <FastGrid :src="src" style="display:inline-block; max-width:100%;"/>
      </section>

      
      <ul>
         <li>
            <h4>Styles set to cell</h4><br />
            They are independent on the cell <b>Type</b>. All the attributes can be changed by users if set Cfg <dfn>EditingStyle</dfn>.<br />
            <dfn>TextStyle</dfn> - sets bold and italic text.<br />
            <dfn>TextLine</dfn> and <dfn>TextLineColor</dfn> - set text underline / strike / overline and the line style, color and width.<br />
            <dfn>TextSize</dfn> - sets text font size and line height.<br />
            <dfn>TextFont</dfn> - sets text font family.<br />
            <dfn>TextColor</dfn> - sets text color.<br />
            <dfn>TextShadow</dfn> - sets text background or shadow around or next to the text.<br />
            <dfn>Background</dfn> - sets cell background color.<br />
            <dfn>Pattern</dfn> and <dfn>PatternColor</dfn> - sets cell background pattern, gradient or line(s).<br />
            <dfn>Align</dfn> - sets cell horizontal alignment and overflow side.<br />
            <dfn>VertAlign</dfn> - sets cell vertical alignment.<br />
            <dfn>Wrap</dfn> - sets wrapping text to more lines.<br />
            <dfn>Rotate</dfn> - rotates text in 360 degrees.<br />
            <dfn>Indent</dfn> - indents cell text from align side.<br />
            <dfn>RowBorder</dfn> and <dfn>ColBorder</dfn> - sets border around the cell, sets edge(s), color, width and style.<br />
         </li>
         <li>
            <h4>Styles set to cell text</h4><br />
            They can be set only in <b>Html</b> <b>Type</b>. Or to <b>Auto</b> <b>Type</b> if set Cfg <dfn>AutoHtml</dfn>.<br />
            All the HTML text attributes can be changed by users if the cell is editable.<br />
            The styles are set in HTML code in the cell <b>Value</b> by standard &lt;span&gt; tags. Only text styles are permitted.<br />
            <ul>
            <li>
            Permitted <b>HTML</b> tags: 
               <b>&lt;span&gt;</b>, <b>&lt;b&gt;</b>  / <b>&lt;strong&gt;</b> (font-weight:bold), <b>&lt;i&gt;</b> / <b>&lt;em&gt;</b> (font-style:italic), 
               <b>&lt;u&gt;</b> / <b>&lt;ins&gt;</b> (text-decoration:underline), <b>&lt;s&gt;</b> / <b>&lt;strike&gt;</b> / <b>&lt;del&gt;</b> (text-decoration:line-through), 
               <b>&lt;small&gt;</b> (font-size:10px),  <b>&lt;code&gt;</b> (font-family:monospace), 
               <b>&lt;br&gt;</b>, <b>&lt;a&gt;</b>.<br />
            </li>
            <li>
            Permitted <b>CSS</b> attributes: <b>font-weight</b>, <b>font-style</b>, <b>font-variant</b>, <b>text-decoration</b>, <b>font-size</b>, <b>font-family</b>, <b>color</b>, <b>text-shadow</b>.<br />
            </li>
            <li>
            Sub and super text can be done by <b>vertical-align:50%</b> /*super = 50%, sub = -50%*/; <b>line-height:50%</b>; optionally with <b>font-size:85%</b>.<br />
            </li>
            </ul>
         </li>
         <li>All styles can be used and changed also in <h4>Toolbar</h4> cells, except <b>RowBorder</b>, <b>ColBorder</b> and <b>Rotate</b>.</li>
         <li>
            To update row height according to style or html content set Cfg <dfn>HtmlHeight</dfn>.<br />
            To calculate column width according to style or html content set Cfg <dfn>HtmlWidth</dfn>.<br />
         </li>
         <li>
            To update toolbar icons for editing styles according to actual selected text or focus set appropriate value to Cfg <dfn>RecalcOn</dfn>.<br />
            <i>The toolbars are not updated if editing is done in toolbar cell in the same row part.</i><br />
         </li>
         <li>
            <h4>Hyperlinks</h4><br />
            Hyperlink for whole cell can be set <dfn>Link</dfn> attribute, its target by <dfn>Target</dfn> and tooltip by <dfn>LinkTip</dfn>.<br />
            Hyperlink for some text in cell value can be set by HTML tag <dfn>&lt;a&gt;</dfn> in Html or Auto type cell.<br />
            To permit adding or changing links by users set Cfg <dfn>EditingLink</dfn>.<br />
            Styling links in grid can be done by Cfg <dfn>LinkCSS</dfn> object attribute.<br />
         </li>
      </ul>
      
</template>
