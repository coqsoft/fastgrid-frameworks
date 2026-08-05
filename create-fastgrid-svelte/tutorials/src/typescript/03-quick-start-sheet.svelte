<script lang="ts">
import { FastGrid } from "fastgrid-svelte";
import "../Tutorial.css";

//. All FastGrid attributes used in src can be found in documentation search at https://www.treegrid.com/FDoc/SearchAttr.html

//. --- Simple layout and data for sheet  ---
const src = ({ //. All layout and data for sheet.
   Cfg: { SheetJs:1, Book:'QuickSheet' }, //. SheetJs is used to set to sheet mode, if data is coming from json or csv and not from xlsx.
   Sheets:{
      Sheet1: { Body:[ { V:[100,200,300] }, { V:{ A:400, B:500, C:600 } }, { V:"|700|800|900" } ] }, //. Simple data for the first sheet for 3 rows and 3 columns. Shows 3 ways of passing values to grid. In sheet the columns are always named as A, B, C,...
      "Sheet 2": { Body:[ { V:['AAA','BBB','CCC'] }, { V:"~DDD~EEE~FFF~GGG" } ] } //. Simple data for the second sheet
      }
   });

//. --- API definition and usage ---
let grid:FastGrid|null = null; //. Grid reference received for grid, access the grid object directly as grid
function readValue(): void { alert("Read value from cell [1,A]: " + grid?.Get(1, "A")); } //. Function called from Read Value button
function changeValue(grid:FastGrid|null, row: string | number, col: string | number, val: any): void { //. Function called from both Change Value buttons with different parameters
   grid?.Set(row, col, "", val, 1);
   } 
const onSetValue: TFGrid["OnSetValue"] = (_grid, row, col, value, changes) => { //. FastGrid API event OnSetValue handler
   if(changes && row && col) console.log("Value " + value + " set to cell [" + row.id + "," + col.id + "]");
   }; 
const onClick: TFGrid["OnClick"] = (grid, row, col) => { //. FastGrid API event OnClick handler
   if(row && col) console.log("clicked cell [" + row.id + "," + col.id + "] with value " + grid.GetValue(row, col));
   }; 
const onReady: TFGrid["OnReady"] = (grid) => { console.log("FastGrid "+grid.id+" is ready"); }; //. FastGrid API event OnReady handler.
</script>

<!--. --- HTML definition --- -->
<h1>Quick Start - FastSheet from JSON in Svelte with TypeScript</h1>
<section>
   <!--. Places the grid with data in src to page. More information about the src attribute at https://www.treegrid.com/FDoc/Data.htm#Create -->
   <!--. The grid has set fixed height, so it can show vertical scrollbars. More information about FastGrid positioning at https://www.treegrid.com/FDoc/GridSize.htm -->
   <!--. More information about the assigned events at https://www.treegrid.com/FDoc/Cell.htm#OnSetValue , https://www.treegrid.com/FDoc/Data.htm#OnReady , https://www.treegrid.com/FDoc/Events.htm#OnClick -->
   <FastGrid src={src} bind:this={grid} id="Book1" onSetValue={onSetValue} onReady={onReady} onClick={onClick} style="height:550px; width:100%" />
</section>
<button onclick={readValue}>Read value [1,A]</button> <!--. Button to run dedicated API function in grid -->
<button onclick={() => changeValue(grid, 1, 'A', 'XXX')}>Change value [1,A]</button> <!--Button to run universal API function with parameters in grid.-->

<!--! README in html -->

<p>
   FastSheet example using JSON data, typed component ref and FastGrid API events.<br />
   All items used in this tutorial are explained in comments in the tutorial source Svelte file at 
   <dfn>./src/typescript/03-quick-start-sheet.svelte</dfn>
</p>

<h2>Installation</h2>
<p>
   FastGrid library can be added to Svelte project by
   <code>npm install fastgrid-svelte</code>
</p>
<h2>Import</h2>
<p>
   FastGrid library can be imported to svelte by
   <code>import &#123; FastGrid &#125; from "fastgrid-svelte";</code>
</p>
<h2>Usage</h2>
<p>
   FastGrid can be created and shown in Svelte app as tag <code>&lt;FastGrid src = &#123; sources &#125; /></code>
   where <b>sources</b> is JavaScript object that defines grid layout and data, for example:
   <code>&lt;FastGrid src=&#123;&#123; Cols:["A","B","C"], Head:[ "Header" ], Body:[ &#123; V:[1,2,3] &#125;, &#123; V:[4,5,6] &#125;, &#123; V:[7,8,9] &#125; ] &#125;&#125; style="height:500px;" /></code>
</p>
<h2>API methods and events</h2>
<p>
   Created FastGrid object can be accessed by Svelte grid object binded by <b>bind:this</b> in &lt;FastGrid/> and this object can be used to invoke FastGrid API methods.<br />
   The FastGrid API event handlers can be assigned directly to &lt;FastGrid/&gt; tag like normal DOM events.<br />
   The full simple Svelte application using FastGrid API methods and events:
   <code>
&lt;script lang="ts">
   import &#123; FastGrid &#125; from "fastgrid-svelte";
   const src = &#123; 
      Cfg:&#123; SheetJs:1, Book:'QuickSheet' &#125;, 
      Sheets:&#123;
         Sheet1: &#123; Body:[ &#123; V:[100,200,300] &#125;, &#123; V:&#123;A:400,B:500,C:600&#125; &#125;, &#123; V:"|700|800|900" &#125; ] &#125;,
         "Sheet 2": &#123; Body:[ &#123; V:['AAA','BBB','CCC'] &#125;, &#123; V:"~DDD~EEE~FFF~GGG" &#125; ] &#125;
         &#125;
      &#125;;
   let grid:FastGrid|null = null;
   function readValue() : void &#123; alert("Read value from cell [1,A]: "+grid?.Get(1,"A")); &#125;
   function changeValue(grid:FastGrid|null,row:TRow|string|number,col:TCol|string|number,val:any) : void &#123;
      grid?.Set(row,col,"",val,1);
      &#125;
   const onSetValue:TFGrid["OnSetValue"] = (_grid,row,col,value,changes) => &#123;
      if(changes) console.log("Value "+value+" set to cell ["+row?.id+","+col?.id+"]");
      &#125;;
   function onClick(grid?:TGrid,row?:TRow,col?:TCol) : void|boolean|number &#123;
      if(row&&col) console.log("clicked cell ["+row.id+","+col.id+"] with value "+grid?.GetValue(row,col));
      &#125;
   function onReady(grid:TGrid) : void &#123; console.log("FastGrid "+grid?.id+" is ready"); &#125;
&lt;/script>
&lt;FastGrid bind:this=&#123;grid&#125; &#123;src&#125; &#123;onSetValue&#125; &#123;onClick&#125; &#123;onReady&#125; style="display:inline-block; max-width:100%"/>
&lt;button onclick=&#123;readValue&#125;>Read value [1,A]&lt;/button>
&lt;button onclick=&#123;() => changeValue(grid,1,"A","XXX")&#125;>Change value [1,A]&lt;/button>
   </code>
</p>
<h2>Documentation</h2>
<p>
FastGrid documentation index and glossary is at <a target="FGDoc" href="https://www.treegrid.com/FDoc/Glossary.htm">https://www.treegrid.com/FDoc/Glossary.htm</a><br/>
Search FastGrid attributes, API methods and events in doc at <a target="FGDoc" href="https://www.treegrid.com/FDoc/SearchAttr.html">https://www.treegrid.com/FDoc/SearchAttr.html</a><br/>
</p>
<h2>License & commercial use</h2>
<p>
FastGrid is commercial software.<br/>
A license is required to use it in production.<br/>
Information about licensing is at <a target="FGDoc" href="https://www.treegrid.com/Licensing">https://www.treegrid.com/Licensing</a><br/>
License prices are at <a target="FGDoc" href="https://www.treegrid.com/Prices">https://www.treegrid.com/Prices</a><br/>
Online purchase can be done in e-shop at <a target="FGDoc" href="https://www.treegrid.com/Purchase">https://www.treegrid.com/Purchase</a>
</p>
