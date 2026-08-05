<script>
import { FastGrid } from "fastgrid-svelte";
import "../Tutorial.css";

const src = ({ //. All layout and data for grid

   Cfg: { 
      id: 'Tree',                             //. Grid identification for saving configuration to cookies 
      TipValue:1,                             //. Shows overflowed cell value under mouse as tip
      SaveFlags:"Changed,State,Quote,Parent", //. Adds Parent to the saved attributes
      DateFormatOut:"yyyy-MM-dd"              //. Date format for all saved dates
      },
   DefRows: {
      Data: {
         DragId:"Data", Accept:"", V: { A:'Item', G:0, H:0, I:'' }
         },
      Node: {
         CD:'Data', DragId:"Node", Accept:"Data", Collapsed:0, 
         V: { A:'Order', G:0, H:0 },
         F: { B:'F-F*G/100+(H-0)', D:'count()', F:'sum("B")' },
         A: { C: { NoEdit:0 }, D: { Format:'0 "items"' }, E: { Format:"", NoEdit:1 }, I: { NoEdit:0 } }
         },
      Fixed: { NoDelete:1, NoEdit:1, NoMove:1 }
      },
   DefCols: {
      Col: { UseMove:1 }
      },
   LeftCols: [
      { id:'P', D:"Panel", LeftIcons:"SelectRow,DeleteRow,AddRow" },
      { id:'id', Formula:"Row.id" },
      { id:'A', Width:350, Type:'String', VIndex:0 }
      ],
   Cols: [
      { id:'C', Width:100, Type:'String', NoEdit:1, VIndex:1 },
      { id:'I', Width:110, Type:'Date', Format:'d', NoEdit:1, VIndex:6, RightIcons:"Date" },
      { id:'D', Width:80, Type:'Number', VIndex:2 },
      { id:'E', Width:90, Type:'Number', Format:'0.00', VIndex:3 },
      { id:'F', Width:90, Type:'Number', Format:'0.00', Formula:'D*E', NoEdit:1 },
      { id:'G', Width:90, Type:'Number', Format:'0\\%;;', VIndex:4 },
      { id:'H', Width:90, Type:'Number', Format:'0.00;;', VIndex:5 }
      ],
   Cols_Cfg: { MinWidth:150 },
   RightCols: [
      { id:'B', Width:90, Type:'Number', Format:'0.00', Formula:'F-F*G/100+(H-0)', NoEdit:1 }
      ],
   Head: [
      { D:'Header', V: { A:"Product / Order name", B:"Price", C:"Customer", D:"Amount", E:"Unit price", F:"List Price", G:"Discount", H:"Shipping", I:"Date" } }
      ],
   Foot: [
      { id:'Fix1', D:"Fixed", V: { A:"Total income" }, F: { B:'sum(null,"Body")', D:'count(null,"Body")', F:"" }, A: { D: { Format:'0 "orders"', Type:'Number' }, G: { Type:'String' } } },
      { id:'Fix2', D:"Fixed", V: { A:"Taxes", G:22 }, F: { B:'Grid.Get("Fix1","B")*G/100', F:"" }, A: { C: { Type:"String" }, D: { Type:"String" }, G: { NoEdit:0 } } },
      { id:'Fix3', D:"Fixed", V: { A:"Profit" }, F: { B:'Grid.Get("Fix1","B")-Grid.Get("Fix2","B")', F:"" }, A: { C: { Type:"String" }, D: { Type:"String" }, G: { Type:"String" } } },
      ],
   Body: { Tree:"A", CD:"Node", Accept:"Node" },
   Dialogs: { Calendar: { Script: { FirstDate:"1/1/2000", LastDate:"12/31/2030" } } }, //! Minimal and maximal dates that can be shown or chosen in calendar
   Top: [ { id:"Data", Cells:"Settings,Save,Reload,Print,Pdf,Export,Copy,AddRowEnd,Undo,Redo" }, "Layout" ],
   Media: {
      Tablet: { DefCols: { Col: { UseMove:0 } }, LeftCols:[{ id:"P",UseMove:1 }] },
      Mobile: { RightCols:[ { id:"B", Width: 75} ] }
      }

   });

function onLoadError(G,source,code,message,index){
   return { IO:{ Message:"Sample node server is not running on localhost:8000<br>You need to install and start node package in <b>./server/</b>" } };
   }

let grid = null; //. Grid reference received for grid, access the grid object as grid
</script>

<h1>3. Tree table from SQL server</h1>
   <h5>Loading data in tree from and saving data to SQLite database table on Node server</h5>
   <ul>
      <li>
         Sample Node server must be running on <b>http://localhost:8000</b>. The sample Node server package is located at <b>./server/</b>.<br/>
         The sample data are loaded from <b><a href="http://localhost:8000/SQLTree.js?func=get" target="_blank">http://localhost:8000/SQLTree.js?func=get</a></b> 
         and saved to url <b>http://localhost:8000/SQLTree.js?func=set</b>.
         PDF is generated on url <b>http://localhost:8000/Pdf.js?func=getpdf</b>.<br/>
         The sample data on server are stored in <b>./server/sqlite.db</b> database file in table <b>TreeData</b>
         and the script loading and saving data is located at <b>./server/SQLTree.js</b>
      </li>
   </ul>
   <FastGrid
      src={[src,'http://localhost:8000/SQLTree.js?func=get', { Cfg:{ SaveUrl:'http://localhost:8000/SQLTree.js?func=set', PdfUrl:'http://localhost:8000/Pdf.js?func=getpdf' } }]}
      bind:this={grid} {onLoadError} style="height:100%; min-height:500px; width:100%"
      />
