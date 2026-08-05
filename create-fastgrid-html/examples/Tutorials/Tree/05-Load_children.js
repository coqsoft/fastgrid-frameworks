FGrid.Data = {
Cfg: { 
   id:"LoadChildren", ChildrenUrl:"05-Load_children_*Row.js", PrintLoadChildren:1, ExportLoadChildren:1, ExportRowsType:"Collapsed", OverScroll:2
   }, 
Cookie: { RowParts:"-CollapseLevel", ColParts:"-CollapseLevel" }, //. CollapseLevel cannot be saved to cookies when used loading children on demand 
DefCols:{
   Col: { Width:50 }
   },
LeftCols: [ { id:"Header", D:"Header", Width:70, Align:0 }],
Cols: [ { id:"A", Width:400 }, { id:"B", RightIcons:"CollapseRow" }, { id:"C" }, { id:"D" }, { id:"E" }, { id:"F" } ],
Head: [
   { id:"Header", D:"Header", LevelsPart:"Body", V: { Header:"ID" } },
   ],
Body: [
   { id:"1", V: { A:"Normal expanded parent" } },
   { id:"1-1", L:1, V: { A:"Normal child" } },
   { id:"1-2", L:1, Collapsed:1, Children:3, Color:"#FEF", V: { A:"Load children on expand" } },
   { id:"2", Collapsed:1, V: { A:"Normal collapsed parent" } },
   { id:"2-1", L:1, V: { A:"Normal child" } },
   { id:"2-2", L:1, V: { A:"Normal child" } },
   { id:"3", Collapsed:1, Children:3, ChildrenL:4, Color:"#FEF", V: { A:"Load children on expand with deep tree" } },
   { id:"4", Collapsed:1, Children:4, Color:"#FEF", V: { A:"Load children on expand to row with children" } },
   { id:"4-1", L:1, V: { A:"Normal child" } },
   { id:"4-2", L:1, V: { A:"Normal child" } },
   ],
Body_Cfg:{ Tree:"A" }, 
Top: [
   { id:"Data", Cells:"Settings,Reload,PrintPdf,Export,Copy,Paste,Undo,Redo,ExpandRows,CollapseRows,ClearSort" }, "Layout",
   { Cells:[
      { Type:"Bool", LabelRight:"Reload children", Formula:"Grid.GetCfgAttr('ChildrenReload')", OnChange:"Grid.SetCfgAttr('ChildrenReload',Value)", Tip:"If set, reloads children rows on every expand, not only on the first one.<br>The change affects only not yet loaded children." },
      ] }
   ],
Media: {
   Mobile: {
      Cols: [{ id:"A", Width:380 }, { id:"B", Width:25 }]
      }
   }
}