<script setup>
import { FastGrid } from "fastgrid-vue";
import "../Tutorial.css";


   const src = { //. All layout and data for grid.
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
   };

   
</script>

<template>

      <h1>7. Manipulate rows and columns</h1>
      <h5>Selecting, adding, copying, moving, deleting, hiding, expanding and saving</h5>
      <section>
         <FastGrid :src="src" style="max-width:920px; height:700px;"/>
      </section>

      
      <ul>
         <li><b style="color:red;">Changes in this sample are <u>not</u> saved, they are just printed to browser <u>console</u> and accepted!</b><br />
         It is done by setting <b>SaveUrl</b>: &#x7B; <b>Debug</b>:<b>2</b> &#x7D;</li>
         <li><h4>Manipulate rows</h4><br />
         Manipulating rows is permitted by default. Moving is permitted only inside the same row part.<br />
         To control manipulating rows set Cfg attributes <dfn>AddingRows</dfn>, <dfn>DeletingRows</dfn>, <dfn>DraggingRows</dfn>, <dfn>HidingRows</dfn>.<br />
         To permit row tree set <dfn>Tree</dfn> attribute in the row parts where to show the tree.<br />
         </li>
         <li><h4>Manipulate columns</h4><br />
         Adding and deleting columns is restricted by default. Only moving and hiding columns is permitted by default.<br />
         To control manipulating columns set Cfg attributes <dfn>AddingCols</dfn>, <dfn>DeletingCols</dfn>, <dfn>DraggingCols</dfn>, <dfn>HidingCols</dfn>.<br />
         To permit column tree set Cfg <dfn>ColTree</dfn>.
         </li>
         <li><h4>Selecting</h4><br />
         Selecting rows is permitted by default, but selecting columns is restricted by default.<br />
         To control selecting set Cfg attributes <dfn>SelectingRows</dfn>, <dfn>SelectingCols</dfn>.<br />
         If the selecting is restricted, it is possible to manipulate focused rows and columns. To permit focusing more cells, set Cfg attribute <dfn>Focus</dfn> to <b>2</b> or <b>3</b>.<br />
         To control what is shown in row (usually header) icon <b>SelectAll</b>, set Cfg attribute <dfn>SelectAllType</dfn>.<br />
         </li>
         <li><h4>Column icons for row manipulation</h4><br />
         The icons can be placed to any cell in any icons, but usually are placed to column with <b>D:"Panel"</b> in <dfn>LeftIcons</dfn><br />
         The icons are: <b>SelectRow</b>, <b>DeleteRow</b>, <b>HideRow</b>, <b>AddRow</b> to manipulate the row where the icons are placed in.<br />
         And <b>SelectRows</b>, <b>DeleteRows</b>, <b>HideRows</b>, <b>AddRows</b> placed usually in Header row in the Panel column to manipulate all rows in grid.<br />
         </li>
         <li><h4>Row icons for column manipulation</h4><br />
         The icons can be placed to any cell in any icons, but usually are placed to row with <b>D:"Panel"</b> in <dfn>LeftIcons</dfn><br />
         The icons are: <b>SelectCol</b>, <b>DeleteCol</b>, <b>HideCol</b>, <b>AddCol</b> to manipulate the column where the icons are placed in.<br />
         And <b>SelectCols</b>, <b>DeleteCols</b>, <b>HideCols</b>, <b>AddCols</b> placed usually in Header column in the Panel row to manipulate all columns in grid.<br />
         </li>
         <li><h4>Toolbar icons for row / column manipulation</h4><br />
         The icons can be placed to any toolbar in any order.<br />
         The icons that show popup menu to manipulate row(s) or column(s): <b>Select</b>, <b>Delete</b>, <b>Hide</b>, <b>Add</b>, <b>Collapse</b>, <b>Indent</b>.<br />
         The icons for row(s) manipulation: <b>SelectRows</b>, <b>DeleteRows</b>, <b>HideRows</b>, <b>AddRows</b>, <b>CopyRows</b>, <b>AddRowEnd</b>, <b>ExpandRows</b>, <b>CollapseRows</b>, <b>IndentRows</b>, <b>OutdentRows</b><br />
         The icons for column(s) manipulation: <b>SelectCols</b>, <b>DeleteCols</b>, <b>HideCols</b>, <b>AddCols</b>, <b>CopyCols</b>, <b>AddColEnd</b>, <b>ExpandCols</b>, <b>CollapseCols</b>, <b>IndentCols</b>, <b>OutdentCols</b><br />
         </li>
         <li><h4>Tracking changes</h4><br />
         The row and cell changes are tracked, colored and saved by default, except expand &amp; select.<br />
         The column and toolbar changes are <b>not</b> tracked, colored and saved by default.<br />
         To control what changes will be tracked, use Cfg attributes <dfn>RowChanges</dfn>, <dfn>ColChanges</dfn>, <dfn>CellChanges</dfn>, <dfn>ToolChanges</dfn>.<br />
         </li>
         <li><h4>Saving changes</h4><br />
         Saving changes can be done by toolbar icon <b>Save</b> or calling action <b>Save()</b>.<br />
         There must be defined Cfg <dfn>SaveUrl</dfn> to display the <b>Save</b> icon. If the <b>SaveUrl</b> is an object, it must have defined <b>Url</b> or <b>Data</b> attribute, or <b>Debug</b> = 2 for testing.<br />
         What changes will be saved is controlled by Cfg attribute <dfn>SaveFlags</dfn>.<br />
         </li>
      </ul>
   
</template>
