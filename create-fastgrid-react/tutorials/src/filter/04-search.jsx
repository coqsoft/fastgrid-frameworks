import React, { useMemo, useRef } from "react";
import { FastGrid } from "fastgrid-react";
import "../Tutorial.css";

export default function App() {
   //. All the svg used for this sample are stored in public directory

   const src = useMemo(() => ({ //. All layout and data for grid. Memo is used for simple object created inside the App function to avoid re-creating grid on every React App render
      Cfg: { 
         id:"Search", IndexList:1, SelectAllType:2, PrintIcons:7, OverScroll:1, SearchHistory:"|one|two|red|one green|two orange|t*e|zzz",
         SearchText:"one 6 red", SearchMulti:1, SearchAction:"Search,FocusNext,ColorCells,SelectRows,Rows,Cells", SearchFocusCol:"-INT",
         }, 
      DefCells: {
         ICON: { TextIconsFormula:"Value?Value.replace(/;/g,'Mark,')+'Mark':''", Text:'', SearchValueFormula:'Value' }, //. SearchValue is used to avoid Text that is used to hide the value
         },
      LeftCols:[
         { id:"INDEX", D:"Index", Type:"Number", RightIcons:"SelectRow" }
         ],
      Cols: [ 
         { id: "INT", Type: "Number", Width:80 }, 
         { id: "FLOAT", Type: "Number", Width:70 }, 
         { id: "TEXT", Type: "String", Width:100, CaseSensitive:0, WhiteChars:" ", LocaleCompare:2 }, 
         { id: "CASE", Type: "String", Width:100, CaseSensitive:1, WhiteChars:"", LocaleCompare:0 }, 
         { id: "LIST", Type: "String", NumberSort:1, RightIcons:"List", Button:"List", List: "||One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten", IndexList:1, Width:110 }, 
         { id: "RANGE", Type: "String", NumberSort:1, RightIcons:"List", Button:"List", List: "||One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten", IndexList:1, Width:100, Range:1 },
         { id: "DATE", Type: "Date", RightIcons:"Date", Width:100, DefaultDate: "1/1/2020", Format: "dddddd MMM" }, 
         { id: "BOOL", Type: "Bool", BoolCycle:2, Width:55 }, 
         { id: "ICON", Type: "String", Width:70, DA:"ICON", Align:2, Button:"List", List:"|Green|Orange|Red", RightIcons:"List", 
            ListMenu: { Script: { Item: { IconAlign:2, Text:"", Height:30 }, Items:[ "*FilterOff", { Value:"Green", Icon:"GreenMark" }, { Value:"Orange", Icon:"OrangeMark" }, { Value:"Red", Icon:"RedMark" } ] } } }, 
         { id: "HTML", Type: "Html", Width:70, Align:2, Button:"List", List:"|<img src='/Green.svg' height='17'>|<img src='/Orange.svg' height='17'>|<img src='/Red.svg' height='17'>", RightIcons:"List" }  
         ],
      Head_Cfg: { BorderColor:",,header," },
      Head: [ 
         { D:"Header", id:"Header", DA:"Header", V: { INDEX:"" }, A: { INDEX: { RightIcons:"SelectRows" } } },
         { D:"Filter", id:"Filter1", NoIndex:2, Wrap:1, A: { INDEX: "FilterAction", INT: { FilterDList:"|RED|GREEN|BLUE", } } },
         ], 

      DefTools: {
         BOOL: { Type:"Bool", Value:1 },
         RADIO: { Type:"Bool", RadioRow:1, BoolCycle:-1, BoolIcon:"Radio" },
         },
      Top: [ 
         { D:"Search", TextStyle:1, TextColor:"green" },
         { id:"Data", Cells:"Settings,Reload,PrintPdf,Export,Copy,Paste,Undo,Redo,Sort,Filter" }, 
         "Layout",
         { id:"Info", Cells: [ "Empty", { D:"Label", Label:"Found rows:", Formula:"(Grid.FoundRows?Grid.FoundRows.length:0) + ' / ' + count(null,'Body')", TextColor:"blue" }, { D:"Label", Label:"cells:", Formula:"(Grid.FoundCells?Grid.FoundCells.length:0) + ' / ' + count(null,'Body')*11", TextColor:"blue" } ] },
         { id:"Search", NewLine:1, FormulaCache:1, Cells: [
            { D:"List", Label:"$SearchFocus", IndexList:1, List:"|$SearchNone|$SearchStart|$SearchForwards|$SearchBackwards", NoFocus:1, Width:80,
               Formula:"var a = Grid.ConvertFlags(Grid.SearchAction,Grid.Flags.SearchAction,1); return a['Focus'] ? 1 : a['FocusNext'] ? 2 : a['FocusPrev'] ? 3 : 0;",
               OnChange:"var v = ['',',Focus',',FocusNext',',FocusPrev'][Value]; Grid.SetCfgAttr('SearchAction',(Grid.SearchAction+',').replace(/Focus[^,]*,/i,'').replace(/,$/,v)); Grid.Search(null,true);",
               Tip:"Focus found cells. Focus next or previous cell.",
               },
            {  Type:"Bool", Text:"$SearchColorCells", Formula:"Grid.SearchAction.search(/ColorCells/i)>=0", 
               OnChange:"Grid.SetCfgAttr('SearchAction',Value?Grid.SearchAction+',ColorCells':(Grid.SearchAction+',').replace(/ColorCells,/i,'').slice(0,-1)); Grid.Search(null,true);",
               Tip:"Mark found cells by background color"
               }
            ]},
         { id:"Search2", FormulaCache:1, Cells: [
            {  Type:"Bool", Text:"$SearchColorRows", Formula:"Grid.SearchAction.search(/ColorRows/i)>=0", 
               OnChange:"Grid.SetCfgAttr('SearchAction',Value?Grid.SearchAction+',ColorRows':(Grid.SearchAction+',').replace(/ColorRows,/i,'').slice(0,-1)); Grid.Search(null,true);",
               Tip:"Mark whole rows with some found cell by background color"
               },
            {  Type:"Bool", Text:"$SearchSelectRows", Formula:"Grid.SearchAction.search(/SelectRows/i)>=0", 
               OnChange:"Grid.SetCfgAttr('SearchAction',Value?Grid.SearchAction+',SelectRows':(Grid.SearchAction+',').replace(/SelectRows,/i,'').slice(0,-1)); Grid.Search(null,true);",
               Tip:"Select the rows with some found cell",
               },
            {  Type:"Bool", Text:"$SearchFilterRows", Formula:"Grid.SearchAction.search(/FilterRows/i)>=0", 
               OnChange:"Grid.SetCfgAttr('SearchAction',Value?Grid.SearchAction+',FilterRows':(Grid.SearchAction+',').replace(/FilterRows,/i,'').slice(0,-1)); Grid.Search(null,true);",
               Tip:"Filter rows - hide all rows without found cells"
               },
            ]},
         { id:"SearchCompare", FormulaCache:1, Cells: [
            { D:"List", Label:"$SearchCompare", IndexList:1, List:"|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18".replace(/\|(\d+)/g,"|$$Search$1"), NoFocus:1, Width:135,
               Formula:"Grid.SearchCompare-1", OnChange:"Grid.SetCfgAttr('SearchCompare',Value-0+1); Grid.Search(null,true);",
               Tip:"Operator used to compare searched value(s) against the cell value<br>Note, if searched more words, it is strongly dependent on the 'Search more words' option",
               },
            {  Type:"Bool", Text:"$SearchType", Formula:"Grid.SearchType==3", OnChange:"Grid.SetCfgAttr('SearchType',Value?3:2); Grid.Search(null,true);",
               Tip:"Searches in the displayed strings instead of cell value.<br>Searches also in number cells as in strings"
               }
            ]},
         { id:"SearchCompare2", FormulaCache:1, Cells: [
            { D:"List", Label:"$SearchMulti", IndexList:1, List:"|$SearchWhole|$SearchOR|$SearchAND|$SearchANDRow", NoFocus:1, Width:60,
               Formula:"Grid.SearchMulti-0", OnChange:"Grid.SetCfgAttr('SearchMulti',Value-0); Grid.Search(null,true);",
               Tip:"Behavior when searching more words at once<br>No - Found cell contains the whole string<br>Any - Found cell contains at least one word<br>All in cell - Found cell contains all words<br>All in row - Found cell contains at least one word, but the found whole row must contain all words in its cells. ",
               },
            {  Type:"Bool", Text:"$SearchFocusCol", Formula:"Grid.SearchFocusCol[0]!='-'", OnChange:"Grid.SetCfgAttr('SearchFocusCol',Value?'INT':'-INT'); Grid.Search(null,true);",
               Tip:"Focuses only INT column in every found row"
               },
            ]},
         { id:"SearchOptions", FormulaCache:1, Cells: [
            { Type:"Bool", Text:"$SearchCase", Formula:"Grid.SearchCaseSensitive", OnChange:"Grid.SetCfgAttr('SearchCaseSensitive',Value); Grid.Search(null,true);", Tip:"Compares strings case sensitive" },
            { Type:"Bool", Text:"$SearchLocale", Formula:"Grid.SearchLocaleCompare", OnChange:"Grid.SetCfgAttr('SearchLocaleCompare',Value?2:0); Grid.Search(null,true);", Tip:"Does not differs between the same characters with different diacritic symbols like a = \u00e1 = \u00e3" }
            ]},
         { id:"SearchOptions2", FormulaCache:1, Cells: [
            { Type:"Bool", Text:"$SearchWhite", Formula:"Grid.SearchWhiteChars==' '", OnChange:"Grid.SetCfgAttr('SearchWhiteChars',Value?' ':''); Grid.Search(null,true);", Tip:"Ignore selected white characters when comparing strings" },
            { Type:"Bool", Text:"$SearchWildcards", Formula:"Grid.SearchOptions.search(/wildcards/i)>=0", OnChange:"Grid.SetCfgAttr('SearchOptions',Value?'Wildcards':''); Grid.Search(null,true);", Tip:"Permits wildcards characters * and ? in the search string.<br>If used the wildcard character, forces strings search and cannot ignore diacritics." },
            ]},
         ], 
      Body_Cfg: { Sort:"INT" },
      Body: [ 
         { }, 
         { V: { INT:1, FLOAT:1.3, TEXT:"One", CASE:"One", LIST:1, RANGE:"1;3;5", DATE:"1/1/2020", BOOL:1, ICON:"Red", HTML:"<img src='/Red.svg' height='17'>" }, A: { HTML: { SearchValue:"red" } } }, 
         { V: { INT:2, FLOAT:6, TEXT:"\u00D3ne", CASE:"\u00D3ne", LIST:1, RANGE:1, DATE:"1/1/2020", BOOL:-1, ICON:"Green", HTML:"<img src='/Green.svg' height='17'>" }, A: { HTML: { SearchValue:"green" } } }, 
         { V: { INT:3, FLOAT:66, TEXT:"\u00D4NE", CASE:"\u00D4NE", LIST:1, RANGE:"1;2", DATE:"1/2/2020", BOOL:-1, ICON:"Green", HTML:"<img src='/Green.svg' height='17'>" }, A: { HTML: { SearchValue:"green" } } }, 
         { V: { INT:4, FLOAT:3.6, TEXT:"ONE", CASE:"ONE", LIST:1, RANGE:1, DATE:"1/2/2020", BOOL:-1 }, A: { HTML: { SearchValue:"empty" } } }, 
         { V: { INT:5, FLOAT:-6.5, TEXT:"O n e", CASE:"O n e", LIST:1, RANGE:"1;7;8;9", DATE:"1/3/2020", BOOL:-1, ICON:"Orange", HTML:"<img src='/Orange.svg' height='17'>" }, A: { HTML: { SearchValue:"orange" } } }, 
         { V: { INT:6, FLOAT:12, TEXT:"one", CASE:"one", LIST:1, RANGE:"1;5", DATE:"1/6/2020", BOOL:1, ICON:"Red", HTML:"<img src='/Red.svg' height='17'>" }, A: { HTML: { SearchValue:"red" } } }, 
         { V: { INT:7, FLOAT:16, TEXT:"Two", CASE:"Two", LIST:2, RANGE:"2;4;5", DATE:"1/6/2020", BOOL:-1, ICON:"Orange", HTML:"<img src='/Orange.svg' height='17'>" }, A: { HTML: { SearchValue:"green" } } }, 
         { V: { INT:8, FLOAT:2.4, TEXT:"tw o", CASE:"tw o", LIST:2, RANGE:2, DATE:"1/6/2020", BOOL:-1 }, A: { HTML: { SearchValue:"empty" } } }, 
         { V: { INT:9, FLOAT:-12.5, TEXT:"Two", CASE:"Two", LIST:2, RANGE:"2;5;6", DATE:"1/8/2020", BOOL:-1, ICON:"Red", HTML:"<img src='/Red.svg' height='17'>" }, A: { HTML: { SearchValue:"red" } } }, 
         { V: { INT:10, FLOAT:6.65, TEXT:"Three", CASE:"Three", LIST:3, RANGE:"3;5;10", DATE:"1/8/2020", BOOL:1 }, A: { HTML: { SearchValue:"empty" } } },  
         { V: { INT:11, FLOAT:2.3, TEXT:"THREE", CASE:"THREE", LIST:3, RANGE:3, DATE:"1/8/2020", BOOL:-1, ICON:"Green", HTML:"<img src='/Green.svg' height='17'>" }, A: { HTML: { SearchValue:"green" } } }, 
         { V: { INT:12, FLOAT:-5.5, TEXT:"T h r e e", CASE:"T h r e e", LIST:3, RANGE:"3;4", DATE:"1/9/2020", BOOL:-1 }, A: { HTML: { SearchValue:"empty" } } }, 
         { V: { INT:13, FLOAT:6.65, TEXT:"NoSearch", LIST:1, DATE:"1/8/2020", BOOL: 1 }, NoSearch:1, NoList:1, Color:"#EEE" },
         { V: { INT:14, FLOAT:11.4, TEXT:"Four", CASE:"Four", LIST:4, RANGE:"4;8", DATE:"1/13/2020", BOOL:-1, ICON:"Red", HTML:"<img src='/Red.svg' height='17'>" }, A: { HTML: { SearchValue:"red" } } }, 
         { V: { INT:15, FLOAT:1.06, TEXT:"f o u r", CASE:"f o u r", LIST:4, RANGE:4, DATE:"1/13/2020", BOOL:0, ICON:"Green", HTML:"<img src='/Green.svg' height='17'>" }, A: { HTML: { SearchValue:"green" } } }, 
         { V: { INT:16, FLOAT:0.5, TEXT:"Four", CASE:"Four", LIST:4, RANGE:"4;6;7;8;9", DATE:"1/13/2020", BOOL:0, ICON:"Green", HTML:"<img src='/Green.svg' height='17'>" }, A: { HTML: { SearchValue:"green" } } }, 
         { V: { INT:17, FLOAT:-0.6, TEXT:"S I X", CASE:"S I X", LIST:6, RANGE:"6;7;8", DATE:"1/14/2020", BOOL:0 }, A: { HTML: { SearchValue:"empty" } } }, 
         { V: { INT:18, FLOAT:22, TEXT:"Six", CASE:"Six", LIST:6, RANGE:6, DATE:"1/14/2020", BOOL:-1, ICON:"Orange", HTML:"<img src='/Orange.svg' height='17'>" }, A: { HTML: { SearchValue:"orange" } } }, 
         { V: { INT:19, FLOAT:4, TEXT:"Seven", CASE:"Seven", LIST:7, RANGE:"7;8;9", DATE:"1/16/2020", BOOL:1, ICON:"Red", HTML:"<img src='/Red.svg' height='17'>" }, A: { HTML: { SearchValue:"red" } } }, 
         { V: { INT:20, FLOAT:5.9, TEXT:" seven", CASE:" seven", LIST:7, RANGE:7, DATE:"1/17/2020", BOOL:1, ICON:"Green", HTML:"<img src='/Green.svg' height='17'>" }, A: { HTML: { SearchValue:"green" } } }, 
         { V: { INT:21, FLOAT:6.23, TEXT:"seven", CASE:"seven", LIST:7, RANGE:"7;9", DATE:"1/18/2020", BOOL:1, ICON:"Green", HTML:"<img src='/Green.svg' height='17'>" }, A: { HTML: { SearchValue:"green" } } }, 
         { V: { INT:22, FLOAT:16, TEXT:"Seven", CASE:"Seven", LIST:7, RANGE:"7;9", DATE:"1/18/2020", BOOL:-1, ICON:"Red", HTML:"<img src='/Red.svg' height='17'>" }, A: { HTML: { SearchValue:"red" } } }, 
         { V: { INT:23, FLOAT:6.18, TEXT:"Se ven", CASE:"Se ven", LIST:7, RANGE:"7;9", DATE:"1/20/2020", BOOL:-1, ICON:"Red", HTML:"<img src='/Red.svg' height='17'>" }, A: { HTML: { SearchValue:"red" } } }, 
         { V: { INT:24, FLOAT:5.2, TEXT:"Eight", CASE:"Eight", LIST:8, RANGE:"8;10", DATE:"1/21/2020", BOOL:0, ICON:"Orange", HTML:"<img src='/Orange.svg' height='17'>" }, A: { HTML: { SearchValue:"orange" } } }, 
         { V: { INT:25, FLOAT:-6.345, TEXT:"\u00C9ight", CASE:"\u00C9ight", LIST:8, RANGE:8, DATE:"1/22/2020", BOOL:0, ICON:"Green", HTML:"<img src='/Green.svg' height='17'>" }, A: { HTML: { SearchValue:"green" } } },  
         { V: { INT:26, FLOAT:3, TEXT:"Nine", CASE:"Nine", LIST:9, RANGE:"9;10", DATE:"1/25/2020", BOOL:-1, ICON:"Red", HTML:"<img src='/Red.svg' height='17'>" }, A: { HTML: { SearchValue:"red" } } }, 
         { V: { INT:27, FLOAT:-0.02, TEXT:"\u0147INE", CASE:"\u0147INE", LIST:9, RANGE:9, DATE:"1/26/2020", BOOL:-1, ICON:"Red", HTML:"<img src='/Red.svg' height='17'>" }, A: { HTML: { SearchValue:"red" } } }, 
         { V: { INT:28, FLOAT:-22.9, TEXT:"N IN E", CASE:"N IN E", LIST:9, RANGE:"", DATE:"1/27/2020", BOOL:1 }, A: { HTML: { SearchValue:"empty" } } }, 
         { V: { INT:29, FLOAT:-5.9, TEXT:"Ni ne", CASE:"Ni ne", LIST:9, RANGE:"", DATE:"1/27/2020", BOOL:1 }, A: { HTML: { SearchValue:"empty" } } }, 
         { V: { INT:30, FLOAT:6.2, TEXT:"n  ine", CASE:"n  ine", LIST:10, RANGE:"9;10", DATE:"1/27/2020", BOOL:1 }, A: { HTML: { SearchValue:"empty" } } }, 
         { V: { INT:31, FLOAT:22, TEXT:" Ten", CASE:" Ten", LIST:10, RANGE:10, DATE:"1/29/2020", BOOL:-1, ICON:"Red", HTML:"<img src='/Red.svg' height='17'>" }, A: { HTML: { SearchValue:"red" } } }, 
         { V: { INT:32, FLOAT:6, TEXT:"Ten", CASE:"Ten", LIST:10, RANGE:"", DATE:"1/30/2020", BOOL:-1, ICON:"Orange", HTML:"<img src='/Orange.svg' height='17'>" }, A: { HTML: { SearchValue:"orange" } } }, 
         { V: { INT:33, FLOAT:-3, TEXT:"t e n", CASE:"t e n", LIST:10, RANGE:10, DATE:"1/31/2020", BOOL:-1, ICON:"Green", HTML:"<img src='/Green.svg' height='17'>" }, A: { HTML: { SearchValue:"green" } } }, 
         { V: { INT:34, FLOAT:-5, TEXT:"ten", CASE:"ten", LIST:10, RANGE:"", DATE:"1/31/2020", BOOL:0, ICON:"Red", HTML:"<img src='/Red.svg' height='17'>" }, A: { HTML: { SearchValue:"red" } } }, 
         { V: { INT:35, FLOAT:2, TEXT:"Ten", CASE:"Ten", LIST:10, RANGE:10, DATE:"1/31/2020", BOOL:0 }, A: { HTML: { SearchValue:"empty" } } },
         { V: { INT:"Test more", TEXT:"one 6 red", CASE:"6 xxx one red", LIST:"xxone 6 redzz", RANGE:"6 redzz xxone" }, A: { INT: { Type:"String" }, LIST: { RightIcons:"" }, RANGE: { RightIcons:"" } } }
         ], 
   }), []);

   return (<>
      <h1>4. Searching in cells</h1>
      <h5>Focus or highlight cells or select or show rows that satisfy selected criteria</h5>
      <section>
         <FastGrid src={src} style={{ display:"inline-block", maxWidth:"100%", height:"550px" }}/>
      </section>

      {/*. Description */}
      <ul>
         <li><h4>Changing search</h4><br />
            Search control can be added to grid by toolbar <b>D:</b> <dfn>Search</dfn>.<br />
            This toolbar contains two cells by default, search combo as tool <b>D:</b> <dfn>SearchText</dfn> that permits entering text to search. The search starts by pressing enter. 
            The combo can show also popup list of search history and search off item.<br />
            The next cell on the Search toolbar is search button as tool <b>D:</b> <dfn>Search</dfn> that performs next search (usually for focus search) and can show search options in popup list.<br />
            The search can be run also by API method <b>Search</b>.<br />
         </li>
         <li><h4>Setting search</h4><br />
            Text to search is set in Cfg attribute <dfn>SearchText</dfn>. It can contain more words separated by space that can be searched together or separatelly according to setting <dfn>SearchMulti</dfn>.<br />
            Performed search action is set in Cfg attribute <dfn>SearchAction</dfn>. The available search actions are focus, color (cells or rows), select or filter.<br />
            The search can store the found rows or cells in Cfg attributes <b>FoundRows</b> / <b>FoundCells</b> / <b>FoundBlocks</b> if <b>SearchAction</b> contains appropriate action.<br />
            To perform any search, the <b>SearchAction</b> must contain keyword <b>Search</b>.<br />
         </li>
         <li><h4>Search operators</h4><br />
            There are 18 search operators that can be assigned to Cfg <dfn>SearchCompare</dfn> attribute as numbers 1 - 18:<br />
            <table>
               <tbody>
               <tr><td style={{width:"100px"}}>Number search:</td><td><b>1</b> - Equal, <b>2</b> - Not equal, <b>3</b> - Less than, <b>4</b> - Less than or equal, <b>5</b> - Greater than, <b>6</b> - Greater than or equal</td></tr>
               <tr><td>String search:</td><td><b>7</b> - Begins with, <b>8</b> - Does not begin with, <b>9</b> - Ends with, <b>10</b> - Does not end with, <b>11</b> - Contains, <b>12</b> - Does not contain</td></tr>
               <tr><td>Word search:</td><td><b>13</b> - Any word begins with, <b>14</b> - No word begins with, <b>15</b> - Any word ends with, <b>16</b> - No word ends with, <b>17</b> - Any word equals to, <b>18</b> - No word equals to</td></tr>
               </tbody>
            </table>
         </li>
         <li><h4>Wildcards</h4><br />
            In string filter is possible to use wildcards if <dfn>SearchOptions</dfn> contains <b>Wildcards</b> keyword, 
            "<b>?</b>" to replace one character (defined by Cfg <dfn>SearchReplaceOne </dfn>), "<b>*</b>" to replace none, one or more characters (defined by Cfg <dfn>SearchReplaceMore</dfn>).<br />
         </li>
        <li><h4>Search settings</h4><br />
           Some of the global search setting can be changed by users in popup menu for <b>Tool</b> cell <b>D: </b> <dfn>Search</dfn>.<br />
           When comparing values for search it is possible to ignore <b>case</b> (Cfg <dfn>SearchCaseSensitive</dfn>), 
           <b>diacritics</b> (Cfg <dfn>SearchLocaleCompare</dfn>), 
           some characters (usually <b>spaces</b>) (Cfg <dfn>SearchWhiteChars </dfn>), etc.<br />
           To change the way the cell values are compared, set cell attribute <dfn>SearchValue</dfn> to use this value instead of the cell value for comparing.<br />
           How the cell value will be formatted for search can be set by Cfg <dfn>SearchType</dfn>.<br />
           The search can by run asynchronously with progress dialog and cancel button shown when search time is higher than <dfn>MaxSearchTime </dfn>.<br />
        </li>
        <li><h4>Search restrictions</h4><br />
           To not search in the row or column, set its attribute <dfn>NoSearch</dfn>.<br />
           To not search in the cell, set its <dfn>NoSearch</dfn>, this attribute is read only if set <b>FV</b>&amp;<b>32</b>.<br />
           It is possible to specify which rows and column will be searched in <dfn>SearchRows</dfn> / <dfn>SearchCols</dfn>.<br />
           It is also possible to specify which type of rows and columns will be searched by <dfn>SearchRowsType</dfn> / <dfn>SearchColsType</dfn>.<br />
        </li>
      </ul>
      </>);
}