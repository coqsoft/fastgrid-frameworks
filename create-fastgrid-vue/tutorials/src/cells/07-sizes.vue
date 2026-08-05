<script setup>
import { FastGrid } from "fastgrid-vue";
import "../Tutorial.css";


   const src = { //. All layout and data for grid.
      Cfg: { 
         id: "Sizes", ColTree:1, BorderCollapse:0, Focus:2, HideVScroll:1, ExportSizes:"Width,Height,RowSpan,ColSpan,CalcHeight", OverScroll:2
         },
      DefCols: {
         Col: { MinWidth:50, MaxWidth:200, FirstMarginLeft:3, LastMarginRight:3 }
         },
      DefRows: {
         Row: { FirstMarginTop:3, LastMarginBottom:3, Wrap:4 }
         },
      Cols: [
         { id: "A", D:"Header" }, 
         { id:"B", MarginLeft:5, Width:100, },
         { id:"C", MarginLeft:10, MarginLeftColor: { Body:"yellow", Head:"header" }, Width:100 },
         { id:"D", MarginRight:3, MarginRightColor:"#F88", L:1 },
         { id:"E", MarginLeft:7, MarginLeftColor: { Body:"#8F8", Head:"#88F" }, L:1 },
         { id:"F", Width:1000 },
         { id:"G", Width:1000 },
         { id:"H", Width:1000 },
         { id:"I", Width:1000 },
         ],
      //Cols_Cfg: { ScrollLeft:3450 },
      Body_Cfg: { Tree:"id", MinHeight:410, MaxHeight:500, Rel:0, Fix:1 },
      Body:[
         { id:1, V:"|A1|B1|C1|D1|E1 SpanWidth|F1|G1|H1|I1", Rel:0.00001, MinHeight:20, CS: { D:2 }, A: { D: { SpanWidth:50 } } },
         { id:2, V:"|A2\npadding:15|B2|C2|D2 padding:0|E2|F2|G2|H2|I2", MarginBottom:5, A: { A: { PaddingLeft:15 }, D: { PaddingLeft:0 } } },
         { id:3, 
            V:"|A3\npadding:15|B3|C3\n1\n2|D3|E3 padding:0|Align right scrolled|G3|H3|I3",MarginBottom:10, MarginBottomColor: { Cols:"yellow", LeftCols:"header" }, 
            Align:1, A: { A: { PaddingRight:15 }, E: { PaddingRight:0 }, F: { Align:17 } }, RS: { F:2 }, CS: { F:3 }
            },
         { id:4, V:"|A4|B4|C4|D4|E4|F4|G4|H4|I4", Height:9, OverflowTop:5, OverflowShift:5, RS: { B:2 } },
         { id:5, V:"|A5|B5|C5|D5|E5|F5|G5|H5|I5", MarginBottom:3, MarginBottomColor: { Cols:"#F88", LeftCols:"#FAF" } },
         { id:6, 
            V:"|A6\nbig spanned cell abcdefghijklmopqrstuvwxyz\n1\n2\n3\n4\n5\n6\n7\n8\n9|B6|C6|D6|E6|F6|G6|H6|I6", 
            RS: { A:4 }, CS: { A:2 }, A: { A: { Wrap:4 } }, MarginTop:7, MarginTopColor:"#8F8" 
            },
         { id:7, V:"|A7|B7|C7\nrow span abcdefghijklmopqrstuvwxyz|D7|E7|F7|G7|H7|I7", L:1, RS: { C:2 }, CS: { C:2 } },
         { id:8, V:"|A8|B8|C8|D8|E8|F8|G8|H8|I8", L:1 },
         { id:9, V:"|A9|B9|C9|D9|E9|F9|G9|H9|I9" },
         { id:10, V:"|A10\nrelative height|B10|C10|D10|E10|F10|G10|H10|I10", Rel:1, MinHeight:15 },
         ],
      Head: [
         { D:"Header", id:"Header1", V: { F:"Align left scrolled", I:"End"  }, A: { F: { Align:16 } }, RS: { A:2 }, CS: { F:3 } },
         { D:"Header", id:"Header2", V: { F:"Align center scrolled", I:"End" }, A: { B: { PaddingLeft:10 }, D: { Align:1, PaddingRight:20 }, F: { Align:18 } }, CS: { B:2, D:2, F:3 } }
         ],
      Top: [ 
         { id:"Data", Cells:"Settings,Reload,Print,Pdf,Export,Copy,Span,Split,Undo,Redo,ClearSort" }, "Layout"
         ]
   };

   
</script>

<template>

      <h1>7. Cell sizes, margins and span</h1>
      <h5>Row, column and cells sizes, paddings, margins and spanning cells together</h5>
      <section>
         <FastGrid :src="src" style="max-width:100%;"/>
      </section>

      
      <ul>
         <li>
            <h4>Row height</h4><br />
            Row height is set by its <dfn>Height</dfn> attribute.<br />
            By default, when the row <b>Height</b> is not set or is 0, the row calculates its height according to the cell contents. But not less than Cfg <dfn>RowHeight</dfn> value.<br />
            The calculated row height and the resized or relative row height can be limited by its <dfn>MinHeight</dfn> and <dfn>MaxHeight</dfn> attributes.<br />
            The row can be automatically resized to fill all the part available vertical space by <dfn>Rel</dfn> attribute.<br />
            Too narrow row cuts texts in cells from bottom. It is possible to shift the text up and not cut it from top by <dfn>OverflowTop</dfn> and <dfn>OverflowShift</dfn> attributes.<br />
         </li>
         <li>
            <h4>Column width</h4><br />
            Column width is set by its <dfn>Width</dfn> attribute.<br />
            By default, when the column <b>Width</b> is not set or is 0, the column calculates its width according to the cell contents. Column without cells or with cells with no content gets zero width.<br />
            The calculated column width and the resized or relative column width can be limited by its <dfn>MinWidth</dfn> and <dfn>MaxWidth</dfn> attributes.<br />
            The column can be automatically resized to fill all the part available horizontal space by <dfn>Rel</dfn> attribute.<br />
         </li>
         <li><h4>Resizing</h4><br />
         Column width or row height can be resized by mouse dragging or by API if permitted by Cfg <dfn>ResizingRows</dfn> / <dfn>ResizingCols</dfn> attributes.<br />
         The cell that permits dragging its edge to resize the row or column has set <dfn>UseResize</dfn> attribute. By default it is set for <b>Header</b> / <b>Index</b> rows and columns.<br />
         To restrict resizing particular row or column set its <dfn>NoResize</dfn> attribute.<br />
         </li>
         <li>
            <h4>Padding</h4><br />
            Padding is space inside cell between text and cell border or edge.<br />
            Vertical padding can be set only for the whole row by row attributes <dfn>PaddingTop</dfn> and <dfn>PaddingBottom</dfn>.<br />
            Horizontal padding can be set to any cell by cell attributes <dfn>PaddingLeft</dfn> and <dfn>PaddingRight</dfn>.<br />
         </li>
         <li>
            <h4>Margin</h4><br />
            Margin is space outside cells between columns and rows. <br />
            This margin space is empty and inactive. It can have set only background color by <dfn>MarginTopColor</dfn>, <dfn>MarginBottomColor</dfn>, <dfn>MarginLeftColor</dfn>, <dfn>MarginRightColor</dfn> attributes.<br />
            Vertical margin can be set only to the whole row by row attributes <dfn>MargingTop</dfn> and <dfn>MarginBottom</dfn>. 
            It is possible to define next margin if the row is 
            a) first / last row in part by <b>TopMarginTop</b> and <b>BottomMarginBottom</b>,
            b) first / last child row in its parent by <b>FirstMarginTop</b> and <b>LastMarginBottom</b>,
            c) first / last row in its block by <b>BlockMarginTop</b> and <b>BlockMarginBottom</b>.<br />
            Horizontal margin can be set only to the whole column by column attributes <dfn>MargingLeft</dfn> and <dfn>MarginRight</dfn>. 
            It is possible to define next margin if the column is 
            a) first / last column in part by <b>LeftMarginLeft</b> and <b>RightMarginRight</b>,
            b) first / last child column in its parent by <b>FirstMarginLeft</b> and <b>LastMarginRight</b>,
            c) first / last column in its block by <b>BlockMarginLeft</b> and <b>BlockMarginRight</b>.<br />
            If set margin, the surrounding rows / columns show their borders separate. It is possible to show only one border by Cfg attribute <dfn>BorderCollapse</dfn>.<br />
            It is possible to show two margins with different colors between any rows or columns.<br />
         </li>
         <li><h4>Spanned cells</h4><br />
         It is possible to span one cell to the next cells horizontally and vertically like in normal HTML table.<br />
         Row span is set by <b>row</b> attribute <dfn>RS</dfn> as object with column ids and their rowspan values. The span value includes also hidden rows.<br />
         Column span is set by <b>row</b> attribute <dfn>CS</dfn> as object with column ids and their colspan values. The span value includes also hidden columns.<br />
         For column span it is possible to show more or all values from the spanned cells together, outside the table columns structure, using <dfn>SpanWidth</dfn> attribute.<br />
         The cells can be spanned and split also <b>dynamically</b> by focusing the cells and clicking <b>Span</b> / <b>Split</b> buttons on toolbar or by API / actions.<br />
         The columns / rows with spanned cells are by default merged to blocks to manipulate them together to not break the span. It can be controlled by Cfg <dfn>BlockSpan</dfn> attribute.<br />
         </li>
         <li><h4>Align on scroll</h4><br />
         If cell is wider than the part width, it is possible to show its value always visible regardless on scroll by <dfn>Align</dfn> value <b>16</b> (left aligned), <b>17</b> (right aligned), <b>18</b> (centered).<br />
         </li>
      </ul>
      
</template>
