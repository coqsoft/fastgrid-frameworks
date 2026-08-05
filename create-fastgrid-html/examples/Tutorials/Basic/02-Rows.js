FGrid.Data = {
Cfg: { id: "Rows", ColTree:1, EditingStyle:1, OverScroll:1 }, 
Cols: [ 
   { id: "DATA1", Width: 340 }, 
   { id: "DATA2", Width: 340, L:1 }  
   ], 
RowParts: [
   { Clear:1 },
   { id:"T1", Type:"Toolbars" },
   { id:"Tree", Type:"Tree", Add:1 }, //. Column tree
   { id:"S1", Type:"Scroll" },
   { id:"R1", Type:"Rows" },
   { id:"T2", Type:"Toolbars" },
   { id:"S2", Type:"Scroll" },
   { id:"R2", Type:"Rows" },
   { id:"T3", Type:"Toolbars" },
   { id:"R3", Type:"Rows", Rel:1 },
   { id:"S3", Type:"Scroll" },
   { id:"T4", Type:"Toolbars" },
   { id:"R4", Type:"Rows", Rel:1 },
   { id:"T5", Type:"Toolbars" },
   { id:"R5", Type:"Rows" },
   ],
R1: [ 
   { D:"Filter", V: [ "R1 filter row 1" ] }, 
   { D:"Filter", V: [ "R1 filter row 2" ] },
   { D:"Header", V: [ "R1 header row 1" ] }, 
   ],
R2: [
   { D:"Index", V: [ "R2 index row 1" ] }, 
   { V: [ "R2 data row 1" ] }, 
   ], 
R3 : [ 
   { V: [ "R3 data row 1, L0" ] }, 
   { V: [ "R3 data row 2, L0" ] },
   { V: [ "R3 data row 3, L1" ], L:1 },
   { V: [ "R3 data row 4, L0" ] },
   { V: [ "R3 data row 5, L1" ], L:1 },
   { V: [ "R3 data row 6, L2" ], L:2 },
   { V: [ "R3 data row 7, L2" ], L:2 },
   { V: [ "R3 data row 8, L0" ] },
   ], 
R4 : [ 
   { V: [ "R4 data row 1, L0" ] }, 
   { V: [ "R4 data row 2, L0" ], L:1 },
   { V: [ "R4 data row 3, L1" ], L:2 },
   { V: [ "R4 data row 4, L0" ], L:3 },
   { V: [ "R4 data row 5, L1" ], L:1 },
   { V: [ "R4 data row 6, L2" ], L:2 },
   ], 
R5: [ { D:"Header", V: [ "R5 header row 1" ] } ],
R3_Cfg: { Tree:"DATA1" },
R4_Cfg: { Tree:"DATA1" },

T1: [ "Data1","Settings" ],
T2: [ "Data2","Layout" ],
T3: [ "Data3" ],
T4: [ "Text1","Text3" ],
T5: [ "Search" ]
}