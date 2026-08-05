FGrid.Data = {
Cfg: { id:"ColSubitems", DraggingCols:7, SelectingRows:0, SelectingCols:1, ColIds:11, MoveColType:25, ColTree:1, Sorting:2, ColChanges:255, HideVScroll:1, 
   Copying:3, CopyStyles:"D", CopyHtml:1, PasteFillRows:0, UndoId:1 
   }, 
RowParts: [
   { id:"Empty", Type:"Empty", Next:"Tree" },
   { id:"TopScroll", Hidden:0 },
   { id:"BottomScroll", Hidden:1 }
   ],
Body: [ 
   { id:"N", Height:80 },
   { id:"P", D:"Panel", LeftIcons:"SelectCol", IconWrap:2, Height:40, VertAlign:1, PaddingBottom:3, IconPaddingLeft:0 },
   { id:"id", D:"Header", VertAlign:0, IconVertAlign:1, Rotate:1, PaddingTop:5, PaddingBottom:5, Height:55, DA:"Clp", 
      A: { Header: { VertAlign:1, IconVertAlign:0, Align:0, PaddingRight:-25 } } 
      }, 
   ], 
DefRows: { 
   Row: { UseMove:1, Rotate:1, Align:0, VertAlign:1, PaddingBottom:5 }
   },
LeftCols: [
   { id:"Header", D:"Header", VertAlign:1, Align:0, SortIcons:13, PaddingRight:-25, IconVertAlign:1, Rotate:1, Width:20, 
      V: { id:" ID", N:"Name" }, A: { P: { LeftIcons:"SelectCols", IconPaddingLeft:0, } }
      }, 
   ],
DefCols: { 
   Base: { Width:20, PaddingLeft:1, PaddingRight:3 },
   SUBITEM: { CD:"SUBITEM", DragId:"SUBITEM", Accept:"SUBITEM", NoMove:8 }
   }, 
Cols_Cfg: { CD:"SUBITEM", Accept:"SUBITEM" }, 
Cols: [ 
   { id:"S1", V: { N:"Subitem N1" } }, 
   { id:"S2", V: { N:"Subitem N2" } }, 
   { id:"S3", V: { N:"Subitem N3" } }, 
   { id:"S4", V: { N:"Subitem N4" } }, 
   { id:"S5", V: { N:"Subitem N5" } }, 
   { id:"S6", V: { N:"Subitem N6" } }, 
   { id:"S7", V: { N:"Subitem N7" } }, 
   { id:"S8", V: { N:"Subitem N8" } }, 
   { id:"S9", V: { N:"Subitem N9" } }  
   ], 
Bottom: [
   { id:"Data", Cells:"Settings,Layout,CopyOnly,ClearSort" },
   ]
}