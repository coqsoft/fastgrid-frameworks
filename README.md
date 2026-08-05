# FastGrid framework integrations

Official open-source framework wrappers, project generators, tutorials and
examples for **FastGrid** and **FastSheet** by **COQsoft**.

FastGrid is a high-performance JavaScript and TypeScript data grid for
applications that need to display, edit and analyze large datasets in the
browser. FastSheet uses the same `FGridE.js` runtime with spreadsheet-oriented
features, including workbook and XLSX editing.

[FastGrid](https://www.treegrid.com/FastGrid) ·
[FastSheet](https://www.treegrid.com/FastSheet) ·
[Documentation](https://www.treegrid.com/FDoc/Glossary.htm) ·
[Examples](https://www.treegrid.com/Examples) ·
[Licensing](https://www.treegrid.com/Licensing)

## Install FastGrid for your framework

| Framework | Wrapper | Project generator | Documentation |
| --- | --- | --- | --- |
| Angular | `npm install fastgrid-angular` | `npm create fastgrid-angular@latest` | [Angular integration](https://www.treegrid.com/FDoc/FastGridAngular.html) |
| React | `npm install fastgrid-react` | `npm create fastgrid-react@latest` | [React integration](https://www.treegrid.com/FDoc/FastGridReact.html) |
| Vue | `npm install fastgrid-vue` | `npm create fastgrid-vue@latest` | [Vue integration](https://www.treegrid.com/FDoc/FastGridVue.html) |
| Svelte | `npm install fastgrid-svelte` | `npm create fastgrid-svelte@latest` | [Svelte integration](https://www.treegrid.com/FDoc/FastGridSvelte.html) |
| HTML / JavaScript | — | `npm create fastgrid-html@latest` | [HTML integration](https://www.treegrid.com/FDoc/FastGridHtml.html) |

## Packages

### Framework wrappers

- [`fastgrid-angular`](https://www.npmjs.com/package/fastgrid-angular) —
  official Angular data grid and spreadsheet wrapper.
- [`fastgrid-react`](https://www.npmjs.com/package/fastgrid-react) —
  official React data grid and spreadsheet wrapper.
- [`fastgrid-vue`](https://www.npmjs.com/package/fastgrid-vue) —
  official Vue data grid and spreadsheet wrapper.
- [`fastgrid-svelte`](https://www.npmjs.com/package/fastgrid-svelte) —
  official Svelte data grid and spreadsheet wrapper.

### Project generators

- [`create-fastgrid-angular`](https://www.npmjs.com/package/create-fastgrid-angular)
- [`create-fastgrid-react`](https://www.npmjs.com/package/create-fastgrid-react)
- [`create-fastgrid-vue`](https://www.npmjs.com/package/create-fastgrid-vue)
- [`create-fastgrid-svelte`](https://www.npmjs.com/package/create-fastgrid-svelte)
- [`create-fastgrid-html`](https://www.npmjs.com/package/create-fastgrid-html)

The generators create ready-to-run starter applications, tutorials and advanced
examples without requiring developers to manually configure the framework
wrapper.

## What is FastGrid?

FastGrid is a browser-based data grid and tree grid designed for demanding web
applications and large datasets.

Core capabilities include:

- virtual scrolling for millions of rows or columns;
- editable cells with validation, formatting and Excel-like keyboard control;
- row and column sorting, filtering, searching and grouping;
- hierarchical rows, hierarchical columns and tree data;
- pivot grids and aggregation;
- independent scrollable and resizable row and column sections;
- different column sets per row and different row sets per column section;
- copy and paste with spreadsheet applications;
- JSON, CSV and XLSX import;
- XLSX, CSV, HTML and PDF export;
- formulas and calculated values;
- conditional formatting;
- cell images, charts and custom icons;
- responsive layouts and touch support;
- TypeScript API definitions;
- AI-assisted data analysis and grid control.

## What is FastSheet?

FastSheet is the spreadsheet-oriented configuration of the same FastGrid
runtime. A single `FGridE.js` can support both FastGrid data grids and FastSheet
workbooks in one web application.

FastSheet is intended for use cases such as:

- opening and editing XLSX files in the browser;
- large web spreadsheets;
- multiple sheets and workbooks;
- editable formulas;
- importing and exporting spreadsheet files;
- spreadsheet formatting, images and charts;
- AI-assisted spreadsheet operations.

## FastGrid compared with a basic HTML table

A basic HTML table is suitable for small, mostly static datasets. FastGrid is
intended for interactive applications that require editing, virtual scrolling,
tree structures, grouping, pivoting, formulas, advanced export or millions of
records.

FastGrid is a JavaScript data grid component, not a CSS table layout library.

## Trial runtime and production runtime

The public framework packages contain an evaluation version of the
FastGrid/FastSheet runtime.

- Wrapper, generator and example source code: open source.
- Included trial `FGridE.js`: commercial evaluation software.
- Registered `FGridE.js`: supplied separately to licensed customers and must
  not be committed to this public repository or published to npm.

Production applications replace the trial runtime with an externally supplied
registered `FGridE.js`.

## Repository structure

```text
fastgrid-angular/
fastgrid-react/
fastgrid-vue/
fastgrid-svelte/

create-fastgrid-angular/
create-fastgrid-react/
create-fastgrid-vue/
create-fastgrid-svelte/
create-fastgrid-html/
```

Every public npm package has its own README, license notice and package metadata.

## Documentation

- [FastGrid product page](https://www.treegrid.com/FastGrid)
- [FastSheet product page](https://www.treegrid.com/FastSheet)
- [Documentation index and glossary](https://www.treegrid.com/FDoc/Glossary.htm)
- [API and attribute search](https://www.treegrid.com/FDoc/SearchAttr.html)
- [Live examples](https://www.treegrid.com/Examples)
- [Angular integration](https://www.treegrid.com/FDoc/FastGridAngular.html)
- [React integration](https://www.treegrid.com/FDoc/FastGridReact.html)
- [Vue integration](https://www.treegrid.com/FDoc/FastGridVue.html)
- [Svelte integration](https://www.treegrid.com/FDoc/FastGridSvelte.html)
- [HTML and JavaScript integration](https://www.treegrid.com/FDoc/FastGridHtml.html)

## Support and issue reporting

Use GitHub Issues for reproducible problems in the open-source wrappers,
generators and examples.

For FastGrid/FastSheet runtime support, licensing or commercial questions,
contact COQsoft through the official support channels documented at
[treegrid.com](https://www.treegrid.com).

Security vulnerabilities should be reported privately according to the
repository security policy.

## Licensing

The framework wrappers, generators and example source code are open source.

The trial and registered FastGrid/FastSheet `FGridE.js` runtime is distributed
under separate COQsoft trial or commercial licensing terms. See the repository
license and notice files for the exact scope.
