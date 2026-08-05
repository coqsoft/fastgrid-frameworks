<script setup>
import { FastGrid } from "fastgrid-vue";
import "../Tutorial.css";


   const src = { //. All layout and data for grid.
      Cfg : { id: "Basic", OverScroll:2 }, 

      //. --- Columns ---
      LeftCols : [ 
         { id:"PANEL", D:"Panel", LeftIcons:"SelectRow,DeleteRow,AddRow" },
         { id:"LEFT1", Width: 150 }  
         ], 
      Cols : [ 
         { id:"DATA1", Width:120 }, 
         { id:"DATA2", Width:120 }  
         ], 
      RightCols : [ 
         { id:"RIGHT1" }
         ], 

      //. --- Rows ---
      Head: [ 
         { D:"Header", V: { LEFT1: "Left column 1", DATA1: "Data column 1", DATA2: "Data column 2", RIGHT1: "Right column 1" }, A: { PANEL: { LeftIcons:"SelectRows,DeleteRows,AddRows" } } },
         { V: { LEFT1: "Fixed head row 1", DATA1:1, DATA2:2, RIGHT1:3 } },
         { D:"Filter", V: { PANEL:"Filter row" }, A: { PANEL: { D:"FilterAction" } } }
         ], 
      Body: [ 
         { V: ["Body row 1", 4, 5, 6 ] }, 
         { V: ["Body row 2", 7, 8, 9 ] }, 
         { V: ["Body row 3", 10, 11, 12 ], L:1 }, 
         { V: ["Body row 4", 13, 14, 15 ], L:1 }, 
         { V: ["Body row 5", 16, 17, 18 ] }, 
         { V: ["Body row 6", 19, 20, 21 ], L:1 }, 
         { V: ["Body row 7", 22, 23, 24 ] },  
         { V: ["Body row 8", 25, 26, 27 ] }  
         ], 
      Body_Cfg: { Tree:"LEFT1" },
      Foot: [ 
         { V: { LEFT1: "Fixed foot row 1", DATA1: 28, DATA2: 29, RIGHT1: 30 } }  
         ], 
      Top: ["Data1","Settings","Data2"]      
   };

   
</script>

<template>

      <h1>1. Basic grid</h1>
      <h5>Basic grid with rows and columns</h5>
      <section>
         <FastGrid :src="src" style="max-width:500px; height:400px;"/>
      </section>

      
      <ul>
         <li> 
            <h4>FastGrid JSON</h4>
            <ul>
               <li> Every grid JSON is defined as <dfn>FGrid.Data = { ... }</dfn> object. It is the only possible root object in FastGrid JSON. See <b><a target="FGDoc" href="https://www.treegrid.com/FDoc/Data.htm#Layout">FastGrid Layout and configuration</a></b></li>
               <li> The simplest empty grid can be created as FGrid.Data = { } - no columns and no rows.</li>
               <li> FastGrid base configuration is defined in <dfn>Cfg</dfn> tag.</li>
            </ul>
         </li>
         <li> 
            <h4>Rows</h4>
            <ul>
               <li>FastGrid is usually <b>row based</b> grid. Data are usually defined in rows. </li>
               <li>Although FastGrid can be also <b>column based</b> grid with data defined in columns and features like sorting, filter or group for columns instead of rows. </li>
               <li>The <b>variable</b> (body) rows are defined as objects inside <dfn>Body: [ ... ]</dfn> array.</li>
               <li>The <b>fixed</b> rows are defined as objects inside <dfn>Head : [ ... ]</dfn> and <dfn>Foot: [ ... ]</dfn> arrays.</li>
               <li>It is possible to define different rows structure, more (unlimited) or other sections than Body / Head / Foot in <b>RowParts</b> array. All the sections can be vertically scrollable.</li>
               <li>Row can be moved (dragged) inside its section and also to another section. Special rows can be shown / hidden by users in layout menu (icon on toolbar).</li>
               <li>For more information see <b><a href="/tutorials/basic/02-rows">Row types tutorial</a></b>.</li>
            </ul>
         </li>
         <li>
            <h4>Columns</h4>
            <ul>
               <li>The column defines id, position and width of all the cells in the column. The column optionally defines also cell attributes like Type, Format, NoEdit, etc. for all the cells in the column.</li>
               <li>The <b>variable</b> (middle) columns are defined by objects inside <dfn>Cols: [ ... ]</dfn> array. </li>
               <li>The <b>fixed</b> columns are defined by objects inside <dfn>LeftCols: [ ... ]</dfn> and <dfn>RightCols: [ ... ]</dfn> arrays.</li>
               <li>It is possible to define different columns structure, more (unlimited) or other sections than Cols / LeftCols / RightCols in <b>ColParts</b> array. All the sections can be horizontally scrollable.</li>
               <li>Column can be moved (dragged) inside its section and also to another section. Columns can be shown / hidden by users in layout menu (icon on toolbar).</li>
               <li>For more information see <b><a href="/tutorials/basic/03-columns">Columns and sections tutorial</a></b>.</li>
            </ul>
         </li>
         <li>
            <h4>Cells</h4>
            <ul>
               <li>FastGrid data in cells are usually defined in rows, not in columns, although the <b>V</b> and <b>A</b> attributes can be set also to columns.</li>
               <li>The <b>cell values</b> are defined in row attribute <dfn>V</dfn> as array according to column <b>VIndex</b> (e.g. V: [1,2,3] ) or as id:value, according to column <b>id</b> (e.g V: { C1:1, C2:2, C3:3 } ).</li>
               <li>All <b>cell attributes</b> (except for column size and position like Width) can be defined for the whole column (in column object), for whole row (except for row size and position like Height) in the row object or 
               for individual cell (in row attribute <dfn>A</dfn>).</li>
               <li>The <dfn>A</dfn> can be defined as array according to column <b>AIndex</b> (e.g. A: ["Cell1",{Color:"red"},{TextColor:"blue",Align:1}] ) or as id:value, according to column <b>id</b> (e.g A: { C1: "Cell1", C2: {Color:"red"}, C3: {TextColor:"blue",Align:1} } ).</li>
               <li>For more information see <b><a href="/tutorials/cells/01-values">Values tutorial</a></b> and <b><a href="/tutorials/cells/02-attributes">Attributes tutorial</a></b>.</li>
            </ul>
         </li>
         <li>
            <h4>Predefined items</h4><br />
            There are no predefined items in FastGrid, empty grid contains no item.<br />
            But there are various default items that can be referred by <b>D</b> attribute to place them to grid with the defined features and settings.
            <ul>
               <li><dfn>Header</dfn> - row or column in different color and background displaying column or row ids.</li>
               <li><dfn>Index</dfn> - row or column in different color and background displaying column or row indexes.</li>
               <li><dfn>Panel</dfn> - row or column prepared to display row / column icons. The icons must be defined explicitly, e.g. in <b>LeftIcons</b>.</li>
               <li><dfn>Filter</dfn> - row or column displaying filter operators and permits filtering rows / columns by its values.</li>
               <li><dfn>Data1</dfn>, <dfn>Data2</dfn>, <dfn>Data3</dfn> - base toolbars with buttons to control grid data.</li>
               <li><dfn>Text1</dfn>, <dfn>Text2</dfn>, <dfn>Text3</dfn> - base toolbars with buttons to control cell content.</li>
               <li><dfn>Group</dfn> - toolbar with group settings.</li>
               <li><dfn>Hide</dfn> - toolbar with hide items settings.</li>
               <li><dfn>Search</dfn> - toolbar with button and edit box to search in grid.</li>
               <li><dfn>Sheets</dfn> - toolbar with list of all sheets in Book.</li>
               <li><dfn>Edit</dfn> - toolbar with external edit box and external focus list.</li>
               <li><dfn>Cookies</dfn> - toolbar with buttons to control saved configuration.</li>
               <li><dfn>Layout</dfn> - toolbar with buttons for choosing visible items in grid.</li>
               <li><dfn>PivotRows</dfn>, <dfn>PivotCols</dfn>, <dfn>PivotData</dfn>, <dfn>PivotSource</dfn> - toolbars to create pivot.</li>
            </ul>
         </li>
      </ul>
      
</template>
