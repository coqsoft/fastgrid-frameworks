import { Component } from "@angular/core";
import { FastGridComponent } from "fastgrid-angular";

const src = { //. All layout and data for grid.
      Cfg: { id:'CsvGrid', CsvHeaderRows:1, CsvHeaderCols:1 },
      Bottom: ["Data1"]
   };

   const csv =  //. All layout and data for grid.
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
December,9.83,4.2,49.69,39.56`;

@Component({
   selector:"app-tutorial-basic-08-csv-grid",
   standalone:true,
   imports:[ FastGridComponent ],
   templateUrl:"./08-csv-grid.component.html",
   host:{ class:"Tutorial" }
   })
export class Basic_08CsvGridComponent {
   readonly src = src;
   readonly csv = csv;
   }
