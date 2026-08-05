<script>
import { FastGrid } from "fastgrid-svelte";
import "../Tutorial.css";


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
</script>

<h1>1. Grid with AI</h1>
      <h5>Basic grid with integrated AI</h5>
      <section>
         <FastGrid src={src} style="display:inline-block; max-width:100%;"/>
      </section>

      
      <ul>
         <li> 
            <h4>Set up AI</h4>
            <ul>
               <li>Now implemented communication and API for <b>OpenAI</b> <b>ChatGPT</b>.</li>
               <li>There are two ways to use OpenAI with FastGrid: <b>purchase AI credit from COQsoft</b> or <b>purchase API key from OpenAI</b></li>
               <li>
                  <h4>Purchase AI credit from COQsoft</h4>
                  <ul>
                     <li>Purchase AI credit in our e-shop at <a href="https://www.treegrid.com/Purchase?ai=100">https://www.treegrid.com/Purchase?ai=100</a></li>
                     <li>Pass the purchased AI credit to FastGrid in <b>AI</b> tag <dfn><a target="FGDoc" href="https://www.treegrid.com/FDoc/AI.htm#AICredit">Credit</a></dfn> or enter it directly to FastGrid in <b>AI settings</b> menu.<br /></li>
                  </ul>
               </li>
               <li>
                  <h4>Create OpenAI API key</h4>
                  <ul>
                     <li>Create your own <b>API</b> account on OpenAI (<a href="https://platform.openai.com/docs/quickstart">https://platform.openai.com/docs/quickstart</a>).</li>
                     <li>Create your <b>API key</b> and set it to FastGrid AI communication settings.</li>
                     <li>
                        For <h4>development</h4> you can set it directly to OpenAI Responses API as 
                        <dfn>AI: &#x7B; <a target="FGDoc" href="https://www.treegrid.com/FDoc/AI.htm#AIUrl">Url</a>: "https://api.openai.com/v1/responses", <a target="FGDoc" href="https://www.treegrid.com/FDoc/AI.htm#AIHeader">Header</a>: &#x7B; Authorization: "Bearer ..." &#x7D; &#x7D;</dfn>.
                     </li>
                     <li>
                        For <h4>production</h4> you should create your server side url to use as a bridge between FastGrid and OpenAI, use the API key in your server code, and pass its url to <dfn>AI: &#x7B; <a target="FGDoc" href="https://www.treegrid.com/FDoc/AI.htm#AIUrl">Url</a>:"..." &#x7D;</dfn>. 
                        To not reveal your secret API key to your visitors.
                     </li>
                  </ul>
               </li>
            </ul>
         </li>
         <li> <h4>Set up grid for AI</h4>
            <ul>
               <li>
                  Add <b>AI toolbar</b> to the grid, usually to grid Bottom by <dfn>Bottom:["AI"]</dfn>.<br />
                  In <b>Sheet</b> the AI toolbar is shown (on top) by default, <i>if you want to <b>not</b> use AI</i>, hide it by <b>Bottom:[&#x7B;id:"AI",Hidden:1&#x7D;]</b>.
               </li>
               <li>
                  Next you should precisely describe your grid to AI, its structure, data, sense and behavior, in <dfn>AI: &#x7B; <a target="FGDoc" href="https://www.treegrid.com/FDoc/AI.htm#AIStaticInstructions">StaticInstructions</a>:"..." &#x7D;</dfn> 
                  or dynamically in API event <a target="FGDoc" href="https://www.treegrid.com/FDoc/AI.htm#OnAIGetStaticInstructions">OnAIGetStaticInstructions</a>.<br />
                  For start and base testing you can use built-in instructions and set only grid <a target="FGDoc" href="https://www.treegrid.com/FDoc/AI.htm#AIDescription">Description</a>.
               </li>
               <li>
                  Next you should precisely describe your grid actual state and settings to AI in <dfn>AI: &#x7B; <a target="FGDoc" href="https://www.treegrid.com/FDoc/AI.htm#AIDynamicInstructions">DynamicInstructions</a>:"..." &#x7D;</dfn> 
                  or dynamically in API event <a target="FGDoc" href="https://www.treegrid.com/FDoc/AI.htm#OnAIGetDynamicInstructions">OnAIGetDynamicInstructions</a>.<br />
                  For start and base testing you can use built-in instructions.
               </li>
               <li>If AI is permitted to <b>search Internet</b> by <a target="FGDoc" href="https://www.treegrid.com/FDoc/AI.htm#CfgAIWebSearch">WebSearch</a>, set or clear the AI <a target="FGDoc" href="https://www.treegrid.com/FDoc/AI.htm#AIUrlDownload">UrlDownload</a> as URL for downloading files without CORS.</li>
            </ul>
         </li>
         <li> <h4>More AI settings</h4>
            <ul>
               <li>By default is used <b>gpt-nano</b> model. To use different model or its version, set it by <b>Cfg</b> <dfn><a target="FGDoc" href="https://www.treegrid.com/FDoc/AI.htm#CfgAIModel">AIModel</a></dfn> and optionally add and define it in <b>AI</b> <dfn><a target="FGDoc" href="https://www.treegrid.com/FDoc/AI.htm#AIModels">Models</a></dfn>.</li>
               <li>
                  By default the prompt input is sent to AI by clicking to <b>Accept</b> button next to the prompt or by pressing <b>Enter</b> during the prompt editing.<br />
                  To send the prompt input on any end editing (e.g. click outside) or not by pressing single enter, set appropriate value to <b>Cfg</b> attribute <dfn><a target="FGDoc" href="https://www.treegrid.com/FDoc/AI.htm#CfgAIAccept">AIAccept</a></dfn>.<br />
               </li>
               <li>
                  By default the AI can search Internet and download text files from web sources to fulfill the requests. 
                  To restrict it, set <b>Cfg</b> attribute <dfn><a target="FGDoc" href="https://www.treegrid.com/FDoc/AI.htm#CfgAIWebSearch">AIWebSearch</a></dfn> = 0.<br />
                  To limit the downloaded file size and downloading time set <b>AI</b> attributes <a target="FGDoc" href="https://www.treegrid.com/FDoc/AI.htm#AIMaxDownloadSize">MaxDownloadSize</a> and <a target="FGDoc" href="https://www.treegrid.com/FDoc/AI.htm#AIMaxDownloadSize">MaxDownloadTime</a>.<br />
               </li>
               <li>
                  The AI can have full control on the grid or can change only its view or can only read the grid data. It can be chosen by <b>Cfg</b> attribute <dfn><a target="FGDoc" href="https://www.treegrid.com/FDoc/AI.htm#CfgAIPermissions">AIPermissions</a></dfn> 
                  and the individual permission levels can be set up by locks in <a target="FGDoc" href="https://www.treegrid.com/FDoc/AI.htm#AILockAI0">AILockAI0</a>, <a target="FGDoc" href="https://www.treegrid.com/FDoc/AI.htm#AILockAI1">AILockAI1</a>, ...
               </li>
               <li>
                  During AI communication the grid can be disabled and show progress message or just locked and be still accessible. Control it by <b>Cfg</b> attribute <dfn><a target="FGDoc" href="https://www.treegrid.com/FDoc/AI.htm#CfgAIDisableGrid">AIDisableGrid</a></dfn>.<br />
               </li>
               <li>For debug purposes is possible to display the grid tool calls done by AI by setting <b>Cfg</b> attribute <dfn><a target="FGDoc" href="https://www.treegrid.com/FDoc/AI.htm#CfgAIOutputFunction">AIOutputFunction</a></dfn></li>
               <li>These settings can be also controlled by users via <b>AI settings menu</b>, the items in this menu can be chosen by <b>Cfg</b> attribute <dfn><a target="FGDoc" href="https://www.treegrid.com/FDoc/AI.htm#CfgAIMenu">AIMenu</a></dfn></li>
            </ul>
         </li>
      </ul>
