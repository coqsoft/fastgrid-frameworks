# fastgrid-react — React Data Grid and FastSheet Spreadsheet

[![npm version](https://img.shields.io/npm/v/fastgrid-react.svg)](https://www.npmjs.com/package/fastgrid-react)
[![npm downloads](https://img.shields.io/npm/dm/fastgrid-react.svg)](https://www.npmjs.com/package/fastgrid-react)

`fastgrid-react` is the official React wrapper for **FastGrid** and **FastSheet**
by COQsoft.

Use it to add a high-performance React data grid, React tree grid or React
spreadsheet to a JavaScript or TypeScript application. FastGrid provides
virtual scrolling, large-dataset rendering, editable cells, sorting, filtering,
grouping, pivoting, tree data, formulas, XLSX/CSV import and export, charts,
conditional formatting and AI-assisted grid operations.

[React integration documentation](https://www.treegrid.com/FDoc/FastGridReact.html) ·
[FastGrid](https://www.treegrid.com/FastGrid) ·
[FastSheet](https://www.treegrid.com/FastSheet)

## Installation

```bash
npm install fastgrid-react
```

## Quick start

```jsx
import { useMemo, useRef } from "react";
import { FastGrid } from "fastgrid-react";

export default function App() {
   const gridRef = useRef(null);

   const src = useMemo(() => ({
      Cols: [
         { id: "Name", Width: 180 },
         { id: "Country", Width: 140 },
         { id: "Orders", Type: "Number", Width: 100 }
      ],
      Head: [{
         D: "Header",
         V: {
            Name: "Customer",
            Country: "Country",
            Orders: "Orders"
         }
      }],
      Body: [
         { V: { Name: "Alice", Country: "United States", Orders: 120 } },
         { V: { Name: "Bob", Country: "Germany", Orders: 85 } },
         { V: { Name: "Carol", Country: "Japan", Orders: 164 } }
      ]
   }), []);

   return (
      <FastGrid
         ref={gridRef}
         src={src}
         style={{ height: 500, width: "100%" }}
      />
   );
}
```

## Trial and registered runtime

The default entry point contains the FastGrid/FastSheet trial runtime:

```jsx
import { FastGrid } from "fastgrid-react";
```

For a purchased runtime, use:

```jsx
import { FastGrid } from "fastgrid-react/registered";
```

The registered entry point does not load `FGridE.js`. Supply the registered
runtime separately:

```html
<script src="/FGridE.js"></script>
```

or:

```js
import "./FGridE.js";
```

Do not publish a registered `FGridE.js` or serial code to npm or GitHub.

## FastGrid and FastSheet

Both products use the same runtime.

Use FastGrid for:

- React data grids and editable data tables;
- tree grids and hierarchical data;
- virtual scrolling over very large datasets;
- sorting, filtering, grouping and searching;
- pivot grids and aggregation;
- row and column sets;
- XLSX, CSV, HTML and PDF export.

Use FastSheet for:

- browser-based spreadsheets;
- XLSX workbook and sheet editing;
- formulas;
- spreadsheet formatting;
- images and charts;
- multiple worksheets;
- AI-assisted spreadsheet operations.

## Accessing the API with `ref`

```jsx
import { useRef } from "react";
import { FastGrid } from "fastgrid-react";

function Example() {
   const gridRef = useRef(null);

   function readValue() {
      console.log(gridRef.current?.Get(1, "A"));
   }

   function writeValue() {
      gridRef.current?.Set(1, "A", "", "Updated", 1);
   }

   return (
      <>
         <FastGrid ref={gridRef} src={src} />
         <button onClick={readValue}>Read value</button>
         <button onClick={writeValue}>Write value</button>
      </>
   );
}
```

The wrapper forwards the FastGrid API through the React ref:

```js
gridRef.current?.Get(...)
gridRef.current?.Set(...)
gridRef.current?.GetValue(...)
gridRef.current?.Reload(...)
gridRef.current?.Export(...)
```

## React event props

FastGrid events are exposed as React props:

```jsx
<FastGrid
   src={src}
   onSetValue={onSetValue}
   onReady={onReady}
   onClick={onClick}
/>
```

The wrapper maps:

```text
onSetValue → FastGrid OnSetValue
onReady    → FastGrid OnReady
onClick    → FastGrid OnClick
onFilter   → FastGrid OnFilter
onSort     → FastGrid OnSort
onSave     → FastGrid OnSave
```

Example:

```jsx
function onSetValue(grid, row, col, value, changes) {
   if(changes && row && col) {
      console.log("Changed", row.id, col.id, value);
   }
}

function onClick(grid, row, col) {
   if(row && col) {
      console.log("Clicked", row.id, col.id);
   }
}
```

## TypeScript

The package includes TypeScript declarations for the React wrapper and the
FastGrid API.

```tsx
import { useRef } from "react";
import { FastGrid } from "fastgrid-react";

const gridRef = useRef<TGrid | null>(null);

function onSetValue(
   grid: TGrid,
   row?: TRow,
   col?: TCol,
   value?: unknown,
   changes?: number
): void {
   console.log(grid.id, row?.id, col?.id, value, changes);
}
```

## Large datasets and virtual scrolling

FastGrid is designed for large browser datasets and uses virtualized rendering
to avoid creating DOM nodes for every row and cell.

Benchmark your real configuration because performance depends on:

- browser and device;
- row and column layout;
- enabled features;
- custom formulas and event handlers;
- HTML cell content;
- data format and loading strategy.

## AI-assisted React data grids

FastGrid can expose grid structure, data descriptions, permissions and custom API
functions to an AI provider. Depending on configuration, AI can assist with:

- searching and analyzing grid data;
- filtering, sorting and grouping;
- selecting or editing cells;
- generating formulas;
- manipulating large spreadsheets;
- exporting and formatting.

Never place a production AI API key directly in a public React bundle. Use a
secured server-side bridge or another approved credential mechanism.

## React SSR and browser rendering

The FastGrid runtime is browser-oriented. With Next.js, Remix, Astro or another
SSR framework, initialize the component only in the browser when required by the
runtime and application architecture.

## Documentation

- [FastGrid](https://www.treegrid.com/FastGrid)
- [FastSheet](https://www.treegrid.com/FastSheet)
- [Documentation index](https://www.treegrid.com/FDoc/Glossary.htm)
- [API and attribute search](https://www.treegrid.com/FDoc/SearchAttr.html)
- [Live examples](https://www.treegrid.com/Examples)
- [Licensing](https://www.treegrid.com/Licensing)

## License

The React wrapper source code is open source under the terms in `LICENSE.md`.

The included trial `FGridE.js` and any generated or embedded representation of
that runtime remain commercial COQsoft evaluation software. Production use
requires an appropriate FastGrid/FastSheet license and an externally supplied
registered runtime.
