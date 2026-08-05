FGrid.Data = {
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
      ],
   }