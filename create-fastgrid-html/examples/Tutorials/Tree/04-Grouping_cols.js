FGrid.Data = {
Cfg: { id: "GroupingCols", GroupCaseSensitive:0, GroupWhiteChars:" ", GroupLocaleCompare:2, ExpandDigits:8, ExportColsType:"Collapsed",
   ColIdChars:"", ColTree:1, Sorting:2, OverScroll:2, RowChanges:0
   },
Cookie:{
   ColParts:"Sort,Group,Filter,Width,Alternate,AlternateCount,CollapseLevel",
   Rows:"Height,Hidden,Collapsed,Next,L",
   },
Head: [ 
   { D:"Header", DA:"H" },
   { id:"N", DA:"N", Type:"Number", Align:0, NoGroupBy:1, Height:40 }  
   ], 
Body: [ 
   { id:"A", Type:"Number" }, 
   { id:"B", Type:"String" }, 
   { id:"C", Type:"String", GroupChar:"/" }, 
   { id:"D", Type:"String", GroupMaxChars:"1,2,3,4" }, 
   { id:"E", DA:"E", Type:"Number", Format:"0.00", NoGroupBy:1 }  
   ], 
DefCells: {
   G: { ColorFormula:"['#F4F4F4','#ECECEC','#E4E4E4','#DCDCDC','#D4D4D4'][Col.L]||'#CCC'", },
   NG: { D:"G", Align:0, Type:"Html", LeftIcons:"CollapseCol", ValueFormula:"Grid.GetGroupRow(Col).id + (Grid.GetGroupPos(Col)!=null?(Grid.GetGroupPos(Col)+1):'') + '<br><b style=\"color:' + ['red','blue','green','purple'][Col.L%4] + '\">' + (Value+''||' ') + '</b>'" },
   EG: { D:"G", ValueFormula:"sum('E')" }
   },
DefCols: { 
   Col: { Width:60 },
   Group: { Collapsed:0, Width:70, DA:"G" } //. Default column used for all created groups 
   }, 
DefTools: {
   DragGroup: { Rel:0, MinWidth:35, Width:0 }
   },
Top: [
   { id:"Data 1", Cells:"Settings,Reload,Print,Pdf,Export,Copy,Paste" }, 
   { id:"Data 2", Cells:"Undo,Redo,ExpandCols,CollapseCols,Sort" },
   "Layout",
   { Cells: [ 
      { id:"GROUPS", Type:"Bool", Text:"Create groups", Formula:"Grid.GetCfgAttr('GroupAdd')", NoUndo:0,
         OnChange:"Grid.SetCfgAttr('GroupAdd',Value); Grid.ReGroup();", Tip:"If creates parent group columns\nIf not set, the first data column in the group becomes parent of the next columns in the group." 
         },
      ] },
   { id:"Group", D:"Group", Part:"Cols", Accept:"Row", Narrow:32, Cells:[
      { D:"Group" },
      { id:"GroupList", D:"GroupList", Width:215, MinWidth:60,
         List: { 
            "":"none", A:"<b>A</b> (numbers)", B:"<b>B</b> (strings)", C:"<b>C</b> (more group levels by separator)", D:"<b>D</b> (more group levels by length)",
            "A,B":"A+B", "B,A":"B+A", "A,B,C,D":"A+B+C+D" 
            } 
         },
      ] },
   { Cells:[{ id:"ROWS", D:"Label", Type:"Html", Formula:"'Groups: <b>'+count(null,'Cols','Row.D.id==\"Group\"',3)+'</b>'", Align:1 }], }
   ],
LeftCols: [
   { id:"id", D:"Header", Width:45, LevelsPart:"Cols" },
   ],
Cols_Cfg: { Group:"A,B", Sort:"N", GroupTree:"N" },
Cols: [ 
   { V:{ N:1, A:1, B:"One", C:"1/aaa/1", D:"AAA", E:10 } }, 
   { V:{ N:2, A:1, B:"One", C:"1/aaa/1", D:"A AA", E:5 } }, 
   { V:{ N:3, A:2, B:"one", C:"1/AAA/1", D:"aba", E:2.5 } }, 
   { V:{ N:4, A:2, B:"One", C:"1/a a a/2", D:"Abc", E:12 } }, 
   { V:{ N:5, A:1, B:"ONE", C:"1/aaa/2", D:"BBB", E:33 } }, 
   { V:{ N:6, A:1, B:"Two", C:"1/aaa", D:"BBCD", E:50 } }, 
   { id:"NoGroup", V:{ N:"NoGroup", A:1, B:"Two", C:"1/aaa", D:"BBCD", E:32 }, A:{ N: { Type:"String" } }, NoGroup:1, Color:"#FCA" }, 
   { V:{ N:7, A:2, B:"Two", C:"1/bbb/1", D:"BABB", E:75.25 } }, 
   { V:{ N:8, A:2, B:"Two", C:"1/Bbb/1", D:"ABBB", E:40 } }, 
   { V:{ N:9, A:1, B:"Three", C:"1/bbb/2", D:"CABA", E:-10 } }, 
   { V:{ N:10, A:1, B:"F\u00F4ur", C:"1/bbb/3", D:"C", E:1.1 } }, 
   { V:{ N:11, A:1, B:"F o u r", C:"1/Ccc/2", D:"ABCC", E:12 } }, 
   { V:{ N:12, A:1, B:"four", C:"1/ccc/2", D:"CAA", E:3.4 } }, 
   { V:{ N:13, A:1, B:"Five", C:"1/ccc/3", D:"CC", E:6.8 } }, 
   { V:{ N:14, A:1, B:"Six", C:"1/ddd/1/xxx", D:"ABCD", E:44 } }, 
   { V:{ N:15, A:1, B:"S\u00EDx", C:"1/ddd/1/xxx", D:"CBCA", E:23 } }, 
   { V:{ N:16, A:3, B:"Six", C:"2/aaa/1", D:"BCDA", E:34 } }, 
   { V:{ N:17, A:2, B:"Seven", C:"2/aaa/1", D:"CCCC", E:3.4 } }, 
   { V:{ N:18, A:2, B:"Seven", C:"2/aaa/2", D:"A", E:3 } }, 
   { V:{ N:19, A:4, B:"Eight", C:"2/aaa/2", D:"", E:23 } }, 
   { V:{ N:20, A:1, B:"Nine", C:"2/bbb/1", D:"AB", E:16 } }, 
   { V:{ N:21, A:2, B:"Nine", C:"2/bbb/1", D:"ABBB", E:22 } }, 
   { V:{ N:22, A:1, B:"NINE", C:"2", D:"BABC", E:86 } }, 
   { V:{ N:23, A:1, B:"Nine", C:"2", D:"ABB", E:23.3 } }, 
   { V:{ N:24, A:2, B:"NINE", C:"", D:"BAB", E:15 } }, 
   { V:{ N:25, A:1, B:"nine", C:"3/aaa/1/xxx", D:"CAA", E:26.4 } }, 
   { V:{ N:26, A:1, B:"Nine", C:"3/aaa/1", D:"CA", E:34 } }, 
   { V:{ N:27, A:3, B:"Ten", C:"3/aaa/2", D:"AC", E:50 } }, 
   { V:{ N:28, A:1, B:"TEN", C:"3/bbb/1", D:"AAA", E:32.5 } }, 
   { V:{ N:29, A:1, B:"TEN", C:"3/bbb/2", D:"ACC", E:67 } }, 
   { V:{ N:30, A:1, B:"Ten", C:"3/bbb/3", D:"BB", E:3.5 } }, 
   { V:{ N:31, A:1, B:"Ten", C:"3/bbb/3", D:"BCA", E:23 } }, 
   { V:{ N:32, A:1, B:"Ten", C:"3/bbb/3", D:"BAA", E:56 } }, 
   { V:{ N:33, A:0, B:"Zero", C:"3/bbb/3", D:"AAA", E:4.5 } }, 
   { V:{ N:34, A:0, B:"Z e r o", C:"3/ccc/1", D:"CC", E:75 } }, 
   { V:{ N:35, A:1, B:"", C:"3/ccc/1", D:"CC", E:0 } }, 
   { V:{ N:36, A:1, B:"", C:"3/ccc/2", D:"CAC", E:-3 } }  
   ], 
}