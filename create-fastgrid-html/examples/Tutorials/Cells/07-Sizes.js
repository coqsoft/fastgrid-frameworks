FGrid.Data = {
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
   ],
}