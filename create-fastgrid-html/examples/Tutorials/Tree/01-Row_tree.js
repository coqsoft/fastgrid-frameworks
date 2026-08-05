FGrid.Data = {
Cfg: { 
   id: "RowTree", RowTree:2, TreeLines:2, DefaultValue:"x", DraggingRows:3, ResizingTag:1, ExportRowsType:"Collapsed"
   }, 
DefCols:{
   Col: { Width:100 }
   },
DefRows: { 
   0 : { L:0, Tree:"F", V: { A:"L: 0" } },
   1 : { L:1, V: { A:"L: 1" } },
   2 : { L:2, V: { A:"L: 2" } },
   3 : { L:3, V: { A:"L: 3" } },
   4 : { L:4, Tree:"E", V: { A:"L: 4" } },
   5 : { L:5, Tree:"E", V: { A:"L: 5" } },
   },
LeftCols: [ { id:"Header", D:"Header" }],
Cols: [ { id:"A", Width:120 }, { id:"B" }, { id:"C" }, { id:"D", TreeLines:0, Width:120 }, { id:"E" }, { id:"F" } ],
Head: [
   { id:"Header", D:"Header", LevelsPart:"Head,Body,Foot", V: { Header:"ID" } },
   { NoCollapse:1, V:{ A:"NoCollapse" } }, { L:1, Collapsed:1, V: { A:"Collapsed" } }, { L:2, V: { A:"Leaf" } }, { L:1, V: { A:"Leaf" } }
   ],
Head_Cfg: { Tree:"A" },
Body: [
   { D:0 }, { D:0, A: { D: { RightIcons:"CollapseRow" } }, V: { D:"RightIcons" } }, 
   { D:1 }, { D:2, A: { D: { LeftIcons:"CollapseRow" } }, V: { D:"LeftIcons" } }, { D:3 }, { D:4, A: { D: { TextIcons:"CollapseRow" } }, V: { D:"TextIcons" } }, { D:5 }, { D:2 }, { D:1 }, 
   { D:0 }, { D:1 }, { D:1 }, { D:2 }, { D:3 }, { D:4 }, { D:5 }, { D:5 }, { D:4 }, { D:5 }, { D:5 }, { D:3 }, { D:4 }, { D:2 }
   ],
Body_Cfg:{ Tree:"C", CollapseLevel:1 } , 
Foot: [
   { Tree:"B", V: { A:"L: 0" } }, { L:1, Tree:"B", V: { A:"L: 1" } }, 
   { L:2, Tree:"D", Collapsed:1, V: { A:"L: 2", D:"TreeLines: 0" } }, { L:3, Tree:"D", V: { A:"L: 3" } }, { L:4, Tree:"D", V: { A:"L: 4" } }, { L:3, Tree:"D", V: { A:"L: 3" } }, 
   { L:2, Tree:"D", V: { A:"L: 2" } }, { L:3, Tree:"D", V: { A:"L: 3" } }, { L:1, Tree:"B", V: { A:"L: 1" } }
   ],
Foot_Cfg: { Height:150 },
Top: [
   { id:"Data", Cells:"Settings,Reload,PrintPdf,Export,Copy,Paste,Undo,Redo,ExpandRows,CollapseRows,ClearSort" }, "Layout",
   { id:"Reversed", Cells:[ 
      { id:"ReversedTree", Type:"Bool", Text:"ReversedTree", Formula:"Grid.ReversedTree&1", OnChange:"Grid.SetReversedTree(Value);", Tip:"If shows the row children above the row", NoUndo:0 },
      { id:"MoveRowType", Type:"Bool", Text:"Drop icons in ID", Formula:"~Grid.MoveRowType&4", OnChange:"Grid.SetCfgAttr('MoveRowType',Value?1:5);", Tip:"If shows the drop icon in left ID column instead of tree column during dragging", NoUndo:0 } 
      ] },
   { id:"Tree", Cells:[
      { id:"TreeWidth", D:"List", Label:"TreeWidth", Width:60, NoUndo:0, List:{ 7:"Tight", 10:"Narrow", 14:"Normal", 18:"Wide" }, 
         Formula:"Grid.TreeWidth", OnChange:"Grid.SetCfgAttr('TreeWidth',Value-0);", Tip:"Indent of one tree level in the tree column"
         },
      { id:"TreeLines", D:"List", Label:"TreeLines", Width:125, NoUndo:0, List:{ "-1":"None, aligned", 0:"None", 1:"Lines", 2:"Lines + slope", 3:"Lines + hidden root" },
         Formula:"Grid.TreeLines", OnChange:"Grid.SetCfgAttr('TreeLines',Value-0);", Tip:"How shows lines between tree icons in the tree column" 
         },
      ]},
   { id:"Expand", Cells:[
      { id:"ExpandDigits", D:"List", Label:"ExpandDigits", Width:120, NoUndo:0, List: { "-1": "None, only +", 3:"All children", 7: "Immediate children" },
         Formula:"Grid.ExpandDigits", OnChange:"Grid.SetCfgAttr('ExpandDigits',Value-0);", Tip:"What is shown in the expand icon", 
         }
      ] }
   ]
}