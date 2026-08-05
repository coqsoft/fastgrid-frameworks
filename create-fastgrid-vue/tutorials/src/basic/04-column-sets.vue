<script setup>
import { FastGrid } from "fastgrid-vue";
import "../Tutorial.css";


   const src = { //. All layout and data for grid.
      Cfg: { id:"ColSets", FillRest:14 },
      DefCols: { 
         C2: { LeftMarginLeft:4, RightMarginRight:4, MarginRestColor:{ Body: "#BFE" }, MarginLeftColor: { Body:"#BFE" }, MarginRightColor: { Body:"#BFE" } },
         C3: { LeftMarginLeft:9, RightMarginRight:9, MarginLeftColor: { Body:"#EFB" }, MarginRightColor: { Body:"#EFB" } },
         },
      LeftCols: [
         { id:"L_1", Width:100 },
         { id:"L_2", Width:40, Index:2 }
         ],
      Cols: [
         { id:"C1_1", Width:70 },
         { id:"C1_2", Width:50 },
         { id:"C1_3", Width:60 },
         { id:"C1_4", Width:70 },
         { id:"C1_5", Width:50 },
         ],
      Cols$Set2: [
         { id:"C2_1", D:"C2", Width:55 },
         { id:"C2_2", D:"C2", Width:50 },
         { id:"C2_3", D:"C2", Width:50 },
         { id:"C2_4", D:"C2", Width:50 },
         { id:"C2_5", D:"C2", Width:50 },
         ],
      Cols$Set3: [
         { id:"C3_1", D:"C3", Width:45 },
         { id:"C3_2", D:"C3", Width:50 },
         { id:"C3_3", D:"C3", Width:80 },
         { id:"C3_4", D:"C3", Width:50 },
         { id:"C3_5", D:"C3", Width:60 },
         { id:"C3_6", D:"C3", Width:70 },
         ],
      RightCols: [
         { id:"R1_1", Width:55 },
         { id:"R1_2", Width:55 }
         ],
      RightCols$Set3: [
         { id:"R3_1", Width:45 },
         { id:"R3_2", Width:45 }
         ],
      Head: [
         { D:"Header", id:"Header1", LevelsPart:"Body", RS: { L_1:3, L_2:3, R1_1:2, R1_2:2 }, MarginBottom:5, MarginBottomColor:"#53556D" },
         { D:"Header", id:"Header2", S:"Set2" },
         { D:"Header", id:"Header3", S:"Set3", MarginTop:5, MarginTopColor:"#53556D" },
         ],
      DefRows: { 
         S1: { D:"Row", V:{ L_1:"Set1" }, MarginRestColor:"#BFE" },
         S2: { D:"Row", S:"Set2", V:{ L_1:"Set2" }, L:1, FirstMarginTop:4, LastMarginBottom:4, MarginTopColor:"#BFE", MarginBottomColor:"#BFE", MarginRestColor:"#BFE" },
         S3: { D:"Row", S:"Set3", V:{ L_1:"Set3" }, L:2, FirstMarginTop:4, LastMarginBottom:4, MarginTopColor:"#EFB", MarginBottomColor:"#EFB", MarginRestColor:"#EFB" },
         },
      Body: [
         { D:"S1", V:["Set1",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21] }, 
         { D:"S2", V:["Set2",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21] }, 
         { D:"S3", V:["Set3",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21] }, 
         { D:"S3", V:{ L_2:0, C3_1:1, C3_2:2, C3_3:3, C3_4:4, C3_5:5, C3_6:6, R3_1:7, R3_2:8} }, 
         { D:"S2", V:{ L_2:0, C2_1:1, C2_2:2, C2_3:3, C2_4:4, C2_5:5, R1_1:6, R1_2:7 } }, 
         { D:"S1", V:{ L_2:0, C1_1:1, C1_2:2, C1_3:3, C1_4:4, C1_5:5, R1_1:6, R1_2:7 } }, 
         { D:"S1" }, 
         { D:"S2" }, 
         { D:"S2" }, 
         { D:"S3" },
         { D:"S2" }, 
         { D:"S3" }, 
         { D:"S3" }
         ],
      Body_Cfg: { Tree:"L_1" }
   };

   
</script>

<template>

      <h1>4. Column sets</h1>
      <h5>Table rows with different columns</h5>
      <section>
         <FastGrid :src="src" style="max-width:600px;"/>
      </section>

      
      <ul>
         <li><h4>Column sets</h4><br />
         It is possible to define more column sets in grid. These column sets are <b>not</b> defined explicitly, there are only defined by columns in the new column sets.<br />
         The columns in the second and next column sets are defined in the column part name + $ + column set name. 
         For example <span class="inline-code">&lt;b&gt;Cols$Set2&lt;/b&gt;: [ { id:"Col1" }, { id:"Col2" } ]</span><br />
         This example contains three sets, the first set without name, "Set2" and "Set3".<br />
         </li>   
         <li>
         If the second and next column sets contain columns only in some column parts, the other column parts share columns with the first column set.<br />
         In this example there are shared L_1 and L_2 columns with all three sets and R1_1 and R1_2 columns with the first two sets.<br />
         </li>
         <li>Every table row can have assigned its column set by <dfn>S</dfn> attribute. Every row has always one column set, without <b>S</b> attribute has the first column set.</li>
         <li>The rows with different column sets are often in different tree level, but it is not required. In this example the Set2 on the second level and Set3 on the third level.</li>
         <li>The column sets are often used for <b>master / detail</b> relationship or for visually <b>nesting grids</b> - FastGrid does not support real nesting of FastGrids or FastGrid inside another FastGrid cell.</li>

         <li><h4>Margin</h4><br />
         With the column sets there is usually defined also row and column margin to visually separate the sets or visually display another grid inside FastGrid.<br />
         </li>
         <li>
            Every row can have defined <dfn>MarginTop</dfn> and <dfn>MarginBottom</dfn>.<br />
            It is possible to set different or only margin for the first / last row in part <dfn>TopMarginTop</dfn> and <dfn>TopMarginBottom</dfn>, 
            for for the first and last row in tree (children on the same level <b>L</b>) by <dfn>FirstMarginTop</dfn> and <dfn>LastMarginTop</dfn> 
            and for the first and last row in <b>Block</b> by <dfn>BlockMarginTop</dfn> and <dfn>BlockMarginBottom</dfn>.<br />
            The color of the margin can be set by <dfn>MarginTopColor</dfn> and <dfn>MarginBottomColor</dfn>, they can be also different per column part.<br />
         </li>
         <li>
            Every column can have defined <dfn>MarginLeft</dfn> and <dfn>MarginRight</dfn>. <br />
            It is possible to set different or only margin for the first / last column in part <dfn>LeftMarginLeft</dfn> and <dfn>RightMarginRight</dfn>, 
            for for the first and last column in tree (children on the same level <b>L</b>) by <dfn>FirstMarginLeft</dfn> and <dfn>LastMarginRight</dfn> 
            and for the first and last column in <b>Block</b> by <dfn>BlockMarginLeft</dfn> and <dfn>BlockMarginRight</dfn>.<br />
            The color of the margin can be set by <dfn>MarginLeftColor</dfn> and <dfn>MarginRightColor</dfn>, they can be also different per row part.<br />
         </li>
         <li>
            The space after the last column in the column set, when the column sets have different widths is controlled by Cfg attribute <dfn>FillRest</dfn> and cell attribute <dfn>MarginRestColor</dfn>.<br />
         </li>
      </ul>
   
</template>
