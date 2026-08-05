<script>
import { onMount, onDestroy } from "svelte";
import { FastGrid } from "fastgrid-svelte";
import "../Tutorial.css";

const src = ({ //. All layout and data for grid

   //. --- Custom JavaScript functions and properties accessible by API by Grid.Script.XXX ---
   Script: {

      //. --- Calculates all and verified summary in Total (row==null) and Group (row set) rows ---
      monthtotal: function(G,row){
         var sum = 0, sumver = 0, amount = G.Cols.Amount, price = G.Cols.Price, ver = G.Cols.Verified, D = G.DefRows.Row, L = row ? row.L : -10;
         if(!row&&G.All!=null){ //. Precalculated results in data for Total rows
            sum = G.All; sumver = G.Ver; G.All = null; G.Ver = null;
            }
         else G.IterSimple(row||G.GetFirst("Body"),function(r){ 
            if(r.L<=L) return true; 
            if(r.D==D&&~r.O&4) { var v = G.GetValueSimple(r,amount) * G.GetValueSimple(r,price); if(v){ sum += v; if(G.GetValueSimple(r,ver)>0) sumver += v; } }
            },!row);
         return "all: <span style=\"font-weight:700\">"+G.NumberToString(sum,",0.##")+"</span>; verified: <span style=\"font-weight:700\">"+G.NumberToString(sumver,",0.##")+"</span>";
         },

      //. --- Returns list of parent groups ---
      getgroups: function(G,row,col){
         var par = G.GetParent(row), tree = G.GetTreeCol(row); if(!par) return "";
         if(par.D.id!="GroupName"&&par.D.id!="GroupName2") {
            var pv = G.GetValue(par,col)||"", v = par.D.id=="GroupRegion"||par.D.id=="GroupRegion2" ? "["+(["SAs","EAs","EEu","NAf","NAm","SAm","SAf","WEu"][G.GetValue(par,tree)]||"???")+"]" : G.GetString(par,tree)||"";
            return pv + (pv&&v ? ", " : "") + v;
            }
         var pp = G.GetParent(par);
         if(!pp) return G.GetString(par,tree);
         var ppv = G.GetValue(pp,col)||"", pv = G.GetString(pp,tree)||"", v = G.GetString(par,tree)||"";
         return ppv + (ppv&&pv ? ", " : "") + pv + ((pv||ppv)&&v ? ", " : "") + "<span style=\"font-weight:700\">"+v+"</span>";
         }
      },

   //. --- API events assigned to this grid ---
   Events: {

      //. --- Recalculates Count of rows information bottom the grid on row collapse / expand
      OnCollapse: function(G,row){
         G.SetResult(G.Rows.Total,G.Cols.Region); G.Repaint(G.Rows.Total,1);
         },

      //. --- Returns row name in messages ---
      OnGetName: function(G,row,name){
         if(G.IsRow(row)&&!row.D.Group) return G.GetString(row,G.Cols.FullName)+" ("+G.GetString(row,G.Cols.Day) + ". " + G.GetString(row,G.Cols.Month)+" "+G.GetString(row,G.Cols.Year)+")";
         },

      //. --- Returns default group id for particular group rows ---
      OnGetGroupD: function(G,col,group,first){
         var D = { FullName:"GroupName", Location:"GroupLocation", Date:"GroupDate", Region:"GroupRegion" }[col]||"Group";
         if(G.Parts.Body.Tree=="Month") D = G.MergeD(["GroupInMonth",D],null,D+"2"); //. Splits spanned Year + Month
         return D;
         },

      //. --- Formats Location and Date support columns for display shown in grouped tree column ---
      OnGetString: function(G,row,col,val,raw,src,O){
         if((row.D.id=="GroupLocation"||row.D.id=="GroupLocation2") && col==G.GetTreeCol(row) && raw && !src){
            var R = raw.slice(0,1)-0, C = raw.slice(2,4)-10, S = raw.slice(5);
            var L = G.GetAttr(row,G.Cols.Country,"List");
            var s = "["+(["SAs","EAs","EEu","NAf","NAm","SAm","SAf","WEu"][R]||"???")+"] " + (G.Split(L[R],1)[C]||"");
            if(S!==""){
               var L = G.GetAttr(row,G.Cols.State,"List");
               s += ", "+(G.Split(L[R][C],1)[S-10]||"");
               }
            return s;
            }
         if((row.D.id=="GroupDate"||row.D.id=="GroupDate2") && col==G.GetTreeCol(row) && raw && !src){
            var Y = raw.slice(0,4), M = raw.slice(5,7)-1;
            var L = G.GetAttr(row,G.Cols.Month,"List");
            return (G.Split(L,1)[M]||"")+" "+(Y||"");
            }
         },

      //. --- Called after language was changed, updates the number formats in calculated results ---
      OnSetLanguage: function(G,lang,old,init){ 
         if(!init) G.Recalculate(); 
         },

      //. --- Called on every scroll ---
      //. --- Used on Body scroll to display previous Group data in the top Sticky row, like "sticky" position ---
      OnScroll: function(G,rowpart,y,oy,colpart,x,ox){
         if(y!=oy){
            var tree = G.GetPartAttr("Body","Tree"); if(!tree) return;
            var s1 = G.GetStatic(G.Rows.Sticky,G.Cols[tree]), s2 = G.GetStatic(G.Rows.Sticky,G.Cols.Region); if(!s1&&!s2) return;
            var r = G.ReversedTree&1 ? G.GetLastView("Body") : G.GetFirstView("Body");
            if(!r){ if(s1) s1.innerHTML = ""; if(s2) s2.innerHTML = ""; return; }
            while(r.D.Group) r = G.GetFirstChild(r);
            var p = G.GetParent(r); if(!p){ if(s1) s1.innerHTML = ""; if(s2) s2.innerHTML = ""; return; }
            var v = G.GetString(p,G.Cols[tree]), vv = FGrid.OnGetString(G,p,G.Cols[tree],v,G.GetValue(p,G.Cols[tree]),0);
            if(s1) s1.innerHTML = G.IsHidden(r) ? "" : vv!=null ? vv : v;
            if(s2) s2.innerHTML = G.GetString(p,G.Cols.Region);
            }
         },

      //. --- Moves the Sticky row bottom the grid on ReversedTree&1 and to top when reset ReversedTree ---
      OnSetReversedTree: function(G,val){
         G.Add(G.Rows.Sticky,null,val&1?G.Rows.Total:G.Rows.Filter,4);
         },

      //. --- Called after grid is grouped ---
      //. --- Used to clear and hide / show the Sticky row ---
      OnGrouped: function(G,part,group,old,oldtree){
         if(old){
            if(oldtree){ var s1 = G.GetStatic(G.Rows.Sticky,G.Cols[oldtree]); if(s1) s1.innerHTML = ""; }
            var s2 = G.GetStatic(G.Rows.Sticky,G.Cols.Region); if(s2) s2.innerHTML = "";
            if(!group) G.Hide(G.Rows.Sticky,1);
            }
         else if(group) G.Hide(G.Rows.Sticky,0);
         },

      //. --- Called after grid is loaded and ready to render ---
      //. --- Used hide the Sticky row when no grouping is on ---
      OnReady: function(G){
         if(!G.Parts.Body.Group) G.Hide(G.Rows.Sticky,1);
         },

      //. --- Called on focus change, updates Gantt chart according to the focused cell ---
      OnFocus: function(G,row,col){
         var Gantt = Grids.Gantt; if(!Gantt) return;
         if(!row||!G.GetFirstChild(row)){
            Gantt.Source.Data.Data = {Cols:[{Name:"G",GanttChartMaxStart:"1/1/2020", GanttChartMinEnd:"3/1/2020"}],Body:[[]]};
            Gantt.ReloadBody();
            return;
            }
         var Names = {}, min = "2100-1-1", max = "2000-1-1";
         G.IterChildren(row,function(r){
            var n = G.GetValue(r,G.Cols.FullName);
            var N = Names[n]; if(!N){ N = []; Names[n] = N; }
            var d = G.GetValue(r,G.Cols.Day);
            var m = G.GetValue(r,G.Cols.Month);
            var y = G.GetValue(r,G.Cols.Year);
            var a = G.GetValue(r,G.Cols.Amount);
            var d1 = y+"-"+(m<9?"0":"")+(m+1)+"-"+(d<10?"0":"")+d, d2 = new Date(d1); d2.setDate(d2.getDate()+1); d2 = d2.getFullYear()+"-"+(d2.getMonth()+1)+"-"+d2.getDate();
            if(min>d1) min = d1; if(max<d2) max = d2;
            N.push(d1+"~"+d2+"#"+a);
            },9);
         var B = []; for(var n in Names) B.push({ N:n, A:Names[n].join(";")}); 
         var minm = Gantt.RoundGanttDate(StringToDate(min),1,null,null,"M");
         var maxm = Gantt.RoundGanttDate(StringToDate(max),2,null,null,"M");
         Gantt.Source.Data.Data = {Cols:[{Name:"G",GanttChartMinStart:minm,GanttChartMaxStart:min,GanttChartMinEnd:max,GanttChartMaxEnd:maxm}],Body:[B]};
         Gantt.ReloadBody();
         },

      //. --- Called to get actual static (cached) instructions about this grid for AI ---
      OnAIGetStaticInstructions: function(SG,ins){
         var Cols = [
            { id:'Index', type:'int', description:'row index from 1, it is row position in the grid' },
            { id:"Ids", type:'int', description:'row id from 1, it is unique and permanent row identification' }, 
            { id:'Panel', type:'void', description:'panel with buttons to select, delete and copy the row' },
            { id:"Name", type:"string", description:"contractor first name" },
            { id:"Surname", type:"string", description:"contractor last name" },
            { id:"Year", Type:"int", description:"Year when the row data were collected" },
            { id:"Month", Type:"int", description:"Month name January - December when the row data were collected" },
            { id:"Day", Type:"int", description:"Month day 0 - 31 when the row data were collected" },
            { id:'Region', type:'string', description:'region where the contractor works; it contains one value from defined values', 
               values:["Central & South Asia","East Asia & the Pacific","East Europe","Middle East & North Africa","North & Central America","South America","Sub-Saharan Africa","West Europe"] 
               },
            { id:'Country', type:'string', description:'country in the Region where the contractor works; it contains one value from defined values in the Region; it can be changed only to value related to Region', 
               values: {
                  "Central & South Asia": ["Armenia","Azerbaijan","Bangladesh","India","Kazakstan","Pakistan","Sri Lanka"],
                  "East Asia & the Pacific": ["Australia","Brunei","China","Hong Kong","Indonesia","Japan","Korea, dpr","Malaysia","Mongolia","Myanmar","New Zealand","Papua New Guinea","Philippines","Singapore","South Korea","Taiwan","Thailand","Vietnam"],
                  "East Europe": ["Albania","Belarus","Bulgaria","Croatia","Czech Republic","Estonia","Hungary","Latvia","Lithuania","Moldova","Poland","Romania","Russia","Serbia-Montenegro","Slovak Republic","Slovenia","Ukraine"],
                  "Middle East & North Africa": ["Algeria","Bahrain","Egypt","Iran","Iraq","Israel","Jordan","Kuwait","Lebanon","Libya","Morocco","Oman","Qatar","Saudi Arabia","Syria","Tunisia","UAE","Yemen"], 
                  "North & Central America": ["Bahamas","Canada","Costa Rica","Cuba","Dominican Republic","El Salvador","Guatemala","Haiti","Honduras","Jamaica","Mexico","Nicaragua","Panama","Trinidad & Tobago","United States"], 
                  "South America": ["Argentina","Bolivia","Brazil","Chile","Colombia","Ecuador","Guyana","Paraguay","Peru","Suriname","Uruguay","Venezuela"], 
                  "Sub-Saharan Africa": ["Angola","Botswana","Burkina Faso","Cameroon","Congo","Congo dr","Cote d'Ivoire","Ethiopia","Gabon","Gambia","Ghana","Guinea","Guinea-Bissau","Kenya","Liberia","Madagascar","Malawi","Mali","Mozambique","Namibia","Niger","Nigeria","Senegal","Sierra Leone","Somalia","South Africa","Sudan","Tanzania","Togo","Uganda","Zambia","Zimbabwe"], 
                  "West Europe": ["Austria","Belgium","Cyprus","Denmark","Finland","France","Germany","Greece","Iceland","Ireland","Italy","Luxembourg","Malta","Netherlands","Norway","Portugal","Spain","Sweden","Switzerland","Turkey","United Kingdom"]
                  }
               },
            { id:'State', type:'string', description:'state in country in region where the contractor works; it contains one value from defined values; it is empty for countries without defined states; to clear the state value, set it to null; it can be changed only to value related to Country', 
               values: {
                  "Central & South Asia": { 
                     India: ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","-","Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli and Daman and Diu","Delhi","Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry" ] 
                     },
                  "East Asia & the Pacific": {
                     Australia: ["New South Wales","Queensland","South Australia","Tasmania","Victoria","Western Australia","-","Australian Capital Territory","Jervis Bay Territory","Northern Territory","Australian Antarctic Territory","Christmas Island","Cocos (Keeling) Islands","Heard Island and McDonald Islands","Norfolk Island" ],
                     China: ["Anhui","Beijing","Chongqing","Fujian","Guangdong","Gansu","Guizhou","Henan","Hubei","Hebei","Hainan","Heilongjiang","Hunan","Jilin","Jiangsu","Jiangxi","Liaoning","Qinghai","Sichuan","Shandong","Shanghai","Shaanxi","Shanxi","Tianjin","Yunnan","Zhejiang","-","Guangxi Zhuang","Inner Mongolia","Ningxia Hui","Xinjiang Uyghur","Tibet"],
                     Japan: ["Chūbu","Chūgoku","Hokkaidō","Kansai","Kantō","Kyūshū","Shikoku","Tōhoku"]
                     },
                  "North & Central America": {
                     Canada: ["Alberta","British Columbia","Manitoba","New Brunswick","Newfoundland and Labrador","Nova Scotia","Ontario","Prince Edward Island","Quebec","Saskatchewan"],
                     "United States": ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming","-","District of Columbia","-","American Samoa","Guam","Northern Mariana Islands","Puerto Rico","U.S. Virgin Islands"]
                     },
                  "South America": {
                     Brazil: ["Acre","Alagoas","Amapá","Amazonas","Bahia","Ceará","Distrito Federal","Espírito Santo","Goiás","Maranhão","Mato Grosso","Mato Grosso do Sul","Minas Gerais","Pará","Paraíba","Paraná","Pernambuco","Piauí","Rio de Janeiro","Rio Grande do Norte","Rio Grande do Sul","Rondônia","Roraima","Santa Catarina","São Paulo","Sergipe","Tocantins"]
                     },
                  "West Europe": {
                     France: ["Alsace","Aquitaine","Auvergne","Brittany","Burgundy","Centre-Val de Loire","Champagne-Ardenne","Franche-Comté","Île-de-France","Languedoc-Roussillon","Limousin","Lorraine","Lower Normandy","Midi-Pyrénées","Nord-Pas-de-Calais","Pays de la Loire","Picardy","Poitou-Charentes","Provence-Alpes-Côte d'Azur","Rhône-Alpes","Upper Normandy"],
                     Germany: ["Baden-Württemberg","Bavaria","Berlin","Brandenburg","Bremen","Hamburg","Hesse","Lower Saxony","Mecklenburg-Western Pomerania","North Rhine-Westphalia","Rhineland-Palatinate","Saarland","Saxony","Saxony-Anhalt","Schleswig-Holstein","Thuringia"],
                     Italy: ["Abruzzo","Aosta Valley","Apulia","Basilicata","Calabria","Campania","Emilia-Romagna","Friuli Venezia Giulia","Lazio","Liguria","Lombardy","Marche","Molise","Piedmont","Sardinia","Sicily","Trentino-South Tyrol","Tuscany","Umbria","Veneto"],
                     Spain: ["Andalusia","Aragon","Asturias","Balearic Islands","Basque Country","Canary Islands","Cantabria","Castile and León","Castilla–La Mancha","Catalonia","Community of Madrid","Extremadura","Galicia","La Rioja","Navarre","Region of Murcia","Valencian Community","-","Ceuta","Melilla"],
                     "United Kingdom": ["England","Northern Ireland","Scotland","Wales"]
                     }
                  }
               },
            { id:"Partner", type:"boolean", description:"If the contractor is our partner with various benefits; shown as checkbox; value 1 or 0" },
            { id:"Since", type:"date", format:"month_number/day_number/full_year", description:"Date since the contractor works for us; value formatted e.g. as '12/31/2019'" },
            { id:"Calls", type:"string", description:"How often the contractor reports his results; it contains one value from defined values", values:["week","month","quarter","half year","year"] },
            { id:"Rabat", type:"int", description:"Discount the contractor uses for all deliveries; value in percent" },
            { id:"Amount", type:"int", description:"Amount of orders in given day, month and year" },  
            { id:"Price", type:"float", description:"Price of individual order in given day, month and year" },  
            { id:"Total", type:"float", description:"Total price of orders in given day, month and year calculated as Amount*Price" },
            { id:"Verified", type:"boolean", description:"If the price and amount in given day, month and year were verified by us; shown as checkbox; value 1 or 0" },
            { id:"FullName", type:"string", description:"Hidden column available for pivot and grouping by contractor, merges Name and Surname column values; the column cannot be shown" },
            { id:"Date", type:"string", description:"Hidden column available for pivot and grouping, merges Year and Month column values; the column cannot be shown" }, 
            { id:"Location", type:"string", description:"Hidden column available for pivot and grouping, merges Region, Country and State column values; the column cannot be shown" },
            ];
         var S = "## Grid description\n";
         S += "You have master data grid, displayed in JavaScript component 'FastGrid', with 'orders' from 'contractors' (or 'vendors') on particular dates in rows. ";
         S += "Grid columns are defined in JSON object as: "+JSON.stringify(SG.AIAddColsAttrs(Cols))+". ";
         S += "Identify order row to the user by its name got by getname() function instead of its id. ";
         S += "The order row has kind = 'Order'. The order rows never have child rows.";
         S += "Editable columns are Name, Surname, Year, Month, Day, Region, Country, State, Partner, Since, Calls, Rabat, Amount, Price and Verified. ";
         S += "Only one cell can be focused. ";
         S += "\n\n";
         S += "## Grouping rows\n";
         S += "The grid rows can be grouped by one or more columns except by Index, Ids and Panel columns. "
         S += "If the row value in group column is empty (obviously in State column), the group parent is not created. ";
         S += "The group row has kind = 'Group'. The group row have editable only the main Name column where is shown cell values from the group column the group row is created by. ";
         S += "Every group row displays the grouped value (it is created for) in actual tree column, with tree lines. ";
         S += "Group row has the only editable cell in the actual tree column. ";
         S += "The actual tree column will be different in different grouping according to these rules: ";
         S += "it is Month, when last group column is Year; it is Year, when last group column is Name or FullName; it is Day, when last column is Month or Date; ";
         S += "it is Day, when last column Name or FullName and also some group column is Date or Year; in other case it is Name. ";
         S += "Usual group row has no values in other its cells. ";
         S += "Group row created by 'FullName' column is special, has kind = 'Contractor' and has editable also columns Region, Country, State, Partner, Since, Calls and Rabat. ";
         S += "Change in the group cells modifies all the order rows in the group, sets their appropriate cell to the changed value. ";
         S += "The Group and Contractor rows cannot be selected, deleted, added, copied. ";
         S += "\n\n";
         S += "## Sorting rows\n";
         S += "The rows can be sorted by one or more columns except Index and Panel columns. ";
         S += "Sorting cannot move contractors between groups. "
         S += "To fully sort all contractors according to specific criteria, e.g. to get some top rows with maximums, it is required to ungroup the grid by calling grouprows('') first. ";
         S += "\n\n";
         S += "## Filtering rows\n";
         S += "There is one filter row with kind = 'Filter'. The filter row permits filtering orders by columns Name, Surname, Year, Month, Day, Region, Country, State, Partner, Since, Calls, Rabat, Amount, Price, Total and Verified. ";
         S += "Filtering by 'Country' requires also filter by 'Region' and filtering by 'State' requires also filter by 'Region' and 'Country'. ";
         S += "To filter or search by region not exactly listed in available items for 'Region' (e.g. 'Asia') you should set filter for all applicable Regions and set filter by exact countries in 'Country' that belong to the requested region by their common World geography. ";
         S += "Every filter row cell can have its value and operator to compare the value with iterated row value, e.g. for operator '>=' is row shown when row_value >= filter_value. ";
         S += "Permitted operators: '', '==', '!=', '<', '<=', '>', '>=', 'startsWith', '!startsWith', 'endsWith', '!endsWith', 'includes', '!includes', 'search' (regex), '!search' (regex). ";
         S += "Filter value in all columns except Verified can contain more values separated by semicolon to find any of them by operator == or !=. ";
         S += "Filter value in Amount, Price, Total columns can contain range as startnumber~endnumber to filter in the range by operator == or outside the range by operator !=. ";
         S += "Filter value in Since column can contain range as startdate~enddate to filter in the range by operator == or outside the range by operator !=. ";
         S += "Filter value in Since, Amount, Price, Total columns can contain also more ranges and / or single values separated by semicolon to find any of them by operator == or !=. ";
         S += "\n\n";
         S += "## Grid columns actions\n";
         S += "The grid columns cannot be selected, deleted, added or copied. The columns are not in tree and cannot be expanded or collapsed. ";
         S += "\n\n";
         S += "## Grid layout\n";
         S += "The grid is visually split to scrollable sections called parts. ";
         S += "From top to bottom the row parts are: 'Head' (contains 1 header row [kind='Header') with column ids), 'Head2' (contains 1 filter row [kind='Filter']), 'Body' (contains all other rows), 'Foot' (contains another header [kind='Header] row with summary html texts). ";
         S += "From left to right the column parts are: 'ColsIndex' (contains Index column), 'LeftCols' (contains Panel, Name, Surname, Day, Month and Year columns), "
         S += "'Cols1' (contains Region, Country, State, Partner, Since, Calls, Rabat columns), 'Cols2' (contains Amount, Price, Total, Verified columns), 'ColsIndex2' (contains Ids column). ";
         S += "Columns can be moved to any place, also between parts, rows cannot be moved between parts. "
         S += "Columns Index and Ids cannot be moved and no column can be moved left to Index and right to Ids column. ";
         S += "\n\n";
         S += "## Detail chart grid\n";
         S += "Under the master grid there is detail grid displayed in JavaScript component 'TreeGrid Gantt'. ";
         S += "This detail grid displays row charts with details from all (deep) child data rows of actually focused group row in the master grid. ";
         S += "The detail grid column has two columns, Name and Chart. ";
         S += "In the detail grid rows are displayed the contractors (Name + Surname). "
         S += "In the detail grid columns are displayed all days (with months and year) filled in master grid focused row child data rows. ";
         S += "The chart displays Amount in given Day (date) and Name (contractor). The amount is displayed as chart bar with the amount number. ";
         S += "The detail grid is not editable and cannot be controlled by AI - it is possible only to change focused row in the master grid to change content of detail grid. ";
         S += "To show in the chart particular data is often required to change grouping in the master grid and focus the desired group row.";
         return S;
         },

      //. --- Called to get actual dynamic (not cached) instructions about this grid for AI ---
      OnAIGetDynamicInstructions: function(SG,ins){
         var S = "";
         var rowcnt = 0; SG.IterAll("Body",function(r){ if(r.D.id=="Row") rowcnt++; }); S += "The data grid contains "+rowcnt+" order rows. ";
         var group = SG.Grouped&&SG.GetGroup(); if(group) S += "The grid rows are actually grouped by columns: "+group+". ";
         if(group) S += "Actual tree column is '"+SG.GetPartAttr("Body","Tree")+"'. ";
         if(group){
            var cll = SG.Parts.Body.CollapseLevel;
            if(cll==-1||cll==null) S += "The row tree is expanded to show all levels. ";
            else { var g = group.split(","); if(cll<0) cll = g.length+cll+1; S += "The row tree is collapsed to level "+(cll+1)+" to show groups created on '"+g[cll]+"'. The order rows are not visible due collapsed parents. "; }
            }
         var sort = SG.GetSort(); if(sort) S += "The grid rows are actually sorted by columns: "+sort+" (if the column has '-' before name, it means descending sort). ";
         var lock = SG.GetLock(1); if(lock.length) S += "There are actually locked some actions in grid: "+lock.join(", ")+". The locks can be changed in locks options dialog.";
         var filters = SG.AIGetFilter(); 
         if(filters) S += "The grid rows are actually filtered by filters (JavaScript code where column name is used as variable, the row is visible if the filter condition is fulfilled): "+filters;
         S += "Strings for filter are compared case "+(SG.FilterCaseSensitive?"":"in")+"sensitive - users can change it in filter options dialog. ";
         return S;
         }
      },

   //. --- Grid configuration ---
   Cfg: {
      id:"GanttData",   //. Grid id
      Style:"Blue",     //. Sets Blue style as default. TreeGrid is restyles to Blue style in Gantt.html
      ResizingTag:3,    //. Permits resizing main tag in both directions
      RowHeight:18,     //. Predefined height in pixels for all rows in grid without Height attribute set
      IndexList:1,      //. List is set by index instead of key, to shorten the data by using only numbers
      GroupRowIdPrefix:"G-", //. Sets the prefix for group row ids
      SelectAllType:2+16, //. Shows the number of selected rows in the header select button
      ExpandDigits:5,   //. Shows count of immediate visible children on the collapse button in tree
      HideGroupCols:1,  //. Hides the grouped columns by default
      FilterTree:2,     //. Sets filtering in tree as Show all found. If some row fulfills the condition, all its parents are shown too = shows the group rows that are always filtered out
      HideZero:1,       //. Shows empty cell instead of 0
      LevelsCollapse:1, //. Levels button collapses all levels instead of only its level
      RowBorder:0,      //. Hides borders between rows by default
      RowChanges:7,     //. Marks changed only cell values and added / deleted rows
      SyncRows:200000,                                //. Displays message for sort / group / filter / pivot for grids with more than 200,000 rows
      CopyHtml:1,                                     //. Copies to clipboard also html, values with Format
      CopyStyles:"Align,VertAlign,Color,TextColor,TextStyle,Html,RowAttr,ColAttr,CellAttr,ColorBorder,DefaultBorder,Bool", //. What styles copies to clipboard
      CopyMenu:"Html,Color,State,TextStyle,CellHtml,Align,VertAlign,DefBorder,Span,-,Items,Layout,HiddenCols,FilteredRows,CollapsedRows,ParentRows,ChildrenRows", //. Items in menu for toolbar cell Copy
      ExportStyles:"Align,VertAlign,Color,TextColor,TextStyle,Html,RowAttr,ColAttr,CellAttr,ColorBorder,DefaultBorder,Bool,Tree", //. What styles exports to xlsx
      ExportMenu:"File,Format,-,Html,Color,State,TextStyle,CellHtml,Align,VertAlign,DefBorder,Span,Tree,Separator,Style,-,Sheets,Items,Layout,HiddenCols,FilteredRows,CollapsedRows,ParentRows,ChildrenRows", //. Items in Export menu
      PrintMenu:"PageSize,PageLandscape,MarginWidth,MarginHeight,FitPage,Pages,Size,-,Sheets,Items,Layout,HiddenCols,FilteredRows,CollapsedRows,ParentRows,ChildrenRows", //. Items in Print menu
      PdfMenu:"File,-,PageSize,PageLandscape,MarginWidth,MarginHeight,FitPage,Pages,Size,-,Sheets,Items,Layout,HiddenCols,FilteredRows,CollapsedRows,ParentRows,ChildrenRows", //. Items in Print PDF menu
      LocksMenu:"Edit,Paste,Rows,Cols,Resize,Collapse,View,Settings,Data,Cookies,Search,Toolbars,Copy,PrintPdf,Export,Reload,Save,Undo,AI", //. List of available locks for the grid features
      PasteFillRows:0, PasteAddRows:2,                //. Pastes as new rows added before focused row
      PasteFillCols:3, PasteAddCols:0,                //. Pastes the whole rows to all columns from start
      CopyPasteInternal:0,                            //. Copy & paste is done via clipboard and also internally with all settings
      PasteDateFormat:"M/d/yyyy",                     //. Format for pasting date, used especially if pasted dates from outside with changed date separator, e.g. to "."
      SearchFocusCol:"Name,Year,Month,Day",           //. Focuses cell in first visible column from the list in found row
      SaveUrl: { Data:{ IO: { Message:"This example does not save changes to server.<br>Now the changes are accepted like they were saved." }} }, //. Simulated save
      IgnoreF:0,                                      //. Set it to 1 to ignore all Fx fast attributes and behave normally and slower with only standard cell attributes
      FocusTool:0,                                    //. Restricts focusing toolbars
      FocusCol:0, HoverCol:0,                         //. Does not mark for focus and hover whole columns
      ClearFocus:0,                                   //. Does not clear focused row, if the grid loses focus
      Focused:["G-1013","Name"],                      //. Focused cell on start
      AutoCookie:1+2+4+8+16,                          //. Automatically loads and saves configuration to local storage
      ResetCookie:1,                                  //. Permits resetting configuration to defaults
      Version:2,                                      //. Clears all previously saved configuration with different layout version
      FixedScroll:2, FixedScrollType:1,               //. When scrolling vertically by larger amount, it rounds scroll to the two row height, to not mix Alternate colors
      PdfUrl: "http://localhost:8000/Pdf.js?func=getpdf",//. PDF export is run on separate node server located in ./server/
      PdfHtml:3,                                         //. Sends to server whole html with full layout, including Script and Events functions
      },
   AI: {
      StaticInstructions:"",  //. To avoid generating default static instructions
      DynamicInstructions:"", //. To avoid generating default dynamic instructions
      //. Sample input history to demonstrate various AI tasks
      InputHistory: "|-|What is in table?|What can you do?"
                  + "|What is in the chart?"
                  + "|What is the highest Price?"
                  + "|What is the total price of vendors registered before 7/1/2011 in Europe?"
                  + "|Select contractors except registered in 2014 - 2016"
                  + "|Collapse to contractors"
                  + "|Mark and focus the highest and lowest values in Amount"
                  + "|Subtract 2 from all Amount values|Add 2 weeks to Since in USA"
                  + "|Set all contractors data in March verified"
                  + "|Move all Indian contractors to USA"
                  + "|Delete all orders with zero Amount or Price"
                  + "|Add 100 empty orders to New York|Add 10000 orders and fill their data with meaningful random values"
                  + "|Copy orders from India, each new one under the original one"
                  + "|Show only March 2015|Show Since between 10/1/2005 and 7/6/2010"
                  + "|Group by month and year"
                  + "|Show all columns|Undo it"
                  + "|Export data to xlsx"
                  + "|-"
                  + "|Show in chart 2017 for all contractors"
                  + "|Show in chart August 2022 for all contractors"

      },
   Format: { fd: "MM/dd/yyyy", nfg:"00", nfp:"0.##\\%", nff:",0.##" }, //. Formats defined for FT values
   Locks: { Data:"Data" }, LockNames: { Data:"Restrict choosing data set" }, //. Custom Lock names
   Cookie:{ Cfg:"Active,Focused", Rows:"First,Height" }, //. Saves rows heights to cookies, but only from the first pages (saves to defaults due DHeight attribute) and saves also actual grid (Pivot or Source). Saves also focused cell to storage
   Styles: {
      Base:  { Colors: { group:"#FFF5EA", groupname:"#EAFFF5", blue:"blue" } },
      White: { Colors: { group:"#EEE", groupname:"#DDD" } },
      Dark: { Colors: { group:"#003050", groupname:"#004578", blue:"#0BB" } },
      Black: { Colors: { group:"#003050", groupname:"#004578", blue:"#0AA" } }
      },
   RowParts: [
      { id:"TopScroll", Hidden:0 },                                //. Shows also the top scrollbar
      { id:"Head2", Prev:"Head", Rel:100000, MinHeight:70, MinHeightResize:0 }, //. Adds new row section to display the filter. It is not included in section with headers, because of different background and borders between them
      ],
   ColParts: [
      { Clear:1 },                                                 //. Redefines all ColParts, removes all previously defined ColParts
      { id:"LeftScroll", Type:"Scroll", Item:"$ItemLeftScroll" },  //. Left vertical scrollbar
      { id:"ColsIndex", Type:"Cols", NoResize:1, ExportFixed:1 },  //. Left section with row indexes
      { id:"LeftCols", Type:"Cols", Rel:2, MinWidth:90, MinWidthResize:21, ExportFixed:1 },       //. Left columns with relative width
      { id:"Cols1", Type:"Cols", Rel:2, MinWidth:100, MinWidthResize:21 },                        //. First middle columns with relative width
      { id:"Cols2", Type:"Cols", Rel:2, MinWidth:100, MinWidthResize:21 },                        //. Second middle columns with relative width
      { id:"ColsIndex2", Type:"Cols", NoResize:1, ExportFixed:1 }, //. Right section with row ids
      { id:"RightScroll",Type:"Scroll", Item:"$ItemRightScroll" }  //. Right vertical scrollbar
      ],
   DefCells: { 
      State: { RightIconsFormula:"Grid.GetList(Row,Col)?'List':''", ButtonFormula:"Grid.GetList(Row,Col)?'List':''", NoEditFormula:"Grid.GetList(Row,Col)?0:2" }
      },
   DefRows: { 
      Row: { DHeight:1, AIKind:"Order" },
      New: { V: { Name:"", Surname:"", Year:0, Month:0, Day:1, Region:0, Country:0, State:"" } }, //. Newly added row, used for pasting rows from outside
      Span: { 
         NoEdit:1, NoIndex:1, FV:{ All:1+8 }, FT:31, FA:3+256, FS:3+64+256, FE:1+2,
         A: { Panel: { LeftIcons:"" }, Index: { NoSearch:1 }, Ids: { NoSearch:1 }, Region:{ Type:"Html" }, Amount: { Type:"Html", Align:2 } },
         CS:{ Name:2, Year:2, Amount:4, Region:7 }, F:{ Amount:"Grid.Script.monthtotal(Grid,Row)", Region:"Grid.Script.getgroups(Grid,Row,Col)" } 
         },
      StickySpan: { D:"Span,Sticky", A: { Panel: { Color:"group" } } },
      Group: { 
         D:"Span", AIKind:"Group", Color:"group", NoFilterRow:2, NoAlternate:1, ND:"New", Accept:"Row,New", NoPaste:2, NoSelect:1, DHeight:1, DId:"Group",
         A: { Panel: { Color:"group" }, Name: { Color:"group" }, Year: { Color:"group" } }, F:{ Index:"Row.id" },
         },
      GroupName: { 
         D:"Group", AIKind:"Contractor", Color:"groupname", DId:"GroupName", CS: { Region:1 }, FT: { All:31, Region:20, Country:24, State:24, Partner:15, Since:10, Calls:20, Rabat:8 }, F: { Region:"" },
         A: { 
            Name: { Color:"groupname" }, Year: { Color:"groupname" },
            Region: { Type:"String", Mirror:15, MirrorRow:"GroupChildren" }, Country: { Mirror:15, MirrorRow:"GroupChildren" }, State: { Mirror:15, MirrorRow:"GroupChildren" },
            Partner: { Mirror:15, MirrorRow:"GroupChildren" }, Since: { Mirror:15, MirrorRow:"GroupChildren" }, Calls: { Mirror:15, MirrorRow:"GroupChildren" }, Rabat: { Mirror:15, MirrorRow:"GroupChildren" } 
            }
         },
      GroupLocation: { D:"Group", FT:31+1024, A: { Name: { NoEdit:1 }, Day: { NoEdit:1 } } }, 
      GroupDate: { D:"Group", FT:31+1024, A: { Day: { NoEdit:1 } } }, 
      GroupRegion: { D:"Group" },
      GroupInMonth: { D:"", CS: { Year:1 } },
      },
   Head: [
      { id:"Header", D:"Header", Height:30, LevelsPart:"Body", Align:2, FV:0, FT:1, FS:{ All:2 }, FE:2, 
         A: { Panel: { LeftIcons:"SelectRows,DeleteRows" }, Index: { Align:2 }, Ids: { Align:2 } }, 
         V: { FullName:"Name", Index:"Index", Ids:"ID" } },
      ],
   Head2: [
      { id:"Filter", D:"Filter", Height:22, Range:1, FV:0, FT:-1, FA:128+256, V: { Ids:"" },  //. Filter row
         A: {
            Panel: { D:"FilterAction", Color:"base" },
            Name: { DefaultFilter:11 },
            Surname: { DefaultFilter:11 },
            Region: { LeftIcons:"" }, 
            Country: { LeftIcons:"", D:"State" }, 
            State: { LeftIcons:"", D:"State" }, 
            Since: { LeftIcons:"Filter,Date", RightIcons:"" },
            Calls: { LeftIcons:"" },
            Year: { LeftIcons:"" }, 
            Month: { LeftIcons:""  }, 
            Day: { LeftIcons:"" }, 
            }, 
         },
      { id:"Sticky", D:"StickySpan", Static:1, NoExport:1, NoSelect:1, FA:3+256+8192, Button:"", F: { Amount:"", Region:"" }, V: { Ids:"" }, A: { Day: { Align:2 } }, Color:"group" }
      ],
   Foot: [
      { //. Bottom row with summaries
         id:"Total", Kind:"Header", D:"Span", Color:"header", TextColor:"textheader", Height:22, NoSearch:1, NoSelect:1, 
         A: { Region: { Align:2+16 }, Panel: { Color:"header" } }, V: { Ids:"" }, FS:3+64+256, FE:1+2+2048,
         F:{ Amount:"Grid.Script.monthtotal(Grid)", Region:"return 'shown <span style=\"font-weight:700\">'+Grid.NumberToString(Grid.Count('Body',15),',0')+'</span> rows from <span style=\"font-weight:700\">'+Grid.NumberToString(Grid.Count('Body'),',0')+'</span>'", Location:"", } 
         },
      ],
   DefCols: {
      Base: { Item:0, FV:0, FS:0, FA:0, FE:0, FID:"All" }, //. Sets fast FV for all columns by default, reads the cell value only from V, U and MirrorValues and Index
      Location: { Type:"String", RightIcons:"List", Button:"List", IndexList:1, SortList:2, NumberSort:1, FA:256 }, //. Default settings for Region, Country and State columns
      Support: { Type:"String", Hidden:1, NoHide:1, NoExport:1, NoCopy:1, NoSearch:1, FV:1 },                  //. Default settings for hidden support columns FullName, Date and Location. Sets FV:1 - adds reading F for cell value
      },
   ColsIndex: [
      { id:"Index", D:"Index", DA:"Index", NoExport:0, Rel:70, MinWidth:70, Item:-1, FT:0, FS:1+64+256, FE:2 }, //. Column with row indexes. For group rows shows their ids
      { id:"FullName", D:"Support", Formula:"$Name+' '+$Surname", GroupHide:"Name,Surname", Name:"Name" }, //. Hidden column available for pivot and grouping. Merges Name and Surname columns.
      { id:"Date", D:"Support", Formula:"var m = $Month-0+1, y = $Year; return y!=null ? y+'-'+(m<10?'0':'')+m : ''", GroupHide:"Year,Month" }, //. Hidden column available for pivot and grouping. Merges Year and Month
      { id:"Location", D:"Support", Formula:"var r = $Region, s = $State; return r!=null ? r+'-'+($Country-0+10)+(s!==''?'-'+(s-0+10):'') : ''", GroupHide:"Region,Country,State" }, //. Hidden column available for pivot and grouping. Merges Region, Country and State
      ],
   ColsIndex2: [
      { id:"Ids", D:"Header", DA:"Index", NoExport:0, Rel:70, MinWidth:70, Item:-1, NumberSort:1, Align:0, FT:0, FS:64+256, FE:2 }, //. Column with row ids
      ],
   LeftCols: [
      { id:"Panel", D:"Panel", DA:"Panel", LeftIcons:"SelectRow,DeleteRow,AddRow", IconWrap:1, Width:65, Item:"Buttons", FT:3, FA:128 }, //. Panel with control buttons Select, Delete and Add
      { id:"Name", DA:"Name", UCode:0x13, UIndex:13, Type:"String", Rel:100, MinWidth:100, GroupRel:180, GroupMinWidth:180, Block:"Name", GroupCol:"FullName", Item1:-1, FT:0 },
      { id:"Surname", DA:"Name", UCode:0x13, UIndex:11, Type:"String", Rel:100, MinWidth:100, Block:"Name", GroupCol:"FullName", Item1:-1, FT:0 },
      { id:"Year", Type:"Number", UCode:FGrid.GetUCode(1,1,0,1,0,0,0,2000), UIndex:4, Rel:65, MinWidth:65, GroupRel:150, GroupMinWidth:150, Align:0, Block:"Date", NumberSort:1, Item2:-1, FT:20, FA:256, FE:2,
         RightIcons:"List", ListMenu:",2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026,2027,2028,2029", EditMask:"^(\\d{0,2}|20\\d{0,2})$",
         OnChange:"if(Value>=0&&Value<1000) Grid.SetValue(Row,Col,Value<10 ? Value-0+2020 : Value<100 ? Value-0+2000 : Value*10);",
         },
      { id:"Month", Type:"String", UCode:0x01, UIndex:3, Rel:100, MinWidth:100, GroupRel:220, GroupMinWidth:220, Block:"Date", NumberSort:1, Item2:-1, FT:20, FA:256, FE:2,
         RightIcons:"List", IndexList:1, List:",January,February,March,April,May,June,July,August,September,October,November,December", Button:"List",
         OnChange:"if(Value-0&&!Event.List) Grid.SetValue(Row,Col,Value-1);",
         ResultMask:/^(january|february|march|april|may|june|july|august|september|october|november|december|[1-9]|10|11|12)$/i
         },
      { id:"Day", Type:"Number", UCode:0x08, UIndex:1.1, Format:"00", Rel:50, MinWidth:50, GroupRel:240, GroupMinWidth:240, MinEditWidth:16, Align:0, NumberSort:1, Item2:-1, FT:5, FA:256, FE:2,
         EditMask:"^([1-9]|[12][0-9]|30|31|\s*)$", 
         RightIcons:"List", List:",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31", 
         },
      ],
   Cols1: [
      { id:"Region", D:"Location", UCode:0x08, UIndex:5.5, DA:"Region", ClearCells:"Country,State", Rel:195, MinWidth:195, Block:"Location", Item3:-1, FT:20,
         List:"|Central & South Asia|East Asia & the Pacific|East Europe|Middle East & North Africa|North & Central America|South America|Sub-Saharan Africa|West Europe" },
      { id:"Country", D:"Location", UCode:0x08, UIndex:6.1, DA:"Country", ListRelated:"Region", ClearCells:"State", Rel:155, MinWidth:155, Block:"Location", Item3:-1, FT:24, GroupHide:"Region,Country,State", List:[
         "|Armenia|Azerbaijan|Bangladesh|India|Kazakstan|Pakistan|Sri Lanka", 
         "|Australia|Brunei|China|Hong Kong|Indonesia|Japan|Korea, dpr|Malaysia|Mongolia|Myanmar|New Zealand|Papua New Guinea|Philippines|Singapore|South Korea|Taiwan|Thailand|Vietnam", 
         "|Albania|Belarus|Bulgaria|Croatia|Czech Republic|Estonia|Hungary|Latvia|Lithuania|Moldova|Poland|Romania|Russia|Serbia-Montenegro|Slovak Republic|Slovenia|Ukraine", 
         "|Algeria|Bahrain|Egypt|Iran|Iraq|Israel|Jordan|Kuwait|Lebanon|Libya|Morocco|Oman|Qatar|Saudi Arabia|Syria|Tunisia|UAE|Yemen", 
         "|Bahamas|Canada|Costa Rica|Cuba|Dominican Republic|El Salvador|Guatemala|Haiti|Honduras|Jamaica|Mexico|Nicaragua|Panama|Trinidad & Tobago|United States", 
         "|Argentina|Bolivia|Brazil|Chile|Colombia|Ecuador|Guyana|Paraguay|Peru|Suriname|Uruguay|Venezuela", 
         "|Angola|Botswana|Burkina Faso|Cameroon|Congo|Congo dr|Cote d'Ivoire|Ethiopia|Gabon|Gambia|Ghana|Guinea|Guinea-Bissau|Kenya|Liberia|Madagascar|Malawi|Mali|Mozambique|Namibia|Niger|Nigeria|Senegal|Sierra Leone|Somalia|South Africa|Sudan|Tanzania|Togo|Uganda|Zambia|Zimbabwe", 
         "|Austria|Belgium|Cyprus|Denmark|Finland|France|Germany|Greece|Iceland|Ireland|Italy|Luxembourg|Malta|Netherlands|Norway|Portugal|Spain|Sweden|Switzerland|Turkey|United Kingdom"
         ]},
      { id:"State", D:"Location", DA:"State", UCode:0x01, UIndex:7, ListRelated:"Region,Country", Rel:135, MinWidth:135, Block:"Location", Item3:-1, FT:24, List:{
         0: { 
               3: "|Andhra Pradesh|Arunachal Pradesh|Assam|Bihar|Chhattisgarh|Goa|Gujarat|Haryana|Himachal Pradesh|Jharkhand|Karnataka|Kerala|Madhya Pradesh|Maharashtra|Manipur|Meghalaya|Mizoram|Nagaland|Odisha|Punjab|Rajasthan|Sikkim|Tamil Nadu|Telangana|Tripura|Uttar Pradesh|Uttarakhand|West Bengal|-|Andaman and Nicobar Islands|Chandigarh|Dadra and Nagar Haveli and Daman and Diu|Delhi|Jammu and Kashmir|Ladakh|Lakshadweep|Puducherry" 
            },
         1: { 
               0: "|New South Wales|Queensland|South Australia|Tasmania|Victoria|Western Australia|-|Australian Capital Territory|Jervis Bay Territory|Northern Territory|Australian Antarctic Territory|Christmas Island|Cocos (Keeling) Islands|Heard Island and McDonald Islands|Norfolk Island",
               2: "|Anhui|Beijing|Chongqing|Fujian|Guangdong|Gansu|Guizhou|Henan|Hubei|Hebei|Hainan|Heilongjiang|Hunan|Jilin|Jiangsu|Jiangxi|Liaoning|Qinghai|Sichuan|Shandong|Shanghai|Shaanxi|Shanxi|Tianjin|Yunnan|Zhejiang|-|Guangxi Zhuang|Inner Mongolia|Ningxia Hui|Xinjiang Uyghur|Tibet",
               5: "|Chūbu|Chūgoku|Hokkaidō|Kansai|Kantō|Kyūshū|Shikoku|Tōhoku" 
            },
         4: { 
               1: "|Alberta|British Columbia|Manitoba|New Brunswick|Newfoundland and Labrador|Nova Scotia|Ontario|Prince Edward Island|Quebec|Saskatchewan",
               14: "|Alabama|Alaska|Arizona|Arkansas|California|Colorado|Connecticut|Delaware|Florida|Georgia|Hawaii|Idaho|Illinois|Indiana|Iowa|Kansas|Kentucky|Louisiana|Maine|Maryland|Massachusetts|Michigan|Minnesota|Mississippi|Missouri|Montana|Nebraska|Nevada|New Hampshire|New Jersey|New Mexico|New York|North Carolina|North Dakota|Ohio|Oklahoma|Oregon|Pennsylvania|Rhode Island|South Carolina|South Dakota|Tennessee|Texas|Utah|Vermont|Virginia|Washington|West Virginia|Wisconsin|Wyoming|-|District of Columbia|-|American Samoa|Guam|Northern Mariana Islands|Puerto Rico|U.S. Virgin Islands" 
            },
         5: {
               2: "|Acre|Alagoas|Amapá|Amazonas|Bahia|Ceará|Distrito Federal|Espírito Santo|Goiás|Maranhão|Mato Grosso|Mato Grosso do Sul|Minas Gerais|Pará|Paraíba|Paraná|Pernambuco|Piauí|Rio de Janeiro|Rio Grande do Norte|Rio Grande do Sul|Rondônia|Roraima|Santa Catarina|São Paulo|Sergipe|Tocantins",
            },
         7: {
               5: "|Alsace|Aquitaine|Auvergne|Brittany|Burgundy|Centre-Val de Loire|Champagne-Ardenne|Franche-Comté|Île-de-France|Languedoc-Roussillon|Limousin|Lorraine|Lower Normandy|Midi-Pyrénées|Nord-Pas-de-Calais|Pays de la Loire|Picardy|Poitou-Charentes|Provence-Alpes-Côte d'Azur|Rhône-Alpes|Upper Normandy",
               6: "|Baden-Württemberg|Bavaria|Berlin|Brandenburg|Bremen|Hamburg|Hesse|Lower Saxony|Mecklenburg-Western Pomerania|North Rhine-Westphalia|Rhineland-Palatinate|Saarland|Saxony|Saxony-Anhalt|Schleswig-Holstein|Thuringia",
               10: "|Abruzzo|Aosta Valley|Apulia|Basilicata|Calabria|Campania|Emilia-Romagna|Friuli Venezia Giulia|Lazio|Liguria|Lombardy|Marche|Molise|Piedmont|Sardinia|Sicily|Trentino-South Tyrol|Tuscany|Umbria|Veneto",
               16: "|Andalusia|Aragon|Asturias|Balearic Islands|Basque Country|Canary Islands|Cantabria|Castile and León|Castilla–La Mancha|Catalonia|Community of Madrid|Extremadura|Galicia|La Rioja|Navarre|Region of Murcia|Valencian Community|-|Ceuta|Melilla",
               20: "|England|Northern Ireland|Scotland|Wales",
            }
         }},
      { id:"Partner", UCode:0x0B, UIndex:6, Type:"Bool", Rel:55, MinWidth:55, Item4:-1, FT:15 },
      { id:"Since", UCode:FGrid.GetUCode(2,1,12,1,0,0,0,Date.UTC(2020,1,1)), UIndex:9, Type:"Date", Rel:110, MinWidth:110, Format:"MM/dd/yyyy", EditFormat:"M/d/yyyy", RightIcons:"Date", Item4:-1, FT:10, FS:1, FA:256, FE:2 },
      { id:"Calls", UCode:0x0D, UIndex:5, Type:"Auto", Rel:85, MinWidth:85, IndexList:1, RightIcons:"List", Button:"List", List:"|week|month|quarter|half year|year", FT:20, Item4:-1, FA:256 },
      { id:"Rabat", UCode:0x01, UIndex:8, Type:"Number", Format:"0.##\\%", ExportFormat:"General\\%", Rel:50, MinWidth:50, Item4:-1, FT:8, FE:2 }
      ],
   Cols2: [
      { id:"Amount",   UCode:0x08, UIndex:0.3, Item5:-1, Rel:70, MinWidth:70, Type:"Number", NoGroupBy:1, NumberSort:1, FT:4 },  
      { id:"Price",    UCode:0x800, UIndex:2,  Item5:-1, Rel:70, MinWidth:70, Type:"Number", NoGroupBy:1, NumberSort:1, Format:",0.##", ExportFormat:"#,0", FT:6, FE:2 },  
      { id:"Total",    Formula:"Amount*Price", Item5:-1, Rel:70, MinWidth:70, Type:"Number", NoGroupBy:1, NumberSort:1, Format:",0.##", ExportFormat:"#,0", NoEdit:1, FV:1, FT:6, FE:2 },
      { id:"Verified", UCode:0x0B, UIndex:1,   Item5:-1, Rel:70, MinWidth:70, Type:"Bool",   NoGroupBy:1, NumberSort:1, FT:15 },
      ],
   Top: [
      { id:"Sheets", D:"Sheets", Hidden:1 }, //. Sets the Sheets toolbar hidden on start, it is displayed when Pivot is created
      "Search",    //. Search toolbar with search edit and search button
      { id:"Toolbar1", Cells:[ "Save","Reload","Print","Pdf","Export" ], Item:"Controls" },                    //. 1. Toolbar with standard control buttons
      { id:"Toolbar2", Cells:[ "Copy","PasteOnly" ], Item:"Clipboard" },                                       //. 2. Toolbar with standard control buttons
      { id:"Toolbar3", Cells:[ "AddRowEnd","ExpandRows","CollapseRows","Undo","Redo" ], Item:"Manipulation" }, //. 3. Toolbar with standard control buttons
      { id:"Toolbar4", Cells:[ "Settings","Filter","Sort","TipAction","Lock" ], Item:"Settings" },             //. 4. Toolbar with standard control buttons
      "Layout",                               //. Layout toolbar with Layout menu and UpdateToolbars buttons
      "Cookies",                              //. Cookies toolbars with saved configurations
   
      { id:"DataSet", Cells: [ { id:"Data", D:"List", Width:150, Align:1, Label:"Data set", TextColor:"blue", UseResize:2, //. Toolbar to choose data set
         Formula: "Grid.GetSources(1)[1].match(/PivotData\\d+\\w*/)[0]",
         List: { 
            PivotData1000: "1,000 rows     (4 kB)",
            PivotData10000: "10,000 rows   (33 kB)", 
            PivotData20000: "20,000 rows   (65 kB)",
            PivotData50000: "50,000 rows (163 kB)",
            PivotData100000: "100,000 rows (0.3 MB)", 
            PivotData200000: "200,000 rows (0.6 MB)",
            PivotData500000: "500,000 rows (1.6 MB)<br><span style=\"color:silver;\">download from treegrid.com</span>",
            PivotData1000000: "1,000,000 rows (3.2 MB)<br><span style=\"color:silver;\">download from treegrid.com</span>", 
            PivotData2000000: "2,000,000 rows (6.4 MB)<br><span style=\"color:silver;\">download from treegrid.com</span>", 
            },
         OnChange: function(Grid,Row,Col,Event){
            var G = Grid.GetPivotSource(), Value = G.GetValue(Row,Col,1), S0 = G.GetSources(0), S1 = G.GetSources(1);
            S0.D = null; G.Disable(); 
            S1[1] = S1[1].replace(/PivotData\d+\w*/,Value); 
            if(S1[1].search(/500000|000000/)>=0){ //. Too large data are not included in the Svelte package and it are loaded directly from treegrid.com
               if(S1[1].indexOf("treegrid.com")<0) S1[1] = S1[1].replace(/.*PivotData/,"https://www.treegrid.com/FExamples/Complex/03-pivot/Data/PivotData");
               }
            else if(S1[1].indexOf("treegrid.com")>=0) S1[1] = S1[1].replace(/.*PivotData/,"/03-pivot/PivotData");
            S0.Progress = {PivotData500000:16e5,PivotData1000000:32e5,PivotData2000000:64e5}[Value]; 
            G.ActionReload();
            }
         } ] },
      "Styles",                                     //. Toolbar with grid styles and sizes
      { id:"GroupList", Item:"Group list", Cells: [ //. List of available predefined groupings
         { id:"GroupList", D:"GroupList", Width:170,
            List:{ 
               "":"<i>none</i>", "Country":"Country", "Location":"Location", "Region,Country,State":"Location 3x", 
               "Country,FullName":"Country, Name", "Location,FullName":"Location, Name", "Region,Country,State,FullName":"Location 3x, Name",
               "Country,FullName,Date":"Country, Name, Date", "Location,FullName,Date":"Location, Name, Date", "Region,Country,State,FullName,Year,Month":"Location 3x, Name, Date 2x", 
               "FullName":"Name", "FullName,Date":"Name, Date", "FullName,Year,Month":"Name, Date 2x", 
               "Date":"Date", "Year,Month":"Date 2x", "Date,FullName":"Date, Name", "Year,Month,FullName":"Date 2x, Name", 
               "Date,Country,FullName":"Date, Country, Name", "Date,Location,FullName":"Date, Location, Name", "Year,Month,Region,Country,State,FullName":"Date 2x, Location 3x, Name", 
               "Calls,FullName":"Calls per, Name", "Calls,FullName,Date":"Calls per, Name, Date", 
               "Rabat,FullName":"Rabat, Name", "Rabat,FullName,Date":"Rabat, Name, Date",
               "Since,FullName":"Since, Name", "Since,FullName,Date":"Since, Name, Date",
               } 
            }, "Group" ] }, //. Toolbar button for group on / off and grouping menu
      "Group", //. Toolbar to drag columns for grouping
      ],
   Bottom:["AI"],
   Body_Cfg:{
      MirrorValues:2,    //. Sets all null values in every row from their previous row in the same row set and part. To shorten the input data.
      Alternate:2, AlternateType:2, //. Colors every second row in silver background. If grouped, counts the grouped rows to Alternate to preserve scroll position to the same color by FixedScroll
      DefaultSort:"Ids", //. Default sorting order on ClearSort or if rows equal in actual sorting order
      Group:"Region,Country,State,FullName,Year,Month", //. Predefined grouping
      GroupTree:{ "*": "Name", "Month$|Date$|(Date|Year).*(Name$|FullName$)":"Day", "Year$":"Month", "Name$|FullName$":"Year" }, //. Specifies tree column according to chosen grouping settings
      ND:"New",          //. Default row set to added rows to the Body root
      CollapseLevel:-2,  //. Collapses the last level
      },
   TopScroll_Cfg: { ScrollOnDrag:"1,-4000%,Body" },
   Head_Cfg: { ScrollOnDrag:"1,-100%,Body" },
   Head2_Cfg: { ScrollOnDrag:"1,-100%,Body" },
   Foot_Cfg: { ScrollOnDrag:"-1,100%,Body" },
   BottomScroll_Cfg: { ScrollOnDrag:"-1,4000%,Body" },
   Actions: {
      OnClickAddRow:"AddRow(0,0,3)",         //. On click to AddRow toolbar button alwas adds new empty row on the end
      OnClickDeleteRows:"DeleteRows(1,1,3)", //. On click to DeleteRows panel button on header always deletes selected rows
      OnClickDeleteRow:"DeleteRow(0,1,3)"    //. On click to DeleteRow pane button always deleted the row
      },
   Dialogs: { Layout: { Script: { Options:16, MaxRows:22 } } },
   Cfg_Par: { ParUCode:0x0C }, //. The par id (0,1,2,3) is coded to the first two bits in row data. These two bits become part of the U parameter (because it starts on the whole character) and they are omitted on the parameters definition = Amount starts on 0.3)
   Par: [
      ["U",0x2000+3], //. Par 0 = 0x2000 + 3 characters  (0.3 Amount, 1 Verified, 1.1 Day, 2 Price)
      ["U",0x2000+4], //. Par 1 = 0x2000 + 4 characters  (0.3 Amount, 1 Verified, 1.1 Day, 2 Price, 3 Month)
      ["U",0x2000+5], //. Par 2 = 0x2000 + 5 characters  (0.3 Amount, 1 Verified, 1.1 Day, 2 Price, 3 Month, 4 Year)
      ["U",0x2000+15] //. Par 3 = 0x2000 + 15 characters (0.3 Amount, 1 Verified, 1.1 Day, 2 Price, 3 Month, 4 Year, 5 Calls, 5.5 Region, 6 Partner, 6.1 Country, 7 State, 8 Rabat, 9 [2] Since, 11[2] Name, 13[2] Surname )
      ],
   Media: {
      Tablet: { //. Changes for touch only screens
         RowParts: [ { id:"TopScroll", Hidden:1 } ],
         ColParts: [ { id:"LeftScroll", Hidden:1 } ],
         Top:[ { id:"GroupList", NewLine:0 } ]
         },
      Mobile: { //. Changes for small displays, mostly mobile phones 
         ColsIndex: [ { id:"Index", Width:55 } ],
         ColsIndex2: [ { id:"Ids", Width:55 } ],
         Top: [ { id:"DataSet", Cells: [ { id:"Data", Width:135 } ] } ]
         }
      }
   });

const ganttSrc = ({ //. All layout and data for grid
   Cfg: { id:"Gantt", Editing:0, ShowHScroll:1, Style:"Radius", GanttStyle:"Radius"  },
   Panel: { Visible:0 },
   LeftCols:[
      { Name:"N", Type:"Text", Width:150 },
      { Name:"A", Type:"Text", Visible:0 },
      ],
   Cols: [
      { Name:"G", Type:"Gantt", 
         GanttAvailability:"A",
         GanttUnits:"d", GanttWidth:16,
         GanttHeader4:"d#%d", GanttHeaderHeight4:10,
         GanttHeader1:"M#MMMM yyyy", GanttHeaderHeight1:10,
         GanttChartRound:"M",
         MaxWidth:1000000,
         }
      ],
   Media: [
      { MaxWidth: 500, Cfg: { Scale:0.7 } }
      ],
   Toolbar: { Visible:0 },
   Header: { N:"Name" },
   Body:[[]]
   });

let grid = null; //. Grid reference received for grid, access the grid object as grid

onMount(function(){
   if(document.getElementById("GridEStandalone")){ StartTreeGrid(); return; }
   const s = document.createElement("script"); s.id = "GridEStandalone"; s.src = "/04-gantt/GridEStandalone.js"; s.defer = true;
   s.onload = () => { 
      Grids.OnRenderFinish = function(G){ var F = FGrid.Grids[0], A = F.GetFocus(); FGrid.OnFocus(F,A[0],A[1]); } //. Called after the TreeGrid Gantt chart is ready on start, shows here the focused row from FastGrid source
      StartTreeGrid();  //. Processes all TreeGrid <bdo> tags on page
      }
   s.onerror = () => console.error("GridEStandalone.js FAILED to load", s.src);
   document.body.appendChild(s);
   });
onDestroy(function(){
   DisposeGrids();
   });
</script>

<h1>4. Large example with detail TreeGrid Gantt chart</h1>
   <h5>
      Complex grid with huge data sets with creating pivot grid and many other features. Only HTML without saving changes.<br/>
      Items used in this sample are explained in the commented source svelte file at <b>./src/grid/04-gantt.svelte</b>,
      UTF8Store data are used from 03-pivot example at <b><a href="/03-pivot/PivotData100000.js" target="_blank">./public/03-pivot/</a></b>.
      The TreeGrid script is located at <b>./public/04-gantt/GridEStandalone.js</b>.
   </h5>
   <FastGrid src={{ Progress:1400000, Style:'Blue', Sources:[src,'/03-pivot/PivotData100000.js'] }} bind:this={grid} style="width:100%; min-height:500px; height:100%; min-height:300px" />
   <div style="height:300px; margin-top:10px;">
      <bdo layout_data={JSON.stringify(ganttSrc)} style="width:100%; height:100%; display:block" suppressmessage="1"></bdo>
   </div>
