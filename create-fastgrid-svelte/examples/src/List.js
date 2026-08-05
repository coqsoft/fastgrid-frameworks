const tutorialModules = import.meta.glob("./**/*.svelte");

export const tutorialGroups = [
   {
      title: "Complex FastGrid", path: "grid",
      items: [
         { title: "1. Spanned cells", path: "01-spans", file:"./grid/01-spans.svelte" },
         { title: "2. Column sets", path: "02-sets", file:"./grid/02-sets.svelte" },
         { title: "3. Pivot grid", path: "03-pivot", file:"./grid/03-pivot.svelte" },
         { title: "4. With detail TreeGrid Gantt chart", path: "04-gantt", file:"./grid/04-gantt.svelte" },
      ],
   },
   {
      title: "Complex FastSheet", path: "sheet",
      items: [
         { title: "5. Excel example", path: "05-excel", file:"./sheet/05-excel.svelte" },
         { title: "6. Excel 100,000 rows", path: "06-excel-100k", file:"./sheet/06-excel-100k.svelte" },
         { title: "7. Excel 1,000,000 rows", path: "07-excel-1M", file:"./sheet/07-excel-1M.svelte" },
         { title: "8. Empty spread sheet", path: "08-empty", file:"./sheet/08-empty.svelte" },
      ],
   },
   {
      title: "Using Node Server with SQL database", path: "server-sql",
      items: [
         { title: "1. Table in SQL database", path: "01-sql-table", file:"./server-sql/01-sql-table.svelte" },
         { title: "2. Table in SQL database and using UTF8Store", path: "02-sql-table-utf8store", file:"./server-sql/02-sql-table-utf8store.svelte" },
         { title: "3. Tree in SQL database", path: "03-sql-tree", file:"./server-sql/03-sql-tree.svelte" },
         { title: "4. Tree in SQL database and using UTF8Store", path: "04-sql-tree-utf8store", file:"./server-sql/04-sql-tree-utf8store.svelte" },
         { title: "5. Grid in SQL database", path: "05-sql-grid", file:"./server-sql/05-sql-grid.svelte" },
         { title: "6. School list and ratings Complex app. in SQL db.", path: "06-sql-schools", file:"./server-sql/06-sql-schools.svelte" },
      ],
   },
   {
      title: "Using Node Server with static files", path: "server-file",
      items: [
         { title: "1. Grid in JSON file", path: "01-file-json", file:"./server-file/01-file-json.svelte" },
         { title: "2. Grid in UTF8Store file", path: "02-file-utf8store", file:"./server-file/02-file-utf8store.svelte" },
         { title: "3. Sheets in JSON File", path: "03-file-sheets", file:"./server-file/03-file-sheets.svelte" },
         { title: "4. Sheets in XLSX File", path: "04-file-xlsx", file:"./server-file/04-file-xlsx.svelte" },
      ],
   },
];

export function flattenTutorials(groups) {
   return groups.flatMap(function(group) {
      return group.items.map(function(item) {
         return {
            ...item,
            groupTitle:group.title,
            groupPath:group.path,
            fullPath:"/"+group.path+"/"+item.path,
            loader:tutorialModules[item.file]
            };
         });
      });
   }

export const tutorials = flattenTutorials(tutorialGroups);