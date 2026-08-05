<script>
import { FastGrid } from "fastgrid-svelte";
import "../Tutorial.css";

function onLoadError(G,source,code,message,index){
   return { IO:{ Message:"Sample node server is not running on localhost:8000<br>You need to install and start node package in <b>./server/</b>" } };
   }

let grid = null; //. Grid reference received for grid, access the grid object as grid
</script>

<h1>4. XLSX sheets from file server</h1>
   <h5>Loading sheets XLSX data from and saving data to file on Node server</h5>
   <ul>
      <li>
      Sample Node server must be running on <b>http://localhost:8000</b>. The sample Node server package is located at <b>./server/</b>.<br/>
      The sample data are loaded from <b><a href="http://localhost:8000/File.js?func=getbin&file=Excel.xlsx" target="_blank">http://localhost:8000/File.js?func=getbin&file=Excel.xlsx</a></b> and saved to url <b>http://localhost:8000/File.js?func=setbin&file=Excel.xlsx</b>.
      PDF is generated on url <b>http://localhost:8000/Pdf.js?func=getpdf</b>.<br/>
      The sample data on server are stored in XLSX file <b><a href="http://localhost:8000/File.js?func=getbin&file=Excel.xlsx" target="_blank">./server/Excel.xlsx</a></b> and the script loading and saving data is located at <b>./server/File.js</b>
      </li>
   </ul>
   <FastGrid
      src={[
         'http://localhost:8000/File.js?func=getbin&file=Excel.xlsx',
         { Cfg:{ 
            Sheet:'*', 
            SaveUrl:'http://localhost:8000/File.js?func=setbin&file=Excel.xlsx', 
            PdfUrl:'http://localhost:8000/Pdf.js?func=getpdf' 
            } }
         ]}
      bind:this={grid} {onLoadError} style="height:100%; min-height:500px; width:100%"
      />
