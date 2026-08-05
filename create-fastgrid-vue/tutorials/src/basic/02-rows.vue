<script setup>
import { FastGrid } from "fastgrid-vue";
import "../Tutorial.css";


   const src = { //. All layout and data for grid.
      Cfg: { id: "Rows", ColTree:1, EditingStyle:1, OverScroll:1 }, 
      Cols: [ 
         { id: "DATA1", Width: 340 }, 
         { id: "DATA2", Width: 340, L:1 }  
         ], 
      RowParts: [
         { Clear:1 },
         { id:"T1", Type:"Toolbars" },
         { id:"Tree", Type:"Tree", Add:1 }, //. Column tree
         { id:"S1", Type:"Scroll" },
         { id:"R1", Type:"Rows" },
         { id:"T2", Type:"Toolbars" },
         { id:"S2", Type:"Scroll" },
         { id:"R2", Type:"Rows" },
         { id:"T3", Type:"Toolbars" },
         { id:"R3", Type:"Rows", Rel:1 },
         { id:"S3", Type:"Scroll" },
         { id:"T4", Type:"Toolbars" },
         { id:"R4", Type:"Rows", Rel:1 },
         { id:"T5", Type:"Toolbars" },
         { id:"R5", Type:"Rows" },
         ],
      R1: [ 
         { D:"Filter", V: [ "R1 filter row 1" ] }, 
         { D:"Filter", V: [ "R1 filter row 2" ] },
         { D:"Header", V: [ "R1 header row 1" ] }, 
         ],
      R2: [
         { D:"Index", V: [ "R2 index row 1" ] }, 
         { V: [ "R2 data row 1" ] }, 
         ], 
      R3 : [ 
         { V: [ "R3 data row 1, L0" ] }, 
         { V: [ "R3 data row 2, L0" ] },
         { V: [ "R3 data row 3, L1" ], L:1 },
         { V: [ "R3 data row 4, L0" ] },
         { V: [ "R3 data row 5, L1" ], L:1 },
         { V: [ "R3 data row 6, L2" ], L:2 },
         { V: [ "R3 data row 7, L2" ], L:2 },
         { V: [ "R3 data row 8, L0" ] },
         ], 
      R4 : [ 
         { V: [ "R4 data row 1, L0" ] }, 
         { V: [ "R4 data row 2, L0" ], L:1 },
         { V: [ "R4 data row 3, L1" ], L:2 },
         { V: [ "R4 data row 4, L0" ], L:3 },
         { V: [ "R4 data row 5, L1" ], L:1 },
         { V: [ "R4 data row 6, L2" ], L:2 },
         ], 
      R5: [ { D:"Header", V: [ "R5 header row 1" ] } ],
      R3_Cfg: { Tree:"DATA1" },
      R4_Cfg: { Tree:"DATA1" },

      T1: [ "Data1","Settings" ],
      T2: [ "Data2","Layout" ],
      T3: [ "Data3" ],
      T4: [ "Text1","Text3" ],
      T5: [ "Search" ]   
   };

   
</script>

<template>

      <h1>2. Rows</h1>
      <h5>FastGrid rows and row parts</h5>
      <section>
         <FastGrid :src="src" style="max-width:600px; height:700px;"/>
      </section>

      
      <ul>
         <li><h4>RowParts</h4><br />
         The row parts and their order are defined in <b>RowParts</b> array. Default RowParts definition is in <b>Defaults.js</b>:<br />
         <span class="inline-code"><b>RowParts</b>: [<br />
            &#x7B; id:"<b>Top</b>", Type:"<b>Toolbars</b>" &#x7D;,                                        <i>//. Top toolbars</i><br />
            &#x7B; id:"<b>TopScroll</b>", Type:"<b>Scroll</b>", Item:"$ItemTopScroll", Hidden:1 &#x7D;,   <i>//. Top horizontal scrollbar, hidden by default</i><br />
            &#x7B; id:"<b>Tree</b>", Type:"<b>Tree</b>", Add:1, Item:"$ItemColTree" &#x7D;,               <i>//. Column tree</i><br />
            &#x7B; id:"<b>Head</b>", Type:"<b>Rows</b>", ExportFixed:1, Highlight:0, Rel:100000, MinHeight:70, MinHeightResize:0 &#x7D;, <i>//. Head rows</i><br />
            &#x7B; id:"<b>Body</b>", Type:"<b>Rows</b>", Rel:2, MinHeight:70, MinHeightResize:0, Sealed:0, Group:"", NoData:"$NoData", MaxAuto:3000000, AcceptImages:1 &#x7D;, <i>//. Body rows</i><br />
            &#x7B; id:"<b>Foot</b>", Type:"<b>Rows</b>", Rel:100000, MinHeight:70, MinHeightResize:0 &#x7D;, <i>//. Foot rows</i><br />
            &#x7B; id:"<b>BottomScroll</b>", Type:"<b>Scroll</b>", Item:"$ItemBottomScroll" &#x7D;,       <i>//. Bottom horizontal scrollbar</i><br />
            &#x7B; id:"<b>Bottom</b>", Type:"<b>Toolbars</b>" &#x7D;                                      <i>//. Bottom toolbars</i><br />
            ],<br /></span>
         It is possible to move, add or delete only some row parts in other <b>RowParts</b> definition, e.g. <span class="inline-code">RowParts: [ &#x7B; id:"TopScroll", Next:"Top", Hidden:0 &#x7D; ] </span><br />
         Or it is possible to redefine all row parts by adding first item in <b>RowParts</b> as <span class="inline-code">&#x7B; Clear:1 &#x7D;</span><br />
         </li>
         <li> 
            <h4>Table rows</h4> with cells in columns
            <ul>
               <li>The table rows contain cells in columns. Cells can be spanned in both directions, similarly to HTML &lt;TABLE&gt; tag.</li>
               <li>The table rows can be scrolled in both directions, vertically and horizontally. Although in some sections like Head or Foot the rows are usually fixed, not scrolled vertically.</li>
               <li>The table rows can be nested in tree, sorted, filtered, grouped, added, deleted, moved (dragged).</li>
               <li>The table rows are defined in in RowPart <b>Type</b> = "<b>Rows</b>", by default in <b>Head</b>, <b>Foot</b> and <b>Body</b> parts.</li>
               <li>The table rows define their cell values in <b>V</b> or <b>U</b> array and similarly cell attributes in <b>A</b> or <b>B</b> arrays.</li>
               <li>The table rows can contain data without special meaning and there are also predefined some feature rows:
               <ul>
                  <li><dfn>Header</dfn> row defined by D: "Header". Shows column captions. Provides column resizing and moving. Controls sorting settings.<br />
                  Header row has cells like any data row, it is possible to define Type, Format and other cell attributes.<br />
                  The Header cells are not editable, but can be changed from popup list like List. The default cell Type for Header row is Text, new line can be added by '&amp;#x0a;' or can be retyped to Html and used &lt;br&gt;.
                  </li>
                  <li><dfn>Index</dfn> row defined by D: "Index". The same as <b>Header</b>, but shows column indexes instead of captions.</li>
                  <li><dfn>Filter</dfn> row defined by D: "Filter". Controls filter settings.</li>
                  <li><dfn>Panel</dfn> row defined by D: "Panel". It usually shows control icons in LeftIcons to manipulate columns.</li>
               </ul>
               </li>
            </ul>
         </li>
         <li>
            <h4>Toolbar rows</h4> with cells in rows
            <ul>
               <li>The toolbars define their own cells (in <b>Cells</b> array) not related to FastGrid columns. Every toolbar row can have different cells (their ids, widths and other attributes like Type and Format).</li>
               <li>The toolbar cells cannot be spanned in any direction. The toolbar cell can show only one icon / button.</li>
               <li>The toolbars are defined in RowPart <b>Type</b> = "<b>Toolbar</b>", by default in <b>Top</b> and <b>Bottom</b> parts.</li>
               <li>To place some cells to right edge or to fill the rest of the row by cell(s), set the cell <b>Rel</b> attribute.</li>
               <li>The toolbar rows can be placed more on one line or can be wrapped to more lines.</li>
               <li>The toolbars can be shown / hidden / moved from Layout menu or when grid is switched to <a target="FGDoc" href="https://www.treegrid.com/FDoc/Toolbar.htm#CfgDraggingToolbars">DraggingToolbars</a></li>
               <li>See <a target="FGDoc" href="https://www.treegrid.com/FDoc/Toolbar.htm">Toolbar rows documentation</a>.</li>
               <li>The toolbars can contain data cells without special meaning, but there are various predefined feature toolbars:
               <ul>
                  <li><b>Data1</b>, <b>Data2</b>, <b>Data3</b> - base toolbars with buttons to control grid data.</li>
                  <li><b>Text1</b>, <b>Text2</b>, <b>Text3</b> - base toolbars with buttons to control cell content.</li>
                  <li><b>Group</b> - toolbar with group settings.</li>
                  <li><b>Hide</b> - toolbar with hide items settings.</li>
                  <li><b>Search</b> - toolbar with button and edit box to search in grid.</li>
                  <li><b>Sheets</b> - toolbar with list of all sheets in Book.</li>
                  <li><b>Edit</b> - toolbar with external edit box and external focus list.</li>
                  <li><b>Cookies</b> - toolbar with buttons to control saved configuration.</li>
                  <li><b>Layout</b> - toolbar with buttons for choosing visible items in grid.</li>
                  <li><b>PivotRows</b>, <b>PivotCols</b>, <b>PivotData</b>, <b>PivotSource</b> - toolbars to create pivot.</li>
               </ul>
               </li>
            </ul>
         </li>
      </ul>
      
</template>
