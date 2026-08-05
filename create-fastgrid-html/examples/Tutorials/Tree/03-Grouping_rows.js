FGrid.Data = {
Cfg: { id: "GroupingRows", GroupCaseSensitive:0, GroupWhiteChars:" ", GroupLocaleCompare:2, ExpandDigits:8, ExportRowsType:"Collapsed",
   RowTree:2,//. For GroupTrees only
   }, 
DefCols: {
   Col: { Width:125 }
   },
LeftCols: [ 
   { id:"N", Type:"Number", GroupWidth:-1, Width:100, Align:0, NoGroupBy:1 }  
   ], 
Cols: [ 
   { id:"A", Type:"Number" }, 
   { id:"B", Type:"String" }, 
   { id:"C", Type:"String", GroupChar:"/" }, 
   { id:"D", Type:"String", GroupMaxChars:"1,2,3,4" }, 
   { id:"E", Type:"Number", Format:"0.00", NoGroupBy:1 }  
   ], 
DefRows: { 
   Group: { //. Default row used for all created groups 
      Collapsed:0, Color:"#F4F4F4",
      F: { E: "sum()", N:"Grid.Parts.Body.GroupTrees ? Value : Grid.GetGroupCol(Row).id + (Grid.GetGroupPos(Row)!=null?(Grid.GetGroupPos(Row)+1):'') + ' - <b style=\"color:' + ['red','blue','green','purple'][Row.L%4] + '\">' + Value + '</b>'" },
      //CS: { A:4 }, //. Spanning not used to simply permit switching GroupTrees on / off
      A: { A: { Type:"String" }, N: { Type:"Html" } }
      }   
   }, 
DefTools: {
   DragGroup: { Rel:0, MinWidth:35, Width:0 }
   },
Top: [
   { id:"Data 1", Cells:"Settings,Reload,Print,Pdf,Export,Copy,Paste"}, 
   { id:"Data 2", Cells:"Undo,Redo,ExpandRows,CollapseRows,Sort" }, 
   "Layout",
   { Cells: [ 
      { id:"GROUPS", Type:"Bool", Text:"Create groups", Formula:"Grid.GetCfgAttr('GroupAdd')", NoUndo:0,
         OnChange:"Grid.SetCfgAttr('GroupAdd',Value); Grid.ReGroup();", Tip:"If creates parent group rows\nIf not set, the first data row in the group becomes parent of the next rows in the group." 
         },
      { id:"TREES", Type:"Bool", Text:"Independent trees", Formula:"Grid.GetPartAttr('Body','GroupTrees')", NoUndo:0,
         OnChange:"Grid.SetPartAttr('Body','GroupTrees',Value); Grid.ReGroup();", Tip:"Shows tree in every grouped column instead of one tree in the id column" 
         },
      ] },
   { id:"Group", D:"Group", Narrow:32, Cells:[
      { D:"Group" },
      { id:"GroupList", D:"GroupList", Width:215, MinWidth:60,
         List: { 
            "":"none", A:"<b>A</b> (numbers)", B:"<b>B</b> (strings)", C:"<b>C</b> (more group levels by separator)", D:"<b>D</b> (more group levels by length)",
            "A,B":"A+B", "B,A":"B+A", "A,B,C,D":"A+B+C+D" 
            } 
         },
      ] },
   { Cells:[{ id:"ROWS", D:"Label", Type:"Html", Formula:"'Groups: <b>'+count(null,'Body','Row.D.id==\"Group\"',3)+'</b>'", Align:1 }], }
   ],
Media: {
   Mobile: { 
      Cols: [{ id:"A", Width:70 }, { id:"B", Width:70 }, { id:"C", Width:90 }, { id:"D", Width:70 }, { id:"E", Width:70 }],
      }
   },
Head: [
   { D:"Header", LevelsPart:"Body", F: { N:"Grid.GetGroup()&&!Grid.Parts.Body.GroupTrees&&Grid.GroupAdd ? 'id (grouped)' : 'id'" } },
   ],
Body_Cfg: { Group:"A,B", Sort:"N", GroupTree:"N" },
Body: [ 
   { V:{ N:1, A:1, B:"One", C:"1/aaa/1", D:"AAA", E:10 } }, 
   { V:{ N:2, A:1, B:"One", C:"1/aaa/1", D:"A AA", E:5 } }, 
   { V:{ N:3, A:2, B:"one", C:"1/AAA/1", D:"aba", E:2.5 } }, 
   { V:{ N:4, A:2, B:"One", C:"1/a a a/2", D:"Abc", E:12 } }, 
   { V:{ N:5, A:1, B:"ONE", C:"1/aaa/2", D:"BBB", E:33 } }, 
   { V:{ N:6, A:1, B:"Two", C:"1/aaa", D:"BBCD", E:50 } }, 
   { V:{ N:"NoGroup", A:1, B:"Two", C:"1/aaa", D:"BBCD", E:32 }, A:{ N: { Type:"String" } }, NoGroup:1, Color:"#FCA" }, 
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