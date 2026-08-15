# create-fastgrid

[![npm version](https://img.shields.io/npm/v/create-fastgrid.svg)](https://www.npmjs.com/package/create-fastgrid-html)
[![npm downloads](https://img.shields.io/npm/dm/create-fastgrid.svg)](https://www.npmjs.com/package/create-fastgrid-html)
[![React 16.14+](https://img.shields.io/badge/React-16.14%2B-FF3E00?logo=react&logoColor=white)](https://react.dev/)
[![Angular 17+](https://img.shields.io/badge/Angular-17%2B-FF3E00.svg)](https://angular.dev/)
[![Vue 3.2+](https://img.shields.io/badge/Vue-3.2%2B-FF3E00?logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![Svelte 5+](https://img.shields.io/badge/Svelte-5%2B-FF3E00?logo=svelte&logoColor=white)](https://svelte.dev/)

Choose and run the official 
[**FastGrid**](https://www.treegrid.com/FastGrid.html) 
and [**FastSheet**](https://www.treegrid.com/FastSheet.html)
starter generator for Angular, React, Vue,
Svelte or plain HTML/JavaScript.

## Usage

```bash
npm create fastgrid@latest my-fastgrid-app
```

Alternative:

```bash
npx create-fastgrid@latest my-fastgrid-app
```

The CLI asks which generator to run:

| Choice | Generator | Framework |
| --- | --- | --- |
| 1 | `create-fastgrid-angular` | Angular |
| 2 | `create-fastgrid-react` | React |
| 3 | `create-fastgrid-vue` | Vue |
| 4 | `create-fastgrid-svelte` | Svelte |
| 5 | `create-fastgrid-html` | HTML and JavaScript |

## What the package does

The selector package does not contain all framework templates. It selects and
runs one of the official packages:

```text
create-fastgrid-angular
create-fastgrid-react
create-fastgrid-vue
create-fastgrid-svelte
create-fastgrid-html
```

The selected generator then creates the actual project and installs the
corresponding wrapper:

```text
Angular → fastgrid-angular
React   → fastgrid-react
Vue     → fastgrid-vue
Svelte  → fastgrid-svelte
HTML    → no framework wrapper
```

## Important behavior

This package is intentionally a CLI and does not use a `postinstall` script.
Installing `create-fastgrid` does not silently modify another project.

The CLI runs the selected generator through `npx`:

```text
npx --yes create-fastgrid-react@latest my-app
```

The selected generator is therefore resolved from the npm registry at the time
the command is run.

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

- [FastGrid Angular integration](https://www.treegrid.com/FDoc/FastGridAngular.html)
- [FastGrid React integration](https://www.treegrid.com/FDoc/FastGridReact.html)
- [FastGrid Vue integration](https://www.treegrid.com/FDoc/FastGridVue.html)
- [FastGrid Svelte integration](https://www.treegrid.com/FDoc/FastGridSvelte.html)
- [FastGrid HTML & JavaScript integration](https://www.treegrid.com/FDoc/FastGridHtml.html)
- [FastGrid product page](https://www.treegrid.com/FastGrid)
- [FastSheet product page](https://www.treegrid.com/FastSheet)
- [Documentation index and glossary](https://www.treegrid.com/FDoc/Glossary.htm)
- [API and attribute search](https://www.treegrid.com/FDoc/SearchAttr.html)
- [Live examples](https://www.treegrid.com/Examples)
- [Licensing](https://www.treegrid.com/Licensing)
- [Prices](https://www.treegrid.com/Prices)
- [Purchase](https://www.treegrid.com/Purchase)

## License

The `create-fastgrid` selector CLI is MIT licensed.

The selected `create-fastgrid-*` generators, framework wrappers and
FastGrid/FastSheet trial or registered runtimes have their own licenses and
notices.
