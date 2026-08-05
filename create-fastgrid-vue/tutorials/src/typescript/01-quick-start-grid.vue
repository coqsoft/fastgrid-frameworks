<script setup lang="ts">
import { ref } from "vue";
import { FastGrid } from "fastgrid-vue";
import "../Tutorial.css";

//. All FastGrid attributes used in src can be found in documentation search at https://www.treegrid.com/FDoc/SearchAttr.html

//. --- Simple layout and data for grid  ---
const src = {
   Cols:["A","B",{id:"C",Width:80}], //. Simple columns definition
   Head:[ "Header" ],                //. Adds header to grid to top, without defining captions, so column ids are shown
   Body:[ { V:[100,200,300] }, { V:{A:400,B:500,C:600} }, { V:"|700|800|900" } ], //. Simple data for 3 rows and 3 columns. shows 3 ways of passing values to grid
   };

//. --- API definition and usage ---
const gridRef = ref<TGrid|null>(null); //. Grid reference received for grid, access the grid object as gridRef.value, the gridRef is of type TGridRef
function readValue() : void { alert("Read value from cell [1,A]: "+ gridRef.value?.Get(1,"A")); }     //. Function called from Read Value button 
function changeValue(grid:TGrid|null,row:TRow|string|number,col:TCol|string|number,val:any) : void {  //. Function called from both Change Value buttons with different parameters
   grid?.Set(row,col,"",val,1); 
   }                
const onSetValue : TFGrid["OnSetValue"] = (_grid,row,col,value,changes) => { //. FastGrid API event OnSetValue handler using TFGrid definition to simplify types
   if(changes) console.log("Value "+value+" set to cell ["+row?.id+","+col?.id+"]"); 
   } 
function onClick(grid?:TGrid,row?:TRow,col?:TCol) : void|boolean|number { //. FastGrid API event OnClick handler using standard function definition
   if(row&&col) console.log("clicked cell ["+row.id+","+col.id+"] with value "+grid?.GetValue(row,col)); 
   } 
function onReady(grid:TGrid) : void { console.log("FastGrid is ready"); } //. FastGrid API event OnReady handler using standard function definition


</script>

<template>
   <h1>Quick Start - FastGrid in Vue with TypeScript</h1>
   <section>
      <!--. Places the grid with data in src to page. More information about the src attribute at https://www.treegrid.com/FDoc/Data.htm#Create -->
      <!--. This simple grid is displayed as inline-block without width and height set, so it does not use internal scrollbars. max-width is set to 100%, to use grid horizontal scrollbar if required. -->
      <!--. To show grid vertical scrollbars, set fixed height, e.g <FastGrid style="height:500px;" ... More information about FastGrid positioning at https://www.treegrid.com/FDoc/GridSize.htm -->
      <!--. There are assigned three FastGrid API event handlers onSetValue, onReady and onClick. The event names start with a lowercase letter and are translated to FastGrid API event names starting uppercase -->
      <!--. More information about the assigned events at https://www.treegrid.com/FDoc/Cell.htm#OnSetValue , https://www.treegrid.com/FDoc/Data.htm#OnReady , https://www.treegrid.com/FDoc/Events.htm#OnClick -->
      <FastGrid ref="gridRef" :src="src" style="display:inline-block; max-width:100%" @set-value="onSetValue" @click="onClick" @ready="onReady"/>
   </section>
   <button @click="readValue">Read value [1,A]</button> <!--! Button to run dedicated API function in grid  -->
   <button @click="changeValue(gridRef, 1, 'A', 'XXX')">Change value [1,A]</button> <!--! Button to run universal API function with parameters in grid, gridRef is automatically passed as gridRef.value -->

   <!--. README in html -->
   <p>
      All items used in this tutorial are explained in comments in the tutorial source vue file at 
      <dfn>./src/typescript/01-quick-start-grid.vue</dfn><br/>
      This example can be tested also as standalone Vue application by
      <dfn>npm create fastgrid-vue</dfn>
   </p>

   <h2>Installation</h2>
   <p>
      FastGrid library can be added to Vue project by
      <code>npm install fastgrid-vue</code>
   </p>
   <h2>Import</h2>
   <p>
      FastGrid library can be imported to vue by
      <code>import { FastGrid } from "fastgrid-vue";</code>
   </p>
   <h2>Usage</h2>
   <p>
      FastGrid can be created and shown in Vue app as tag <code>&lt;FastGrid :src="sources" /></code>
      where <b>sources</b> is JavaScript object that defines grid layout and data, for example:
      <code>&lt;FastGrid :src='{ Cols:["A","B","C"], Head:[ "Header" ], Body:[ { V:[1,2,3] }, { V:[4,5,6] }, { V:[7,8,9] } ] }' style="height:500px;"/></code>
   </p>
   <h2>API methods and events</h2>
   <p>
      Created FastGrid object can be accessed by Vue ref created with <b>ref</b> and this object can be used to invoke FastGrid API methods.<br />
      The FastGrid API event handlers can be assigned directly to &lt;FastGrid/&gt; tag like normal DOM events.<br />
      The full simple Vue application using FastGrid API methods and events:
      <code>
         &lt;script setup><br />
            &nbsp; import { ref } from "vue";<br />
            &nbsp; import { FastGrid } from "fastgrid-vue";<br />
            &nbsp; const src = { Cols:["A","B",{id:"C",Width:80}], Head:["Header"], Body:[ { V:[1,2,3] }, { V:{A:4,B:5,C:6} } ] };<br />
            &nbsp; const gridRef = ref&lt;TGrid|null>(null);<br />
            &nbsp; function readValue() : void { alert("Read value from cell [1,A]: "+ gridRef.value?.Get(1,"A")); }<br />
            &nbsp; function changeValue(grid:TGrid|null,row:TRow|string|number,col:TCol|string|number,val:any) : void { grid?.Set(row,col,"",val,1); }<br />
            &nbsp; function onSetValue(grid:TGrid,row?:TRow,col?:TCol,value?:any,changes?:number) : void {<br /> 
            &nbsp; &nbsp; if(changes) console.log("Value "+value+" set to cell ["+row?.id+","+col?.id+"]"); <br />
            &nbsp; &nbsp; }<br />
            &nbsp; function onClick(grid?:TGrid,row?:TRow,col?:TCol) : void|boolean|number {<br />
            &nbsp; &nbsp; if(row&&col) console.log("clicked cell ["+row.id+","+col.id+"] with value "+grid?.GetValue(row,col));<br />
            &nbsp; &nbsp; }<br />
         &lt;/script><br />
         &lt;template><br />
            &nbsp; &lt;FastGrid ref="gridRef" :src="src" @set-value="onSetValue" @click="onClick" style="height:500px;"/><br /> 
            &nbsp; &lt;button @click="readValue">Read value&lt;/button><br />
            &nbsp; &lt;button @click="changeValue(gridRef, 1, 'A', 'XXX')">Change value&lt;/button><br />
         &lt;/template>
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
</template>