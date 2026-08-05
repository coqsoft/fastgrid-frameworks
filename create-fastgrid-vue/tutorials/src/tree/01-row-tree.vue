<script setup>
import { FastGrid } from "fastgrid-vue";
import "../Tutorial.css";


   const src = { //. All layout and data for grid.
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
   };

   
</script>

<template>

      <h1>1. Row tree</h1>
      <h5>Nesting rows to tree levels</h5>
      <section>
         <FastGrid :src="src" style="display:inline-block; max-width:100%; height:550px;"/>
      </section>

      
      <ul>
         <li>
            Every row can have defined its level of nesting in tree by <dfn>L</dfn> attribute.<br />
            The root level, that can be expanded, has <b>L</b> = <b>0</b>, the not expandable level outside the tree is defined by <b>L</b> = <b>-1</b>.<br />
            The next row should have defined the <b>L</b> maximally as <b>L + 1</b> of its previous row to be its child.<br />
         </li>
         <li>
            Row tree can be displayed in column defined by <b>RowPart</b> attribute <dfn>Tree</dfn>.<br />
            It is possible also to display different tree levels in different columns, the column is set by <b>row</b> attribute <dfn>Tree</dfn>. 
            For this case there must be defined also <b>Cfg</b> attribute <dfn>RowTree</dfn> = <b>2</b>.<br />
            The expand / collapse button can be shown also in any other column in <b>LeftIcons</b> / <b>RightIcons</b> / <b>TextIcons</b> by adding <b>CollapseRow</b> button.<br />
         </li>
         <li>
            Row can hide its children if it has set <dfn>Collapsed</dfn> = <b>0</b>.<br />
            To restrict collapsing or expanding row children set <dfn>NoCollapse</dfn> = <b>1</b>.
         </li>
         <li>To display Level buttons to expand particular tree level set <b>row</b> attribute <dfn>LevelsPart</dfn> to the row part ids to control.</li>
         <li>To collapse / expand the rows on start or on grouping set <b>part</b> attribute <dfn>CollapseLevel</dfn> to the level of expanding. It is also shown in the <b>LevelsPart</b> button. It is used only for <b>RowTree</b> = <b>1</b>.</li>
         <li>The expand button can show plus or it can show the count of collapsed children according to various conditions set by Cfg <dfn>ExpandDigits</dfn>.</li>
         <li>The row tree can be shown also in reversed order, the children shown above parents, if set Cfg <dfn>ReversedTree</dfn> &amp; <b>1</b>.</li>
         <li>The width of the tree level in the Tree column (how much the next level is indented in pixels) is set by Cfg <dfn>TreeWidth</dfn>.</li>
         <li>It is possible to hide lines in the tree and show only expand / collapse buttons by Cfg <dfn>TreeLines</dfn>.</li>
         <li>When dragging, the drop icons (where the row will be dropped) can be shown in the tree column or in the header / index column by setting 3. bit &amp;<b>4</b> of <dfn>MoveRowType</dfn>.</li>
      </ul>
      
</template>
