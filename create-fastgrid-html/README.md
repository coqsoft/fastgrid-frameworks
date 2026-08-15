# create-fastgrid-html — HTML and JavaScript FastGrid starter

[![npm version](https://img.shields.io/npm/v/create-fastgrid-html.svg)](https://www.npmjs.com/package/create-fastgrid-html)
[![npm downloads](https://img.shields.io/npm/dm/create-fastgrid-html.svg)](https://www.npmjs.com/package/create-fastgrid-html)

`create-fastgrid-html` creates ready-to-run HTML and JavaScript projects 
for [**FastGrid**](https://www.treegrid.com/FastGrid.html) 
and [**FastSheet**](https://www.treegrid.com/FastSheet.html).

Use it when you want a browser data grid or spreadsheet without Angular, React,
Vue or Svelte. The generated projects demonstrate FastGrid custom elements,
direct JavaScript API usage, virtual scrolling, tree grids, pivot grids, XLSX
workbooks, CSV data, formulas, charts and AI-assisted operations.

[HTML integration documentation](https://www.treegrid.com/FDoc/FastGridHtml.html) ·
[FastGrid](https://www.treegrid.com/FastGrid) ·
[FastSheet](https://www.treegrid.com/FastSheet)

## Create a project

```bash
npm create fastgrid-html@latest my-fastgrid-app
```

Alternative:

```bash
npx create-fastgrid-html@latest my-fastgrid-app
```

The generator provides:

| Template | Purpose |
| --- | --- |
| `quick-start` | Minimal HTML page with one FastGrid and JavaScript API examples |
| `examples` | FastGrid and FastSheet tutorials, large grids, spreadsheets, XLSX, SQL database and optional local Node server examples |

## Run the generated project

The generated project contains an `index.html`.

For the minimal quick start, open it directly in a browser:

```text
my-fastgrid-app/index.html
```

For tutorials or examples that load local files, use a local HTTP server instead
of opening the file with `file://`:

```bash
npx serve .
```

or:

```bash
python -m http.server 8000
```

Then open the displayed local URL.

## FastGrid in plain HTML

```html
<script src="FGridE.js"></script>

<fast-grid
   id="Grid1"
   src="['Layout1','Events1']"
   style="display:block;height:500px">
</fast-grid>
```

FastGrid can also be created inside an existing HTML element:

```html
<div id="GridTag" style="height:500px"></div>

<script>
   const grid = FGrid.FastGrid(
      {
         Cols: ["A", "B", "C"],
         Head: ["Header"],
         Body: [
            { V: [1, 2, 3] },
            { V: [4, 5, 6] }
         ]
      },
      "GridTag"
   );
</script>
```

## FastGrid JavaScript API

```html
<script>
   const grid = FGrid.Grids.Grid1;

   console.log(grid.Get(1, "A"));
   grid.Set(1, "A", "", "Updated", 1);
</script>
```

## FastGrid events

```html
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

   FGrid.Sources.Events = {
      Events: {
         OnSetValue: onSetValue,
         OnClick: onClick
      }
   };
</script>
```

## FastGrid and FastSheet

FastGrid and FastSheet use the same runtime.

FastGrid is a high-performance JavaScript/TypeScript data grid intended for:

- JavaScript data grids;
- HTML data tables;
- tree grids and hierarchical data;
- virtual scrolling over large datasets;
- editing, sorting, filtering and grouping;
- pivot grids;
- formulas and conditional formatting;
- XLSX, CSV, HTML and PDF export;
- AI-assisted data operations

FastSheet is intended for:

- browser spreadsheet and workbook editing;
- XLSX import and export;
- multiple sheets;
- formulas;
- spreadsheet formatting;
- images and charts;
- AI-assisted spreadsheet operations.

## Trial and registered runtime

The generated project contains the trial `FGridE.js` for evaluation.

Production applications must replace it with an externally supplied registered
runtime obtained under the appropriate COQsoft license.

The registered runtime and serial code must not be published to npm or GitHub.

## Local example server

The advanced examples may contain an optional local Node.js server for
demonstrating file, SQL and PDF integration.

The example server is for localhost development only. Do not deploy it to the
public internet without adding authentication, authorization, path validation,
parameterized SQL, request-size limits, restrictive CORS and secure process
isolation.

## Documentation

- [FastGrid HTML](https://www.treegrid.com/FDoc/FastGridHtml.html)
- [FastGrid](https://www.treegrid.com/FastGrid) with full product description and online examples
- [FastSheet](https://www.treegrid.com/FastSheet) with full product description and online examples
- [Documentation index](https://www.treegrid.com/FDoc/Glossary.htm)
- [API and attribute search](https://www.treegrid.com/FDoc/SearchAttr.html)
- [Live examples](https://www.treegrid.com/Examples)
- [Licensing](https://www.treegrid.com/Licensing)

## License

The generator and generated HTML/JavaScript source code are open source under
the terms in `LICENSE.md`.

The included trial `FGridE.js` remains commercial COQsoft evaluation software.
Production use requires an appropriate FastGrid/FastSheet license and a
separately supplied registered runtime.
