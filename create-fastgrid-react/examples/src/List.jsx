import { lazy } from "react";

export const tutorialGroups = [
   {
      title: "Complex FastGrid", path: "grid",
      items: [
         { title: "1. Spanned cells", path: "01-spans", Component: lazy(() => import("./grid/01-spans.jsx")) },
         { title: "2. Column sets", path: "02-sets", Component: lazy(() => import("./grid/02-sets.jsx")) },
         { title: "3. Pivot grid", path: "03-pivot", Component: lazy(() => import("./grid/03-pivot.jsx")) },
         { title: "4. With detail TreeGrid Gantt chart", path: "04-gantt", Component: lazy(() => import("./grid/04-gantt.jsx")) },
      ],
   },
   {
      title: "Complex FastSheet", path: "sheet",
      items: [
         { title: "5. Excel example", path: "05-excel", Component: lazy(() => import("./sheet/05-excel.jsx")) },
         { title: "6. Excel 100,000 rows", path: "06-excel-100k", Component: lazy(() => import("./sheet/06-excel-100k.jsx")) },
         { title: "7. Excel 1,000,000 rows", path: "07-excel-1M", Component: lazy(() => import("./sheet/07-excel-1M.jsx")) },
         { title: "8. Empty spread sheet", path: "08-empty", Component: lazy(() => import("./sheet/08-empty.jsx")) },
      ],
   },
   {
      title: "Using Node Server with SQL database", path: "server-sql",
      items: [
         { title: "1. Table in SQL database", path: "09-sql-table", Component: lazy(() => import("./server-sql/01-sql-table.jsx")) },
         { title: "2. Table in SQL database and using UTF8Store", path: "10-sql-table-utf8store", Component: lazy(() => import("./server-sql/02-sql-table-utf8store.jsx")) },
         { title: "3. Tree in SQL database", path: "10-sql-tree", Component: lazy(() => import("./server-sql/03-sql-tree.jsx")) },
         { title: "4. Tree in SQL database and using UTF8Store", path: "12-sql-tree-utf8store", Component: lazy(() => import("./server-sql/04-sql-tree-utf8store.jsx")) },
         { title: "5. Grid in SQL database", path: "13-sql-grid", Component: lazy(() => import("./server-sql/05-sql-grid.jsx")) },
         { title: "6. School list and ratings Complex app. in SQL db.", path: "14-sql-schools", Component: lazy(() => import("./server-sql/06-sql-schools.jsx")) },
      ],
   },
   {
      title: "Using Node Server with static files", path: "server-file",
      items: [
         { title: "1. Grid in JSON file", path: "01-file-json", Component: lazy(() => import("./server-file/01-file-json.jsx")) },
         { title: "2. Grid in UTF8Store file", path: "02-file-utf8store", Component: lazy(() => import("./server-file/02-file-utf8store.jsx")) },
         { title: "3. Sheets in JSON file", path: "03-file-sheets", Component: lazy(() => import("./server-file/03-file-sheets.jsx")) },
         { title: "4. Sheets in XLSX file", path: "04-file-xlsx", Component: lazy(() => import("./server-file/04-file-xlsx.jsx")) },
      ],
   },
];

export function flattenTutorials(groups) {
   return groups.flatMap((group) => group.items.map((item) => ({...item, groupTitle: group.title, groupPath: group.path, fullPath: `${group.path}/${item.path}` })));
   }
export const tutorials = flattenTutorials(tutorialGroups);
