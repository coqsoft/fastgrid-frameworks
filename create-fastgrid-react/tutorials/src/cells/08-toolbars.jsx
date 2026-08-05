import React, { useMemo, useRef } from "react";
import { FastGrid } from "fastgrid-react";
import "../Tutorial.css";

export default function App() {

   const src = useMemo(() => ({ //. All layout and data for grid. Memo is used for simple object created inside the App function to avoid re-creating grid on every React App render
      Cfg: { 
         id: "Toolbars", PrintToolbars:""
         },
      RowParts:[ 
         { Clear:1 }, 
         { id:"Toolbars1", Type:"Toolbars" },
         { id:"Toolbars2", Type:"Toolbars" },
         ],
      ColParts:[ { Clear:1 } ],
      DefTools: {
         Cell: { UseResize:3 }
         },
      Toolbars1: [ 
         { id:"Data", Cells:"Settings,Reload,Print,Pdf,Export,Copy,Undo,Redo", Pos:1, NoPrint:1 }, 
         { id:"Layout", D:"Layout", Pos:1, NoPrint:1 },
         { id:"T1", Cells:[{ id:"C1", D:"EditSmall", Value:"1. NewLine:1", Width:100 } ], Pos:1, NewLine:1 },
         { id:"T2", Cells:[{ id:"C2", D:"EditSmall", Value:"2. Pos:5", Width:60 } ], Pos:5 },
         { id:"T3", Cells:[{ id:"C3", D:"EditSmall", Value:"3. Pos:3", Width:80 } ], Pos:3 },
         { id:"T4", Cells:[{ id:"C4", D:"EditSmall", Value:"4. Pos:5", Width:60 } ], Pos:5 },
         { id:"T5", Cells:[{ id:"C5", D:"EditSmall", Value:"5. Pos:3" } ], Pos:3 },
         { id:"T6", Cells:[{ id:"C6", D:"EditSmall", Value:"6. Pos:2", Width:60 } ], Pos:2 },
         { id:"T7", Cells:[{ id:"C7", D:"EditSmall", Value:"7. Pos:2", Width:60 } ], Pos:2 },
         { id:"T8", Cells:[{ id:"C8", D:"EditSmall", Value:"8. Pos:4", Width:80 } ], Pos:4 },
         { id:"T9", Cells:[{ id:"C9", D:"EditSmall", Value:"9. Pos:5", Width:70 } ], Pos:5 },
         { id:"TSep", Height:88, Cells:"Separator", Pos:1 },
         { id:"T10", Cells:[{ id:"C10", D:"EditSmall", Value:"10. Pos:1", Width:70 } ], Pos:1 },
         { id:"T11", Cells:[{ id:"C11", D:"EditSmall", Value:"11. Pos:1", Width:100 } ], Pos:1 },
         { id:"T12", Cells:[{ id:"C12", D:"EditSmall", Value:"12. Pos:5", Width:60 } ], Pos:5 },
         { id:"T13", Cells:[{ id:"C13", D:"EditSmall", Value:"13. Pos:3", Width:90 } ], Pos:3 },
         { id:"T14", Cells:[{ id:"C14", D:"EditSmall", Value:"14. Pos:4", Width:60 } ], Pos:4 },
         { id:"T15", Cells:[{ id:"C15", D:"EditSmall", Value:"15. Pos:3", Width:60 } ], Pos:3 },
         { id:"T16", Cells:[{ id:"C16", D:"EditSmall", Value:"16. Pos:3", Width:70 } ], Pos:3 },
         { id:"T17", Cells:[{ id:"C17", D:"EditSmall", Value:"17. Pos:1", Width:70 } ], Pos:1 },
         { id:"T18", Cells:[{ id:"C18", D:"EditSmall", Value:"18. Pos:3", Width:60 } ], Pos:3 },
         { id:"T19", Cells:[{ id:"C19", D:"EditSmall", Value:"19. Pos:4", Width:60 } ], Pos:4 },
         { id:"T20", Cells:[{ id:"C20", D:"EditSmall", Value:"20. Pos:3", Width:70 } ], Pos:3 },
         { id:"T21", Cells:[{ id:"C21", D:"EditSmall", Value:"21. Pos:6", Width:80 } ], Pos:6 },
         ],
      Toolbars2: [ 
         { id:"N1", Height:56, Cells:[{ id:"E1", D:"EditSmall", Value:"1. Pos:1", Width:100 } ], Pos:1 },
         { id:"N2", Height:60, Cells:[{ id:"E2", D:"EditSmall", Value:"2. Pos:5", Width:60 } ], Pos:5 },
         { id:"N3", Cells:[{ id:"E3", D:"EditSmall", Value:"3. Pos:3", Width:80 } ], Pos:3 },
         { id:"N4", Cells:[{ id:"E4", D:"EditSmall", Value:"4. Pos:5", Width:60 } ], Pos:5 },
         { id:"N5", Cells:[{ id:"E5", D:"EditSmall", Value:"5. Pos:3" } ], Pos:3 },
         { id:"N6", Cells:[{ id:"E6", D:"EditSmall", Value:"6. Pos:2", Width:60 } ], Pos:2 },
         { id:"N7", Cells:[{ id:"E7", D:"EditSmall", Value:"7. Pos:2", Width:60 } ], Pos:2 },
         { id:"N8", Height:56, Cells:[{ id:"E8", D:"EditSmall", Value:"8. Pos:4", Width:80 } ], Pos:4 },
         { id:"N9", Cells:[{ id:"E9", D:"EditSmall", Value:"9. Pos:5", Width:70 } ], Pos:5 },
         { id:"N10", Height:116, Cells:[{ id:"E10", D:"EditSmall", Value:"10. Pos:1", Width:70 } ], Pos:1 },
         { id:"N11", Cells:[{ id:"E11", D:"EditSmall", Value:"11. Pos:1", Width:100 } ], Pos:1 },
         { id:"N12", Height:56, Cells:[{ id:"E12", D:"EditSmall", Value:"12. Pos:5", Width:60 } ], Pos:5 },
         { id:"N13", Height:38, Cells:[{ id:"E13", D:"EditSmall", Value:"13. Pos:3", Width:90 } ], Pos:3 },
         { id:"N14", Cells:[{ id:"E14", D:"EditSmall", Value:"14. Pos:4", Width:60 } ], Pos:4 },
         { id:"N15", Height:48, Cells:[{ id:"E15", D:"EditSmall", Value:"15. Pos:3", Width:60 } ], Pos:3 },
         { id:"N16", Cells:[{ id:"E16", D:"EditSmall", Value:"16. Pos:3", Width:70 } ], Pos:3 },
         { id:"N17", Cells:[{ id:"E17", D:"EditSmall", Value:"17. Pos:1", Width:70 } ], Pos:1 },
         { id:"N18", Cells:[{ id:"E18", D:"EditSmall", Value:"18. Pos:3", Width:60 } ], Pos:3 },
         { id:"N19", Cells:[{ id:"E19", D:"EditSmall", Value:"19. Pos:4", Width:60 } ], Pos:4 },
         { id:"N20", Height:56, Cells:[{ id:"E20", D:"EditSmall", Value:"20. Pos:3", Width:70 } ], Pos:3 },
         { id:"N21", Cells:[{ id:"E21", D:"EditSmall", Value:"21. Pos:6", Width:80 } ], Pos:6 },
         ]
   }), []);

   return (<>
      <h1>8. Toolbar size and position</h1>
      <h5>Toolbars positions, wrapping and manual updating</h5>
      <section>
         <FastGrid src={src} style={{minWidth:"100%"}}/>
      </section>

      {/*. Description */}
      <ul>
         <li><b style={{color:"red"}}>All the textboxes are individual toolbars with only one cell, just for demonstration of toolbar positioning.</b></li>
         <li>
            Toolbars are placed in row parts of type "Toolbars". The "Toolbars" part is always as wide as the grid width, but the part does not resize grid according to its content.<br />
            Toolbars can contain the same cells as table rows, but the cells are not aligned in columns and every the cell can have its width.<br />
         </li>
         <li>
            By default the toolbars in their part are placed <b>horizontally</b> on the same line, one by one. 
            After the toolbars reach the line end, they are wrapped to the next line, except if set the part attribute <dfn>NoWrap</dfn>.<br />
            The toolbar can be wrapped also manually, before or after, by setting its attribute <dfn>NewLine</dfn>.<br />
         </li>
         <li>The toolbars can be placced also <b>vertically</b> on more <b>levels</b> in one toolbars line.<br />
         It is controlled by toolbar <dfn>Pos</dfn> attribute. It places the toolbar relative to the previous toolbar(s).<br />
         The toolbar can be placed below the previous toolbar, on the same level, back on the first level, etc.<br />
         </li>
         <li>
         It is possible to let users to reorder the toolbar, to hide or show the toolbars or individual cells by setting Cfg attribute <dfn>DraggingToolbars</dfn>.<br />
         This mode can be turned on / off by toolbar icon <b>UpdateToolbars</b>. If used, this icon and its parent toolbar <b>Layout</b> cannot be hidden by users.<br />
         </li>
         <li>
         Every toolbar cell can have set its with by <dfn>Width</dfn> cell attribute. For <b>Width</b> = <b>0</b> the cell width is calculated according to its content.<br />
         Default width for textual cells is <b>100</b>, for icons is <b>0</b>.<br />
         The cell width can be resized by mouse dragging, if it has set attribute <dfn>UseResize</dfn>, bit <b>2</b>.<br />
         </li>
         <li>
         Every toolbar can have set its height by <dfn>Height</dfn> toolbar attribute.<br />
         If not set the <b>Height</b> attribute, it is used Cfg attribute <dfn>ToolbarHeight</dfn>, default is <b>30</b>.<br />
         The toolbar height can be resized by mouse dragging its particular cell(s), if the cell has set attribute <dfn>UseResize</dfn>, bit <b>1</b>.<br />
         </li>
      </ul>
      </>);
}