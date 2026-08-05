<script>
import { FastGrid } from "fastgrid-svelte";
import "../Tutorial.css";


   const srcTree = { //. All layout and data for grid.
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
   };

   const srcNodes = { //. All layout and data for grid.
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
   };

   const srcItems = { //. All layout and data for grid.
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
   };

   const srcSubitems = { //. All layout and data for grid.
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
   };
</script>

<h1>1. Dragging and pasting rows</h1>
      <h5>Dragging rows inside grid and between grids and copying &amp; pasting rows via clipboard</h5>
      <section>
         <div>
            <FastGrid src={srcTree} style="display:inline-block; height:490px; margin-right:10px;"/>
            <FastGrid src={srcNodes} style="display:inline-block; height:490px; margin-right:10px;"/>
            <FastGrid src={srcItems} style="display:inline-block; height:490px; margin-right:10px;"/>
            <FastGrid src={srcSubitems} style="display:inline-block; height:490px;"/>
         </div>
      </section>

      
      <ul>
         <li>
           <h4>Example description</h4><br />
           <ul>
           <li><i><b>Move</b> row with children by dragging by <b>left</b> mouse button, <b>copy</b> row by dragging by <b>shift+right</b> mouse button, <b>copy</b> row with <b>children</b> by dragging by <b>ctrl+right</b> mouse button.
           <b>Select</b> more rows (by panel row panel button) and drag them together.</i></li>
           <li><i>There are three row types (default rows), NODE, ITEM and SUBITEM. The NODE can contain only ITEM. The ITEM can contain ITEM and SUBITEM. The SUBITEM can contain only SUBITEM.</i></li>
           <li><i>New child in NODE is ITEM. New child in ITEM is SUBITEM. New child in SUBITEM is SUBITEM.</i></li>
           <li><i>The Tree and Nodes grids can contain all rows (NODE, ITEM, SUBITEM), root rows are NODE. The Items grid can contain ITEM and SUBITEM rows, root rows are ITEM. 
           The Subitems grid does not accept new rows.</i></li>
           <li><i>Rows dragged from Tree, Nodes and Items grids are moved (or copied if dragged by right or middle mouse button) and rows dragged from Subitems grid are always copied.</i></li>
           <li><i>Rows are copied to clipboard always with children, preserves their tree structure and default rows.</i></li>
           <li><i>To Tree are pasted rows fully with tree, before focused or in children of focused depending on default row of the copied rows.</i></li>
           <li><i>To Nodes and Items are pasted only with appropriate default rows, NODE or ITEM, always before focused row.</i></li>
           <li><i>All the grids share the same <b>undo</b> queue</i> to correctly undo / redo the moves between grids.</li>
           </ul>
         </li>
         <li><h4>Dragging</h4><br />
         Dragging rows in grid can be controlled by Cfg <dfn>DraggingRows</dfn>, it can permit or restrict dragging inside row part, between parts, between parts, etc.<br />
         By which cell can be row caught and dragged is set by column attribute <dfn>UseMove</dfn>, by default set in column <b>D</b>: <b>Header</b> / <b>Index</b>.<br />
         Dragging rows can be more controlled by Cfg <dfn>MoveRowTypw</dfn> and in tree by Cfg <dfn>MoveRowTree</dfn>.<br />
         </li>
         <li><h4>Dropping permissions</h4><br />
         Dropping permissions are specified by <b>parent</b> row or <b>row part</b> <dfn>Accept</dfn> attribute. It specifies which rows can be dropped to children of the row or row part.<br />
         The rows for the <b>Accept</b> are identified by row attribute <dfn>DragId</dfn>. By default all rows have set <b>DragId</b> = "<b>Row</b> and <b>Accept</b> = "<b>Row</b>".<br />
         The <b>Accept</b> and <b>DragId</b> are usually set in row default, aassigned to row by <dfn>D</dfn> or parent <dfn>CD</dfn> attribute.<br />
         </li>
         <li><h4>Copying rows to clipboard</h4><br />
         To copy whole rows to clipboard set <dfn>Copying</dfn> = <b>3</b>.<br />
         To copy required information for pasting restrictions use Cfg attribute <dfn>CopyStyles</dfn> with values like <b>D</b> or <b>L</b>. And set also <dfn>CopyHtml</dfn> = <b>1</b>.<br />
         In tree is possible to copy also parents and / or children of selected / focused rows adding <b>Parent</b> or <b>Children</b> to Cfg <dfn>CopyPasteRowsType</dfn>.<br />
         </li>
         <li><h4>Pasting rows from clipboard</h4><br />
         To add new rows by pasting from clipboard, set Cfg <dfn>PasteFillRows</dfn> = <b>0</b>, <dfn>PasteAddRows</dfn> = <b>2</b>, <dfn>PasteFillCols</dfn> = <b>3</b>
         and optionally <dfn>PasteFillSingle</dfn> = <b>0</b>.<br />
         To use information copied for pasting restrictions use Cfg attribute <dfn>PasteStyles</dfn> with values like <b>D</b> or <b>L</b>. And set also <dfn>PasteHtml</dfn> = <b>1</b>.<br />
         To more control which rows are where pasted, use API event <dfn>OnPaste</dfn>, here is possible to move or delete the newly added rows.<br />
         </li>
      </ul>
