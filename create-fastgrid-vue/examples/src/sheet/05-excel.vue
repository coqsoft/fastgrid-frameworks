<script setup>
import { ref } from "vue";
import { FastGrid } from "fastgrid-vue";
import "../Tutorial.css";

const src = ({ //. All layout and data for grid

   Cfg: {
      AutoCookie:1+2+16, ResizingTag:3, Style:"White",
      PdfUrl: "http://localhost:8000/Pdf.js?func=getpdf", //. PDF export is run on separate node server located in ./server/
      },
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
   });

const gridRef = ref(null); //. Grid reference received for grid, access the grid object as gridRef.value
</script>

<template>
   <h1>5. Excel example</h1>
   <h5>
      Spread sheet example opening xlsx file.<br/>
      Spread sheet configuration is in source vue file at <b>./src/sheet/05-excel.vue</b>, 
      XLSX file is at <b>./public/05-excel/Excel.xlsx</b>
   </h5>
   <p style="width:fit-content;max-width:100%;margin:0px auto 12px">
      <b>Drop or paste any .xlsx or .csv file to the grid to open and edit it here! Or open any .xlsx or .csv file from your disk by click to 
         <svg @click="gridRef?.ActionImport()" viewBox="0 0 17 17"><path stroke-width="1.25" d="m2.5,16h9q2,0,3.3,-2l1.4,-2q1.3,-2,-0.7,-2h-9q-2,0,-3.3,2l-1.4,2q-1.3,2,0.7,2q-2,0,-2,-2v-8q0,-2,2,-2h2q2,0,2,2v1h5q2,0,2,2v1" /><path fill="#7A8899" d="m9,9q0,-6,5,-5.5v2l2.5,-2.5l-2.5,-2.5v2q-6,0,-5,6.5"/></svg>
      icon on toolbar. </b><br>
      <i>The xlsx files can be opened, edited and saved (by
      <svg @click="gridRef?.ActionExport()" viewBox="0 0 17 17"><path fill-rule="evenodd" stroke="none" fill="#7A8899" d="m0.5,0.5v16h16v-12l-4,-4zm1.5,1.5v13h1.25v-5h10.5v5h1.25v-10l-3,-3h-0.75v5h-8v-5zm5,0v4h3v-4zm-2.5,9.2v4h8v-4" /></svg>
      or
      <svg @click="gridRef?.ShowDialog(null,null,'Export')" viewBox="0 0 17 17"><path d="m10,0.5h-7.5v16h12v-12zv4h4m-8,3l4,6h1l-4,-6zm4,0l-4,6h1l4,-6z" /></svg>
      icon) directly in browser, without any communication with server!</i><br>
   </p>
   <FastGrid :src='[src,"/05-excel/Excel.xlsx"]' ref="gridRef" style="height:100%; min-height:500px; width:100%" />
</template>
