import { Component, ViewChild } from "@angular/core";
import { FastGridComponent } from "fastgrid-angular";

const onLoadError : TFGrid["OnLoadError"] = (G,source,code,message,index) => {
   return { IO:{ Message:"Sample node server is not running on localhost:8000<br>You need to install and start node package in <b>./server/</b>" } };
   }

@Component({
   selector:"app-example-server-file-04-file-xlsx",
   standalone:true,
   imports:[ FastGridComponent ],
   templateUrl:"./04-file-xlsx.component.html",
   host:{ class:"Tutorial" }
   })
export class ServerFile_04FileXlsxComponent {
   readonly onLoadError = onLoadError as TFGrid["OnLoadError"];

   @ViewChild("gridRef") gridRef!:FastGridComponent;
   }
