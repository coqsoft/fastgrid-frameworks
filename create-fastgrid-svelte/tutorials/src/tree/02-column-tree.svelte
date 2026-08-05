<script>
import { FastGrid } from "fastgrid-svelte";
import "../Tutorial.css";


   const src = { //. All layout and data for grid.
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
   };
</script>

<h1>2. Column tree</h1>
      <h5>Nesting columns to tree levels</h5>
      <section>
         <FastGrid src={src} style="display:inline-block; max-width:100%;"/>
      </section>

      
      <ul>
         <li>
            Every column can have defined its level of nesting in tree by <dfn>L</dfn> attribute.<br />
            The root level, that can be expanded, has <b>L</b> = <b>0</b>, the not expandable level outside the tree is defined by <b>L</b> = <b>-1</b>.<br />
            The next column should have defined the <b>L</b> maximally as <b>L + 1</b> of its previous column to be its child.<br />
         </li>
         <li>
            Column tree must be permitted by Cfg <dfn>ColTree</dfn> = <b>1</b>.<br />
            The column tree is displayed in row part of <b>Type</b> = "<b>Tree</b>". By default there is one such part with id="Tree" placed on top of the grid.<br />
            The expand / collapse button can be shown also in any cell in <b>LeftIcons</b> / <b>RightIcons</b> / <b>TextIcons</b> by adding <b>CollapseCol</b> button.<br />
         </li>
         <li>
            Column can hide its children if it has set <dfn>Collapsed</dfn> = <b>0</b>.<br />
            To restrict collapsing or expanding column children set <dfn>NoCollapse</dfn> = <b>1</b>.
         </li>
         <li>To display Level buttons to expand particular tree level set <b>column</b> attribute <dfn>LevelsPart</dfn> to the column part ids to control.</li>
         <li>To collapse / expand the columns on start or on grouping set <b>part</b> attribute <dfn>CollapseLevel</dfn> to the level of expanding. It is also shown in the <b>LevelsPart</b> button.</li>
         <li>The expand button can show plus or it can show the count of collapsed children according to various conditions set by Cfg <dfn>ExpandDigits</dfn>.</li>
         <li>The column tree can be shown also in reversed order, the children shown above parents, if set Cfg <dfn>ReversedTree</dfn> &amp; <b>2</b>.</li>
         <li>The height of the tree level in the Tree part (how much the next level is indendented in pixels) is set by Cfg <dfn>ColTreeHeight</dfn>.</li>
         <li>It is possible to hide lines in the tree and show only expand / collapse buttons by Cfg <dfn>ColTreeLines</dfn>.</li>
         <li>Horizontal position of the expand button in the Tree part is set by Cfg <dfn>ColTreePaddingLeft</dfn>, and position of the line ends by Cfg <dfn>ColTreePaddingRight</dfn>.</li>
         <li>It is possible to also show / hide particular row(s) when showing / hiding particular column level, define these rows per column level in Cfg <dfn>ColLevelsRows</dfn>.</li>
      </ul>
