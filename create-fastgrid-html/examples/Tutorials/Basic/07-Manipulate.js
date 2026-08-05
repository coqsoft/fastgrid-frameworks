FGrid.Data = {
Cfg: { 
   id: "Manipulate", Sorting:0, SelectAllType:7, DraggingToolbars:1, TreeLines:2, DraggingToolbarsShift:15,
   RowChanges:1023, DeletingRows:2, DraggingRows:3, AddingCols:3, DeletingCols:2, SelectingCols:1, ColTree:1, ColChanges:1023,
   //HidingRows:2, HidingCols:2, Style:"Black",
   SaveUrl: { Debug:2 }, SaveFlags:"Changed,State,Parent,Next,Prev"
   }, 
DefCols:{
   Col: { Width:50 }
   },
LeftCols:[
   { id:"Header", D:"Header", LevelsPart:"Cols,RightCols" },
   { id:"Panel", D:"Panel", LeftIcons:"SelectRow,DeleteRow,HideRow,AddRow" },
   { id:"A" }, { id:"B" }
   ],
Cols_Cfg: { MinWidth:130 },
Cols: [ 
   { id:"C" }, { id:"D" }, { id:"E" }, { id:"F", L:1 }, { id:"G", L:1 }, { id:"H", L:2 }, { id:"I" }, { id:"J" }, { id:"K" }, { id:"L", L:1 }, { id:"M", L:2 }, { id:"N", L:2 }
   ], 
RightCols_Cfg: { Width:150 },
RightCols:[
   { id:"O" }, { id:"P" }, { id:"Q",L:1 }, { id:"R",L:2 }, { id:"S" }
   ],
Head: [
   { id:"Header", D:"Header", LevelsPart:"Body,Foot", V: { Header:"ID" }, A: { Panel: { LeftIcons:"SelectRows,DeleteRows,HideRows,AddRows" } } },
   { id:"Panel", D:"Panel", LeftIcons:"SelectCol,DeleteCol,HideCol,AddCol", IconWrap:1, Height:42, A: { Panel: { LeftIcons:"" }, Header: { LeftIcons:"SelectCols,DeleteCols,HideCols,AddCols" } } }
   ],
Body_Cfg: { Tree:"Header", MinHeight:160 },
Body: [
   {}, {}, { L:1 }, { L:1 }, { L:2 }, { L:3 }, { }, { L:1 }, { L:2 }, { L:3 }, { L:2 }, { L:1 }, { }, { }, { }, { L:1 }, { L:2 }, { L:3 }, { L:2 } 
   ],
Foot_Cfg: { Tree:"Header", Height:160 },
Foot: [
   {}, { L:1 }, { L:2 }, { }, { L:1 }, { L:2 }, { L:1 }, { L:2 }, { L:3 }
   ],
Top: [
   { id:"Rows", Cells:[ { D:"Label", Width:55, Value:"Rows" }, "SelectRows","DeleteRows","HideRows","AddRows","CopyRows","AddRowEnd","IndentRows","OutdentRows","ExpandRows","CollapseRows"] },
   { id:"Data", Cells:[ { D:"Label", Width:32, Value:"Data" }, "Settings","Save","Reload","Export","Print","Copy","Paste","Undo","Redo"] },
   { id:"Cols", Cells:[ { D:"Label", Width:55, Value:"Columns" }, "SelectCols","DeleteCols","HideCols","AddCols","CopyCols","AddColEnd","IndentCols","OutdentCols","ExpandCols","CollapseCols"] },
   { id:"Both", Cells:[ 
      { D:"Label", Width:32, Value:"Both" }, "Select","Delete","Hide","Add","Collapse","Indent", 
      { D:"List", List:"|Selected|Focused", Width:68, Value:"Selected", NoUndo:0, Tip:"Manipulate selected or focused rows and columns",
         OnChange:"var s = Value=='Selected'; if(!s){ Grid.SelectAllRows(0); Grid.SelectAllCols(0); } Grid.SetCfgAttr('SelectingRows',s); Grid.SetCfgAttr('SelectingCols',s); Grid.SetCfgAttr('Focus',s?1:3);Grid.Repaint();" 
         }
      ] },
   ]
}