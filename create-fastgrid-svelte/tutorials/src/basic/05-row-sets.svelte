<script>
import { FastGrid } from "fastgrid-svelte";
import "../Tutorial.css";


   const src = { //. All layout and data for grid.
      Cfg: { id:"RowSets", RowTree:2, OverScroll:1 },
      ColParts: [
         { id:"Cols3", Rel:2, Next:"RightCols" },
         { id:"Cols2", Rel:2, Next:"Cols3" },
         { id:"LeftScroll", Hidden:0, Next:"Cols2" }
         ],
      DefCols: { 
         Col: { Width:40 },
         },
      LeftCols: [
         { id:"L1" },
         { id:"L2" }
         ],
      Cols: [
         { id:"C1", D:"Index", Align:0 },
         { id:"C2", Width:80 },
         { id:"C3", Index:2 },
         { id:"C4" },
         { id:"C5" },
         ],
      Cols2: [
         { id:"D1", D:"Index", Align:0 },
         { id:"D2", Width:80 },
         { id:"D3", Index:2 },
         { id:"D4" },
         ],
      Cols2_Cfg: { S:"Set2" },
      Cols3: [
         { id:"E1", D:"Index", Align:0 },
         { id:"E2", Width:80 },
         { id:"E3", Index:2 },
         { id:"E4" },
         ],
      Cols3_Cfg: { S:"Set3" },
      RightCols: [
         { id:"R1" },
         { id:"R2" }
         ],
      RightCols_Cfg: { S:"Set2" },
      Top: [
         "Group"
         ],
      Head: [
         { D:"Header", V: { C1:"C1", D1:"D1", E1:"E1" }, LevelsPart:"Body" },
         { D:"Filter" }
         ],
      DefRows: { 
         S1: { V: { C1:"Set1" }, Tree:"C2" },
         S2: { V: { D1:"Set2" }, Height:40, Color:"#EEE", Tree:"D2" },
         S3: { V: { E1:"Set3" }, Height:70, Color:"#BBB", Tree:"E2" }
         },
      Body: [
         { D:"S1", V:[0,1,"Set1",3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21] }, 
         { D:"S1", V:{ C2:1, C4:5 } }, 
         { D:"S1", V:{ C2:2, C4:5 } }, 
         { D:"S1", V:{ C2:3, C4:5 } }, 
         { D:"S1", V:{ C2:4, C4:10 } }, 
         { D:"S1", V:{ C2:5, C4:10 },L:1 }, 
         { D:"S1", V:{ C2:6, C4:10 },L:2 }, 
         { D:"S1", V:{ C2:7, C4:10 } }, 
         { D:"S1", V:{ C2:8, C4:15 } }, 
         { D:"S1", V:{ C2:9, C4:15 } }, 
         { D:"S1", V:{ C2:10, C4:15 } }, 
         { D:"S1", V:{ C2:11, C4:15 } }, 
         ],
      Body$Set2: [
         { D:"S2", V:[0,1,2,3,4,5,6,"Set2",8,9,10,11,12,13,14,15,16,17,18,19,20,21] }, 
         { D:"S2", V: { D2:1, D4:5 } }, 
         { D:"S2", V: { D2:2, D4:5 } }, 
         { D:"S2", V: { D2:3, D4:5 } }, 
         { D:"S2", V: { D2:4, D4:5 },L:1 }, 
         { D:"S2", V: { D2:5, D4:5 },L:2 }, 
         { D:"S2", V: { D2:6, D4:10 } }, 
         { D:"S2", V: { D2:7, D4:10 } }, 
         { D:"S2", V: { D2:8, D4:10 },L:1 }, 
         { D:"S2", V: { D2:9, D4:10 } }, 
         { D:"S2", V: { D2:10, D4:10 } }, 
         { D:"S2", V: { D2:11, D4:15 } }, 
         { D:"S2", V: { D2:12, D4:15 } }, 
         { D:"S2", V: { D2:13, D4:15 },L:1 }, 
         { D:"S2", V: { D2:14, D4:15 },L:2 }, 
         { D:"S2", V: { D2:15, D4:15 },L:2 }, 
         { D:"S2", V: { D2:16, D4:15 } }, 
         { D:"S2", V: { D2:17, D4:20 } }, 
         { D:"S2", V: { D2:18, D4:20 } }, 
         ],
      Body$Set3: [
         { D:"S3", V:[0,1,2,3,4,5,6,7,8,9,10,"Set3",12,13,14,15,16,17,18,19,20,21] }, 
         { D:"S3", V:{ E2:1, E4:5 } },
         { D:"S3", V:{ E2:2, E4:5 },L:1 }, 
         { D:"S3", V:{ E2:3, E4:5 } }, 
         { D:"S3", V:{ E2:4, E4:10 } },
         ],
      Body_Cfg: {
         GroupTree: { "L*":"C2", "C*":"C2", "D*":"D2", "E*":"E2", "R*":"D2" }
         },
      Foot: [
         { D:"S1", V:[0,1,"Set1",3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21] }
         ],
      Foot$Set2: [
         { D:"S2" }
         ]
   };
</script>

<h1>5. Row sets</h1>
      <h5>Column parts with different rows</h5>
      <section>
         <FastGrid src={src} style="max-width:800px; height:550px;"/>
      </section>

      
      <ul>
         <li><h4>Row sets</h4><br />
         It is possible to define more row sets in grid. These row sets are <b>not</b> defined explicitly, there are only defined by rows in the new row sets.<br />
         The rows in the second and next row sets are defined in the row part name + $ + row set name. 
         For example <span class="inline-code">&lt;b&gt;Body$Set2&lt;/b&gt;: [ &#123; id:"R1" &#125;, &#123; id:"R2" &#125; ]</span><br />
         This example contains three sets, the first set without name, "Set2" and "Set3".<br />
         </li>   
         <li>
         If the second and next row sets contain rows only in some row parts, the other row parts share rows with the first row set.<br />
         In this example there is shared top Header row with all three sets and bottom foot row with the first and third sets.<br />
         </li>
         <li>Every column part can have assigned its row set by <dfn>S</dfn> attribute. Every column part has always one row set, without <b>S</b> attribute has the first row set.<br />
         <i><b>It is the major difference between row sets and column sets, column set can be different per row, but row set can be different only per the whole column part, not per column!</b></i><br />
         </li>
         <li>The rows in the row sets can be sorted, grouped and filtered independently on the other row sets.</li>
         <li>The rows can be also dragged between the row sets, after that the moved row will show its different columns!</li>
         <li>Every the row set can show its tree for row levels in different column, set by Cfg <b>RowTree</b> = <b>2</b> and row <b>Tree</b> attribute.<br />
         To show the tree in different columns for grouping set the Cfg <b>RowTree</b> = <b>2</b> and <b>GroupTree</b> to object with column ids.<br />
         </li>
      </ul>
