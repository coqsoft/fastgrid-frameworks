<script setup>
import { FastGrid } from "fastgrid-vue";
import "../Tutorial.css";


   const src = { //. All layout and data for grid.
      Cfg: { 
         id:"LoadChildren", ChildrenUrl:"*Row", PrintLoadChildren:1, ExportLoadChildren:1, ExportRowsType:"Collapsed", OverScroll:2
         }, 
      Cookie: { RowParts:"-CollapseLevel", ColParts:"-CollapseLevel" }, //. CollapseLevel cannot be saved to cookies when used loading children on demand 
      DefCols:{
         Col: { Width:50 }
         },
      LeftCols: [ { id:"Header", D:"Header", Width:70, Align:0 }],
      Cols: [ { id:"A", Width:400 }, { id:"B", RightIcons:"CollapseRow" }, { id:"C" }, { id:"D" }, { id:"E" }, { id:"F" } ],
      Head: [
         { id:"Header", D:"Header", LevelsPart:"Body", V: { Header:"ID" } },
         ],
      Body: [
         { id:"1", V: { A:"Normal expanded parent" } },
         { id:"1-1", L:1, V: { A:"Normal child" } },
         { id:"1-2", L:1, Collapsed:1, Children:3, Color:"#FEF", V: { A:"Load children on expand" } },
         { id:"2", Collapsed:1, V: { A:"Normal collapsed parent" } },
         { id:"2-1", L:1, V: { A:"Normal child" } },
         { id:"2-2", L:1, V: { A:"Normal child" } },
         { id:"3", Collapsed:1, Children:3, ChildrenL:4, Color:"#FEF", V: { A:"Load children on expand with deep tree" } },
         { id:"4", Collapsed:1, Children:4, Color:"#FEF", V: { A:"Load children on expand to row with children" } },
         { id:"4-1", L:1, V: { A:"Normal child" } },
         { id:"4-2", L:1, V: { A:"Normal child" } },
         ],
      Body_Cfg:{ Tree:"A" }, 
      Top: [
         { id:"Data", Cells:"Settings,Reload,PrintPdf,Export,Copy,Paste,Undo,Redo,ExpandRows,CollapseRows,ClearSort" }, "Layout",
         { Cells:[
            { Type:"Bool", LabelRight:"Reload children", Formula:"Grid.GetCfgAttr('ChildrenReload')", OnChange:"Grid.SetCfgAttr('ChildrenReload',Value)", Tip:"If set, reloads children rows on every expand, not only on the first one.<br>The change affects only not yet loaded children." },
            ] }
         ],
      Media: {
         Mobile: {
            Cols: [{ id:"A", Width:380 }, { id:"B", Width:25 }]
            }
         }
   };

   //. Sample data for child rows loaded from server on demand, in real application it should be loaded dynamically from data source in the onDataSend event handler or directly from given server url
   const ChildrenData = {
      "1-2": { 
         Body:[ 
            { id:"1-2-1", Parent:"1-2", V:{ A:"Loaded child" } }, 
            { id:"1-2-2", Parent:"1-2", V:{ A:"Loaded child" } }, 
            { id:"1-2-3", Parent:"1-2", V:{ A:"Loaded child" } } 
            ] 
         },
      "3": { 
         Body:[
            { id:"3-1", Parent:3, V:{ A:"Loaded normal expanded parent" } },
            { id:"3-1-1", Parent:"3-1", V:{ A:"Loaded child, normal child" } },
            { id:"3-2", Parent:3, Collapsed:1, ChildrenL:1, V:{ A:"Loaded normal collapsed parent" } },
            { id:"3-2-1", Parent:"3-2", V:{ A:"Loaded child, normal child" } },
            { id:"3-2-2", Parent:"3-2", Collapsed:1, Children:3, ChildrenL:2, Color:"#FEF", V:{ A:"Loaded child, load children on expand" } },
            { id:"3-2-3", Parent:"3-2", V:{ A:"Loaded child, normal child" } },
            { id:"3-3", Parent:3, Collapsed:1, Children:2, Color:"#FDE", V:{ A:"Loaded child, load children on expand - error" } },
            ]
         },
      "3-2-2": {
         Body:[
            { id:"3-2-2-1", ChildrenUrl:"3-2-2-A", Parent:"3-2-2", Children:3, Collapsed:1, Color:"#FEF", V:{ A:"Loaded child, load all sinblings' children on expand" } },
            { id:"3-2-2-2", ChildrenUrl:"3-2-2-A", Parent:"3-2-2", Children:2, Collapsed:1, Color:"#FEF", V:{ A:"Loaded child, load all sinblings' children on expand" } },
            { id:"3-2-2-3", ChildrenUrl:"3-2-2-A", Parent:"3-2-2", Children:1, Collapsed:1, Color:"#FEF", V:{ A:"Loaded child, load all sinblings' children on expand" } },
            ]
         },
      "3-2-2-A": {
         Body:[
            { id:"3-2-2-1-1", Parent:"3-2-2-1", V:{ A:"Loaded child" } },
            { id:"3-2-2-1-2", Parent:"3-2-2-1", V:{ A:"Loaded child" } },
            { id:"3-2-2-1-3", Parent:"3-2-2-1", V:{ A:"Loaded child" } },
            { id:"3-2-2-2-1", Parent:"3-2-2-2", V:{ A:"Loaded child" } },
            { id:"3-2-2-2-2", Parent:"3-2-2-2", V:{ A:"Loaded child" } },
            { id:"3-2-2-3-1", Parent:"3-2-2-3", V:{ A:"Loaded child" } },
            ]
         },
      "4": {
         Body:[
            { id:"4-3", Parent:4, V:{ A:"Loaded child" } },
            { id:"4-4", Parent:4, V:{ A:"Loaded child" } },
            ]
         }
      }

   //. Called for every FastGrid request, but used only for chldren rows for parents with Children attribute
   //. Returns direct data without loading them from server, just for demonstration
   function onDataSend(grid,source,func,index){
      var data = ChildrenData[source.Url]; 
      if(data!=null){ func(data); console.log("Loaded dynamic data from url: "+source.Url); return true; } //. If ChildrenData contains the url, it is request for children data, returns them and stops the communication. func can be called also asynchronously, after data are loaded
      return null;                               //. Other requests are unchanged
      }

   
</script>

<template>

      <h1>5. Loading child rows on demand</h1>
      <h5>Loading child rows on parent expand</h5>
      <section>
         <FastGrid :src="src" @data-send="onDataSend" style="display:inline-block; height:550px; max-width:100%;"/>
      </section>

      
      <ul>
         <li>
            A row can download its child rows on its expand when it has set attribute <dfn>Children</dfn>. It can be set to count of loaded children or simply to 1.<br />
            If the row has some children already, the loaded children are added to them on the end.<br />
            Note the <b>Children</b> attribute is applied only for <b>Collapsed</b> rows.<br />
            If the row contains deep tree, the children with their children, set attribute <dfn>ChildrenL</dfn> of the parent row to the tree deepness.<br />
         </li>
         <li>
            The rows are loaded from url set by <b>Cfg</b> attribute <dfn>ChildrenUrl</dfn>. Or every row can have set its <dfn>ChildrenUrl</dfn>.<br />
            The <b>ChildrenUrl</b> is standard FastGrid <b>Source</b> object or string with server url.<br />
            The server url can contain keyword <b>*Row</b> to be replaced by the parent row that downloads its children.<br />
         </li>
         <li>
            The data with the loading children rows is standard FastGrid JSON object with <b>Body</b> or <b>ChangedRows</b>.<br />
            The rows should contain <dfn>Parent</dfn> attribute to be placed to the correct parent row.<br />
            If the loaded data contains row in tree, the rows should not contain <b>L</b> attribute, but rather the <b>Parent</b> to be included to the given parent row.<br />
         </li>
         <li>
            The row children are loaded only on its first expand. After the expand the <b>Children</b> attribute is cleared.<br />
            To load children on every expand, set <b>Cfg</b> attribute <dfn>ChildrenReload</dfn>.<br />
         </li>
         <li>
            To restrict loading all children on expand all set <b>Cfg</b> <dfn>ChildrenExpandAll</dfn> = <b>0</b>. It will expand and load only the first collapsed level.<br /> 
            To expand all children on print / export with collapsed rows set <b>Cfg</b> attribute <dfn>PrintLoadChildren</dfn> / <dfn>ExportLoadChildren</dfn>.<br />
         </li>
      </ul>
      
</template>
