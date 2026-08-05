import { Route, Routes } from "@angular/router";
export interface TutorialItemDefinition { title:string; path:string; loadComponent:NonNullable<Route["loadComponent"]>; }
export interface TutorialGroupDefinition { title:string; path:string; items:TutorialItemDefinition[]; }
export interface TutorialItem extends TutorialItemDefinition { fullPath:string; }
export interface TutorialGroup { title:string; path:string; items:TutorialItem[]; }
const tutorialGroupDefinitions:TutorialGroupDefinition[] = [
   {
      title:"Quick Start", path:"start",
      items:[
         {  title:"1. Quick Start - Grid", path:"01-quick-start-grid",
            loadComponent:() => import("./start/01-quick-start-grid.component").then(module => module.Start_01QuickStartGridComponent) },
         {  title:"2. Advanced Start - Grid + API in Angular", path:"02-advanced-start-grid",
            loadComponent:() => import("./start/02-advanced-start-grid.component").then(module => module.Start_02AdvancedStartGridComponent) },
         {  title:"3. Quick Start - Sheet", path:"03-quick-start-sheet",
            loadComponent:() => import("./start/03-quick-start-sheet.component").then(module => module.Start_03QuickStartSheetComponent) },
         {  title:"4. Quick Start - XLSX", path:"04-quick-start-xlsx",
            loadComponent:() => import("./start/04-quick-start-xlsx.component").then(module => module.Start_04QuickStartXlsxComponent) },
         ]
      },
   {
      title:"Basic", path:"basic",
      items:[
         {  title:"1. Basic grid", path:"01-basic-grid",
            loadComponent:() => import("./basic/01-basic-grid.component").then(module => module.Basic_01BasicGridComponent) },
         {  title:"2. Rows", path:"02-rows",
            loadComponent:() => import("./basic/02-rows.component").then(module => module.Basic_02RowsComponent) },
         {  title:"3. Columns", path:"03-columns", 
            loadComponent:() => import("./basic/03-columns.component").then(module => module.Basic_03ColumnsComponent) },
         {  title:"4. Column sets", path:"04-column-sets",
            loadComponent:() => import("./basic/04-column-sets.component").then(module => module.Basic_04ColumnSetsComponent) },
         {  title:"5. Row sets", path:"05-row-sets",
            loadComponent:() => import("./basic/05-row-sets.component").then(module => module.Basic_05RowSetsComponent) },
         {  title:"6. Default rows and columns", path:"06-defaults",
            loadComponent:() => import("./basic/06-defaults.component").then(module => module.Basic_06DefaultsComponent) },
         {  title:"7. Manipulate rows and columns", path:"07-manipulate",
            loadComponent:() => import("./basic/07-manipulate.component").then(module => module.Basic_07ManipulateComponent) },
         {  title:"8. CSV grid", path:"08-csv-grid",
            loadComponent:() => import("./basic/08-csv-grid.component").then(module => module.Basic_08CsvGridComponent) },
         ]
      },
   {
      title:"Cells & content", path:"cells",
      items:[
         {  title:"1. Values", path:"01-values",
            loadComponent:() => import("./cells/01-values.component").then(module => module.Cells_01ValuesComponent) },
         {  title:"2. Attributes", path:"02-attributes",
            loadComponent:() => import("./cells/02-attributes.component").then(module => module.Cells_02AttributesComponent) },
         {  title:"3. Cell types, formats and wrap", path:"03-types",
            loadComponent:() => import("./cells/03-types.component").then(module => module.Cells_03TypesComponent) },
         {  title:"4. Cell popup menus - List & Suggest", path:"04-list",
            loadComponent:() => import("./cells/04-list.component").then(module => module.Cells_04ListComponent) },
         {  title:"5. Cell images and charts", path:"05-images",
            loadComponent:() => import("./cells/05-images.component").then(module => module.Cells_05ImagesComponent) },
         {  title:"6. Cell style and border", path:"06-styles",
            loadComponent:() => import("./cells/06-styles.component").then(module => module.Cells_06StylesComponent) },
         {  title:"7. Cell sizes, margins and span", path:"07-sizes",
            loadComponent:() => import("./cells/07-sizes.component").then(module => module.Cells_07SizesComponent) },
         {  title:"8. Toolbar size and position", path:"08-toolbars",
            loadComponent:() => import("./cells/08-toolbars.component").then(module => module.Cells_08ToolbarsComponent) },
         {  title:"9. Permissions and input validation", path:"09-permissions",
            loadComponent:() => import("./cells/09-permissions.component").then(module => module.Cells_09PermissionsComponent) },
         {  title:"10. Conditional formatting and styling", path:"10-conditional-format",
            loadComponent:() => import("./cells/10-conditional-format.component").then(module => module.Cells_10ConditionalFormatComponent) },
         ]
      },
   {
      title:"Tree & grouping", path:"tree",
      items:[
         {  title:"1. Row tree", path:"01-row-tree",
            loadComponent:() => import("./tree/01-row-tree.component").then(module => module.Tree_01RowTreeComponent) },
         {  title:"2. Column tree", path:"02-column-tree",
            loadComponent:() => import("./tree/02-column-tree.component").then(module => module.Tree_02ColumnTreeComponent) },
         {  title:"3. Grouping rows to tree", path:"03-grouping-rows",
            loadComponent:() => import("./tree/03-grouping-rows.component").then(module => module.Tree_03GroupingRowsComponent) },
         {  title:"4. Grouping columns to tree", path:"04-grouping-columns",
            loadComponent:() => import("./tree/04-grouping-columns.component").then(module => module.Tree_04GroupingColumnsComponent) },
         {  title:"5. Loading child rows on demand", path:"05-load-children", 
            loadComponent:() => import("./tree/05-load-children.component").then(module => module.Tree_05LoadChildrenComponent) },
         ]
      },
   {
      title:"Sorting", path:"sort",
      items:[
         {  title:"1. Sorting rows", path:"01-sorting-rows",
            loadComponent:() => import("./sort/01-sorting-rows.component").then(module => module.Sort_01SortingRowsComponent) },
         {  title:"2. Sorting columns", path:"02-sorting-columns",
            loadComponent:() => import("./sort/02-sorting-columns.component").then(module => module.Sort_02SortingColumnsComponent) },
         ]
      },
   {
      title:"Filter & Search", path:"filter",
      items:[
         {  title:"1. Filtering rows", path:"01-filtering-rows",
            loadComponent:() => import("./filter/01-filtering-rows.component").then(module => module.Filter_01FilteringRowsComponent) },
         {  title:"2. Filtering columns", path:"02-filtering-columns",
            loadComponent:() => import("./filter/02-filtering-columns.component").then(module => module.Filter_02FilteringColumnsComponent) },
         {  title:"3. Filtering in tree", path:"03-filtering-tree",
            loadComponent:() => import("./filter/03-filtering-tree.component").then(module => module.Filter_03FilteringTreeComponent) },
         {  title:"4. Searching in cells", path:"04-search",
            loadComponent:() => import("./filter/04-search.component").then(module => module.Filter_04SearchComponent) },
         ]
      },
   {
      title:"Dragging", path:"drag",
      items:[
         {  title:"1. Dragging and pasting rows", path:"01-dragging-rows",
            loadComponent:() => import("./drag/01-dragging-rows.component").then(module => module.Drag_01DraggingRowsComponent) },
         {  title:"2. Dragging and pasting columns", path:"02-dragging-columns",
            loadComponent:() => import("./drag/02-dragging-columns.component").then(module => module.Drag_02DraggingColumnsComponent) },
         {  title:"3. Dragging from and to external sources", path:"03-dragging-external",
            loadComponent:() => import("./drag/03-dragging-external.component").then(module => module.Drag_03DraggingExternalComponent) },
         ]
      },
   {
      title:"AI", path:"ai",
      items:[
         {  title:"1. Grid with AI", path:"01-ai-grid",
            loadComponent:() => import("./ai/01-ai-grid.component").then(module => module.Ai_01AiGridComponent) },
         {  title:"2. Sheets with AI", path:"02-ai-sheet",
            loadComponent:() => import("./ai/02-ai-sheet.component").then(module => module.Ai_02AiSheetComponent) },
         ]
      },
   ];

export const tutorialGroups:TutorialGroup[] = tutorialGroupDefinitions.map(group => ({
   ...group,
   items:group.items.map(item => ({ ...item, fullPath:group.path+"/"+item.path }))
   }));
export const tutorials:TutorialItem[] = tutorialGroups.flatMap(group => group.items);
export const tutorialRoutes:Routes = tutorials.map(tutorial => ({ path: tutorial.fullPath, title: tutorial.title, loadComponent: tutorial.loadComponent }));
