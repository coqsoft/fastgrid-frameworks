<script setup>
import { ref } from "vue";
import { FastGrid } from "fastgrid-vue";
import "../Tutorial.css";

   //. All FastGrid attributes used in src can be found in documentation search at https://www.treegrid.com/FDoc/SearchAttr.html

   //. --- Simple layout and data for sheet  ---
   const src = { //. Sheet configuration
      Cfg: { Style:"Bare" },
      };

   //. --- API definition and usage ---
   const gridRef = ref(null); //. Grid reference received for grid, access the grid object as gridRef.value
   function readValue() { alert("Read value from cell [1,A]: "+ gridRef.value?.Get(1,"A"));  }     //. Function called from Read Value button 
   function changeValue(grid,row,col,val) { grid?.Set(row,col,"",val,1); }                //. Function called from both Change Value buttons with different parameters
   function onSetValue(grid,row,col,value,changes){ if(changes) console.log("Value "+value+" set to cell ["+row.id+","+col.id+"]"); } //. FastGrid API event OnSetValue handler
   function onClick(grid,row,col){ if(row&&col) console.log("clicked cell ["+row.id+","+col.id+"] with value "+grid.GetValue(row,col)); } //. FastGrid API event OnClick handler
   function onReady(grid){ console.log("FastGrid "+grid.id+" is ready"); } //. FastGrid API event OnReady handler.
</script>

<template>

      <!--. --- HTML definition --- -->
      <h1>Quick Start - FastSheet from XLSX in Vue</h1>
      <section>
         <!--. Places the grid with data in src to page. More information about the src attribute at https://www.treegrid.com/FDoc/Data.htm#Create -->
         <!--. The grid has set fixed height, so it can show vertical scrollbars. More information about FastGrid positioning at https://www.treegrid.com/FDoc/GridSize.htm -->
         <!--. More information about the assigned events at https://www.treegrid.com/FDoc/Cell.htm#OnSetValue , https://www.treegrid.com/FDoc/Data.htm#OnReady , https://www.treegrid.com/FDoc/Events.htm#OnClick -->
         <FastGrid :src="[src,'/Excel.xlsx']" ref="gridRef" id="Book1" @set-value="onSetValue" @ready="onReady" @click="onClick" style="height:550px; width:100%;" />
      </section>
      <button @click="readValue">Read value [1,A]</button> <!--. Button to run dedicated API function in grid -->
      <button @click="() => changeValue(gridRef,1,'A','XXX')">Change value [1,A]</button> <!--. Button to run universal API function with parameters in grid, gridRef is automatically passed as gridRef.value. -->

      <!--. README in html -->
      <p>
         All items used in this tutorial are explained in comments in the tutorial source vue file at 
         <dfn>./src/start/04-quick-start-xlsx.vue</dfn>
      </p>

      <h2>Installation</h2>
      <p>
         FastGrid library can be added to Vue project by
         <code>npm install fastgrid-vue</code>
      </p>
      <h2>Import</h2>
      <p>
         FastGrid library can be imported to vue by
         <code v-pre>import { FastGrid } from "fastgrid-vue";</code>
      </p>
      <h2>Usage</h2>
      <p>
         FastGrid as FastSheet can be created and shown in Vue app as tag <code v-pre>&lt;FastGrid src={sources} /></code>
         where <b>sources</b> is JavaScript object that defines grid layout and data, for example:
         <code v-pre>&lt;FastGrid src="{ Cfg:{ SheetJs:1, Book:'QuickSheet' }, Body:[ { V:[1,2,3] }, { V:[4,5,6] }, { V:[7,8,9] } ] }" style="height:500px;" /></code>
      </p>
   <h2>API methods and events</h2>
   <p>
      Created FastGrid object can be accessed by Vue ref created with <b>ref</b> and this object can be used to invoke FastGrid API methods.<br />
      The FastGrid API event handlers can be assigned directly to &lt;FastGrid/&gt; tag like normal DOM events.<br />
      The full simple Vue application using FastGrid API methods and events:
      <code v-pre>
         &lt;script setup><br />
            &nbsp; import { ref } from "vue";<br />
            &nbsp; import { FastGrid } from "fastgrid-vue";<br />
            &nbsp; const src = { Cfg:{ SheetJs:1, Book:'QuickSheet' }, Body:[ { V:[1,2,3] }, { V:{A:4,B:5,C:6} } ] };<br />
            &nbsp; const gridRef = ref(null);<br />
            &nbsp; function readValue() { alert("Read value from cell [1,A]: "+ gridRef.value?.Get(1,"A"));  }<br />
            &nbsp; function changeValue(grid,row,col,val) { grid?.Set(row,col,"",val,1); }<br />
            &nbsp; function onSetValue(grid,row,col,value,changes){ if(changes) console.log("Value "+value+" set to cell ["+row.id+","+col.id+"]"); }<br />
            &nbsp; function onClick(grid,row,col){ if(row&&col) console.log("clicked cell ["+row.id+","+col.id+"] with value "+grid.GetValue(row,col)); }<br />
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
