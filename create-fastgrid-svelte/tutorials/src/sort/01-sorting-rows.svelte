<script>
import { FastGrid } from "fastgrid-svelte";
import "../Tutorial.css";

   //. All the svg used for this sample are stored in public directory

   const src = { //. All layout and data for grid.
      Cfg: { id: "SortRows", IndexList:1, PrintIcons:7, ExportIcons:15 }, 
      DefCells: {
         ICON: { TextIconsFormula:"Value?Value+'Mark':''", Text:"" },
         Bool: { Type:"Bool", LeftIcons:"Bool", Align:0, Button:"Bool" },
         Radio: { D:"Bool", BoolIcon:"Radio", BoolCycle:-1, RadioCol:1 },
         HTML: { ExportValueFormula:"Value?Value.match(/(\\w+)\\.svg/)[1]:''" }
         },
      Cols: [ 
         { id: "INT", Type: "Number", Width:100 }, 
         { id: "FLOAT", Type: "Number", Width:100 }, 
         { id: "TEXT", Type: "String", Width:100, CaseSensitive:0, WhiteChars:" ", LocaleCompare:2 }, 
         { id: "LIST", Type: "String", NumberSort:1, RightIcons:"List", Button:"List", List: "||One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten", IndexList:1, Width:100 }, 
         { id: "DATE", Type: "Date", NumberSort:2, RightIcons:"Date", Width:120, DefaultDate: "1/1/2020", Format: "dddddd MMM" }, 
         { id: "BOOL", Type: "Bool", BoolCycle:2 }, 
         { id: "ICON", Type: "String", Width:95, DA:"ICON", Align:2 },
         { id: "HTML", Type: "Html", Width:90, DA:"HTML", Align:2 }  
         ], 
      Head: [ 
         { D:"Header", DA:"Header" },
         {  V: { INT:1, FLOAT:1, LIST:1, DATE:1 }, RowBorder:",White", Height:22, NoChanges:1,
            A: { 
               INT: { D:"Radio", Text:"As number", OnChange:"Grid.SetAttr(null,Grid.Cols.INT,'NumberSort',Value); Grid.SetSort('INT');" },
               FLOAT: { D:"Radio", Text:"As number", OnChange:"Grid.SetAttr(null,Grid.Cols.FLOAT,'NumberSort',Value); Grid.SetSort('FLOAT');" },
               TEXT: { D:"Bool", Text:"Case", OnChange:"Grid.SetAttr(null,Grid.Cols.TEXT,'CaseSensitive',Value); Grid.SetSort('TEXT,INT');", Tip:"Case sensitive sorting" }, 
               LIST: { D:"Radio", Text:"By index", OnChange:"Grid.SetAttr(null,Grid.Cols.LIST,'SortList',!Value); Grid.SetAttr(null,Grid.Cols.LIST,'NumberSort',1); Grid.SetSort('LIST,INT');", RightIcons:"" },
               DATE: { D:"Radio", Text:"As number", OnChange:"Grid.SetAttr(null,Grid.Cols.DATE,'NumberSort',Value?2:0); Grid.SetSort('DATE');", RightIcons:"" },
               BOOL: { Type:"String", NoEdit:3 },
               ICON: { Text:"By icon name", NoEdit:3 },
               HTML: { Text:"By SortValue", NoEdit:3 },
               } 
            },
         {  A: { 
               INT: { D:"Radio", Text:"As string", OnChange:"Grid.SetAttr(null,Grid.Cols.INT,'NumberSort',!Value); Grid.SetSort('INT');" },
               FLOAT: { D:"Radio", Text:"As string", OnChange:"Grid.SetAttr(null,Grid.Cols.FLOAT,'NumberSort',!Value); Grid.SetSort('FLOAT');" },
               TEXT: { D:"Bool", Text:"Spaces", OnChange:"Grid.SetAttr(null,Grid.Cols.TEXT,'WhiteChars',Value?'':' '); Grid.SetSort('TEXT,INT');", Tip:"Preserves spaces for sorting" }, 
               LIST: { D:"Radio", Text:"By value", OnChange:"Grid.SetAttr(null,Grid.Cols.LIST,'SortList',Value); Grid.SetAttr(null,Grid.Cols.LIST,'NumberSort',0); Grid.SetSort('LIST,INT');", RightIcons:"" },
               DATE: { D:"Radio", Text:"As string", OnChange:"Grid.SetAttr(null,Grid.Cols.DATE,'NumberSort',Value?0:2); Grid.SetSort('DATE');", RightIcons:"" },
               BOOL: { Type:"String", NoEdit:3 },
               ICON: { NoEdit:3 },
               HTML: { NoEdit:3 },
               }, RowBorder:",White", Height:22, NoChanges:1 
            },
         {  A: { 
               INT: { NoEdit:3 },
               FLOAT: { D:"Radio", Text:"As range", OnChange:"Grid.SetAttr(null,Grid.Cols.FLOAT,'NumberSort',Value?3:0); Grid.SetSort('FLOAT');" },
               TEXT: { D:"Bool", Text:"Diacritic", OnChange:"Grid.SetAttr(null,Grid.Cols.TEXT,'LocaleCompare',Value?0:2); Grid.SetSort('TEXT,INT');", Tip:"Sorts diacritic characters according to Unicode" }, 
               LIST: { D:"Radio", Text:"By range", OnChange:"Grid.SetAttr(null,Grid.Cols.LIST,'SortList',0); Grid.SetAttr(null,Grid.Cols.LIST,'NumberSort',3); Grid.SetSort('LIST,INT');", RightIcons:"" },
               DATE: { D:"Radio", Text:"As range", OnChange:"Grid.SetAttr(null,Grid.Cols.DATE,'NumberSort',Value?4:0); Grid.SetSort('DATE');", RightIcons:"" },
               BOOL: { Type:"String", NoEdit:3 },
               ICON: { NoEdit:3 },
               HTML: { NoEdit:3 },
               }, Height:22, NoChanges:1 
            },
         ], 
      Top: [ 
         { id:"Data", Cells:"Settings,Reload,Print,Pdf,Export,Copy,Paste,Undo,Redo,Sort" }, "Layout",
         { Cells:[ { 
            D:"List", List:"|$SortType0|$SortType1|$SortType2|$SortType3", Formula:"Grid.SortType", IndexList:1, Label:"$SortType", NoUndo:0,
            OnChange:"Grid.SetCfgAttr('SortType',Value)", Tip:"How are processed clicks to header to change sorting"
            } ] }
         ], 
      Body_Cfg: { Sort:"TEXT" },
      Body: [ 
         { V: { INT:10, FLOAT:6.65, TEXT:"SortFix: 1", LIST:3, DATE:"1/8/2020", BOOL: 1 }, SortFix:1, Color:"#EEE" },

         {  }, 
         { V: { INT:1, FLOAT:1.3, TEXT:"One", LIST:1, DATE:"1/1/2020", BOOL:1, ICON:"Red", HTML:"<img src='/Red.svg' height='17'>" }, A: { HTML: { SortValue:3 } } }, 
         { V: { INT:2, FLOAT:6, TEXT:"\u00D3ne", LIST:1, DATE:"1/1/2020", BOOL:-1, ICON:"Green", HTML:"<img src='/Green.svg' height='17'>" }, A: { HTML: { SortValue:1 } } }, 
         { V: { INT:3, FLOAT:66, TEXT:"\u00D4NE", LIST:"1;3;5", DATE:"1/2/2020", BOOL:-1, ICON:"Green", HTML:"<img src='/Green.svg' height='17'>" }, A: { HTML: { SortValue:1 }, LIST: { Range:1 } } }, 
         { V: { INT:4, FLOAT:3.6, TEXT:"ONE", LIST:1, DATE:"1/2/2020", BOOL:-1, ICON:"Red", HTML:"<img src='/Red.svg' height='17'>" }, A: { HTML: { SortValue:3 } } }, 
         { V: { INT:5, FLOAT:-6.5, TEXT:"O n e", LIST:1, DATE:"1/3/2020", BOOL:-1, ICON:"Orange", HTML:"<img src='/Orange.svg' height='17'>" }, A: { HTML: { SortValue:2 } } }, 
         { V: { INT:6, FLOAT:12, TEXT:"one", LIST:1, DATE:"1/6/2020", BOOL:1 }, A: { HTML: { SortValue:"empty" } } }, 
         { V: { INT:7, FLOAT:16, TEXT:"Two", LIST:2, DATE:"1/6/2020", BOOL:-1, ICON:"Orange", HTML:"<img src='/Orange.svg' height='17'>" }, A: { HTML: { SortValue:2 } } }, 
         { V: { INT:8, FLOAT:2.4, TEXT:"tw o", LIST:"2;4", DATE:"1/6/2020", BOOL:-1 }, A: { HTML: { SortValue:"empty" }, LIST: { Range:1 } } }, 
         { V: { INT:9, FLOAT:-12.5, TEXT:"Two", LIST:2, DATE:"1/8/2020", BOOL:-1, ICON:"Red", HTML:"<img src='/Red.svg' height='17'>" }, A: { HTML: { SortValue:3 } } }, 
         { V: { INT:10, FLOAT:6.65, TEXT:"Three", LIST:3, DATE:"1/8/2020", BOOL:1 }, A: { HTML: { SortValue:"empty" } } },  
         { V: { INT:11, FLOAT:2.3, TEXT:"THREE", LIST:3, DATE:"1/8/2020", BOOL:-1, ICON:"Green", HTML:"<img src='/Green.svg' height='17'>" }, A: { HTML: { SortValue:1 } } }, 
         { V: { INT:12, FLOAT:-5.5, TEXT:"T h r e e", LIST:3, DATE:"1/9/2020", BOOL:-1 }, A: { HTML: { SortValue:"empty" } } }, 
         { V: { INT:13, FLOAT:11, TEXT:"Three", LIST:3, DATE:"1/11/2020", BOOL:-1 }, A: { HTML: { SortValue:"empty" } } },  
         { V: { INT:14, FLOAT:11.4, TEXT:"Four", LIST:4, DATE:"1/13/2020", BOOL:-1, ICON:"Red", HTML:"<img src='/Red.svg' height='17'>" }, A: { HTML: { SortValue:3 } } }, 
         { V: { INT:15, FLOAT:1.06, TEXT:"f o u r", LIST:4, DATE:"1/13/2020~1/16/2020", BOOL:0, ICON:"Green", HTML:"<img src='/Green.svg' height='17'>" }, A: { HTML: { SortValue:1 }, DATE: { Range:1 } } }, 
         { V: { INT:16, FLOAT:0.5, TEXT:"Four", LIST:4, DATE:"1/13/2020", BOOL:0, ICON:"Green", HTML:"<img src='/Green.svg' height='17'>" }, A: { HTML: { SortValue:1 } } }, 
         { V: { INT:17, FLOAT:-0.6, TEXT:"S I X", LIST:6, DATE:"1/14/2020", BOOL:0 }, A: { HTML: { SortValue:"empty" } } }, 
         { V: { INT:18, FLOAT:22, TEXT:"Six", LIST:6, DATE:"1/14/2020", BOOL:-1, ICON:"Orange", HTML:"<img src='/Orange.svg' height='17'>" }, A: { HTML: { SortValue:2 } } }, 
         { V: { INT:19, FLOAT:4, TEXT:"Seven", LIST:7, DATE:"1/16/2020", BOOL:1, ICON:"Red", HTML:"<img src='/Red.svg' height='17'>" }, A: { HTML: { SortValue:3 } } }, 
         { V: { INT:20, FLOAT:5.9, TEXT:" seven", LIST:"7;9", DATE:"1/17/2020", BOOL:1, ICON:"Green", HTML:"<img src='/Green.svg' height='17'>" }, A: { HTML: { SortValue:1 }, LIST: { Range:1 } } }, 
         { V: { INT:21, FLOAT:6.23, TEXT:"seven", LIST:7, DATE:"1/18/2020", BOOL:1, ICON:"Green", HTML:"<img src='/Green.svg' height='17'>" }, A: { HTML: { SortValue:1 } } }, 
         { V: { INT:22, FLOAT:"16;18~20", TEXT:"Seven", LIST:7, DATE:"1/18/2020", BOOL:-1, ICON:"Red", HTML:"<img src='/Red.svg' height='17'>" }, A: { HTML: { SortValue:3 }, FLOAT: { Range:1 } } }, 
         { V: { INT:23, FLOAT:6.18, TEXT:"Se ven", LIST:7, DATE:"1/20/2020", BOOL:-1, ICON:"Red", HTML:"<img src='/Red.svg' height='17'>" }, A: { HTML: { SortValue:3 } } }, 
         { V: { INT:24, FLOAT:5.2, TEXT:"Eight", LIST:8, DATE:"1/21/2020", BOOL:0, ICON:"Orange", HTML:"<img src='/Orange.svg' height='17'>" }, A: { HTML: { SortValue:2 } } }, 
         { V: { INT:25, FLOAT:-6.345, TEXT:"\u00C9ight", LIST:8, DATE:"1/22/2020", BOOL:0, ICON:"Green", HTML:"<img src='/Green.svg' height='17'>" }, A: { HTML: { SortValue:1 } } },  
         { V: { INT:26, FLOAT:"3;5;7;9", TEXT:"Nine", LIST:9, DATE:"1/25/2020", BOOL:-1, ICON:"Red", HTML:"<img src='/Red.svg' height='17'>" }, A: { HTML: { SortValue:3 }, FLOAT: { Range:1 } } }, 
         { V: { INT:27, FLOAT:-0.02, TEXT:"\u0147INE", LIST:"9;10", DATE:"1/26/2020", BOOL:-1, ICON:"Red", HTML:"<img src='/Red.svg' height='17'>" }, A: { HTML: { SortValue:3 }, LIST: { Range:1 } } }, 
         { V: { INT:28, FLOAT:-22.9, TEXT:"N IN E", LIST:9, DATE:"1/27/2020", BOOL:1 }, A: { HTML: { SortValue:"empty" } } }, 
         { V: { INT:29, FLOAT:-5.9, TEXT:"Ni ne", LIST:9, DATE:"1/27/2020;2/2/2020", BOOL:1 }, A: { HTML: { SortValue:"empty" }, DATE: { Range:1 } } }, 
         { V: { INT:30, FLOAT:6.2, TEXT:"n  ine", LIST:10, DATE:"1/27/2020", BOOL:1 }, A: { HTML: { SortValue:"empty" } } }, 
         { V: { INT:31, FLOAT:22, TEXT:" Ten", LIST:10, DATE:"1/29/2020", BOOL:-1, ICON:"Red", HTML:"<img src='/Red.svg' height='17'>" }, A: { HTML: { SortValue:3 } } }, 
         { V: { INT:32, FLOAT:6, TEXT:"Ten", LIST:10, DATE:"1/30/2020", BOOL:-1, ICON:"Orange", HTML:"<img src='/Orange.svg' height='17'>" }, A: { HTML: { SortValue:2 } } }, 
         { V: { INT:33, FLOAT:-3, TEXT:"t e n", LIST:10, DATE:"1/31/2020", BOOL:-1, ICON:"Green", HTML:"<img src='/Green.svg' height='17'>" }, A: { HTML: { SortValue:1 } } }, 
         { V: { INT:34, FLOAT:"-5~-2", TEXT:"ten", LIST:10, DATE:"1/31/2020~2/2/2020;2/4/2020~2/5/2020", BOOL:0, ICON:"Red", HTML:"<img src='/Red.svg' height='17'>" }, A: { HTML: { SortValue:3 }, DATE: { Range:1 }, FLOAT: { Range:1 } } }, 
         { V: { INT:35, FLOAT:2, TEXT:"Ten", LIST:10, DATE:"1/31/2020", BOOL:0 }, A: { HTML: { SortValue:"empty" } } }, 

         { V: { INT:11, FLOAT:-6.65, TEXT:"SortFix: -2", LIST:4, DATE:"1/11/2020", BOOL:0 }, SortFix:-2, Color:"#EEE" }, 
         { V: { INT:10, FLOAT:6.65, TEXT:"SortFix: -1", LIST:3, DATE:"1/8/2020", BOOL:1 }, SortFix:-1, Color:"#EEE" }  
         ], 
   };
</script>

<h1>1. Sorting rows</h1>
      <h5>Sorting rows according to the values in selected columns</h5>
      <section>
         <FastGrid src={src} style="display:inline-block; max-width:100%; height:550px;"/>
      </section>

      
      <ul>
         <li><h4>Setting sorting</h4><br />
            Row sorting can be set per <b>row part</b> as list of column ids in <dfn>Sort</dfn> attribute.<br />
            To sort descending, add "-" before the column id, e.g. Sort:"A,-B".<br />
            To assign an object to row part that already defined rows in array use the part id with "_" suffix, e.g. <b>Body: [...], Body_Cfg: &#x7B; Sort:"C,D" &#x7D;</b><br />
         </li>
         <li><h4>Changing sorting</h4><br />
            Sorting can be changed by click to row that has set <dfn>SortIcons</dfn> attribute. By default they are rows <b>D:</b> <dfn>Header</dfn> and <dfn>Index</dfn>.<br />
            The way how the clicked column is added to sorting is controlled by Cfg <dfn>SortType</dfn>.<br />
            The sorting can be cleared by clicking to <b>Tool</b> cell <b>D:</b> <dfn>ClearSort</dfn> or <dfn>Sort</dfn>.<br />
         </li>
         <li><h4>Sorting settings</h4><br />
         Some of the global sorting setting can be changed by users in popup menu for <b>Tool</b> cell <b>D: </b> <dfn>Sort</dfn>.<br />
         When comparing values for sorting it is possible to ignore <b>case</b> (Cfg <dfn>SortCaseSensitive</dfn>, column <dfn>CaseSensitive</dfn>), 
         <b>diacritics</b> (Cfg <dfn>SortLocaleCompare</dfn>, column <dfn>LocaleCompare</dfn>), 
         some characters (usually <b>spaces</b>) (Cfg <dfn>SortWhiteChars </dfn>, column <dfn>WhiteChars</dfn>), etc.<br />
         It is possible to sort values as strings or numbers / dates / ranges using column <dfn>NumberSort</dfn> attribute.<br />
         List values are sorted by keys or index by default, to sort by the List values set column <dfn>SortList</dfn> attribute.<br />
         To change the way the cell values are compared, set cell attribute <dfn>SortValue</dfn> to use this value instead of the cell value for comparing.<br />
         </li>
         <li><h4>Sorting restrictions</h4><br />
            To not sort the row and fix it on top or bottom, set row <dfn>SortFix</dfn> attribute.<br />
            To not sort row children, set parent row <dfn>NoSort</dfn>.<br />
         </li>
      </ul>
