import { Component, ViewChild } from "@angular/core";
import { FastGridComponent } from "fastgrid-angular";

const onLoadError : TFGrid["OnLoadError"] = (G,source,code,message,index) => {
   return { IO:{ Message:"Sample node server is not running on localhost:8000<br>You need to install and start node package in <b>./server/</b>" } };
   }

@Component({
   selector:"app-example-server-file-03-file-sheets",
   standalone:true,
   imports:[ FastGridComponent ],
   templateUrl:"./03-file-sheets.component.html",
   host:{ class:"Tutorial" }
   })
export class ServerFile_03FileSheetsComponent {
   readonly onLoadError = onLoadError as TFGrid["OnLoadError"];

   @ViewChild("gridRef") gridRef!:FastGridComponent;
   }
