# fastgrid-angular — Angular Data Grid and FastSheet Spreadsheet

[![npm version](https://img.shields.io/npm/v/fastgrid-angular.svg)](https://www.npmjs.com/package/fastgrid-angular)
[![npm downloads](https://img.shields.io/npm/dm/fastgrid-angular.svg)](https://www.npmjs.com/package/fastgrid-angular)
[![TypeScript](https://img.shields.io/badge/TypeScript-yes-DDFF00.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Angular 17+](https://img.shields.io/badge/Angular-17%2B-FF3E00.svg?logo=angular&logoColor=white)](https://angular.dev/)

`fastgrid-angular` is the official Angular wrapper 
for [**FastGrid**](https://www.treegrid.com/FastGrid.html) 
and [**FastSheet**](https://www.treegrid.com/FastSheet.html)
by COQsoft.

Use it to add a high-performance Angular data grid, Angular tree grid or Angular
spreadsheet to a TypeScript application. FastGrid supports virtual scrolling,
editable cells, large datasets, sorting, filtering, grouping, pivot grids,
hierarchical data, XLSX/CSV import and export, formulas, conditional formatting
and AI-assisted data operations.

[Angular documentation](https://www.treegrid.com/FDoc/FastGridAngular.html) ·
[FastGrid](https://www.treegrid.com/FastGrid) ·
[FastSheet](https://www.treegrid.com/FastSheet) ·
[API documentation](https://www.treegrid.com/FDoc/Glossary.htm)

## Installation

```bash
npm install fastgrid-angular
```

The package contains TypeScript declarations and an Angular standalone
component.

## Angular quick start

```ts
import { Component } from "@angular/core";
import { FastGridComponent } from "fastgrid-angular";

@Component({
   selector: "app-root",
   standalone: true,
   imports: [FastGridComponent],
   template: `
      <fast-grid
         [src]="src"
         style="display:block;width:100%;height:500px">
      </fast-grid>
   `
})
export class AppComponent {
   readonly src = {
      Cols: [
         { id: "Name", Width: 180 },
         { id: "Country", Width: 140 },
         { id: "Orders", Type: "Number", Width: 100 }
      ],
      Head: [
         {
            D: "Header",
            V: {
               Name: "Customer",
               Country: "Country",
               Orders: "Orders"
            }
         }
      ],
      Body: [
         { V: { Name: "Alice", Country: "United States", Orders: 120 } },
         { V: { Name: "Bob", Country: "Germany", Orders: 85 } },
         { V: { Name: "Carol", Country: "Japan", Orders: 164 } }
      ]
   };
}
```

## Create a complete Angular example project

For a ready-to-run project use the official generator:

```bash
npm create fastgrid-angular@latest my-fastgrid-app
```

Available templates include:

- minimal Angular quick start;
- FastGrid and FastSheet tutorials;
- advanced examples with large datasets;
- tree grids and pivot grids;
- XLSX spreadsheet examples;
- optional localhost Node.js server examples.

See [`create-fastgrid-angular`](https://www.npmjs.com/package/create-fastgrid-angular).

## FastGrid trial entry point

The default entry point includes the FastGrid/FastSheet trial runtime:

```ts
import {
   FastGridComponent,
   type FastGridOutputEvent
} from "fastgrid-angular";
```

The trial runtime is initialized automatically when the first grid component is
created. No separate `FGridE.js` script tag is required for evaluation.

```html
<fast-grid [src]="src"></fast-grid>
```

## Registered FastGrid entry point

Licensed applications should use:

```ts
import { FastGridComponent } from "fastgrid-angular/registered";
```

The registered entry point does not contain or automatically load `FGridE.js`.
Load your externally supplied registered runtime before creating the Angular
component.

For example:

```html
<script src="/FGridE.js"></script>
```

or import the licensed runtime from your application source:

```ts
import "./FGridE.js";
```

Do not publish or commit your registered `FGridE.js` or FastGrid serial code.

## FastGrid and FastSheet in one application

FastGrid and FastSheet use the same runtime. One registered `FGridE.js` can
display both data grids and spreadsheet workbooks in the same Angular
application.

Use FastGrid for:

- enterprise data grids;
- editable data tables;
- tree grids and hierarchical data;
- virtual scrolling over very large datasets;
- grouping, sorting, filtering and searching;
- pivot grids and aggregation;
- custom row and column layouts.

Use FastSheet for:

- XLSX files and workbook editing;
- browser-based spreadsheets;
- multiple sheets;
- editable formulas;
- Excel-like formatting;
- spreadsheet images and charts.

## Accessing the FastGrid API with `ViewChild`

```html
<fast-grid #grid [src]="src"></fast-grid>

<button type="button" (click)="readValue()">Read value</button>
<button type="button" (click)="writeValue()">Write value</button>
```

```ts
import { Component, ViewChild } from "@angular/core";
import { FastGridComponent } from "fastgrid-angular";

@Component({
   selector: "app-root",
   standalone: true,
   imports: [FastGridComponent],
   templateUrl: "./app.component.html"
})
export class AppComponent {
   readonly src = {
      Cols: ["A", "B", "C"],
      Head: ["Header"],
      Body: [
         { V: [100, 200, 300] },
         { V: [400, 500, 600] }
      ]
   };

   @ViewChild(FastGridComponent)
   grid!: FastGridComponent;

   readValue(): void {
      console.log(this.grid.Get(1, "A"));
   }

   writeValue(): void {
      this.grid.Set(1, "A", "", "Updated", 1);
   }
}
```

The component exposes the FastGrid API directly and also provides:

```ts
grid.grid
grid.api
grid.getGrid()
```

## Angular inputs

The primary input is `src`:

```html
<fast-grid [src]="src"></fast-grid>
```

`src` can contain:

- a FastGrid JSON configuration object;
- a URL;
- CSV data;
- an XLSX file URL;
- an array combining configuration and data sources;
- workbook and sheet definitions.

You can pass an event map:

```html
<fast-grid [src]="src" [events]="events"></fast-grid>
```

```ts
readonly events = {
   OnReady: (grid: TGrid) => {
      console.log("Ready:", grid.id);
   },
   OnSetValue: (
      grid: TGrid,
      row: TRow,
      col: TCol,
      value: unknown,
      changes: number
   ) => {
      console.log("Changed:", row.id, col.id, value, changes);
   }
};
```

Set `runInsideAngular` to control whether FastGrid callbacks re-enter the Angular
zone:

```html
<fast-grid
   [src]="src"
   [runInsideAngular]="false">
</fast-grid>
```

This can be useful for performance-sensitive grids with frequent events.

## Angular input event handlers

Use an Angular input when the FastGrid event handler needs to return a value:

```html
<fast-grid
   [src]="src"
   [onEndEdit]="onEndEdit">
</fast-grid>
```

```ts
readonly onEndEdit: TFGrid["OnEndEdit"] =
   (grid, row, col, value, save) => {
      if(!save) return null;
      return null;
   };
```

Input event names use the FastGrid event name with a lowercase `on` prefix:

```text
OnClick     → onClick
OnReady     → onReady
OnSetValue  → onSetValue
OnEndEdit   → onEndEdit
```

## Angular output events

Use Angular outputs for notification-style events whose return value is ignored:

```html
<fast-grid
   [src]="src"
   (ready)="onReady($event)"
   (click)="onClick($event)"
   (setValue)="onSetValue($event)">
</fast-grid>
```

```ts
import type { FastGridOutputEvent } from "fastgrid-angular";

onReady(event: FastGridOutputEvent<"ready">): void {
   console.log("FastGrid ready:", event.grid.id);
}

onClick(event: FastGridOutputEvent<"click">): void {
   if(event.row && event.col) {
      console.log("Clicked:", event.row.id, event.col.id);
   }
}

onSetValue(event: FastGridOutputEvent<"setValue">): void {
   console.log("New value:", event.value);
}
```

## Entry points

| Entry point | Description |
| --- | --- |
| `fastgrid-angular` | Angular component with the included trial runtime |
| `fastgrid-angular/registered` | Angular component for an externally supplied registered runtime |
| `fastgrid-angular/core` | Shared Angular wrapper types, event bindings and base implementation |

## Angular compatibility

The package declares Angular 17 and newer as supported peer versions:

```json
{
  "peerDependencies": {
    "@angular/common": ">=17.0.0",
    "@angular/core": ">=17.0.0",
    "rxjs": ">=7.8.0"
  }
}
```

There is intentionally no upper Angular major-version limit. This allows:

```bash
npm install fastgrid-angular
```

in newer Angular projects without requiring a wrapper release only to widen the
peer dependency range.

Future Angular versions can still introduce breaking changes. The current
Angular release should therefore be tested regularly in CI.

## Server-side rendering

The Angular wrapper checks whether it is running in a browser before creating
the FastGrid runtime. The actual data grid is initialized only in the browser.

When using Angular SSR:

- do not access the grid API before the component view is initialized;
- keep browser-only FastGrid operations behind Angular lifecycle checks;
- load a registered `FGridE.js` only in the browser.

## Large datasets and virtual scrolling

FastGrid renders visible cells rather than creating DOM elements for the entire
dataset. It is designed for use cases involving very large row and column
counts, including datasets with millions of records.

Actual performance depends on:

- browser and device;
- row and column layout;
- custom HTML and render logic;
- enabled features;
- data format;
- event handlers;
- network and server architecture.

Use the supplied examples to benchmark your actual application configuration.

## AI-assisted Angular data grids

FastGrid can expose the structure, data and allowed operations of a grid to an
AI provider. Depending on configuration and permissions, AI can assist users
with tasks such as:

- searching and analyzing grid data;
- filtering and sorting;
- grouping;
- selecting rows and cells;
- editing values;
- creating or modifying spreadsheet content;
- generating formulas;
- working with images;
- exporting data.

API keys must not be embedded in public production frontend code. Production
applications should communicate with AI services through an appropriately
secured server-side bridge or another approved credential mechanism.

## Documentation

- [FastGrid Angular integration](https://www.treegrid.com/FDoc/FastGridAngular.html)
- [FastGrid product page](https://www.treegrid.com/FastGrid)
- [FastSheet product page](https://www.treegrid.com/FastSheet)
- [Documentation index and glossary](https://www.treegrid.com/FDoc/Glossary.htm)
- [API and attribute search](https://www.treegrid.com/FDoc/SearchAttr.html)
- [Live examples](https://www.treegrid.com/Examples)
- [Licensing](https://www.treegrid.com/Licensing)
- [Prices](https://www.treegrid.com/Prices)
- [Purchase](https://www.treegrid.com/Purchase)

## FAQ

### Is `fastgrid-angular` the official Angular wrapper for FastGrid?

Yes. It is the official Angular integration maintained for FastGrid and
FastSheet by COQsoft.

### Is the Angular wrapper open source?

Yes. The Angular wrapper source code is open source. The included trial runtime
and externally supplied registered `FGridE.js` are covered by separate
FastGrid/FastSheet trial or commercial terms.

### Does the package include FastGrid?

The default entry point includes an evaluation runtime. Licensed production
applications use the `fastgrid-angular/registered` entry point with a separately
supplied registered `FGridE.js`.

### Can the wrapper display FastSheet spreadsheets?

Yes. FastGrid and FastSheet use the same runtime and Angular component.
Available functionality depends on the runtime license and enabled features.

### Does it work with the latest Angular version?

The peer dependency intentionally supports Angular 17 and newer without an
upper version limit. Current and future Angular versions should still be tested
because a future Angular release can introduce breaking changes.

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

The Angular wrapper source code is open source.

The included trial `FGridE.js` and any generated or embedded representation of
that runtime remain commercial COQsoft evaluation software. Production use
requires an appropriate FastGrid/FastSheet license and an externally supplied
registered runtime.

See `LICENSE.md`, `NOTICE.md` and the official
[licensing information](https://www.treegrid.com/Licensing).
