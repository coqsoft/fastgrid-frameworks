import { Component } from "@angular/core";
import { FastGridComponent } from "fastgrid-angular";

const srcTree = { //. All layout and data for grid.
      Events: {

         //. -- Copies value of row N when dragged column from another grid ---
         OnAdded: function(G,R,par,next,act,ctype,O){
            if(O&&R){ let OG = G.GetGrid(O[0]); for(let i=0;i<O.length;i++) G.SetValue(G.Rows['N'],R[i],OG?.GetValue(OG.Rows['N'],O[i]),1); }
            } satisfies TFGrid["OnAdded"],

         //. --- Controls pasting to the tree according to dropping permission in this sample: root => NODE => ITEM => ITEM / SUBITEM => SUBITEM ---
         OnPasted: function(G,rows,cols,values,sourcerows,sourcecols,addedrows,addedcols){
            if(!addedcols) return;
            const del:TRow[] = [];
            const did:Record<string|number,number> = {};
            for(let i=0;i<addedcols.length;i++){
               let r = addedcols[i], p = G.GetParent(r);
               if(r.D.id=="SUBITEM"){ 
                  if(!p||did[p.id]){ del.push(r); did[r.id] = 1; } //. Cannot paste SUBITEM to root
                  else if(p.D.id=="NODE"){
                     p = G.GetNext(addedcols[addedcols.length-1]);
                     if(p&&p.D.id=="ITEM"){ G.Add(r,p,true); G.ExpandParents(r); }  //. Adds SUBITEM to children of the focused ITEM instead of before it
                     else { del.push(r); did[r.id] = 1; }           //. No focus or NODE, cannot paste ITEM to root
                     }
                  }
               else if(r.D.id=="ITEM"){ 
                  if(!p){
                     p = G.GetNext(addedcols[addedcols.length-1]);
                     if(p){ G.Add(r,p,true); G.ExpandParents(r); }  //. Adds ITEM to children of the focused NODE instead of before it
                     else { del.push(r); did[r.id] = 1; }           //. No focus, cannot paste ITEM to root
                     }
                  else if(did[p.id]){ del.push(r); did[r.id] = 1; } //. Already deleted pasted parent, cannot paste
                  else if(p.D.id=="SUBITEM"){
                     while(p&&p.D.id=="SUBITEM") p = G.GetParent(p);   
                     G.Add(r,p,true);                               //. Pastes ITEM to the children of parent ITEM instead of to children of SUBITEM
                     }
                  }
               else if(r.D.id=="NODE"){                             //. Pastes NODE always to the root before the focused tree
                  if(p&&p.D.id!="NODE"){
                     while(p&&p.D.id!="NODE") p = G.GetParent(p);
                     G.Add(r,"Cols",p);
                     }
                  }
               }
            if(del.length==addedcols.length){ G.ActionUndo(); G.ClearUndo(1); G.ShowMessage("Cannot paste the columns here!","WarningShortTime"); } //. All added rows removed, displays message 
            else if(del.length) G.Delete(del,2); //. Only some added rows are removed
            } satisfies TFGrid["OnPasted"]
         },
      Cfg: { 
         id:"ColTreeMain", HideVScroll:1, 
         DraggingCols:7, SelectingRows:0, SelectingCols:1, DeletingCols:2, AddingCols:2, ColIds:11, MoveColType:25, MoveColTree:7, ColTree:1, Sorting:2, ColChanges:255, 
         ColLevelsShift:0, ColLevelsNarrow:10, UndoId:1, 
         CopyPasteRowsType:"Children,Collapsed",
         Copying:3, CopyStyles:"D,L,Collapsed", CopyHtml:1, 
         PasteFillCols:0, PasteAddCols:2, PasteFillRows:3, PasteFillSingle:0, PasteStyles:"D,L,Collapsed", PasteHtml:1, PrintIcons:7,
         }, 
      Actions: {
         OnClickReload:"Reload(0,4)", //. Reloads all grids
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
         Clp: { PaddingLeft:-18, LeftIconsFormula:"!Grid.GetFirstChild(Col)||Grid.GetAttr(null,Col,'NoCollapse')||Col.id=='Header' ? 'Empty' : 'CollapseCol'" },
         },
      Body: [ 
         { id:"N", Height:80 }, 
         { id:"T", Height:50 }, 
         { id:"C", Formula:"count(1,null,null,3)", Height:60 }, 
         { id:"D", Formula:"Col.D.id||''", Height:70 },
         { id:"P", D:"Panel", LeftIcons:"DeleteCol,SelectCol", IconWrap:2, Height:40, VertAlign:0 },
         { id:"id", D:"Header", VertAlign:0, IconVertAlign:1, Rotate:1, PaddingTop:5, PaddingBottom:5, Height:55, DA:"Clp", 
            A: { Header: { VertAlign:1, IconVertAlign:0, Align:0, PaddingRight:-25 } } 
            }, 
         ], 
      DefRows: { 
         Row: { UseMove:1, Rotate:1, Align:0, VertAlign:1, PaddingBottom:5 }
         },
      DefCols: {
         Base: { Width:25 },
         NODE: { CD:"ITEM", DragId:"NODE", Accept:"ITEM" }, 
         ITEM: { CD:"SUBITEM", DragId:"ITEM", Accept:"ITEM,SUBITEM" }, 
         SUBITEM: { CD:"SUBITEM", DragId:"SUBITEM", Accept:"SUBITEM" }  
         }, 
      LeftCols: [
         {  id:"Header", D:"Header", VertAlign:1, Align:0, LevelsPart:"Cols", SortIcons:13, PaddingRight:-25, IconVertAlign:0, Rotate:1, Width:25, 
            V: { id:" ID", N:"Name", T:"Text", C:"Count", D:"D" }, 
            A: { P: { LeftIcons:"DeleteCols,SelectCols", IconWrap:2 } } 
            }, 
         ],
      Cols_Cfg: { CD:"NODE", Accept:"NODE" },
      Cols: [ 
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
      Bottom: [
         { id:"Data", Cells:"Settings,Reload,Print,Pdf,Export,CopyOnly,PasteOnly,Undo,Redo,ClearSort,ExpandCols,CollapseCols" },
         ],
   };

   const srcNodes = { //. All layout and data for grid.
      Events: {

         //. -- Copies value of row N when dragged column from another grid ---
         OnAdded: function(G,R,par,next,act,ctype,O){
            if(O&&R){ let OG = G.GetGrid(O[0]); for(let i=0;i<O.length;i++) G.SetValue(G.Rows['N'],R[i],OG?.GetValue(OG.Rows['N'],O[i])); }
            } satisfies TFGrid["OnAdded"],

         //. --- Restricts pasting other rows than NODE ---
         OnPasted: function(G,rows,cols,values,sourcerows,sourcecols,addedrows,addedcols){
            if(!addedcols) return;
            const del:TRow[] = [];
            for(let i=0;i<addedcols.length;i++){ let r = addedcols[i]; if(r.D.id!="NODE") del.push(r); }
            if(del.length==addedcols.length){ G.ActionUndo(); G.ClearUndo(1); G.ShowMessage("Only NODE columns are accepted to paste here!","WarningShortTime"); }
            else if(del.length) G.Delete(del,2);
            } satisfies TFGrid["OnPasted"]
         },
      Cfg: { id:"ColNodes", HideVScroll:1,
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
         NODE: { CD:"ITEM", DragId:"NODE", Accept:"ITEM" }, 
         ITEM: { CD:"SUBITEM", DragId:"ITEM", Accept:"ITEM,SUBITEM" }, 
         SUBITEM: { CD:"SUBITEM", DragId:"SUBITEM", Accept:"SUBITEM" }
         }, 
      Cols_Cfg: { CD:"NODE", Accept:"NODE" },
      Cols: [ 
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
      Bottom: [
         { id:"Data", Cells:"Settings,CopyOnly,PasteOnly,ClearSort,Undo,Redo" },
         ]
   };

   const srcItems = { //. All layout and data for grid.
      Events: {

         //. -- Copies value of row N when dragged column from another grid ---
         OnAdded: function(G,R,par,next,act,ctype,O){
            if(O&&R){ let OG = G.GetGrid(O[0]); for(let i=0;i<O.length;i++) G.SetValue(G.Rows['N'],R[i],OG?.GetValue(OG.Rows['N'],O[i])); }
            } satisfies TFGrid["OnAdded"],

         //. --- Restricts pasting other rows than ITEM ---
         OnPasted: function(G,rows,cols,values,sourcerows,sourcecols,addedrows,addedcols){
            if(!addedcols) return;
            const del:TRow[] = [];
            for(let i=0;i<addedcols.length;i++){ let r = addedcols[i]; if(r.D.id!="ITEM") del.push(r); }
            if(del.length==addedcols.length){ G.ActionUndo(); G.ClearUndo(1); G.ShowMessage("Only ITEM columns are accepted to paste here!","WarningShortTime"); }
            else if(del.length) G.Delete(del,2);
            } satisfies TFGrid["OnPasted"]
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
   };

   const srcSubitems = { //. All layout and data for grid.
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
   };

@Component({
   selector:"app-tutorial-drag-02-dragging-columns",
   standalone:true,
   imports:[ FastGridComponent ],
   templateUrl:"./02-dragging-columns.component.html",
   host:{ class:"Tutorial" }
   })
export class Drag_02DraggingColumnsComponent {
   readonly srcTree = srcTree;
   readonly srcNodes = srcNodes;
   readonly srcItems = srcItems;
   readonly srcSubitems = srcSubitems;
   }
