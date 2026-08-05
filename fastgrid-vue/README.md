# fastgrid-vue — Vue Data Grid and FastSheet Spreadsheet

[![npm version](https://img.shields.io/npm/v/fastgrid-vue.svg)](https://www.npmjs.com/package/fastgrid-vue)
[![npm downloads](https://img.shields.io/npm/dm/fastgrid-vue.svg)](https://www.npmjs.com/package/fastgrid-vue)

`fastgrid-vue` is the official Vue wrapper for **FastGrid** and **FastSheet**
by COQsoft.

Use it to add a high-performance Vue data grid, Vue tree grid or Vue
spreadsheet to a JavaScript or TypeScript application. FastGrid supports virtual
scrolling, large datasets, editable cells, sorting, filtering, grouping,
pivoting, hierarchical data, formulas, XLSX/CSV import and export, charts,
conditional formatting and AI-assisted operations.

[Vue integration documentation](https://www.treegrid.com/FDoc/FastGridVue.html) ·
[FastGrid](https://www.treegrid.com/FastGrid) ·
[FastSheet](https://www.treegrid.com/FastSheet)

## Installation

```bash
npm install fastgrid-vue
```

## Quick start

```vue
<script setup>
import { FastGrid } from "fastgrid-vue";

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

<template>
   <FastGrid
      :src="src"
      style="display:block;width:100%;height:500px"
   />
</template>
```

## Trial and registered runtime

The default entry point contains the trial FastGrid/FastSheet runtime:

```js
import { FastGrid } from "fastgrid-vue";
```

For a purchased runtime:

```js
import { FastGrid } from "fastgrid-vue/registered";
```

The registered entry point does not load `FGridE.js`. Supply it separately:

```html
<script src="/FGridE.js"></script>
```

or:

```js
import "./FGridE.js";
```

Do not publish registered `FGridE.js` or serial code.

## FastGrid and FastSheet

Both products use the same runtime.

FastGrid is intended for:

- Vue data grids and editable tables;
- tree grids and hierarchical rows;
- virtual scrolling over large datasets;
- sorting, filtering, grouping and searching;
- pivot grids and aggregation;
- formulas and conditional formatting;
- XLSX, CSV, HTML and PDF export.

FastSheet is intended for:

- browser spreadsheet and workbook editing;
- XLSX import and export;
- multiple sheets;
- formulas;
- spreadsheet formatting;
- images and charts;
- AI-assisted spreadsheet operations.

## Accessing the FastGrid API with `ref`

```vue
<script setup>
import { ref } from "vue";
import { FastGrid } from "fastgrid-vue";

const gridRef = ref(null);

function readValue() {
   console.log(gridRef.value?.Get(1, "A"));
}

function writeValue() {
   gridRef.value?.Set(1, "A", "", "Updated", 1);
}
</script>

<template>
   <FastGrid ref="gridRef" :src="src" />
   <button @click="readValue">Read value</button>
   <button @click="writeValue">Write value</button>
</template>
```

## Vue events

FastGrid events are exposed as Vue event props:

```vue
<FastGrid
   :src="src"
   @set-value="onSetValue"
   @ready="onReady"
   @click="onClick"
/>
```

The wrapper maps:

```text
@set-value → FastGrid OnSetValue
@ready     → FastGrid OnReady
@click     → FastGrid OnClick
@filter    → FastGrid OnFilter
@sort      → FastGrid OnSort
@save      → FastGrid OnSave
```

Example:

```js
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

## TypeScript and Vue

The wrapper includes TypeScript declarations and can be used with Vue and
`<script setup lang="ts">`.

```vue
<script setup lang="ts">
import { ref } from "vue";
import { FastGrid } from "fastgrid-vue";

const gridRef = ref<TGrid | null>(null);

function writeValue(): void {
   gridRef.value?.Set(1, "A", "", "Updated", 1);
}
</script>
```

## Large datasets and virtual scrolling

FastGrid is designed for large browser datasets with virtualized rendering.
Actual performance depends on browser, layout, enabled features, formulas, event
handlers and data loading strategy.

## AI-assisted Vue data grids

FastGrid can describe grid structure, data fields, permissions and custom API
functions to an AI provider. It can assist with analysis, filtering, sorting,
grouping, editing, formulas and spreadsheet operations.

Do not expose production AI API keys in a public Vue bundle. Use a secured
server-side bridge.

## Vue SSR

The runtime is browser-oriented. If using Nuxt or another SSR environment,
initialize the grid in a browser-only component or after browser mounting as
appropriate for your application.

## Documentation

- [FastGrid](https://www.treegrid.com/FastGrid)
- [FastSheet](https://www.treegrid.com/FastSheet)
- [Documentation index](https://www.treegrid.com/FDoc/Glossary.htm)
- [API and attribute search](https://www.treegrid.com/FDoc/SearchAttr.html)
- [Live examples](https://www.treegrid.com/Examples)
- [Licensing](https://www.treegrid.com/Licensing)

## License

The Vue wrapper source code is open source under the terms in `LICENSE.md`.

The included trial `FGridE.js` remains commercial COQsoft evaluation software.
Production use requires an appropriate FastGrid/FastSheet license and a
separately supplied registered runtime.
