export const tutorialGroups = [
   {
      title: "Complex FastGrid", path: "grid",
      items: [
         { title: "1. Spanned cells", path: "01-spans", component: () => import("./grid/01-spans.vue") },
         { title: "2. Column sets", path: "02-sets", component: () => import("./grid/02-sets.vue") },
         { title: "3. Pivot grid", path: "03-pivot", component: () => import("./grid/03-pivot.vue") },
         { title: "4. With detail TreeGrid Gantt chart", path: "04-gantt", component: () => import("./grid/04-gantt.vue") },
      ],
   },
   {
      title: "Complex FastSheet", path: "sheet",
      items: [
         { title: "5. Excel example", path: "05-excel", component: () => import("./sheet/05-excel.vue") },
         { title: "6. Excel 100,000 rows", path: "06-excel-100k", component: () => import("./sheet/06-excel-100k.vue") },
         { title: "7. Excel 1,000,000 rows", path: "07-excel-1M", component: () => import("./sheet/07-excel-1M.vue") },
         { title: "8. Empty spread sheet", path: "08-empty", component: () => import("./sheet/08-empty.vue") },
      ],
   },
   {
      title: "Using Node Server with SQL database", path: "server-sql",
      items: [
         { title: "1. Table in SQL database", path: "01-sql-table", component: () => import("./server-sql/01-sql-table.vue") },
         { title: "2. Table in SQL database and using UTF8Store", path: "02-sql-table-utf8store", component: () => import("./server-sql/02-sql-table-utf8store.vue") },
         { title: "3. Tree in SQL database", path: "03-sql-tree", component: () => import("./server-sql/03-sql-tree.vue") },
         { title: "4. Tree in SQL database and using UTF8Store", path: "04-sql-tree-utf8store", component: () => import("./server-sql/04-sql-tree-utf8store.vue") },
         { title: "5. Grid in SQL database", path: "05-sql-grid", component: () => import("./server-sql/05-sql-grid.vue") },
         { title: "6. School list and ratings Complex app. in SQL db.", path: "06-sql-schools", component: () => import("./server-sql/06-sql-schools.vue") },
      ],
   },
   {
      title: "Using Node Server with static files", path: "server-file",
      items: [
         { title: "1. Grid in JSON file", path: "01-file-json", component: () => import("./server-file/01-file-json.vue") },
         { title: "2. Grid in UTF8Store file", path: "02-file-utf8store", component: () => import("./server-file/02-file-utf8store.vue") },
         { title: "3. Sheets in JSON File", path: "03-file-sheets", component: () => import("./server-file/03-file-sheets.vue") },
         { title: "4. Sheets in XLSX File", path: "04-file-xlsx", component: () => import("./server-file/04-file-xlsx.vue") },
      ],
   },
];

export function flattenTutorials(groups) {
   return groups.flatMap((group) => group.items.map((item) => ({ ...item, groupTitle:group.title, groupPath:group.path, fullPath:`${group.path}/${item.path}` })));
   }

export const tutorials = flattenTutorials(tutorialGroups);
