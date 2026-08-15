# fastgrid-svelte — Svelte Data Grid and FastSheet Spreadsheet

[![npm version](https://img.shields.io/npm/v/fastgrid-svelte.svg)](https://www.npmjs.com/package/fastgrid-svelte)
[![npm downloads](https://img.shields.io/npm/dm/fastgrid-svelte.svg)](https://www.npmjs.com/package/fastgrid-svelte)
[![TypeScript](https://img.shields.io/badge/TypeScript-yes-DDFF00.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Svelte 5+](https://img.shields.io/badge/Svelte-5%2B-FF3E00?logo=svelte&logoColor=white)](https://svelte.dev/)

`fastgrid-svelte` is the official Svelte wrapper 
for [**FastGrid**](https://www.treegrid.com/FastGrid.html) 
and [**FastSheet**](https://www.treegrid.com/FastSheet.html)
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

- [FastGrid Svelte integration](https://www.treegrid.com/FDoc/FastGridSvelte.html)
- [FastGrid product page](https://www.treegrid.com/FastGrid)
- [FastSheet product page](https://www.treegrid.com/FastSheet)
- [Documentation index and glossary](https://www.treegrid.com/FDoc/Glossary.htm)
- [API and attribute search](https://www.treegrid.com/FDoc/SearchAttr.html)
- [Live examples](https://www.treegrid.com/Examples)
- [Licensing](https://www.treegrid.com/Licensing)
- [Prices](https://www.treegrid.com/Prices)
- [Purchase](https://www.treegrid.com/Purchase)

## FAQ

### Is `fastgrid-svelte` the official Svelte wrapper for FastGrid?

Yes. It is the official Svelte integration maintained for FastGrid and
FastSheet by COQsoft.

### Is the Svelte wrapper open source?

Yes. The Svelte wrapper source code is open source. The included trial runtime
and externally supplied registered `FGridE.js` are covered by separate
FastGrid/FastSheet trial or commercial terms.

### Does the package include FastGrid?

The default entry point includes an evaluation runtime. Licensed production
applications use the `fastgrid-svelte/registered` entry point with a separately
supplied registered `FGridE.js`.

### Can the wrapper display FastSheet spreadsheets?

Yes. FastGrid and FastSheet use the same runtime and Svelte component.
Available functionality depends on the runtime license and enabled features.

### Does it work with the latest Svelte version?

The peer dependency intentionally supports Svelte 5 and newer without an
upper version limit. Current and future Svelte versions should still be tested
because a future Svelte release can introduce breaking changes.

### Can FastGrid handle millions of rows?

FastGrid is designed for very large datasets and virtual scrolling. Actual
limits and performance depend on the grid configuration, browser, data format
and application logic.

### Does FastGrid replace an HTML table?

FastGrid is intended for interactive data-grid and spreadsheet applications.
For a small static table, a standard HTML `<table>` may be simpler.

### Can I use FastGrid without AI?

Yes. AI integration is optional. FastGrid can be controlled entirely through
its user interface and JavaScript/TypeScript API.

## License

The Svelte wrapper source code is open source under the terms in `LICENSE.md`.

The included trial `FGridE.js` remains commercial COQsoft evaluation software.
Production use requires an appropriate FastGrid/FastSheet license and a
separately supplied registered runtime.
