// @ts-nocheck
import { Component, ViewChild } from "@angular/core";
import { FastGridComponent } from "fastgrid-angular";

const src = ({ //. All layout and data for grid

   Cfg: { 
      AutoCookie:1+2+16, ResizingTag:3, Style:'Blue',
      PdfUrl: "http://localhost:8000/Pdf.js?func=getpdf", //. PDF export is run on separate node server located in ./server/
      },
   Top:[ "AI", "Search", "Data1", "Data2", "Data4", "Data3", "Text1", "Text4", "Layout", "Text2", "Text3", "Styles", "Edit" ],
   AI: {
      InputHistory: "|-|What is in the current sheet?"
                  + "|What can you do?"
                  + "|Rename sheet Data to Old Data"
                  + "|Copy complete cells B2:J999999 to new sheet Copy A1"
                  + "|Move cells B8:K17 to B19"
                  + "|Focus and color yellow B8:J17"
                  + "|Clear the focused cells"
                  + "|Clear background and text colors in the sheet"
                  + "|Mark all prices higher than 500 by yellow background"
                  + "|Duplicate the sheet to Duplicated"
                  + "|Delete all sheets"
                  + "|Undo it"
                  + "|-"
                  + "|Sort and show sheet Data by Total descending"
                  + "|Sort and show sheet Pivot by March 2015"
                  + "|Sort and show sheet Pivot columns by years and months descending"
                  + "|Filter rows to show only Rabat higher than 10% in sheet Data and show it, show all parent rows with visible child rows"
                  + "|Filter columns to show only March and April in sheet Pivot and show it, show all parent columns with visible child columns"
                  + "|-"
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
   selector:"app-example-sheet-06-excel-100k",
   standalone:true,
   imports:[ FastGridComponent ],
   templateUrl:"./06-excel-100k.component.html",
   host:{ class:"Tutorial" }
   })
export class Sheet_06Excel100kComponent {
   readonly src = src;

   @ViewChild("gridRef") gridRef!:FastGridComponent;
   }
