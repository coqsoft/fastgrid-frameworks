FGrid.Data = {
Cfg: { 
   id: "ColTree", ColTree:1, PrintToolbars:"", PrintIcons:"CollapseCol", ExportColsType:"Collapsed", OverScroll:2
   }, 
RowParts: [
   { id:"BottomTree", Type:"Tree", Next:"Foot", Up:3, Add:1, Item:"Bottom tree" },
   ],
DefCells: {
   Clp: { RightIconsFormula:"!Grid.GetFirstChild(Col)||Grid.GetAttr(null,Col,'NoCollapse')||Col.id=='Header' ? '' : 'CollapseCol'" },
   },
DefCols: { 
   Base: { Width:42 },
   0 : { L:0, V: { A:"L: 0" } },
   1 : { L:1, V: { A:"L: 1" } },
   2 : { L:2, V: { A:"L: 2" } },
   3 : { L:3, V: { A:"L: 3" } },
   4 : { L:4, V: { A:"L: 4" } },
   5 : { L:5, V: { A:"L: 5" } },
   },
LeftCols: [ 
   { id:"Header", D:"Header", LevelsPart:"LeftCols,Cols,RightCols", Width:40 }, 
   { NoCollapse:1, V:{ A:"NoCollapse" } }, { L:1, Collapsed:1, V: { A:"Collapsed" } }, { L:2, V: { A:"Leaf" } }, { L:1, V: { A:"Leaf" } }
   ],
Cols: [ 
   { D:0 }, { D:0, A: { D: { RightIcons:"CollapseRow" } }, V: { D:"RightIcons" } }, 
   { D:1 }, { D:2, A: { D: { LeftIcons:"CollapseRow" } }, V: { D:"LeftIcons" }, NoCollapse:1 }, { D:3 }, { D:4, A: { D: { TextIcons:"CollapseRow" } }, V: { D:"TextIcons" } }, { D:5 }, { D:2 }, { D:1 }, 
   { D:0 }, { D:1 }, { D:1 }, { D:2 }, { D:3 }, { D:4 }, { D:5 }, { D:5 }, { D:4 }, { D:5 }, { D:5 }, { D:3 }, { D:4 }, { D:2 }
   ],
Cols_Cfg:{ 
   CollapseLevel:-2, MinWidth:130
   },
RightCols: [
   { }, { L:1 }, 
   { L:2, Collapsed:1 }, { L:3 }, { L:4 }, { L:3 }, 
   { L:2 }, { L:3 }, { L:1 }
   ],
Head: [
   { id:"Header", D:"Header", V: { Header:"ID" } },
   { Formula:"Col.L" }
   ],
Body: [
   {}, {}, {}, {}
   ],
Foot: [
   {}, {}, { D:"Header", SortIcons:0, DA:"Clp", V: { Header:"Clp" }, Item:"Bottom names" }
   ],
Top: [
   { id:"Data", Cells:"Settings,Reload,PrintPdf,Export,Copy,Paste,Undo,Redo,ExpandCols,CollapseCols,ClearSort" }, "Layout",
   { id:"Reversed", Cells:[ 
      { id:"ReversedTree", Type:"Bool", Text:"ReversedTree", Formula:"Grid.ReversedTree&2", OnChange:"Grid.SetReversedTree(Value?2:0);", Tip:"If shows the row children above the row", NoUndo:0 },
      { id:"ColTreePaddingLeft", Type:"Bool", Text:"Center buttons", Formula:"Grid.ColTreePaddingLeft==null", OnChange:"Grid.SetCfgAttr('ColTreePaddingLeft',Value?null:2)", Tip:"If centers the collapse buttons inside their column in the column tree part", NoUndo:0 },
      ] },
   { id:"Tree", Cells:[
      { id:"ColTreeHeight ", D:"List", Label:"ColTreeHeight", Width:70, NoUndo:0, List:{ 5:"Condensed", 7:"Tight", 10:"Narrow", 14:"Normal", 18:"High" }, 
         Formula:"Grid.ColTreeHeight", OnChange:"Grid.SetCfgAttr('ColTreeHeight',Value-0);", Tip:"Indent of one tree level in the column tree part"
         },
      { id:"ColTreeLines", D:"List", Label:"ColTreeLines", Width:60, NoUndo:0, List:{ 0:"None", 1:"Expanded", 2:"All" },
         Formula:"Grid.ColTreeLines", OnChange:"Grid.SetCfgAttr('ColTreeLines',Value-0);", Tip:"How shows lines between tree icons in the column tree part" 
         }
      ]},
   { id:"Expand", Cells:[
      { id:"ExpandDigits", D:"List", Label:"ExpandDigits", Width:120, NoUndo:0, List: { "-1": "None, only +", 3:"All children", 7: "Immediate children" },
         Formula:"Grid.ExpandDigits", OnChange:"Grid.SetCfgAttr('ExpandDigits',Value-0);", Tip:"What is shown in the expand icon", 
         }
      ] }
   ]
}