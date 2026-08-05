<script setup>
import { FastGrid } from "fastgrid-vue";
import "../Tutorial.css";


   const src = { //. All layout and data for grid.
      Cfg: { SheetJs:1, Sheet:'*', Book:'AI_Sheet' },
      Cfg_AI: {
         AIModel:"Luna Average", //. Actual model configuration from AI.Models that will be used for communication
         AIAccept:3,              //. If shows accept button to send the input to AI and sends prompt also by Enter.
         AIClearResponseId:1,     //. Clears ResponseId after every reload
         AIPermissions:0,         //. AI permissions in changing grid: 0 - full, 1 - controls, 2 - read only
         AIOutputFunction:5,      //. If prints API function calls, 0 - nothing, 1 - call content, 2 - return content, 3 - call and return content, 4 - only static text, 5 - only static text during communication
         AIOutputPrice:3,         //. If prints prompt prices (&1) and tokens (&2)
         AIDisableGrid:0,         //. How the grid behaves during communication with AI: 0 - locked, 1 - disabled with message, 2 - disabled with one progress bar, 3 - disabled with more progress bars
         AIOutputSelect:1,        //. If the response is editable to select and copy text
         AIWebSearch:1,           //. If AI is permitted to search information on Internet
         AIImageGeneration:1,     //. If AI is permitted to generate images.
         AIImageQuality:-1,       //. Quality of generated image, 0 - auto, 1 - low, 2 - medium, 3 - hight, -1 always low, -2 always medium, -3 always high
         AIMenu:"Model,Permissions,WebSearch,ImageGeneration,ImageQuality,-,Accept,DisableGrid,OutputSelect,OutputHeight,OutputFunction,OutputPrice,OutputTokens,-,Credit,-,CopyResponse,ClearResponse,ClearHistory",
         },
      AI: {
         //. Trial setting for OpenAI, it is limited in usage and should be used only for demonstration, not for development. Replace the URLs with your own AI API bridge or use the direct access set in the next commented lines
         Url: "https://www.treegrid.net/AI", UrlDownload: "https://www.treegrid.net/AIGet", 

         //. Direct access for your API usage to instead of treegrid.net, use for testing and development
         //Url: "https://api.openai.com/v1/responses", UrlDownload:"", Header: { Authorization: "Bearer sk-proj-....",  },    

         InputHistory: "|-|Make this sheet presentation-ready|Hide all celsius temperatures higher than 20|Create sheet with monthly average day and night temperatures in C and F\n      in New York Central Park in year 2021" //. Predefined items in AI prompts history
         },
      Bottom:["AI"] //. Moves the AI toolbar from top to bottom. The AI toolbar is displayed on sheet by default, to hide it at all, set e.g. Bottom:[{id:"AI",Hidden:1}]
   };

   const sheet1 =  //. All layout and data for grid.
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

   const sheet2 =  //. All layout and data for grid.
`2022,Avg Day (°C),Avg Night (°C),Avg Day (°F),Avg Night (°F)
January,2.2,-6.1,36.0,21.0
February,6.6,-3.5,43.9,25.7
March,11.0,1.0,51.8,33.9
April,14.7,5.3,58.5,41.5
May,21.7,12.2,71.0,53.9
June,26.5,16.6,79.6,61.8
July,31.3,21.1,88.3,70.0
August,30.4,21.0,86.8,69.8
September,24.6,16.0,76.3,60.7
October,17.2,9.2,63.0,48.5
November,13.1,5.4,55.7,41.8
December,6.2,-1.6,43.1,29.2`;

</script>

<template>

      <h1>2. Sheets with AI</h1>
      <h5>Basic workbook with two sheets in CSV and with AI</h5>
      <section>
         <FastGrid :src="[src,{ Sheet:'Csv 1' },{ Format:'csv', Data:sheet1 },{ Sheet:'Csv 2' },{ Format:'csv', Data:sheet2 }]" style="height:600px; width:100%;"/>
      </section>
      
</template>
