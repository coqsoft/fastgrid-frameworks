// @ts-nocheck
import { Component, ViewChild } from "@angular/core";
import { FastGridComponent } from "fastgrid-angular";

const src = ({ //. All layout and data for grid

   Cfg: {
      AutoCookie:1+2+16, ResizingTag:3, Style:"White",
      LanguageFiles:["/FGridText.js",'/05-excel/ExcelLang.js'], //. Language texts, FastGrid default and example specific texts
      PdfUrl: "http://localhost:8000/Pdf.js?func=getpdf", //. PDF export is run on separate node server located in ./server/
      },
   DefToolbars: {
      Styles: { Cells:"Styles,Icons,CellBorders,TextSizes,RowHeights,IconZooms,Zooms,Languages" },
      },
   Languages: {
      Base: {
         AI: {
            InputHistory: "|-|What is in the current sheet?"
                        + "|What can you do?"
                        + "|Sort sheets by names"
                        + "|Rename sheet Audit Data to Old Data"
                        + "|Copy complete cells A4:I17 to new sheet Copy"
                        + "|Move cells A9:K15 to C30"
                        + "|Focus and color yellow D9:F15"
                        + "|Clear the focused cells"
                        + "|Clear background and text colors in the sheet"
                        + "|Make all cell backgrounds 50% transparent"
                        + "|Mark all times higher than 1 hour by yellow background in sheet Audit Summary and show it"
                        + "|Duplicate the sheet to Duplicated"
                        + "|Delete all sheets"
                        + "|Undo it"
                        + "|-"
                        + "|Sort and show sheet Rows by Text and ignore case, diacritics and spaces"
                        + "|Sort and show sheet Rows by Icon descending and Float"
                        + "|Sort and show sheet Rows by Simple by the word meaning numbers"
                        + "|Sort and show sheet Columns by row Date"
                        + "|Group and show sheet Rows by Bool and Simple with summaries above"
                        + "|Group and show sheet Rows by Text without summaries and ignore case, diacritics and spaces"
                        + "|Group and show sheet Columns by row Bool with summaries on the right"
                        + "|Filter rows to show only 'nine' and 'eight' in column Text in sheet Rows and show it, ignore case, diacritics and spaces"
                        + "|Filter rows to show only checked character in column Bool or 'green' icon in column Icon in sheet Rows and show it"
                        + "|Filter columns to show only dates before 20th January in row Date in sheet Columns and show it"
                        + "|-"
                        + "|Make this sheet presentation-ready"
                        + "|Do executive polish pass in the sheet"
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
                        + "|Create Message icon in similar style like icon in D10 in Html+Images and insert it to M1 in current sheet"
                        + "|Generate drawing of girl with flower and set it to D9:E23"
                        + "|Generate photo of mountains with river and insert it as background image for the whole current sheet\n      and convert all cell background colors to 60% transparency"
            }
         }
      }
   });

@Component({
   selector:"app-example-sheet-05-excel",
   standalone:true,
   imports:[ FastGridComponent ],
   templateUrl:"./05-excel.component.html",
   host:{ class:"Tutorial" }
   })
export class Sheet_05ExcelComponent {
   readonly src = src;

   @ViewChild("gridRef") gridRef!:FastGridComponent;
   }
