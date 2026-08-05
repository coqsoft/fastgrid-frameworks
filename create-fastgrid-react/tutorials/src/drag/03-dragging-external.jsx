import React, { useMemo, useRef } from "react";
import { FastGrid } from "fastgrid-react";
import "../Tutorial.css";
import "./03-dragging-external.css";

export default function App() {

   const src = useMemo(() => ({ //. All layout and data for grid. Memo is used for simple object created inside the App function to avoid re-creating grid on every React App render
      Events: {

         //. --- Called during dragging single cell ---
         //. Used to color highlight drop area by blue border
         OnDragCell: function(G,row,col,T,torow,tocol,event,ghost,start){
            if(T) return;
            var par = document.getElementById("Drop"), tag = window.FGrid.Browser&1 ? document.elementFromPoint(event.clientX,event.clientY) : event.target;
            while(tag && tag!=par) tag = tag.parentNode;
            par.style.borderColor = tag ? "blue" : "#D88";
            },

         //. --- Called after drop of single cell ---
         //. When dropped to grid, sets value of dragged cell to the destination cell
         //. When dropped to "Drop" drop area, creates here new tag with the source cell value
         OnDropCell: function(G,row,col,T,torow,tocol,event){
            if(torow&&tocol){ //. Drop cell to grid
               if(row) T.SetValue(torow,tocol,G.GetValue(row,col),1); //. Cell from grid
               else { T.SetValue(torow,tocol,col[0],1); T.SetAttr(torow,tocol,"TextColor",col[1]); }
               T.SetFocus(torow,tocol); 
               return; 
               }
            var par = document.getElementById("Drop"), tag = window.FGrid.Browser&1 ? document.elementFromPoint(event.clientX,event.clientY) : event.target;
            while(tag && tag!=par) tag = tag.parentNode;
            par.style.borderColor = "#D88";
            if(!tag) return;
            var val = document.createElement("span");
            val.innerHTML = row ? G.GetString(row,col) : col;
            val.className = "drop cell";
            tag.insertBefore(val,document.getElementById("DropInfo"));
            },

         //. --- Called during dragging row or column ---
         //. Used to color highlight drop area by blue border
         OnDragging: function(G,src,to,type,action,options,gridevent,event){
            if(gridevent) return;
            var par = document.getElementById("Drop"), tag = window.FGrid.Browser&1 ? document.elementFromPoint(event.clientX,event.clientY) : event.target;
            while(tag && tag!=par) tag = tag.parentNode;
            par.style.borderColor = tag ? "blue" : "#D88";
            },

         //. --- Called after drop of row or column ---
         //. When dragged row(s) / column(s) from outside to grid, shows them if drop accepted or deletes them if not
         //. When dropped to grid the rows dragged from grid, does nothing - continues with default action
         //. When dropped to "Drop" drop area, creates here new tag with the source row / column id value
         OnDropped: function(G,src,to,type,action,options,gridevent,event){
            var cols = G.IsCol(src);
            if(G.IsHidden(src)){ //. New temporary row dragged to grid from outside
               if(options&1) src = G.GetSelected(1,cols);
               if(!type){ G.Delete(src,2); G.RemoveLastUndo(2); } //. No drop, row / column is removed
               else { G.Hide(src,0); G.Select(src,0); G.MergeUndo(); } //. Dropped, row / column is shown
               }
            if(gridevent) return; //. Dropped to grid
            var par = document.getElementById("Drop"), tag = window.FGrid.Browser&1 ? document.elementFromPoint(event.clientX,event.clientY) : event.target;
            while(tag && tag!=par) tag = tag.parentNode;
            par.style.borderColor = "#D88";
            if(!tag) return;
            var R = src.length ? src : options&1 ? G.GetSelected(1,cols) : [src]; //. R is array of selected rows / columns or array with only the src
            for(var i=0;i<R.length;i++){
               var val = document.createElement("span"), src = R[i];
               val.innerHTML = (cols ? "Column " : "Row ") + G.GetAttr(src,null,"id");
               val.className = "drop "+(cols ? "col" : "row");
               tag.insertBefore(val,document.getElementById("DropInfo"));
               }
            },

         //. --- Called on save, here only to pdf ---
         //. Adds row / column Value to uploaded data
         OnSaveChanged: function(G,r,s){
            if(r.Value!=null) return s+",Value:\""+r.Value.replace(/\\/g,"\\\\").replace(/"/g,"\\\"")+"\""+",TextColor:\""+r.TextColor+"\"";
            }

         },
      Cfg: { 
         id: "DragExt", Sorting:0, SelectAllType:7, TreeLines:2, ColTree:1, SelectingCols:1, MoveColType:1, RowChanges:1022, ColChanges:1022, OverScroll:2
         }, 
      Actions: {
         OnDragAny:"Event.Touch ? (Drag(0,15,1) || Grid.IsFocused(Row,Col) && DragCell()) : (Focus(), Drag(0,15,1) || DragCell())"
         },
      Cookie: {
         Cols:"" //. Does not save columns to cookies, because columns are here data
         },
      DefCols: {
         Col: { Width:50 }
         },
      LeftCols:[
         { id:"Header", D:"Header", LevelsPart:"Cols", VIndex:-3 },
         { id:"Panel", D:"Panel", LeftIcons:"SelectRow" },
         ],
      Cols: [ 
         { id:"A" }, { id:"B" }, { id:"C" }, { id:"D", L:1 }, { id:"E", L:1 }, { id:"F", L:2 }, { id:"G" }, { id:"H" }, { id:"I" }, { id:"J", L:1 }, { id:"K", L:2 }
         ], 
      Head: [
         { id:"Header", D:"Header", LevelsPart:"Body", V: { Header:"ID" }, A: { Panel: { LeftIcons:"SelectRows" } } },
         { id:"Panel", D:"Panel", LeftIcons:"SelectCol", A: { Panel: { LeftIcons:"" }, Header: { LeftIcons:"SelectCols" } } }
         ],
      Body_Cfg: { Tree:"Header" },
      Body: [
         { V:"|A1|B1|C1|D1|E1|F1|G1|H1|I1|J1|K1" }, 
         { V:"|A2|B2|C2|D2|E2|F2|G2|H2|I2|J2|K2" }, 
         { V:"|A3|B3|C3|D3|E3|F3|G3|H3|I3|J3|K3", L:1 }, 
         { V:"|A4|B4|C4|D4|E4|F4|G4|H4|I4|J4|K4", L:1 }, 
         { V:"|A5|B5|C5|D5|E5|F5|G5|H5|I5|J5|K5", L:2 }, 
         { V:"|A6|B6|C6|D6|E6|F6|G6|H6|I6|J6|K6", L:3 }, 
         { V:"|A7|B7|C7|D7|E7|F7|G7|H7|I7|J7|K7" }, 
         { V:"|A8|B8|C8|D8|E8|F8|G8|H8|I8|J8|K8", L:1 }, 
         { V:"|A9|B9|C9|D9|E9|F9|G9|H9|I9|J9|K9", L:2 }, 
         { V:"|A10|B10|C10|D10|E10|F10|G10|H10|I10|J10|K10", L:3 }, 
         { V:"|A11|B11|C11|D11|E11|F11|G11|H11|I11|J11|K11", L:2 }, 
         { V:"|A12|B12|C12|D12|E12|F12|G12|H12|I12|J12|K12", L:1 }
         ],
      Top: [
         { id:"Data", Cells:"Settings,Reload,Print,Pdf,Export,CopyOnly,Undo,Redo" }, "Layout",
         ]
   }), []);

   const gridRef = useRef(null); //. Grid reference received for grid, access the grid object as gridRef.current

   //. -- Starts dragging cell from outside ---
   function CustomDragCell(event){
   var tag = event.currentTarget, A = tag.getBoundingClientRect();
   gridRef.current?.DragCell(event,null,[tag.innerHTML.replace(/.*cells?\s*/i,""),tag.style.color],[A.left,A.top,A.width,A.height]);
   }

   //. -- Starts dragging row from outside ---
   function CustomDragRow(event,more){
   var G = gridRef.current, tag = event.currentTarget, val = tag.innerHTML.replace(/.*rows?\s*/i,""), clr = tag.style.color;
   if(more) G.DragRow(event,[{ Value:val.split(",")[0], TextColor:clr },{ Value: val.split(",")[1], TextColor:clr }]);
   else G.DragRow(event,{ Value: val, TextColor:clr });
   }

   //. -- Starts dragging column from outside ---
   function CustomDragCol(event,more){
   var G = gridRef.current, tag = event.currentTarget, val = tag.innerHTML.replace(/.*columns?\s*/i,""), clr = tag.style.color;
   if(more) G.DragCol(event,null,[{ Value:val.split(",")[0], TextColor:clr },{ Value: val.split(",")[1], TextColor:clr }]);
   else G.DragCol(event,null,{ Value: val, TextColor:clr });
   }

   function blockevent(e){ e.preventDefault(); e.stopPropagation(); }

   return (<>
      <h1>3. Dragging from and to external sources</h1>
      <h5>Dragging rows, columns and cell values from and to outside</h5>
      <section>
         <FastGrid src={src} ref={gridRef} style={{display:"inline-block", maxWidth:"100%"}}/>
      </section>

      {/*. Cells, rows, columns dropped  from grid */}
      <section>
         <div id='Drop' onMouseDown={blockevent} className="dropparent">
            <i id='DropInfo' style={{color:"gray",fontSize:"12px"}}>Drag grid rows, columns or cells here. To drag grid cell on touch screen, focus it first.</i>
         </div>
      </section>

      {/*. Cells,rows, columns to drag into grid */}
      <section>
         <div onMouseDown={blockevent} onTouchStart={blockevent} className="dragparent"> 
            <span onMouseDown={CustomDragCell} onTouchStart={CustomDragCell} className='drag cell'>Cell XXX</span>
            <span onMouseDown={CustomDragCell} onTouchStart={CustomDragCell} className='drag cell' style={{color:"red"}}>Cell YYY</span>
            <span onMouseDown={CustomDragCell} onTouchStart={CustomDragCell} className='drag cell' style={{color:"green"}}>Cell ZZZ</span>
            <span onMouseDown={CustomDragRow} onTouchStart={CustomDragRow} className='drag row'>Row RRR</span>
            <span onMouseDown={ (event) => CustomDragRow(event,1) } onTouchStart={ (event) => CustomDragRow(event,1) } className='drag row' style={{color:"blue"}}>2 rows SSS,TTT</span>
            <span onMouseDown={CustomDragCol} onTouchStart={CustomDragCol} className='drag col'>Column UUU</span>
            <span onMouseDown={ (event) => CustomDragCol(event,1) } onTouchStart={ (event) => CustomDragCol(event,1) } className='drag col' style={{color:"orange"}}>2 columns VVV,WWW</span>
            <i id='DropInfo' style={{color:"gray",fontSize:"12px",whiteSpace:"nowrap"}}>Drag these items to grid</i>
         </div>
      </section>

      {/*. Description */}
      <ul>
         <li><h4>Dragging cell to external source</h4><br />
         To permit dragging individual cells assign action <dfn>DragCell</dfn> to <b>OnDragAny</b> event in Actions or in individual cell / row / column attribute. 
         If used in Actions, to preserve dragging whole rows / columns by Header, preserve here also the <b>Drag</b> action, e.g. <i>OnDragAny:"Focus(), Drag(0,15,1) || DragCell()"</i>.<br />
         And define API event <dfn>OnDropCell</dfn> to do the required action after the cell is dropped inside or outside the grid.<br />
         Optionally define also API event <dfn>OnDragCell</dfn> to control something during dragging, e.g. visually highlight tags with dropping permissions.<br />
         </li>
         <li><h4>Dragging row(s) / column(s) to external source</h4><br />
         Rows and columns can be dragged outside grid by default set by <b>DraggingRows</b> / <b>DraggingCols</b>.<br />
         Define API event <dfn>OnDrop</dfn> or <dfn>OnDropped</dfn> to do the required action after the row or column is dropped outside (or inside) the grid.<br />
         If permitted dragging more selected rows or columns, get the dragged selection by API method <b>GetSelection</b>.<br />
         Optionally define also API event <dfn>OnDragging</dfn> to control something during dragging, e.g. visually highlight tags with dropping permissions.<br />
         </li>
         <li><h4>Dragging cell from external source to grid</h4><br />
         To start dragging cell from outside call API method <dfn>DragCell</dfn>. It behaves like the action <b>DragCell</b> for dragging from grid.<br />
         Define API event <dfn>OnDropCell</dfn> to do the required action after the cell is dropped inside or outside the grid.<br />
         Optionally define also API event <dfn>OnDragCell</dfn> to control something during dragging, e.g. visually highlight tags with dropping permissions.<br />
         </li>
         <li><h4>Dragging row / column from external source to grid</h4><br />
         To start dragging row(s) from outside call API method <dfn>DragRow</dfn>.
         To start dragging column(s) from outside call API method <dfn>DragCol</dfn>.<br />
         These methods add hidden row(s) or column(s) to grid and start their dragging.<br />
         Define API event <dfn>OnDrop</dfn> or <dfn>OnDropped</dfn> to do the required action after the row or column is dropped inside (or outside) the grid.
         If drop is accepted, show the dropped row(s) or column(s) by <b>Hide</b> API method. 
         If drop is rejected, remove the temporary row(s) or column(s) from grid by <b>Delete</b> API method.<br />
         Optionally define also API event <dfn>OnDragging</dfn> to control something during dragging, e.g. visually highlight tags with dropping permissions.<br />
         </li>
      </ul>
      </>);
}