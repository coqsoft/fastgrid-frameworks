<script>
import { FastGrid } from "fastgrid-svelte";
import "../Tutorial.css";

const src = ({ //. All layout and data for grid

   Cfg: {
      id:"DB", //. Grid identification for saving configuration to cookies 
      FixedScroll:2, FixedScrollType:1,    //. When scrolling vertically by larger amount, it rounds scroll to the row height.
      SelectAllType:7,   //. Shows count of selected rows in the SelectRows icon in header
      DeletingRows:2,    //. Shows deleted rows in red
      },
   Body_Cfg: { 
      Sort:"Project,Resource", Alternate:2, AlternateType:2, 
      GroupTree: { Project:"Resource", Resource:"Project", "Project,Resource":"Week" } //, Group:"Project,Resource"
      },
   LeftCols: [
      { D:"Index", id:"Index", VIndex:-3 },
      { D:"Panel", LeftIcons:"SelectRow,DeleteRow,AddRow" }
      ],
   Cols: [
      { id:"Project", Width:250, Type:"String", GroupWidth:-1 },
      { id:"Resource", Width:140, Type:"String", GroupWidth:-1 },
      { id:"Week", Width:70, Type:"Number", GroupWidth:-1 },
      { id:"Hours", Width:70, Type:"Number", Format:"0.###" }
      ],
   DefRows: {
	   Group: { //. Default row for grouping, calculates summary for its group
         NoCalc:1,
         F: { Week: "Grid.GetPartAttr('Body','Tree')=='Week' ? Value : min()+'-'+max()", Hours:"sum(null,null,null,3)" },
         A: { Week: { Type:"String" } }
         }
      },
   Head: [
      { D:"Header", LevelsPart:"Body", V:{ Index:"Idx"}, A: { Panel: { LeftIcons:"SelectRows,DeleteRows,AddRows" } } }, 
      { D:"Filter", A: { Panel: { LeftIcons:"" } } },
      { id:"Sticky", D:"Sticky", CS: { Project:4 }, A: { Panel: { LeftIcons:"" }, Project: { Static:1 } } }, //. Shows parent values when parent moved above body top, for grouped grid
      ],
   Foot:[
      { id:"Summary", NoEdit:1, NoIndex:1,  //. Calculated summary row
         V:{ Project:"Summary" }, CS: { Project:2 }, 
         F:{ Week:"min(null,'Body',null,3)+'-'+max(null,'Body',null,3)", Hours:"sum(null,'Body',null,3)" }, 
         A: { Panel: { LeftIcons:"" }, Week: { Type:"String", Align:1 }, Hours: { Format:"0.##" } } 
         }
      ],
   Body: { StickyRow:"Sticky", StickyCol:"Project" }, //. Assigns Sticky row for Body
   Top:[
      { id:"Data", Cells:"Save,Reload,Print,Pdf,Export,Copy,AddRowEnd,Undo,Redo,Settings" }, "Layout",
      { Cells:[{ D:"GroupList", Width:130, List:{ "":"none", Project:"Project", Resource:"Resource", "Project,Resource": "Project -> Resource"} }] } //. Grouping row 
      ]

   });

function onLoadError(G,source,code,message,index){
   return { IO:{ Message:"Sample node server is not running on localhost:8000<br>You need to install and start node package in <b>./server/</b>" } };
   }

let grid = null; //. Grid reference received for grid, access the grid object as grid
</script>

<h1>2. Plain table from SQL server using UTF8Store</h1>
   <h5>Loading data from and saving data to SQLite database table on Node server in short format UTF8Store</h5>
   <ul>
      <li>
         Sample Node server must be running on <b>http://localhost:8000</b>. The sample Node server package is located at <b>./server/</b>.<br/>
         The sample data are loaded from <b><a href="http://localhost:8000/SQLTableUTF8Store.js?func=get" target="_blank">http://localhost:8000/SQLTableUTF8Store.js?func=get</a></b> and saved to url <b>http://localhost:8000/SQLTableUTF8Store.js?func=set</b>.

         PDF is generated on url <b>http://localhost:8000/Pdf.js?func=getpdf</b>.<br/>
         The sample data on server are stored in <b>./server/sqlite.db</b> database file in table <b>TableData</b>
         and the script loading and saving data is located at <b>./server/SQLTableUTF8Store.js</b>
      </li>
      <li>
         This example uses <b>UTF8 Store</b> to code all data sent from server to one short UTF8 string.<br />
         In this sample the resulted data are shorten by about <b>seven times</b> to about <b>15%</b> of original JSON size. 
         Compare: <b><a href="http://localhost:8000/SQLTableUTF8Store.js?func=get" target="_blank">UTF8 Store</a></b> 
         vs. <b><a href="http://localhost:8000/SQLTable.js?func=get" target="_blank">JSON</a></b>.<br />
      </li>
   </ul>
   <FastGrid
      src={[src,'http://localhost:8000/SQLTableUTF8Store.js?func=get', { Cfg:{ SaveUrl:'http://localhost:8000/SQLTableUTF8Store.js?func=set', PdfUrl:'http://localhost:8000/Pdf.js?func=getpdf' } }]}
      bind:this={grid} {onLoadError} style="height:100%; min-height:500px; width:100%"
      />
