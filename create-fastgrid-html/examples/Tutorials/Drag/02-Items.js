FGrid.Data = {
Events: {

   //. -- Copies value of row N when dragged column from another grid ---
   OnAdded: function(G,R,par,next,act,ctype,O){
      if(O){ var OG = G.GetGrid(O[0]); for(var i=0;i<O.length;i++) G.SetValue(G.Rows.N,R[i],OG.GetValue(OG.Rows.N,O[i])); }
      },

   //. --- Restricts pasting other rows than ITEM ---
   OnPasted: function(G,rows,cols,values,sourcerows,sourcecols,addedrows,addedcols){
      var del = [];
      for(var i=0;i<addedcols.length;i++){ var r = addedcols[i]; if(r.D.id!="ITEM") del.push(r); }
      if(del.length==addedcols.length){ G.ActionUndo(); G.ClearUndo(1); G.ShowMessage("Only ITEM columns are accepted to paste here!","WarningShortTime"); }
      else if(del.length) G.Delete(del,2);
      }
   },
Cfg: { id:"ColItems", HideVScroll:1,
   DraggingCols:7, SelectingRows:0, SelectingCols:1, DeletingCols:2, AddingCols:2, ColIds:11, MoveColType:25, MoveColTree:7, ColTree:1, Sorting:2, ColChanges:255, 
   ColLevelsShift:0, ColLevelsNarrow:10, UndoId:1, 
   Copying:3, CopyStyles:"D,L,Collapsed", CopyHtml:1, 
   PasteFillCols:0, PasteAddCols:2, PasteFillRows:3, PasteFillSingle:0, PasteStyles:"D", PasteHtml:1,
   }, 
Cookie: {
   Cols:"" //. Does not save columns to cookies, because columns are here data
   },
RowParts: [
   { id:"Empty", Type:"Empty", Next:"Tree" },
   { id:"TopScroll", Hidden:0 },
   { id:"BottomScroll", Hidden:1 }
   ],
DefCells: {
   Clp: { PaddingLeft:-20, LeftIconsFormula:"!Grid.GetFirstChild(Col)||Grid.GetAttr(null,Col,'NoCollapse')||Col.id=='Header' ? 'Empty' : 'CollapseCol'" },
   },
Body: [ 
   { id:"N", Height:80 },
   { id:"P", D:"Panel", LeftIcons:"DeleteCol,SelectCol", IconWrap:2, Height:40, VertAlign:0, IconPaddingLeft:0 },
   { id:"id", D:"Header", VertAlign:0, IconVertAlign:1, Rotate:1, PaddingTop:5, PaddingBottom:5, Height:55, DA:"Clp", 
      A: { Header: { VertAlign:1, IconVertAlign:0, Align:0, PaddingRight:-25 } } 
      }, 
   ], 
DefRows: { 
   Row: { UseMove:1, Rotate:1, Align:0, VertAlign:1, PaddingBottom:5 }
   },
LeftCols: [
   { id:"Header", D:"Header", VertAlign:1, Align:0, LevelsPart:"Cols", SortIcons:13, PaddingRight:-25, IconVertAlign:0, Rotate:1, Width:20, 
      V: { id:" ID", N:"Name" }, A: { P: { LeftIcons:"DeleteCols,SelectCols", IconWrap:2, IconPaddingLeft:0 } } 
      }, 
   ],
DefCols: { 
   Base: { Width:20, PaddingLeft:1, PaddingRight:3 },
   NODE: { CD:"ITEM", DragId:"NODE", Accept:"ITEM" }, //. Define only for Paste
   ITEM: { CD:"SUBITEM", DragId:"ITEM", Accept:"ITEM,SUBITEM" }, 
   SUBITEM: { CD:"SUBITEM", DragId:"SUBITEM", Accept:"SUBITEM" }
   },
Cols_Cfg: { CD:"ITEM", Accept:"ITEM" },
Cols: [ 
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
Bottom: [
   { id:"Data", Cells:"Settings,CopyOnly,PasteOnly,ClearSort,Undo,Redo" }
   ]
}