FGrid.Data = {
Cfg: { id:"Subitems", DraggingRows:7, AddingRows:0, Copying:3, CopyStyles:"D", CopyHtml:1, PasteFillRows:0, UndoId:1 }, 
Cols: [ 
   { id:"id", D:"Header" }, 
   { id:"P", D:"Panel", LeftIcons:"SelectRow" },
   { id:"N", Width:90 }  
   ], 
DefCols: { 
   Col: { UseMove:1 }
   },
Head: [
   { D:"Header", V: { id:"id", N:"Name" }, A:{ P: { LeftIcons:"SelectRows" } } }, 
   ],
DefRows: { 
   SUBITEM: { CD:"SUBITEM", DragId:"SUBITEM", Accept:"SUBITEM", NoMove:8 }
   }, 
Body_Cfg: { CD:"SUBITEM", Accept:"SUBITEM" }, 
Body: [ 
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
Top: [
   { id:"Data", Cells:"Settings,Layout,CopyOnly,ClearSort" },
   ]
}