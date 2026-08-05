<script setup>
import { FastGrid } from "fastgrid-vue";
import "../Tutorial.css";


   const src = { //. All layout and data for grid.
      Cfg: { id: "Types", HtmlFormat:1, HtmlWidth:1, AutoHtml:1, EditingStyle:1, Focus:2, RecalcOn:15, HideVScroll:1, OverScroll:2 }, 
      DefTools: { 
         Edit: { Width:80, MaxWidth:300 } 
         },
      DefRows: { 
         Row: { L:-1 } 
         },
      DefCols: {
         Col: { EmptyString:"empty" }
         }, 
      LeftCols: [
         { id: "id", D:"HeaderFocus" }, 
         ],
      Cols: [ 
         { id: "AUTO", Type:"Auto" },
         { id: "STRING", Type: "String" }, 
         { id: "HTML", Type: "Html" }, 
         { id: "BOOL", Type: "Bool", Width:40 },
         { id: "BOOL2", Type: "Bool", Width:40 },
         { id: "INT", Type: "Number" }, 
         { id: "FLOAT", Type: "Number" },
         { id: "DATETIME", Type: "Date", Format: "M/d/yyyy H:mm:ss", RightIcons:"Date" }, 
         { id: "DATE", Type: "Date", Format: "M/d/yyyy", EmptyString: "empty date", LeftIcons:"Date", Calendar: { Place:{ Align:0 } } }, 
         { id: "TIME", Type: "Date", Format: "HH:mm:ss", EmptyString: "empty time" }, 
         ], 
      Body_Cfg: { Tree:"AUTO" },
      Body: [ 
         { id: 0 }, 
         { id: 1, 
            V: { AUTO: "plain text", STRING: "plain text", HTML:"plain text", BOOL:1, BOOL2:-1, INT: "-56789", FLOAT: "-3456.789", DATETIME: "12/31/2020", DATE: "12/31/2020", TIME: "12/31/2020" },
            A: { BOOL2: { BoolCycle:2 } }
            },
         { id: 2, 
            V: { 
               AUTO: "&lt;b>text&lt;/b>", STRING: "<b>text</b>", HTML:"&lt;b>text&lt;/b>", BOOL:3, BOOL2:4, INT: -56789, FLOAT: "-3456.789", 
               DATETIME: "12/31/2020 14:56:30", DATE: "12/31/2020 14:56:30", TIME: "12/31/2020 14:56:30" 
               },
            A: { 
               BOOL: { BoolCycle:4, BoolMax:4 }, BOOL2: { BoolMin:0, BoolMax:6, BoolCycle:10 }, INT: { Format: ",0" }, FLOAT: { Format: ",0.00" }, 
               DATETIME: { Calendar: { Script: { Time:1 } } } 
               }
            },
         { id: 3, L:0,
            V: { AUTO: "<b>html</b>",  STRING: "<b>html</b>", HTML: "<b>html</b>", INT: -56789, FLOAT: -3456.789, DATETIME: "14:56:30", DATE: "14:56:30", TIME: "14:56:30" },
            F: { BOOL:"countbool()", BOOL2:"countbool()" },
            A: { BOOL: { BoolTree:1, Color:"#FFD" }, BOOL2: { BoolTree:1, Color:"#FFD" }, INT: { Format: ",0000000" }, FLOAT: { Format: "0.00000" } }
            },
         { id: 4, L:1, 
            V: { 
               AUTO:"h<b style='color:red'>tm</b>l", STRING: "plain text", HTML:"h<b style='color:red'>tm</b>l", 
               INT: -56, FLOAT: -0.3456789, DATETIME: "12/31/2020 14:56:30", DATE: "12/31/2020 14:56:30", TIME: "12/31/2020 14:56:30" 
               },
            A: { 
               STRING: { Align: 1 }, BOOL: { BoolTree:1, RadioRow:1, Color:"#FFD" }, BOOL2: { BoolTree:1, RadioRow:1, Color:"#FFD" }, INT: { Format: "0\\%", Align: 0 }, FLOAT: { Format: "0%", Align: 2 }, 
               DATETIME: { Format: "d.M.yyyy h:mm:ss tt", EditFormat: "d.M.yyyy h:mm:ss tt" }, DATE: { Format: "d.M.yyyy", Align: 0 }, 
               TIME: { Format: "h:mm:ss tt", EditFormat: "h:mm:ss tt", Align: 2 }  
               }
            },
         { id: 5, L:1,
            V: { 
               AUTO:12, STRING:12, HTML:"<b style='color:red;'>rich</b> <span style='color:green;'>text</span>", 
               INT: -56789, FLOAT: -3456.789, DATETIME: "12/31/2020 14:56:30", DATE: "12/31/2020 14:56:30", TIME: "12/31/2020 14:56:30" 
               },
            F: { BOOL:"countbool()", BOOL2:"countbool()" },
            A: { 
               BOOL: { BoolTree:1, RadioRow:1, Color:"#FFD" }, BOOL2: { BoolTree:1, RadioRow:1, Color:"#FFD" }, INT: { Format: "$0.00;[red]-$0.00;0" }, FLOAT: { Format: "$0.00;[red]-$0.00;0" },
               DATETIME: { Format: "dddddd MMMM HH:mm", EditFormat: "M/d/yyyy HH:mm" }, DATE: { Format: "dddd, 'week' ddddddd" },
               TIME: { Format: "'<b>'HH:mm'</b>' zzz 'UTC'", EditFormat: "h:mm:ss tt" }
               }
            },
         { id: 6, L:2,
            V: { 
               AUTO:"12/31/2020", STRING:"12/31/2020", HTML:"<b style='font-size:26px;font-family:serif;'>rich</b> <a style='color:blue;' href='http://www.treegrid.com'>text</a>", 
               BOOL:1, INT: 0, FLOAT: -3456.789, DATETIME: "12/31/2020 14:56:30", DATE: "12/31/2020~1/6/2001", TIME: "14:56:30~17:37:00" 
               }, 
            A: { 
               AUTO: { Format:"fd" }, BOOL: { BoolTree:1, RadioRow:1, Color:"#FFD" }, BOOL2: { BoolTree:1, RadioRow:1, Color:"#FFD" }, INT: { Format: "0;-0;'zero'" }, 
               FLOAT: { Format: "'<span style=\"color:blue;font-weight:bold\">'0'</span>'.'<span style=\"color:red\">'##'</span> USD'" },
               DATETIME: { Format: "'<span style=\"color:red\">'yyyy'</span>'-'<span style=\"color:green;font-weight:bold\">'M'</span>'-'<span style=\"color:blue;font-weight:bold\">'d'</span>' '<span style=\"color:maroon;font-style:italic;\">'HH|mm|ss'</span>'" }, 
               DATE: { Range: 1 }, TIME: { Range: 1 },  
               }, 
            },
         { id: 7, L:2,
            V: { 
               AUTO:"12/31/2020 14:56:30", STRING:"12/31 14:56", 
               HTML:"<b style='text-decoration:underline line-through;text-decoration-color:red;text-decoration-style:wavy;'>rich</b> <span style='text-decoration:overline;text-decoration-style:double;text-decoration-color:blue;'>text</span>", 
               BOOL2:1, INT: -56789, FLOAT: -3456.789, DATETIME: "12/31/2020 14:56:30", DATE: "12/31/2020", TIME: "14:56:30" 
               },
            A: { 
               AUTO: { Format:"dddddd MMM HH:mm" }, BOOL: { BoolTree:1, RadioRow:1, Color:"#FFD" }, BOOL2: { BoolTree:1, RadioRow:1, Color:"#FFD" }, 
               INT: { Format: "0," }, FLOAT: { Format: ",0.##;!!! <span style=\"background:lime\">,0.##</span>" }, 
               DATETIME: { Format: "'<span style=\"background:lime\">'MMM '<b>'dd'</b>', yyyy'</span>' '<span style=\"background:#FBF;\">'HH.mm.ss'</span>'" }, 
               DATE: { Format: "'elapsed' '<b>'DDDD'</b>' 'days'", EditFormat: "d" }, 
               TIME: { Format: "'elapsed' '<span style=\"background:lime\">'sss'</span>' 'seconds'", EditFormat: "HH:mm:ss" }
               }
            },
         { id: 8, L:2,
            V: { 
               AUTO:"-3456.789", STRING:"-3456.789", HTML:"<b style='font-size:18px;'>rich</b> <span style='text-shadow:0px 0px 3px red;'>text</span>", 
               INT: -56789, FLOAT: -3456.789, DATETIME: "12/31/2024 14:56:30", DATE: "12/31/2024", TIME: "14:56;16:40;18:40;19:26" 
               }, 
            A: { 
               AUTO: { Format: "0.000E+000" }, BOOL: { BoolTree:1, RadioRow:1, Color:"#FFD" }, BOOL2: { BoolTree:1, RadioRow:1, Color:"#FFD" }, INT: { Format: "0.00E+00" }, FLOAT: { Format: "0.000E+000" }, 
               DATETIME: { Format: "ddd d. MMM, yy" }, DATE: { Format: "'day' DDD in 'year' yyyy", EditFormat: "d" }, TIME: { Format: "HH:mm", Range: 1 }
               }
            },
         { id:9, Wrap:4,
            V: { 
               AUTO:"Multiline text<br>with &lt;BR>", STRING:"Multiline text\nwith \\n", HTML:"Multiline text<br>with &lt;BR>", BOOL:1, INT:5643, FLOAT:-123456789.903192746,
               DATETIME: "12/31/2020 14:56:30", DATE: "12/31/2020", TIME: "14:56:30"
               },
            A: { 
               BOOL: { RadioCol:2, RadioRow:2, BoolCycle:-1, Color:"#FEF" }, BOOL2: { RadioCol:2, RadioRow:2, BoolCycle:-1, Color:"#FEF" }, 
               INT: { Format:"'<i>'0'</i><br>mulitiline &lt;BR>'" }, FLOAT: { Format:"0'<br>'.#############'" },
               DATETIME: { Format:"dddddd MMMM yyyy<br>HH:mm:ss", EditFormat:"M/d/yyyy HH:mm:ss" }, DATE: { Format:"MMMM<br>yyyy" }, TIME: { Format:"hh<br>mm" }
               }
            },
         { id:10, Wrap:5,
            V: { AUTO:"Very long wrapped text to more lines", STRING:"Very long wrapped text", HTML:"Very long wrapped text", INT:12345678901234567890, FLOAT:-123456789.903192746, DATETIME: "12/31/2020 14:56:30~1/3/2001 23:33:45" },
            A: { 
               BOOL: { RadioCol:2, RadioRow:2, BoolCycle:-1, Color:"#FEF" }, BOOL2: { RadioCol:2, RadioRow:2, BoolCycle:-1, Color:"#FEF" }, 
               FLOAT: { Format:"0. ##########" }, DATETIME: { Range:1 } 
               },
            },
         { id:11, Wrap:7,
            V: { AUTO:"Very long wrapped text to more lines", BOOL:-2, BOOL2:20, STRING:"Very long wrapped text", HTML:"Very long wrapped text", INT:12345678901234567890, FLOAT:-123456789.903192746, DATETIME: "12/31/2020 14:56:30" },
            A: { BOOL: { BoolMin:-3, BoolMax:3, BoolCycle:10 }, BOOL2: { BoolMax:100, BoolCycle:[10,20,30,40,50] }, DATETIME: { Format:"dddddd MMMM yyyy HH:mm:ss" } },
            },
         ], 
      Head: [
         { D:"HeaderFocus", 
            V: { id:"Id", AUTO:"Auto", STRING: "String", HTML: "Html", BOOL:"Bool", BOOL2:"Bool", INT: "Number (int)", FLOAT: "Number (float)", DATETIME: "Date (date+time)", DATE: "Date (date)", TIME: "Date (time)" } 
            },
         ],
      Top: [ { Cells:[ "Settings", "Reload","Print","Pdf","Export","Copy","Paste", "Undo", "Redo" ] } ,"Text1", "Text2", "Text3", "Text4", "Layout", 
         { id:"Testbar", Height:44, UseResize:3, Narrow:33, NoUndo:0, Cells:[ 
            { D:"Edit", Type:"Auto", Value:123, Tip:"Auto", MinWidth:25 }, 
            { D:"Edit", Type:"String", Value:123, Tip:"String", MinWidth:25 }, 
            { D:"Edit", Type:"Html", Value:"<b style='color:red;'>rich</b> <span style='color:blue;'>text</span>", Tip:"Html", MinWidth:30 },
            { D:"Edit", Type:"Auto", Value:"Very long wrapped text", Wrap:5, Width:90, MinWidth:30 },
            { D:"Edit", Type:"Number", Value:-3456.789, Format:"[blue]$0.00;[red]-$0.00;$0", Tip:"Number", MinWidth:30 },
            { D:"Edit", Type:"Date", Value:"12/31/2020 14:56:30", Format: "dddddd MMMM '<b style=\"color:blue;\">'HH:mm'</b>'", EditFormat: "M/d/yyyy HH:mm", Width:140, MinWidth:133, Icon:"Date", IconAlign:1, Tip:"Date" },
            { D:"Edit", Type:"Date", Value: "12/31/2020 14:56:30~1/3/2001 23:33:45", Range:1, Wrap:5, Width:150, MinWidth:150, Icon:"Date", Calendar: { Script: { Time:1 } } },
            ] }
         ]
   };

   
</script>

<template>

      <h1>3. Cell types, formats and wrap</h1>
      <h5>Basic editable cells for direct editing in input, textarea or contentEditable div</h5>
      <section>
         <FastGrid :src="src" style="display:inline-block; max-width:100%;"/>
      </section>

      
      <ul>
         <li>
            <h4>Cell Type</h4><br />
            FastGrid supports these cell and tool types: 
            <ul>
               <li>
                  <h4>Auto</h4> - default cell type for normal cells. See <a target="FGDoc" href="https://www.treegrid.com/FDoc/TypeAuto.htm">Auto type</a>.<br />
                  Automatic type chosen according to cell value and <a target="FGDoc" href="https://www.treegrid.com/FDoc/CellType.htm#CellFormat">Format</a>. It chooses among <b>Bool</b> (as TRUE / FALSE, not checkbox), <b>Number</b>, <b>Date</b> and <b>String</b> / <b>Html</b> types.
               </li>
               <li>
                  <h4>Bool</h4> - Boolean cell type as 0 or 1. See <a target="FGDoc" href="https://www.treegrid.com/FDoc/TypeBool.htm">Bool type</a>.<br />
                  Boolean type with value <b>0</b>/null/false or <b>1</b>/true or <b>-1</b> as unknown. It is displayed as <b>checkbox</b>.<br />
                  It supports also values from -999 to 999 as number inside the checkbox.<br />
               </li>
               <li>
                  <h4>Number</h4> - Formatted integer or float number. See <a target="FGDoc" href="https://www.treegrid.com/FDoc/TypeNumber.htm">Number type</a>.<br />
                  Integer or floating point number. It is formatted by <a target="FGDoc" href="https://www.treegrid.com/FDoc/TypeNumber.htm#CellFormat">Format</a>.
               </li>
               <li>
                  <h4>Date</h4> - Formatted date and or time. See <a target="FGDoc" href="https://www.treegrid.com/FDoc/TypeDate.htm">Date type</a>.<br />
                  Date and/or time. It can be set as number of millisecond since 1/1/1970 (if set <a target="FGDoc" href="https://www.treegrid.com/FDoc/TypeDate.htm#CfgExcelDates">ExcelDates</a> to count of days since 12/31/1899) or date string "M/d/yyyy h:m:s". It is formatted by <a target="FGDoc" href="https://www.treegrid.com/FDoc/TypeDate.htm#CellFormat">Format</a>.<br />
                  It can show calendar to pickup the date, date range or date and time. Show the calendard icon by adding <b>Date</b> icon in <b>LeftIcons</b> / <b>RightIcons</b> / <b>TextIcons</b>.<br />
               </li>
               <li>
                  <h4>String</h4> - Unformatted plain text with no special settings.<br />
                  It cannot contain HTML code - any HTML code is escaped.
               </li>
               <li>
                  <h4>Html</h4> - Unformatted html / rich text. See <a target="FGDoc" href="https://www.treegrid.com/FDoc/CellType.htm#Html">Html type</a>.<br />
                  It permits font and text color attributes and links for individual text parts.
               </li>
            </ul>
            For more information see <a target="FGDoc" href="https://www.treegrid.com/FDoc/CellType.htm">Cell Type</a>.<br />
         </li>
         <li><h4>Format</h4><br />
            Formatted can be types <b>Auto</b>, <b>Number</b> and <b>Format</b>.<br />
            The format is specified by <dfn>Format</dfn> attribute string. The Format string has similar format like MS Excel or C# date and number formats.<br />
            In <b>Auto</b> type the date <b>Format</b> can be chosen automatically according to the entered value.<br />
            Different format for editing types <b>Number</b> and <b>Date</b> can be specified by <dfn>EditFormat</dfn> attribute.<br />
            For more information see <a target="FGDoc" href="https://www.treegrid.com/FDoc/TypeNumber.htm">Number format</a> and <a target="FGDoc" href="https://www.treegrid.com/FDoc/TypeDate.htm">Date format</a>.<br />
         </li>
         <li><h4>Empty value</h4><br />
            The empty cell can display string defined <dfn>EmptyString</dfn> or formatted string defined by <dfn>EmptyValue</dfn>.<br />
         </li>
         <li><h4>Multiline text - wrapping</h4><br />
            The wrapping long text can be permitted for any cell Type by setting <dfn>Wrap</dfn> attribute (bits).<br />
            To permit wrapping on CR/LF or &lt;br&gt; tag add value <b>4</b> to the <b>Wrap</b>.<br />
            <b>Wrap</b>&amp;<b>3</b> controls automatice wrapping (<b>1</b> - wraps on spaces, <b>2</b> - wraps on spaces if possible otherwise wraps words, <b>3</b> - wraps on words).<br />
            For more information see <a target="FGDoc" href="https://www.treegrid.com/FDoc/CellStyle.htm#CellWrap">Wrap attribute</a>.<br />
         </li>
         <li><h4>HTML</h4><br />
         HTML code can be placed in <b>Html type</b>, in <b>Auto type</b> if set <b>Cfg</b> <dfn>AutoHtml</dfn>, in <b>Format</b> attribute if set <b>Cfg</b> <dfn>HtmlFormat</dfn>.<br />
         Permitted <b>HTML</b> tags: 
         <b>&lt;span&gt;</b>, <b>&lt;b&gt;</b>  / <b>&lt;strong&gt;</b> (font-weight:bold), <b>&lt;i&gt;</b> / <b>&lt;em&gt;</b> (font-style:italic), 
         <b>&lt;u&gt;</b> / <b>&lt;ins&gt;</b> (text-decoration:underline), <b>&lt;s&gt;</b> / <b>&lt;strike&gt;</b> / <b>&lt;del&gt;</b> (text-decoration:line-through), 
         <b>&lt;small&gt;</b> (font-size:10px),  <b>&lt;code&gt;</b> (font-family:monospace), 
         <b>&lt;br&gt;</b>, <b>&lt;a&gt;</b>.<br />
         Permitted <b>CSS</b> attributes: <b>font-weight</b>, <b>font-style</b>, <b>font-variant</b>, <b>text-decoration</b>, <b>font-size</b>, <b>font-family</b>, <b>color</b>, <b>text-shadow</b>.<br />
         After editing all the HTML tags (except &lt;a&gt; and &lt;br&gt;) are converted to <b>&lt;span&gt;</b> tag with appropriate CSS attributes.<br />
         To use cell with HTML code to calculate column width set <b>Cfg</b> <dfn>HtmlWidth</dfn>, to control row height set <b>Cfg</b> <dfn>HtmlHeight</dfn>.<br />
         The HTML code can contain custom JavaScript events like <b>onclick</b>, to permit them set <b>Cfg</b> <dfn>HtmlEvents</dfn>.<br />
         For more information see <a target="FGDoc" href="https://www.treegrid.com/FDoc/CellType.htm#Html">Html Type</a>.<br />
         </li>
      </ul>
      
</template>
