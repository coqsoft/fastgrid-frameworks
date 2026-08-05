import React, { useMemo, useRef } from "react";
import { FastGrid } from "fastgrid-react";
import "../Tutorial.css"

export default function App() {
   //. All FastGrid attributes used in src can be found in documentation search at https://www.treegrid.com/FDoc/SearchAttr.html

   //. --- Simple layout and data for sheet  ---
   const src = useMemo(() => ({ //. All layout and data for sheet. Memo is used for simple object created inside the App function to avoid re-creating grid on every React App render
      Cfg: { SheetJs:1, Book:'QuickSheet' }, //. SheetJs is used to set to sheet mode, if data is coming from json or csv and not from xlsx.
      Sheets:{
         Sheet1: { Body:[ { V:[100,200,300] }, { V:{ A:400, B:500, C:600 } }, { V:"|700|800|900" } ] }, //. Simple data for the first sheet for 3 rows and 3 columns. Shows 3 ways of passing values to grid. In sheet the columns are always named as A, B, C,...
         "Sheet 2": { Body:[ { V:['AAA','BBB','CCC'] }, { V:"~DDD~EEE~FFF~GGG" } ] } //. Simple data for the second sheet
         }
      }), []);

   //. --- API definition and usage ---
   const gridRef = useRef(null); //. Grid reference received for grid, access the grid object as gridRef.current
   function readValue() { alert("Read value from cell [1,A]: "+ gridRef.current?.Get(1,"A"));  }     //. Function called from Read Value button 
   function changeValue(gridRef,row,col,val) { gridRef.current?.Set(row,col,"",val,1); }                //. Function called from both Change Value buttons with different parameters
   function onSetValue(grid,row,col,value,changes){ if(changes) console.log("Value "+value+" set to cell ["+row.id+","+col.id+"]"); } //. FastGrid API event OnSetValue handler
   function onClick(grid,row,col){ if(row&&col) console.log("clicked cell ["+row.id+","+col.id+"] with value "+grid.GetValue(row,col)); } //. FastGrid API event OnClick handler
   function onReady(grid){ console.log("FastGrid "+grid.id+" is ready"); } //. FastGrid API event OnReady handler.

   //. --- HTML definition ---
   return(
      <>
      <h1>Quick Start - FastSheet from JSON in React</h1>
      <section>
         {/*. Places the grid with data in src to page. More information about the src attribute at https://www.treegrid.com/FDoc/Data.htm#Create */}
         {/*. The grid has set fixed height, so it can show vertical scrollbars. More information about FastGrid positioning at https://www.treegrid.com/FDoc/GridSize.htm */}
         {/*. More information about the assigned events at https://www.treegrid.com/FDoc/Cell.htm#OnSetValue , https://www.treegrid.com/FDoc/Data.htm#OnReady , https://www.treegrid.com/FDoc/Events.htm#OnClick */}
         <FastGrid src={src} ref={gridRef} id={"Book1"} onSetValue={onSetValue} onReady={onReady} onClick={onClick} style={{height:"550px", width:"100%"}} />
      </section>
      <button onClick={readValue}>Read value [1,A]</button> {/*. Button to run dedicated API function in grid  */}
      <button onClick={() => { changeValue(gridRef,1,"A","XXX"); } }>Change value [1,A]</button> {/*. Button to run universal API function with parameters in grid. */}

      {/*. README in html */}
      <p>
         All items used in this tutorial are explained in comments in the tutorial source jsx file at 
         <dfn>./src/start/03-quick-start-sheet.jsx</dfn>
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
         FastGrid as FastSheet can be created and shown in React app as tag <code>{`<FastGrid src={sources} />`}</code>
         where <b>sources</b> is JavaScript object that defines grid layout and data, for example:
         <code>{`<FastGrid src={ { Cfg:{ SheetJs:1, Book:'QuickSheet' }, Body:[ { V:[1,2,3] }, { V:[4,5,6] } ] } } style={{ height:"500px" }} />`}</code>
      </p>
      <h2>API methods and events</h2>
      <p>
         Created FastGrid object can be accessed React ref created with <b>useRef</b> and this object can be used to invoke FastGrid API methods.<br />
         The FastGrid API event handlers can be assigned directly to &lt;FastGrid/&gt; tag like normal DOM events.<br />
         The full simple React application using FastGrid as FastSheet API methods and events:
         <code>{`import React, { useMemo, useRef } from "react";
import { FastGrid } from "fastgrid-react";
export default function App() {
const src = useMemo(() => ({ 
   Cfg:{ SheetJs:1, Book:'QuickSheet' }, 
   Sheets:{
      Sheet1: { Body:[ { V:[100,200,300] }, { V:{ A:400, B:500, C:600 } }, { V:"|700|800|900" } ] },
      "Sheet 2": { Body:[ { V:['AAA','BBB','CCC'] }, { V:"~DDD~EEE~FFF~GGG" } ] }
      }
   }), []);
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