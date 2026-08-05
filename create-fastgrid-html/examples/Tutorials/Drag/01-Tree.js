FGrid.Data = {
Events: {

   //. --- Controls pasting to the tree according to dropping permission in this sample: root => NODE => ITEM => ITEM / SUBITEM => SUBITEM ---
   OnPasted: function(G,rows,cols,values,sourcerows,sourcecols,addedrows,addedcols){
      var del = [], did = {}; 
      for(var i=0;i<addedrows.length;i++){
         var r = addedrows[i], p = G.GetParent(r);
         if(r.D.id=="SUBITEM"){ 
            if(!p||did[p.id]){ del.push(r); did[r.id] = 1; } //. Cannot paste SUBITEM to root
            else if(p.D.id=="NODE"){
               p = G.GetNext(addedrows[addedrows.length-1]);
               if(p&&p.D.id=="ITEM"){ G.Add(r,p,true); G.ExpandParents(r); }  //. Adds SUBITEM to children of the focused ITEM instead of before it
               else { del.push(r); did[r.id] = 1; }           //. No focus or NODE, cannot paste ITEM to root
               }
            }
         else if(r.D.id=="ITEM"){ 
            if(!p){
               p = G.GetNext(addedrows[addedrows.length-1]);
               if(p){ G.Add(r,p,true); G.ExpandParents(r); }  //. Adds ITEM to children of the focused NODE instead of before it
               else { del.push(r); did[r.id] = 1; }           //. No focus, cannot paste ITEM to root
               }
            else if(did[p.id]){ del.push(r); did[r.id] = 1; } //. Already deleted pasted parent, cannot paste
            else if(p.D.id=="SUBITEM"){
               while(p.D.id=="SUBITEM") p = G.GetParent(p);   
               G.Add(r,p,true);                               //. Pastes ITEM to the children of parent ITEM instead of to children of SUBITEM
               }
            }
         else if(r.D.id=="NODE"){                             //. Pastes NODE always to the root before the focused tree
            if(p&&p.D.id!="NODE"){
               while(p.D.id!="NODE") p = G.GetParent(p);
               G.Add(r,"Body",p);
               }
            }
         }
      if(del.length==addedrows.length){ G.ActionUndo(); G.ClearUndo(1); G.ShowMessage("Cannot paste the rows here!","WarningShortTime"); } //. All added rows removed, displays message 
      else if(del.length) G.Delete(del,2); //. Only some added rows are removed
      }
   },
Cfg: { 
   id:"Tree", DraggingRows:7, DeletingRows:2, RowIds:11, MoveRowTree:7, UndoId:1,
   CopyPasteRowsType:"Children,Collapsed",
   Copying:3, CopyStyles:"D,L,Collapsed", CopyHtml:1, 
   PasteFillRows:0, PasteAddRows:2, PasteFillCols:3, PasteFillSingle:0, PasteStyles:"D,L,Collapsed", PasteHtml:1,
   }, 
Actions: {
   OnClickReload:"Reload(0,4)", //. Reloads all grids
   },
Cols: [ 
   { id:"id", D:"Header", Width:40 }, 
   { id:"P", D:"Panel", LeftIcons:"SelectRow,DeleteRow" },
   { id:"N", Width:185 }, 
   { id:"T" }, 
   { id:"C", Formula:"count(null,null,null,3)" }, 
   { id:"D", Formula:"Row.D.id||''" }
   ], 
DefCols: { 
   Col: { UseMove:1 }
   },
DefRows: {
   NODE: { CD:"ITEM", DragId:"NODE", Accept:"ITEM" }, 
   ITEM: { CD:"SUBITEM", DragId:"ITEM", Accept:"ITEM,SUBITEM" }, 
   SUBITEM: { CD:"SUBITEM", DragId:"SUBITEM", Accept:"SUBITEM" }  
   }, 
Head: [
   { D:"Header", LevelsPart:"Body", V: { id:"id", N:"Name", T:"Text", C:"Count", D:"D" }, A:{ P: { LeftIcons:"SelectRows,DeleteRows" } } }, 
   ],
Body_Cfg: { Tree:"N", CD:"NODE", Accept:"NODE" },
Body: [ 
   { id:"N1", L:0, Collapsed:1, V: { N:"Node 1", T:"N1" } },
   { id:"I1", L:1, V: { N:"Item 1", T:"I1" } },
   { id:"S1", L:2, V: { N:"Subitem 1", T:"S1" } }, 
   { id:"S2", L:2, V: { N:"Subitem 2", T:"S2" } },
   { id:"I2", L:1, V: { N:"Item 2", T:"I2" } },  
   { id:"N2", L:0, V: { N:"Node 2", T:"N2" } }, 
   { id:"N3", L:0, V: { N:"Node 3", T:"N3" } },
   { id:"I3", L:1, V: { N:"Item 3", T:"I3" } },
   { id:"S3", L:2, V: { N:"Subitem 3", T:"S3" } },
   { id:"S4", L:3, V: { N:"Subitem 4", T:"S4" } },
   { id:"S5", L:2, V: { N:"Subitem 5", T:"S5" } },
   { id:"I4", L:1, V: { N:"Item 4", T:"I4" } },
   { D:"ITEM", id:"I5", L:2, V: { N:"Item 5", T:"I5" } },
   { id:"S6", L:3, V: { N:"Subitem 6", T:"S6" } },
   { id:"N4", L:0, V: { N:"Node 4", T:"N4" } },
   { id:"I6", L:1, V: { N:"Item 6", T:"I6" } },
   { id:"N5", L:0, V: { N:"Node 5", T: "N5" } }
   ], 
Top: [
   { id:"Data", Cells:"Settings,Layout,Reload,PrintPdf,Export,CopyOnly,PasteOnly,Undo,Redo,ClearSort,ExpandRows,CollapseRows" },
   ]
}