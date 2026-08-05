<script>
import { FastGrid } from "fastgrid-svelte";
import "../Tutorial.css";

function onLoadError(G,source,code,message,index){
   return { IO:{ Message:"Sample node server is not running on localhost:8000<br>You need to install and start node package in <b>./server/</b>" } };
   }

let grid = null; //. Grid reference received for grid, access the grid object as grid
</script>

<h1>3. JSON sheets from file server</h1>
   <h5>Loading sheets JSON data from and saving data to file on Node server</h5>
   <ul>
      <li>
      Sample Node server must be running on <b>http://localhost:8000</b>. The sample Node server package is located at <b>./server/</b>.<br/>
      The sample data are loaded from <b><a href="http://localhost:8000/File.js?func=get&file=SheetsData.js" target="_blank">http://localhost:8000/File.js?func=get&file=SheetsData.js</a></b> and saved to url <b>http://localhost:8000/File.js?func=set&file=SheetsData.js</b>.
      PDF is generated on url <b>http://localhost:8000/Pdf.js?func=getpdf</b>.<br/>
      The sample data on server are stored in JSON file <b><a href="http://localhost:8000/File.js?func=get&file=SheetsData.js" target="_blank">./server/SheetsData.js</a></b> and the script loading and saving data is located at <b>./server/File.js</b>
      </li>
   </ul>
   <FastGrid
      src={[
         'http://localhost:8000/File.js?func=get&file=SheetsData.js',
         { Cfg:{ 
            Sheet:'*', 
            SaveUrl:'http://localhost:8000/File.js?func=set&file=SheetsData.js', SaveFormat:'json', 
            SaveFlags:'Cfg,DefCells,FCols,Cols,FBody,Body,VArray,AArray,Images,AddData,AddBom,LF', 
            PdfUrl:'http://localhost:8000/Pdf.js?func=getpdf' 
            } }
         ]}
      bind:this={grid} {onLoadError} style="height:100%; min-height:500px; width:100%"
      />
