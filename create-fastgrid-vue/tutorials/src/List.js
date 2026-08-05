import { h } from "vue";

const tutorialModules = import.meta.glob("./**/*.vue");

const MissingTutorial = {
   props: { file: String },
   setup(props) {
      return () => h("div", [
         h("h2", "Tutorial not included in this package"),
         h("p", props.file || "")
      ]);
   }
};

function componentFor(file) {
   const loader = tutorialModules[file];
   return loader || MissingTutorial;
};

const tutorialGroups = [
   {
      title: "Quick Start", path: "start",
      items: [
         { title: "1. Quick Start - Grid", path: "01-quick-start-grid", file: "./start/01-quick-start-grid.vue" },
         { title: "2. Advanced Start - Grid + API in Vue", path: "02-advanced-start-grid", file: "./start/02-advanced-start-grid.vue" },
         { title: "3. Quick Start - Sheet", path: "03-quick-start-sheet", file: "./start/03-quick-start-sheet.vue" },
         { title: "4. Quick Start - XLSX", path: "04-quick-start-xlsx", file: "./start/04-quick-start-xlsx.vue" },
      ],
   },
   {
      title: "TypeScript", path: "typescript",
      items: [
         { title: "1. Quick Start - Grid", path: "01-quick-start-grid", file: "./typescript/01-quick-start-grid.vue" },
         { title: "2. Advanced Start - Grid + API in Vue", path: "02-advanced-start-grid", file: "./typescript/02-advanced-start-grid.vue" },
         { title: "3. Quick Start - Sheet", path: "03-quick-start-sheet", file: "./typescript/03-quick-start-sheet.vue" },
         { title: "4. Quick Start - XLSX", path: "04-quick-start-xlsx", file: "./typescript/04-quick-start-xlsx.vue" },
      ],
   },
   {
      title: "Basic", path: "basic",
      items: [
         { title: "1. Basic grid", path: "01-basic-grid", file: "./basic/01-basic-grid.vue" },
         { title: "2. Rows", path: "02-rows", file: "./basic/02-rows.vue" },
         { title: "3. Columns", path: "03-columns", file: "./basic/03-columns.vue" },
         { title: "4. Column sets", path: "04-column-sets", file: "./basic/04-column-sets.vue" },
         { title: "5. Row sets", path: "05-row-sets", file: "./basic/05-row-sets.vue" },
         { title: "6. Defaults", path: "06-defaults", file: "./basic/06-defaults.vue" },
         { title: "7. Manipulate rows & columns", path: "07-manipulate", file: "./basic/07-manipulate.vue" },
         { title: "8. CSV grid", path: "08-csv-grid", file: "./basic/08-csv-grid.vue" },
      ],
   },
   {
      title: "Cells & content", path: "cells",
         items: [
         { title: "1. Values", path: "01-values", file: "./cells/01-values.vue" },
         { title: "2. Attributes", path: "02-attributes", file: "./cells/02-attributes.vue" },
         { title: "3. Cell types, formats & wrap", path: "03-types", file: "./cells/03-types.vue" },
         { title: "4. Cell popup menus - List & Suggest", path: "04-list", file: "./cells/04-list.vue" },
         { title: "5. Cell images & charts", path: "05-images", file: "./cells/05-images.vue" },
         { title: "6. Cell style & border", path: "06-styles", file: "./cells/06-styles.vue" },
         { title: "7. Cell sizes, margins & span", path: "07-sizes", file: "./cells/07-sizes.vue" },
         { title: "8. Toolbar size & position", path: "08-toolbars", file: "./cells/08-toolbars.vue" },
         { title: "9. Permissions & input validation", path: "09-permissions", file: "./cells/09-permissions.vue" },
         { title: "10. Conditional formatting & styling", path: "10-conditional-format", file: "./cells/10-conditional-format.vue" },
      ],
   },
   {
      title: "Tree & grouping", path: "tree",
      items: [
         { title: "1. Row tree", path: "01-row-tree", file: "./tree/01-row-tree.vue" },
         { title: "2. Column tree", path: "02-column-tree", file: "./tree/02-column-tree.vue" },
         { title: "3. Grouping rows to tree", path: "03-grouping-rows", file: "./tree/03-grouping-rows.vue" },
         { title: "4. Grouping columns to tree", path: "04-grouping-columns", file: "./tree/04-grouping-columns.vue" },
         { title: "5. Loading child rows on demand", path: "05-load-children", file: "./tree/05-load-children.vue" },
      ]
   },
   {
      title: "Sorting", path: "sort",
      items: [
         { title: "1. Sorting rows", path: "01-sorting-rows", file: "./sort/01-sorting-rows.vue" },
         { title: "2. Sorting columns", path: "02-sorting-columns", file: "./sort/02-sorting-columns.vue" },
      ]
   },
   {
      title: "Filter & Search", path: "filter",
      items: [
         { title: "1. Filtering rows", path: "01-filtering-rows", file: "./filter/01-filtering-rows.vue" },
         { title: "2. Filtering columns", path: "02-filtering-columns", file: "./filter/02-filtering-columns.vue" },
         { title: "3. Filtering in tree", path: "03-filtering-tree", file: "./filter/03-filtering-tree.vue" },
         { title: "4. Searching in cells", path: "04-search", file: "./filter/04-search.vue" },
      ]
   },
   {
      title: "Dragging", path: "drag",
      items: [
         { title: "1. Dragging & pasting rows", path: "01-dragging-rows", file: "./drag/01-dragging-rows.vue" },
         { title: "2. Dragging & pasting columns", path: "02-dragging-columns", file: "./drag/02-dragging-columns.vue" },
         { title: "3. Dragging from & to external sources", path: "03-dragging-external", file: "./drag/03-dragging-external.vue" },
      ]
   },
   {
      title: "AI", path: "ai",
      items: [
         { title: "1. Grid with AI", path: "01-ai-grid", file: "./ai/01-ai-grid.vue" },
         { title: "2. Sheets with AI", path: "02-ai-sheet", file: "./ai/02-ai-sheet.vue" },
      ]
   },
];

for(const group of tutorialGroups) {
   for(const item of group.items) {
      item.Component = componentFor(item.file);
      }
   }

function flattenTutorials(groups) {
   return groups.flatMap((group) => group.items.map((item) => ({...item, groupTitle: group.title, groupPath: group.path, fullPath: `${group.path}/${item.path}` })));
   }
const tutorials = flattenTutorials(tutorialGroups);

export { tutorialGroups, tutorials, flattenTutorials };
