// @ts-nocheck
import { Component, ViewChild } from "@angular/core";
import { FastGridComponent } from "fastgrid-angular";

const src = ({ //. All layout and data for grid

   Cfg: {
      AutoCookie:1+2+16, ResizingTag:3, SheetJs:1, Sheet:'*', Book:'Book', Style:'Beige',
      PdfUrl: "http://localhost:8000/Pdf.js?func=getpdf", //. PDF export is run on separate node server located in ./server/
      },
   AI: {
      InputHistory: "|-"
                  + "|Make this sheet presentation-ready"
                  + "|Do executive polish pass and print-ready formatting in the sheet"
                  + "|-"
                  + "|Create sheet with monthly average day and night temperatures in C and F in New York Central Park in year 2023"
                  + "|Create sheet with matrix of approximate driving distances in km between all EU capitals, sort by capital"
                  + "|Create sheet with 50 most valuable automotive companies in 2025 with name, country, value in M USD, profit in M USD, sort by value"
                  + "|Create sheet with matrix of today exchange rates for all convertible currencies and highlight USD, EUR, GBP, CHF, CNY, INR, JPY, KRW"
                  + "|Create sheet with 150 most populated countries with their population in 2023 and fertility rates per year in years 2023 to 2000,\n     sort by the 2023 fertility rate column ascending; round fertility to 2 decimals, caption fertility as year only;\n     freeze and bold captions and country names"
                  + "|-"
                  + "|Insert image of Titanic to cell D13, 300 x 200 px"
                  + "|Insert emoticon smile to cell B2"
                  + "|Insert linked-in icon to cell D12, exactly on the cell right edge"
                  + "|Generate drawing of girl with flower and set it to D9:E23"
                  + "|Generate photo of mountains with river and insert it as background image for the whole current sheet\n      and convert all cell background colors to 60% transparency"
      }
   });

@Component({
   selector:"app-example-sheet-08-empty",
   standalone:true,
   imports:[ FastGridComponent ],
   templateUrl:"./08-empty.component.html",
   host:{ class:"Tutorial" }
   })
export class Sheet_08EmptyComponent {
   readonly src = src;

   @ViewChild("gridRef") gridRef!:FastGridComponent;
   }
