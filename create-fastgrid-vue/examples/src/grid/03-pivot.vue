<script setup>
import { ref } from "vue";
import { FastGrid } from "fastgrid-vue";
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
      },

   //. --- Grid configuration ---
   Cfg: {
      Sheet:"Data",          //. Sheet name to show it on Sheets toolbar. It is also grid id.
      PivotGrid:"Pivot",     //. Pivot grid id, this grid must exist to create the pivot in it   
      RowHeight:18,          //. Predefined height in pixels for all rows in grid without Height attribute set
      IndexList:1,           //. List is set by index instead of key, to shorten the data by using only numbers
      GroupRowIdPrefix:"G-", //. Sets the prefix for group row ids
      SelectAllType:2+16,    //. Shows the number of selected rows in the header select button
      ExpandDigits:5,        //. Shows count of immediate visible children on the collapse button in tree
      HideGroupCols:1,       //. Hides the grouped columns by default
      FilterTree:2,          //. Sets filtering in tree as Show all found. If some row fulfills the condition, all its parents are shown too = shows the group rows that are always filtered out
      HideZero:1,            //. Shows empty cell instead of 0
      LevelsCollapse:1,      //. Levels button collapses all levels instead of only its level
      RowBorder:0,           //. Hides borders between rows by default
      RowChanges:7,          //. Marks changed only cell values and added / deleted rows
      SyncRows:200000,       //. Displays message for sort / group / filter / pivot for grids with more than 200,000 rows
      CopyHtml:1,            //. Copies to clipboard also html, values with Format
      CopyStyles:"Align,VertAlign,Color,TextColor,TextStyle,Html,RowAttr,ColAttr,CellAttr,ColorBorder,DefaultBorder,Bool", //. What styles copies to clipboard
      CopyMenu:"Html,Color,State,TextStyle,CellHtml,Align,VertAlign,DefBorder,Span,-,Items,Layout,HiddenCols,FilteredRows,CollapsedRows,ParentRows,ChildrenRows", //. Items in menu for toolbar cell Copy
      ExportStyles:"Align,VertAlign,Color,TextColor,TextStyle,Html,RowAttr,ColAttr,CellAttr,ColorBorder,DefaultBorder,Bool,Tree", //. What styles exports to xlsx
      ExportMenu:"File,Format,-,Html,Color,State,TextStyle,CellHtml,Align,VertAlign,DefBorder,Span,Tree,Separator,Style,-,Sheets,Items,Layout,HiddenCols,FilteredRows,CollapsedRows,ParentRows,ChildrenRows", //. Items in Export menu
      PrintMenu:"PageSize,PageLandscape,MarginWidth,MarginHeight,FitPage,Pages,Size,-,MoreSheets,Sheets,Items,Layout,HiddenCols,FilteredRows,CollapsedRows,ParentRows,ChildrenRows", //. Items in Print menu
      PdfMenu:"File,-,PageSize,PageLandscape,MarginWidth,MarginHeight,FitPage,Pages,Size,-,MoreSheets,Sheets,Items,Layout,HiddenCols,FilteredRows,CollapsedRows,ParentRows,ChildrenRows", //. Items in Print PDF menu
      LocksMenu:"Edit,Paste,Rows,Cols,Resize,Collapse,SwitchSheet,View,Pivot,Settings,Data,Cookies,Search,Toolbars,Copy,PrintPdf,Export,Reload,Save,Undo", //. List of available locks for the grid features
      PasteFillRows:0, PasteAddRows:2,                //. Pastes as new rows added before focused row
      PasteFillCols:3, PasteAddCols:0,                //. Pastes the whole rows to all columns from start
      CopyPasteInternal:0,                            //. Copy & paste is done via clipboard and also internally with all settings
      PasteDateFormat:"M/d/yyyy",                     //. Format for pasting date, used especially if pasted dates from outside with changed date separator, e.g. to "."
      SearchFocusCol:"Name,Year,Month,Day",           //. Focuses cell in first visible column from the list in found row
      SaveUrl: { Data:{ IO: { Message:"This example does not save changes to server.<br>Now the changes are accepted like they were saved." }} }, //. Simulated save
      IgnoreF:0,                                      //. Set it to 1 to ignore all Fx fast attributes and behave normally and slower with only standard cell attributes
      },
   Cookie:{ Cfg:"Active", Rows:"First,Height" },                    //. Saves rows heights to cookies, but only from the first pages (saves to defaults due DHeight attribute) and saves also actual grid (Pivot or Source)
   RowParts: [
      { id:"TopScroll", Hidden:0 },                                //. Shows also the top scrollbar
      { id:"Head2", Prev:"Head", Rel:100000, MinHeight:70, MinHeightResize:0 }, //. Adds new row section to display the filter. It is not included in section with headers, because of different background and borders between them
      { id:"Empty", Prev:"Foot", Type:"Empty" }                    //. Defines empty part to show toolbar bottom when not enough data displayed
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
      Support: { Type:"String", Hidden:1, NoHide:1, NoExport:1, NoCopy:1, NoSearch:1, FV:1 },                              //. Default settings for hidden support columns FullName, Date and Location. Sets FV:1 - adds reading F for cell value
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
   DefTools: { 
      SearchText: { Width:43 }               //. Decreases width of the Search combo on toolbar
      },
   Top: [
      { id:"Pivot", D:"Pivot", NewLine:1 },   //. Toolbar with predefined pivots and pivot settings
      "PivotRows", "PivotCols", "PivotData",  //. Toolbars to drag columns to create pivot
      { id:"PivotSource", D:"PivotSource", NewLine:1 },        //. Toolbar with column ids available for dragging to Pivot and Group toolbars
      { id:"GroupList", Item:"Group list", NewLine:1, Cells: [ //. List of available predefined groupings
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
      "Styles",                               //. Styles toolbar with Styles combo
      ],
   Bottom: [
      { id:"Sheets", D:"Sheets", Hidden:1 }, //. Sets the Sheets toolbar hidden on start, it is displayed when Pivot is created
      "Search",    //. Search toolbar with search edit and search button
      { id:"Toolbar1", Cells:[ "Save","Reload","Print","Pdf","Export" ], Item:"Controls" },                    //. 1. Toolbar with standard control buttons
      { id:"Toolbar2", Cells:[ "Copy","PasteOnly" ], Item:"Clipboard" },                                       //. 2. Toolbar with standard control buttons
      { id:"Toolbar3", Cells:[ "AddRowEnd","ExpandRows","CollapseRows","Undo","Redo" ], Item:"Manipulation" }, //. 3. Toolbar with standard control buttons
      { id:"Toolbar4", Cells:[ "Settings","Filter","Sort","TipAction","Lock" ], Item:"Settings" },             //. 4. Toolbar with standard control buttons
      "Layout",                               //. Layout toolbar with Layout menu and UpdateToolbars buttons
      "Cookies",                              //. Cookies toolbars with saved configurations
      "DataSet",                              //. Combo with available data sets to choose data to load
      "AI"                                    //. Input and output communication with AI
      ],

   Body_Cfg:{
      MirrorValues:2,    //. Sets all null values in every row from their previous row in the same row set and part. To shorten the input data.
      Alternate:2, AlternateType:2, //. Colors every second row in silver background. If grouped, counts the grouped rows to Alternate to preserve scroll position to the same color by FixedScroll
      DefaultSort:"Ids", //. Default sorting order on ClearSort or if rows equal in actual sorting order
      Group:"Region,Country,State,FullName,Year,Month", //. Predefined grouping
      GroupTree:{ "*": "Name", "Month$|Date$|(Date|Year).*(Name$|FullName$)":"Day", "Year$":"Month", "Name$|FullName$":"Year" }, //. Specifies tree column according to chosen grouping settings
      ND:"New",          //. Default row set to added rows to the Body root
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
         },
      Mobile: { //. Changes for small displays, mostly mobile phones 
         ColsIndex: [ { id:"Index", Width:55 } ],
         ColsIndex2: [ { id:"Ids", Width:55 } ],
         DefToolbars: { DataSet: { Cells: [ { id:"Data", Width:135 } ] } }
         }
      },
   Sheets: {

      //. --- Shared configuration between the Data and Pivot grids ---
      "*": {
         Events:{

            //. --- Called to get actual static (cached) instructions about this grid for AI ---
            OnAIGetStaticInstructions: function(G,ins){
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
               var SG = G.GetPivotSource(), PG = G.GetPivotGrid();
               var S = "## Grid description\n";
               S += "You have data grid, displayed in JavaScript component 'FastGrid', with 'orders' from 'contractors' (or 'vendors') on particular dates in rows. ";
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
               S += "The group row has the only editable cell in the actual tree column. ";
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
               S += "## Grid layout\n";
               S += "The source grid is visually split to scrollable sections called parts. ";
               S += "From top to bottom the row parts are: 'Head' (contains 1 header row [kind='Header') with column ids), 'Head2' (contains 1 filter row [kind='Filter']), 'Body' (contains all other rows), 'Foot' (contains another header [kind='Header] row with summary html texts). ";
               S += "From left to right the column parts are: 'ColsIndex' (contains Index column), 'LeftCols' (contains Panel, Name, Surname, Day, Month and Year columns), "
               S += "'Cols1' (contains Region, Country, State, Partner, Since, Calls, Rabat columns), 'Cols2' (contains Amount, Price, Total, Verified columns), 'ColsIndex2' (contains Ids column). ";
               S += "Columns can be moved to any place, also between parts, rows cannot be moved between parts. "
               S += "Columns Index and Ids cannot be moved and no column can be moved left to Index and right to Ids column. ";
               S += "\n\n";
               S += "## Grid columns actions\n";
               S += "The source grid columns cannot be selected, deleted, added or copied. The columns are not in tree and cannot be expanded or collapsed. ";
               S += "\n\n";
               S += "## Creating pivot grid\n";
               S += "The source grid supports creating pivot grid from its data. ";
               S += "The source columns usually used for creating pivot rows: FullName (as Name+Surname), Location (as Region+Country+State), Region, Country, State. ";
               S += "The source columns usually used for creating pivot columns: Date (as Year+Month), Year, Month, Day. ";
               S += "The source columns usually used for creating pivot data: Amount, Price, Total, Verified (as count of verified rows) , All (as count of all rows). ";
               S += "The source columns that can be used for creating pivot in rows / columns / data: Partner, Since, Calls, Rabat. ";
               S += "\n\n";
               S += "## Pivot grid description\n";
               S += "If pivot grid is created, it is shown instead of the source grid. It is possible to switch between pivot grid and source grid display. ";
               S += "All tool functions parameters and returns use just row and column ids and not their objects. ";
               S += "Identify row and column to the user by its name got by getname() function instead of its id; this name cannot be used in tool functions parameters. ";
               S += "\n### Pivot grid cells\n";
               S += "The most of pivot grid cells are aggregated and not editable; only if the cell is created from one editable source cell, its value can be changed and modified also the source cell. ";
               S += "\n### Pivot grid rows and columns actions\n";
               S += "The pivot grid rows and columns cannot be selected, added, copied, moved or deleted. ";
               S += "\n### Pivot grid sorting\n";
               S += "The pivot grid rows can be sorted by one or more columns except Filter column. ";
               S += "The pivot grid columns can be sorted by one or more rows except Filter row. ";
               S += "\n### Pivot grid filter\n";
               S += "The pivot grid rows and also columns can be filtered by row Filter and column Filter. ";
               S += "It is not possible to filter the pivot grid by Tree and Sum rows and Header and Sum columns. ";
               S += "Every filter row / column cell can have its value and operator to compare the value with iterated row value, e.g. for operator '>=' is row shown when row_value >= filter_value. ";
               S += "Permitted operators: '', '==', '!=', '<', '<=', '>', '>=', 'startsWith', '!startsWith', 'endsWith', '!endsWith', 'includes', '!includes', 'search' (regex), '!search' (regex). ";
               S += "Filter value in all Filter cells can contain more values separated by semicolon to find any of them by operator == or !=. ";
               S += "Filter value in all Filter cells can contain range as startnumber~endnumber to filter in the range by operator == or outside the range by operator !=. ";
               S += "Filter value in all Filter cells can contain also more ranges and / or single values separated by semicolon to find any of them by operator == or !=. ";
               S += "\n### Pivot grid layout\n";
               S += "The pivot grid is visually split to scrollable sections called parts. ";
               S += "From top to bottom the row parts are: 'Head' (contains header row(s) [kind='Header'] with column ids), 'Head2' (contains 1 filter row [kind='Filter']), 'Body' (contains all dynamically generated pivot rows), 'Foot' (contains 'Sum' row [kind='Header'] with summaries). ";
               S += "From left to right the column parts are: 'LeftCols' (contains Tree and Filter columns), 'Cols' (contains all dynamically created pivot columns), 'RightCols' (contains 'Sum' column). ";
               return S;
               },

            //. --- Called to get actual dynamic (not cached) instructions about this grid for AI ---
            OnAIGetDynamicInstructions: function(G,ins){
               var SG = G.GetPivotSource(), PG = G.GetPivotGrid(), S = "";
               var rowcnt = 0; SG.IterAll("Body",function(r){ if(r.D.id=="Row") rowcnt++; }); S += "The data grid contains "+rowcnt+" order rows. ";
               var group = SG.Grouped&&SG.GetGroup(); if(group) S += "The grid rows are actually grouped by columns: "+group+". ";
               if(group) S += "Actual tree column is '"+SG.GetPartAttr("Body","Tree")+"'. ";
               if(group){
                  var cll = SG.Parts.Body.CollapseLevel;
                  if(cll==-1||cll==null) S += "The row tree is expanded to show all levels. ";
                  else { var g = group.split(","); if(cll<0) cll = g.length+cll+1; S += "The row tree is collapsed to level "+(cll+1)+" to show groups created on '"+g[cll]+"'. The order rows are not visible due collapsed parents. "; }
                  }
               var sort = SG.GetSort(); if(sort) S += "The grid rows are actually sorted by columns: "+sort+" (if the column has '-' before name, it means descending sort). ";
               var lock = SG.GetLock(1); if(lock.length) S += "There are actually locked some actions in grid: "+lock.join(", ")+". The locks can be changed in locks options dialog. ";
               var filters = SG.AIGetFilter(); 
               if(filters) S += "The grid rows are actually filtered by filters (JavaScript code where column name is used as variable, the row is visible if the filter condition is fulfilled): "+filters;
               S += "Strings for filter are compared case "+(SG.FilterCaseSensitive?"":"in")+"sensitive - users can change it in filter options dialog. ";
               if(PG==G){ //. Shown pivot grid
                  S += "\n\n## Pivot grid displayed\n";
                  S += "**Now there is shown pivot grid instead of the source grid.** The source grid is hidden. ";
                  if(!PG.PivotRows||!PG.PivotCols||!PG.PivotData) S += "The pivot grid is empty. ";
                  else {
                     S += "\n### Pivot grid sources\n";
                     S += "The pivot grid has rows created from values in source grid columns: "+PG.PivotRows+". ";
                     S += "The pivot grid has columns created from values in source grid columns: "+PG.PivotCols+". ";
                     S += "The pivot grid has data column cells with aggregated values from values in source grid columns: "+PG.PivotData+". ";
                     if(PG.PivotRows.indexOf(",")>=0) S += "The pivot grid rows are grouped, every group level per item in the source columns: "+PG.PivotRows+"; the row groups can be collapsed or expanded. ";
                     if(PG.PivotCols.indexOf(",")>=0||PG.PivotData.indexOf(",")>=0) S += "The pivot grid columns are grouped, every group level per item in the source columns: "+PG.PivotCols+"; the column groups can be collapsed or expanded. ";
                     if(PG.PivotData.indexOf(",")>=0) S += "The pivot grid data columns are in every column group, every group has columns created from the source columns: "+PG.PivotData+". ";
                     var sortr = PG.GetSort("Body"), sortc = PG.GetSort("Cols"); 
                     if(sortr||sortc){
                        S += "\n### Pivot grid sorted\n";
                        if(sortr) S += "The pivot grid rows are actually sorted by columns: "+sortr+" (if the column has '-' before name, it means descending sort). ";
                        if(sortc) S += "The pivot grid columns are actually sorted by rows: "+sortc+" (if the row has '-' before name, it means descending sort). ";
                        }
                     var lock = PG.GetLock(1); if(lock.length) S += "\n### Pivot grid locked\nThere are actually locked some actions in pivot grid: "+lock.join(", ")+". The locks can be changed in locks options dialog. ";
                     var filtersr = PG.AIGetFilter("Body"), filtersc = PG.AIGetFilter("Cols"); 
                     if(filtersr||filtersc){
                        S += "\n### Pivot grid filtered\n";
                        if(filtersr) S += "The pivot grid rows are actually filtered by filters (JavaScript code where column name is used as variable, the row is visible if the filter condition is fulfilled): "+filtersr+" . ";
                        if(filtersc) S += "The pivot grid columns are actually filtered by filters (JavaScript code where column name is used as variable, the column is visible if the filter condition is fulfilled): "+filtersc+" . ";
                        S += "Strings for filter are compared case "+(PG.FilterCaseSensitive?"":"in")+"sensitive - users can change it in filter options dialog. ";
                        }
                     S += "\n### Pivot grid content\n";
                     var PR = PG.PivotRows.split(","), PC = PG.PivotCols.split(","), PD = PG.PivotData.split(",");
                     S += "The pivot grid has three persistent columns: Tree (kind='Header', displays row tree with actually "+PR.length+" levels"; 
                     for(var i=0;i<PR.length;i++) S += ", "+(i+1)+". level shows value from source grid column "+PR[i]; 
                     S += "), Filter (kind='Filter', permits filtering columns according to values in all automatically generated pivot rows), Sum (kind='Header', shows summary of all values in generated pivot row). ";
                     S += "The pivot grid has three persistent rows: Header (displays column tree with actually "+PC.length+" levels"; 
                     for(var i=0;i<PC.length;i++) S += ", "+(i+1)+". level shows value from source grid column "+PC[i]; 
                     if(PD.length>1) S +=", "+(i+1)+". level shows values from source grid columns "+PG.PivotData;
                     S += "), Filter (permits filtering rows according to values in all automatically generated pivot columns), Sum (shows summary of all values in generated pivot column). ";
                     S += "Every the generated group pivot column (kind = 'Group') have id as one or more values (depending on the tree level) from the source grid columns "+PG.PivotCols+" separated by '$' and show summary values from child columns. ";
                     S += "Every the generated pivot data column (kind = 'Data') on the tree last level have id as values from all source grid columns "+PG.PivotCols+" separated by '$'";
                     S += (PD.length>1?" plus value from one pivot source column "+PG.PivotData+" separated by '$'":"")+" and show the aggregated values from pivot source column cells. ";
                     S += "If the pivot data grid column starts by '-', it is created as hidden and used only for calculation, the '-' is not part of the column id. ";
                     S += "Every the generated group pivot row (kind = 'Group') have id as one or more values (depending on the tree level) from the source grid columns "+PG.PivotRows+" separated by '$' and show summary values from child rows. ";
                     S += "Every the generated pivot data row (kind = 'Data') on the tree last level have id as values from all source grid columns "+PG.PivotRows+" separated by '$' and show the aggregated values from pivot source column cells. ";
                     }
                  }
               return S;
               }
            },
         Cfg: { 
            AutoCookie:1+2+4+8+16, //. Automatically loads and saves configuration to local storage
            ResetCookie:1,         //. Permits resetting configuration to defaults
            Version:2,             //. Clears all previously saved configuration with different layout version
            ResizingTag:3,         //. Permits resizing main tag in both directions
            FixedScroll:2, FixedScrollType:1,    //. When scrolling vertically by larger amount, it rounds scroll to the two row height, to not mix Alternate colors
            ChangingSheets:16,     //. Sheets Data and Pivot can be shown and hidden via sheets menu
            UndoId:"Pivot",        //. Sets one undo chain for source and pivot grids together
            PdfUrl: "http://localhost:8000/Pdf.js?func=getpdf",//. PDF export is run on separate node server located in ./server/
            PdfHtml:3,                                         //. Sends to server whole html with full layout, including Script and Events functions
            },
         AI: {
            StaticInstructions:"",  //. To avoid generating default static instructions
            DynamicInstructions:"", //. To avoid generating default dynamic instructions
            //. Sample input history to demonstrate various AI tasks
            InputHistory: "|-|What is in table?|What can you do?|What was the last action?"
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
                        + "|Copy orders from India below the sources each"
                        + "|Show only March 2015|Show Since between 10/1/2005 and 7/6/2010"
                        + "|Group by month and year"
                        + "|Show all columns|Undo it"
                        + "|Export data to xlsx"
                        + "|-"
                        + "|Show Total in Pivot per Name and Month|Show Price and Amount in Pivot per Location and Date"
                        + "|Show Price higher than 1000 in Pivot per Date and Country|Show Amount, Price and Total per contractor and Year,Month,Day, but not for Calls per week"
                        + "|What is maximal Amount value and where?"
                        + "|Mark and show maximal Price value in data rows"
                        + "|Show only prices higher than 5000"
                     

               //S += "The source columns usually used for creating pivot rows: FullName (as Name+Surname), Location (as Region+Country+State), Region, Country, State. ";
               //S += "The source columns usually used for creating pivot columns: Date (as Year+Month), Year, Month, Day. ";
               //S += "The source columns usually used for creating pivot data: Amount, Price, Total, Verified (as count of verified rows) , All (as count of all rows). ";
               //S += "The source columns that can be used for creating pivot in rows / columns / data: Partner, Since, Calls, Rabat. ";

            },
         Locks: { Data:"Data" }, LockNames: { Data:"Restrict choosing data set" }, //. Custom Lock names
         Format: { fd: "MM/dd/yyyy", nfg:"00", nfp:"0.##\\%", nff:",0.##" }, //. Formats defined for FT values
         DefTools: { Sheet: { Rel:0, Width:40 } },
         DefToolbars: {
            Pivot: { Cells: [ //. Default toolbar with predefined pivots, referred in both grids Top section
               { id:"PivotList", D:"PivotList", Width:300, 
                  List:{ 
                     "" : "<i>none</i>",
                     "Region,Country,State;Year,Month;Total" : "Location 3x <b style='color:red;'>+</b> Date 2x <b style='color:red;'>=</b> Total", 
                     "Region,Country,State;Year,Month;Amount,Price,-Total" : "Location 3x <b style='color:red;'>+</b> Date 2x <b style='color:red;'>=</b> Amount, Price", 
                     "Region,Country,State;Year,Month;Verified,All" : "Location 3x <b style='color:red;'>+</b> Date 2x <b style='color:red;'>=</b> Verified, All",
                     "Region,Country,State;Year,Month,Day;Total" : "Location 3x <b style='color:red;'>+</b> Date 2x, Day <b style='color:red;'>=</b> Total", 
                     "Region,Country,State;Year,Month,Day;Amount,Price,-Total" : "Location 3x <b style='color:red;'>+</b> Date 2x, Day <b style='color:red;'>=</b> Amount, Price", 
                     "Region,Country,State;Year,Month,Day;Verified,All" : "Location 3x <b style='color:red;'>+</b> Date 2x, Day <b style='color:red;'>=</b> Verified, All",
                     "Location,FullName;Date;Total" : "Location, Name <b style='color:red;'>+</b> Date <b style='color:red;'>=</b> Total", 
                     "Location,FullName;Date;Amount,Price,-Total" : "Location, Name <b style='color:red;'>+</b> Date <b style='color:red;'>=</b> Amount, Price", 
                     "Location,FullName;Date;Verified,All" : "Location, Name <b style='color:red;'>+</b> Date <b style='color:red;'>=</b> Verified, All", 
                     "Location,FullName;Date,Day;Total" : "Location, Name <b style='color:red;'>+</b> Date, Day <b style='color:red;'>=</b> Total", 
                     "Location,FullName;Date,Day;Amount,Price,-Total" : "Location, Name <b style='color:red;'>+</b> Date, Day <b style='color:red;'>=</b> Amount, Price", 
                     "Location,FullName;Date,Day;Verified,All" : "Location, Name <b style='color:red;'>+</b> Date, Day <b style='color:red;'>=</b> Verified, All", 
                     "FullName;Date;Total" : "Name <b style='color:red;'>+</b> Date <b style='color:red;'>=</b> Total", 
                     "FullName;Date;Amount,Price,-Total" : "Name <b style='color:red;'>+</b> Date <b style='color:red;'>=</b> Amount, Price", 
                     "FullName;Date;Verified,All" : "Name <b style='color:red;'>+</b> Date <b style='color:red;'>=</b> Verified, All", 
                     "Date;Location;Total" : "Date <b style='color:red;'>+</b> Location <b style='color:red;'>=</b> Total", 
                     "Date;Location;Amount,Price,-Total" : "Date <b style='color:red;'>+</b> Location <b style='color:red;'>=</b> Amount, Price", 
                     "Date;Location;Verified,All" : "Date <b style='color:red;'>+</b> Location <b style='color:red;'>=</b> Verified, All", 
                     } 
                  }, "Pivot"
               ] },
            PivotSource: { //. Default toolbar with all avaialble columns in the source grid to create pivot grid, referred in both grids Top section
               Cells: [
                  { id:"FullName", Text:"Name", Col:"FullName" }, { D:"Space" },
                  { id:"Location", Text:"Location", Col:"Location" }, { id:"Region", Text:"Region", Col:"Region" }, { id:"Country", Text:"Country", Col:"Country" }, { id:"State", Text:"State", Col:"State" }, { D:"Space" },
                  { id:"Date", Text:"Date", Col:"Date" }, { id:"Year", Text:"Year", Col:"Year" }, { id:"Month", Text:"Month", Col:"Month" }, { id:"Day", Text:"Day", Col:"Day" }, { D:"Space" },
                  { id:"Partner", Text:"Partner", Col:"Partner" }, { id:"Since", Text:"Since", Col:"Since" }, { id:"Calls", Text:"Calls", Col:"Calls" }, { id:"Rabat", Text:"Rabat", Col:"Rabat" }, { D:"Space" },
                  { id:"Amount", Text:"Amount", Col:"Amount" }, { id:"Price", Text:"Price", Col:"Price" }, { id:"Total", Text:"Total", Col:"Total" }, { id:"Verified", Text:"Verified", Col:"Verified" }, { id:"All", Text:"All", Col:"All" }, 
                  ]
               },
            DataSet: { Cells: [ { id:"Data", D:"List", Width:155, Align:1, Label:"Data set", TextColor:"blue", UseResize:2, //. Toolbar to choose data set
               Formula: "Grid.GetPivotSource().GetSources(1)[1].match(/PivotData\\d+\\w*/)[0]", DisabledFormula:"Grid.IsLocked('Data')",
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
                  if(S1[1].search(/500000|000000/)>=0){ //. Too large data are not included in the Vue package and it are loaded directly from treegrid.com
                     if(S1[1].indexOf("treegrid.com")<0) S1[1] = S1[1].replace(/.*PivotData/,"https://www.treegrid.com/FExamples/Complex/03-pivot/Data/PivotData");
                     }
                  else if(S1[1].indexOf("treegrid.com")>=0) S1[1] = S1[1].replace(/.*PivotData/,"/03-pivot/PivotData");
                  S0.Progress = {PivotData500000:16e5,PivotData1000000:32e5,PivotData2000000:64e5}[Value]; 
                  G.ActionReload();
                  }
               } ] },
            },
         Styles: {
            Beige: { DefTools: { Drag: { PaddingLeft:5, PaddingRight:5, ApplyAll:1 } } }, //. Makes the toolbar columns narrower than in original Beige style
            Green: { DefTools: { Drag: { PaddingLeft:5, PaddingRight:5, ApplyAll:1 } } }, //. Makes the toolbar columns narrower than in original Green style
            Blue: { DefTools: { Drag: { PaddingLeft:5, PaddingRight:5, ApplyAll:1 } } },  //. Makes the toolbar columns narrower than in original Blue style
            Black: { DefTools: { Drag: { PaddingLeft:5, PaddingRight:5, ApplyAll:1 } } }, //. Makes the toolbar columns narrower than in original Black style
            },

         //. The style colors should be defined for both styles together for correct export to xlsx
         Styles_Colors: {
            Base:  { Colors: { group:"#FFF5EA", groupname:"#EAFFF5", group2:"#F8EAE6", group3:"#F0E6DE", blue:"blue" } },
            White: { Colors: { group:"#EEE", groupname:"#DDD" } },
            Dark: { Colors: { group:"#013", groupname:"#031", group2:"#031", group3:"#310", blue:"#0BB" } },
            Black: { Colors: { group:"#012", groupname:"#021", group2:"#021", group3:"#210", blue:"#0AA" } }
            },
         },

   //. ===================================================================================================================================================================================================================

      //. --- Pivot grid definition ---
      Pivot: { //. The Pivot is the sheet name displayed on Sheets toolbar and it is also grid id
         Script: {
            //. --- calculates summary for the last group column (one column cells left to data cells) ---
            sumdata: function(G,row,col,Calc){
               var D = G.PivotData; if(!D) return "";
               if(D=="Verified,All"||D=="All,Verified"){ var c = G.GetNext(col), v = G.GetValue(row,c), a = G.GetValue(row,G.GetNext(c)); return v||a ? (v||0)+" / "+(a||0) : ""; }
               var DD = G.Split(D); 
               if(D.indexOf("Total")>=0) for(var i=0,c=G.GetNext(col);i<DD.length;i++,c=G.GetNext(c)) if(DD[i]=="Total"||DD[i]=="-Total") return G.GetValue(row,c); //. If data contains "Total" ,returns summary of Total
               if(D.indexOf("All")>=0||D.indexOf("Verified")>=0){ //. If data contains "All" or "Verified" ,returns summary of All or Verified or "Verfied / All"
                  for(var i=0,c=G.GetNext(col),a=null,v=null;i<DD.length;i++,c=G.GetNext(c)) if(DD[i]=="All") a = c; else if(DD[i]=="Verified") v = c;
                  if(!v) return G.GetValue(row,a);
                  if(!a) return G.GetValue(row,v);
                  v = G.GetValue(row,v); a = G.GetValue(row,a); return v||a ? (v||0)+" / "+(a||0) : "";
                  }
               return Calc.join(1); //. All other just joins
               },

            //. --- sums values in row or column row or in part part, special function to sum values for "Verified / All", other data sums by sumjoin() ---
            sumgroup: function(G,row,part,Calc){
               var D = G.PivotData; if(!D) return "";
               if(D&&D.indexOf("All")>=0&&D.indexOf("Verified")>=0&&D.indexOf("Total")<0&&(D.indexOf("Amount")<0||D.indexOf("Price")<0)){
                  return Calc.calc(row,part,"var v = Grid.GetValue(Row,Col); if(!v) return Result; if(!Result) return v; if(typeof(v)=='number') return Result+v; var vi = v.indexOf('/'), ri = Result.indexOf('/'); return (v.slice(0,vi-1)-0+(Result.slice(0,ri-1)-0)) + ' / ' + (v.slice(vi+1)-0+(Result.slice(ri+1)-0));");
                  }
               if(D&&(D.indexOf("Total")>=0||D.indexOf("Verified")>=0||D.indexOf("All")>=0||D=="Price"||D=="Amount")) return Calc.sum(row,part);
               return Calc.joinsum(row,part);
               },

            //. --- Formats location from numbers to names ---
            FormatLocation: function(G,raw,hdr){
               var R = raw.slice(0,1)-0, C = raw.slice(2,4)-10, S = raw.slice(5); if(!R&&R!==0) return null;
               var L = G.GetAttr(null,G.PivotSource.Cols.Country,"List");
               var s = (hdr==2 ? G.Split(G.GetAttr(null,G.PivotSource.Cols.Region,"List"),1)[R]+", " : hdr ? "" : "["+["SAs","EAs","EEu","NAf","NAm","SAm","SAf","WEu"][R]+"] ") + G.Split(L[R],1)[C];
               if(S!==""){
                  var L = G.GetAttr(null,G.PivotSource.Cols.State,"List");
                  s += ", "+G.Split(L[R][C],1)[S-10];
                  }
               return s;
               }
            },

         Events: { 

            //. --- Formats Location and Date support columns for display shown in grouped tree column ---
            OnGetString: function(G,row,col,val,raw,src,O){
               if((col.id=="Tree" && G.GetD(row).indexOf("Location")>=0 || row.Kind=="Header"&&G.Split(G.PivotCols)[G.GetPos(row)]=="Location"&&G.GetD(row).indexOf("Pivot")>=0&&col.id!="Tree"&&col.id!="Sum"&&col.id!="Filter")  && raw && !src){
                  return G.Script.FormatLocation(G,raw,row.Kind=="Header");
                  }
               if(col.id=="Tree" && raw && !src && G.GetD(row).indexOf("Date")>=0){
                  var Y = raw.slice(0,4), M = raw.slice(5,7)-1;
                  var L = G.GetAttr(null,G.PivotSource.Cols.Month,"List");
                  return G.Split(L,1)[M]+" "+Y;
                  }
               },

            //. --- Called before the pivot grid is created ---
            OnPivotCreated: function(G,S,Rows,Cols,Data,Part,show){
               if(Cols.search(/Location$/)>=0&&Data.indexOf(",")<0) G.Iter("Cols",function(c){ G.SetWidth(c,180); }); //. Increases width of the Pivot data columns if show only Location
               },

            //. --- Called on every scroll ---
            //. --- Used on Body scroll to display previous Group data in the top Filter row, like "sticky" position ---
            OnScroll: function(G,rowpart,y,oy,colpart,x,ox){
               if(y!=oy){
                  var st = G.GetStatic(G.Rows.Filter,G.Cols.Tree); if(!st) return;
                  var r = G.ReversedTree&1 ? G.GetLastView("Body") : G.GetFirstView("Body"); if(!r){ st.innerHTML = ""; return; }
                  r = G.GetPrevVisible(r); if(!r){ st.innerHTML = ""; return; }
                  while(r.D.Group) r = G.GetFirstChild(r);
                  var v = "";
                  while(r){ v = G.GetString(r,G.Cols.Tree) + (v ? " - "+v : ""); r = G.GetParent(r); }
                  st.innerHTML = v;
                  }
               },

            //. --- Returns updated row / column name to identify it to users ---
            OnGetName:function(G,item,name){ 
               var r = G.IsRow(item);
               if((r?G.PivotRows||"":G.PivotCols||"").indexOf("Location")>=0){
                  var loc = (r?G.PivotRows:G.PivotCols).split(",");
                  for(var i=0;i<loc.length;i++) if(loc[i]=="Location"){
                     var id = item.id.split("$"), v = G.Script.FormatLocation(G,id[i],2);
                     if(v!=null){ id[i] = v; return id.join("\u2192"); }
                     }
                  }
               return item.id.replace(/\$/g,"\u2192"); 
               }
            },
         Cfg: { 
            SheetIndex:2,      //. Sets the Pivot grid always as seconf sheet on Sheets toolbar
            ColTree:1,         //. Permits column tree. It must be permitted for Pivot grids
            ColLevelsAlign:1,  //. Shows the ColLevels buttons in column Tree in top row section Tree on right side
            LevelsCollapse:1,  //. Levels button collapses all levels instead of only its level
            DraggingCols:0,    //. Restricts moving columns
            DraggingRows:0,    //. Restricts moving rows
            DeletingRows:0,    //. Restricts deleting rows
            PivotFormula:"return {Total:1,Amount:1,Price:1,Verified:1,All:1}[Calc.Col.id] ? sumjoin(null,'Body') : joinsum(null,'Body')", //. Base formula to calculate pivot data from the cells in source grid
            MarkCellsFlags:1+4+8+16, //. Adds &4, marks also read only cells with silver background
            HideZero:1,        //. Shows zero values as empty cells
            FilterTree:2,      //. Sets filtering in tree as Show all found. If some row fulfills the condition, all its parents are shown too = shows the group rows that are always filtered out
            Sorting:3,         //. Permits sorting rows and also columns
            SortIcons:2,       //. Sorts only on click to sort icon
            PivotOptions:2+4+8,//. Shows and hides the pivot grid automatically on pivot create. Shows and hides also the whole Sheets toolbar, because it is used only for Pivot grid.
            Hidden:1,          //. Does not display the pivot grid on Sheets toolbar on start, when it is empty
            RowChanges:0,      //. Does not mark changed rows, e.g. resized rows
            GroupExclude:"|",  //. Does not create group rows for empty value when creating pivot
            Focus:2,           //. Permits focusing more cells as rectangle
            CopyHtml:1,        //. Copies to clipboard also html, values with Format
            CopyStyles:"Align,VertAlign,Color,TextColor,TextStyle,Html,RowAttr,ColAttr,CellAttr,ColorBorder,DefaultBorder,Bool", //. What styles copies to clipboard
            CopyMenu:"Html,Color,State,TextStyle,CellHtml,Align,VertAlign,DefBorder,Span,-,Items,Layout,Filtered,Collapsed,Parent,Children", //. Items in menu for toolbar cell Copy
            ExportStyles:"Align,VertAlign,Color,TextColor,TextStyle,Html,RowAttr,ColAttr,CellAttr,ColorBorder,DefaultBorder,Bool,Tree", //. What styles exports to xlsx
            ExportMenu:"File,Format,-,Html,Color,State,TextStyle,CellHtml,Align,VertAlign,DefBorder,Span,Tree,Separator,Style,-,Sheets,Items,Layout,Filtered,Collapsed,Parent,Children", //. Items in Export menu
            PrintMenu:"PageSize,PageLandscape,MarginWidth,MarginHeight,FitPage,Pages,Size,-,MoreSheets,Sheets,Items,Layout,Filtered,Collapsed,Parent,Children", //. Items in Print menu
            PdfMenu:"File,-,PageSize,PageLandscape,MarginWidth,MarginHeight,FitPage,Pages,Size,-,MoreSheets,Sheets,Items,Layout,Filtered,Collapsed,Parent,Children", //. Items in Print PDF menu
            LocksMenu:"Edit,Paste,Rows,Cols,Resize,Collapse,SwitchSheet,View,Pivot,Settings,Data,Cookies,Search,Toolbars,Copy,PrintPdf,Export,Reload,Save,Undo,AI", //. List of available locks for the grid features
            IgnoreF:0,         //. Set it to 1 to ignore all Fx fast attributes and behave normally and slower with only standard cell attributes
            },
         Cookie: { 
            Cfg:"Active",        //. Saves also the active sheet
            Rows:"First,Height", //. Saves row heights, iterates only the first page
            Cols:"-,Width"       //. Saves only column widths, because dragging columns is forbidden
            },                 
         RowParts: [ 
            { id:"TopScroll", Hidden:0 },                                  //. Shows also the top horizontal scrollbar
            { id:"Head2", Prev:"Head", Rel:100000, MinHeight:70, MinHeightResize:0 }, //. Adds new row section to display the filter. It is not included in section with headers, because of different background and borders between them
            { id:"Body", NoData:"" },                                       //. Does not show "No data found" in empty pivot grid
            ],
         ColParts: [ 
            { id:"LeftScroll", Hidden:0 },                                 //. Shows also the left vertical scrollbar
            ],
         Head: [
            { id:"PivotHeader", D:"PivotHeader",   //. The first (top) pivot header. Other pivot headers will be created automatically.
               LevelsPart:"Body",                  //. Shows row Levels buttons in the Tree column (because it shows the row Tree)
               PaddingTop:7, PaddingBottom:8,      //. Sets vertical padding because of Tree / Filter / Sum cells VertAlign=1 (bottom), to have higher bottom padding
               V: { Tree:"Pivot", Filter:"Filter" }, //. The three predefined column captions
               RS: { Tree:10, Filter:10, Sum:10 }, //. Row span of the three predefined captions
               CS: { Tree:2 },
               A: { 
                  Tree: { VertAlign:1, Align:0, RightIconsFormula:"return Grid.HasColTree()&&~Grid.PivotOptions&2?'':'ColLevels'", LevelsPart:"Cols" }, 
                  Sum: {  VertAlign:1, Align:1 }
                  }, 
               F: { Sum:"return Grid.NumberToString(Grid.RowsCount,',0')+' rows'" }
               },
            ],
         Head2: [
            { id:"Filter", D:"Filter", DefaultFilter:1, Range:1, A: { Tree: { Static:1 } }, V: { Tree:"" }, CS:{ Tree:2 }, Item:"Filter row", FA:3+128+8192 },//. Filter row below headers
            ],
         Foot: [
            { id:"Sum", D:"Header", Formula:"Grid.RowsCount*Grid.ColsCount<5000000 ? Grid.Script.sumgroup(Grid,null,'Body',Calc) : ''",  //. Calculated summary row bottom the grid
               Type:"Auto", Align:1, Format:",0.##", ExportFormat:"#,0", Item:"Summary row", SortIcons:0, A: { Tree: { Align:0 } },
               F: { Tree:"return Grid.NumberToString(Grid.ColsCount,',0')+' columns'", Sum:"Grid.RowsCount*Grid.ColsCount<5000000 ? Grid.Script.sumgroup(Grid,null,'Body',Calc) : Grid.NumberToString(Grid.RowsCount*Grid.ColsCount,',0')+' cells'" }
               } 
            ],
         DefCells: { 
            HeaderGroup: { SortColFormula:"Value!==''?Col.id:''" },                        //. Disables sort icons for empty cells in the header
            HeaderLastGroup: { D:"HeaderGroup" },                                          //. Just inherits previous default, it is defined because the LastPivotGroup columns specify different default cell
            DataLastGroup: { ValueFormula:"Grid.Script.sumdata(Grid,Row,Col,Calc)" },      //. Specifies cells left to the data cells, only one column
            DataGroup: { ValueFormula:"Grid.Script.sumgroup(Grid,Row,null,Calc)" },        //. Specifies cells far left to the data cells, the second and next columns
            GroupData: { ValueFormula:"Grid.Script.sumgroup(Grid,Col,null,Calc)" },        //. Specifies cells above the data cells, all group rows
            GroupLastGroup: { ValueFormula:"Grid.Script.sumgroup(Grid,Col,null,Calc)" },   //. Specifies cells left to the GroupData cells, only one column
            GroupGroup: { ValueFormula:"Grid.Script.sumgroup(Grid,Col,null,Calc)" },       //. Specifies cells far left to the GroupData cells, the second and next columns
            },
         DefRows: { 
            PivotHeader: {                //. Every pivot header
               DA:"Header",               //. Specifies the first part of the default cell id in DefCells
               Align:16,                  //. Aligns the cell texts left and scrolls them with cell
               SortIcons:6,               //. Shows sort icons in all cells, including not sorted, right to the cell text
               NoSortBy:1,                //. Hides the columns sort icon in the Tree column
               ResizeHeight:1,            //. Resize all spanned headers to the same height
               ResizeWidth:1,             //. Resize all spanned headers to the same width
               DHeight:1,                 //. Saves the header height in default header instead the header rows, used especially for configuration reset
               FA:128+256+4096            //. Speed up
               },    
            LastPivotHeader: { Align:0 }, //. The last (bottom) pivot header with data column names, resets cell align to left without scrolling with cells
            PivotData : { AIKind:"Data", DA:"Data", DHeight:1 }, //. The not group rows with pivot data
            PivotGroup : {                //. All the group rows with summaries of pivot data
               Color:"group3",            //. This background color is used for the third and next inner group rows
               AIKind:"Group",            //. Row kind for AI tools
               DA:"Group",                //. Specifies the first part of the default cell id in DefCells
               DHeight:1                  //. Resizes all rows with the same D to the same height
               },
            PivotGroup1 : { D:"PivotGroup", Color:"group" },  //. The first inner group rows, sets specific background color
            PivotGroup2 : { D:"PivotGroup", Color:"group2" }, //. The second inner group rows, sets specific background color
            Header: { TextSize:0 }, Filter: { TextSize:0 },   //. Changes text size in header and filter by global TextSize
            },
         DefCols: { 
            Base: { FV:1+8, FT:31+1024, FS:3+64, FA:3, FE:2 },
            PivotData : {                 //. The not group columns with pivot data
               Format:",0.##", ExportFormat:"#,0", //. Specifies number format for data cells. For export it omits decimals, because Excel is not able to display integer numbers formatted as decimals without ending point or comma 
               Width:80,                  //. Sets fixed width for all data columns. It also speeds up the pivot grid with many columns.
               Item:"Data columns",       //. Data columns name in Layout menu
               AIKind:"Data",             //. Row kind for AI tools
               DA:"Data",                 //. Specifies the second part of the default cell id in DefCells
               DWidth:1                   //. Resizes all columns with the same D to the same width
               },
            LastPivotGroup: { D:"PivotData", DA:"LastGroup" }, //. The first inner group column, regardless on omited groups
            PivotGroup : {           //. The group columns with calculated summaries of pivot data
               Format:",0.##", ExportFormat:"#,0", //. Specifies number format for group cells. For export it omits decimals, because Excel is not able to display integer numbers formatted as decimals without ending point or comma 
               Width:80,             //. Sets fixed width for all group columns. It also speeds up the pivot grid with many columns.
               Color:"group3",       //. This background color is used for the third and next inner group columns
               Item:"Group columns", //. Group columns name in Layout menu
               AIKind:"Group",       //. Row kind for AI tools
               DA:"Group",           //. Specifies the second part of the default cell id in DefCells
               DWidth:1              //. Resizes all columns with the same D to the same width
               },
            PivotGroup1 : { D:"PivotGroup", Color:"group" }, //. The first inner group columns, sets specific background color
            PivotGroup2 : { D:"PivotGroup", Color:"group2" }, //. The second inner group columns, sets specific background color
            },
         LeftCols: [
            {  id:"Tree",             //. Main column showing pivot row tree
               D:"PivotHeader",       //. Inherits PivotHeader, it has especially set Import attribute, so settings in this column are prefered to settings in rows
               Width:200, 
               Align:0,               //. Aligns all values left
               Type:"String",         //. All values in the column are strings
               SortPart:"Cols",       //. Permits sorting by this column, sorts columns in Cols part.
               SortIcons:5,           //. Shows sort icons in all cells, including not sorted, right to the cell
               Item:"Row tree",       //. Name of the column shown in Layout menu
               Names:1,               //. Column value is used as row name for messages
               FS:3+16+64+256, FA:3+128+256+4096
               },
            {  id:"Filter",           //. Filter column next to the Tree
               D:"Filter",            
               Width:100, 
               Format:",0.##", 
               Range:1,               //. Permits filtering by more value or number ranges
               DefaultFilter:1,       //. Default fitter operator is "equals"
               Item:"Filter column",  //. Name of the column shown in Layout menu
               LevelsPart:"Cols",     //. Shows ColLevels icons to expand columns in Cols part. There must be also set RightIcons:"ColLevels" in some header cell.
               FS:3+16+64+256, FA:3+128+4096 
               }
            ],
         RightCols: [
            { id:"Sum", D:"Header", Width:115, Type:"Auto", Names:0, Formula:"Grid.RowsCount*Grid.ColsCount<5000000 ? Grid.Script.sumgroup(Grid,null,'Cols',Calc) : ''", Format:",0.##", ExportFormat:"#,0", Item:"Summary column", SortIcons:0, FS:3+16+64+256, FA:3+128+4096 }, //. Calculated summary column on the grid right side
            ],
         //Tree_Cfg: { Hidden:1 }  //. Hides the column tree by default and shows the Collapse button in the pivot header rows. The column tree can be shown in Layout menu
         Body_Cfg: { Tree:"Tree", DefaultSort:1 }, //. Shows row tree in Tree column for the Body rows and preserves default sort order for ClearSort
         Cols_Cfg: { Sealed:0, DefaultSort:1, MinWidth:200 }, //. Permits empty Cols section on start. By default Cols has set Sealed:1 and is deleted on start if empty. And presets default sort order for ClearSort
         TopScroll_Cfg: { ScrollOnDrag:"1,-1000%,Body" },
         Head_Cfg: { ScrollOnDrag:"1,-50%,Body", BorderColorLeftCols:"borderheader", MinHeight:150 },
         Head2_Cfg: { ScrollOnDrag:"1,-50%,Body", BorderColorLeftCols:"borderheader" },
         Foot_Cfg: { ScrollOnDrag:"-1,50%,Body" },
         BottomScroll_Cfg: { ScrollOnDrag:"-1,1000%,Body" },
         DefTools: { SearchText: { Width:51 } }, //. Changes width of Search input
         Top: [ 
            { id:"Pivot", D:"Pivot", NewLine:1 },
            "PivotRows", "PivotCols", "PivotData", 
            "Styles",
            { id:"PivotSource", D:"PivotSource" },
            ],
         Bottom: [
            "Sheets", "Search", 
            { id:"Toolbar1", Cells:[ "Reload","Print","Pdf","Export","Copy","Undo","Redo" ], Item:"Controls" }, 
            { id:"Toolbar2", Cells:[ "Settings","Filter","Sort","TipAction","Lock" ], Item:"Settings" }, 
            "Layout",                               //. Layout toolbar with Layout menu and UpdateToolbars buttons
            "Cookies",                              //. Cookies toolbars with saved configurations
            "DataSet",                              //. Combo with available data sets to choose data to load
            "AI"                                    //. Input and output communication with AI
            ],
      

         Media: {
            Tablet: { //. Changes for touch only screens
               RowParts: [ { id:"TopScroll", Hidden:1 } ],
               ColParts: [ { id:"LeftScroll", Hidden:1 } ]
               },
            Mobile: { //. Changes for small displays, mostly mobile phones 
               RightCols: [ { id:"Sum", Width:80 } ],
               DefToolbars: { DataSet: { Cells: [ { id:"Data", Width:135 } ] } }
               },
            Narrow: { //. Changes for narrow displays
               Rules: { MaxHeight:650 },
               Tree_Cfg: { Hidden:1 } 
               },
            }
         }
      }
   });

const gridRef = ref(null); //. Grid reference received for grid, access the grid object as gridRef.value
</script>

<template>
   <h1>3. Large example with pivot grid</h1>
   <h5>
      Complex grid with huge data sets with creating pivot grid and many other features. Only HTML without saving changes.<br/>
      Items used in this sample are explained in the commented source vue file at <b>./src/grid/03-pivot.vue</b>,
      UTF8Store data are at <b><a href="/03-pivot/PivotData100000.js" target="_blank">./public/03-pivot/</a></b>
   </h5>
   <FastGrid :src="{ Progress:140000, Sources:[src,'/03-pivot/PivotData10000.js'] }" ref="gridRef" style="height:100%; min-height:500px; width:100%" />
</template>
