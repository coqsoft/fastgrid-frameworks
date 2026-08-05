import React, { useMemo, useRef, useState } from "react";
import { FastGrid } from "fastgrid-react";
import "../Tutorial.css";

export default function App() {

   const src = useMemo(() => ({ //. All layout and data for grid. Memo is used for simple object created inside the App function to avoid re-creating grid on every React App render

      //. --- Custom JavaScript functions and properties accessible by API by Grid.Script.XXX ---
      Script: {

         //. --- Calculates all and verified summary in TotalRow1, TotalRow2 (row==null) and Group (row set) rows ---
         //. id can be "R1" or "R2" as D id to sum these rows
         monthtotal: function(G,row,col,id){
            var sum = 0, sumver = 0, idx = col.id.slice(1), amount = G.Cols["A"+idx], price = G.Cols["P"+idx], ver = G.Cols["V"+idx], D = G.DefRows[id], L = row ? row.L : -10;
            if(!row&&G.Script[id+"All"+idx]!=null){ //. Precalculated results in data for TotalRow rows
               sum = G.Script[id+"All"+idx]; sumver = G.Script[id+"Ver"+idx]; G.Script[id+"All"+idx] = null; G.Script[id+"Ver"+idx] = null;
               }
            else G.IterSimple(row||G.GetFirst("Body"),function(r){ 
               if(r.L<=L) return true; 
               if(r.D==D&&~r.O&4/*&&!(G.IsHidden(r)&3)*/) { var v = G.GetValueSimple(r,amount) * G.GetValueSimple(r,price); if(v){ sum += v; if(G.GetValueSimple(r,ver)>0) sumver += v; } }
               //if(r.D==D&&~r.O&4/*&&!(G.IsHidden(r)&3)*/) { var v = r.V[amount.VIndex] * r.V[price.VIndex]; if(v){ sum += v; if(r.V[ver.VIndex]>0) sumver += v; } }
               },!row);
            return "all: <b>"+G.NumberToString(sum,",0.##")+"</b>; verified: <b>"+G.NumberToString(sumver,",0.##")+"</b>";
            },

         //. --- subtract TotalRow1 - TotalRow2 values to TotalRow3 row ---
         monthsubtract: function(G,row,col){
            var r2 = G.GetPrev(row), r1 = G.GetPrev(r2), v1 = G.GetValue(r1,col).replace(/\#\w+/g,"").replace(/[^\d\.\;\-]/g,"").split(";"), v2 = G.GetValue(r2,col).replace(/\#\w+/g,"").replace(/[^\d\.\;\-]/g,"").split(";");
            return "all: <b style='color:"+(v1[0]-v2[0]>0?G.Colors.blue:G.Colors.red)+"'>"+G.NumberToString(v1[0]-v2[0],",0.##")+"</b>; verified: <b style='color:"+(v1[1]-v2[1]>0?G.Colors.blue:G.Colors.red)+"'>"+G.NumberToString(v1[1]-v2[1],",0.##")+"</b>";
            },

         //. --- sums all and verified results in Group and TotalRowX rows to TotalCol column ---
         fulltotal: function(G,row,col,pos){
            for(var i=1,sum=0;i<=12;i++){
               var v = G.GetValue(row,G.Cols["A"+i]); if(typeof(v)=="string"){ v = v.replace(/\#\w+/g,"").replace(/[^\d\.\;\-]/g,"").split(";"); sum += v[pos]-0||0; }
               }
            return sum;
            },

         //. --- Calculates counts of all and visible rows / columns / cells for Info cell on Toolbar ---
         rowstotal: function(G){
            var ra = G.Count("Body"), rv = G.Count("Body",15), ca = 0, cv = 0;
            for(var c in G.Cols){ ca++; if(!G.IsHidden(G.Cols[c])) cv++; }
            return "<span style='font-size:13px;'>Shown <b>"+G.NumberToString(rv,",0")+(ra!=rv?"</b> / <b>"+G.NumberToString(ra,",0"):"")+"</b> rows, <b>"+cv+(cv!=ca?"</b> / <b>"+ca:"")+"</b> columns, <b>"+G.NumberToString(rv*160/3,",0")+(rv!=ra?"</b> / <b>"+G.NumberToString(ra*160/3,",0"):"")+"</b> cells</span>";
            },

         //. --- Returns list of parent groups ---
         getgroups: function(G,row,col){
            var par = G.GetParent(row), tree = G.GetTreeCol(row); if(!par) return "";
            var pv = G.GetValue(par,col)||"", v = G.GetString(par,tree)||"";
            return pv + (pv&&v ? ", " : "") + v;
            },

         //. --- Custom AI API function, to choose which child row will be used to sort contractors by TotalCol / Amount / Price / Total / Verified columns
         setsortbychild: function(G,child){ 
            G.SortByChild = child=="Gain" ? 2 : child=="2022" ? 1 : 0; 
            }
         },

      //. --- API events assigned to this grid ---
      Events: {

         //. --- Manually updates Formula results after editing cell ---
         OnAfterSetValue: function(G,row,col,val,oval){ 
            var idx = col.id.slice(1);
            if(idx-0 && !row.Filter){ //. Amount/Price/Verified column
               var total = row.D.id=="R1" ? G.Rows.TotalRow1 : G.Rows.TotalRow2;
               var cc = G.Cols["A"+idx], c = col.id[0], V = G.GetValue(row,G.Cols["V"+idx]), P = G.GetValue(row,G.Cols["P"+idx]), A = G.GetValue(row,G.Cols["A"+idx]);
               var v = G.GetResult(total,cc); if(v==null) return;
               v = v.replace(/\#\w+/g,"").replace(/[^\d\.\;\-]/g,"").split(";"); v[0] -= 0; v[1] -= 0;
               var d = (val||0) - (oval||0);
               if(c=="A"){ v[0] += d*P; if(V) v[1] += d*P; }
               else if(c=="P"){ v[0] += d*A; if(V) v[1] += d*A; }
               else if(c=="V"){ if(val) v[1] += A*P; else v[1] -= A*P; }
               if((c=="A"||c=="P")&&row.D.id=="R1") for(var par=G.GetParent(row);par;par=G.GetParent(par)){ //. Group parents
                  //G.SetResult(par,col,c=="A" ? G.GetResult(par,col)+d : null); 
                  G.SetResult(par,G.Cols["A"+idx]); 
                  G.SetResult(par,G.Cols.TotalCol);
                  } 
               var r3 = G.GetNext(G.GetNext(row));
               G.SetResult(r3,col); G.SetResult(r3,col,null,null,"TextColor");
               G.SetResult(r3,G.Cols["T"+idx]); G.SetResult(r3,G.Cols["T"+idx],null,null,"TextColor");
               G.SetResult(r3,G.Cols.TotalCol); G.SetResult(r3,G.Cols.TotalCol,null,null,"TextColor");
               G.SetResult(total,cc,"all: <b>"+G.NumberToString(v[0],",0.##")+"</b>; verified: <b>"+G.NumberToString(v[1],",0.##")+"</b>");
               G.SetResult(G.Rows.TotalRow3,cc);
               G.SetResult(total,G.Cols.TotalCol);
               G.SetResult(G.Rows.TotalRow3,G.Cols.TotalCol);
               G.SetResult(G.Rows.TotalRow3,G.Cols.TotalCol,null,null,"TextColor");
               G.Repaint(total,1);
               G.Repaint(r3,1);
               }
            else if(col.id=="Region"||col.id=="Country"){
               G.SetResult(row,G.Cols.State,null,0,"RightIcons"); G.SetResult(row,G.Cols.State,null,0,"Button"); G.SetResult(row,G.Cols.State,null,0,"NoEdit"); 
               }
            },

         //. --- Manually updates Formula results after deleting row(s) ---
         OnDeleting: function(G,rows,del){ 
            if(rows.length>300) { G.Recalculate(); return; }
            for(var i=0;i<rows.length;i++){
               var row = rows[i]; if(row.D.id!="R1"&&row.D.id!="R2") continue;
               for(var j=1;j<=12;j++){
                  G.SetValue(row,G.Cols["A"+j],0);
                  G.SetValue(row,G.Cols["P"+j],0);
                  }
               }
            },

         //. --- Called on row copy, clears original prices and amounts, preserves only settings ---
         OnAdded: function(G,rows,par,next,action,copytype){ 
            if(action==1||action==3) return;
            G.DisableEvent("OnAfterSetValue"); //. Temporary disables the OnAfterSetValue, because the new values are not included in results
            for(var i=0;i<rows.length;i++){
               var row = rows[i]; if(row.D.id=="R3"||action==0&&row.D.id=="R1") continue;
               for(var j=1;j<=12;j++){
                  if(action==2){ G.SetValue(row,G.Cols["A"+j],0); G.SetValue(row,G.Cols["P"+j],0); }
                  G.SetValue(row,G.Cols["V"+j],row.D.id=="R2"?1:0);
                  }
               }
            G.EnableEvent("OnAfterSetValue");
            },

         //. --- Called on end dragging, moves other AX/VX/PX/TX columns when moved inside the block ---
         OnDrop: function(G,col,to,type,action,options,evt){
            if(!G.IsCol(col)||!to||!type||G.GetPart(col)!=G.GetPart(to)) return;
            var p = col.id.slice(1); if(!(p-0)) return;
            var n = type==3 ? G.GetNext(to) : G.GetPrev(to);
            if(to.id.slice(1)!=p&&(!n||n.id.slice(1)!=p)) return;
            for(var i=1;i<=12;i++){
               if(i==p) continue;
               G.Add(G.Cols[col.id[0]+i],null,type==1 ? G.Cols[to.id[0]+i] : G.GetNext(G.Cols[to.id[0]+i]),17);
               }
            G.Recalculate(); //. Recalculates ColBorder
            },

         //. --- Called on focus change to set actually focused row. Used instead of RecalcOn&1 to avoid slow recalculation of totals on focus in very large grid ---
         OnFocus: function(G,row,col){ 
            var D = row ? row.D.id : ""; if(D=="R2"||D=="R3"){ row = G.GetParent(row); D = "R1"; }
            var v = D=="R1" ? G.GetValue(row,G.Cols.Index) + ". " + G.GetValue(row,G.Cols.Name) : D=="Group" ? G.GetString(row,G.Cols.Name) : D=="TotalRow" ? "Total" : D=="Filter"||D=="R1Filter" ? "Filter" : "";
            G.SetValue(G.Toolbars.Focus,G.GetTool("Focus","Focus"),v,0,0,1);
            },

         //. --- Called to get item name for messages, adds month to data columns ---
         OnGetName: function(G,row,name){
            if(row.D.id=="Total"&&G.IsRow(row)) return G.GetString(row,G.Cols.Year);
            if(row.D.id=="Amount"||row.D.id=="Price"||row.D.id=="Total"||row.D.id=="Verified") return row.Item+". "+row.D.id;
            },

         //. --- Called before paste to modify the destination ---
         OnPaste: function(G,text,rows,cols,focus){
            var D = focus[0] ? focus[0].D.id : ""; if(D=="R2"||D=="R3") focus[0] = G.GetParent(focus[0]); //. Pastes always before the main row
            },

         //. --- Called after language was changed, updates the number formats in calculated results ---
         OnSetLanguage: function(G,style,old,init){
            if(!init) G.Recalculate();
            },

         //. --- Called after style was changed, updates the colors in calculated results ---
         OnSetStyle: function(G,style,old,init){ 
            if(!init) G.Recalculate(1); 
            },

         //. --- Called to get row for fixed scroll, returns the main row, the first in the row span ---
         OnFixedScroll: function(G,row,ds){
            while(row&&row.D.id!="R1") row = ds<0 ? G.GetPrev(row) : G.GetNext(row);
            return row;
            },

         //. --- Called after loaded configuration, to recalculate column border if moved columns
         OnLoadedCookie: function(G){
            G.Recalculate(); 
            },

         //. --- Called to get actual static (cached) instructions about this grid for AI ---
         OnAIGetStaticInstructions: function(G,ins){
            var Cols1 = [
               { id:'Index', type:'int', description:'row index from 1' },
               { id:'Panel', type:'void', description:'panel with buttons to select, delete and copy the contractor row' },
               { id:'Name', type:'string', description:'contractor surname and first name' },
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
               { id:"Since", type:"date", format:"day_of_week, day_of_month month_name full_year", description:"Date since the contractor works for us; value formatted e.g. as 'Thursday, 14th November 2019 '" },
               { id:"Calls", type:"string", description:"How often the contractor reports his results; it contains one value from defined values", values:["week","month","quarter","half year","year"] },
               { id:"Rabat", type:"int", description:"Discount the contractor uses for all deliveries; value in percent" },
               { id:"SinceMonthDay", type:"string", description:"Extracted month day number from date column 'Since'; to filter / sort / group by this part of date; the column cannot be shown" },
               { id:"SinceWeekDay", type:"string", description:"Extracted week day name from date column 'Since'; to filter / sort / group by this part of date; the column cannot be shown" },
               { id:"SinceMonth", type:"string", description:"Extracted month name from date column 'Since'; to filter / sort / group by this part of date; the column cannot be shown" },
               { id:"SinceYear", type:"string", description:"Extracted full year day from date column 'Since'; to filter / sort / group by this part of date; the column cannot be shown" },
               ];

            var Cols2 = [
               { id: "A1", name:"Amount", month:"January", type:"int", description:"Amount of orders in given month and year" },
               { id: "P1", name:"Price", month:"January", type:"float", description:"Price of individual order in given month and year" },
               { id: "T1", name:"Total", month:"January", type:"float", description:"Total price of orders in given month and year calculated as A1*P1" },
               { id: "V1", name:"Verified", month:"January", type:"boolean", description:"If the price and amount in given month and year were verified by us; shown as checkbox; value 1 or 0" },
               ];

            var Cols3 = [
               { id:"Year", type:"string", description:"Shows the detail row name '2023' in the first row, '2022' in the second row and 'Gain' in the third row" },
               { id:"TotalCol", type:"float", description:"Summary of all 12 Total values in given row" }
               ];
            var S = "## Grid description\n";
            S += "You have data grid, displayed in JavaScript component 'FastGrid', with 'contractors' (or 'vendors') in rows. ";
            S += "Every contractor row (kind = 'Contractor') has two child rows that can be collapsed or expanded. ";
            S += "Contractor columns are defined in JSON object as: "+JSON.stringify(G.AIAddColsAttrs(Cols1))+". Name column shows tree lines if the grid is grouped. ";
            S += "Cells in these columns are vertically spanned through the three contractor rows, the main row and the two children. ";
            S += "Editable columns are Name, Region, Country, State, Partner, Since, Calls and Rabat. ";
            S += "\n\n";
            S += "## Grid rows\n";
            S += "The contractors detail data are displayed in all three contractor rows, in four columns per year month, together 48 columns in the whole year. ";
            S += "The four columns in January are defined in JSON object as: "+JSON.stringify(G.AIAddColsAttrs(Cols2))+". Other columns are similarly A2, P2, T2, V2 in February up to A12, P12, T12, V12 in December. ";
            S += "The main contractor row (kind = 'Contractor') shows contractor's results in year 2023. ";
            S += "The first child row (kind = '2022') shows contractor's results in year 2022, only for compare, it is not editable and cannot be changed. AI should not offer changing '2022' values. ";
            S += "The second child row (kind = 'Gain') shows contractor's gain in every cell as value in 2023 minus value in 2022, it is not editable and cannot be changed - AI should not offer changing 'Gain' values. ";
            S += "Cells in the 'Gain' row in Verified columns can have three values: 1 (true), 0 (false), -1 (unsure). ";
            S += "Identify contractor row to the user by its name got by getname() function instead of its id. "
            S += "\n\n";
            S += "## Right side columns\n";
            S += "On grid right side there are last two columns defined in JSON object as: "+JSON.stringify(G.AIAddColsAttrs(Cols3))+". ";
            S += "The Year column is not editable, shows tree for expanding the two child rows of the contractor and always values '2023' in main contractor row, '2022' in the first child and 'Gain' in the second child. ";
            S += "The TotalCol column is not editable and shows summary of the 12 Total columns in months. ";
            S += "\n\n";
            S += "## Changing rows\n";
            S += "The not editable cells cannot by changed by API, except when adding new rows. ";
            S += "The two contractor child rows cannot be deleted without their parent contractor. Deleting contractor always deletes its children. ";
            S += "Only the contractor rows can be selected. ";
            S += "Only the contractor rows can be added and only to the grid root, regardless on grouping. "
            S += "For adding contractors by function 'addrows' you need to set 'count' parameter to 2x count of contractors, for Contractor and 2022; ";
            S += "the Gain is added automatically, but it is included in the 'addrows' return. ";
            S += "Contractors must be added or copied always with their detail grids. ";
            S += "Only one cell can be focused. ";
            S += "\n\n";
            S += "## Grouping rows\n";
            S += "The grid rows can be grouped by one or more columns from Name, Region, Country, State, Partner, Since, Calls, Rabat, SinceMonthDay, SinceWeekDay, SinceMonth, SinceYear. ";
            S += "If the row value in group column is empty (obviously in State column), the group parent is not created. ";
            S += "The group row has kind = 'Group'. The group row have editable only the main Name column where is shown cell values from the group column the group row is created by. ";
            S += "Every group row displays the grouped value (it is created for) in Name column, with tree lines. ";
            S += "Every group row displays summaries of all detail grids of all contractors in the group row' child rows. ";
            S += "The summary texts are displayed per month (only for year 2023) in Amount column as spanned cell for 4 columns Amount, Price, Total, Verified; ";
            S += "so every group row displays 12 summary texts, every with two values, one for all contractors and one for verified contractors. ";
            S += "And in right TotalCol column it displays the summary of totals. ";
            S += "The group rows cannot be selected, moved, deleted, added, copied. ";
            S += "\n\n## Pivot\n"
            S += "This grid cannot create or show pivot. If a user wants to create pivot, inform him to choose an example called 'Pivot grid' in the left menu and run it instead of this example. ";
            S += "\n\n";
            S += "## Sorting rows\n";
            S += "The rows can be sorted by one or more columns except Chart, Year, Index and Panel columns. ";
            S += "Sorting cannot move Contractors between groups. "
            S += "To fully sort all Contractors according to specific criteria, e.g. to get some top rows with maximums, it is required to ungroup the grid by calling grouprows('') first. ";
            S += "\n\n";
            S += "## Filtering rows\n";
            S += "There are three filter rows with kind = 'Filter'. The first filter row is 'Filter' and permits filtering contractors by their own cells like 'Name' or 'Since' and by the 2023 months cells. ";
            S += "Filtering by 'Country' requires also filter by 'Region' and filtering by 'State' requires also filter by 'Region' and 'Country'. "
            S += "To filter or search by region not exactly listed in available items for 'Region' (e.g. 'Asia') you should set filter for all applicable Regions and set filter by exact countries in 'Country' that belong to the requested region by their common World geography. ";
            S += "The next two filter rows permit filtering contractors by the other months rows, 'Filter2' filters by '2022' and 'Filter3' filters by 'Gain'. ";
            S += "Every filter row cell can have its value and operator to compare the value with iterated row value, e.g. for operator '>=' is row shown when row_value >= filter_value. ";
            S += "Permitted operators: '', '==', '!=', '<', '<=', '>', '>=', 'startsWith', '!startsWith', 'endsWith', '!endsWith', 'includes', '!includes', 'search' (regex), '!search' (regex). ";
            S += "Filter value in all Filter cells except boolean type can contain more values separated by semicolon to find any of them by operator == or !=. ";
            S += "Filter value in all Filter cells of number type can contain range as startnumber~endnumber to filter in the range by operator == or outside the range by operator !=. ";
            S += "Filter value in Since column can contain range as startdate~enddate to filter in the range by operator == or outside the range by operator !=. ";
            S += "Filter value in all Filter cells except boolean type can contain also more ranges and / or single values separated by semicolon to find any of them by operator == or !=. ";
            S += "The filter always affects only contractor rows. The detail rows are displayed only for visible contractors.";
            S += "\n\n";
            S += "## Grid footer rows\n";
            S += "The grid displays three not editable rows in bottom, with summaries for all contractors, similarly to group rows. The rows have kind = 'Total'. "
            S += "First row 'Total1' is summary for 2023, the second row 'Total2' is summary for 2022 and the third row 'Total3' is summary for Gain. Also with two values, one for all contractors and one for verified contractors. ";
            S += "The Total rows display the summaries in spanned cell through Amount/Price/Total/Verified as html text with all and verified summaries. ";
            S += "\n\n";
            S += "## Grid columns actions\n";
            S += "The grid columns cannot be selected, deleted, added or copied. The columns are not in tree and cannot be expanded or collapsed. "
            S += "\n\n";
            S += "## Grid layout\n";
            S += "The grid is visually split to scrollable sections called parts. "
            S += "From top to bottom the row parts are: 'Head' (contains 2 header rows), 'Head2' (contains 3 filter rows), 'Body' (contains all other rows), 'Foot' (contains 3 total rows). ";
            S += "From left to right the column parts are: 'ColsIndex' (contains Index column), 'LeftCols' (contains Panel and Name columns), "
            S += "'Cols1' (contains Region, Country, State, Partner, Since, Calls and Rabat columns), 'Cols2' (contains 48 month columns), 'RightCols' (contains Year and TotalCol columns). ";
            S += "Columns can be moved between parts, rows cannot be moved between parts. "
            S += "Columns Amount, Price, Total, Verified can be moved individually only within their month. Or the whole month with the 4 columns can be moved to any place. ";
            S += "Index column cannot be moved and no column can be moved left to the Index. "
            S += "Other columns can be move to any place, also to end of the left part. ";
            return S;
            },

         //. --- Called to get actual dynamic (not cached) instructions about this grid for AI ---
         OnAIGetDynamicInstructions: function(G,ins){
            var S = "";
            var rowcnt = 0; G.IterAll("Body",function(r){ if(r.D.id=="R1") rowcnt++; }); S += "The data grid contains "+rowcnt+" contractors. ";
            var group = G.Grouped&&G.GetGroup(); if(group) S += "The grid rows are actually grouped by columns: "+group+". ";
            var cll = G.Parts.Body.CollapseLevel;
            if(cll==null||(cll.Year==-1||cll.Year==null)&&(cll.Name==null||cll.Name==-1)) S += "The row tree is expanded to show all levels, including detail rows. ";
            else { 
               var g = group ? group.split(",") : []; 
               if(cll.Year==0&&(cll.Name==null||cll.Name==-1)) S += "The row tree is expanded to show all group levels, but collapsed detail rows. ";
               else { cll = cll.Name<0 ?  g.length+cll.Name+1 : cll.Name!=null ? cll.Name : g.length; S += "The row tree is collapsed to level "+(cll+1)+" to show groups created on '"+g[cll]+"'. "; }
               }
            var sort = G.GetSort(); if(sort) S += "The grid rows are actually sorted by columns: "+sort+" (if the column has '-' before name, it means descending sort). ";
            var lock = G.GetLock(1); if(lock.length) S += "There are actually locked some actions in grid: "+lock.join(", ")+". The locks can be changed in locks options dialog. ";
            var filters = G.AIGetFilter(); 
            if(filters) S += "The grid rows are actually filtered by filters (JavaScript code where column name is used as variable, the row is visible if the filter condition is fulfilled): "+filters+". ";
            S += "Strings for filter are compared case "+(G.FilterCaseSensitive?"":"in")+"sensitive - users can change it in filter options dialog. ";
            return S;
            }

         },

      //. --- Grid configuration ---
      Cfg: {
         id:"Spans",       //. Grid id
         AutoCookie:1+8+16,//. Loads saved configuration on start, but the changed configuration must be saved manually
         ResetCookie:1,    //. Permits resetting configuration to defaults
         CheckChangesCookie:1, //. Updates Cookies toolbar butttons LoadCookie / SaveCookie on change
         Version:2,        //. Clears all previously saved configuration with different layout version
         Style:"Beige",    //. Presets Beige style
         ResizingTag:3,    //. Permits resizing main tag in both directions
         IndexList:1,      //. List is set by index instead of key, to shorten the data by using only numbers
         SelectAllType:2+16, //. Shows the number of selected rows in the header select button
         ExpandDigits:-1,  //. Shows only + / - instead of number of children on expand button, because of the large amount of rows in grid
         FilterTree:2,     //. Sets filtering in tree as Show all found. If some row fulfills the condition, all its parents are shown too = shows the group rows that are always filtered out
         HideZero:1,       //. Shows empty cell instead of 0
         LevelsCollapse:1, //. Levels button collapses all levels instead of only its level
         MoveRowType:1,    //. Shows drag icons during moving rows on the index column instead of tree column
         RowTree:2,        //. Permits showing row tree level in different columns per row
         RecalcOn:32,      //. Recalculates toolbars on expand / collapse to update the count of visible rows / cells in the Info cell
         NoRecalc:1,       //. Speed up. Because of huge grid the recalculating of Complex formulas in grid is done manually in OnAfterSetValue / OnDeleting events
         FastOverflow:1,   //. Speed up. The cell multi line text is overflown to the whole lines and it never shows partially cut off text
         BlockSpan:2+8,    //. Speed up. Block is used only for spanned columns, because spanned rows are in tree and parent with children is automatically one block
         CheckCrossSpan:0, //. Speed up. Disables checking crossing row and column span to speed up span initialization
         NoHideRowSpan:1,  //. Speed up. This grid never hides main row in row span without hiding other rows in the row span, so it needs not checking this case. For this setting it is restricted hiding 2023 rows in Year Filter.
         RowHeight:22,     //. Predefined height in pixels for all rows in grid without Height attribute set
         RowChanges:7,     //. Marks changed only cell values and added / deleted rows
         FixedScroll:1, FixedScrollType:2, //. When scrolling vertically by larger amount, it rounds scroll to the row height. Uses OnFixedScroll event where this example fixes the scroll on the main rows, the first in row span
         SettingsMenu:"ShowDeletedRows,HideZero,-,Hover,Focus,Undo,TipValue,-,Language,Style,Scrollbars,FixedScroll,TextSize,RowHeight,IconZoom,Zoom,Animate,RowBorder,ColBorder,RowAlternate,SaveCookie", //. Items in configuration menu
         LocksMenu:"Edit,Rows,Cols,Resize,Collapse,View,Settings,Data,Cookies,Search,Toolbars,Copy,PrintPdf,Export,Reload,Save,Undo,AI", //. List of available locks for the grid features
         CopyHtml:1,                                        //. Copies to clipboard also html, values with Format
         CopyStyles:"Align,VertAlign,Wrap,Border,Color,TextColor,TextStyle,Calculated,Html,RowAttr,ColAttr,CellAttr,ColorBorder,DefaultBorder,Bool", //. What styles copies to clipboard
         CopySizes:"Width,Height,RowSpan,ColSpan",          //. What sizes copies to clipboard
         CopyPasteRowsType:"Parents,Children,Block",        //. Copies to clipboard also group rows and if focused row, it copies also child rows
         CopyMenu:"Html,Color,State,TextStyle,CellHtml,Align,VertAlign,Border,DefBorder,Span,-,Items,Layout,HiddenCols,FilteredRows,CollapsedRows,ParentRows,ChildrenRows", //. Items in menu for toolbar cell Copy
         MaxCopySpan:30000,                                 //. Maximum copied spanned cells before it shows warning. Increases the limit, because there is a lot of row spanned cells in one row and it does not slow MS Excel too much
         ExportStyles:"Align,VertAlign,Wrap,Border,Color,TextColor,TextStyle,Calculated,Html,RowAttr,ColAttr,CellAttr,ColorBorder,DefaultBorder,Bool,Tree", //. What styles exports to xlsx
         ExportSizes:"Width,Height,RowSpan,ColSpan",        //. What sizes exports to xlsx
         ExportRowsType:"Parents,Children,Block",           //. Exports also group rows and child rows if exports selected / focused rows
         ExportMenu:"File,Format,-,Html,Color,State,TextStyle,CellHtml,Align,VertAlign,Border,DefBorder,Span,Tree,Separator,Style,-,Items,Layout,HiddenCols,FilteredRows,CollapsedRows,ParentRows,ChildrenRows", //. Items in Export menu
         PrintMenu:"PageSize,PageLandscape,MarginWidth,MarginHeight,FitPage,Pages,Size,-,Items,Layout,HiddenCols,FilteredRows,CollapsedRows,ParentRows,ChildrenRows", //. Items in Print menu
         PdfMenu:"File,-,PageSize,PageLandscape,MarginWidth,MarginHeight,FitPage,Pages,Size,-,Items,Layout,HiddenCols,FilteredRows,CollapsedRows,ParentRows,ChildrenRows", //. Items in Print PDF menu
         SearchAction:"Focus,ColorCells,ColorRows",         //. Search focuses the found cell from start and colors the found cells and rows
         SearchOptions:"Index,ColorBlock,NoGroup",          //. Prefers row index in search, colors the whole row block on find, does not search in group columns
         SearchFocusCol:"Name",                             //. Focuses cell in Name column in found row
         SearchCols:"-,Index,Name,Region,Country,State",    //. Predefined columns to search in
         SearchRows:"-",                                    //. Does not search in totals by default
         GroupExclude:"|",                                  //. Does not create group rows for empty value
         PasteFillRows:0, PasteAddRows:2,                   //. Pastes as new rows added before focused row
         PasteFillCols:3, PasteAddCols:0,                   //. Pastes the whole rows to all columns from start
         CopyPasteInternal:1,                               //. Copy & paste is done via clipboard and also internally inside the grid with all settings
         PdfUrl: "http://localhost:8000/Pdf.js?func=getpdf",//. PDF export is run on separate node server located in ./server/
         PdfHtml:3,                                         //. Sends to server whole html with full layout, including Script and Events functions
         SaveUrl: { Data:{ IO: { Message:"This example does not save changes to server.<br>Now the changes are accepted like they were saved." }} }, //. Simulated save
         //@ IgnoreF:1,                                                                                    //. Set it to 1 to ignore all Fx fast attributes and behave normally and slower with only standard cell attributes
         },
      AI:{
         StaticInstructions:"",  //. To avoid generating default static instructions
         DynamicInstructions:"", //. To avoid generating default dynamic instructions
         //. Sample input history to demonstrate various AI tasks
         InputHistory: "|-|What is in table?|What can you do?"
                     + "|What is the highest value in Amount in January?|What is the highest Price?"
                     + "|What is the total price of vendors registered after year 2011 in Brazil?"
                     + "|What is the most common surname?"
                     + "|Select all contractors from Countries starting by B|Choose all vendors from countries in Asia|Select contractors registered after 2/1/2014"
                     + "|Mark and focus the highest and lowest not zero values in Amount columns"
                     + "|Double values in Amount columns|Add 3 months to dates in America"
                     + "|Set February prices in Canada to 1,234.56|Change all rows with surname James to surname Nulland"
                     + "|Set all contractors data verified|Set all vendors data as not verified and next select all vendors that were changed in every month"
                     + "|Change Brazil to Germany in all contractors"
                     + "|Delete all contractors from Europe|Delete all rows"
                     + "|Add 100 vendors to Berlin|Add 10000 contractors and fill their data with meaningful random values, including their details"
                     + "|Copy contractors from USA below the sources each|Copy contractors from Brazil, with values in main rows and empty details"
                     + "|Show only Wisconsin|Show dates between 10/1/2005 and 7/6/2010|Show only names with are least 20 characters|Filter and mark all Amounts less than -20 or higher than 40"
                     + "|Group by month from Since|Sort by Total Gain descending"
                     + "|Hide Amount and Price|Move March to the left section|Undo it"
                     + "|Export data to xlsx",

         APIFunctions: { //. Description of custom AI API functions. The custom JavaScript functions are defined in Script.
            setsortbychild: { 
               Param:"child", Use:"Do",
               Desc:"sets if the Contractor itself or which its child row will be used for sorting by right column Total and by data columns Amount, Price, Total, Verified; "
                  + "'child can be '2023', '2022' or 'Gain'; by default is sorted by '2023' as the Contractor row itself"
               } 
            }
         },
      Format: { //. Custom colors
         fd: "MM/dd/yy",     //. Date format for FT, value 10, used for Since column
         nfg:",0.##",        //. Number format for FT, value 5, used for Amount, Price and Total columns and TotalCol column
         nfp:"0.##\\%",      //. Number format for FT, value 8, used for Rabat column
         },
      Locks: { Data:"Data" }, LockNames: { Data:"Restrict choosing data set" }, //. Custom Lock names
      Styles: {
         Base: { Colors: { red:"red", green:"#080", blue:"blue", gray:"#AAA", dark:"black" } },
         White: { Colors: { } },
         Dark: { Colors: { red:"#C66", green:"#0B0", blue:"#0BB", gray:"#888", dark:"#BBB", outer:"#555" } },
         Black: { Colors: { red:"#C66", green:"#0A0", blue:"#0AA", gray:"#888", dark:"#AAA", outer:"#555" } },
         },
      Cookie: {
         Rows:"First,Height,CS,Mirror", //. Saves Height to DefRows, CS with Mirror cells, iterates only first page in every part
         RowParts:"-",
         Parts: { Body: "Sort,Group,Filter,Height,Alternate,AlternateCount,CollapseLevel", Head2:"CollapseLevel", Foot:"CollapseLevel" } //. Defines the Cookie only for Body part instead of all Row parts
         },
      RowParts: [
         { id:"TopScroll", Hidden:0 },
         { id:"Head2", Prev:"Head", Rel:100000, MinHeight:70, MinHeightResize:0 },
         { id:"Head3", Prev:"Head2" }
         ],
      ColParts: [
         { Clear:1 },
         { id:"LeftScroll", Type:"Scroll", Item:"$ItemLeftScroll" },
         { id:"ColsIndex", Type:"Cols", NoResize:1, ExportFixed:1 },
         { id:"LeftCols", Type:"Cols", Rel:100000, MinWidth:180, MinWidthResize:21, MaxWidth:500, ExportFixed:1 },
         { id:"Cols1", Type:"Cols", Rel:2, MinWidth:80, MinWidthResize:21 },
         { id:"Cols2", Type:"Cols", Rel:2, MinWidth:80, MinWidthResize:21 },
         { id:"RightCols",Type:"Cols", Rel:100000, MinWidth:70, MinWidthResize:21, MaxWidth:500 },
         { id:"RightScroll",Type:"Scroll", Item:"$ItemRightScroll" }
         ],
      DefCells: {
         Base: { ColBorderFormula:"return Row.D.id!='Header'&&Col.Block&&(Grid.GetPrev(Col)||{}).Block!=Col.Block ? 'outer,' : ''" }, //. Calculates left border in every month block
         Cell: { }, //. Defined to use Base to all cells
         R1Base: { SortValueFormula:"!Grid.SortByChild ? null : Grid.GetValue(Grid.SortByChild==2 ? Grid.GetLastChild(Row) : Grid.GetFirstChild(Row),Col)" },
         R1State: { RightIconsFormula:"Grid.GetList(Row,Col)?'List':''", ButtonFormula:"Grid.GetList(Row,Col)?'List':''", NoEditFormula:"Grid.GetList(Row,Col)?0:2"  },
         R1SinceWeekDay: { SortValueFormula:"new Date(Grid.GetValue(Row,Grid.Cols.Since)).getUTCDay()" },
         R1SinceMonth: { SortValueFormula:"var v=new Date(Grid.GetValue(Row,Grid.Cols.Since)).getUTCMonth();return v<10?'0'+v:v;" },
         R1Year: { Value:2023 }, 
         R2Year: { Value:2022 },
         R3Year: { Value:"Gain" }, //. Amount column in R3 rows
         R3Base: {  //. Amount / Price / Total columns in R3 rows
            ValueFormula:"Grid.GetNumber(Grid.GetParent(Row),Col) - Grid.GetNumber(Grid.GetPrev(Row),Col)",
            TextColorFormula:"CValue>0?Grid.Colors.blue:CValue<0?Grid.Colors.red:Grid.Colors.gray",
            },
         R1A: { D:"R1Base" }, R1P: { D:"R1Base" }, R1T: { D:"R1Base" }, R1TotalCol: { D:"R1Base" },
         R3A: { D:"R3Base" }, R3P: { D:"R3Base" }, R3T: { D:"R3Base" }, R3TotalCol: { D:"R3Base" },
         R3V: { ValueFormula:"[0,-1,1][Grid.GetNumber(Grid.GetParent(Row),Col) + Grid.GetNumber(Grid.GetPrev(Row),Col)]" }, //. Verified column in R3 rows
         TA: { Type:"Html", Align:2 },
         T1A: { D:"TA", ValueFormula:"Grid.Script.monthtotal(Grid,null,Col,'R1')" },
         T2A: { D:"TA", ValueFormula:"Grid.Script.monthtotal(Grid,null,Col,'R2')" },
         T3A: { D:"TA", ValueFormula:"Grid.Script.monthsubtract(Grid,Row,Col)" },
         FilterV: { LeftIcons:"", Range:0 },
         Filter2V: { LeftIcons:"", Range:0 },
         Filter3V: { LeftIcons:"", Range:0, BoolCycle:2 },
         GA:  { D:"TA", ValueFormula:"Grid.Script.monthtotal(Grid,Row,Col,'R1')" },
         GPanel: { LeftIcons:"DeleteRow" },
         GIndex: { NoSearch:1 },
         GName: { Wrap:0 },
         GRegion: { NoEdit:1 },
         H2A: { Align:2, SortColFormula:"'T'+Col.id.slice(1)" }
         },
      DefRows: {
         Row: { },
         R: { Tree:"Year", Accept:"", DHeight:1, ResizeHeight:1 },
         R1: { D:"R", DA:"R1", AIKind:"Contractor", NoSelect:0, Block:"B1", RS:{ Index:3, Panel:3, Name:3, Region:3, Country:3, State:3, Partner:3, Since:3, Calls:3, Rabat:3, SinceMonthDay:3, SinceWeekDay:3, SinceMonth:3, SinceYear:3 },
            //@ FV: { Amount:0, Price:0, Total:1, Verified:0, Col:0, Location:0, Year:8, TotalCol:1, Index:0 },
            //@ FT: { Amount:5, Price:5, Total:5, Verified:15, Name:1, Region:20, Country:24, State:24, Partner:15, Since:10, Calls:20, Rabat:8, Year:0, TotalCol:5, Index:4 },
            //@ FS: { Amount:1, Price:1, Total:1+256, Verified:2+32, Col:0, Since:1, Rabat:1, Year:1+32+256, TotalCol:1+256, Name:8, Location:8, Calls:8, Index:1+64+256 },
            //@ FA: { Amount:0, Price:0, Total:0, Verified:0, Col:0, Location:256, Since:256, Calls:256, Index:0 },
            //@ FE: 1+2+32+64
            },
         R2: { D:"R", DA:"R2", AIKind:"2022", NoSelect:8, L:1, TextColor:"gray", NoIndex:1, NoEdit:1, 
            //@ FV: { Amount:0, Price:0, Total:1, Verified:0, Col:0, Location:0, Year:8, TotalCol:1 },
            //@ FT: { Amount:5, Price:5, Total:5, Verified:15, Col:0, TotalCol:5 },
            //@ FS: { Amount:1, Price:1, Total:1, Verified:2+32, Col:0, Since:1, Rabat:1, Year:1+32+256, TotalCol:1 },
            //@ FE: 1+2+32+64
            },
         R3: { D:"R", DA:"R3", AIKind:"Gain", NoSelect:8, L:1, NoIndex:1, NoEdit:1, Formula:"", RowBorder:",outer", NoSave:1,
            //@ FV: { Amount:1+8, Price:1+8, Total:1+8, Verified:1+8, Col:0, Location:0, Year:8, TotalCol:1+8 },
            //@ FT: { Amount:5, Price:5, Total:5, Verified:15, Col:0, TotalCol:5 },
            //@ FS: { Amount:1+32+256, Price:1+32+256, Total:1+32+256, Verified:2+32, Col:0, Since:1, Rabat:1, Year:1+32+256, TotalCol:1+32+256 },
            //@ FE: 1+2+32+64
            },
         Header: { Height:25, Item:"Headers" },
         TotalRow: { Tree:"Year", AIKind:"Total", NoEdit:1, NoIndex:1, CS: { Region:11 }, NoSelect:3, NoSearch:1, NoDelete:1, Item:"Totals" },
         Filter: { MinHeight:18, Range:1 },
         R1Filter: { D:"Filter,R1" },//, FV:-1, FT:-1, FS:-1, FA:-1 },
         Group: { DA:"G", CD:"R1", Accept:"Row,R1", AIKind:"Group", Color:"group", Formula:"", DHeight:1, F: { TotalCol:"Grid.Script.fulltotal(Grid,Row,Col,0)", Region:"Grid.Script.getgroups(Grid,Row,Col)" }, 
            NoCalc:1, NoIndex:1, NoFilterRow:2, NoSelect:1, NoEdit:1, NoMove:1, NoPaste:2, 
            A: { Region: { TextColor:"gray", Mirror:3, MirrorRow:"GroupChildren", Color:"group" }, Country: { Mirror:3, MirrorRow:"GroupChildren", Color:"group" }, State: { Mirror:3, MirrorRow:"GroupChildren", Color:"group" } }, //. For sorting
            CS: { Region:7, A1:4,  A2:4, A3:4, A4:4, A5:4, A6:4, A7:4, A8:4, A9:4, A10:4, A11:4, A12:4 }, DCS:1,
            //@ FV: { Amount:1+8, Price:0, Total:0, Verified:0, Col:0, Location:0, Year:8, Name:8, Region:1+8, TotalCol:1+8, Index:32 },
            //@ FT: { Amount:2, Price:3, Total:3, Verified:3, Col:3, TotalCol:5, Name:31, Region:2, Index:3 },
            //@ FS: { Amount:2+32+64, Region:64+256, Col:64, Location:64, TotalCol:64+256, Index:1+64 },
            //@ FA: { Amount:0, Region:0, Col:0, TotalCol:0, Index:0, Name:256 },
            //@ FE: 1+2+32+64
            },
         },
      Head: [
         { id:"Header2", D:"Header", DA:"H2", Wrap:4, Index:0, LevelsPart:"Head2,Body,Foot", 
            V: { Name:"Name", Region:"Region", Country:"Country", State:"State or\nProvince", Partner:"Partner", Since:"Since", Calls:"Calls per", Rabat:"Rabat", Year:"Year", TotalCol:"Total", SinceMonthDay:"Since Day", SinceWeekDay:"Since Weekday", SinceMonth:"Since Month", SinceYear:"Since Year" }, 
            A: { Panel: { LeftIcons:"SelectRows,DeleteRows",IconWrap:1 }, Rabat:{ Rotate:290, Align:2 }, Partner: { Rotate:290, PaddingLeft:0, PaddingRight:0, Align:2 } },
            RS: { Index:2, Panel:2, Name:2, Region:2, Country:2, State:2, Partner:2, Since:2, Calls:2, Rabat:2, Year:2, TotalCol:2, SinceMonthDay:2, SinceWeekDay:2, SinceMonth:2, SinceYear:2 } 
            },
         { id:"Header", D:"Header" }
         ],
      Head2: [
         { id:"Filter", D:"R1Filter", DA:"Filter", AIKind:"Filter", Block:3, L:0, FilterD:"R1", FilterBlock:1, FilterAction:1, DefaultFilter:1, NoSelect:3, Item:"Filters",
            A: { 
               Panel: { D:"FilterAction" },
               Name: { DefaultFilter:11 },
               Partner: { LeftIcons:"", Range:0 }, 
               Region: { LeftIcons:"" }, 
               Country: { LeftIcons:"", D:"R1State" }, 
               State: { LeftIcons:"", D:"R1State" }, 
               Since: { LeftIcons:"Filter,Date", RightIcons:"", Wrap:2, IconWrap:3 },
               Calls: { LeftIcons:"" },
               Rabat: { IconWrap:4, IconVertAlign:0 },
               Year: { Value:"", LeftIcons:"", RightIcons:"List", Button:"List", TextColor:"dark", Wrap:1, FilterBlock:0, FilterD:"", VertAlign:0, ListMenu:[ "*FilterOff", "-" , { id:2023, V:[2023,1], NoEdit:1 }, "2022", "Gain" ] }
               },  
            RS: { Year:3, Panel:1 }
            },
         { id:"Filter2", D:"Filter", DA:"Filter2", L:1, Tree:"Year", FilterD:"R2", FilterBlock:1, FilterAction:1, DefaultFilter:1, Item:"Filters", A: { Panel: { D:"FilterAction" } } },
         { id:"Filter3", D:"Filter", DA:"Filter3", L:1, Tree:"Year", FilterD:"R3", FilterBlock:1, FilterAction:1, DefaultFilter:1, Item:"Filters", A: { Panel: { D:"FilterAction" } } },
         ],
      Head3: [
         { id:"Sticky", D:"Sticky", CS: { Region:7 }, ColBorder:"group", Type:"String", A: { Name: { Static:1, ColBorder:"" }, Region: { RightIcons:"", Button:"" } } }, //. Shows parent values when parent moved above body top, for grouped grid
         ],
      Head3_Cfg: { BorderColorLeftCols:",group", BorderColorCols1:",group", BorderColorCols2:",group", OverlayParts:"LeftCols,Cols1,Cols2,RightCols" },
      Foot: [
         { id:"TotalRow1", D:"TotalRow", DA:"T1", Block:3, Formula:"", F: { TotalCol:"Grid.Script.fulltotal(Grid,Row,Col,0)" }, 
            V: { Name:"Total", Year:2023 }, CS: { A1:4,  A2:4, A3:4, A4:4, A5:4, A6:4, A7:4, A8:4, A9:4, A10:4, A11:4, A12:4 }, RS: { Index:3, Panel:3, Name:3, Region:3 },
            A: { Panel: { LeftIcons:"" }, TotalCol: { TextStyle:1, TextColor:"dark" } } 
            },
         { id:"TotalRow2", D:"TotalRow", DA:"T2", L:1, TextColor:"gray", Formula:"", F: { TotalCol:"Grid.Script.fulltotal(Grid,Row,Col,0)" }, 
            V: { Year:2022 }, CS: { A1:4,  A2:4, A3:4, A4:4, A5:4, A6:4, A7:4, A8:4, A9:4, A10:4, A11:4, A12:4 },
            A: { TotalCol: { TextStyle:1 } } 
            },
         { id:"TotalRow3", D:"TotalRow", DA:"T3", L:1, Formula:"",F: { TotalCol:"Grid.Script.fulltotal(Grid,Row,Col,0)" }, NoSelect:3, NoSearch:1, Tree:"Year", 
            CS: { A1:4,  A2:4, A3:4, A4:4, A5:4, A6:4, A7:4, A8:4, A9:4, A10:4, A11:4, A12:4 }, 
            A: { Year: { Value:"Gain" }, TotalCol: { TextStyle:1, TextColorFormula:"CValue>0?'blue':CValue<0?'red':'dark'" } }   
            },
         ],
      DefCols: {
         Base: { Item:0 },
         Number: { Type:"Number", ResizeWidth:1, DWidth:1, Format:",0.##", ExportFormat:"#,0", NoPaste:1 },
         Location: { Type:"String", RightIcons:"List", Button:"List", Wrap:2, IndexList:1, Item3:"Location" }, 
         Amount:  { DA:"A", D:"Number", Item1:"A", Width:60, UCode:0x08, V:{ Header:"Amount" }, CS: { Header2: 4 } },
         Price:   { DA:"P", D:"Number", Item1:"P", Width:70, UCode:0x807, V:{ Header:"Price" } },
         Total:   { DA:"T", D:"Number", Item1:"T", Width:90, V: { Header:"Total" }, NoEdit:1, TextColor:"green" },
         Verified:{ DA:"V", Type:"Bool", Item1:"V",Width:60, ResizeWidth:1, DWidth:1, UCode:0x0B, NoPaste:1, V:{ Header:"Verified" } },
         SincePart: { Type:"String", NoEdit:1, Hidden:1 }
         },
      ColsIndex: [
         { id:"Index", D:"Index", DA:"Index", Wrap:3, NoExport:0, Item:"", Item2:-1 }, //, FV:0, FT:4, FS:1+64+256, FA:0 },
         ],
      LeftCols: [
         { id:"Panel", D:"Panel", DA:"Panel", LeftIcons:"SelectRow,DeleteRow,AddRow", IconWrap:1, Width:25, Item2:"Buttons" },
         { id:"Name", DA:"Name", UCode:0xD1, UIndex:30, Type:"String", Wrap:2, Width:120, GroupWidth:220, Names:1, Item2:-1 }, //. Surname is in Texts, first name in UTexts
         ],
      Cols1: [
         { id:"Region", D:"Location", UCode:0x08, UIndex:24.5, DA:"Region", ClearCells:"Country,State", Width:125, 
            List:"|Central & South Asia|East Asia & the Pacific|East Europe|Middle East & North Africa|North & Central America|South America|Sub-Saharan Africa|West Europe" },
         { id:"Country", D:"Location", UCode:0x08, UIndex:25.1, DA:"Country", ListRelated:"Region", ClearCells:"State", Width:110, SortList:1, List: [
            "|Armenia|Azerbaijan|Bangladesh|India|Kazakstan|Pakistan|Sri Lanka", 
            "|Australia|Brunei|China|Hong Kong|Indonesia|Japan|Korea, dpr|Malaysia|Mongolia|Myanmar|New Zealand|Papua New Guinea|Philippines|Singapore|South Korea|Taiwan|Thailand|Vietnam", 
            "|Albania|Belarus|Bulgaria|Croatia|Czech Republic|Estonia|Hungary|Latvia|Lithuania|Moldova|Poland|Romania|Russia|Serbia-Montenegro|Slovak Republic|Slovenia|Ukraine", 
            "|Algeria|Bahrain|Egypt|Iran|Iraq|Israel|Jordan|Kuwait|Lebanon|Libya|Morocco|Oman|Qatar|Saudi Arabia|Syria|Tunisia|UAE|Yemen", 
            "|Bahamas|Canada|Costa Rica|Cuba|Dominican Republic|El Salvador|Guatemala|Haiti|Honduras|Jamaica|Mexico|Nicaragua|Panama|Trinidad & Tobago|United States", 
            "|Argentina|Bolivia|Brazil|Chile|Colombia|Ecuador|Guyana|Paraguay|Peru|Suriname|Uruguay|Venezuela", 
            "|Angola|Botswana|Burkina Faso|Cameroon|Congo|Congo dr|Cote d'Ivoire|Ethiopia|Gabon|Gambia|Ghana|Guinea|Guinea-Bissau|Kenya|Liberia|Madagascar|Malawi|Mali|Mozambique|Namibia|Niger|Nigeria|Senegal|Sierra Leone|Somalia|South Africa|Sudan|Tanzania|Togo|Uganda|Zambia|Zimbabwe", 
            "|Austria|Belgium|Cyprus|Denmark|Finland|France|Germany|Greece|Iceland|Ireland|Italy|Luxembourg|Malta|Netherlands|Norway|Portugal|Spain|Sweden|Switzerland|Turkey|United Kingdom"
            ]},
         { id:"State", D:"Location", UCode:0x01, UIndex:26, DA:"State", ListRelated:"Region,Country", Width:90, SortList:1, List: {
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
         { id:"Partner", UCode:0x0B, UIndex:25, Type:"Bool", Width:25, Item3:-1, ShortColBorder:0 },
         { id:"Since", UCode:FGrid.GetUCode(2,1,12,1,0,0,0,Date.UTC(2020,1,1)), UIndex:28, Width:95, Type:"Date", Wrap:2, Format:"MM/dd/yy", EditFormat:"M/d/yyyy", RightIcons:"Date", Item3:-1 },
         { id:"Calls", UCode:0x0D, UIndex:24, Type:"Auto", Wrap:2, Width:85, IndexList:1, RightIcons:"List", Button:"List", List:"|week|month|quarter|half year|year", Item3:-1 },
         { id:"Rabat", UCode:0x01, UIndex:27, Type:"Number", Format:"0.##\\%", ExportFormat:"General\\%", Width:35, Item3:-1 },
         //. Hidden columns with parsed Since date, usable for grouping, sorting or filtering by AI
         { id:"SinceWeekDay", D:"SincePart", Formula:"Grid.DateToString(Since,'dddd')", Item2:"Since Weekday", DA:"SinceWeekDay" },
         { id:"SinceMonthDay", D:"SincePart", Formula:"Grid.DateToString(Since,'dd')", Item2:"Since Day" },
         { id:"SinceMonth", D:"SincePart", Formula:"Grid.DateToString(Since,'MMMM')", Item2:"Since Month", DA:"SinceMonth" },
         { id:"SinceYear", D:"SincePart", Formula:"Grid.DateToString(Since,'yyyy')", Item2:"Since Year" }
         ],
      Cols2: [
         { id:"A1",  D:"Amount", UIndex:0.1,  Item:1,  V: { Header2:"January" } },  { id:"P1",  D:"Price", UIndex:1,  Item:1 },  { id:"T1",  D:"Total", Item:1,  Formula:"A1*P1" },   { id:"V1",  D:"Verified", UIndex:0,  Item:1 },
         { id:"A2",  D:"Amount", UIndex:2.1,  Item:2,  V: { Header2:"February" } }, { id:"P2",  D:"Price", UIndex:3,  Item:2 },  { id:"T2",  D:"Total", Item:2,  Formula:"A2*P2" },   { id:"V2",  D:"Verified", UIndex:2,  Item:2 },
         { id:"A3",  D:"Amount", UIndex:4.1,  Item:3,  V: { Header2:"March" } },    { id:"P3",  D:"Price", UIndex:5,  Item:3 },  { id:"T3",  D:"Total", Item:3,  Formula:"A3*P3" },   { id:"V3",  D:"Verified", UIndex:4,  Item:3 },
         { id:"A4",  D:"Amount", UIndex:6.1,  Item:4,  V: { Header2:"April" } },    { id:"P4",  D:"Price", UIndex:7,  Item:4 },  { id:"T4",  D:"Total", Item:4,  Formula:"A4*P4" },   { id:"V4",  D:"Verified", UIndex:6,  Item:4 },
         { id:"A5",  D:"Amount", UIndex:8.1,  Item:5,  V: { Header2:"May" } },      { id:"P5",  D:"Price", UIndex:9,  Item:5 },  { id:"T5",  D:"Total", Item:5,  Formula:"A5*P5" },   { id:"V5",  D:"Verified", UIndex:8,  Item:5 },
         { id:"A6",  D:"Amount", UIndex:10.1, Item:6,  V: { Header2:"June" } },     { id:"P6",  D:"Price", UIndex:11, Item:6 },  { id:"T6",  D:"Total", Item:6,  Formula:"A6*P6" },   { id:"V6",  D:"Verified", UIndex:10, Item:6 },
         { id:"A7",  D:"Amount", UIndex:12.1, Item:7,  V: { Header2:"July" } },     { id:"P7",  D:"Price", UIndex:13, Item:7 },  { id:"T7",  D:"Total", Item:7,  Formula:"A7*P7" },   { id:"V7",  D:"Verified", UIndex:12, Item:7 },
         { id:"A8",  D:"Amount", UIndex:14.1, Item:8,  V: { Header2:"August" } },   { id:"P8",  D:"Price", UIndex:15, Item:8 },  { id:"T8",  D:"Total", Item:8,  Formula:"A8*P8" },   { id:"V8",  D:"Verified", UIndex:14, Item:8 },
         { id:"A9",  D:"Amount", UIndex:16.1, Item:9,  V: { Header2:"September" } },{ id:"P9",  D:"Price", UIndex:17, Item:9 },  { id:"T9",  D:"Total", Item:9,  Formula:"A9*P9" },   { id:"V9",  D:"Verified", UIndex:16, Item:9 },
         { id:"A10", D:"Amount", UIndex:18.1, Item:10, V: { Header2:"October" } },  { id:"P10", D:"Price", UIndex:19, Item:10 }, { id:"T10", D:"Total", Item:10, Formula:"A10*P10" }, { id:"V10", D:"Verified", UIndex:18, Item:10 },
         { id:"A11", D:"Amount", UIndex:20.1, Item:11, V: { Header2:"November" } }, { id:"P11", D:"Price", UIndex:21, Item:11 }, { id:"T11", D:"Total", Item:11, Formula:"A11*P11" }, { id:"V11", D:"Verified", UIndex:20, Item:11 },
         { id:"A12", D:"Amount", UIndex:22.1, Item:12, V: { Header2:"December" } }, { id:"P12", D:"Price", UIndex:23, Item:12 }, { id:"T12", D:"Total", Item:12, Formula:"A12*P12" }, { id:"V12", D:"Verified", UIndex:22, Item:12 },
         ],
      RightCols: [
         { id:"Year", DA:"Year", Type:"String", NoEdit:1, Align:1, Width:85, TextColor:"gray", NoSortBy:1, NoGroupBy:1, Item2:-1 },
         { id:"TotalCol", DA:"TotalCol", Type:"Number", Formula:"T1+T2+T3+T4+T5+T6+T7+T8+T9+T10+T11+T12", Format:",0.##", ExportFormat:"#,0", NoEdit:1, Width:115, TextColor:"green", Item2:-1, Name:"Total" }
         ],
      Body_Cfg: {
         GroupTree:"Name", Group:"Region,Country,State", CD:"R1", Par:"P1,P2", HoverCol:["Body","Head2"], FocusCol:["Body","Head2"], 
         BorderColor:",,outer,", BorderColorLeftScroll:"", BorderColorRightScroll:"", ScrollOnDrag:"",
         StickyRow:"Sticky", StickyCol:"Name",
         },
      TopScroll_Cfg: { ScrollOnDrag:"1,-4000%,Body" },
      Head_Cfg: { HoverCol:["Body","Head2"], FocusCol:["Body","Head2"], ScrollOnDrag:"0.5,-400%,Body,1,-50%,Body" },
      Head2_Cfg: { HoverCol:["Body","Head2"], FocusCol:["Body","Head2"], Accept:"", ScrollOnDrag:"1,-3,Body" },
      Foot_Cfg: { HoverCol:["Body","Head2","Head","Foot"], FocusCol:["Body","Head2","Head","Foot"], ScrollOnDrag:"-0.33,400%,Body,-0.66,50%,Body,-1,3,Body" },
      BottomScroll_Cfg: { ScrollOnDrag:"-1,4000%,Body" },
      Blocks: {
         B1: [ { }, { D:"R2" }, { D:"R3", Add:1 } ],
         },
      Actions: {
         OnClickAddRow:"AddRow(0,0,3)",
         OnClickDeleteRows:"DeleteRows(1,1,3)",
         OnClickDeleteRow:"DeleteRow(0,1,3)"
         },
      Text: {
         $ConfirmDelete: "Do you want to delete {Count>3 ? '<b>'+Math.floor(Count/3)+'</b> selected contractors' : 'contractor <b>'+Name+'</b>'}?",
         $Item1: "January", $Item2: "February", $Item3: "March", $Item4: "April", $Item5: "May", $Item6: "June", $Item7: "July", $Item8: "August", $Item9: "September", $Item10: "October", $Item11: "November", $Item12: "December", 
         $ItemA: "Amount", $ItemP:"Price", $ItemT:"Total", $ItemV:"Verified", $ItemCaptionC:"Months", $ItemCaptionC1:"Month values", $ItemCaptionC2:"Base columns", $ItemCaptionC3:"Suplement columns",
         },
      Dialogs: { Layout: { Script: { Options:16, Grouped:2 } } },  //. Permits hiding individual columns from block in the Layout menu and shows Grouped column in Base columns
      DefTools: { Drag: { MinWidth:50, MaxWidth:110 } }, //. Increases minimal width of the grouped column caption on toolbar
      Top: [
         { id:"Focus", Cells:[ { id:"Focus", D:"Focus", NoFocus:3, NoEdit:1, VertAlign:2, Formula:"", Icon:"", Width:150, CellBorder:"Edit" } ] },
         "Search",
         { id:"Toolbar1", Cells:[ "Save","Reload","PrintPdf","Export" ], Item:"Data" }, 
         { id:"Toolbar2", Cells:[ "Copy","PasteOnly" ], Item:"Clipboard" }, 
         { id:"Toolbar3", Cells:[ "Undo","Redo","AddRowEnd","ExpandRows","CollapseRows" ], Item:"Manipulation" }, 
         { id:"Toolbar4", Cells:[ "Settings","Filter","ClearSort","TipAction","Lock" ], Item:"Settings" }, 
         "Layout", "Cookies",
         { id:"GroupList", D:"Group", Cells: [ { id:"GroupList", D:"GroupList", Width:55, List:{ "":"none", "Region,Country,State":"Location", "Calls":"Calls per" }, DisabledFormula:"Grid.IsLocked('group')" }, "Group" ], Item:"Group list" },
         "Styles",
         { id:"DataSet", Cells: [ { id:"Data", D:"List", Width:275, Align:1, Label:"Data set", TextColor:"blue", UseResize:2,
            Formula: "Grid.GetSources(1)[1].match(/SpansData\\d+\\w*/)[0]", DisabledFormula:"Grid.IsLocked('Data')",
            List: { 
               SpansData10: { Value: "30 rows / 1,600 cells (2 kB)", Text:"30 rows /            1,600 cells     (2 kB)" },
               SpansData100: { Value: "300 rows / 16,000 cells (8 kB)", Text:"300 rows /          16,000 cells     (8 kB)" },
               SpansData1000: { Value: "3,000 rows / 160,000 cells (75 kB)", Text:"3,000 rows /        160,000 cells   (75 kB)" }, 
               SpansData3333: { Value: "10,000 rows / 530,000 cells (0.2 MB)", Text:"10,000 rows /        539,000 cells (0.2 MB)" },
               SpansData10000: { Value: "30,000 rows / 1,600,000 cells (0.7 MB)", Text:"30,000 rows /     1,600,000 cells (0.7 MB)" }, 
               SpansData33333: { Value: "100,000 rows / 5,300,000 cells (2.1 MB)", Text:"100,000 rows /     5,300,000 cells (2.1 MB)<br><span style=\"color:silver;\">download from treegrid.com</span>" }, 
               SpansData100000: { Value: "300,000 rows / 16,000,000 cells (6.5 MB)", Text:"300,000 rows /   16,000,000 cells (6.5 MB)<br><span style=\"color:silver;\">download from treegrid.com</span>" }, 
               SpansData333333: { Value: "1,000,000 rows / 53,000,000 cells (21 MB)", Text:"1,000,000 rows /   53,000,000 cells  (21 MB)<br><span style=\"color:silver;\">download from treegrid.com</span>" }, 
               SpansData333333D1: { Value: "1,000,000 rows / 53,000,000 cells (21 MB)", Text:'1,000,000 rows /   53,000,000 cells  (21 MB)<br><span style=\"color:silver;\">download <span style=\"color:gray;\">on background</span> from treegrid.com</span>' },
               SpansData1000000: { Value: "3,000,000 rows / 160,000,000 cells (62 MB)", Text:"3,000,000 rows / 160,000,000 cells  (62 MB)<br><span style=\"color:silver;\">download from treegrid.com</span>" },
               SpansData1000000D1: { Value: "3,000,000 rows / 160,000,000 cells (62 MB)", Text:'3,000,000 rows / 160,000,000 cells  (62 MB)<br><span style=\"color:silver;\">download <span style=\"color:gray;\">on background</span> from treegrid.com</span>' },
               },
            OnChange: function(Grid,Row,Col,Event){
               var Value = Grid.GetValue(Row,Col,1), S0 = Grid.GetSources(0), S1 = Grid.GetSources(1);
               S0.D = null; Grid.Disable(); 
               S1[1] = S1[1].replace(/SpansData\d+\w*/,Value); 
               if(S1[1].search(/33333|100000/)>=0){ //. Too large data are not included in the react package and it are loaded directly from treegrid.com
                  if(S1[1].indexOf("treegrid.com")<0) S1[1] = S1[1].replace(/.*SpansData/,"https://www.treegrid.com/FExamples/Complex/01-Spans/Data/SpansData");
                  }
               else if(S1[1].indexOf("treegrid.com")>=0) S1[1] = S1[1].replace(/.*SpansData/,"/01-spans/SpansData");
               S1[2] = Value.indexOf('D1')>=0 ? { Url:S1[1].replace(/D1\./,'D2.'), Defer: { Row:'Info', Col:'Count', Max:Value=='SpansData1000000D1' ? 621e5 : 204e5 } } : ''; 
               S0.Progress = {SpansData33333:21e5,SpansData100000:65e5,SpansData333333:210e5,SpansData1000000:627e5}[Value];
               Grid.ActionReload();
               }
            } ] },
         { id:"Info", Cells: [{ id:"Count", NoHover:1, NoEdit:1, NoFocus:3, Type:"Html", MinWidth:250, Formula:"Grid.IsBusy()==6 ? '<span style=\"color:'+Grid.Color.blue+';\">'+Value+'</span>' : Grid.Script.rowstotal(Grid)", Rel:1, Align:1 }], Item:"Information" }
         ],
      Bottom:["AI"],
      Par: {
         P1: ["U",0x2000+34], //. 0x2000 + 34 characters (2*12+10)
         P2: ["U",0x2000+24]  //. 0x2000 + 24 characters (2*12)
         },
      Media: {
         Tablet: { //. Changes for touch only screens
            RowParts: [ { id:"TopScroll", Hidden:1 } ],
            ColParts: [ { id:"LeftScroll", Hidden:1 } ]
            },
         Mobile: { //. Changes for small displays, mostly mobile phones 
            DefTools: { SearchText: { Width:80 } },
            ColsIndex: [ { id:"Index", Width:30 } ]
            },
         SmallMobile: { //. Changes for very narrow mobiles
            Rules: { Tablet:1, MaxWidth:359, Apply:1 }, 
            LeftCols: { MinWidth:140 }
            }
         }

   }), []);
   const gridRef = useRef(null); //. Grid reference received for grid, access the grid object as grid.current
   return (<>
      <h1>1. Large example with spanned cells</h1>
      <h5>
         Complex grid with huge data sets with spanned cells and many other features. Only client side without saving changes.<br/>
         Items used in this sample are explained in the commented source jsx file at <b>./src/grid/01-spans.jsx</b>, 
         UTF8Store data are at <b><a href="/01-spans/SpansData10000.js" target="_blank">./public/01-spans/</a></b>
      </h5>
      <FastGrid src={[src,"/01-spans/SpansData10000.js"]} ref={gridRef} style={{height:"100%", minHeight:"500px", width:"100%" }}/>
      </>);
}