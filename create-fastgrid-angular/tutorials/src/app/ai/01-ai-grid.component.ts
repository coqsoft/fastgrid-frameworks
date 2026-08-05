import { Component } from "@angular/core";
import { FastGridComponent } from "fastgrid-angular";

const src = { //. All layout and data for grid.
      Cfg : { id: "AI_Grid" }, 
      AI: { 
         //. Trial setting for OpenAI, it is limited in usage and should be used only for demonstration, not for development. Replace the URLs with your own AI API bridge or use the direct access set in the next commented lines
         Url: "https://www.treegrid.net/AI", UrlDownload: "https://www.treegrid.net/AIGet", 

         //. Direct access for your API usage to instead of treegrid.com, use for testing and development
         //Url: "https://api.openai.com/v1/responses", UrlDownload:"", Header: { Authorization: "Bearer sk-proj-....",  },    

         Description:"Basic FastGrid tutorial to use AI, simple grid with temperatures in New York Central Park in 2023, the page with the grid and its description is at https://www.treegrid.com/FTutorials/AI/01-AI_Grid.html ",

         InputHistory: "|-|Fill the grid with monthly average day and night temperatures in C and F\n      in New York Central Park in year 2021|Mark all celsius temperatures higher than 20 in red" //. Predefined items in AI prompts history
         },

      //. --- Columns ---
      LeftCols : [ 
         { id:"Month", D:"Header" },
         ], 
      Cols : [ 
         { id:"DayC" }, 
         { id:"NightC" }, 
         { id:"DayF" }, 
         { id:"NightF" }
         ], 

      //. --- Rows ---
      Head: [ 
         { D:"Header", V:{ Month:"Month", DayC:"Avg Day (°C)", NightC:"Avg Night (°C)", DayF:"Avg Day (°F)", NightF:"Avg Night (°C)" } },
         ], 
      Body: [ 
         { V: ["January",9.29,3.47,48.72,38.25]},
         { V: ["February",9.21,0.94,48.58,33.69]},
         { V: ["March",10.83,3.22,51.49,37.8]},
         { V: ["April",19.03,9.43,66.25,48.97]},
         { V: ["May",22.1,11.99,71.78,53.58]},
         { V: ["June",25.42,16.82,77.76,62.28]},
         { V: ["July",30.2,22.08,86.36,71.74]},
         { V: ["August",27.62,20.17,81.72,68.31]},
         { V: ["September",24.28,17.28,75.7,63.1]},
         { V: ["October",19.29,12.38,66.72,54.28]},
         { V: ["November",11.83,4.48,53.29,40.06]},
         { V: ["December",9.83,4.2,49.69,39.56]}
         ], 

      //. --- Toolbars ---
      Top: ["AI"], //. Shows AI toolbar on top
      Bottom: ["Data1","Settings"]
   };

@Component({
   selector:"app-tutorial-ai-01-ai-grid",
   standalone:true,
   imports:[ FastGridComponent ],
   templateUrl:"./01-ai-grid.component.html",
   host:{ class:"Tutorial" }
   })
export class Ai_01AiGridComponent {
   readonly src = src;
   }
