import React, { useMemo, useRef } from "react";
import { FastGrid } from "fastgrid-react";
import "../Tutorial.css";

export default function App() {
   const src = useMemo(() => ({ //. All layout and data for grid. Memo is used for simple object created inside the App function to avoid re-creating grid on every React App render
      Cfg: { id:'CsvGrid', CsvHeaderRows:1, CsvHeaderCols:1 },
      Bottom: ["Data1"]
   }), []);

   const csv = useMemo(() => ( //. All layout and data for grid. Memo is used for simple object created inside the App function to avoid re-creating grid on every React App render
      `2023,Avg Day (°C),Avg Night (°C),Avg Day (°F),Avg Night (°F)
January,9.29,3.47,48.72,38.25
February,9.21,0.94,48.58,33.69
March,10.83,3.22,51.49,37.8
April,19.03,9.43,66.25,48.97
May,22.1,11.99,71.78,53.58
June,25.42,16.82,77.76,62.28
July,30.2,22.08,86.36,71.74
August,27.62,20.17,81.72,68.31
September,24.28,17.28,75.7,63.1
October,19.29,12.38,66.72,54.28
November,11.83,4.48,53.29,40.06
December,9.83,4.2,49.69,39.56`
   ), []);

   return (<>
      <h1>8. CSV grid</h1>
      <h5>Basic grid loaded from CSV data</h5>
      <section>
         <FastGrid src={[src,{Format:"csv",Data:csv}]} style={{display:"inline-block", maxWidth:"100%"}}/>
      </section>

      {/*. Description */}
      <ul>
         <li>
            <h4>Loading CSV</h4><br />
            <ul>
               <li>CSV data or its url can be directly passed to FastGrid like JSON, like <dfn>&lt;FastGrid src="08-Csv_grid.csv"/&gt;</dfn></li>
               <li>If the CSV file url has not extension <b>csv</b>, set also Format="csv" like <dfn>&lt;FastGrid  src=&#x7B;Format:'csv',Url:'08-Csv_grid.csv'&#x7D;/&gt;</dfn></li>
               <li>If passing CSV directly in string, set also Format="csv" like <dfn>&lt;FastGrid src=&#x7B;Format:'csv',Data:'...'&#x7D;/&gt;</dfn></li>
            </ul>
         </li>
         <li> <h4>CSV separators</h4>
            <ul>
               <li>By default the input CSV has separated columns by comma, the rows by CR or LF or CRLF and quoted valued by double quote.</li>
               <li>To specify different separators, set <b>Cfg</b> attributes <dfn>CsvRowSeparator</dfn>, <dfn>CsvValueSeparator</dfn> and <dfn>CsvQuote</dfn></li>
               <li>For example <dfn>&lt;FastGrid src=[&#x7B;Cfg:&#x7B;CsvValueSeparator:';'&#x7D;&#x7D;,&#x7B;Format:'csv',Data:'a;b;c\nd;e;f'&#x7D;]/&gt;</dfn></li>
            </ul>
         </li>
         <li>
            <h4>CSV layout</h4>
            <ul>
               <li>The data rows are always created from CSV and added to default row part or to part specified by <b>Cfg</b> <dfn>CsvRows</dfn>.</li>
               <li>By default the columns are created from CSV in default column part. It is possible to define the columns in JSON layout and set <b>Cfg</b> <dfn>CsvCols</dfn> to empty string to not create them from CSV.</li>
               <li>It is possible to define Header rows in JSON layout or create them from first lines in CSV by <b>Cfg</b> attribute <dfn>CsvHeaderRows</dfn>.</li>
               <li>It is possible to define Header columns in JSON layout or create them from first columns in CSV by <b>Cfg</b> attribute <dfn>CsvHeaderCols</dfn>.</li>
            </ul>
         </li>
      </ul>
   </>);
}