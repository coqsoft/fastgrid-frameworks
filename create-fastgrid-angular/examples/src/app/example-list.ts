import { Route, Routes } from "@angular/router";

export interface ExampleItemDefinition {
   title:string;
   path:string;
   loadComponent:NonNullable<Route["loadComponent"]>;
   }

export interface ExampleGroupDefinition {
   title:string;
   path:string;
   items:ExampleItemDefinition[];
   }

export interface ExampleItem extends ExampleItemDefinition {
   fullPath:string;
   }

export interface ExampleGroup {
   title:string;
   path:string;
   items:ExampleItem[];
   }

const exampleGroupDefinitions:ExampleGroupDefinition[] = [
   {
      title:"Complex FastGrid", path:"grid",
      items:[
         {
            title:"1. Large example with spanned cells",
            path:"01-spans",
            loadComponent:() =>
               import("./grid/01-spans.component")
                  .then(module => module.Grid_01SpansComponent)
            },
         {
            title:"2. Large example with column sets",
            path:"02-sets",
            loadComponent:() =>
               import("./grid/02-sets.component")
                  .then(module => module.Grid_02SetsComponent)
            },
         {
            title:"3. Large example with pivot grid",
            path:"03-pivot",
            loadComponent:() =>
               import("./grid/03-pivot.component")
                  .then(module => module.Grid_03PivotComponent)
            },
         {
            title:"4. Large example with detail TreeGrid Gantt chart",
            path:"04-gantt",
            loadComponent:() =>
               import("./grid/04-gantt.component")
                  .then(module => module.Grid_04GanttComponent)
            },
         ]
      },
   {
      title:"Complex FastSheet", path:"sheet",
      items:[
         {
            title:"5. Excel example",
            path:"05-excel",
            loadComponent:() =>
               import("./sheet/05-excel.component")
                  .then(module => module.Sheet_05ExcelComponent)
            },
         {
            title:"6. Excel 100k rows example",
            path:"06-excel-100k",
            loadComponent:() =>
               import("./sheet/06-excel-100k.component")
                  .then(module => module.Sheet_06Excel100kComponent)
            },
         {
            title:"7. Excel 1M rows example",
            path:"07-excel-1M",
            loadComponent:() =>
               import("./sheet/07-excel-1M.component")
                  .then(module => module.Sheet_07Excel1MComponent)
            },
         {
            title:"8. Empty spread sheet example",
            path:"08-empty",
            loadComponent:() =>
               import("./sheet/08-empty.component")
                  .then(module => module.Sheet_08EmptyComponent)
            },
         ]
      },
   {
      title:"Using Node Server with SQL database", path:"server-sql",
      items:[
         {
            title:"1. Plain table from SQL server",
            path:"01-sql-table",
            loadComponent:() =>
               import("./server-sql/01-sql-table.component")
                  .then(module => module.ServerSql_01SqlTableComponent)
            },
         {
            title:"2. Plain table from SQL server using UTF8Store",
            path:"02-sql-table-utf8store",
            loadComponent:() =>
               import("./server-sql/02-sql-table-utf8store.component")
                  .then(module => module.ServerSql_02SqlTableUtf8storeComponent)
            },
         {
            title:"3. Tree table from SQL server",
            path:"03-sql-tree",
            loadComponent:() =>
               import("./server-sql/03-sql-tree.component")
                  .then(module => module.ServerSql_03SqlTreeComponent)
            },
         {
            title:"4. Tree table from SQL server using UTF8Store",
            path:"04-sql-tree-utf8store",
            loadComponent:() =>
               import("./server-sql/04-sql-tree-utf8store.component")
                  .then(module => module.ServerSql_04SqlTreeUtf8storeComponent)
            },
         {
            title:"5. Grid from SQL server",
            path:"05-sql-grid",
            loadComponent:() =>
               import("./server-sql/05-sql-grid.component")
                  .then(module => module.ServerSql_05SqlGridComponent)
            },
         {
            title:"6. School list and ratings",
            path:"06-sql-schools",
            loadComponent:() =>
               import("./server-sql/06-sql-schools.component")
                  .then(module => module.ServerSql_06SqlSchoolsComponent)
            },
         ]
      },
   {
      title:"Using Node Server with static files", path:"server-file",
      items:[
         {
            title:"1. Data in static JSON file",
            path:"01-file-json",
            loadComponent:() =>
               import("./server-file/01-file-json.component")
                  .then(module => module.ServerFile_01FileJsonComponent)
            },
         {
            title:"2. Data in static UTF8Store file",
            path:"02-file-utf8store",
            loadComponent:() =>
               import("./server-file/02-file-utf8store.component")
                  .then(module => module.ServerFile_02FileUtf8storeComponent)
            },
         {
            title:"3. JSON sheets from file server",
            path:"03-file-sheets",
            loadComponent:() =>
               import("./server-file/03-file-sheets.component")
                  .then(module => module.ServerFile_03FileSheetsComponent)
            },
         {
            title:"4. XLSX sheets from file server",
            path:"04-file-xlsx",
            loadComponent:() =>
               import("./server-file/04-file-xlsx.component")
                  .then(module => module.ServerFile_04FileXlsxComponent)
            },
         ]
      },
   ];

export const exampleGroups:ExampleGroup[] = exampleGroupDefinitions.map(group => ({
   ...group,
   items:group.items.map(item => ({
      ...item,
      fullPath:group.path+"/"+item.path
      }))
   }));

export const examples:ExampleItem[] = exampleGroups.flatMap(group => group.items);

export const exampleRoutes:Routes = examples.map(example => ({
   path:example.fullPath,
   title:example.title,
   loadComponent:example.loadComponent
   }));
