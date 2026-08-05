FGrid.Data = { 
Cfg: { SheetJs:1, Sheet:'*', Book:'AI_Sheet', MaximizeHeight:1 },
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
}