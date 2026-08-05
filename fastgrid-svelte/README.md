# fastgrid-svelte — Svelte Data Grid and FastSheet Spreadsheet

[![npm version](https://img.shields.io/npm/v/fastgrid-svelte.svg)](https://www.npmjs.com/package/fastgrid-svelte)
[![npm downloads](https://img.shields.io/npm/dm/fastgrid-svelte.svg)](https://www.npmjs.com/package/fastgrid-svelte)

`fastgrid-svelte` is the official Svelte 5 wrapper for **FastGrid** and FastSheet
by COQsoft.

Use it to add a high-performance Svelte data grid, Svelte tree grid or Svelte
spreadsheet to a JavaScript or TypeScript application. FastGrid supports virtual
scrolling, large datasets, editable cells, sorting, filtering, grouping,
pivoting, hierarchical data, formulas, XLSX/CSV import and export, charts,
conditional formatting and AI-assisted data operations.

[Svelte integration documentation](https://www.treegrid.com/FDoc/FastGridSvelte.html) ·
[FastGrid](https://www.treegrid.com/FastGrid) ·
[FastSheet](https://www.treegrid.com/FastSheet)

## Installation

```bash
npm install fastgrid-svelte
```

## Quick start

```svelte
<script>
   import { FastGrid } from "fastgrid-svelte";

   const src = {
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
   };
</script>

<FastGrid
   {src}
   style="display:block;width:100%;height:500px"
/>
```

## Trial and registered runtime

The default entry point contains the trial runtime:

```js
import { FastGrid } from "fastgrid-svelte";
```

For a purchased runtime:

```js
import { FastGrid } from "fastgrid-svelte/registered";
```

The registered entry point does not load `FGridE.js`. Load the registered file
separately:

```html
<script src="/FGridE.js"></script>
```

or:

```js
import "./FGridE.js";
```

Do not publish registered `FGridE.js` or serial code.

## FastGrid and FastSheet

Both products use the same `FGridE.js` runtime.

FastGrid is intended for:

- Svelte data grids and editable tables;
- tree grids and hierarchical data;
- virtual scrolling over large datasets;
- sorting, filtering, grouping and searching;
- pivot grids and aggregation;
- formulas and conditional formatting;
- XLSX, CSV, HTML and PDF export.

FastSheet is intended for:

- web spreadsheet and workbook editing;
- XLSX import and export;
- formulas;
- multiple sheets;
- spreadsheet formatting;
- images and charts;
- AI-assisted spreadsheet operations.

## Accessing the API with `bind:this`

```svelte
<script>
   import { FastGrid } from "fastgrid-svelte";

   let grid = null;

   function readValue() {
      console.log(grid?.Get(1, "A"));
   }

   function writeValue() {
      grid?.Set(1, "A", "", "Updated", 1);
   }
</script>

<FastGrid bind:this={grid} {src} />

<button onclick={readValue}>Read value</button>
<button onclick={writeValue}>Write value</button>
```

## Svelte event props

```svelte
<FastGrid
   {src}
   {onSetValue}
   {onReady}
   {onClick}
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

```svelte
<script>
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
</script>
```

## TypeScript

The wrapper includes TypeScript declarations and supports Svelte components
written with `<script lang="ts">`.

```svelte
<script lang="ts">
   import { FastGrid } from "fastgrid-svelte";

   let grid: TGrid | null = null;

   function writeValue(): void {
      grid?.Set(1, "A", "", "Updated", 1);
   }
</script>

<FastGrid bind:this={grid} {src} />
```

## Large datasets and virtual scrolling

FastGrid is designed for large browser datasets with virtualized rendering.
Benchmark your own configuration because performance depends on browser, device,
layout, formulas, event handlers and data loading.

## AI-assisted Svelte data grids

FastGrid can expose grid metadata, data descriptions, permissions and custom API
functions to an AI provider. It can assist with data analysis, filtering,
sorting, grouping, editing, formulas and spreadsheet operations.

Never expose a production AI API key in public Svelte client code. Use a secured
server-side bridge.

## Documentation

- [FastGrid](https://www.treegrid.com/FastGrid)
- [FastSheet](https://www.treegrid.com/FastSheet)
- [Documentation index](https://www.treegrid.com/FDoc/Glossary.htm)
- [API and attribute search](https://www.treegrid.com/FDoc/SearchAttr.html)
- [Live examples](https://www.treegrid.com/Examples)
- [Licensing](https://www.treegrid.com/Licensing)

## License

The Svelte wrapper source code is open source under the terms in `LICENSE.md`.

The included trial `FGridE.js` remains commercial COQsoft evaluation software.
Production use requires an appropriate FastGrid/FastSheet license and a
separately supplied registered runtime.
