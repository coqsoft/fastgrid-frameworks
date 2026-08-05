import { lazy } from "react";

export const tutorialGroups = [
   {
      title: "Quick Start", path: "start",
      items: [
         { title: "1. Quick Start - Grid", path: "01-quick-start-grid", Component: lazy(() => import("./start/01-quick-start-grid.jsx")) },
         { title: "2. Advanced Start - Grid + API in React", path: "02-advanced-start-grid", Component: lazy(() => import("./start/02-advanced-start-grid.jsx")) },
         { title: "3. Quick Start - Sheet", path: "03-quick-start-sheet", Component: lazy(() => import("./start/03-quick-start-sheet.jsx")) },
         { title: "4. Quick Start - XLSX", path: "04-quick-start-xlsx", Component: lazy(() => import("./start/04-quick-start-xlsx.jsx")) },
      ],
   },
   {
      title: "TypeScript", path: "typescript",
      items: [
         { title: "1. Quick Start - Grid", path: "01-quick-start-grid", Component: lazy(() => import("./typescript/01-quick-start-grid.tsx")) },
         { title: "2. Advanced Start - Grid + API in React", path: "02-advanced-start-grid", Component: lazy(() => import("./typescript/02-advanced-start-grid.tsx")) },
         { title: "3. Quick Start - Sheet", path: "03-quick-start-sheet", Component: lazy(() => import("./typescript/03-quick-start-sheet.tsx")) },
         { title: "4. Quick Start - XLSX", path: "04-quick-start-xlsx", Component: lazy(() => import("./typescript/04-quick-start-xlsx.tsx")) },
      ],
   },
   {
      title: "Basic", path: "basic",
      items: [
         { title: "1. Basic grid", path: "01-basic-grid", Component: lazy(() => import("./basic/01-basic-grid.jsx")) },
         { title: "2. Rows", path: "02-rows", Component: lazy(() => import("./basic/02-rows.jsx")) },
         { title: "3. Columns", path: "03-columns", Component: lazy(() => import("./basic/03-columns.jsx")) },
         { title: "4. Column sets", path: "04-column-sets", Component: lazy(() => import("./basic/04-column-sets.jsx")) },
         { title: "5. Row sets", path: "05-row-sets", Component: lazy(() => import("./basic/05-row-sets.jsx")) },
         { title: "6. Defaults", path: "06-defaults", Component: lazy(() => import("./basic/06-defaults.jsx")) },
         { title: "7. Manipulate rows & columns", path: "07-manipulate", Component: lazy(() => import("./basic/07-manipulate.jsx")) },
         { title: "8. CSV grid", path: "08-csv-grid", Component: lazy(() => import("./basic/08-csv-grid.jsx")) },
      ],
   },
   {
      title: "Cells & content", path: "cells",
         items: [
         { title: "1. Values", path: "01-values", Component: lazy(() => import("./cells/01-values.jsx")) },
         { title: "2. Attributes", path: "02-attributes", Component: lazy(() => import("./cells/02-attributes.jsx")) },
         { title: "3. Cell types, formats & wrap", path: "03-types", Component: lazy(() => import("./cells/03-types.jsx")) },
         { title: "4. Cell popup menus - List & Suggest", path: "04-list", Component: lazy(() => import("./cells/04-list.jsx")) },
         { title: "5. Cell images & charts", path: "05-images", Component: lazy(() => import("./cells/05-images.jsx")) },
         { title: "6. Cell style & border", path: "06-styles", Component: lazy(() => import("./cells/06-styles.jsx")) },
         { title: "7. Cell sizes, margins & span", path: "07-sizes", Component: lazy(() => import("./cells/07-sizes.jsx")) },
         { title: "8. Toolbar size & position", path: "08-toolbars", Component: lazy(() => import("./cells/08-toolbars.jsx")) },
         { title: "9. Permissions & input validation", path: "09-permissions", Component: lazy(() => import("./cells/09-permissions.jsx")) },
         { title: "10. Conditional formatting & styling", path: "10-conditional-format", Component: lazy(() => import("./cells/10-conditional-format.jsx")) },
      ],
   },
   {
      title: "Tree & grouping", path: "tree",
      items: [
         { title: "1. Row tree", path: "01-row-tree", Component: lazy(() => import("./tree/01-row-tree.jsx")) },
         { title: "2. Column tree", path: "02-column-tree", Component: lazy(() => import("./tree/02-column-tree.jsx")) },
         { title: "3. Grouping rows to tree", path: "03-grouping-rows", Component: lazy(() => import("./tree/03-grouping-rows.jsx")) },
         { title: "4. Grouping columns to tree", path: "04-grouping-columns", Component: lazy(() => import("./tree/04-grouping-columns.jsx")) },
         { title: "5. Loading child rows on demand", path: "05-load-children", Component: lazy(() => import("./tree/05-load-children.jsx")) },
      ]
   },
   {
      title: "Sorting", path: "sort",
      items: [
         { title: "1. Sorting rows", path: "01-sorting-rows", Component: lazy(() => import("./sort/01-sorting-rows.jsx")) },
         { title: "2. Sorting columns", path: "02-sorting-columns", Component: lazy(() => import("./sort/02-sorting-columns.jsx")) },
      ]
   },
   {
      title: "Filter & Search", path: "filter",
      items: [
         { title: "1. Filtering rows", path: "01-filtering-rows", Component: lazy(() => import("./filter/01-filtering-rows.jsx")) },
         { title: "2. Filtering columns", path: "02-filtering-columns", Component: lazy(() => import("./filter/02-filtering-columns.jsx")) },
         { title: "3. Filtering in tree", path: "03-filtering-tree", Component: lazy(() => import("./filter/03-filtering-tree.jsx")) },
         { title: "4. Searching in cells", path: "04-search", Component: lazy(() => import("./filter/04-search.jsx")) },
      ]
   },
   {
      title: "Dragging", path: "drag",
      items: [
         { title: "1. Dragging & pasting rows", path: "01-dragging-rows", Component: lazy(() => import("./drag/01-dragging-rows.jsx")) },
         { title: "2. Dragging & pasting columns", path: "02-dragging-columns", Component: lazy(() => import("./drag/02-dragging-columns.jsx")) },
         { title: "3. Dragging from & to external sources", path: "03-dragging-external", Component: lazy(() => import("./drag/03-dragging-external.jsx")) },
      ]
   },
   {
      title: "AI", path: "ai",
      items: [
         { title: "1. Grid with AI", path: "01-ai-grid", Component: lazy(() => import("./ai/01-ai-grid.jsx")) },
         { title: "2. Sheets with AI", path: "02-ai-sheet", Component: lazy(() => import("./ai/02-ai-sheet.jsx")) },
      ]
   },
];

export function flattenTutorials(groups) {
   return groups.flatMap((group) => group.items.map((item) => ({...item, groupTitle: group.title, groupPath: group.path, fullPath: `${group.path}/${item.path}` })));
   }
export const tutorials = flattenTutorials(tutorialGroups);
