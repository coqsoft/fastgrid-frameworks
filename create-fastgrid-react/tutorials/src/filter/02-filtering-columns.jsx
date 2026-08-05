import React, { useMemo, useRef } from "react";
import { FastGrid } from "fastgrid-react";
import "../Tutorial.css";

export default function App() {
   //. All the svg used for this sample are stored in public directory

   const src = useMemo(() => ({ //. All layout and data for grid. Memo is used for simple object created inside the App function to avoid re-creating grid on every React App render
      Cfg: { id: "FilterCols", IndexList:1, FilterActionCustom:4, PrintIcons:7, Sorting:2, OverScroll:2 }, 
      DefCells: {
         ICON: { TextIconsFormula:"Value?Value.replace(/;/g,'Mark,')+'Mark':''", Text:"" },
         },
      Head:[
         { id:"INDEX", D:"Index" }
         ],
      Body: [ 
         { id: "INT", Type: "Number" }, 
         { id: "FLOAT", Type: "Number" }, 
         { id: "TEXT", Type: "String", CaseSensitive:0, WhiteChars:" ", LocaleCompare:2 }, 
         { id: "CASE", Type: "String", CaseSensitive:1, WhiteChars:"", LocaleCompare:0 }, 
         { id: "LIST", Type: "String", NumberSort:1, RightIcons:"List", Button:"List", List: "||One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten", IndexList:1 }, 
         { id: "RANGE", Type: "String", NumberSort:1, RightIcons:"List", Button:"List", List: "||One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten", IndexList:1, Range:1, Wrap:1 },
         { id: "DATE", Type: "Date", RightIcons:"Date", DefaultDate: "1/1/2020", Format: "dddddd MMM" }, 
         { id: "BOOL", Type: "Bool", BoolCycle:2 }, 
         { id: "ICON", Type: "String", DA:"ICON", Align:2, Button:"List", List:"|Green|Orange|Red", RightIcons:"List", 
            ListMenu: { Script: { Item: { IconAlign:2, Text:"", Height:30 }, Items:[ "*FilterOff", { Value:"Green", Icon:"GreenMark" }, { Value:"Orange", Icon:"OrangeMark" }, { Value:"Red", Icon:"RedMark" } ] } } }, 
         { id: "HTML", Type: "Html", Align:2, Button:"List", List:"|<img src='/Green.svg' height='17'>|<img src='/Orange.svg' height='17'>|<img src='/Red.svg' height='17'>", RightIcons:"List" }  
         ],
      DefCols: { 
         RED: { A: { INT: { Color:"#FDD" } } },
         GREEN: { A: { INT: { Color:"#DFD" } } },
         BLUE: { A: { INT: { Color:"#DDF" } } },
         Filter: { A: { Type:"String", INT:{ Type:"Number" }, FLOAT:{ Type:"Number" }, DATE: { Type:"Date" }, BOOL: { Type:"Bool" }, ICON:{ Type:"Icon" }, HTML: { Type:"Html" } } } //. Redefines Type,. becuase Filter column is important and overrides Type in rows
         },   
      LeftCols_Cfg: { BorderColor:",,header," },
      LeftCols: [ 
         { D:"Header", id:"Header", DA:"Header", V: { INDEX:"" } },
         { D:"Filter", id:"Filter1", NoIndex:2, Wrap:1, V: { DATE:"1/3/2020" }, Filter: { DATE:6 }, A: { INDEX: "FilterAction", INT: { FilterDList:"|RED|GREEN|BLUE", } } },
         { D:"Filter", id:"Filter2", NoIndex:2, Wrap:1, IconWrap:1, FilterAction:2, Width:120,
            V: { INT:"2~8;13~34", LIST:"2;6;9" },
            Filter: { INT:1, LIST:1 },
            A: { 
               INDEX: "FilterAction",
               INT: { Range:1, FilterDList: [{ Value:"RED", Text:"Red", A: { Color:"#FDD" } }, { Value:"GREEN", Text:"Green", A: { Color:"#DFD" } }, { Value:"BLUE", Text:"Blue", A: { Color:"#DDF" } }], Tip:"Range for numbers<br>Input ranges as XX<b>~</b>YY, separate ranges by <b>;</b><br>Shows filter for defaults." },
               FLOAT: { Range:1, Tip:"Range for numbers<br>Input ranges as XX<b>~</b>YY, separate ranges by <b>;</b>" },
               TEXT: { Range:1, ListMenu:"|*FilterOff|*ColsAll", LeftIcons:"Filter,List", Tip:"Range for texts<br>Choose from list or input and separated values by <b>;</b><br>Filter case insensitive, ignores white space and diacritic." },
               CASE: { Range:1, ListMenu:"|*FilterOff|*ColsAll", LeftIcons:"List,Filter", Tip:"Range for texts<br>Choose from list or input and separated values by <b>;</b><br>Filter case sensitive, preserves white space and diacritic." },
               LIST: { Range:1, DefaultFilter:1, FilterMenu:[0,1,2,3,4,5,6], Tip:"Range for List items<br>Choose from the popup list." },
               RANGE: { Range:2, DefaultFilter:1, FilterRaw:1, Tip:"Range for List Range items<br>Choose from the popup list<br>Compares individual items by index" },
               DATE: { Range:1, Tip:"Range for dates<br>Choose from two calendars or input the ranges as XX<b>~</b>YY, separate ranges by <b>;</b>" },
               BOOL: { Range:2, DefaultFilter:1, Type:"String", List:{ "-1":"Unknown", 1:"Yes", 0:"No" }, LeftIcons:"", RightIcons:"List", Button:"List", FilterRaw:1, Tip:"Range for three Bool values 0, 1, -1<br>Choose from the popup list." },
               ICON: { Range:1, LeftIcons:"", Tip:"Range for icons<br>Choose from the popup list." },
               HTML: { Range:1, LeftIcons:"", Tip:"Range for HTML<br>Choose from the popup list." },
               }
            },
         { D:"Filter", id:"Filter3", NoIndex:2, Wrap:1, 
            A: {  
               INDEX: "FilterAction",
               INT: { Type:"String", FilterDList:"|RED|GREEN|BLUE", Tip:"Search for individual digits as text.<br>Shows filter for defaults." },
               FLOAT: { Type:"String", LeftIcons:"", Tip:"Search for individual digits as text.<br>Hides filter menu operator." },
               TEXT: { FilterMenu:"1,11,2,12,0", Tip:"Only selected items in filter menu a in different order." },
               CASE: { FilterMenu:"0,1,2,11,9,7", LeftIcons:"", RightIcons:"Filter", Tip:"Only selected items in filter menu a in different order.<br>Filter menu icon on right side." },
               LIST: { LeftIcons:"", Tip:"List with hidden filter menu" },
               RANGE: { LeftIcons:"List", RightIcons:"Filter", Tip:"List range with filter menu icon on right side" },
               DATE: { LeftIcons:"", Range:1, Tip:"Range for Date, hides filter menu." },
               BOOL: { LeftIcons:"Filter", Type:"Number", Text:"", Button:"Bool", TextIcons:"Bool", Tip:"Filter bool with filter menu" },
               ICON: { NoFilterBy:1, NoEdit:1, Tip:"No filter by this cell" },
               HTML: { LeftIcons:"", RightIcons:"Filter,List", Tip:"Two icons, filter and list, on the right." }
               }
            }
         ], 

      DefTools: {
         BOOL: { Type:"Bool", Value:1 },
         RADIO: { Type:"Bool", RadioRow:1, BoolCycle:-1, BoolIcon:"Radio" },
         },
      Top: [ 
         { id:"Data 1", Cells:"Settings,Reload,Print,Pdf,Export,Copy,Paste" }, 
         { id:"Data 2", Cells:"Undo,Redo,Sort,Filter" }, 
         "Layout",
         { id:"Info", Cells: [ "Empty", { D:"Label", Label:"Shown columns:", Formula:"count(null,'Cols',null,0) + ' / ' + count(null,'Cols')", TextColor:"blue" } ] },
         { id:"Dates", NewLine:1, Cells: [
            { D:"Label", Text:"Dates:" },
            { D:"BOOL", Text:"1st - 10th", NoUndo:0, OnChange:"Value ? Grid.SetFilter('DateFilter1',null,'Cols') : Grid.FilterRange(Grid.Rows.DATE,'1/11/2000~1/1/2050','Date','Cols','DateFilter1')" },
            { D:"BOOL", Text:"11th - 20th", NoUndo:0, OnChange:"Value ? Grid.SetFilter('DateFilter2',null,'Cols') : Grid.FilterRange(Grid.Rows.DATE,'1/1/2000~1/10/2000;1/21/2000~1/1/2050','Date','Cols','DateFilter2')" },
            { D:"BOOL", Text:"21st - 31st", NoUndo:0, OnChange:"Value ? Grid.SetFilter('DateFilter3',null,'Cols') : Grid.FilterRange(Grid.Rows.DATE,'1/1/2000~1/20/2000;2/1/2000~1/1/2050','Date','Cols','DateFilter3')" },
            "Empty",
            ]},
         { id:"Numbers", Cells: [
            { D:"RADIO", Text:"All numbers", Value:1, NoUndo:0, OnChange:"Grid.SetFilter('NumberFilter',null,'Cols')" },
            { D:"RADIO", Text:"< -10", NoUndo:0, OnChange:"Grid.SetFilter('NumberFilter','Grid.GetAttr(null,Col,\"NoFilterCol\") || Grid.GetNumber(Grid.Rows.FLOAT,Col)<-10','Cols')" },
            { D:"RADIO", Text:"-10 - 0", NoUndo:0, OnChange:"Grid.SetFilter('NumberFilter','if(Grid.GetAttr(null,Col,\"NoFilterCol\")) return 1; var v = Grid.GetNumber(Grid.Rows.FLOAT,Col); return v>=-10 && v<0','Cols')" },
            { D:"RADIO", Text:"0 - 10", NoUndo:0, OnChange:"Grid.SetFilter('NumberFilter','if(Grid.GetAttr(null,Col,\"NoFilterCol\")) return 1; var v = Grid.GetNumber(Grid.Rows.FLOAT,Col); return v>=0 && v<=10','Cols')" },
            { D:"RADIO", Text:"> 10", NoUndo:0, OnChange:"Grid.SetFilter('NumberFilter','Grid.GetAttr(null,Col,\"NoFilterCol\") || Grid.GetNumber(Grid.Rows.FLOAT,Col)>10','Cols')" },
            ]},
         ], 
      Cols_Cfg: { Sort:"INT", MinWidth:220 },
      Cols: [ 
         { D:"GREEN", V: { INT:13, FLOAT:6.65, TEXT:"NoFilter", LIST:3, DATE:"1/8/2020", BOOL: 1 }, NoFilterRow:1, NoList:1, Color:"#EEE" },

         { D:"BLUE",  }, 
         { D:"RED", V: { INT:1, FLOAT:1.3, TEXT:"One", CASE:"One", LIST:1, RANGE:"1;3;5", DATE:"1/1/2020", BOOL:1, ICON:"Red", HTML:"<img src='/Red.svg' height='17'>" }, A: { HTML: { SortValue:3 } } }, 
         { D:"GREEN", V: { INT:2, FLOAT:6, TEXT:"\u00D3ne", CASE:"\u00D3ne", LIST:1, RANGE:1, DATE:"1/1/2020", BOOL:-1, ICON:"Green", HTML:"<img src='/Green.svg' height='17'>" }, A: { HTML: { SortValue:1 } } }, 
         { D:"RED", V: { INT:3, FLOAT:66, TEXT:"\u00D4NE", CASE:"\u00D4NE", LIST:1, RANGE:"1;2", DATE:"1/2/2020", BOOL:-1, ICON:"Green", HTML:"<img src='/Green.svg' height='17'>" }, A: { HTML: { SortValue:1 } } }, 
         { D:"BLUE", V: { INT:4, FLOAT:3.6, TEXT:"ONE", CASE:"ONE", LIST:1, RANGE:1, DATE:"1/2/2020", BOOL:-1, ICON:"Red", HTML:"<img src='/Red.svg' height='17'>" }, A: { HTML: { SortValue:3 } } }, 
         { D:"RED", V: { INT:5, FLOAT:-6.5, TEXT:"O n e", CASE:"O n e", LIST:1, RANGE:"1;7;8;9", DATE:"1/3/2020", BOOL:-1, ICON:"Orange", HTML:"<img src='/Orange.svg' height='17'>" }, A: { HTML: { SortValue:2 } } }, 
         { D:"RED", V: { INT:6, FLOAT:12, TEXT:"one", CASE:"one", LIST:1, RANGE:"1;5", DATE:"1/6/2020", BOOL:1 }, A: { HTML: { SortValue:"empty" } } }, 
         { D:"GREEN", V: { INT:7, FLOAT:16, TEXT:"Two", CASE:"Two", LIST:2, RANGE:"2;4;5", DATE:"1/6/2020", BOOL:-1, ICON:"Orange", HTML:"<img src='/Orange.svg' height='17'>" }, A: { HTML: { SortValue:1 } } }, 
         { D:"RED", V: { INT:8, FLOAT:2.4, TEXT:"tw o", CASE:"tw o", LIST:2, RANGE:2, DATE:"1/6/2020", BOOL:-1 }, A: { HTML: { SortValue:"empty" } } }, 
         { D:"BLUE", V: { INT:9, FLOAT:-12.5, TEXT:"Two", CASE:"Two", LIST:2, RANGE:"2;5;6", DATE:"1/8/2020", BOOL:-1, ICON:"Red", HTML:"<img src='/Red.svg' height='17'>" }, A: { HTML: { SortValue:3 } } }, 
         { D:"GREEN", V: { INT:10, FLOAT:6.65, TEXT:"Three", CASE:"Three", LIST:3, RANGE:"3;5;10", DATE:"1/8/2020", BOOL:1 }, A: { HTML: { SortValue:"empty" } } },  
         { D:"GREEN", V: { INT:11, FLOAT:2.3, TEXT:"THREE", CASE:"THREE", LIST:3, RANGE:3, DATE:"1/8/2020", BOOL:-1, ICON:"Green", HTML:"<img src='/Green.svg' height='17'>" }, A: { HTML: { SortValue:1 } } }, 
         { D:"RED", V: { INT:12, FLOAT:-5.5, TEXT:"T h r e e", CASE:"T h r e e", LIST:3, RANGE:"3;4", DATE:"1/9/2020", BOOL:-1 }, A: { HTML: { SortValue:"empty" } } }, 
         { D:"RED", V: { INT:14, FLOAT:11.4, TEXT:"Four", CASE:"Four", LIST:4, RANGE:"4;8", DATE:"1/13/2020", BOOL:-1, ICON:"Red", HTML:"<img src='/Red.svg' height='17'>" }, A: { HTML: { SortValue:3 } } }, 
         { D:"GREEN", V: { INT:15, FLOAT:1.06, TEXT:"f o u r", CASE:"f o u r", LIST:4, RANGE:4, DATE:"1/13/2020", BOOL:0, ICON:"Green", HTML:"<img src='/Green.svg' height='17'>" }, A: { HTML: { SortValue:1 } } }, 
         { D:"BLUE", V: { INT:16, FLOAT:0.5, TEXT:"Four", CASE:"Four", LIST:4, RANGE:"4;6;7;8;9", DATE:"1/13/2020", BOOL:0, ICON:"Green", HTML:"<img src='/Green.svg' height='17'>" }, A: { HTML: { SortValue:1 } } }, 
         { D:"GREEN", V: { INT:17, FLOAT:-0.6, TEXT:"S I X", CASE:"S I X", LIST:6, RANGE:"6;7;8", DATE:"1/14/2020", BOOL:0 }, A: { HTML: { SortValue:"empty" } } }, 
         { D:"RED", V: { INT:18, FLOAT:22, TEXT:"Six", CASE:"Six", LIST:6, RANGE:6, DATE:"1/14/2020", BOOL:-1, ICON:"Orange", HTML:"<img src='/Orange.svg' height='17'>" }, A: { HTML: { SortValue:2 } } }, 
         { D:"RED", V: { INT:19, FLOAT:4, TEXT:"Seven", CASE:"Seven", LIST:7, RANGE:"7;8;9", DATE:"1/16/2020", BOOL:1, ICON:"Red", HTML:"<img src='/Red.svg' height='17'>" }, A: { HTML: { SortValue:3 } } }, 
         { D:"RED", V: { INT:20, FLOAT:5.9, TEXT:" seven", CASE:" seven", LIST:7, RANGE:7, DATE:"1/17/2020", BOOL:1, ICON:"Green", HTML:"<img src='/Green.svg' height='17'>" }, A: { HTML: { SortValue:1 } } }, 
         { D:"GREEN", V: { INT:21, FLOAT:6.23, TEXT:"seven", CASE:"seven", LIST:7, RANGE:"7;9", DATE:"1/18/2020", BOOL:1, ICON:"Green", HTML:"<img src='/Green.svg' height='17'>" }, A: { HTML: { SortValue:1 } } }, 
         { D:"RED", V: { INT:22, FLOAT:16, TEXT:"Seven", CASE:"Seven", LIST:7, RANGE:"7;9", DATE:"1/18/2020", BOOL:-1, ICON:"Red", HTML:"<img src='/Red.svg' height='17'>" }, A: { HTML: { SortValue:3 } } }, 
         { D:"BLUE", V: { INT:23, FLOAT:6.18, TEXT:"Se ven", CASE:"Se ven", LIST:7, RANGE:"7;9", DATE:"1/20/2020", BOOL:-1, ICON:"Red", HTML:"<img src='/Red.svg' height='17'>" }, A: { HTML: { SortValue:3 } } }, 
         { D:"BLUE", V: { INT:24, FLOAT:5.2, TEXT:"Eight", CASE:"Eight", LIST:8, RANGE:"8;10", DATE:"1/21/2020", BOOL:0, ICON:"Orange", HTML:"<img src='/Orange.svg' height='17'>" }, A: { HTML: { SortValue:2 } } }, 
         { D:"RED", V: { INT:25, FLOAT:-6.345, TEXT:"\u00C9ight", CASE:"\u00C9ight", LIST:8, RANGE:8, DATE:"1/22/2020", BOOL:0, ICON:"Green", HTML:"<img src='/Green.svg' height='17'>" }, A: { HTML: { SortValue:1 } } },  
         { D:"GREEN", V: { INT:26, FLOAT:3, TEXT:"Nine", CASE:"Nine", LIST:9, RANGE:"9;10", DATE:"1/25/2020", BOOL:-1, ICON:"Red", HTML:"<img src='/Red.svg' height='17'>" }, A: { HTML: { SortValue:3 } } }, 
         { D:"RED", V: { INT:27, FLOAT:-0.02, TEXT:"\u0147INE", CASE:"\u0147INE", LIST:9, RANGE:9, DATE:"1/26/2020", BOOL:-1, ICON:"Red", HTML:"<img src='/Red.svg' height='17'>" }, A: { HTML: { SortValue:3 } } }, 
         { D:"GREEN", V: { INT:28, FLOAT:-22.9, TEXT:"N IN E", CASE:"N IN E", LIST:9, RANGE:"", DATE:"1/27/2020", BOOL:1 }, A: { HTML: { SortValue:"empty" } } }, 
         { D:"BLUE", V: { INT:29, FLOAT:-5.9, TEXT:"Ni ne", CASE:"Ni ne", LIST:9, RANGE:"", DATE:"1/27/2020", BOOL:1 }, A: { HTML: { SortValue:"empty" } } }, 
         { D:"RED", V: { INT:30, FLOAT:6.2, TEXT:"n  ine", CASE:"n  ine", LIST:10, RANGE:"9;10", DATE:"1/27/2020", BOOL:1 }, A: { HTML: { SortValue:"empty" } } }, 
         { D:"RED", V: { INT:31, FLOAT:22, TEXT:" Ten", CASE:" Ten", LIST:10, RANGE:10, DATE:"1/29/2020", BOOL:-1, ICON:"Red", HTML:"<img src='/Red.svg' height='17'>" }, A: { HTML: { SortValue:3 } } }, 
         { D:"GREEN", V: { INT:32, FLOAT:6, TEXT:"Ten", CASE:"Ten", LIST:10, RANGE:"", DATE:"1/30/2020", BOOL:-1, ICON:"Orange", HTML:"<img src='/Orange.svg' height='17'>" }, A: { HTML: { SortValue:2 } } }, 
         { D:"BLUE", V: { INT:33, FLOAT:-3, TEXT:"t e n", CASE:"t e n", LIST:10, RANGE:10, DATE:"1/31/2020", BOOL:-1, ICON:"Green", HTML:"<img src='/Green.svg' height='17'>" }, A: { HTML: { SortValue:1 } } }, 
         { D:"RED", V: { INT:34, FLOAT:-5, TEXT:"ten", CASE:"ten", LIST:10, RANGE:"", DATE:"1/31/2020", BOOL:0, ICON:"Red", HTML:"<img src='/Red.svg' height='17'>" }, A: { HTML: { SortValue:3 } } }, 
         { D:"BLUE", V: { INT:35, FLOAT:2, TEXT:"Ten", CASE:"Ten", LIST:10, RANGE:10, DATE:"1/31/2020", BOOL:0 }, A: { HTML: { SortValue:"empty" } } }, 
         ], 
   }), []);

   return (<>
      <h1>2. Filtering columns</h1>
      <h5>Showing only columns that satisfy selected criteria</h5>
      <section>
         <FastGrid src={src} style={{ maxWidth:"100%" }}/>
      </section>

      {/*. Description */}
      <ul>
         <li><h4>Setting filter</h4><br />
            FastGrid filter can be set and controlled by special table row <b>D: </b><dfn>"Filter"</dfn>.<br />
            The "<b>Filter</b>" row can be placed to any row part, usually in Head below Header.<br />
            The initial filtering can be set in the "<b>Filter</b>" row, by setting its cell values in <dfn>V</dfn> and operators in <dfn>Filter</dfn> attribute.<br />
            The "<b>Filter</b>" row by default filters Body row part, it can be changed by row <dfn>FilterPart</dfn> attribute, to filter other row part(s).<br />
         </li>
         <li><h4>Changing filter</h4><br />
            Filter can be changed by a user by choosing filter operator from filter menu. It is possible to preset the available filter operators for given Filter cell by <dfn>FilterMenu</dfn> attribute.<br />
            The filter can be changed also by changing cell value in the Filter row. If there was no filter operator, the value change presets also filter operator to operator set by cell <dfn>DefaultFilter</dfn>.<br />
            The filter can be changed also by API method <b>ChangeFilter</b>.<br />
         </li>
         <li><h4>Merging and disabling filters</h4><br />
            The individual filters in one "<b>Filter</b>" row are merged together by operator <b>AND</b> by default (all filters must be passed to show the row).<br />
            If the "<b>Filter</b>" row has set <dfn>FilterAction</dfn> = <b>2</b>, the individual filters are merged by operator <b>OR</b> (at least one filter must be passes to show the row).<br />
            To disable filtering by the "<b>Filter</b>" row, set its <b>FilterAction</b> to <b>0</b>.<br />
            There can be more "<b>Filter</b>" rows in grid. The filters in these rows are merged together by operator <b>AND</b> by default.<br />
            If the Cfg attribute <dfn>FilterAction</dfn> = <b>2</b>, the row filters are merged by operator <b>OR</b>.<br />
            To disable all filters in grid set Cfg attribute <b>FilterAction</b> to <b>0</b>.<br />
            Merging custom filters is controlled by Cfg <dfn>FilterActionCustom</dfn>.<br />
         </li>
         <li><h4>Filter operators</h4><br />
            There are 15 filter operators that can be assigned to <b>Filter</b> attribute as numbers 0 - 14:<br />
            <table>
            <tbody>
            <tr><td style={{width:"120px"}}>Off:</td><td><b>0</b> - Off</td></tr>
            <tr><td>Number filter:</td><td><b>1</b> - Equal, <b>2</b> - Not equal, <b>3</b> - Less than, <b>4</b> - Less than or equal, <b>5</b> - Greater than, <b>6</b> - Greater than or equal</td></tr>
            <tr><td>String filter:</td><td><b>7</b> - Begins with, <b>8</b> - Does not begin with, <b>9</b> - Ends with, <b>10</b> - Does not end with, <b>11</b> - Contains, <b>12</b> - Does not contain</td></tr>
            <tr><td>Range filter:</td><td><b>13</b> - Equal all, <b>14</b> - Not equal all</td></tr>
            </tbody>
            </table>
         </li>
         <li><h4>Range filter</h4><br />
            To permit filtering by more selected values or by range(s) of dates or numbers set Filter cell attribute <dfn>Range</dfn> = <b>1</b>.<br />
            To permit filtering by comparing individual values in Range cells, set Filter cell attribute <b>Range</b> = <b>2</b>.<br />
         </li>
         <li><h4>Custom filters</h4><br />
            It is possible to add custom filters by API method <dfn>SetFilter</dfn>.<br />
            Or set specific custom filter to filter range of values by API method <dfn>FilterRange</dfn>.<br />
         </li>
         <li><h4>Wildcards</h4><br />
            In string filter is possible to use wildcards, "<b>?</b>" to replace one character (defined by Cfg <dfn>FilterReplaceOne </dfn>), "<b>*</b>" to replace none, one or more characters (defined by Cfg <dfn>FilterReplaceMore</dfn>).<br />
         </li>
        <li><h4>Filter only specified defaults</h4><br />
           It is possible to apply the filter set in the <b>Filter</b> cell to only particular rows, set their default row id(s) to cell <dfn>FilterD</dfn>. Rows with other default rows will not be affected by this filter and will be always shown.<br />
           To let users to choose the <b>FilterD</b>, define cell attribute <dfn>FilterDList</dfn> to add these options to the filter operators menu.<br />
        </li>
        <li><h4>Filter settings</h4><br />
           Some of the global filter setting can be changed by users in popup menu for <b>Tool</b> cell <b>D: </b> <dfn>Filter</dfn>.<br />
           When comparing values for filter it is possible to ignore <b>case</b> (Cfg <dfn>FilterCaseSensitive</dfn>, row <dfn>CaseSensitive</dfn>), 
           <b>diacritics</b> (Cfg <dfn>FilterLocaleCompare</dfn>, row <dfn>LocaleCompare</dfn>), 
           some characters (usually <b>spaces</b>) (Cfg <dfn>FilterWhiteChars </dfn>, row <dfn>WhiteChars</dfn>), etc.<br />
           To change the way the cell values are compared, set cell attribute <dfn>FilterValue</dfn> to use this value instead of the cell value for comparing.<br />
           List values are filtered by List values by default, to filter by the index or keys set filter cell <dfn>FilterRaw</dfn> attribute.<br />
           To hide rows with empty cells in filtered columns by number operators set appropriate value to Cfg <dfn>FilterIgnoreEmpty</dfn>.<br />
        </li>
        <li><h4>Filter restrictions</h4><br />
           To not filter the row, set row <dfn>NoFilterRow</dfn> attribute.<br />
           To not permit filtering by some cell in filter row, set its attribute <dfn>NoFilterBy</dfn> = <b>0</b> and optionally attributes <b>NoEdit</b> = <b>1</b> and <b>LeftIcons</b> = <b>""</b>.<br />
        </li>
      </ul>
      </>);
}