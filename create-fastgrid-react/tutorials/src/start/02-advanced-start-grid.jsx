import React, { useMemo, useRef } from "react";
import { FastGrid } from "fastgrid-react";
import "../Tutorial.css";

export default function App() {
   //. All FastGrid attributes used in src can be found in documentation search at https://www.treegrid.com/FDoc/SearchAttr.html

   //. --- Simple layout and data for grid 1  ---
   const src1 = useMemo(() => ({ //. All layout and data for grid 1. Memo is used for simple object created inside the App function to avoid re-creating grid on every React App render
      Cols:["A","B","C"], //. Simple columns definition, just ids, without any attributes
      Head:[ "Header" ],  //. Adds header to grid to top, without defining captions, so column ids are shown
      Body:[ { V:[100,200,300] }, { V:{A:400,B:500,C:600} }, { V:"|700|800|900" } ] //. Simple data for 3 rows and 3 columns. shows 3 ways of passing values to grid
      }), []);

   //. --- Layout and data for grid 2  ---
   const src2layout = useMemo(() => ({ //. Layout for grid 2 (usually in static object or file)
      Cfg: { id:"Advanced_Grid", Style:"Blue", StyleIcons:"Lucide", Focused:"R1,C2" }, //. Grid configuration sets theme, grid id for FastGrid API, and focuses given cell on start
      DefCols: { //. Defines default columns with attributes that will be inherited by all or specific columns. More information about defaults in FastGrid at https://www.treegrid.com/FDoc/Defaults.htm
         Col: { Width:80 },                     //. Col is special default inherited by all columns without D attribute. Sets width to all columns.
         RedText: { D:"Col", TextColor:"red" }  //. Sets red text to all columns with D:"RedText". Inherits Col default. It is possible to let default to inherit more other defaults.
         }, 
      DefRows: { //. Defines default rows with attributes that will be inherited by all or specific rows. More information about defaults in FastGrid at https://www.treegrid.com/FDoc/Defaults.htm
         Row: { },                              //. Row is special default inherited by all rows without D attribute. Here is just empty
         Child: { TextStyle:2 }                 //. Sets italic text to all rows with D:"Child". It is possible to let default to inherit more other defaults.
         },
      LeftCols: [ //. Defines columns in the left section. The column sections can be re-defined in ColParts. More information about FastGrid parts at https://www.treegrid.com/FDoc/Layout.htm
         { D:"Index" },                         //. Defines Index columns showing row indexes
         { D:"Panel", LeftIcons:"SelectRow,DeleteRow,AddRow" }, //. Defines Panel column with specified row control buttons
         { id:"C1", Width:130 }                 //. Simple String column definition. It shows tree lines and buttons as defined in Body { Tree:"C1" }
         ], 
      Cols: [ //. Defines columns in the main / middle section
         { id:"C2", Type:"Number", Format:",0.00" }, //. Column with formatted number
         { id:"C3", Type:"Date", RightIcons:"Date", Width:120, Format:"yyyy-MM-dd" }, //. Column with formatted date
         { id:"C4", List:"|Red|Green|Blue", LeftIcons:"List" }, //. Column with simple enumeration list and popup button on the left
         { id:"C5", List: { 1:"One", 2:"Two", 3:"Three", 4:"Four", 5:"Five" }, Range:1, RightIcons:"List", Button:"List", Width:120 }, //. Column with enumeration list with keys and more items in value (Range:1) and popup button on the right
         { id:"C6", Type:"Bool" }  //. Simple boolean / checkbox column definition. It should be filled by values 0 / 1, not true / false
         ], 
      RightCols: [ //. Defines columns in the right section.
         { id:"C7", D:"RedText", Width:50, Formula:"C6 ? C2 : 0" } //. Text column with explicitly set width and inheriting red text from RedText default. Row can inherit only one default, but the default itself can inherit more other defaults.
         ], 
      Head: [ //. Defines rows in the top Head section. The row sections can be re-defined in RowParts. More information about FastGrid parts at https://www.treegrid.com/FDoc/Layout.htm
         { D:"Header", V: { C1:"Left", C2:"Number", C3:"Date", C4:"List", C5:"List + keys", C6:"Boolean", C7:"Right" } }, //. Adds header to grid to top, defines the column captions
         { D:"Filter", A: { C3: { DefaultDate:"7/2/2026" }, C4: { RightIcons:"List" }, C5: { LeftIcons:"" }, C6: { LeftIcons:"" } } } //. Filter row to filter by given columns and rows. In C4 moves the List icon from left to right and in C5 and C6 hides the filter icon as it is usually not needed for lists and bools.
         ],
      Foot: [ { id:"Footer", F: { C2:"sum(null,'Body',null,1)", C7:"sum(null,'Body',null,1)" }, A: { C2: { NoEdit:1 }, C3: { Type:"String", RightIcons:"" } } } ], //. Row in grid footer. Calculates summary in column C2 and hides the date in C3
      Top: [ "AI" ],        //. Shows toolbar AI on top
      Bottom: [ //. Shows toolbars Data1 and Settings and custom toolbar with custom icon Custom1 bottom the grid
         { Cells: [{ 
            id:"Custom1", IconHeight:17, Value:"Custom", OnClick:"Grid.Component.increaseValues2()", Tip:"Custom toolbar cell calls Increase values", 
            Icon:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNyAxNyI+PHBhdGggc3Ryb2tlPSIjNjg5IiBzdHJva2Utd2lkdGg9IjIiIGQ9Im0zLjUsM3Y2bTAsM3YybTUsLTExdjZtMCwzdjJtNSwtMTF2Nm0wLDN2MiIvPjwvc3ZnPg==" 
            }] },
         "Data1", "Settings" 
         ], 
      Body: {               //. Body as object defines body attributes (as array it defines rows). To use both definitions in one json, use any _postfix, e.g. { Body:[...], Body_Cfg: { ... } }
         Tree:"C1"          //.  Shows row tree in column C1.
         }
      }), []);
   const src2data = useMemo(() => ({ //. Data for grid 2 (usually read from database or url, there can be also more data objects passed to FastGrid, more information at https://www.treegrid.com/FDoc/Data.htm#Create)
      //. Defines data rows in main Body section
      //. L attribute defines row level in tree, 0 - means root. Row with higher L automatically belongs as a child to above row with lower L. More information about row and column tree at https://www.treegrid.com/FDoc/Tree.htm
      Body: [ 
         { id:"R1", L:0, V:{ C1:"Row 1", C2:20.5, C3:"7/1/2026", C4:"Red", C5:2, C6:1 } }, //. Root row with values in V, assigned to cells as column ids 
         { id:"R1-1", L:1, D:"Child", Color:"lime",                                        //. Child row of R1, sets its background color to lime, inherits default row Child defining italic text style
            V: { C1:"Row 1:1", C2:123.456789, C3:"7/2/2026", C4:"Red", C5:"2;3", C6:0 }, 
            A:{ C2: { Color:"aqua", TextStyle:1 } }                                        //. Sets cell attributes, background color to aqua and italic style in cell in column C2
            }, 
         { id:"R1-1-2", L:2, D:"Child", V:{ C1:"Row 1:1:1", C2:-12.3, C3:"7/7/2026", C4:"Red", C5:1, C6:1 } },                //. Child row of R1-1, grand child row of R1
         { id:"R1-2", L:1, D:"Child", Selected:1, V:{ C1:"Row 1:2", C2:5, C3:"7/3/2026", C4:"Red", C5:3, C6:1 } },            //. Child row of R1. It is marked as selected on start
         { id:"R2", L:0, V:{ C1:"Row 2", C2:24.12, C3:"7/2/2026", C4:"Red", C5:"1;4;5", C6:0 }, RS: { C2:3 }, CS: { C2:2 } }, //. Root row, spans cell C2 to three rows and two columns
         { id:"R3", L:0, V:{ C1:"Row 3", C2:-100, C3:"7/1/2026", C4:"Red", C5:"2;5", C6:0 } }, 
         { id:"R4", L:1, V:{ C1:"Row 3:1", C2:23, C3:"6/29/2026", C4:"Red", C5:"3", C6:1 } },                                 //. Child row of R3
         ] 
      }), []);
   const src2 = useMemo(() => ([src2layout,src2data]), [src2layout,src2data]); //. Memoizes the combined src array, otherwise a new array would be created on every React render and the grid could be recreated unnecessarily.

   //. --- API definition and usage ---
   const gridRef1 = useRef(null); //. Grid reference received for grid 1, access the grid object as gridRef1.current
   const gridRef2 = useRef(null); //. Grid reference received for grid 2, access the grid object as gridRef2.current
   function readValue1() { alert("Read value from grid1 [1,A]: "+ gridRef1.current?.Get(1,"A"));  }     //. Function called from Read Value 1 button 
   function readValue2() { alert("Read value from grid2 [R1,C1]: "+gridRef2.current?.Get("R1","C1")); } //. Function called from Read Value 2 button 
   function changeValue(gridRef,row,col,val) { gridRef.current?.Set(row,col,"",val,1); }                   //. Function called from both Change Value buttons with different parameters
   function increaseValues2(){ //. Function called from Increase Value 2 button, Demonstrates API usage, increases all numbers by 1 and all dates by 1 day
      const G = gridRef2.current, cols = G?.IterAll("C");
      G?.IterAll("Body",(row) => { //. Iterates all rows in Body section. To iterate only particular rows use Iter() method instead. More information about accessing rows / columns in FastGrid at https://www.treegrid.com/FDoc/API.htm
         for(var i=0;i<cols.length;i++){
            var col = cols[i], type = G.GetAttr(row,col,"Type"), val = G.GetValue(row,col); 
            if(type=="Number") G.SetValue(row,col,val-0+1,1);
            else if(type=="Date"){ val = new Date(val-0?val:G.StringToDate(val)); val.setUTCDate(val.getUTCDate()+1); G.SetValue(row,col,val-0,1); }
            }
         });
      }
   function onSetValue1(grid,row,col,value,changes){ if(changes) console.log("Value "+value+" set in grid 1 to ["+row.id+","+col.id+"]"); } //. FastGrid API event OnSetValue handler assigned to the grid 1
   function onSetValue2(grid,row,col,value,changes){ if(changes) console.log("Value "+value+" set in grid 2 to ["+row.id+","+col.id+"]"); } //. FastGrid API event OnSetValue handler assigned to the grid 2
   function onClick(grid,row,col){ if(row&&col) console.log("clicked grid "+(grid==gridRef1.current?1:2)+" ["+row.id+","+col.id+"]"); } //. FastGrid API event OnClick handler assigned to both grids
   function onReady(grid){ console.log("grid "+(grid.Index+1)+" [id: "+grid.id+"] is ready"); } //. FastGrid API event OnReady handler. Called on loading of both grids.

   const componentApi2 = useMemo(function(){ return { increaseValues2 }; },[increaseValues2]); //. increaseValues2 is called also from OnClick Custom1 toolbar icon, so it is passed to <FastGrid> grid 2

   //. --- HTML definition ---
   return(
      <>
      <h1>Advanced Start - FastGrid in React with API + events</h1>
      <section>
         <div style={{marginRight:"20px"}}>
            <h2>Simple grid</h2>
            {/*. Places the grid1 with data in src1 to page. More information about the src attribute at https://www.treegrid.com/FDoc/Data.htm#Create */}
            {/*. This simple grid is displayed as inline-block without width and height set, so it does not use internal scrollbars. More information about FastGrid positioning at https://www.treegrid.com/FDoc/GridSize.htm */}
            {/*. There are assigned three FastGrid API event handlers onSetValue, onReady and onClick. The event names start with a lowercase letter and are translated to FastGrid API event names starting uppercase */}
            {/*. More information about the assigned events at https://www.treegrid.com/FDoc/Cell.htm#OnSetValue , https://www.treegrid.com/FDoc/Data.htm#OnReady , https://www.treegrid.com/FDoc/Events.htm#OnClick */}
            <FastGrid src={src1} ref={gridRef1} id={"Simple_Grid"} onSetValue={onSetValue1} onReady={onReady} onClick={onClick} style={{display:"inline-block"}} />
         </div>
         <div style={{minWidth:"0px"}}>
            <h2>Advanced grid with various attributes</h2>
            {/*. Places the grid2 with data in src2layout and src2data to page */}
            {/*. This grid has set fixed height, so it will display vertical scrollbar(s). More information about FastGrid positioning at https://www.treegrid.com/FDoc/GridSize.htm */}
            {/*. max-width is set to use grid horizontal scrolling when the tag is narrower than the width */}
            <FastGrid src={src2} ref={gridRef2} onSetValue={onSetValue2} onReady={onReady} onClick={onClick} component={componentApi2} style={{width:"740px", maxWidth:"100%", height:"330px"}} />
         </div>
      </section>
      <button onClick={readValue1}>Read value 1</button> {/*. Button to run dedicated API function in grid 1. */}
      <button onClick={() => { changeValue(gridRef1,1,"A","XXX"); } }>Change value 1</button> {/*. Button to run universal API function with parameters in grid 1. */}
      <button onClick={readValue2}>Read value 2</button>
      <button onClick={() => { changeValue(gridRef2,"R1","C1","YYY"); } }>Change value 2</button>
      <button onClick={increaseValues2}>Increase values 2</button> {/*. Button to run dedicated API function in grid 2  */}

      {/*. README in html */}
      <p>
         All items used in this tutorial are explained in comments in the tutorial source jsx file at 
         <dfn>./src/start/02-advanced-start-grid.jsx</dfn>
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