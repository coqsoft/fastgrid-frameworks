FGrid.Data = { 
Cfg : { id: "Basic", OverScroll:2 }, 

//. --- Columns ---
LeftCols : [ 
   { id:"PANEL", D:"Panel", LeftIcons:"SelectRow,DeleteRow,AddRow" },
   { id:"LEFT1", Width: 150 }  
   ], 
Cols : [ 
   { id:"DATA1", Width:120 }, 
   { id:"DATA2", Width:120 }  
   ], 
RightCols : [ 
   { id:"RIGHT1" }
   ], 

//. --- Rows ---
Head: [ 
   { D:"Header", V: { LEFT1: "Left column 1", DATA1: "Data column 1", DATA2: "Data column 2", RIGHT1: "Right column 1" }, A: { PANEL: { LeftIcons:"SelectRows,DeleteRows,AddRows" } } },
   { V: { LEFT1: "Fixed head row 1", DATA1:1, DATA2:2, RIGHT1:3 } },
   { D:"Filter", V: { PANEL:"Filter row" }, A: { PANEL: { D:"FilterAction" } } }
   ], 
Body: [ 
   { V: ["Body row 1", 4, 5, 6 ] }, 
   { V: ["Body row 2", 7, 8, 9 ] }, 
   { V: ["Body row 3", 10, 11, 12 ], L:1 }, 
   { V: ["Body row 4", 13, 14, 15 ], L:1 }, 
   { V: ["Body row 5", 16, 17, 18 ] }, 
   { V: ["Body row 6", 19, 20, 21 ], L:1 }, 
   { V: ["Body row 7", 22, 23, 24 ] },  
   { V: ["Body row 8", 25, 26, 27 ] }  
   ], 
Body_Cfg: { Tree:"LEFT1" },
Foot: [ 
   { V: { LEFT1: "Fixed foot row 1", DATA1: 28, DATA2: 29, RIGHT1: 30 } }  
   ], 
Top: ["Data1","Settings","Data2"]
}