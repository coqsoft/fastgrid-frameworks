# create-fastgrid-svelte

[![npm version](https://img.shields.io/npm/v/create-fastgrid-svelte.svg)](https://www.npmjs.com/package/fastgrid-svelte)
[![npm downloads](https://img.shields.io/npm/dm/create-fastgrid-svelte.svg)](https://www.npmjs.com/package/fastgrid-svelte)
[![TypeScript](https://img.shields.io/badge/TypeScript-yes-DDFF00.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Svelte 5+](https://img.shields.io/badge/Svelte-5%2B-FF3E00?logo=svelte&logoColor=white)](https://svelte.dev/)

Create ready-to-run Svelte projects for 
for [**FastGrid**](https://www.treegrid.com/FastGrid.html) 
and [**FastSheet**](https://www.treegrid.com/FastSheet.html).

The generated projects use the official `fastgrid-svelte` wrapper and include
an evaluation version of the FastGrid/FastSheet runtime.

## Create a project

```bash
npm create fastgrid-svelte@latest my-fastgrid-app
```

or:

```bash
npx create-fastgrid-svelte@latest my-fastgrid-app
```

The CLI asks you to select one of these templates:

|index| Template | Purpose |
| --- | --- | --- |
| 1 | `quick-start` | Minimal Svelte application with one FastGrid |
| 2 | `quick-start-typescript` | Minimal Svelte application with one FastGrid and TypeScript |
| 3 | `tutorials` | Individual FastGrid and FastSheet feature tutorials |
| 4 | `examples` | Advanced grids, spreadsheets, XLSX, large grids, SQL database and optional local Node server examples |


## After generation

```bash
cd my-fastgrid-app
npm install
npm run dev
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

- [FastGrid Svelte integration](https://www.treegrid.com/FDoc/FastGridSvelte.html)
- [FastGrid product page](https://www.treegrid.com/FastGrid)
- [FastSheet product page](https://www.treegrid.com/FastSheet)
- [Documentation index and glossary](https://www.treegrid.com/FDoc/Glossary.htm)
- [API and attribute search](https://www.treegrid.com/FDoc/SearchAttr.html)
- [Live examples](https://www.treegrid.com/Examples)
- [Licensing](https://www.treegrid.com/Licensing)
- [Prices](https://www.treegrid.com/Prices)
- [Purchase](https://www.treegrid.com/Purchase)

## License

The generator and generated Svelte source code are open source under
the terms in `LICENSE.md`.

The included trial `FGridE.js` remains commercial COQsoft evaluation software.
Production use requires an appropriate FastGrid/FastSheet license and a
separately supplied registered runtime.