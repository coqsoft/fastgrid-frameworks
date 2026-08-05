<script>
import { FastGrid } from "fastgrid-svelte";
import "../Tutorial.css";


   const src = { //. All layout and data for grid.
      Cfg: { 
         id:"Permissions", IndexList:1, Validate:1+2+16+32, ValidateMessage:"There are errors in grid!<br>Data cannot be saved"
         }, 
      LeftCols:[
         { id:"Header", D:"Header" }, 
         ],
      Cols: [ 
         { id:"PANEL", D:"Panel", LeftIcons:"SelectRow,DeleteRow,HideRow,AddRow" },
         { id:"TEXT", Type:"String" }, 
         { id:"DATE", Type:"Date", RightIcons:"Date" }, 
         { id:"LIST", Type:"String", RightIcons:"List", List:"|One|Two|Three|Four" }, 
         { id:"MASK", Type:"String", Width:170 }, 
         { id:"MASKINFO", Type:"String", NoEdit:1, NoSort:1, NoResize:1, Wrap:5, Width:130 }, 
         { id:"RESULT", Type:"String", Width:150, NoMove:1 }, 
         { id:"RESULTINFO", Type:"String", NoEdit:1, NoSort:1, NoResize:1, NoMove:1, Wrap:5 }  
         ], 
      Head: [ 
         { D:"Header", id:"Header", 
            V: { Header:"id", TEXT:"Edit Text", DATE:"Edit Date", LIST:"Edit List", MASK:"EditMask", MASKINFO:"Description", RESULT:"ResultMask", RESULTINFO:"Description" },
            A: { PANEL: { LeftIcons:"SelectRows,DeleteRows,HideRows,AddRows" } }
            }, 
         { D:"Filter", id:"Filter" }  
         ], 
      Body: [ 
         {  id:1, 
            V: { TEXT:"Editable", DATE:"1/1/2020", LIST:"Editable", MASK:"a\u00E1bc\u00E7de\u00E9f", MASKINFO:"only lower case letters (unicode)", RESULT:"", RESULTINFO:"not empty" },
            A: { MASK : { EditMask:"^[\\p{Ll}]*$" }, RESULT: { ResultMask:".+", ResultMessage:"This cell value cannot be empty" } }
            }, 
         {  id:2, NoEdit:1, NoSelect:1, NoHide:1, 
            V: { TEXT:"Read only", DATE:"1/1/2020", LIST:"Read only", MASK:"1234", MASKINFO:"only digits, max 5 characters", RESULT:"-123.456", RESULTINFO:"decimal number" },
            A: { LIST: { RightIcons:"" }, MASK: { EditMask:"^[0-9]{0,5}$", NoEdit:0 }, RESULT: { ResultMask:"^(\\-[0-9])?[0-9]*([\\.\\,][0-9]+)?$", NoEdit:0 } }  
            }, 
         {  id:3, NoSelect:1, NoDelete:1, NoMove:1, NoDuplicate:1, NoHide:1, NoFilterRow:1, 
            V: { TEXT:"Preview", DATE:"1/1/2020", LIST:"Preview", MASK:"support@coqsoft.com", MASKINFO:"email strict characters",  RESULT:"support@coqsoft.com", RESULTINFO:"email strict validation" },
            A: { 
               TEXT: { NoEdit:4 }, DATE: { NoEdit:4 }, LIST: { NoEdit:4, RightIcons:"" },
               MASK: { EditMask:"^(?!\\.)[\\w\\.\\-]{0,64}@?(?!\\.)[\\w\\.]{0,189}$" }, 
               RESULT: { ResultMessage:"Invalid email!", ResultMask:"^(?![0-9\\-\\.\\_])[\\w\\.\\-]*[a-zA-Z0-9]@((?![0-9\\-])[a-zA-Z0-9\\-]*[a-zA-Z0-9]\\.)*(?![0-9\\-])[a-zA-Z0-9\\-]*[a-zA-Z0-9]$" }
               }
            }, 
         {  id:4, NoDelete:1, NoDuplicate:1, 
            V: { TEXT:"No focus", DATE:"1/1/2020", LIST:"No focus", MASK:"sales@coqsoft.com", MASKINFO:"email all RFC characters", RESULT:"sales@coqsoft.com", RESULTINFO:"email RFC validation" }, 
            A: { 
               TEXT: { NoFocus:1 }, DATE: { NoFocus:1 }, LIST: { NoFocus:1 },
               MASK: { EditMask:"^(?!\\.)[\\w\\.\\-\\!#\\$%&'\\*\\+\\/\\=\\?^`\\{\\|\\}~]{0,64}@?(?!\\.)[\\w\\.]{0,189}$" },
               RESULT: { ResultMessage:{ D:"ShortTime", Text:"Invalid email!" }, ResultMask:"^(?!\\.)[\\w\\.\\-\\!#\\$%&'\\*\\+\\/\\=\\?^`\\{\\|\\}~]*[\\w\\-\\!#\\$%&'\\*\\+\\/\\=\\?^`\\{\\|\\}~]@((?![0-9\\-])[a-zA-Z0-9\\-]*[a-zA-Z0-9]\\.)*(?![0-9\\-])[a-zA-Z0-9\\-]*[a-zA-Z0-9]$" }
               }
            }, 
         {  id:5, NoMove:1, Wrap:5,
            V: { TEXT:0, LIST:"Calculated", MASK:"Name: TreeGrid bugs\nEmail: bugs@coqsoft.com", MASKINFO:"Name and email\nAlt+Enter to accept", RESULT:"http://www.treegrid.com", RESULTINFO:"full URL address" },
            A: { 
               TEXT: { List:"|Editable|ReadOnly|Preview|NoFocus", RightIcons:"List", Button:"List", IndexList:1, Tip:"Changes editing permissions for the Date and List cell in this row" },
               DATE: { Type:"Auto", EmptyValue:"Calculated", NoEditFormula:"TEXT==0?0:(TEXT==2?4:1)", NoFocusFormula:"TEXT==3", Format:"d" },
               LIST: { NoEditFormula:"TEXT==0?0:(TEXT==2?4:1)", NoFocusFormula:"TEXT==3", RightIconsFormula:"TEXT==0?'List':''" }, 
               MASK: { EditMask:"^Name\\:\\s*[a-zA-Z\\.\\-\\s]*\\r?\\nEmail\\:\\s*[\\w\\.\\-]{0,64}@?(?!\\.)[\\w\\.]{0,189}$", ResultMessage:"Wrong input!",
                       ResultMask:"^Name\\:\\s*[a-zA-Z][a-zA-Z\\.\\-\\s]*\\r?\\nEmail\\:\\s*(?![0-9\\-\\.\\_])[\\w\\.\\-]*[a-zA-Z0-9]@((?![0-9\\-])[a-zA-Z0-9\\-]*[a-zA-Z0-9]\\.)*(?![0-9\\-])[a-zA-Z0-9\\-]*[a-zA-Z0-9]$", 
                  },
               RESULT: { Tip:"Full URL in format:'scheme://username:password@domain:port/path?query_string#anchor'", 
                         ResultMask:"^([a-zA-Z]+\\:\\/\\/)?([^\\:\\@]+\\:[^\\@]*@)?((?![0-9\\-])[a-zA-Z0-9\\-]*[a-zA-Z0-9]\\.)*(?![0-9\\-])[a-zA-Z0-9\\-]*[a-zA-Z0-9](\\/[^\\/\\?#]+)*(\\?[^\\?\\#]*)?(#[^\\?\\#]*)?$"
                  }
               }
            }  
         ], 
      Top: [ 
         { Cells: [
            { id:"Validate", D:"Button", Text:"Validate", Button:"Validate", OnClick:"Validate() ? Grid.ShowMessage('Everything is correct','ShortTime') : 1",
            Tip: "Validates all ResultMasks in grid, usually used before upload" }
            ] },
         { Cells:"Settings,Reload,Print,Pdf,Export,Copy,Paste,Undo,Redo,Lock,ClearSort" }, "Layout",
         { NewLine:1, Cells: [
            {  id:"EAll", D:"Switch", TextFormula:"Value?'Editing':'Read only'", Value:1, Width:65, NoUndo:0,
               OnChange: "Grid.SetCfgAttr('Editing',Value); Grid.SetCfgAttr('Pasting',Value);", 
               Tip: "Changes Editing state for the whole grid<br>Affects all cells"
               },
            {  id:"EText", Type:"Bool", Text:"Edit Text", Value:1, NoUndo:0,
               OnChange: "Grid.SetAttr(null,Grid.Cols.TEXT,'NoEdit',!Value)", 
               Tip: "Changes NoEdit for the whole column 'Edit Text'<br>Affects only cells with no NoEdit set!"
               },
            {  id:"EDate", Type: "Bool", Text: "Edit Date", Value:1, NoUndo:0, 
               OnChange: "Grid.SetAttr(null,Grid.Cols.DATE,'NoEdit',!Value)", 
               Tip: "Changes NoEdit for the whole column 'Edit Date'<br>Affects only cells with no NoEdit set!"
               },
            {  id:"EList", Type: "Bool", Text: "Edit List", Value:1, NoUndo:0, 
               OnChange: "Grid.SetAttr(null,Grid.Cols.LIST,'NoEdit',!Value)", 
               Tip: "Changes NoEdit for the whole column 'Edit List'<br>Affects only cells with no NoEdit set!" 
               } 
            ] },
         { Cells: [
            {  id:"Rows", D:"Switch", TextFormula:"Value?'Changing rows':'Static rows'", Value:1, Width:100, NoUndo:0, 
               OnChange: "Grid.SetCfgAttr('AddingRows',Value?3:0); Grid.SetCfgAttr('DeletingRows',Value); Grid.SetCfgAttr('DraggingRows',Value); Grid.SetCfgAttr('PasteAddRows',Value?2:0); Grid.SetCfgAttr('ResizingRows',Value); Grid.Hide(Grid.Cols.PANEL,!Value);",
               Tip: "Switches on/off row adding, deleting, moving, resizing and pasting", 
               }, 
            { id:"Cols", D:"Switch", TextFormula: "Value?'Changing columns':'Static columns'", Value:1, Width:125, NoUndo:0, 
               OnChange: "Grid.SetCfgAttr('DraggingCols',Value); Grid.SetCfgAttr('ResizingCols',Value);", 
               Tip:"Switches on/off column resizing and moving"
               },
            { id:"Sorting", D:"Switch", TextFormula:"Value?'Sorting':'No sort'", Value:1, Width:50, NoUndo:0, 
               OnChange: "if(!Value) Grid.ActionClearSort(); Grid.SetCfgAttr('Sorting',Value ? 1 : 0);", 
               Tip: "Switches on/off rows sorting"
               },
            { id:"Filter", D:"Switch", TextFormula:"Value?'Filtering':'No filter'", Value:1, Width:55, NoUndo:0, 
               OnChange: "Grid.SetFilterAction(Value); Grid.Hide(Grid.Rows.Filter,!Value);",
               Tip: "Switches on/off rows filtering"
               }  
            ] } 
         ]
   };
</script>

<h1>9. Permissions and input validation</h1>
      <h5>Editing and other permissions and validation during editing, before save and before upload</h5>
      <section>
         <FastGrid src={src} style="max-width:100%;"/>
      </section>

      
      <ul>
         <li>
            Every feature in FastGrid can be enabled or disabled. For whole grid or for row / column / cell or by <dfn>Lock</dfn>.<br />
         </li>
         <li>
         <h4>Permissions</h4><br />
         <table>
            <tbody>
            <tr><th style="width:185px;">Feature</th><th>Cfg attribute</th><th style="width:210px;">Row / column / cell attribute</th><th>Lock name</th><th>Remarks</th></tr>
            <tr><td>Edit cell value</td><td><dfn>Editing</dfn></td><td>cell / tool <dfn>NoEdit</dfn></td><td colspan="2"><b>Edit</b>, <b>Write</b>, <b>EditAll</b>, <b>NoEdit</b>, <b>Controls</b></td><td></td></tr>
            <tr><td>Edit cell formula</td><td><dfn>FormulaEditing</dfn></td><td>cell / tool <dfn>FormulaNoEdit</dfn></td><td colspan="2"><b>Formula</b>, <b>EditAll</b>, <b>NoEdit</b></td><td></td></tr>
            <tr><td>Edit cell style</td><td><dfn>EditingStyle</dfn></td><td>cell / tool <dfn>NoEditStyle</dfn></td><td colspan="2"><b>Style</b>, <b>StyleAll</b>, <b>NoEdit</b></td><td></td></tr>
            <tr><td>Edit cell link</td><td><dfn>EditingLink</dfn></td><td>cell / tool <dfn>NoEditLink</dfn></td><td colspan="2"><b>EditLink</b>, <b>WriteLink</b>, <b>EditAll</b>, <b>NoEdit</b></td><td></td></tr>
            <tr><td>Edit cell tip</td><td></td><td></td><td><b>EditTip</b></td><td></td></tr>
            <tr><td>Focus cell(s)</td><td><dfn>Focus</dfn></td><td>cell / tool <dfn>NoFocus</dfn></td><td><b>Focus</b></td><td></td></tr>
            <tr><td>Mouse hover cell</td><td><dfn>Hover</dfn></td><td>cell / tool <dfn>NoHover</dfn></td><td><b>Hover</b></td><td></td></tr>
            <tr><td>Navigate to cell link</td><td></td><td></td><td><b>Link</b></td><td></td></tr>
            <tr><td>Show tip for cell under mouse</td><td></td><td></td><td><b>Tip</b></td><td></td></tr>
            <tr><td>Change mouse cursor for cell</td><td></td><td></td><td><b>Cursor</b></td><td></td></tr>

            <tr><td>Resizing row height</td><td><dfn>ResizingRows</dfn></td><td>row <dfn>NoResize</dfn></td><td><b>ResizeRow</b></td><td>The resizing by dragging edge is permitted by column attribute <dfn>UseResize</dfn></td></tr>
            <tr><td>Resizing column width</td><td><dfn>ResizingCols</dfn></td><td>col<dfn>NoResize</dfn></td><td><b>ResizeCol</b></td><td>The resizing by dragging edge is permitted by row attribute <dfn>UseResize</dfn></td></tr>
            <tr><td>Resizing part height</td><td><dfn>ResizingRowParts</dfn></td><td>part <dfn>NoResize</dfn></td><td><b>ResizeRowPart</b></td><td></td></tr>
            <tr><td>Resizing part width</td><td><dfn>ResizingColParts</dfn></td><td>part <dfn>NoResize</dfn></td><td><b>ResizeColPart</b></td><td></td></tr>
            <tr><td>Adding / copying rows</td><td><dfn>AddingRows</dfn></td><td>row <dfn>NoDuplicate</dfn></td><td><b>AddRow</b></td><td></td></tr>
            <tr><td>Adding / copying columns</td><td><dfn>AddingCols</dfn></td><td>col <dfn>NoDuplicate</dfn></td><td><b>AddCol</b></td><td></td></tr>
            <tr><td>Moving / copying rows</td><td><dfn>DraggingRows</dfn></td><td>row <dfn>NoMove</dfn>, <dfn>NoDuplicate</dfn></td><td><b>MoveRow</b>, <b>IndentRow</b>, <b>FixRow</b></td><td>The moving by dragging the cell is permitted by cell attribute <dfn>UseMove</dfn></td></tr>
            <tr><td>Moving / copying columns</td><td><dfn>DraggingCols</dfn></td><td>col <dfn>NoMove</dfn>, <dfn>NoDuplicate</dfn></td><td><b>MoveCol</b>, <b>IndentCol</b>, <b>FixCol</b></td><td>The moving by dragging the cell is permitted by cell attribute <dfn>UseMove</dfn></td></tr>
            <tr><td>Deleting rows</td><td><dfn>DeletingRows</dfn></td><td>row <dfn>NoDelete</dfn></td><td><b>DeleteRow</b></td><td></td></tr>
            <tr><td>Deleting columns</td><td><dfn>DeletingCols</dfn></td><td>col <dfn>NoDelete</dfn></td><td><b>DeleteCol</b></td><td></td></tr>
            <tr><td>Hiding / showing rows</td><td><dfn>HidingRows</dfn></td><td>row <dfn>NoHide</dfn></td><td><b>HideRow</b></td><td></td></tr>
            <tr><td>Hiding / showing columns</td><td><dfn>HidingCols</dfn></td><td>col <dfn>NoHide</dfn></td><td><b>HideCol</b></td><td></td></tr>
            <tr><td>Selecting rows</td><td><dfn>SelectingRows</dfn></td><td>row <dfn>NoSelect</dfn></td><td><b>SelectRow</b></td><td></td></tr>
            <tr><td>Selecting columns</td><td><dfn>SelectingCols</dfn></td><td>col <dfn>NoSelect</dfn></td><td><b>SelectCol</b></td><td></td></tr>
            <tr><td>Expanding / collapsing rows</td><td><dfn>RowTree</dfn></td><td>row <dfn>NoCollapse</dfn></td><td><b>CollapseRow</b></td><td>Row tree must be defined by row / part <dfn>Tree</dfn> attribute.</td></tr>
            <tr><td>Expanding / collapsing columns</td><td><dfn>ColTree</dfn></td><td>col <dfn>NoCollapse</dfn></td><td><b>CollapseCol</b></td><td></td></tr>
            <tr><td>Spanning / splitting cells</td><td></td><td></td><td><b>Span</b></td><td></td></tr>

            <tr><td>Copy to clipboard</td><td><dfn>Copying</dfn></td><td>row / col <dfn>NoCopy</dfn></td><td><b>Copy</b></td><td></td></tr>
            <tr><td>Pasting from clipboard</td><td><dfn>Pasting</dfn></td><td>row / col <dfn>NoPaste</dfn></td><td><b>Paste</b></td><td></td></tr>
            <tr><td>Exporting to xlsx/csv/html</td><td><dfn>Exporting</dfn></td><td>row / col <dfn>NoExport</dfn></td><td><b>Export</b></td><td>If exporting more grids, the one grid export can be restricted by Cfg <dfn>NoExport</dfn></td></tr>
            <tr><td>Printing</td><td><dfn>Printing</dfn></td><td>row / col <dfn>NoPrint</dfn></td><td><b>Print</b>, <b>Pdf</b></td><td>If printing more grids, the one grid print can be restricted by Cfg <dfn>NoPrint</dfn></td></tr>
            <tr><td>Undo / redo changes</td><td><dfn>Undo</dfn></td><td>row / col <dfn>NoUndo</dfn></td><td><b>Undo</b></td><td></td></tr>

            <tr><td>Sorting rows / columns</td><td><dfn>Sorting</dfn></td><td>row / col <dfn>NoSort</dfn> (children)</td><td><b>Sort</b></td><td>To restricts sorting rows by values in the column set the column attribute <dfn>NoSortBy</dfn></td></tr>
            <tr><td>Filtering rows / columns</td><td><dfn>FilterAction</dfn></td><td>row / col <dfn>NoFilter</dfn></td><td><b>Filter</b></td><td>To restricts filtering row / column by the cell value, set cell attribute <dfn>NoFilterRow</dfn> / <dfn>NoFilterCol</dfn></td></tr>
            <tr><td>Grouping rows / columns</td><td><dfn>Grouped</dfn></td><td>row / col <dfn>NoGroup</dfn></td><td><b>Group</b></td><td>To restricts grouping by the column / row set the row / column attribute <dfn>NoGroupBy</dfn></td></tr>
            <tr><td>Pivot</td><td><dfn>PivotDisabled</dfn></td><td>row / col <dfn>NoPivot</dfn></td><td><b>Pivot</b></td><td></td></tr>
            <tr><td>Searching in cell values</td><td><dfn>SearchAction</dfn></td><td>row / col / cell <dfn>NoSearch</dfn></td><td><b>Search</b></td><td></td></tr>
            <tr><td>Import files</td><td><dfn>ImportAction</dfn></td><td></td><td><b>Import</b></td><td>Drop file to grid must be permitted by <dfn>DropFiles</dfn></td></tr>
            <tr><td>Sending changes to server</td><td></td><td></td><td><b>Save</b></td><td>If saving more grids, the one grid save can be restricted by Cfg <dfn>NoSave</dfn></td></tr>
            <tr><td>Reload data from server</td><td></td><td></td><td><b>Reload</b></td><td></td></tr>
            <tr><td>Changing grid settings</td><td></td><td></td><td><b>Settings</b></td><td></td></tr>
            <tr><td>Restrict managing saved settings</td><td></td><td></td><td><b>Cookie</b>, <b>AddCokie</b>, <b>DeleteCookie</b></td><td></td></tr>

            <tr><td>Moving toolbar cells</td><td><dfn>DraggingTools</dfn></td><td>tool <dfn>NoMove</dfn>, <dfn>NoDuplicate</dfn>, <dfn>NoDelete</dfn></td><td><b>Toolbar</b></td><td></td></tr>
            <tr><td>Moving toolbars</td><td><dfn>DraggingToolbars</dfn></td><td></td><td><b>Toolbar</b></td><td>Dragging individual toolbar is not possible to restrict, only setting its <dfn>Pos</dfn> &gt;= <b>3</b> will drag it with its predecessor.</td></tr>
            <tr><td>Hiding / showing toolbars</td><td><dfn>HidingToolbars</dfn></td><td>toolbar <dfn>NoHide</dfn></td><td><b>Toolbar</b></td><td></td></tr>
            <tr><td>Hiding / showing toolbar cells</td><td><dfn>HidingTools</dfn></td><td>tool <dfn>NoHide</dfn></td><td><b>Toolbar</b></td><td></td></tr>
            <tr><td>Resizing toolbar height</td><td></td><td></td><td><b>ResizeToolbar</b></td><td>The resizing by dragging edge is permitted by toolbar cell attribute <dfn>UseResize</dfn></td></tr>
            <tr><td>Resizing toolbar cell width</td><td></td><td></td><td><b>ResizeTool</b></td><td>The resizing by dragging edge is permitted by toolbar cell attribute <dfn>UseResize</dfn></td></tr>

            <tr><td>Adding / copying images</td><td><dfn>AddingImages</dfn> </td><td>image <dfn>NoDuplicate</dfn></td><td><b>AddImage</b></td><td>Drop image to grid must be permitted by <dfn>DropFiles</dfn></td></tr>
            <tr><td>Deleting images</td><td><dfn>DeletingImages</dfn></td><td>image <dfn>NoDelete</dfn></td><td><b>DeleteImage</b></td><td></td></tr>
            <tr><td>Dragging images</td><td><dfn>DraggingImages</dfn></td><td>image <dfn>NoMove</dfn></td><td><b>MoveImage</b></td><td></td></tr>
            <tr><td>Changing images</td><td><dfn>ChangingImages</dfn></td><td>image <dfn>NoChange</dfn></td><td><b>ChangeImage</b></td><td></td></tr>

            <tr><td>Sheets manipulation</td><td><dfn>ChangingSheets</dfn></td><td></td><td colspan="2"><b>AddSheet</b>, <b>DeleteSheet</b>, <b>HideSheet</b>, <b>RenameSheet</b>, <b>MoveSheet</b></td><td></td></tr>
            <tr><td>Defining and editing names</td><td></td><td></td><td><b>Name</b></td><td></td></tr>
            </tbody>
         </table>
         </li>
      </ul>
