FGrid.Data = { 
   Events: { 
      OnGetValue: function(G,row,col) { if(row.id==14&&col.id!="A"||col.id=="T6") return "API"+col.id; }
      },
   Cfg : { id: "Values", HideVScroll:1, PrintToolbars:"-,Testbar" }, 
   DefTools: { Edit: { Width:50 }, EditV: { D:"Edit", Value:"D cell" } }, 
   DefCols: { Col: { Width:40, Value:"..." } },
   DefCells: { 
      C1: { Value:"D cell Value" },
      C2: { Value:"DC" } 
      },
   Cols: [
      { id:"A", UCode:3, Texts:["U string","U string + V"], Width:100 },
      { id:"B", UCode:1 },
      { id:"C", UCode:1 },
      { id:"D", UCode:1 },
      { id:"E", UCode:1 },
      { id:"F", V:"||F1|F2|F3|F4|F5|F6|F7|F8|F9|F10|F11|F12|F13|F14" },
      { id:"G", V:[,"G1","G2","G3","G4","G5","G6","G7","G8","G9","G10","G11","G12","G13","G14"]},
      { id:"H", V:{ 1:"H1", 2:"H2", 3: "H3", 4:"H4", 5:"H5", 6:"H6", 7:"H7", 8:"H8", 9:"H9", 10:"H10", 11:"H11", 12:"H12", 13:"H13", 14:"H14" } },
      { id:"I", Value:"col" },
      { id:"J", F:{ 1:"'FR.'+Row.id", 3:"'FC.'+Row.id", 9:"'FC.'+Row.id" } },
      { id:"K", E:{ 1:'"EC."&row()', 3:'"EC."&row()', 9:'"EC."&row()' } },
      { id:"L", Formula:"'FC.'+Row.id", Width:48 }
      ], 
   Head: [ "Header" ],
   Body: [
      { id:1, V: "|V String|1|2|3|4" },
      { id:2, V: [ "V Array",1,2,3,4 ] },
      { id:3, V: { A:"V Object",B:1,C:2,D:3,E:4 } },
      { id:4, U: "$%&'(" }, 
      { id:5, U: "%%&'(", V:{B:"\u0001",D:"V", G:"V"} },
      { id:6, Value:"row", V: { A:"row Value", D:"V", G:"V" } },
      { id:7, A: { A: { Value:"cell Value" }, D: { Value:"C_D" }, G: { Value:"C_G" }, I: { Value:"C_I" } } },
      { id:8, A: { A: "C1", D: "C2", G: "C2", I: "C2" } },
      { id:9, F: { A: "'F Formula'", D:"'F.'+Col.id", G:"'F.'+Col.id", I:"'F.'+Col.id" } },
      { id:10, E: { A: '"E Formula"', D:'"F."&column()', G:'"F."&column()', I:'"F."&column()' } },
      { id:11, Formula:"Col.id=='A'?'row Formula':'FR.'+Col.id" },
      { id:12, A: { A: { ValueFormula:"'ValueFormula'" }, D: { ValueFormula:"'VF.'+Col.id" }, G: { ValueFormula:"'VF.'+Col.id" }, I: { ValueFormula:"'VF.'+Col.id" } } },
      { id:13, V: { A: "cell Mirror 1" }, A: { D: { Mirror:1, MirrorRow:1 }, G: { Mirror:1, MirrorRow:1 }, I: { Mirror:1, MirrorRow:1 }, J: { Mirror:1, MirrorRow:"Testbar", MirrorCol:"T1" } } },
      { id:14, V: { A: "OnGetValue" } }
      ],
   Top:[
      { id:"Data", Cells:"Settings,Reload,Print,Pdf,Export,Copy,Undo,Redo,ClearSort" }, "Layout",
      { id:"Testbar", Value:"row", NewLine:1, Narrow:32, NoUndo:0, Cells: [
         "Edit", 
         { D:"Edit", id:"T1", Value:"cell" }, 
         { D:"EditV" }, 
         { D:"Edit", id:"T3", Formula:"'formula '+Col.id", Width:80 }, 
         { D:"Edit", Mirror:1, MirrorCol:"T1" }, 
         { D:"Edit", Mirror:1, MirrorRow:13, MirrorCol:"A", Width:80 },
         { D:"Edit", id:"T6" }
         ] }
      ]
}