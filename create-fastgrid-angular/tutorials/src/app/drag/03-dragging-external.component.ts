import { Component, ViewChild, ViewEncapsulation } from "@angular/core";
import { FastGridComponent } from "fastgrid-angular";

const src = { //. All layout and data for grid.
   Events: {

      //. --- Called during dragging single cell ---
      //. Used to color highlight drop area by blue border
      OnDragCell: function(G,row,col,T,torow,tocol,event,ghost,start){
         if(T||!event) return;
         const point = event instanceof MouseEvent ? event : event instanceof TouchEvent ? event.touches[0] || event.changedTouches[0] : undefined; if(!point) return;
         const par = document.getElementById("Drop");
         if(!par) return;
         let tag:Element|null = FGrid.Browser&1 ? document.elementFromPoint(point.clientX,point.clientY) : event.target instanceof Element ? event.target : null;
         while(tag && tag!==par) tag = tag.parentElement;
         par.style.borderColor = tag ? "blue" : "#D88";
         } satisfies TFGrid["OnDragCell"],

      //. --- Called after drop of single cell ---
      //. When dropped to grid, sets value of dragged cell to the destination cell
      //. When dropped to "Drop" drop area, creates here new tag with the source cell value
      OnDropCell: function(G,row,col,T,torow,tocol,event){
         if(T&&torow&&tocol){ //. Drop cell to grid
            if(row&&col&&!Array.isArray(col)) T.SetValue(torow,tocol,G.GetValue(row,col),1); //. Cell from grid
            else if(Array.isArray(col)){ T.SetValue(torow,tocol,col[0],1); T.SetAttr(torow,tocol,"TextColor",col[1]); }
            T.SetFocus(torow,tocol); 
            return; 
            }
         if(!event) return;
         const point = event instanceof MouseEvent ? event : event instanceof TouchEvent ? event.touches[0]||event.changedTouches[0] : undefined; if(!point) return;
         const par = document.getElementById("Drop"); if(!par) return;
         let tag:Element|null = FGrid.Browser&1 ? document.elementFromPoint(point.clientX,point.clientY) : event.target instanceof Element ? event.target : null;
         while(tag&&tag!==par) tag = tag.parentElement;
         par.style.borderColor = "#D88";
         if(!tag) return;
         const val = document.createElement("span");
         if(row&&col&&!Array.isArray(col)) val.innerHTML = G.GetString(row,col);
         else if(Array.isArray(col)){ val.innerHTML = String(col[0]); val.style.color = col[1]||""; }
         else val.innerHTML = "";
         val.className = "drop cell";
         tag.insertBefore(val,document.getElementById("DropInfo"));
         } satisfies TFGrid["OnDropCell"],

      //. --- Called during dragging row or column ---
      //. Used to color highlight drop area by blue border
      OnDragging: function(G,src,to,type,action,options,gridevent,event){
         if(gridevent||!event) return;
         const point = event instanceof MouseEvent ? event : event instanceof TouchEvent ? event.touches[0]||event.changedTouches[0] : undefined; if(!point) return;
         const par = document.getElementById("Drop"); if(!par) return;
         let tag:Element|null = FGrid.Browser&1 ? document.elementFromPoint(point.clientX,point.clientY) : event.target instanceof Element ? event.target : null;
         while(tag&&tag!==par) tag = tag.parentElement;
         par.style.borderColor = tag ? "blue" : "#D88";
         } satisfies TFGrid["OnDragging"],

      //. --- Called after drop of row or column ---
      //. When dragged row(s) / column(s) from outside to grid, shows them if drop accepted or deletes them if not
      //. When dropped to grid the rows dragged from grid, does nothing - continues with default action
      //. When dropped to "Drop" drop area, creates here new tag with the source row / column id value
      OnDropped: function(G,src,to,type,action,options = 0,gridevent,event){
         if(!src) return;
         const cols = G.IsCol(src);
         if(G.IsHidden(src)){ //. New temporary row dragged to grid from outside
            const selected = options&1 ? G.GetSelected(1,cols) as TRow[]|TCol[] : [src];
            if(!type){ G.Delete(selected as any,2); G.RemoveLastUndo(2); } //. No drop, row / column is removed
            else { G.Hide(selected as any,0); G.Select(selected as any,0); G.MergeUndo(); } //. Dropped, row / column is shown
            }
         if(gridevent||!event) return; //. Dropped to grid
         const point = event instanceof MouseEvent ? event : event instanceof TouchEvent ? event.touches[0]||event.changedTouches[0] : undefined; if(!point) return;
         const par = document.getElementById("Drop"); if(!par) return;
         let tag:Element|null = FGrid.Browser&1 ? document.elementFromPoint(point.clientX,point.clientY) : event.target instanceof Element ? event.target : null;
         while(tag&&tag!==par) tag = tag.parentElement;
         par.style.borderColor = "#D88";
         if(!tag) return;
         const R:TRow[]|TCol[] = options&1 ? G.GetSelected(1,cols) as TRow[]|TCol[] : [src]; //. R is array of selected rows / columns or array with only the src
         for(let i=0;i<R.length;i++){
            const item = R[i]; if(!item) continue;
            const val = document.createElement("span");
            val.innerHTML = (cols ? "Column " : "Row ") + String(G.GetAttr(item,"id"));
            val.className = "drop "+(cols ? "col" : "row");
            const info = document.getElementById("DropInfo");
            tag.insertBefore(val,info);
            }
         } satisfies TFGrid["OnDropped"],

      //. --- Called on save, here only to pdf ---
      //. Adds row / column Value to uploaded data
      OnSaveChanged: function(G:TGrid,r:TRow|TCol,s:string){
         return G.GetAttr(r,"Value")!=null ? s+",Value:\""+G.GetAttr(r,"Value").replace(/\\/g,"\\\\").replace(/"/g,"\\\"")+"\""+",TextColor:\""+G.GetAttr(r,"TextColor")+"\"" : null;
         } satisfies TFGrid["OnSaveChanged"],

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
   };

@Component({
   selector:"app-tutorial-drag-03-dragging-external",
   standalone:true,
   imports:[ FastGridComponent ],
   templateUrl:"./03-dragging-external.component.html",
   encapsulation:ViewEncapsulation.None, //. Used in this tutorial for custom css styles for dynamically created tags in Drop tag and to avoid placing these special css classes to global styles.css
   host:{ class:"Tutorial" }
   })
export class Drag_03DraggingExternalComponent {
   readonly src = src;

   @ViewChild("grid") grid!:FastGridComponent;

   CustomDragCell(event:any) : void {
      const tag = event.currentTarget as HTMLElement, rect = tag.getBoundingClientRect();
      this.grid.DragCell(event,null,[tag.innerHTML.replace(/.*cells?\s*/i,""),tag.style.color],[rect.left,rect.top,rect.width,rect.height]);
      }
   CustomDragRow(event:any,more?:number) : void {
      const tag = event.currentTarget as HTMLElement, val = tag.innerHTML.replace(/.*rows?\s*/i,""), clr = tag.style.color;
      if(more) this.grid.DragRow(event,[{ Value:val.split(",")[0],TextColor:clr },{ Value:val.split(",")[1],TextColor:clr }]);
      else this.grid.DragRow(event,{ Value:val,TextColor:clr });
      }
   CustomDragCol(event:any,more?:number) : void {
      const tag = event.currentTarget as HTMLElement, val = tag.innerHTML.replace(/.*columns?\s*/i,""), clr = tag.style.color;
      if(more) this.grid.DragCol(event,undefined,[{ Value:val.split(",")[0],TextColor:clr },{ Value:val.split(",")[1],TextColor:clr }]);
      else this.grid.DragCol(event,undefined,{ Value:val,TextColor:clr });
      }
   blockevent(event:Event) : void { event.preventDefault(); event.stopPropagation(); }

   }
