<script setup>
import { FastGrid } from "fastgrid-vue";
import "../Tutorial.css";


   const src = { //. All layout and data for grid.
      Cfg: { id:"FilterTree", IndexList:1 },
      Cols: [ 
         { id:"N", D:"Header", VIndex:3 }, 
         { id:"A", Type:"String", VIndex:1, Width:250, Formula:"Value+Grid.GetAttr(Row,'L')" },
         { id:"B", Type:"String", VIndex:0, Width:250, List:"|zero|one|two|three|four|five|six|seven|eight|nine|ten", IndexList:1, RightIcons:"List" }, 
         { id:"C", Type:"Bool", VIndex:2, Formula:"Grid.GetFirstChild(Row)?0:1" }  
         ], 
      DefRows: {
         LEAF: { },
         },
      DefTools: {
         BOOL: { Type:"Bool", Value:1 },
         RADIO: { Type:"Bool", RadioRow:1, BoolCycle:-1, BoolIcon:"Radio" },
         },
      Top: [ 
         { id:"FilterTree", Cells:"FilterTree" },
         { id:"Data 1", Cells:"Settings,Reload,Print,Pdf,Export,Copy,Paste" }, 
         { id:"Data 2", Cells:"Undo,Redo,Sort,Filter" }, 
         "Layout",
         { id:"Info", Cells: [ "Empty", { D:"Label", Label:"Shown rows:", Formula:"count(null,'Body',null,3) + ' / ' + count(null,'Body',null,11)", TextColor:"blue" } ] },
         { id:"Filters", NewLine:1, FormulaCache:1, Cells: [
            { D:"RADIO", Text:"Show only found", Formula:"(Grid.FilterTree&6)==0", OnChange:"Grid.SetCfgAttr('FilterTree',0|Grid.FilterTree&1);Grid.ReFilter()", Tip:"Shows all found rows regardless on tree" },
            { D:"RADIO", Text:"Show all found", Formula:"(Grid.FilterTree&6)==2", OnChange:"Grid.SetCfgAttr('FilterTree',2|Grid.FilterTree&1);Grid.ReFilter()", Tip:"Shows all found rows including their parents" },
            { D:"RADIO", Text:"Hide all not found", Formula:"(Grid.FilterTree&6)==4", OnChange:"Grid.SetCfgAttr('FilterTree',4|Grid.FilterTree&1);Grid.ReFilter()", Tip:"Shows only found rows that have found parents" },
            { D:"BOOL", Text:"With all children", Formula:"Grid.FilterTree&1", OnChange:"Grid.SetCfgAttr('FilterTree',(Value?1:0)|Grid.FilterTree&6);Grid.ReFilter()", Tip:"Shows also all children of found rows " },
            ]},
         { id:"FilterOptions", FormulaCache:1, Cells: [
            { D:"BOOL", Text:"Filter parents", Formula:"return Grid.GetAttr(Grid.Rows.Filter,null,'FilterD')!='LEAF'", OnChange:"Grid.SetAttr(Grid.Rows.Filter,null,'FilterD',Value?'':'LEAF',1);Grid.ReFilter()", Tip:"Filters rows that have children" },
            { D:"BOOL", Text:"Filter leaf", Formula:"return Grid.GetAttr(Grid.Rows.Filter,null,'FilterD')!='Row'", OnChange:"Grid.SetAttr(Grid.Rows.Filter,null,'FilterD',Value?'':'Row',1);Grid.ReFilter()", Tip:"Filter rows that don't have children" },
            { D:"BOOL", Text:"Color filtered", Formula:"Grid.ColorFilter ? 1 : 0", OnChange:"Grid.SetCfgAttr('ColorFilter',Value?3:0);Grid.ReFilter()", Tip:"Color the rows that fulfill the filter condition" },
            ] }
         ],
      Head: [
         { D:"Header", id:"Header", V: { N:"ID", A:"Tree", B:"Value", C:"Leaf" } }, 
         { D:"Filter", id:"Filter", V: { B:"1;2;7;10" }, Filter: { B:1 }, NoIndex:2,
            A: { 
               N:"FilterAction", 
               A: { ListMenu: { Script: { Columns:2, Items:"|*FilterOff|*RowsAll" } }, Range:1, DefaultFilter:1, RightIcons:"List" }, 
               B: { Range:1, DefaultFilter:1, FilterRaw:1 } 
               },
            }
         ],
      Media: {
         Mobile: { 
            Cols: [{ id:"A", Width:180 }, { id:"B", Width:180 }]
            }
         },
      Body_Cfg: { Tree:"A" },
      Body: [ 
         { L:0, V:[ 1, "a" ] },
         { L:1, V:[ 1, "aa" ] },
         { L:2, V:[ 1, "aaa" ], D:"LEAF" },
         { L:2, V:[ 2, "aab" ], D:"LEAF" },
         { L:2, V:[ 3, "aac" ], D:"LEAF" },
         { L:1, V:[ 1, "ab" ] },
         { L:2, V:[ 1, "aba" ], D:"LEAF" },
         { L:2, V:[ 2, "abb" ], D:"LEAF" },
         { L:2, V:[ 3, "abc" ], D:"LEAF" },
         { L:1, V:[ 1, "ac" ] },
         { L:2, V:[ 1, "aca" ], D:"LEAF" },
         { L:2, V:[ 2, "acb" ], D:"LEAF" },
         { L:2, V:[ 3, "acc" ], D:"LEAF" },

         { L:0, V:[ 2, "b" ] },
         { L:1, V:[ 4, "ba" ] },
         { L:2, V:[ 7, "baa" ], D:"LEAF" },
         { L:2, V:[ 8, "bab" ], D:"LEAF" },
         { L:1, V:[ 5, "bb" ] },
         { L:2, V:[ 6, "bba" ], D:"LEAF" },
         { L:2, V:[ 8, "bbb" ], D:"LEAF" },

         { L:0, V:[ 3, "c" ] },
         { L:1, V:[ 3, "ca" ] },
         { L:2, V:[ 6, "caa" ] },
         { L:3, V:[ 10, "caaa" ], D:"LEAF" },
         { L:1, V:[ 4, "cb" ], D:"LEAF" },
         { L:1, V:[ 5, "cc" ] },
         { L:2, V:[ 5, "cca" ], D:"LEAF" },
         { L:2, V:[ 6, "ccb" ], D:"LEAF" },
         { L:2, V:[ 7, "ccc" ] },
         { L:3, V:[ 6, "ccca" ] },
         { L:4, V:[ 9, "cccaa" ], D:"LEAF" },
         { L:3, V:[ 8, "cccb" ], D:"LEAF" },
         ], 
   };

   
</script>

<template>

      <h1>3. Filtering in tree</h1>
      <h5>Various ways to filter rows in parent / child relation</h5>
      <section>
         <FastGrid :src="src" style="display:inline-block; max-width:100%; height:550px;"/>
      </section>

      
      <ul>
         <li>Cfg <dfn>FilterTree</dfn><br />
            The attribute Cfg <b>FilterTree</b> specifies how the rows or columns will be filtered in tree, if the parents and children of the found rows will shown, hidden or filtered.<br />
            <ul>
            <li><b>0</b> - <b>Show only found.</b> Shows only rows that fulfill the condition, regardless on tree.</li>
            <li><b>1</b> - <b>Show only found, with all children.</b> If some row fulfills the condition, all its children are shown too and not iterated.</li>
            <li><b>2</b> - <b>Show all found.</b> If some row fulfills the condition, all its parents are shown too. </li>
            <li><b>3</b> - <b>Show all found, with all children.</b> If some row fulfills the condition, all its parents and all its children are shown too. The children are not iterated.</li>
            <li><b>4</b> - <b>Hide all not found.</b> If some row does not fulfill the condition, it hides all its children and does not iterate them.</li>
            <li><b>5</b> - <b>Hide all not found, with all children.</b> If row does not fulfill the condition, it hides all its children. If row fulfills the condition, it shows all its children. The children are not iterated.</li>
            </ul>
        </li>
        <li><h4>FilterTree setting</h4><br />
           The Cfg <b>FilterTree</b> attribute can be changed by users by toolbar combo cell <b>D:</b> <dfn>FilterTree</dfn>.<br />
           It shows popup list with all the available options.<br />
        </li>
        <li><h4>Filter only specified defaults</h4><br />
           It is possible to apply the filter set in the <b>Filter</b> cell to only particular rows, set their default row id(s) to cell <dfn>FilterD</dfn>. Rows with other default rows will not be affected by this filter and will be always shown.<br />
           To let users to choose the <b>FilterD</b>, define cell attribute <dfn>FilterDList</dfn> to add these options to the filter operators menu.<br />
         </li>
      </ul>
      
</template>
