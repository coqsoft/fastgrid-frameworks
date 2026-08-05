const tutorialModules = import.meta.glob("./**/*.svelte");

export const tutorialGroups = [
   {
      title:"Quick Start", path:"start",
      items:[
         { title:"1. Quick Start - Grid", path:"01-quick-start-grid", file:"./start/01-quick-start-grid.svelte" },
         { title:"2. Advanced Start - Grid + API in Svelte", path:"02-advanced-start-grid", file:"./start/02-advanced-start-grid.svelte" },
         { title:"3. Quick Start - Sheet", path:"03-quick-start-sheet", file:"./start/03-quick-start-sheet.svelte" },
         { title:"4. Quick Start - XLSX", path:"04-quick-start-xlsx", file:"./start/04-quick-start-xlsx.svelte" },
         ]
      },
   {
      title:"TypeScript", path:"typescript",
      items:[
         { title:"1. Quick Start - Grid", path:"01-quick-start-grid", file:"./typescript/01-quick-start-grid.svelte" },
         { title:"2. Advanced Start - Grid + API in Svelte", path:"02-advanced-start-grid", file:"./typescript/02-advanced-start-grid.svelte" },
         { title:"3. Quick Start - Sheet", path:"03-quick-start-sheet", file:"./typescript/03-quick-start-sheet.svelte" },
         { title:"4. Quick Start - XLSX", path:"04-quick-start-xlsx", file:"./typescript/04-quick-start-xlsx.svelte" },
         ]
      },
   {
      title:"Basic", path:"basic",
      items:[
         { title:"1. Basic grid", path:"01-basic-grid", file:"./basic/01-basic-grid.svelte" },
         { title:"2. Rows", path:"02-rows", file:"./basic/02-rows.svelte" },
         { title:"3. Columns", path:"03-columns", file:"./basic/03-columns.svelte" },
         { title:"4. Column sets", path:"04-column-sets", file:"./basic/04-column-sets.svelte" },
         { title:"5. Row sets", path:"05-row-sets", file:"./basic/05-row-sets.svelte" },
         { title:"6. Defaults", path:"06-defaults", file:"./basic/06-defaults.svelte" },
         { title:"7. Manipulate rows & columns", path:"07-manipulate", file:"./basic/07-manipulate.svelte" },
         { title:"8. CSV grid", path:"08-csv-grid", file:"./basic/08-csv-grid.svelte" },
         ]
      },
   {
      title:"Cells & content", path:"cells",
      items:[
         { title:"1. Values", path:"01-values", file:"./cells/01-values.svelte" },
         { title:"2. Attributes", path:"02-attributes", file:"./cells/02-attributes.svelte" },
         { title:"3. Cell types, formats & wrap", path:"03-types", file:"./cells/03-types.svelte" },
         { title:"4. Cell popup menus - List & Suggest", path:"04-list", file:"./cells/04-list.svelte" },
         { title:"5. Cell images & charts", path:"05-images", file:"./cells/05-images.svelte" },
         { title:"6. Cell style & border", path:"06-styles", file:"./cells/06-styles.svelte" },
         { title:"7. Cell sizes, margins & span", path:"07-sizes", file:"./cells/07-sizes.svelte" },
         { title:"8. Toolbar size & position", path:"08-toolbars", file:"./cells/08-toolbars.svelte" },
         { title:"9. Permissions & input validation", path:"09-permissions", file:"./cells/09-permissions.svelte" },
         { title:"10. Conditional formatting & styling", path:"10-conditional-format", file:"./cells/10-conditional-format.svelte" },
         ]
      },
   {
      title:"Tree & grouping", path:"tree",
      items:[
         { title:"1. Row tree", path:"01-row-tree", file:"./tree/01-row-tree.svelte" },
         { title:"2. Column tree", path:"02-column-tree", file:"./tree/02-column-tree.svelte" },
         { title:"3. Grouping rows to tree", path:"03-grouping-rows", file:"./tree/03-grouping-rows.svelte" },
         { title:"4. Grouping columns to tree", path:"04-grouping-columns", file:"./tree/04-grouping-columns.svelte" },
         { title:"5. Loading child rows on demand", path:"05-load-children", file:"./tree/05-load-children.svelte" },
         ]
      },
   {
      title:"Sorting", path:"sort",
      items:[
         { title:"1. Sorting rows", path:"01-sorting-rows", file:"./sort/01-sorting-rows.svelte" },
         { title:"2. Sorting columns", path:"02-sorting-columns", file:"./sort/02-sorting-columns.svelte" },
         ]
      },
   {
      title:"Filter & Search", path:"filter",
      items:[
         { title:"1. Filtering rows", path:"01-filtering-rows", file:"./filter/01-filtering-rows.svelte" },
         { title:"2. Filtering columns", path:"02-filtering-columns", file:"./filter/02-filtering-columns.svelte" },
         { title:"3. Filtering in tree", path:"03-filtering-tree", file:"./filter/03-filtering-tree.svelte" },
         { title:"4. Searching in cells", path:"04-search", file:"./filter/04-search.svelte" },
         ]
      },
   {
      title:"Dragging", path:"drag",
      items:[
         { title:"1. Dragging & pasting rows", path:"01-dragging-rows", file:"./drag/01-dragging-rows.svelte" },
         { title:"2. Dragging & pasting columns", path:"02-dragging-columns", file:"./drag/02-dragging-columns.svelte" },
         { title:"3. Dragging from & to external sources", path:"03-dragging-external", file:"./drag/03-dragging-external.svelte" },
         ]
      },
   {
      title:"AI", path:"ai",
      items:[
         { title:"1. Grid with AI", path:"01-ai-grid", file:"./ai/01-ai-grid.svelte" },
         { title:"2. Sheets with AI", path:"02-ai-sheet", file:"./ai/02-ai-sheet.svelte" },
         ]
      }
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
