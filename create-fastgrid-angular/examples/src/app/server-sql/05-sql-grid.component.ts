import { Component, ViewChild } from "@angular/core";
import { FastGridComponent, FastGridOutputEvent } from "fastgrid-angular";

const onLoadError : TFGrid["OnLoadError"] = (G,source,code,message,index) => {
   return source.indexOf("getdef")>=0 ? { IO:{ Message:"Sample node server is not running on localhost:8000<br>You need to install and start node package in <b>./server/</b>" } } : {};
   }

@Component({
   selector:"app-example-server-sql-05-sql-grid",
   standalone:true,
   imports:[ FastGridComponent ],
   templateUrl:"./05-sql-grid.component.html",
   host:{ class:"Tutorial" }
   })
export class ServerSql_05SqlGridComponent {
   readonly onLoadError = onLoadError as TFGrid["OnLoadError"];

   @ViewChild("gridRef") gridRef!:FastGridComponent;
   }
