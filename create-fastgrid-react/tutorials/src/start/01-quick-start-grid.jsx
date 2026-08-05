import React, { useMemo, useRef } from "react";
import { FastGrid } from "fastgrid-react";
import "../Tutorial.css"

export default function App() {
   //. All FastGrid attributes used in src can be found in documentation search at https://www.treegrid.com/FDoc/SearchAttr.html

   //. --- Simple layout and data for grid  ---
   const src = useMemo(() => ({ //. All layout and data for grid. Memo is used for simple object created inside the App function to avoid re-creating grid on every React App render
      Cols:["A","B",{id:"C",Width:80}], //. Simple columns definition
      Head:[ "Header" ],  //. Adds header to grid to top, without defining captions, so column ids are shown
      Body:[ { V:[100,200,300] }, { V:{A:400,B:500,C:600} }, { V:"|700|800|900" } ], //. Simple data for 3 rows and 3 columns. shows 3 ways of passing values to grid
      }), []);

   //. --- API definition and usage ---
   const gridRef = useRef(null); //. Grid reference received for grid, access the grid object as gridRef.current
   function readValue() { alert("Read value from cell [1,A]: "+ gridRef.current?.Get(1,"A"));  }     //. Function called from Read Value button 
   function changeValue(gridRef,row,col,val) { gridRef.current?.Set(row,col,"",val,1); }                //. Function called from both Change Value buttons with different parameters
   function onSetValue(grid,row,col,value,changes){ if(changes) console.log("Value "+value+" set to cell ["+row.id+","+col.id+"]"); } //. FastGrid API event OnSetValue handler
   function onClick(grid,row,col){ if(row&&col) console.log("clicked cell ["+row.id+","+col.id+"] with value "+grid.GetValue(row,col)); } //. FastGrid API event OnClick handler
   function onReady(grid){ console.log("FastGrid is ready"); } //. FastGrid API event OnReady handler.

   //. --- HTML definition ---
   return(
      <>
      <h1>Quick Start - FastGrid in React</h1>
      <section>
         {/*. Places the grid with data in src to page. More information about the src attribute at https://www.treegrid.com/FDoc/Data.htm#Create */}
         {/*. This simple grid is displayed as inline-block without width and height set, so it does not use internal scrollbars. max-width is set to 100%, to use grid horizontal scrollbar if required. */}
         {/*. To show grid vertical scrollbars, set fixed height, e.g <FastGrid style="height:500px;" ... More information about FastGrid positioning at https://www.treegrid.com/FDoc/GridSize.htm */}
         {/*. There are assigned three FastGrid API event handlers onSetValue, onReady and onClick. The event names start with a lowercase letter and are translated to FastGrid API event names starting uppercase */}
         {/*. More information about the assigned events at https://www.treegrid.com/FDoc/Cell.htm#OnSetValue , https://www.treegrid.com/FDoc/Data.htm#OnReady , https://www.treegrid.com/FDoc/Events.htm#OnClick */}
         <FastGrid src={src} ref={gridRef} id={"Grid1"} onSetValue={onSetValue} onReady={onReady} onClick={onClick} style={{display:"inline-block", maxWidth:"100%"}} />
      </section>
      <button onClick={readValue}>Read value [1,A]</button> {/*. Button to run dedicated API function in grid  */}
      <button onClick={() => { changeValue(gridRef,1,"A","XXX"); } }>Change value [1,A]</button> {/*. Button to run universal API function with parameters in grid. */}

      {/*. README in html */}

      <p>
         All items used in this tutorial are explained in comments in the tutorial source jsx file at 
         <dfn>./src/start/01-quick-start-grid.jsx</dfn><br/>
         This example can be tested also as standalone React application by 
         <dfn>npm create fastgrid-react</dfn>
      </p>

      <h2>Installation</h2>
      <p>
         FastGrid library can be added to React project by
         <code>npm install fastgrid-react</code>
      </p>
      <h2>Import</h2>
      <p>
         FastGrid library can be imported to jsx by
         <code>{`import { FastGrid } from "fastgrid-react";`}</code>
      </p>
      <h2>Usage</h2>
      <p>
         FastGrid can be created and shown in React app as tag <code>{`<FastGrid src={sources} />`}</code>
         where <b>sources</b> is JavaScript object that defines grid layout and data, for example:
         <code>{`<FastGrid src={ { Cols:["A","B","C"], Head:[ "Header" ], Body:[ { V:[1,2,3] }, { V:[4,5,6] } ] } } style={{height:"500px"}} />`}</code>
      </p>
      <h2>API methods and events</h2>
      <p>
         Created FastGrid object can be accessed React ref created with <b>useRef</b> and this object can be used to invoke FastGrid API methods.<br />
         The FastGrid API event handlers can be assigned directly to &lt;FastGrid/&gt; tag like normal DOM events.<br />
         The full simple React application using FastGrid API methods and events:
         <code>{`import React, { useMemo, useRef } from "react";
import { FastGrid } from "fastgrid-react";
export default function App() {
const src = useMemo(() => ({ Cols:["A","B",{id:"C",Width:80}], Head:["Header"], Body:[ { V:[1,2,3] }, { V:{A:4,B:5,C:6} } ] }), []);
const gridRef = useRef(null);
function readValue() { alert("Read value from cell [1,A]: "+ gridRef.current?.Get(1,"A")); }
function changeValue() { gridRef.current?.Set(1,"A","","XXX",1); }
function onSetValue(grid,row,col,value,changes){ if(changes) console.log("Value "+value+" set to cell ["+row.id+","+col.id+"]"); }
function onClick(grid,row,col){ if(row&&col) console.log("clicked cell ["+row.id+","+col.id+"]"); }
return(<>
   <FastGrid src={src} ref={gridRef} onSetValue={onSetValue} onClick={onClick} style={{height:"500px"}} />
   <button onClick={readValue}>Read value</button> 
   <button onClick={changeValue}>Change value</button>
   </>)
}`}</code>
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
      </>
      )
   }