<script>
import { FastGrid } from "fastgrid-svelte";
import "../Tutorial.css";

const src = ({ //. All layout and data for grid

   //. --- Custom JavaScript functions and properties accessible by API by Grid.Script.XXX ---
   Script: {

      //. --- Calculates all and verified summary in Total1, Total2 (row==null) and Group (row set) rows ---
      //. id can be "R1" or "R2" as D id to sum these rows
      monthtotal: function(G,row,col,id){
         var sum = 0, sumver = 0, idx = col.id.slice(1), amount = G.Cols["A"+idx], price = G.Cols["P"+idx], ver = G.Cols["V"+idx], D = G.DefRows[id], L = row ? row.L : -10;
         if(!row&&G.Script[id+"All"+idx]!=null){ //. Precalculated results in data for Total rows
            sum = G.Script[id+"All"+idx]; sumver = G.Script[id+"Ver"+idx]; G.Script[id+"All"+idx] = null; G.Script[id+"Ver"+idx] = null;
            }
         else G.IterSimple(row||G.GetFirst("Body"),function(r){ 
            if(r.L<=L) return true; 
            if(r.D==D&&~r.O&4) { var v = G.GetValueSimple(r,amount) * G.GetValueSimple(r,price); if(v){ sum += v; if(G.GetValueSimple(r,ver)>0) sumver += v; } }
            },!row);
         return G.Text["$Xall"]+": <b>"+G.NumberToString(sum,",0.##")+"</b>; "+G.Text["$Xverified"]+": <b>"+G.NumberToString(sumver,",0.##")+"</b>";
         },

      //. --- subtract Total1 - Total2 values to Total3 row ---
      monthsubtract: function(G,row,col){
         var r2 = G.GetPrev(row), r1 = G.GetPrev(r2), sep = G.Format.DecimalSeparator, rep = new RegExp("[^\\d\\;\\-\\"+sep+"]","g");
         var v1 = G.GetValue(r1,col).replace(rep,"").replace(rep,"").split(";"), v2 = G.GetValue(r2,col).replace(/\#\w+/g,"").replace(rep,"").split(";");
         if(sep!="."){ v1[0] = v1[0].replace(sep,".");  v1[1] = v1[1].replace(sep,".");  v2[0] = v2[0].replace(sep,".");  v2[1] = v2[1].replace(sep,"."); }
         return G.Text["$Xall"]+": <b style='color:"+(v1[0]-v2[0]>0?G.Colors.blue:G.Colors.red)+"'>"+G.NumberToString(v1[0]-v2[0],",0.##")+"</b>; "+G.Text["$Xverified"]
               + ": <b style='color:"+(v1[1]-v2[1]>0?G.Colors.blue:G.Colors.red)+"'>"+G.NumberToString(v1[1]-v2[1],",0.##")+"</b>";
         },

      //. --- sums all and verified results in Group and Total rows to Total column ---
      fulltotal: function(G,row,col,pos){
         var sep = G.Format.DecimalSeparator, rep = new RegExp("[^\\d\\;\\-\\"+sep+"]","g"), dec = sep=='.';
         for(var i=1,sum=0;i<=12;i++){
            var v = G.GetValue(row,G.Cols["A"+i]).replace(/\#\w+/g,"").replace(rep,"").split(";"); 
            sum += dec ? v[pos]-0 : v[pos].replace(sep,".")-0;
            }
         return sum;
         },

      //. --- Calculates counts of all and visible rows / columns / cells for Info cell on Toolbar ---
      rowstotal: function(G){
         var ra = G.Count("Body"), rv = G.Count("Body",15), ca = 0, cv = 0, f = Math.round(G.IconZoom*11), br = "<br/>"; if(f>15) f = 15; else if(f<11){ f = 11; br = ""; }
         for(var c in G.Cols){ ca++; if(!G.IsHidden(G.Cols[c])) cv++; }
         return "<span style='font-size:"+f+"px;line-height:"+(f+1)+"px;display:inline-block;text-align:left;'>"+G.Text["$XShown"]+" <b>"+G.NumberToString(rv*160/4,",0")
               + (rv!=ra?"</b> / <b>"+G.NumberToString(ra*160/4,",0"):"")+"</b> "+G.Text["$Xcells"]+br+"<b>"+G.NumberToString(rv,",0")+(ra!=rv?"</b> / <b>"+G.NumberToString(ra,",0"):"")
               + "</b> "+G.Text["$Xrows"]+", <b>"+cv+(cv!=ca?"</b> / <b>"+ca:"")+"</b> "+G.Text["$Xcolumns"]+"</span>&nbsp; &nbsp;";
         },

      //. --- Returns 12 values for chart ---
      GetChartValues: function(G,row,pos){
         while(pos--&&row) row = G.GetNext(row); if(!row) return [];
         var A = [], grp = row.D.Group || row.D.id=="Total", sep = G.Format.DecimalSeparator, rep = new RegExp("[^\\d\\;\\-\\"+sep+"]|;.*$","g"), dec = sep=='.';
         if(grp) for(var i=1;i<=12;i++){ var v = (G.GetValue(row,G.Cols["A"+i])+"").replace(rep,""); A[A.length] = dec ? v-0 : v.replace(sep,".")-0; }
         else for(var i=1;i<=12;i++) A[A.length] = G.GetValue(row,G.Cols["T"+i]);
         return A;
         },

      //. --- Returns tip for month (set in button) in chart ---
      GetChartTip: function(G,row,col,button){
         if(!button||col.id!="Chart") return "";
         var idx = button.slice(button.indexOf("_")+1)-0+1, month = G.GetString(G.Rows.Header2,G.Cols["A"+idx]);
         if(row.D.id!="R1"){
            var v1 = G.GetString(row,G.Cols["A"+idx]).replace(/\s*;\s*/,"</tr></tr><tr><td>").replace(/:/g,":</td><td style='text-align:right;'>");
            return "<table><tr><td colspan=2 style='text-align:center;'>"+month+"</td></tr><tr><td>"+v1+"</td></tr></table>";
            }
         var st = " style='text-align:right;font-weight:bold;";
         var v1 = G.GetString(row,G.Cols["T"+idx]), v2 = G.GetString(G.GetNext(row),G.Cols["T"+idx]), v3 = G.GetString(G.GetNext(G.GetNext(row)),G.Cols["T"+idx]);
         var s = "<table><tr><td colspan=2 style='text-align:center;'>"+month+"</td></tr>";
         s += "<tr><td>"+G.Text["$XTotal2023"]+": </td><td"+st+"'>"+v1+"</td></tr>";
         s += "<tr><td>"+G.Text["$XTotal2022"]+": </td><td"+st+"color:gray;'>"+v2+"</td></tr>";
         s += "<tr><td>"+G.Text["$XGain"]+":</td><td"+st+"color:"+(v3[0]=="-"?G.Colors.red:G.Colors.blue)+"'>"+v3+"</td></tr></table>";
         return s;
         },

      //. --- Custom AI API function, to choose which child row will be used to sort contractors by Total / Amount / Price / Total / Verified columns
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
            var total = row.D.id=="R1" ? G.Rows.Total1 : G.Rows.Total2;
            var cc = G.Cols["A"+idx], c = col.id[0], V = G.GetValue(row,G.Cols["V"+idx]), P = G.GetValue(row,G.Cols["P"+idx]), A = G.GetValue(row,G.Cols["A"+idx]);
            var v = G.GetResult(total,cc); if(v==null) return;
            var sep = G.Format.DecimalSeparator, rep = new RegExp("[^\\d\\;\\-\\"+sep+"]","g");
            v = v.replace(/\#\w+/g,"").replace(rep,"").split(";"); 
            if(sep!="."){ v[0] = v[0].replace(sep,"."); v[1] = v[1].replace(sep,"."); }
            v[0] -= 0; v[1] -= 0;
            var d = (val||0) - (oval||0);
            if(c=="A"){ v[0] += d*P; if(V) v[1] += d*P; }
            else if(c=="P"){ v[0] += d*A; if(V) v[1] += d*A; }
            else if(c=="V"){ if(val) v[1] += A*P; else v[1] -= A*P; }
            if((c=="A"||c=="P"||c=="V")&&row.D.id=="R1") for(var par=G.GetParent(row);par;par=G.GetParent(par)){ //. Group parents
               G.SetResult(par,G.Cols["A"+idx]); 
               G.SetResult(par,G.Cols.Total);
               } 
            var r3 = G.GetNext(G.GetNext(row));
            G.SetResult(r3,col); G.SetResult(r3,col,null,null,"TextColor");
            G.SetResult(r3,G.Cols["T"+idx]); G.SetResult(r3,G.Cols["T"+idx],null,null,"TextColor");
            G.SetResult(r3,G.Cols.Total); G.SetResult(r3,G.Cols.Total,null,null,"TextColor");
            G.SetResult(total,cc,"all: <b>"+G.NumberToString(v[0],",0.##")+"</b>; verified: <b>"+G.NumberToString(v[1],",0.##")+"</b>");
            G.SetResult(G.Rows.Total3,cc);
            G.SetResult(total,G.Cols.Total);
            G.SetResult(G.Rows.Total3,G.Cols.Total);
            G.SetResult(G.Rows.Total3,G.Cols.Total,null,null,"TextColor");
            G.Repaint(total,1);
            G.Repaint(r3,1);
            }
         else if(col.id=="Region"||col.id=="Country"){
            G.SetResult(row,G.Cols.State,null,0,"RightIcons"); G.SetResult(row,G.Cols.State,null,0,"Button"); G.SetResult(row,G.Cols.State,null,0,"NoEdit"); 
            }
         },

      //. --- Manually updates Formula results after deleting row(s) to speed up in large grids ---
      OnDeleted: function(G,rows,del){ 
         if(rows.length>300) { G.Recalculate(); return; }
         for(var i=0;i<rows.length;i++){
            var row = rows[i]; if(row.D.id!="R1"&&row.D.id!="R2") continue;
            for(var j=1;j<=12;j++){
               FGrid.OnAfterSetValue(G,row,G.Cols["A"+j],0,G.GetValue(row,G.Cols["A"+j]));
               FGrid.OnAfterSetValue(G,row,G.Cols["P"+j],0,G.GetValue(row,G.Cols["P"+j]));
               }
            }
         },
   
      //. --- Called on row copy, clears original prices and amounts, preserves only settings ---
      OnAdded: function(G,rows,par,next,action,copytype){ 
         if(action==1||action==3) return;
         var recalc = 0;
         G.DisableEvent("OnAfterSetValue"); //. Temporary disables the OnAfterSetValue, because the new values are not included in results
         if(G.IsBusy()==9) for(var i=0;i<rows.length;i++){ //. Called by AI
            var row = rows[i]; if(row.D.id=="R2"){ G.SetAttr(row,G.Cols["A"+j],"NoEdit",0); G.SetAttr(row,G.Cols["P"+j],"NoEdit",0); G.SetAttr(row,G.Cols["V"+j],"NoEdit",0); } //. Makes the added 2022 row editable
            }
         else for(var i=0;i<rows.length;i++){
            var row = rows[i]; 
            if(row.V&&row.V.length) recalc = 1; 
            if(row.D.id=="R3"||action==0&&row.D.id=="R1") continue;
            for(var j=1;j<=12;j++){
               if(action==2){ G.SetValue(row,G.Cols["A"+j],0); G.SetValue(row,G.Cols["P"+j],0); }
               G.SetValue(row,G.Cols["V"+j],row.D.id=="R2"?1:0);
               if(row.D.id=="R2"){ G.SetAttr(row,G.Cols["A"+j],"NoEdit",0); G.SetAttr(row,G.Cols["P"+j],"NoEdit",0); G.SetAttr(row,G.Cols["V"+j],"NoEdit",0); } //. Makes the added 2022 row editable
               }
            }
         if(!action&&recalc) G.Recalculate(); //. For filled rows added by AI
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
         },

      //. --- Called on end resizing, synchronizes other columns in different sets ---
      OnEndResize: function(G,col,w,ow,cw){
         if(!G.IsCol(col.length ? col[0] : col)) return;
         if(col.id=="Index"||col.id=="Panel"){ G.SetWidth(G.Cols.Chart,G.GetWidth(G.Cols.Chart)+w-ow,1); return; }
         if(col.id=="Chart"){ var nw = G.GetWidth(G.Cols.Index)+w-ow; G.SetWidth(G.Cols.Index,nw>1?nw:1,1); if(nw<1) G.SetWidth(G.Cols.Panel,G.GetWidth(G.Cols.Panel)+nw-1,1); return; }
         if(col.id=="Year"||col.id=="Total"){ G.SetWidth(G.Cols.Name,G.GetWidth(G.Cols.Name)+w-ow,1); return; }
         if(col.id=="Name"){ var nw = G.GetWidth(G.Cols.Total)+w-ow; G.SetWidth(G.Cols.Total,nw>5?nw:5,1); if(nw<1) G.SetWidth(G.Cols.Year,G.GetWidth(G.Cols.Year)+nw-5,1); return; }
         },

      //. --- Called to get item name for messages, returns main row for child data rows and adds month to data columns ---
      OnGetName: function(G,row,name){
         if(row.D.id=="R1"||row.D.id=="R2"||row.D.id=="R3") return G.GetName(G.GetParent(row));
         if(row.D.id=="Total"&&G.IsRow(row)) return G.GetString(row,G.Cols.Year);
         if(row.D.id=="Amount"||row.D.id=="Price"||row.D.id=="Total"||row.D.id=="Verified") return row.Item+". "+row.D.id;
         },

      //. --- Called before paste to modify the destination ---
      OnPaste: function(G,text,rows,cols,focus){
         var D = focus[0] ? focus[0].D.id : ""; if((D=="R1"||D=="R2"||D=="R3")&&text[0]&&text[0].search(/[\t\n]/)>=0) focus[0] = G.GetParent(focus[0]); //. Pastes always before the main row
         },

      //. --- Called after language was changed, updates the number formats in calculated results ---
      OnSetLanguage: function(G,lang,old,init){ 
         if(!init) G.Recalculate(); 
         },

      //. --- Called after style was changed, updates the colors in calculated results ---
      OnSetStyle: function(G,style,old,init){ 
         if(!init) G.Recalculate(1); 
         },

      //. --- Called to get row for fixed scroll, returns the main row with the Name ---
      OnFixedScroll: function(G,row,ds){
         while(row&&row.D.id!="R0") row = ds<0 ? G.GetPrev(row) : G.GetNext(row);
         return row;
         },

      //. --- Adds Collapsed state of Filter row to cookie as custom addon ---
      OnSaveCookie: function(G,cookie,id,date,version,action){
         if(action==1) return cookie.slice(0,-1)+",Head2_Custom:[{id:'Filter',Collapsed:"+(G.IsCollapsed(G.Rows.Filter)?1:0)+"}]}";
         },

      //. Collapses Filter row to default state on reset cookie ---
      OnResetCookie: function(G){
         G.Collapse(G.Rows.Filter,1);
         },

      //. --- Called on every collapse / expand. Saves collapsed state of Filter row to cookies as custom by OnSaveCookie ---
      OnCollapsed: function(G,rows){
         if(rows[0].id=="Filter") G.SaveCookie();
         },

      //. --- Called after grid is initialized, but before sorting / grouping, updates grouping settings by custom OnGroup function ---
      OnInitialized: function(G){
         FGrid.OnGroup(G,"Body",G.Parts.Body.Group);
         },

      //. --- Called before grouping. Sets SortList for Country / State if its related column is in grouping, just to speed up the grouping and sorting ---
      OnGroup: function(G,part,group,oldgroup){
         G.Cols.Country.SortList = group&&group.indexOf("Region")>=0 ? 0 : 2;
         G.Cols.State.SortList = group&&group.indexOf("Country")>=0 ? 0 : 2;
         },

      //. --- Called on export to preset some options according to selected export options ---
      OnExport: function(G,test){
         if(test) return false;
         G.ExportDL = G.ExportMarks ? "Group" : ""; //. If exported charts, exports outline only for "Group" rows, because the images are merged among rows
         G.Cols.Chart.NoExport = G.ExportMarks ? 0 : 1;
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
            { id:"Chart", type:"image", 
               description: "XY chart vertically spanned on all three rows. On X axis are 12 months, on Y axis are shown values from the 12 Total columns and three rows. "
                           + "The Total values from 2023 are displayed as green bars from X axis up. The Total values from 2022 are displayed as gray bars. "
                           + "The Total values from the third row Gain are displayed as points, positive values as blue above X axis and negative as red points below X axis." },
            { id:"Year", type:"string", description:"Shows the detail row name '2023' in the first row, '2022' in the second row and 'Gain' in the third row" },
            { id:"Total", type:"float", description:"Summary of all 12 Total values in given row" }
            ];

         var S = "## Grid description\n";
         S += "You have data grid, displayed in JavaScript component 'FastGrid', with 'contractors' (or 'vendors') in rows. ";
         S += "Grid columns are defined in JSON object as: "+JSON.stringify(G.AIAddColsAttrs(Cols1))+". Name column shows tree lines. ";
         S += "Identify contractor row to the user by its name got by getname() function instead of its id. Editable columns are Name, Region, Country, State, Partner, Since, Calls and Rabat. ";
         S += "\n\n## Grid rows\n";
         S += "Every contractor row (kind = 'Contractor') displays nested detail grid as subtree with three rows. "
         S += "The first detail row (kind = '2023') shows contractor's results in year 2023. ";
         S += "The second detail row (kind = '2022') shows contractor's results in year 2022, only for compare, it is not editable and cannot be changed. AI should not offer changing '2022' values. ";
         S += "The third detail row (kind = 'Gain') shows contractor's gain in every cell as value in 2023 minus value in 2022, it is not editable and cannot be changed - AI should not offer changing 'Gain' values. ";
         S += "The detail grids have four columns per year month, together 48 columns in the whole year. "
         S += "The four columns in January are defined in JSON object as: "+JSON.stringify(G.AIAddColsAttrs(Cols2))+". Other columns are similarly A2, P2, T2, V2 in February up to A12, P12, T12, V12 in December. ";
         S += "Cells in the 'Gain' row in Verified columns can have three values: 1 (true), 0 (false), -1 (unsure). ";
         S += "The detail grids have next three column on the left side defined in JSON object as: "+JSON.stringify(G.AIAddColsAttrs(Cols3))+". "
         S += "The Year and Total columns are displayed in the same place as Name column and show tree lines. The Chart column is displayed left in the same place as Index column. "; 
         S += "The not editable cells cannot by changed by API, except when adding new rows. ";
         S += "The detail grids can be hidden by collapsing last level of tree by CollapseLevel(-1) tool function. ";
         S += "The detail grids cannot be deleted without their parent contractor. Deleting contractor always deletes its detail grid. ";
         S += "Only the contractor rows can be selected. ";
         S += "Only the contractor rows can be added and only to the grid root, regardless on grouping. "
         S += "For adding contractors by function 'addrows' you need to set 'count' parameter to 3x count of contractors, for Contractor, 2023 and 2022; ";
         S += "the Gain is added automatically, but it is included in the 'addrows' return. ";
         S += "Contractors must be added or copied always with their detail grids. ";
         S += "Only one cell can be focused. ";
         S += "\n\n## Grouping rows\n";
         S += "The grid rows can be grouped by one or more columns from Name, Region, Country, State, Partner, Since, Calls, Rabat, SinceMonthDay, SinceWeekDay, SinceMonth, SinceYear. ";
         S += "If the row value in group column is empty (obviously in State column), the group parent is not created. ";
         S += "The group row has kind = 'Group'. The group row have editable only the main Name column where is shown cell values from the group column the group row is created by. ";
         S += "Every group row displays the grouped value (it is created for) in Name column, with tree lines. ";
         S += "Every group row displays summaries of all detail grids of all contractors in the group row' child rows. "
         S += "The summary texts are displayed per month (only for year 2023) in Amount column as spanned cell for 4 columns Amount, Price, Total, Verified; ";
         S += "so every group row displays 12 summary texts, every with two values, one for all contractors and one for verified contractors. ";
         S += "The group rows cannot be selected, moved, deleted, added, copied. ";
         S += "\n\n## Pivot\n"
         S += "This grid cannot create or show pivot. If a user wants to create pivot, inform him " + (FGrid.Grids.Pivot ? "that the 'Pivot grid' example is in the other grid bottom this page. " : "to choose an example called 'Pivot grid' in the left menu and run it instead of this example. ");
         S += "\n\n## Sorting rows\n";
         S += "The rows can be sorted by one or more columns except Chart, Year, Index and Panel columns. ";
         S += "Sorting cannot move Contractors between groups. "
         S += "To fully sort all Contractors according to specific criteria, e.g. to get some top rows with maximums, it is required to ungroup the grid by calling grouprows('') first. ";
         S += "\n\n## Filtering rows\n";
         S += "There are four filter rows with kind = 'Filter'. The first filter row is 'Filter' and permits filtering contractors by their own cells like 'Name' or 'Since'. ";
         S += "Filtering by 'Country' requires also filter by 'Region' and filtering by 'State' requires also filter by 'Region' and 'Country'. "
         S += "To filter or search by region not exactly listed in available items for 'Region' (e.g. 'Asia') you should set filter for all applicable Regions and set filter by exact countries in 'Country' that belong to the requested region by their common World geography. ";
         S += "The next three filter rows permit filtering contractors by their detail rows, 'Filter1' filters by '2023', 'Filter2' filters by '2022' and 'Filter3' filters by 'Gain'. ";
         S += "Every filter row cell can have its value and operator to compare the value with iterated row value, e.g. for operator '>=' is row shown when row_value >= filter_value. ";
         S += "Permitted operators: '', '==', '!=', '<', '<=', '>', '>=', 'startsWith', '!startsWith', 'endsWith', '!endsWith', 'includes', '!includes', 'search' (regex), '!search' (regex). ";
         S += "Filter value in all Filter cells except boolean type can contain more values separated by semicolon to find any of them by operator == or !=. ";
         S += "Filter value in all Filter cells of number type can contain range as startnumber~endnumber to filter in the range by operator == or outside the range by operator !=. ";
         S += "Filter value in Since column can contain range as startdate~enddate to filter in the range by operator == or outside the range by operator !=. ";
         S += "Filter value in all Filter cells except boolean type can contain also more ranges and / or single values separated by semicolon to find any of them by operator == or !=. ";
         S += "The filter always affects only contractor rows. The detail grids are displayed only for visible contractors.";
         S += "\n\n## Grid footer rows\n";
         S += "The grid displays three not editable rows in bottom, with summaries for all contractors, similarly to group rows. The rows have kind = 'Total'. ";
         S += "First row 'Total1' is summary for 2023, the second row 'Total2' is summary for 2022 and the third row 'Total3' is summary for Gain. Also with two values, one for all contractors and one for verified contractors. ";
         S += "The Total rows display the summaries in spanned cell through Amount/Price/Total/Verified as html text with all and verified summaries. ";
         S += "The bottom total rows and all group rows display in Chart column simple XY chart as line connecting 12 points as values in the 12 months for all contractors. ";
         S += "\n\n## Grid columns actions\n";
         S += "The grid columns cannot be selected, deleted, added or copied. The columns are not in tree and cannot be expanded or collapsed. ";
         S += "The Index, Panel and Chart columns can be shown and hidden only together. The Name, Year and Total columns can be shown and hidden only together. ";
         S += "\n\n## Grid layout\n";
         S += "The grid is visually split to scrollable sections called parts. "
         S += "From top to bottom the row parts are: 'Head' (contains 3 header rows), 'Head2' (contains 4 filter rows), 'Body' (contains all other rows), 'Foot' (contains 3 total rows). ";
         S += "From left to right the column parts are: 'LeftCols' (contains Index, Panel, Name, Chart, Year and Total columns), 'Cols' (contains all other columns). ";
         S += "Columns can be moved between parts, rows cannot be moved between parts. "
         S += "Columns Amount, Price, Total, Verified can be moved individually only within their month. Or the whole month with the 4 columns can be moved to any place. ";
         S += "Left columns Year and Total can be moved between them only and no other column can be moved left to or inside them. "
         S += "Columns Name and Chart cannot be moved at all. Other columns can be move to any place, also to end of the left part. ";
         return S;
         },

      //. --- Called to get actual dynamic (not cached) instructions about this grid for AI ---
      OnAIGetDynamicInstructions: function(G,ins){
         var S = "";
         var rowcnt = 0; G.IterAll("Body",function(r){ if(r.D.id=="R0") rowcnt++; }); S += "The data grid contains "+rowcnt+" contractor rows. ";
         var group = G.Grouped&&G.GetGroup(); if(group) S += "The grid rows are actually grouped by columns: "+group+". ";
         var cll = G.Parts.Body.CollapseLevel;
         if(cll==-1||cll==null) S += "The row tree is expanded to show all levels, including detail grids. ";
         else { 
            var g = group ? group.split(",") : []; 
            if(cll==-2||cll>=g.length) S += "The row tree is expanded to show all group levels, but collapsed detail grids. ";
            else { if(cll<0) cll = g.length+cll+1; S += "The row tree is collapsed to level "+(cll+1)+" to show groups created on '"+g[cll]+"'. "; }
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
      id:"Sets",        //. Grid id
      AutoCookie:1+2+4+8+16, //. Automatically loads and saves configuration to local storage
      ResetCookie:1,    //. Permits resetting configuration to defaults
      Version:2,        //. Clears all previously saved configuration with different layout version
      Style:"Bare",     //. Presets Bare style
      Language: "EN",   //. Preset language
      LanguageFiles:["/FGridText.js",'/02-sets/SetsLang.js'], //. Language texts, FastGrid default and example specific texts
      ResizingTag:3,    //. Permits resizing main tag in both directions
      IndexList:1,      //. List is set by index instead of key, to shorten the data by using only numbers
      SelectAllType:2+16, //. Shows the number of selected rows in the header select button
      ClearSelected:15, //. Clears selection for all hidden rows and only visibile rows can be selected by SelectAll
      ExpandDigits:-1,  //. Shows only + / - instead of number of children on expand button, because of the large amount of rows in grid
      HideGroupCols:0,  //. Shows the grouped columns by default
      FilterTree:3,     //. Sets filtering in tree as Show all found with children. If some row fulfills the condition, all its parents are shown too = shows the group rows that are always filtered out and also detail data rows 
      HideZero:1,       //. Shows empty cell instead of 0
      LevelsCollapse:1, //. Levels button collapses all levels instead of only its level
      FillRest:4+8,     //. Fills the unused space after the last cell in row, fills the margin color here
      RecalcOn:32,      //. Recalculates toolbars on expand / collapse to update the count of visible rows / cells in the Info cell
      NoRecalc:1,       //. Speed up. Because of huge grid the recalculating of Complex formulas in grid is done manually in OnAfterSetValue / OnDeleted events
      RowHeight:22,     //. Predefined height in pixels for all rows in grid without Height attribute set
      RowChanges:7,     //. Marks changed only cell values and added / deleted rows
      FixedScroll:1,    //. When scrolling vertically by larger amount, it rounds scroll to the row height. Uses OnFixedScroll event where this example fixes the scroll on the main rows with the Name.
      StoreParents:1,   //. Speeds up changing many cell values at once, usually by AI, by speeding up GetParent function in OnAfterSetValue
      NoMargin:32+128,  //. Does not show row margin when set ColBorder = 0 and 3
      LocksMenu:"Edit,Rows,Cols,Resize,Collapse,View,Settings,Data,Cookies,Search,Toolbars,Copy,PrintPdf,Export,Reload,Save,Undo,AI", //. List of available locks for the grid features
      CopyHtml:1,                                        //. Copies to clipboard also html, values with Format
      CopyStyles:"Align,VertAlign,Color,TextColor,TextStyle,Calculated,Html,RowAttr,ColAttr,CellAttr,Border,ColorBorder,DefaultBorder,Bool", //. What styles copies to clipboard
      CopySizes:"Width,Height",          //. What sizes copies to clipboard
      CopyPasteRowsType:"Parents,Children,Block",        //. Copies to clipboard also group rows and if focused row, it copies also child rows
      CopyColSet:2,                                      //. Copies the second column set as the main set and spans the cells from the first set accordingly
      CopyMenu:"Html,Color,State,TextStyle,CellHtml,Align,VertAlign,Border,DefBorder,Span,-,Items,Layout,HiddenCols,FilteredRows,CollapsedRows,ParentRows,ChildrenRows", //. Items in menu for toolbar cell Copy
      MaxCopySpan:30000,                                 //. Maximum copied spanned cells before it shows warning. Increases the limit, because there is a lot of row spanned cells in one row and it does not slow MS Excel too much
      ExportStyles:"Align,VertAlign,Color,TextColor,TextStyle,Calculated,Html,RowAttr,ColAttr,CellAttr,Border,ColorBorder,DefaultBorder,Bool,Tree", //. What styles exports to xlsx
      ExportSizes:"Width,Height,RowMargin,ColMargin,RestMargin,HideRows,HideCols,AddCol",        //. Exports to xlsx row heights, column widths and their margin and hides unused rows and columns
      ExportRowsType:"Parents,Children,Block",           //. Exports also group rows and child rows if exports selected / focused rows
      ExportColSet:-1,                                   //. Exports the column sets in original widths
      ExportMarks:4,                                     //. Exports charts
      ExportMergeImages:1000,                            //. Merges charts in 1000 rows to minimize count of images in xlsx
      ExportMergeImagesTree:2,                           //. Permits merging charts only in the last two tree levels
      ExportMenu:"File,Format,-,Html,Color,State,TextStyle,CellHtml,Align,VertAlign,Border,DefBorder,Span,Margin,MarginRest,Tree,Charts,Separator,Style,-,Items,Layout,HiddenCols,FilteredRows,CollapsedRows,ParentRows,ChildrenRows", //. Items in Export menu
      PrintMenu:"PageSize,PageLandscape,MarginWidth,MarginHeight,FitPage,Pages,Size,-,Items,Layout,HiddenCols,FilteredRows,CollapsedRows,ParentRows,ChildrenRows", //. Items in Print menu
      PdfMenu:"File,-,PageSize,PageLandscape,MarginWidth,MarginHeight,FitPage,Pages,Size,-,Items,Layout,HiddenCols,FilteredRows,CollapsedRows,ParentRows,ChildrenRows", //. Items in Print PDF menu
      SearchAction:"Focus,ColorCells,ColorRows",         //. Search focuses the found cell from start and colors the found cells and rows
      SearchOptions:"Index,NoGroup",                     //. Prefers row index in search, does not search in group columns
      SearchFocusCol:"Name,Year",                        //. Focuses cell in Name column in first set and Year in second set in found row
      SearchCols:"-,Index,Name,Year,Region,Country,State", //. Predefined columns to search in
      SearchRows:"-",                                    //. Does not search in totals by default
      GroupExclude:"|",                                  //. Does not create group rows for empty value
      PasteFillRows:0, PasteAddRows:2,                   //. Pastes as new rows added before focused row
      PasteFillCols:3, PasteAddCols:0,                   //. Pastes the whole rows to all columns from start
      CopyPasteInternal:5,                               //. Copy is done to clipboard and copy & paste is done also internally inside the grid with all settings
      PdfUrl: "http://localhost:8000/Pdf.js?func=getpdf",//. PDF export is run on separate node server located in ./server/
      PdfHtml:3,                                         //. Sends to server whole html with full layout, including Script and Events functions
      SaveUrl: { Data:{ IO: { Message:"This example does not save changes to server.<br>Now the changes are accepted like they were saved." }} } //. Simulated save
      },
   AI:{
      StaticInstructions:"",  //. To avoid generating default static instructions
      DynamicInstructions:"", //. To avoid generating default dynamic instructions
      APIFunctions: { //. Description of custom AI API functions. The custom JavaScript functions are defined in Script.
         setsortbychild: { 
            Param:"child", Use:"Do",
            Desc:"sets which child of Contractor row will be used for sorting by left column Total and by data columns Amount, Price, Total, Verified; "
               + "'child can be '2023', '2022' or 'Gain'; by default is sorted by '2023' child"
            } 
         }
      },
   Styles: {  //. Custom colors
      Base: { //. For all styles, including Standard (Gray)
         Colors: {
            rowborder:"#FFFFFF",     //. Border between detail rows, it is the same as read only background to hide the border completely
            red:"red", green:"#080", blue:"blue", gray:"#AAA", dark:"black",                        //. Text colors for highlight
            cafd: "#AFD", c4d8: "#4D8", c0a0: "#0A0", c00a: "#00A", ca00: "#A00", caxis: "#5F677E", //. chart colors
            c66f: "#66F", cf66: "#F66", cddd: "#DDD", c888: "#888", caaa: "#AAA", cbbb: "#BBB"      //. chart colors
            } 
         }, 
      Plain:  { Colors: { rowborder:"#FCFCFC" } },
      Bare:   { Colors: { rowborder:"#FCFCFC" } },
      White:  { Colors: { rowborder:"#F8F8F8" } },
      Silver: { Colors: { rowborder:"#F8F8F8" } },
      Beige:  { Colors: { rowborder:"#F9F9F6" } },
      Green:  { Colors: { rowborder:"#F7F9FA" } },
      Blue:   { Colors: { rowborder:"#F2F9FC" } },
      Gray:   { Colors: { rowborder:"#F1F1F1" } },
      Dark: { 
         Colors: { 
            rowborder:"#1F1F1F",
            red:"#C66", green:"#0B0", blue:"#0BB", gray:"#888", dark:"#BBB",
            cafd: "#4A7", c4d8: "#053", c0a0: "#050", c00a: "#005", ca00: "#500", caxis: "#5F677E",
            c66f: "#227", cf66: "#722", cddd: "#777", c888: "#222", caaa: "#444", cbbb: "#555"
            } 
         },
      Black: { 
         Colors: { 
            rowborder:"#111111",
            red:"#C66", green:"#0A0", blue:"#0AA", gray:"#888", dark:"#AAA",
            cafd: "#4A7", c4d8: "#053", c0a0: "#050", c00a: "#005", ca00: "#500", caxis: "#5F677E",
            c66f: "#227", cf66: "#722", cddd: "#777", c888: "#222", caaa: "#444", cbbb: "#555"
            } 
         },
      },
   Cursors: { Chart:"default" },
   Locks: { Data:"Data" }, LockNames: { Data:"Restrict choosing data set" }, //. Custom Lock names
   Cookie: {
      Rows:"First,Height,CS,Mirror", //. Saves Height to DefRows, CS with Mirror cells, iterates only first page in every part
      RowParts:"-",
      Parts: { Body: "Sort,Group,Filter,Height,Alternate,AlternateCount,CollapseLevel" } //. Defines the Cookie only for Body part instead of all Row parts to not affect especially Filter row collapse that is saved apart
      },
   RowParts: [
      { id:"TopScroll", Hidden:0 },
      { id:"Head2", Type:"Rows", Prev:"Head", Rel:100000, MinHeight:70, MinHeightResize:0 },
      ],
   ColParts: [
      { id:"LeftScroll", Hidden:0 },
      ],
   DefCells: {
      R0State: { RightIconsFormula:"Grid.GetList(Row,Col)?'List':''", ButtonFormula:"Grid.GetList(Row,Col)?'List':''", NoEditFormula:"Grid.GetList(Row,Col)?0:2"  },
      R0Base: { SortValueFormula:"Grid.GetValue(Grid.SortByChild==2 ? Grid.GetLastChild(Row) : Grid.SortByChild==1 ? Grid.GetNext(Grid.GetFirstChild(Row)) : Grid.GetFirstChild(Row),Col)" },
      R0A: { D:"R0Base" }, R0P: { D:"R0Base" }, R0T: { D:"R0Base" }, R0V: { D:"R0Base" }, R0Total: { D:"R0Base" }, 
      R0Year: { NoFilterRow:2 },
      R0SinceWeekDay: { SortValueFormula:"new Date(Grid.GetValue(Row,Grid.Cols.Since)).getUTCDay()" },
      R0SinceMonth: { SortValueFormula:"var v=new Date(Grid.GetValue(Row,Grid.Cols.Since)).getUTCMonth();return v<10?'0'+v:v;" },
      R1Year: { Value:"$X2023", NoSearch:1 },
      R2Year: { Value:"$X2022", NoSearch:1 },
      R3Year: { Value:"$XGain", NoSearch:1 },
      R3Base: {  //. Amount / Price / Total columns in R3 rows
         ValueFormula:"Grid.GetNumber(Grid.GetPrev(Grid.GetPrev(Row)),Col) - Grid.GetNumber(Grid.GetPrev(Row),Col)",
         TextColorFormula:"CValue>0?'blue':CValue<0?'red':'gray'"
         },
      R3A: { D:"R3Base" }, R3P: { D:"R3Base" }, R3T: { D:"R3Base" }, R3Total: { D:"R3Base" },
      R3V: { ValueFormula:"[0,-1,1][Grid.GetNumber(Grid.GetPrev(Grid.GetPrev(Row)),Col) + Grid.GetNumber(Grid.GetPrev(Row),Col)]" }, //. Verified column in R3 rows
      TA:  { Type:"Html", Align:2 }, 
      T1A: { D:"TA", ValueFormula:"Grid.Script.monthtotal(Grid,null,Col,'R1')" },
      T2A: { D:"TA", ValueFormula:"Grid.Script.monthtotal(Grid,null,Col,'R2')" },
      T3A: { D:"TA", ValueFormula:"Grid.Script.monthsubtract(Grid,Row,Col)" },
      Filter1V: { LeftIcons:"", Range:0 },
      Filter2V: { LeftIcons:"", Range:0 },
      Filter3V: { LeftIcons:"", Range:0, BoolCycle:2 },
      GA:  { D:"TA", ValueFormula:"Grid.Script.monthtotal(Grid,Row,Col,'R1')" },
      H2A: { Align:2, SortColFormula:"'T'+Col.id.slice(1)" },
      GC: {
         Marks:"Chart({ Chart:'Line', Button:'Chart', Values: Grid.Script.GetChartValues(Grid,Row,0), LineStroke:'#5F677E', Line:2, Axis:'', Padding:[3,1,3,0] });"
         },
      T1C: { D:"GC" }, T2C: { D:"GC" }, T3C: { D:"GC" },
      },
   DefRows: {
      Base: { MarginRestColor:"marginbody" },
      R0: { Block:"B1", DA:"R0", AIKind:"Contractor", TopMarginTop:5, MarginTopColor:"marginbody", Accept:"", CollapseLevel:-1, DHeight:1 },
      R: { L:1, S:2, Tree:"Year", FirstMarginTop:5, LastMarginBottom:5, MarginTopColor:"marginbody", MarginBottomColor:"marginbody", NoIndex:1, NoSelect:8, DHeight:1 },
      R1: { D:"R", DA:"R1", AIKind:"2023", RS: { Chart:3 } },
      R2: { D:"R", DA:"R2", AIKind:"2022", NoEdit:1, TextColor:"gray", RowBorder:"rowborder" },
      R3: { D:"R", DA:"R3", AIKind:"Gain", NoEdit:1, Formula:"", NoSave:1 },
      Total: { AIKind:"Total", NoEdit:1, NoIndex:1, NoSelect:3, NoSearch:1, NoDelete:1, Item:"$CTotals" },
      Header: { AIKind:"Header", Height:25, Item:"$CHeaders", MarginRestColor : "marginheader" },
      Filter: { FilterBlock:1, FilterAction:1, Range:1, DefaultFilter:1, NoSelect:3, MinHeight:18, Item:"$CFilters" },
      R0Filter: { D:"R0,Filter", AIKind:"Filter" }, R1Filter: { D:"R1,Filter", AIKind:"Filter" }, R2Filter: { D:"R2,Filter", AIKind:"Filter" }, R3Filter: { D:"R3,Filter", AIKind:"Filter" },
      Group: { DA:"G", CD:"R0", Accept:"Row,R0", S:2, AIKind:"Group", Formula:""/*, F: { Total:"Grid.Script.fulltotal(Grid,Row,Col,0)" }*/, NoCalc:1, NoIndex:1, NoFilterRow:2, NoSelect:1, NoEdit:1, NoPaste:2, Tree:"Year", DHeight:1,
         A: { 
            Year: { Mirror:7, MirrorCol:"Name", Color:"group" }, Total: { Mirror:7, MirrorCol:"Name", Color:"group" }, //. To display the Name in Year or Total column, because the group rows are in different row set.
            Region: { Mirror:3, MirrorRow:"GroupChildren" }, Country: { Mirror:3, MirrorRow:"GroupChildren" }, State: { Mirror:3, MirrorRow:"GroupChildren" }, //. For sorting
            },
         CS: { Year:2, A1:4,  A2:4, A3:4, A4:4, A5:4, A6:4, A7:4, A8:4, A9:4, A10:4, A11:4, A12:4 }, DCS:1
         },
      },
   Head:[
      { id:"Header3", D:"Header", Wrap:4, Index:0, LevelsPart:"Body", TopMarginTop:5, MarginTopColor:"marginheader", FE:3,
         V: { Name:"$CName", Region:"$CRegion", Country:"$CCountry", State:"$CState", Partner:"$CPartner", Since:"$CSince", Calls:"$CCalls", Rabat:"$CRabat", Year:"$CYear", Total:"$CTotal", SinceMonthDay:"$CSinceMonthDay", SinceWeekDay:"$CSinceWeekDay", SinceMonth:"$CSinceMonth", SinceYear:"$CSinceYear" }, 
         A: { Panel: { LeftIcons:"SelectRows,DeleteRows" }, Name: { RightIconsFormula:"Grid.IsHidden(Grid.Rows.Header) ? 'ExpandRow' : 'CollapseRow'", ExpandRowButton:"ExpandHeader", CollapseRowButton:"ExpandHeader" } },
         OnClickExpandHeader:"Grid.Hide([Grid.Rows.Header,Grid.Rows.Header2,Grid.Rows.Total1,Grid.Rows.Total2,Grid.Rows.Total3]); return 1;"
         },
      { id:"Header2", D:"Header", DA:"H2", S:2, MarginTop:5, MarginTopColor:"marginheader", Index:0, RS: { Chart:2, Year:2, Total:2 }, A: { Year: { SortCol:"" } }, 
         V: { Chart:"$CChart", Year:"$CYear", Total:"$CTotal" } 
         },
      { id:"Header", D:"Header", S:2, MarginBottom:5, MarginBottomColor:"marginheader", RS: { Year:0, Total:0 } },
      ],
   Head2:[
      { id:"Filter", D:"R0Filter", L:0, Block:4, FilterD:"R0", Collapsed:1,
         V: { Index:"$CFilters" },
         A: { 
            Panel: { D:"FilterAction" },
            Name: { DefaultFilter:11 },
            Region: { LeftIcons:"" }, 
            Country: { LeftIcons:"" }, 
            State: { LeftIcons:"" }, 
            Partner: { LeftIcons:"", Range:0 },
            Since: { LeftIcons:"Filter,Date", RightIcons:"", Range:1, Format:"d" },
            Calls: { LeftIcons:"" },
            },  
         },
      { id:"Filter1", D:"R1Filter", DA:"Filter1", FilterD:"R1", RS: { Year:3 },
         A: { 
            Panel: { D:"FilterAction" },
            Chart: { NoFilterBy:1, NoEdit:1, LeftIcons:"" },
            Year: { Value:"", LeftIcons:"", RightIcons:"List", Button:"List", Range:1, Wrap:1, FilterBlock:0, FilterD:"", List:"|$X2023|$X2022|$XGain" }
            },
         },
      { id:"Filter2", D:"R2Filter", DA:"Filter2", FilterD:"R2", NoEdit:-2, A: { Panel: { D:"FilterAction" } } },
      { id:"Filter3", D:"R3Filter", DA:"Filter3", FilterD:"R3", NoEdit:-2, A: { Panel: { D:"FilterAction" } } },
      ],
   Foot: [
      { id:"Total1", S:2, D:"Total", DA:"T1", Block:3, Formula:"", F: { Total:"Grid.Script.fulltotal(Grid,Row,Col,0)" }, MarginTop:5, MarginTopColor:"marginbody",
         V: { Name:"Total", Year:"$XTotal2023" }, CS: { A1:4,  A2:4, A3:4, A4:4, A5:4, A6:4, A7:4, A8:4, A9:4, A10:4, A11:4, A12:4 },
         A: { Total: { TextStyle:5, TextColor:"dark" }, Year: { Align:0 } } 
         },
      { id:"Total2", S:2, D:"Total", DA:"T2", TextColor:"gray", Formula:"", F: { Total:"Grid.Script.fulltotal(Grid,Row,Col,0)" }, 
         V: { Year:"$XTotal2022" }, CS: { A1:4,  A2:4, A3:4, A4:4, A5:4, A6:4, A7:4, A8:4, A9:4, A10:4, A11:4, A12:4 },
         A: { Total: { TextStyle:5 }, Year: { Align:0 } } 
         },
      { id:"Total3", S:2, D:"Total", DA:"T3", Formula:"", F: { Total:"Grid.Script.fulltotal(Grid,Row,Col,0)" }, MarginBottom:5, MarginBottomColor:"marginbody",
         CS: { A1:4,  A2:4, A3:4, A4:4, A5:4, A6:4, A7:4, A8:4, A9:4, A10:4, A11:4, A12:4 }, 
         A: { Year: { Value:"$XTotalGain", Align:0 }, Total: { TextStyle:5, TextColorFormula:"CValue>0?'blue':CValue<0?'red':'dark'" } }   
         }
      ],
   DefCols:{
      Base: { Item:0 },
      Location: { Type:"String", RightIcons:"List", Button:"List", IndexList:1, Item2:"$CLocation" },
      Margin: { 
         RightMarginRight:5, MarginRightColor: { Head:"marginheader", Head2:"marginbody", Body:"marginbody", Foot:"marginbody" },
         BlockMarginLeft:5, MarginLeftColor: { Head:"marginheader", Head2:"marginbody", Body:"marginbody", Foot:"marginbody" } 
         },
      Number:    { D:"Margin", Type:"Number", Format:",0.##", ExportFormat:"#,0" },
      Amount:    { D:"Number", DA:"A", Item1:"A", Width:65, ResizeWidth:1, DWidth:1, UCode:0x08, FE:1+2+256, V: { Header:"$CAmount" }, CS: { Header2: 4 } },
      Price:     { D:"Number", DA:"P", Item1:"P", Width:70, ResizeWidth:1, DWidth:1, UCode:0x807, V: { Header:"$CPrice" } },
      Total:     { D:"Number", DA:"T", Item1:"T", Width:90, ResizeWidth:1, DWidth:1, NoEdit:1, TextColor:"green", V: { Header:"$CTotal" } },
      Verified:  { D:"Margin", DA:"V", Item1:"V", Width:65, ResizeWidth:1, DWidth:1, UCode:0x0B, FE:1+2+256, Type:"Bool", V: { Header:"$CVerified" }, A: { Total: { Type:"String" } } },
      },
   LeftCols:[
      { id:"Index", D:"Index", Block:"Panel", Width:68, Button:"", SortIcons:0, NoExport:0, Item:"", Item2:"$CChartIndex", ItemSearch2:"Index", NoMove:1, Fix:1, FE:258 },
      { id:"Panel", D:"Panel", Block:"Panel", DA:"Panel", LeftIcons:"SelectRow,DeleteRow,AddRow", IconWrap:1, Width:62, Item2:"$CChartIndex", ItemSearch2:"Panel", NoMove:1, Fix:1, NoPrint:0, NoExport:1, NoSearch:1 },
      { id:"Name", UCode:0xD1, UIndex:6, Type:"String", Width:250, ExportWidth:150, MinWidth:10, Names:1, Item2:"$CNameYear", ItemSearch2:"Name", NoMove:3, Fix:1 } //. Surname is in Texts, first name in UTexts
      ],
   LeftCols$2:[
      { id:"Chart", D:"Margin", Block:"Chart", DA:"C", Width:125, Color:"marginbody", RowBorder:"marginbody", ColBorder:"marginbody", Item2:"$CChartIndex", ItemSearch2:"Chart", NoColor:7,
         Marks: " Chart({ Chart:'Bar', Values: Grid.Script.GetChartValues(Grid,Row,0), Max:300000, Min:-50000, Fill:Grid.Colors.cafd, Stroke:Grid.Colors.c0a0, OverFill:Grid.Colors.c4d8, OverStroke:Grid.Colors.c0a0, Padding:[0,2,0,0], Axis:Grid.Colors.caxis, Count:2, Order:0 }); "
               +" Chart({ Chart:'Bar', Values: Grid.Script.GetChartValues(Grid,Row,1), Max:300000, Min:-50000, Fill:Grid.Colors.cddd, Stroke:Grid.Colors.c888, OverFill:Grid.Colors.caaa, OverStroke:Grid.Colors.c888, Padding:[0,2,0,0], Axis:Grid.Colors.caxis, Count:2, Order:1 }); "
               +" Chart({ Chart:'Line', Button:'Chart', Values: Grid.Script.GetChartValues(Grid,Row,2), Max:300000, Min:-50000, LineStroke:Grid.Colors.cbbb, Point:9, Fill:Grid.Colors.c66f, NegFill:Grid.Colors.cf66, OverFill:Grid.Colors.c00a, NegOverFill:Grid.Colors.ca00, Axis:'', Padding:[0,1,0,0] }); ",
         OnTip: "ShowTip(0,Grid.Script.GetChartTip(Grid,Row,Col,Event.Button)),1", Tip:"dummy", NoEdit:1, NoSortBy:1, NoSearch:1, NoMove:3, Fix:1, UseResize:2, ResizeHeight:1, ShortColBorder:0
         },
      { id:"Year",  D:"Number", Block:"Year", DA:"Year",  Width:128, Type:"String", Align:0, Format:"", ExportFormat:"", ExportWidth:63, Item2:"$CNameYear", ItemSearch2:"Year", NoGroupBy:1, NoEdit:1, NoMove:1, Fix:1 },
      { id:"Total", D:"Number", Block:"Year", DA:"Total", Width:112, Formula:"T1+T2+T3+T4+T5+T6+T7+T8+T9+T10+T11+T12", TextColor:"green", Item2:"$CNameYear", ItemSearch2:"Total", NoEdit:1, NoMove:1, Fix:1 }
      ],
   Cols: [
      { id:"Region", D:"Location", UCode:0x08, UIndex:0.5, ClearCells:"Country,State", Width:200, ExportWidth:230, DA:"Region", Translate:3,
         List:"|$CentralSouthAsia|$EastAsia|$EastEurope|$MiddleEast|$NorthCentralAmerica|$SouthAmerica|$SubSaharanAfrica|$WestEurope" },
      { id:"Country", D:"Location", UCode:0x08, UIndex:1.1, ListRelated:"Region", ClearCells:"State", Width:150, ExportWidth:130, DA:"Country", SortList:2, Translate:3, List:[
         "|$Armenia|$Azerbaijan|$Bangladesh|$India|$Kazakstan|$Pakistan|$SriLanka", 
         "|$Australia|$Brunei|$China|$HongKong|$Indonesia|$Japan|$KoreaNorth|$Malaysia|$Mongolia|$Myanmar|$NewZealand|$PapuaNewGuinea|$Philippines|$Singapore|$SouthKorea|$Taiwan|$Thailand|$Vietnam", 
         "|$Albania|$Belarus|$Bulgaria|$Croatia|$CzechRepublic|$Estonia|$Hungary|$Latvia|$Lithuania|$Moldova|$Poland|$Romania|$Russia|$SerbiaMontenegro|$SlovakRepublic|$Slovenia|$Ukraine", 
         "|$Algeria|$Bahrain|$Egypt|$Iran|$Iraq|$Israel|$Jordan|$Kuwait|$Lebanon|$Libya|$Morocco|$Oman|$Qatar|$SaudiArabia|$Syria|$Tunisia|$UAE|$Yemen", 
         "|$Bahamas|$Canada|$CostaRica|$Cuba|$DominicanRepublic|$ElSalvador|$Guatemala|$Haiti|$Honduras|$Jamaica|$Mexico|$Nicaragua|$Panama|$TrinidadTobago|$UnitedStates", 
         "|$Argentina|$Bolivia|$Brazil|$Chile|$Colombia|$Ecuador|$Guyana|$Paraguay|$Peru|$Suriname|$Uruguay|$Venezuela", 
         "|$Angola|$Botswana|$BurkinaFaso|$Cameroon|$Congo|$Congodr|$CoteIvoire|$Ethiopia|$Gabon|$Gambia|$Ghana|$Guinea|$GuineaBissau|$Kenya|$Liberia|$Madagascar|$Malawi|$Mali|$Mozambique|$Namibia|$Niger|$Nigeria|$Senegal|$SierraLeone|$Somalia|$SouthAfrica|$Sudan|$Tanzania|$Togo|$Uganda|$Zambia|$Zimbabwe", 
         "|$Austria|$Belgium|$Cyprus|$Denmark|$Finland|$France|$Germany|$Greece|$Iceland|$Ireland|$Italy|$Luxembourg|$Malta|$Netherlands|$Norway|$Portugal|$Spain|$Sweden|$Switzerland|$Turkey|$UnitedKingdom"
         ]},
      { id:"State", D:"Location", UCode:0x01, UIndex:2, ListRelated:"Region,Country", Width:180, DA:"State", SortList:2, Translate:3, List:{
         0: { 
               3: "|$AndhraPradesh|$ArunachalPradesh|$Assam|$Bihar|$Chhattisgarh|$Goa|$Gujarat|$Haryana|$HimachalPradesh|$Jharkhand|$Karnataka|$Kerala|$MadhyaPradesh|$Maharashtra|$Manipur|$Meghalaya|$Mizoram|$Nagaland|$Odisha|$Punjab|$Rajasthan|$Sikkim|$TamilNadu|$Telangana|$Tripura|$UttarPradesh|$Uttarakhand|$WestBengal|-|$AndamanandNicobarIslands|$Chandigarh|$DadraandNagarHaveliandDamanandDiu|$Delhi|$JammuandKashmir|$Ladakh|$Lakshadweep|$Puducherry" 
            },
         1: { 
               0: "|$NewSouthWales|$Queensland|$SouthAustralia|$Tasmania|$Victoria|$WesternAustralia|-|$AustralianCapitalTerritory|$JervisBayTerritory|$NorthernTerritory|$AustralianAntarcticTerritory|$ChristmasIsland|$CocosKeelingIslands|$HeardIslandandMcDonaldIslands|$NorfolkIsland",
               2: "|$Anhui|$Beijing|$Chongqing|$Fujian|$Guangdong|$Gansu|$Guizhou|$Henan|$Hubei|$Hebei|$Hainan|$Heilongjiang|$Hunan|$Jilin|$Jiangsu|$Jiangxi|$Liaoning|$Qinghai|$Sichuan|$Shandong|$Shanghai|$Shaanxi|$Shanxi|$Tianjin|$Yunnan|$Zhejiang|-|$GuangxiZhuang|$InnerMongolia|$NingxiaHui|$XinjiangUyghur|$Tibet",
               5: "|$Chubu|$Chugoku|$Hokkaido|$Kansai|$Kanto|$Kyushu|$Shikoku|$Tohoku" 
            },
         4: { 
               1: "|$Alberta|$BritishColumbia|$Manitoba|$NewBrunswick|$NewfoundlandandLabrador|$NovaScotia|$Ontario|$PrinceEdwardIsland|$Quebec|$Saskatchewan",
               14: "|$Alabama|$Alaska|$Arizona|$Arkansas|$California|$Colorado|$Connecticut|$Delaware|$Florida|$Georgia|$Hawaii|$Idaho|$Illinois|$Indiana|$Iowa|$Kansas|$Kentucky|$Louisiana|$Maine|$Maryland|$Massachusetts|$Michigan|$Minnesota|$Mississippi|$Missouri|$Montana|$Nebraska|$Nevada|$NewHampshire|$NewJersey|$NewMexico|$NewYork|$NorthCarolina|$NorthDakota|$Ohio|$Oklahoma|$Oregon|$Pennsylvania|$RhodeIsland|$SouthCarolina|$SouthDakota|$Tennessee|$Texas|$Utah|$Vermont|$Virginia|$Washington|$WestVirginia|$Wisconsin|$Wyoming|-|$DistrictofColumbia|-|$AmericanSamoa|$Guam|$NorthernMarianaIslands|$PuertoRico|$USVirginIslands" 
            },
         5: {
               2: "|$Acre|$Alagoas|$Amapa|$Amazonas|$Bahia|$Ceara|$DistritoFederal|$EspiritoSanto|$Goias|$Maranhao|$MatoGross|$MatoGrossodoSul|$MinasGerais|$Para|$Paraiba|$Parana|$Pernambuco|$Piaui|$RiodeJaneiro|$RiodoNort|$RiodoSul|$Rondonia|$Roraima|$SantaCatarina|$SaoPaulo|$Sergipe|$Tocantins",
            },
         7: {
               5: "|$Alsace|$Aquitaine|$Auvergne|$Brittany|$Burgundy|$CentreValdeLoire|$ChampagneArdenne|$FrancheComte|$IledeFrance|$LanguedocRoussillon|$Limousin|$Lorraine|$LowerNormandy|$MidiPyrenees|$NordPasdeCalais|$PaysdelaLoire|$Picardy|$PoitouCharentes|$ProvenceAlpesCotedAzur|$RhoneAlpes|$UpperNormandy",
               6: "|$BadenWurttemberg|$Bavaria|$Berlin|$Brandenburg|$Bremen|$Hamburg|$Hesse|$LowerSaxony|$MecklenburgWesternPomerania|$NorthRhineWestphalia|$RhinelandPalatinate|$Saarland|$Saxony|$SaxonyAnhalt|$SchleswigHolstein|$Thuringia",
               10: "|$Abruzzo|$AostaValley|$Apulia|$Basilicata|$Calabria|$Campania|$EmiliaRomagna|$FriuliVeneziaGiulia|$Lazio|$Liguria|$Lombardy|$Marche|$Molise|$Piedmont|$Sardinia|$Sicily|$TrentinoSouthTyrol|$Tuscany|$Umbria|$Veneto",
               16: "|$Andalusia|$Aragon|$Asturias|$BalearicIslands|$BasqueCountry|$CanaryIslands|$Cantabria|$CastileandLeon|$CastillaLaMancha|$Catalonia|$CommunityofMadrid|$Extremadura|$Galicia|$LaRioja|$Navarre|$RegionofMurcia|$ValencianCommunity|-|$Ceuta|$Melilla",
               20: "|$England|$NorthernIreland|$Scotland|$Wales",
            }
         }},
      { id:"Partner", UCode:0x0B, UIndex:1, Type:"Bool", Width:60, FE:256, Item2:"$CPartner" },
      { id:"Since", UCode:FGrid.GetUCode(2,1,12,1,0,0,0,Date.UTC(2020,1,1)), UIndex:4, Width:230, Type:"Date", Format:"dddd, dddddd MMMM yyyy", EditFormat:"d/MMMM/yyyy", RightIcons:"Date", FE:1+2+256, Align:2, Item2:"$CSince" }, //. UCode = 0x45C + base 1/1/2020
      { id:"Calls", UCode:0x0D, UIndex:0, Type:"Auto", Width:90, IndexList:1, RightIcons:"List", Button:"List", List:"|$Lweek|$Lmonth|$Lquarter|$Lhalfyear|$Lyear", Translate:3, Item2:"$CCalls" },
      { id:"Rabat", UCode:0x01, UIndex:3, Type:"Number", Format:"0.##\\%", ExportFormat:"General\\%", FE:1+2+256+512, Width:50, ExportWidth:70, Item2:"$CRabat" },
      //. Hidden columns with parsed Since date, usable for grouping, sorting or filtering by AI
      { id:"SinceWeekDay", Type:"String", Formula:"Grid.DateToString(Since,'dddd')", NoEdit:1, Item2:"$CSinceWeekDay", Hidden:1, DA:"SinceWeekDay" },
      { id:"SinceMonthDay", Type:"String", Formula:"Grid.DateToString(Since,'dd')", NoEdit:1, Item2:"$CSinceMonthDay", Hidden:1 },
      { id:"SinceMonth", Type:"String", Formula:"Grid.DateToString(Since,'MMMM')", NoEdit:1, Item2:"$CSinceMonth", Hidden:1, DA:"SinceMonth" },
      { id:"SinceYear", Type:"String", Formula:"Grid.DateToString(Since,'yyyy')", NoEdit:1, Item2:"$CSinceYear", Hidden:1 }
      ],
   Cols$2:[
      { id:"A1",  D:"Amount", UIndex:0.1,  Item:1,  V: { Header2:"$CJanuary" } },  { id:"P1",  D:"Price", UIndex:1,  Item:1 },  { id:"T1",  D:"Total", Item:1,  Formula:"A1*P1" },   { id:"V1",  D:"Verified", UIndex:0,  Item:1 },
      { id:"A2",  D:"Amount", UIndex:2.1,  Item:2,  V: { Header2:"$CFebruary" } }, { id:"P2",  D:"Price", UIndex:3,  Item:2 },  { id:"T2",  D:"Total", Item:2,  Formula:"A2*P2" },   { id:"V2",  D:"Verified", UIndex:2,  Item:2 },
      { id:"A3",  D:"Amount", UIndex:4.1,  Item:3,  V: { Header2:"$CMarch" } },    { id:"P3",  D:"Price", UIndex:5,  Item:3 },  { id:"T3",  D:"Total", Item:3,  Formula:"A3*P3" },   { id:"V3",  D:"Verified", UIndex:4,  Item:3 },
      { id:"A4",  D:"Amount", UIndex:6.1,  Item:4,  V: { Header2:"$CApril" } },    { id:"P4",  D:"Price", UIndex:7,  Item:4 },  { id:"T4",  D:"Total", Item:4,  Formula:"A4*P4" },   { id:"V4",  D:"Verified", UIndex:6,  Item:4 },
      { id:"A5",  D:"Amount", UIndex:8.1,  Item:5,  V: { Header2:"$CMay" } },      { id:"P5",  D:"Price", UIndex:9,  Item:5 },  { id:"T5",  D:"Total", Item:5,  Formula:"A5*P5" },   { id:"V5",  D:"Verified", UIndex:8,  Item:5 },
      { id:"A6",  D:"Amount", UIndex:10.1, Item:6,  V: { Header2:"$CJune" } },     { id:"P6",  D:"Price", UIndex:11, Item:6 },  { id:"T6",  D:"Total", Item:6,  Formula:"A6*P6" },   { id:"V6",  D:"Verified", UIndex:10, Item:6 },
      { id:"A7",  D:"Amount", UIndex:12.1, Item:7,  V: { Header2:"$CJuly" } },     { id:"P7",  D:"Price", UIndex:13, Item:7 },  { id:"T7",  D:"Total", Item:7,  Formula:"A7*P7" },   { id:"V7",  D:"Verified", UIndex:12, Item:7 },
      { id:"A8",  D:"Amount", UIndex:14.1, Item:8,  V: { Header2:"$CAugust" } },   { id:"P8",  D:"Price", UIndex:15, Item:8 },  { id:"T8",  D:"Total", Item:8,  Formula:"A8*P8" },   { id:"V8",  D:"Verified", UIndex:14, Item:8 },
      { id:"A9",  D:"Amount", UIndex:16.1, Item:9,  V: { Header2:"$CSeptember" } },{ id:"P9",  D:"Price", UIndex:17, Item:9 },  { id:"T9",  D:"Total", Item:9,  Formula:"A9*P9" },   { id:"V9",  D:"Verified", UIndex:16, Item:9 },
      { id:"A10", D:"Amount", UIndex:18.1, Item:10, V: { Header2:"$COctober" } },  { id:"P10", D:"Price", UIndex:19, Item:10 }, { id:"T10", D:"Total", Item:10, Formula:"A10*P10" }, { id:"V10", D:"Verified", UIndex:18, Item:10 },
      { id:"A11", D:"Amount", UIndex:20.1, Item:11, V: { Header2:"$CNovember" } }, { id:"P11", D:"Price", UIndex:21, Item:11 }, { id:"T11", D:"Total", Item:11, Formula:"A11*P11" }, { id:"V11", D:"Verified", UIndex:20, Item:11 },
      { id:"A12", D:"Amount", UIndex:22.1, Item:12, V: { Header2:"$CDecember" } }, { id:"P12", D:"Price", UIndex:23, Item:12 }, { id:"T12", D:"Total", Item:12, Formula:"A12*P12" }, { id:"V12", D:"Verified", UIndex:22, Item:12 },
      ],
   RightCols$2:{ }, //. Defines the second set in RightCols to permit dropping the second set columns here
   Cols_Cfg:{ MinWidth:200 },
   Body_Cfg:{
      Tree:"Name", CD:"R0", Par:"P1,P2,P2",
      Group:"Region,Country,State",
      ScrollOnDrag:"",
      },
   TopScroll_Cfg: { ScrollOnDrag:"1,-4000%,Body" },
   Head_Cfg: { ScrollOnDrag:"0.33,-400%,Body,0.66,-50%,Body,1,-3,Body" },
   Head2_Cfg: { Tree:"Name", Accept:"", ScrollOnDrag:"1,-3,Body" },
   Foot_Cfg: { ScrollOnDrag:"-0.33,400%,Body,-0.66,50%,Body,-1,3,Body" },
   BottomScroll_Cfg: { ScrollOnDrag:"-1,4000%,Body" },
   Blocks:{
      B1: [ { }, { D:"R1" }, { D:"R2" }, { D:"R3", Add:1 } ],
      },
   Actions: {
      OnClickAddRow:"AddRow(0,0,3)",
      OnClickDeleteRows:"DeleteRows(1,1,3)",
      },
   Dialogs: { Layout: { Script: { Options:16, Grouped:2 } } },  //. Permits hiding individual columns from block in the Layout menu and shows Grouped column in Base columns
   DefTools: { 
      //SearchText: { Width:50 },               //. Decreases width of the Search combo on toolbar
      Cookies: { MinWidth:50, Width:0 },                  //. Decreases width of the Cookies combo on toolbar
      Drag: { MinWidth:50, MaxWidth:110 },    //. Increases minimal width of the grouped column caption on toolbar
      AIInput: { MinWidth:210, Rel:1, },
      AIOutput: { MinWidth:300, Rel:3 }
      },
   Top: [
      "Search",
      { id:"Toolbar1", Cells:[ "Save","Reload","Print","Pdf","Export" ], Item:"Data" }, 
      { id:"Toolbar2", Cells:[ "Copy","PasteOnly" ], Item:"$CClipboard" }, 
      { id:"Toolbar3", Cells:[ "Undo","Redo","AddRowEnd","ExpandRows","CollapseRows" ], Item:"$CManipulation" }, 
      { id:"Toolbar4", Cells:[ "Settings","Filter","Sort","TipAction","Lock" ], Item:"$CSettings" }, 
      "Layout", "Styles", 
      { id:"DataSet", Item:"$CDataSet", Cells: [ { id:"Data", D:"List", MinWidth:275, Width:0, Align:1, Label:"$XData", TextColor:"blue", UseResize:2,
         Formula: "Grid.GetSources(1)[1].match(/SetsData\\d+\\w*/)[0]", DisabledFormula:"Grid.IsLocked('Data')", Translate:3, 
         List: { 
            SetsData10: { Value: "40 $Nrows / 1,600 $Ncells (2 kB)", Text:"40 $Nrows /            1,600 $Ncells     (2 kB)" }, 
            SetsData100: { Value: "400 $Nrows / 16,000 $Ncells (9 kB)", Text:"400 $Nrows /          16,000 $Ncells     (9 kB)" }, 
            SetsData1000: { Value: "4,000 $Nrows / 160,000 $Ncells (75 kB)", Text:"4,000 $Nrows /        160,000 $Ncells   (75 kB)" }, 
            SetsData2500: { Value: "10,000 $Nrows / 400,000 $Ncells (0.2 MB)", Text:"10,000 $Nrows /        400,000 $Ncells (0.2 MB)" }, 
            SetsData10000: { Value: "40,000 $Nrows / 1,600,000 $Ncells (0.7 MB)", Text:"40,000 $Nrows /     1,600,000 $Ncells (0.7 MB)" }, 
            SetsData25000: { Value: "100,000 $Nrows / 4,000,000 $Ncells (1.6 MB)", Text:"100,000 $Nrows /     4,000,000 $Ncells (1.6 MB)<br><span style=\"color:silver;\">$Ndownload</span>" }, 
            SetsData100000: { Value: "400,000 $Nrows / 16,000,000 $Ncells (6.5 MB)", Text:"400,000 $Nrows /   16,000,000 $Ncells (6.5 MB)<br><span style=\"color:silver;\">$Ndownload</span>" }, 
            SetsData250000: { Value: "1,000,000 $Nrows / 40,000,000 $Ncells (15 MB)", Text:"1,000,000 $Nrows /   40,000,000 $Ncells  (15 MB)<br><span style=\"color:silver;\">$Ndownload</span>" }, 
            SetsData250000D1: { Value: "1,000,000 $Nrows / 40,000,000 $Ncells (15 MB)", Text:'1,000,000 $Nrows /   40,000,000 $Ncells  (15 MB)<br><span style=\"color:silver;\">$Ndownload <span style=\"color:gray;\">$Nbackground</span></span>' },
            SetsData1000000: { Value: "4,000,000 $Nrows / 160,000,000 $Ncells (62 MB)", Text:"4,000,000 $Nrows / 160,000,000 $Ncells  (62 MB)<br><span style=\"color:silver;\">$Ndownload</span>" },
            SetsData1000000D1: { Value: "4,000,000 $Nrows / 160,000,000 $Ncells (62 MB)", Text:'4,000,000 $Nrows / 160,000,000 $Ncells  (62 MB)<br><span style=\"color:silver;\">$Ndownload <span style=\"color:gray;\">$Nbackground</span></span>' },
            },
         //OnChange:"Grid.GetSources().D = null; Grid.Disable(); Grid.GetSources(1)[1] = Grid.GetSources(1)[1].replace(/SetsData\\d+\\w*/,Value); Grid.GetSources(1)[2] = Value.indexOf('D1')>=0 ? { Url:Grid.GetSources(1)[1].replace(/D1\./,'D2.'), Defer: { Row:'Info', Col:'Count', Max:Value=='SetsData1000000D1' ? 621e5 : 152e5 } } : ''; Grid.GetSources(0).Progress = {SetsData25000:16e5,SetsData100000:65e5,SetsData250000:158e5,SetsData1000000:627e5}[Value]; Grid.ActionReload();"
         OnChange: function(Grid,Row,Col,Event){
            var Value = Grid.GetValue(Row,Col,1), S0 = Grid.GetSources(0), S1 = Grid.GetSources(1);
            S0.D = null; Grid.Disable(); 
            S1[1] = S1[1].replace(/SetsData\d+\w*/,Value); 
            if(S1[1].search(/25000|100000/)>=0){ //. Too large data are not included in the react package and it are loaded directly from treegrid.com
               if(S1[1].indexOf("treegrid.com")<0) S1[1] = S1[1].replace(/.*SetsData/,"https://www.treegrid.com/FExamples/Complex/02-Sets/Data/SetsData");
               }
            else if(S1[1].indexOf("treegrid.com")>=0) S1[1] = S1[1].replace(/.*SetsData/,"/02-sets/SetsData");
            S1[2] = Value.indexOf('D1')>=0 ? { Url:S1[1].replace(/D1\./,'D2.'), Defer: { Row:'Info', Col:'Count', Max:Value=='SetsData1000000D1' ? 621e5 : 204e5 } } : ''; 
            S0.Progress = {SetsData25000:21e5,SetsData100000:65e5,SetsData250000:210e5,SetsData1000000:627e5}[Value];
            Grid.ActionReload();
            }
         } ] },
      { id:"GroupList", D:"Group", Cells: [ { id:"GroupList", D:"GroupList", MinWidth:55, Width:0, Translate:3, List:{ "": "$Xnone","Region,Country,State": "$XLocation", "Calls": "$XCalls" }, DisabledFormula:"Grid.IsLocked('group')" }, "Group" ], Item:"$CGroupList" },
      "Cookies",    
      { id:"Languages", Cells:["Languages"], Item:"$CLanguages" }
      ],
   Bottom:[
      "AIInput",{ D:"AIOutput", NewLine:0 },
      { id:"Info", PaddingTop:0, PaddingBottom:0, Cells: [{ id:"Count", NoHover:1, NoEdit:1, NoFocus:3, Type:"Html", Width:-2, Rel:1, Align:1, Wrap:4, Formula:"Grid.IsBusy()==6 ? '<span style=\"color:'+Grid.Colors.blue+';\">'+Value+'</span>' : Grid.Script.rowstotal(Grid)" }], Item:"$CInformation" },
      ],
   Par: {
      P1: ["U",0x2000+10], //. 0x2000 + 10 characters (10)
      P2: ["U",0x2000+24]  //. 0x2000 + 24 characters (2*12)
      },
   Media: {
      Tablet: { //. Changes for touch only screens
         RowParts: [ { id:"TopScroll", Hidden:1 } ],
         ColParts: [ { id:"LeftScroll", Hidden:1 } ]
         },
      Mobile: { //. Changes for small displays, mostly mobile phones 
         LeftCols: [
            { id:"Index", Width:50 },
            { id:"Panel", Width:62 },
            { id:"Name", Width:228 }
            ],
         LeftCols$2:[
            { id:"Chart", Width:107 },
            { id:"Year", Width:113 },
            { id:"Total", Width:105 }
            ],
         Top: [{ id:"Cookies", Next:"GroupList" }]
         }
      },

   Languages: {

      //. --- Base English texts ---
      Base: {

         Text: {
            $ConfirmDelete: "Do you want to delete {Count>4 ? '<b>'+Math.floor(Count/4)+'</b> selected contractors' : 'contractor <b>'+Name+'</b>'}?",
            $Item1: "January", $Item2: "February", $Item3: "March", $Item4: "April", $Item5: "May", $Item6: "June", $Item7: "July", $Item8: "August", $Item9: "September", $Item10: "October", $Item11: "November", $Item12: "December", 
            $ItemA: "Amount", $ItemP:"Price", $ItemT:"Total", $ItemV:"Verified", $ItemCaptionC:"Months", $ItemCaptionC1:"Month values", $ItemCaptionC2:"Base columns",
            $NormalCookie: "Settings",
            $Xall:"all", $Xverified:"verified", $XShown:"Shown", $Xcells:"cells in", $Xrows:"rows", $Xcolumns:"columns", $XData:"Data",
            $Xnone:"none", $XLocation: "Location", $XCalls:"Calls per", $XTotal:"Total", $X2023:"2023", $X2022:"2022", $XGain:"Gain", $XTotal2022:"Total 2022", $XTotal2023:"Total 2023", $XTotalGain:"Total gain",
            $Nrows:"rows", $Ncells: "cells", $Ndownload: "download from treegrid.com", $Nbackground:"on background",
            $Lweek:"week", $Lmonth:"month", $Lquarter:"quarter", $Lhalfyear:"half year", $Lyear:"year",
   
            $CName:"Name", $CRegion:"Region", $CCountry:"Country", $CState:"State or Province", $CPartner:"Partner", $CSince:"Since", $CCalls:"Calls per", $CRabat:"Rabat", $CYear:"Year", $CTotal:"Total", $CSinceMonthDay:"Since Day", $CSinceWeekDay:"Since Weekday", $CSinceMonth:"Since Month", $CSinceYear:"Since Year",
            $CJanuary:"January", $CFebruary: "February", $CMarch: "March", $CApril: "April", $CMay:"May", $CJune: "June", $CJuly: "July", $CAugust:"August", 
            $CSeptember: "September", $COctober: "October", $CNovember: "November", $CDecember: "December", 
            $CChart:"Chart", $CAmount:"Amount", $CPrice:"Price", $CVerified:"Verified",
            $CChartIndex:"Chart + Index", $CNameYear:"Name + Year", $CLocation: "Location", 
            $CHeaders:"Headers", $CFilters:"Filters", $CTotals:"Totals", $CLanguages:"Language",
            $CManipulation:"Manipulation", $CSettings:"Settings", $CGroupList:"Group list", $CInformation:"Information", $CClipboard:"Clipboard", $CDataSet:"Data set",

            $CentralSouthAsia: "Central & South Asia", $EastAsia: "East Asia & the Pacific", $EastEurope: "East Europe", $MiddleEast: "Middle East & North Africa",
            $NorthCentralAmerica:"North & Central America", $SouthAmerica:"South America", $SubSaharanAfrica:"Sub-Saharan Africa", $WestEurope:"West Europe",

            $Armenia: "Armenia", $Azerbaijan: "Azerbaijan", $Bangladesh: "Bangladesh", $India: "India", $Kazakstan: "Kazakstan", $Pakistan: "Pakistan", $SriLanka: "Sri Lanka", 
            $Australia: "Australia", $Brunei: "Brunei", $China: "China", $HongKong: "Hong Kong", $Indonesia: "Indonesia", $Japan: "Japan", $KoreaNorth: "Korea, dpr", $Malaysia: "Malaysia",
            $Mongolia: "Mongolia", $Myanmar: "Myanmar", $NewZealand: "New Zealand", $PapuaNewGuinea: "Papua New Guinea", $Philippines: "Philippines", $Singapore: "Singapore", 
            $SouthKorea: "South Korea", $Taiwan: "Taiwan", $Thailand: "Thailand", $Vietnam: "Vietnam",
            $Albania: "Albania", $Belarus: "Belarus", $Bulgaria: "Bulgaria", $Croatia: "Croatia", $CzechRepublic: "Czech Republic", $Estonia: "Estonia", $Hungary: "Hungary",
            $Latvia: "Latvia", $Lithuania: "Lithuania", $Moldova: "Moldova", $Poland: "Poland", $Romania: "Romania", $Russia: "Russia", $SerbiaMontenegro: "Serbia-Montenegro",
            $SlovakRepublic: "Slovak Republic", $Slovenia: "Slovenia", $Ukraine: "Ukraine",
            $Algeria: "Algeria", $Bahrain: "Bahrain", $Egypt: "Egypt", $Iran: "Iran", $Iraq: "Iraq", $Israel: "Israel", $Jordan: "Jordan", $Kuwait: "Kuwait", $Lebanon: "Lebanon",
            $Libya: "Libya", $Morocco: "Morocco", $Oman: "Oman", $Qatar: "Qatar", $SaudiArabia: "Saudi Arabia", $Syria: "Syria", $Tunisia: "Tunisia", $UAE: "UAE", $Yemen: "Yemen",
            $Bahamas: "Bahamas", $Canada: "Canada", $CostaRica: "Costa Rica", $Cuba: "Cuba", $DominicanRepublic: "Dominican Republic", $ElSalvador: "El Salvador", $Guatemala: "Guatemala",
            $Haiti: "Haiti", $Honduras: "Honduras", $Jamaica: "Jamaica", $Mexico: "Mexico", $Nicaragua: "Nicaragua", $Panama: "Panama", $TrinidadTobago: "Trinidad & Tobago", 
            $UnitedStates: "United States",
            $Argentina: "Argentina", $Bolivia: "Bolivia", $Brazil: "Brazil", $Chile: "Chile", $Colombia: "Colombia", $Ecuador: "Ecuador", $Guyana: "Guyana", $Paraguay: "Paraguay", $Peru: "Peru",
            $Suriname: "Suriname", $Uruguay: "Uruguay", $Venezuela: "Venezuela",
            $Angola: "Angola", $Botswana: "Botswana", $BurkinaFaso: "Burkina Faso", $Cameroon: "Cameroon", $Congo: "Congo", $Congodr: "Congo dr", $CoteIvoire: "Cote d'Ivoire", 
            $Ethiopia: "Ethiopia", $Gabon: "Gabon", $Gambia: "Gambia", $Ghana: "Ghana", $Guinea: "Guinea", $GuineaBissau: "Guinea-Bissau", $Kenya: "Kenya", $Liberia: "Liberia",
            $Madagascar: "Madagascar", $Malawi: "Malawi", $Mali: "Mali", $Mozambique: "Mozambique", $Namibia: "Namibia", $Niger: "Niger", $Nigeria: "Nigeria", $Senegal: "Senegal",
            $SierraLeone: "Sierra Leone", $Somalia: "Somalia", $SouthAfrica: "South Africa", $Sudan: "Sudan", $Tanzania: "Tanzania", $Togo: "Togo", $Uganda: "Uganda", $Zambia: "Zambia",
            $Zimbabwe: "Zimbabwe",
            $Austria: "Austria", $Belgium: "Belgium", $Cyprus: "Cyprus", $Denmark: "Denmark", $Finland: "Finland", $France: "France", $Germany: "Germany", $Greece: "Greece", $Iceland: "Iceland",
            $Ireland: "Ireland", $Italy: "Italy", $Luxembourg: "Luxembourg", $Malta: "Malta", $Netherlands: "Netherlands", $Norway: "Norway", $Portugal: "Portugal", $Spain: "Spain",
            $Sweden: "Sweden", $Switzerland: "Switzerland", $Turkey: "Turkey", $UnitedKingdom: "United Kingdom",

            $AndhraPradesh: "Andhra Pradesh", $ArunachalPradesh: "Arunachal Pradesh", $Assam: "Assam", $Bihar: "Bihar", $Chhattisgarh: "Chhattisgarh", $Goa: "Goa", $Gujarat: "Gujarat",
            $Haryana: "Haryana", $HimachalPradesh: "Himachal Pradesh", $Jharkhand: "Jharkhand", $Karnataka: "Karnataka", $Kerala: "Kerala", $MadhyaPradesh: "Madhya Pradesh",
            $Maharashtra: "Maharashtra", $Manipur: "Manipur", $Meghalaya: "Meghalaya", $Mizoram: "Mizoram", $Nagaland: "Nagaland", $Odisha: "Odisha", $Punjab: "Punjab", 
            $Rajasthan: "Rajasthan", $Sikkim: "Sikkim", $TamilNadu: "Tamil Nadu", $Telangana: "Telangana", $Tripura: "Tripura", $UttarPradesh: "Uttar Pradesh", $Uttarakhand: "Uttarakhand",
            $WestBengal: "West Bengal", $AndamanandNicobarIslands: "Andaman and Nicobar Islands", $Chandigarh: "Chandigarh", $DadraandNagarHaveliandDamanandDiu: "Dadra and Nagar Haveli and Daman and Diu",
            $Delhi: "Delhi", $JammuandKashmir: "Jammu and Kashmir", $Ladakh: "Ladakh", $Lakshadweep: "Lakshadweep", $Puducherry: "Puducherry", 
   
            $NewSouthWales: "New South Wales", $Queensland: "Queensland", $SouthAustralia: "South Australia", $Tasmania: "Tasmania", $Victoria: "Victoria", $WesternAustralia: "Western Australia",
            $AustralianCapitalTerritory: "Australian Capital Territory", $JervisBayTerritory: "Jervis Bay Territory", $NorthernTerritory: "Northern Territory", 
            $AustralianAntarcticTerritory: "Australian Antarctic Territory", $ChristmasIsland: "Christmas Island", $CocosKeelingIslands: "Cocos (Keeling) Islands",
            $HeardIslandandMcDonaldIslands: "Heard Island and McDonald Islands", $NorfolkIsland: "Norfolk Island", 
   
            $Anhui: "Anhui", $Beijing: "Beijing", $Chongqing: "Chongqing", $Fujian: "Fujian", $Guangdong: "Guangdong", $Gansu: "Gansu", $Guizhou: "Guizhou", $Henan: "Henan", $Hubei: "Hubei",
            $Hebei: "Hebei", $Hainan: "Hainan", $Heilongjiang: "Heilongjiang", $Hunan: "Hunan", $Jilin: "Jilin", $Jiangsu: "Jiangsu", $Jiangxi: "Jiangxi", $Liaoning: "Liaoning", $Qinghai: "Qinghai",
            $Sichuan: "Sichuan", $Shandong: "Shandong", $Shanghai: "Shanghai", $Shaanxi: "Shaanxi", $Shanxi: "Shanxi", $Tianjin: "Tianjin", $Yunnan: "Yunnan", $Zhejiang: "Zhejiang",
            $GuangxiZhuang: "Guangxi Zhuang", $InnerMongolia: "Inner Mongolia", $NingxiaHui: "Ningxia Hui", $XinjiangUyghur: "Xinjiang Uyghur", $Tibet: "Tibet",

            $Chubu: "Chūbu", $Chugoku: "Chūgoku", $Hokkaido: "Hokkaidō", $Kansai: "Kansai", $Kanto: "Kantō", $Kyushu: "Kyūshū", $Shikoku: "Shikoku", $Tohoku: "Tōhoku", 

            $Alberta: "Alberta", $BritishColumbia: "British Columbia", $Manitoba: "Manitoba", $NewBrunswick: "New Brunswick", $NewfoundlandandLabrador: "Newfoundland and Labrador",
            $NovaScotia: "Nova Scotia", $Ontario: "Ontario", $PrinceEdwardIsland: "Prince Edward Island", $Quebec: "Quebec", $Saskatchewan: "Saskatchewan",

            $Alabama: "Alabama", $Alaska: "Alaska", $Arizona: "Arizona", $Arkansas: "Arkansas", $California: "California", $Colorado: "Colorado", $Connecticut: "Connecticut",
            $Delaware: "Delaware", $Florida: "Florida", $Georgia: "Georgia", $Hawaii: "Hawaii", $Idaho: "Idaho", $Illinois: "Illinois", $Indiana: "Indiana", $Iowa: "Iowa", $Kansas: "Kansas",
            $Kentucky: "Kentucky", $Louisiana: "Louisiana", $Maine: "Maine", $Maryland: "Maryland", $Massachusetts: "Massachusetts", $Michigan: "Michigan", $Minnesota: "Minnesota",
            $Mississippi: "Mississippi", $Missouri: "Missouri", $Montana: "Montana", $Nebraska: "Nebraska", $Nevada: "Nevada", $NewHampshire: "New Hampshire", $NewJersey: "New Jersey",
            $NewMexico: "New Mexico", $NewYork: "New York", $NorthCarolina: "North Carolina", $NorthDakota: "North Dakota", $Ohio: "Ohio", $Oklahoma: "Oklahoma", $Oregon: "Oregon",
            $Pennsylvania: "Pennsylvania", $RhodeIsland: "Rhode Island", $SouthCarolina: "South Carolina", $SouthDakota: "South Dakota", $Tennessee: "Tennessee", $Texas: "Texas",
            $Utah: "Utah", $Vermont: "Vermont", $Virginia: "Virginia", $Washington: "Washington", $WestVirginia: "West Virginia", $Wisconsin: "Wisconsin", $Wyoming: "Wyoming",
            $DistrictofColumbia: "District of Columbia", $AmericanSamoa: "American Samoa", $Guam: "Guam", $NorthernMarianaIslands: "Northern Mariana Islands", $PuertoRico: "Puerto Rico",
            $USVirginIslands: "U.S. Virgin Islands",

            $Acre: "Acre", $Alagoas: "Alagoas", $Amapa: "Amapá", $Amazonas: "Amazonas", $Bahia: "Bahia", $Ceara: "Ceará", $DistritoFederal: "Distrito Federal", $EspiritoSanto: "Espírito Santo",
            $Goias: "Goiás", $Maranhao: "Maranhão", $MatoGross: "Mato Grosso", $MatoGrossodoSul: "Mato Grosso do Sul", $MinasGerais: "Minas Gerais", $Para: "Pará", $Paraiba: "Paraíba",
            $Parana: "Paraná", $Pernambuco: "Pernambuco", $Piaui: "Piauí", $RiodeJaneiro: "Rio de Janeiro", $RiodoNort: "Rio Grande do Norte", $RiodoSul: "Rio Grande do Sul", $Rondonia: "Rondônia",
            $Roraima: "Roraima", $SantaCatarina: "Santa Catarina", $SaoPaulo: "São Paulo", $Sergipe: "Sergipe", $Tocantins: "Tocantins", 

            $Alsace: "Alsace", $Aquitaine: "Aquitaine", $Auvergne: "Auvergne", $Brittany: "Brittany", $Burgundy: "Burgundy", $CentreValdeLoire: "Centre-Val de Loire", $ChampagneArdenne: "Champagne-Ardenne",
            $FrancheComte: "Franche-Comté", $IledeFrance: "Île-de-France", $LanguedocRoussillon: "Languedoc-Roussillon", $Limousin: "Limousin", $Lorraine: "Lorraine", $LowerNormandy: "Lower Normandy",
            $MidiPyrenees: "Midi-Pyrénées", $NordPasdeCalais: "Nord-Pas-de-Calais", $PaysdelaLoire: "Pays de la Loire", $Picardy: "Picardy", $PoitouCharentes: "Poitou-Charentes",
            $ProvenceAlpesCotedAzur: "Provence-Alpes-Côte d'Azur", $RhoneAlpes: "Rhône-Alpes", $UpperNormandy: "Upper Normandy", 
   
            $BadenWurttemberg: "Baden-Württemberg", $Bavaria: "Bavaria", $Berlin: "Berlin", $Brandenburg: "Brandenburg", $Bremen: "Bremen", $Hamburg: "Hamburg", $Hesse: "Hesse",
            $LowerSaxony: "Lower Saxony", $MecklenburgWesternPomerania: "Mecklenburg-Western Pomerania", $NorthRhineWestphalia: "North Rhine-Westphalia", 
            $RhinelandPalatinate: "Rhineland-Palatinate", $Saarland: "Saarland", $Saxony: "Saxony", $SaxonyAnhalt: "Saxony-Anhalt", $SchleswigHolstein: "Schleswig-Holstein", $Thuringia: "Thuringia",

            $Abruzzo: "Abruzzo", $AostaValley: "Aosta Valley", $Apulia: "Apulia", $Basilicata: "Basilicata", $Calabria: "Calabria", $Campania: "Campania", $EmiliaRomagna: "Emilia-Romagna",
            $FriuliVeneziaGiulia: "Friuli Venezia Giulia", $Lazio: "Lazio", $Liguria: "Liguria", $Lombardy: "Lombardy", $Marche: "Marche", $Molise: "Molise", $Piedmont: "Piedmont",
            $Sardinia: "Sardinia", $Sicily: "Sicily", $TrentinoSouthTyrol: "Trentino-South Tyrol", $Tuscany: "Tuscany", $Umbria: "Umbria", $Veneto: "Veneto", 

            $Andalusia: "Andalusia", $Aragon: "Aragon", $Asturias: "Asturias", $BalearicIslands: "Balearic Islands", $BasqueCountry: "Basque Country", $CanaryIslands: "Canary Islands",
            $Cantabria: "Cantabria", $CastileandLeon: "Castile and León", $CastillaLaMancha: "Castilla–La Mancha", $Catalonia: "Catalonia", $CommunityofMadrid: "Community of Madrid",
            $Extremadura: "Extremadura", $Galicia: "Galicia", $LaRioja: "La Rioja", $Navarre: "Navarre", $RegionofMurcia: "Region of Murcia", $ValencianCommunity: "Valencian Community",
            $Ceuta: "Ceuta", $Melilla: "Melilla",

            $England: "England", $NorthernIreland: "Northern Ireland", $Scotland: "Scotland", $Wales: "Wales",
            },

         AI: {
            //. Sample input history to demonstrate various AI tasks
            InputHistory: "|-|What is in table?|What can you do?|What is in the charts?"
                        + "|What is the highest value in Amount in January?|What is the highest Price?"
                        + "|What is the total price of vendors registered after year 2011 in Brazil?"
                        + "|What is the most common surname?"
                        + "|Select all contractors from Countries starting by B|Choose all vendors from countries in Asia|Select contractors registered after 2/1/2014"
                        + "|Filter the top 10 rows by Total gain"
                        + "|Mark and focus the highest and lowest not zero values in Amount columns"
                        + "|Double values in Amount columns|Add 3 months to dates in America"
                        + "|Set February prices in Canada to 1,234.56|Change all rows with surname Smith to surname Mallory"
                        + "|Set all contractors data verified|Set all vendors data as not verified and next select all vendors that were changed in every month"
                        + "|Change Brazil to Germany in all contractors"
                        + "|Delete all contractors from Europe|Delete all rows"
                        + "|Add 100 vendors to Berlin|Add 10000 contractors and fill their data with meaningful random values, including their details"
                        + "|Copy contractors from USA below the sources each|Copy contractors from Brazil, with values in main rows and empty details"
                        + "|Show only Wisconsin|Show dates between 10/1/2005 and 7/6/2010|Show only names with are least 20 characters|Filter and mark all Amounts less than -20 or higher than 40"
                        + "|Group by month from Since|Sort by Total Gain descending"
                        + "|Hide Amount and Price|Move March to the left section|Undo it"
                        + "|Export data to xlsx"
            }
         }
      }
   });

let grid = null; //. Grid reference received for grid, access the grid object as grid
</script>

<h1>2. Large example with column sets</h1>
   <h5>
      Complex grid with huge data sets with different columns per row and many other features. Only HTML without saving changes.<br/>
      Items used in this sample are explained in the commented source svelte file at <b>./src/grid/02-sets.svelte</b>, 
      UTF8Store data are at <b><a href="/02-sets/SetsData10000.js" target="_blank">./public/02-sets/</a></b>
   </h5>
   <FastGrid src={{ Progress:1800000, Style:'Bare', Sources:[src,'/02-sets/SetsData1000.js'] }} bind:this={grid} style="height: 100%; min-height: 500px; width: 100%" />
