<script>
import { FastGrid } from "fastgrid-svelte";
import "../Tutorial.css";

   //. All the svg used for this sample are stored in public directory

   const src = { //. All layout and data for grid.
      Cfg: { 
         id: "Images", AddingImages:15, HoverImage:1, DropFiles:1, RecalcOn:1, Focus:2, HideVScroll:1, 
         PrintIcons:7, PrintToolbars:"-,Icons,Lists 1,Lists 2,Custom", ExportMarks:47, ExportIcons:15 
         },
      DefCols:{
         Col: { Width:170, List:"|One|Two|Three", ListTip:"Tip for the List icon", Wrap:5, OnClickMenu:"Grid.ShowMessage('Clicked menu icon','ShortTime')" }
         },
      LeftCols: [
         { id: "id", D:"HeaderFocus" }, 
         ],
      Cols: [
         { id:"ICON", Width:180 },
         { id:"IMAGE", Width:180 },
         { id:"BORDER", Width:180 },
         { id:"MARK", Width:180, PaddingLeft:8, PaddingRight:8 }
         ],
      Icons: { //. If defined directly, the icons are not preserved on style change - to preserve them, define them in Styles: { Base: { Icons: { ... } } }
         Smile: [
            { w:17, h:17 }, //. Used only in Marks
            { s:"#48A", f:"#FFA", sw:1, d:"m1.5,8a7,7,0,1,1,0,1zm1,-4.1a7,7,0,0,1,12,0" }, 
            { s:"red", f:"none", d:"m5.5,6a0.75,0.75,0,1,1,0,0.001m5,0a0.75,0.75,0,1,1,0,0.001m-2,2v2m3,1a4,4,0,0,1,-6,0" }
            ],
         NoSmile: [
            { w:17, h:17 }, //. Used only in Marks
            { c:"Smile" }, { s:"black", f:"none", d:"m4.75,6.5a1.25,1.25,0,1,1,0,0.001m5,0a1.25,1.25,0,1,1,0,0.001m-4.25,6a4,4,0,0,1,6,0" }
            ],
         Big: [
            { w:27, h:27 }, //. Used only for xlsx export
            { defs:"<linearGradient id='Custom1' x1='0%' y1='0%' x2='100%' y2='0%'><stop offset='0%' stop-color='blue'/><stop offset='90%' stop-color='aqua'/></linearGradient>" },
            { s:"red", f:"url(#Custom1)", sw:2, sda:"2 1", d:"m0.5,7a12,12,0,1,1,0,1z" }, 
            ]
         },
      Images: [
         { Row:1, Col:"IMAGE", Src:"/Orange.svg", X:130, Y:2, Link:"http://www.treegrid.com", Tip:"Image with link and tip" },
         { Row:2, Col:"IMAGE", Src:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjE4cHgiIHZpZXdCb3g9IjAgMCAxNTAgMTUwIj4KPHBhdGggZmlsbD0iIzAwOTkwMCIgZD0iTTEzNS4xNSwzMC4xYy0yLjE0Ni0yLjgxMy00LjUyOS01LjUyOS03LjE1LTguMTVjLTYuMzM0LTYuMzMzLTEzLjIzMy0xMS4zLTIwLjctMTQuOWMtMy42NDktMS43NS03LjQzMy0zLjE3NS0xMS4zNS00LjI3NUM4OS4zNDgsMC45MjUsODIuMzY0LDAsNzUsMAoJQzYzLjIzMywwLDUyLjQ2NywyLjM1LDQyLjcsNy4wNWMtNy41LDMuNi0xNC40MTcsOC41NjctMjAuNzUsMTQuOUM3LjMxNywzNi42MTcsMCw1NC4zLDAsNzVzNy4zMTcsMzguMzgzLDIxLjk1LDUzLjA1CglDMzYuNTgzLDE0Mi42ODQsNTQuMjY3LDE1MCw3NSwxNTBjMjAuNywwLDM4LjM2Ny03LjMxNiw1My0yMS45NWMxNC42NjYtMTQuNjY3LDIyLTMyLjM1LDIyLTUzLjA1QzE1MCw1Ny45OTgsMTQ1LjA1LDQzLjAzMSwxMzUuMTUsMzAuMXoiLz4KPHBvbHlnb24gZmlsbD0iI0ZGRkZGRiIgcG9pbnRzPSIxMjEuMyw1Ny45IDY0LjksMTE0LjMgMjcuMjUsNzYuNjQ5IDM5LjQ1LDY0LjQ1IDY0Ljg1LDg5Ljg1IDEwOS4wNSw0NS42NSIvPgo8L3N2Zz4K", X:120, Y:5, },
         { Row:3, Col:"IMAGE", Src:"/Red.svg", X:120, Y:-10, Width:70 },
         { Row:4, Col:"IMAGE", Src:"/Orange.svg", X:95, Y:2, Rotate:60, Width:25, Height:25 },
         { Row:5, Col:"IMAGE", Src:"/Green.svg", X:40, Y:3, Opacity:0.6, Width:25 },
         { Row:6, Col:"IMAGE", Src:"/Red.svg", X:120, Y:1, CX:10, CY:15, CWidth:40, CHeight:30, Width:60, Height:60  },
         { Row:7, Col:"IMAGE", Src:"/Green.svg", X:130, Y:0, ZIndex:3, Width:25 },
         { Row:7, Col:"IMAGE", Src:"/Red.svg", X:150, Y:0, ZIndex:1, Width:25, Height:25 },
         { Row:7, Col:"IMAGE", Src:"/Orange.svg", X:140, Y:15, ZIndex:2, Width:25, Height:25 },
         { Row:8, Col:"IMAGE", Src:"/Green.svg", X:130, Y:5, Width:25, NoMove:1, NoDuplicate:1, NoDelete:1, NoChange:63, Cursor:"default" },
         ],
      Body: [
         { id:0, TextColor:"gray", 
            V: { 
               ICON:"Side icons are interactive, every icon has its own mouse events", IMAGE:"Move image: left drag,\nCopy: Ctrl + left drag,\nDelete: Ctrl + left click", 
               BORDER:"Try to resize the column and every row to see the differences", MARK:"Mark icons are not interactive, except the charts (see row 7)"
               } 
            },
         { id:1, 
            V: { ICON:"Left icon", IMAGE:"Image with link\nShift + left click", BORDER:"Default Edit border", MARK:"Marks defined in M\nOn default top right horz" }, 
            A: { ICON: { LeftIcons:"List" }, BORDER: { CellBorder:"Edit", RightIcons:"List" } }, 
            M: { MARK: "Formula;Error" }
            },
         { id:2, 
            V: { ICON:"Text icon", IMAGE:"Image included\nby data: protocol", BORDER:"Default ListHigh border", MARK:"Marks defined in Marks\nOn top left vertically" }, 
            A: { ICON: { TextIcons:"List" }, BORDER: { CellBorder:"ListHigh", RightIcons:"List" }, MARK: { Marks:"Editable(2);Changed(2);AddedRow(2)" } } 
            },
         { id:3, 
            V: { ICON:"Text left icon + right icons", IMAGE:"Resized image\nShift + left drag", BORDER:"Button", MARK:"Marks defined by both M and Marks on all sides" }, 
            A: { 
               ICON: { TextIcons:"List", Align:1, RightIcons:"Check,Menu" }, 
               BORDER: { CellBorder:"Button", OnClick:"Grid.ShowMessage('Clicked button','ShortTime'),1", TextColor:"White", Align:2 }, 
               MARK: { Marks:"Changed(5);ReadOnly(8);Tip(8)" } 
               },
            M: { MARK:"Editable(1);Error(3);Formula(5)" }
            },
         { id:4, 
            V: { ICON:"Custom icons", IMAGE:"Rotated image\nAlt + left drag", BORDER:"Double border",MARK:"Marks with parameters and as background" }, 
            A: { 
               ICON: { 
                  LeftIcons:"NoSmile", NoSmileButton:"Smile", TextIcons:"Big", BigButton:"Smile", RightIcons:"Smile", 
                  OnClickSmile:"Grid.ShowMessage('Clicked custom icon','ShortTime')", SmileTip:"Tip for the Smile icon" 
                  },
               BORDER: { CellBorder:"Double,,,,white", Color:"yellow" },
               MARK: { Marks:["Linear('#F8F','#8F8',3)","Error(7)","Changed(3)"] }
               } 
            },
         { id:5, 
            V: { ICON:"External icons\n<b style='color:red'>Only for testing</b>", IMAGE:"Transparent image\nAlt + left click", BORDER:"FillEdit cell border", MARK:"Custom Mark icons\nand different size" }, 
            A: { 
               ICON: { 
                  LeftIcons:"Red", TextIcons:"Green", RightIcons:"Orange", RedIcon:"/Red.svg", OrangeIcon:"/Orange.svg", GreenButton:"Ext", RedButton:"Ext", OrangeButton:"Ext", 
                  OnClickExt:"Grid.ShowMessage('Clicked external icon','ShortTime')", Type:"Html",
                  GreenIcon:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjE4cHgiIHZpZXdCb3g9IjAgMCAxNTAgMTUwIj4KPHBhdGggZmlsbD0iIzAwOTkwMCIgZD0iTTEzNS4xNSwzMC4xYy0yLjE0Ni0yLjgxMy00LjUyOS01LjUyOS03LjE1LTguMTVjLTYuMzM0LTYuMzMzLTEzLjIzMy0xMS4zLTIwLjctMTQuOWMtMy42NDktMS43NS03LjQzMy0zLjE3NS0xMS4zNS00LjI3NUM4OS4zNDgsMC45MjUsODIuMzY0LDAsNzUsMAoJQzYzLjIzMywwLDUyLjQ2NywyLjM1LDQyLjcsNy4wNWMtNy41LDMuNi0xNC40MTcsOC41NjctMjAuNzUsMTQuOUM3LjMxNywzNi42MTcsMCw1NC4zLDAsNzVzNy4zMTcsMzguMzgzLDIxLjk1LDUzLjA1CglDMzYuNTgzLDE0Mi42ODQsNTQuMjY3LDE1MCw3NSwxNTBjMjAuNywwLDM4LjM2Ny03LjMxNiw1My0yMS45NWMxNC42NjYtMTQuNjY3LDIyLTMyLjM1LDIyLTUzLjA1QzE1MCw1Ny45OTgsMTQ1LjA1LDQzLjAzMSwxMzUuMTUsMzAuMXoiLz4KPHBvbHlnb24gZmlsbD0iI0ZGRkZGRiIgcG9pbnRzPSIxMjEuMyw1Ny45IDY0LjksMTE0LjMgMjcuMjUsNzYuNjQ5IDM5LjQ1LDY0LjQ1IDY0Ljg1LDg5Ljg1IDEwOS4wNSw0NS42NSIvPgo8L3N2Zz4K" 
                  },
               BORDER: { CellBorder:"FillEdit", LeftIcons:"List", TextColor:"white", Align:2 },
               },
            M: { MARK:"Smile(5);Error(5);Changed(5);NoSmile(5)" }
            },
         { id:6, 
            V: { ICON:"External icons with heights", IMAGE:"Cropped image\nShift + right drag", BORDER:"HighlightList cell border"  }, 
            A: { 
               ICON: { 
                  LeftIcons:"Red", TextIcons:"Green", RightIcons:"Orange", RedIcon:"/Red.svg", RedIconHeight:10, 
                  GreenIcon:"/Green.svg", GreenIconHeight:30, OrangeIcon:"/Orange.svg", OrangeIconHeight:13, GreenButton:"Ext", RedButton:"Ext", OrangeButton:"Ext", 
                  OnClickExt:"Grid.ShowMessage('Clicked external icon','ShortTime')", 
                  },
               BORDER: { CellBorder:"HighlightList", LeftIcons:"List" },
               },
            M: { MARK:["Chart({Values:[5,9,3,5,1,-4,-2,3,7,8,6,4],LineStroke:'black',Fill:'green',NegFill:'red',Point:9,Chart:'Line',Padding:[0,5]})"] }
            },
         { id:7, Height:40,
            V: { ICON:"Vertical icons", IMAGE:"Images with ZIndex\nAlt/shift + right click", BORDER:"Customized cell border", MARK:"5,9,3,5,1,-4,-2,3,7,8,6,4" }, 
            A: { 
               ICON: { LeftIcons:"Collapse,List", RightIcons:"Check,Menu", IconWrap:2, OnClickCollapse:"Grid.SetHeight(Row,Grid.GetAttr(Row,null,'Height')==40?30:40); return 1;" },
               BORDER: { Color:"#FAA", RowBorder:"green,3,brown,2,2 2", ColBorder:"blue,3,4 3,#A60,2,4 2 2 2", CellBorder:"List,blue,3,4 2 1 2 1 2,#0F0", RightIcons:"List" },
               MARK: { 
                  List:"|5,9,3,5,1,-4,-2,3,7,8,6,4|2,6,9,4,-3,5,8|9,4,8,3,-2,6,9,3,7,5,3,1,-2,-4,6,7,4,9,-1,7,5,-3,5,6", RightIcons:"List",
                  Marks:["Chart({Values:Grid.GetValue(Row,Col,3),Stroke:'gray',Fill:'yellow',NegFill:'#FAA',NegStroke:'gray',Point:9,Axis:'black',Chart:'Bar',Button:'CH',Padding:'3,20,0,5'})"],
                  Button:"List", OnClickCH:"Grid.ShowMessage('Clicked '+(Event.Button.slice(3)-0+1)+'. part with value <b>'+Grid.GetValue(Row,Col,3).split(',')[Event.Button.slice(3)]+'</b>','ShortTime')",
                  Tip:"dummy", OnTip:"ShowTip(0,Event.Button=='List' ? 'Choose the data' : Event.Button.slice(3)-0+1+'. part with value <b>'+Grid.GetValue(Row,Col,3).split(',')[Event.Button.slice(3)]+'</b>')"
                  },
               },
            F: { MARK:"''" }
            },
         { id:8, Height:40,
            V: { ICON:"Auto wrap icons on resize height", IMAGE:"Static image", BORDER:"Customized cell border" }, 
            A: { 
               ICON: { LeftIcons:"Collapse,List,Radio", RightIcons:"Check,Menu", IconWrap:1, OnClickCollapse:"Grid.SetHeight(Row,Grid.GetAttr(Row,null,'Height')==40?60:40); return 1;" },
               BORDER: { CellBorder:"RectRound,red,2,4 4,#DDD", RightIcons:"List" },
               MARK: { 
                  Marks:[
                     "Chart({Values:[5,9,3,5,1,-4,-2,3,7,8,6,4],Min:-5,Max:10,Order:0,Count:2,Stroke:'gray',Fill:'yellow',NegFill:'#FAA',NegStroke:'gray',Axis:'black',Chart:'Bar',Padding:[0,5]})",
                     "Chart({Values:[4,3,4,8,4,-2,-4,1,4,8,2,3],Min:-5,Max:10,Order:1,Count:2,Stroke:'gray',Fill:'aqua',NegFill:'#F5F',NegStroke:'gray',Axis:'black',Chart:'Bar',Padding:[0,5]})",
                     "Chart({Values:[5,9,4,8,4,-4,-4,3,7,8,6,4],Min:-5,Max:10,Order:0,Count:2,Stroke:'#444',Axis:'black',Chart:'Line',Padding:[0,5]})",
                     ], NoEdit:1
                  },
               } 
            }
         ],
      Head: [
         { D:"HeaderFocus", V: { ICON:"Side icons", IMAGE:"Floating images", BORDER:"Cell inner border", MARK:"Mark icons and charts" } }
         ],
      Top: [
         { id:"Data", Cells:"Settings,AddImage,Reload,Print,Pdf,Export,Copy,Undo,Redo" }, "Layout",
         { id:"Icons", Narrow:32, NoUndo:0, Cells:[ 
            { Value:"Icon on left", Icon:"Collapse", D:"Cell", OnClickCollapse:"Grid.ShowMessage('Clicked icon','ShortTime')" },
            { Value:"Custom icon on right", Icon:"Smile", IconAlign:1, IconButton:"BS", OnClickAny:"Grid.ShowMessage('Clicked cell','ShortTime')", OnClickBS:"Grid.ShowMessage('Clicked custom icon','ShortTime')" },
            { Value:"With popup icon", Icon:"NoSmile", Popup:1, List:"|A|B|C" },
            { Value:"External icon", Icon:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjE4cHgiIHZpZXdCb3g9IjAgMCAxNTAgMTUwIj4KPHBhdGggZmlsbD0iIzAwOTkwMCIgZD0iTTEzNS4xNSwzMC4xYy0yLjE0Ni0yLjgxMy00LjUyOS01LjUyOS03LjE1LTguMTVjLTYuMzM0LTYuMzMzLTEzLjIzMy0xMS4zLTIwLjctMTQuOWMtMy42NDktMS43NS03LjQzMy0zLjE3NS0xMS4zNS00LjI3NUM4OS4zNDgsMC45MjUsODIuMzY0LDAsNzUsMAoJQzYzLjIzMywwLDUyLjQ2NywyLjM1LDQyLjcsNy4wNWMtNy41LDMuNi0xNC40MTcsOC41NjctMjAuNzUsMTQuOUM3LjMxNywzNi42MTcsMCw1NC4zLDAsNzVzNy4zMTcsMzguMzgzLDIxLjk1LDUzLjA1CglDMzYuNTgzLDE0Mi42ODQsNTQuMjY3LDE1MCw3NSwxNTBjMjAuNywwLDM4LjM2Ny03LjMxNiw1My0yMS45NWMxNC42NjYtMTQuNjY3LDIyLTMyLjM1LDIyLTUzLjA1QzE1MCw1Ny45OTgsMTQ1LjA1LDQzLjAzMSwxMzUuMTUsMzAuMXoiLz4KPHBvbHlnb24gZmlsbD0iI0ZGRkZGRiIgcG9pbnRzPSIxMjEuMyw1Ny45IDY0LjksMTE0LjMgMjcuMjUsNzYuNjQ5IDM5LjQ1LDY0LjQ1IDY0Ljg1LDg5Ljg1IDEwOS4wNSw0NS42NSIvPgo8L3N2Zz4K" },
            { Value:"External icon with height", Icon:"/Orange.svg", IconHeight:30, IconWidth:25 },
            ] },
         { id:"Lists 1", List:"|A|B\nB|C", Wrap:4, UseResize:3, Height:0, Narrow:32, NoUndo:0, Cells: [
            { Value:"List", D:"List", Width:40 },
            { Value:"ListHigh", D:"List", CellBorder:"ListHigh,,,,edittool", Width:50 },
            { Value:"EditList", D:"EditList", Width:55 },
            { Value:"Edit", D:"Edit", Width:40 },
            { Value:"EditHigh", D:"Edit", CellBorder:"EditHigh,,,,edittool", Width:55 },
            { Value:"ListFirst", D:"ListFirst", Width:50 },
            { Value:"ListNext", D:"ListNext", Width:50 },
            { Value:"EditNext", D:"EditNext", Width:50 },
            { Value:"ListLast", D:"ListLast", Width:50 },
            { Value:"ListSingle", D:"ListSingle", Width:60 },
            ] },
         { id:"Lists 2", List:"|A|B\nB|C", Wrap:4, UseResize:3, Height:0, Narrow:32, NoUndo:0, Cells: [
            { Value:"Simple", D:"List", CellBorder:"SimpleEdit", Width:50 },
            { Value:"Empty", D:"List", CellBorder:"EmptyEdit", Width:50 },
            { Value:"Fill", D:"List", CellBorder:"FillEdit", TextColor:"white", Width:30 },
            { Value:"Highlight", D:"List", CellBorder:"HighlightEdit", Width:60 },
            { Value:"Simple", D:"List", CellBorder:"SimpleList", Width:50 },
            { Value:"Empty", D:"List", CellBorder:"EmptyList", Width:50 },
            { Value:"Fill", D:"List", CellBorder:"FillList", TextColor:"white", Icon:"List_Header", Width:30 },
            { Value:"Highlight", D:"List", CellBorder:"HighlightList", Width:60 },
            ]},
         { id:"Custom", List:"|A|B\nB|C", Wrap:4, UseResize:3, Height:0, Narrow:32, NoUndo:0, Cells: [
            { Value:"Custom border", D:"List", CellBorder:"List,red,2,2 2,yellow", Color:"#0FF", Width:100 },
            { Value:"Custom border", D:"EditList", CellBorder:"RectRound,green,3,5 2 3 2 1 2 3 2,#FA0", Color:"#DBF", TextColor:"white", Width:100 },
            { Value:"Button", D:"Button", Width:100, OnClick:"Grid.ShowMessage('Clicked button','ShortTime')" },
            { Value:"ButtonHigh", D:"Button", CellBorder:"ButtonHigh", Width:100, OnClick:"Grid.ShowMessage('Clicked button','ShortTime')" },
            { Value:"Marks", Marks:"Changed(5);ReadOnly(8);Tip(3);Editable(1);Error(8);Formula(5);Dotted(4,'silver')", Width:60, Align:2 },
            { Label:"Chart", Value:"5,9,3,5,1,-4,-2,3,7,8,6,4", Width:106, Popup:1, Formula:"''", NoEdit:1, Type:"String",
               List:"|5,9,3,5,1,-4,-2,3,7,8,6,4|2,6,9,4,-3,5,8|9,4,8,3,-2,6,9,3,7,5,3,1,-2,-4,6,7,4,9,-1,7,5",
               Marks:["Chart({Values:Grid.GetValue(Row,Col,3),Stroke:'gray',Fill:'yellow',NegFill:'#FAA',NegStroke:'gray',Point:9,Axis:'black',Chart:'Bar',Button:'CH',Padding:'0,18,0,0'})"],
               OnClickCH:"if(Event.Button) Grid.ShowMessage('Clicked '+(Event.Button.slice(3)-0+1)+'. part with value <b>'+Grid.GetValue(Row,Col,3).split(',')[Event.Button.slice(3)]+'</b>','ShortTime')",
               Tip:"dummy", OnTip:"if(Event.Button) Grid.ShowTip(Row,Col,Event.Button=='Popup' ? 'Choose the data' : Event.Button.slice(3)-0+1+'. part with value <b>'+Grid.GetValue(Row,Col,3).split(',')[Event.Button.slice(3)]+'</b>'); return 1;"
               },
            ]}
         ]
   };
</script>

<h1>5. Cell images and charts</h1>
      <h5>Cell side images, floating images, mark images and mark charts</h5>
      <section>
         <FastGrid src={src} style="display:inline-block; max-width:100%;"/>
      </section>

      
      <ul>
         <li><h4>Side icons</h4><br />
            For more information see <a target="FGDoc" href="https://www.treegrid.com/FDoc/CellImage.htm#Icons">Side icons</a>.<br />
            <ul>
               <li><h4>Icons in grid cell</h4><br />
               <ul>
               <li>There can be three icon sets in every cell, left side by <dfn>LeftIcons</dfn>, right side by <dfn>RightSide</dfn> and inside cell next to cell text by <dfn>TextIcons</dfn>.</li>
               <li>Every icon set can contain one or more icons, comma separated. The more icons in one set can be displayed horizontally, vertically or wrapped according to vertical space, set by attribute <dfn>IconWrap</dfn></li>
               <li>The displayed icon can be defined by <dfn>&#123;name&#125;Icon</dfn>, where the &#123;name&#125; is the icon name used in the Left/Right/TextIcons. If not set, the &#123;name&#125; is used as the displayed icon.</li>
               <li>The icon button can be defined by <dfn>&#123;name&#125;Button</dfn>, where the &#123;name&#125; is the icon name used in the Left/Right/TextIcons. If not set, the &#123;name&#125; is used as the icon button. 
               To the defined button can be assigned event hadlers specific for the icon e.g. OnClickXXX="alert(1)"</li>
               </ul>
               </li>
               <li><h4>Icon in toolbar cell</h4><br />
               <ul>
                  <li>Toolbar cell can have defined only one icon by <dfn>Icon</dfn> attribute. The icon can be displayed on left or right side of the cell, specified by <dfn>IconAlign</dfn> attribute.</li>
                  <li>The icon button can be defined by <dfn>IconButton</dfn>. If not set, the icon name is used as the icon button. To the defined button can be assigned event hadlers specific for the icon e.g. OnClickXXX="alert(1)"</li>
                  <li>By default the toolbar cell has set button as the icon name for the whole cell, to specify button to only the icon set <dfn>Button</dfn> = "".</li>
                  <li>Toolbar cell can display next special popup icon if set <dfn>Popup</dfn>, to show the cell <b>List</b> on click.</li>
                  <li>The toolbar icons can be scalled by <dfn>IconZoom</dfn>, default is <b>1.25</b> as 125% zoom.</li>
               </ul>
               </li>
               <li><h4>Defining icons</h4><br />
               The icons are defined in <dfn>Icons</dfn> root tag. Default FastGrid icons are defined in source file <b>Style.js</b>.<br />
               The icons are defined in special format, as SVG image part, with only <b>&lt;path&gt;</b> tags.<br />
               All the icons should have the same size defined by <b>Cfg</b> <dfn>IconWidth</dfn> / <dfn>IconHeight</dfn>. The icon can be defined bigger or smaller, but the reserved space and the clickable area is still the <b>IconWidth</b> / <b>IconHeight</b>.<br />
               For more information see <a target="FGDoc" href="https://www.treegrid.com/FDoc/CellImage.htm#IconsDef">Defining icons</a>.<br />
               </li>
               <li><h4>External icons</h4><br />
               The <b>&#123;name&#125;Icon</b> in grid cells and <b>Icon</b> in toolbar cells accept also external image files defined as their url or as direct "data:...".<br />
               The relative urls are relative to the main page url, <b>not</b> to FastGrid url.<br />
               Size of the external image can be set by <b>&#x7B;name&#x7D;IconHeight</b> in grid cell or <b>IconHeight</b> in toolbar cell. If not set, the image is shown on its original size. 
               The external image is shrunk, if the image default or explicit height is higher than the row height. It does <b>not</b> change the width reserved for the icon by the <b>IconWidth</b>.<br />
               <b style="color:red;">Using external icons can slow down paint!</b> <span style="color:red;">External icons can blink during some actions like resizing.</span><br />
               <span style="color:red;">External icons should be used only for development; in production they should be converted to internal images in <a target="FGDoc" href="https://www.treegrid.com/FDoc/CellImage.htm#GridIcons">Icons</a>.</span><br />
               </li>
            </ul>
         </li>
         <li><h4>Floating images</h4><br />
         Floating images are external image files (svg, jpg, ...) displayed outside cells. The image can be also included directly using "data:" protocol in url.<br />
         The images are fully interactive, they can be added (local or remote files), deleted, copied, moved, resized, rotated, cropped, made transparent, have assigned link and tip, controlled by z-index.
         Both directly by users or by API.<br />
         The floating images can be displayed only on grid rows, not on toolbars.<br />
         <span style="color:red;">Floating images should be used only for interactive images changeable by users. For static images in cells use the <b>Side icons</b> instead, they are much faster.</span><br />
         The images are stored in root array <dfn>Images</dfn>.<br />
         For more information see <a target="FGDoc" href="https://www.treegrid.com/FDoc/CellImage.htm#Images">Floating images</a>.<br />
         </li>
         <li><h4>Cell inner border</h4><br />
         Cell inner border is indepenent on the cell outer border (grid) and is defined by <dfn>CellBorder</dfn> attribute. In toolbar it is the only border the toolbar cell can have.<br />
         Cell inner border is always rectangle, although it can hide some its edges and can have rounded corners.<br />
         By the <dfn>CellBorder</dfn> is possible to specify line color, width, dasharray and background color and defined cell border icon.<br />
         The cell border icon is defined in <dfn>CellBorders</dfn> root tag and can specify the position and size of rectangle, rounded corners, interactivity and the background image.<br />
         The background image in cell border is usually the rectangle, but in fact it can be any background image.<br />
         For more information see <a target="FGDoc" href="https://www.treegrid.com/FDoc/CellStyle.htm#Inner">CellBorder</a>.<br />
         </li>
         <li><h4>Mark icons</h4><br />
         Mark icons are icons displayed in specified cell corner, in specified direction. Or the mark icons can be displayed on whole cell background.<br />
         Mark icons are inactive and do not generate mouse events, except special icons like <b>Chart</b>.<br />
         Mark icons are defined the same as <b>side icons</b> in <dfn>Icons</dfn>, but unlike the <b>side icons</b> the mark icons can have defined their width and height.<br />
         Mark icons can be set to cells in two similar ways, in row attribute <dfn>M</dfn> and in cell attribute <dfn>Marks</dfn>. Both ways can be used together in one cell.<br />
         Mark icon can be set with parameters in (), the parameters depends on the mark icon definition, every icon can have different parameters. In the () is possible also to use JavaScript code to calculate the parameter value.<br />
         For more information see <a target="FGDoc" href="https://www.treegrid.com/FDoc/CellImage.htm#Marks">Mark icons</a>.<br />
         There is special mark icon <dfn>Chart()</dfn>, this icon is used to generate bar and line chart in cells. See <a target="FGDoc" href="https://www.treegrid.com/FDoc/CellImage.htm#MarkIcons">Chart</a>.<br />
         </li>
      </ul>
