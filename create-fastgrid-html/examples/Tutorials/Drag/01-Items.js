FGrid.Data = {
Events: {
   //. --- Restricts pasting other rows than ITEM ---
   OnPasted: function(G,rows,cols,values,sourcerows,sourcecols,addedrows,addedcols){
      var del = [];
      for(var i=0;i<addedrows.length;i++){ var r = addedrows[i]; if(r.D.id!="ITEM") del.push(r); }
      if(del.length==addedrows.length){ G.ActionUndo(); G.ClearUndo(1); G.ShowMessage("Only ITEM rows are accepted to paste here!","WarningShortTime"); }
      else if(del.length) G.Delete(del,2);
      }
   },
Cfg: { id:"Items", DraggingRows:7, DeletingRows:2, RowIds:11, UndoId:1, 
   Copying:3, CopyStyles:"D,L,Collapsed", CopyHtml:1, 
   PasteFillRows:0, PasteAddRows:2, PasteFillCols:3, PasteFillSingle:0, PasteStyles:"D", PasteHtml:1,
   }, 
Cols: [ 
   { id:"id", D:"Header" }, 
   { id:"P", D:"Panel", LeftIcons:"SelectRow,DeleteRow" },
   { id:"N", Width:95 },
   ], 
DefCols: { 
   Col: { UseMove:1 }
   },
Head: [
   { D:"Header", LevelsPart:"Body", V: { id:"id", N:"Name" }, A:{ P: { LeftIcons:"SelectRows,DeleteRows" } } }, 
   ],
DefRows: { 
   NODE: { CD:"ITEM", DragId:"NODE", Accept:"ITEM" }, //. Define only for Paste
   ITEM: { CD:"SUBITEM", DragId:"ITEM", Accept:"ITEM,SUBITEM", L:-1 }, 
   SUBITEM: { CD:"SUBITEM", DragId:"SUBITEM", Accept:"SUBITEM" }
   },
Body_Cfg: { Tree:"N", CD:"ITEM", Accept:"ITEM" },
Body: [ 
   { id:"I7", V: { N:"Item 7" } }, 
   { id:"I8", V: { N:"Item 8" } }, 
   { id:"I9", V: { N:"Item 9" } }, 
   { id:"I10", V: { N:"Item 10" } }, 
   { id:"I11", V: { N:"Item 11" } }, 
   { id:"I12", V: { N:"Item 12" } }, 
   { id:"I13", V: { N:"Item 13" } }, 
   { id:"I14", V: { N:"Item 14" } }, 
   { id:"I15", V: { N:"Item 15" } } 
   ], 
Top: [
   { id:"Data", Cells:"Settings,CopyOnly,PasteOnly,ClearSort,Undo,Redo" }
   ]
}