TreeGridLoaded ({
Cfg: { id:"Gantt", Editing:0, ShowHScroll:1, Style:"Radius", GanttStyle:"Radius"  },
Panel: { Visible:0 },
LeftCols:[
   { Name:"N", Type:"Text", Width:150 },
   { Name:"A", Type:"Text", Visible:0 },
   ],
Cols: [
   { Name:"G", Type:"Gantt", 
      GanttAvailability:"A",
      GanttUnits:"d", GanttWidth:16,
      GanttHeader4:"d#%d", GanttHeaderHeight4:10,
      GanttHeader1:"M#MMMM yyyy", GanttHeaderHeight1:10,
      GanttChartRound:"M",
      MaxWidth:1000000,
      }
   ],
Media: [
   { MaxWidth: 500, Cfg: { Scale:0.7 } }
   ],
Toolbar: { Visible:0 },
Header: { N:"Name" },
Body:[[]]
});