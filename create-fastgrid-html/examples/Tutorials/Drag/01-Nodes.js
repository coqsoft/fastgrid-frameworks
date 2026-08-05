FGrid.Data = {
Events: {
   //. --- Restricts pasting other rows than NODE ---
   OnPasted: function(G,rows,cols,values,sourcerows,sourcecols,addedrows,addedcols){
      var del = [];
      for(var i=0;i<addedrows.length;i++){ var r = addedrows[i]; if(r.D.id!="NODE") del.push(r); }
      if(del.length==addedrows.length){ G.ActionUndo(); G.ClearUndo(1); G.ShowMessage("Only NODE rows are accepted to paste here!","WarningShortTime"); }
      else if(del.length) G.Delete(del,2);
      }
   },
Cfg: { id:"Nodes", DraggingRows:7, DeletingRows:2, RowIds:11, UndoId:1, 
   Copying:3, CopyStyles:"D,L,Collapsed", CopyHtml:1, 
   PasteFillRows:0, PasteAddRows:2, PasteFillCols:3, PasteFillSingle:0, PasteStyles:"D", PasteHtml:1,
   }, 
Cols: [ 
   { id:"id", D:"Header" }, 
   { id:"P", D:"Panel", LeftIcons:"SelectRow,DeleteRow" },
   { id:"N", Width:115 }
   ], 
DefCols: { 
   Col: { UseMove:1 }
   },
Head: [
   { D:"Header", LevelsPart:"Body", V: { id:"id", N:"Name" }, A:{ P: { LeftIcons:"SelectRows,DeleteRows" } } }, 
   ],
DefRows: { 
   NODE: { CD:"ITEM", DragId:"NODE", Accept:"ITEM" }, 
   ITEM: { CD:"SUBITEM", DragId:"ITEM", Accept:"ITEM,SUBITEM" }, 
   SUBITEM: { CD:"SUBITEM", DragId:"SUBITEM", Accept:"SUBITEM" }
   }, 
Body_Cfg: { Tree:"N", CD:"NODE", Accept:"NODE" },
Body: [ 
   { id:"N6", V: { N:"Node 6" } }, 
   { id:"N7", V: { N:"Node 7" } }, 
   { id:"N8", V: { N:"Node 8" } }, 
   { id:"N9", V: { N:"Node 9" } }, 
   { id:"N10", V: { N:"Node 10" } }, 
   { id:"N11", V: { N:"Node 11" } }, 
   { id:"N12", V: { N:"Node 12" } }, 
   { id:"N13", V: { N:"Node 13" } }, 
   { id:"N14", V: { N:"Node 14" } }  
   ], 
Top: [
   { id:"Data", Cells:"Settings,CopyOnly,PasteOnly,ClearSort,Undo,Redo" },
   ]
}