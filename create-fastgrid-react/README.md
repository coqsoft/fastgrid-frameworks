# create-fastgrid-react

Create ready-to-run React projects for **FastGrid** and **FastSheet**.

The generated projects use the official `fastgrid-react` wrapper and include
an evaluation version of the FastGrid/FastSheet runtime.

## Create a project

```bash
npm create fastgrid-react@latest my-fastgrid-app
```

or:

```bash
npx create-fastgrid-react@latest my-fastgrid-app
```

The CLI asks you to select one of these templates:

|index| Template | Purpose |
| --- | --- | --- |
| 1 | `quick-start` | Minimal React application with one FastGrid |
| 2 | `quick-start-typescript` | Minimal React application with one FastGrid and TypeScript |
| 3 | `tutorials` | Individual FastGrid and FastSheet feature tutorials |
| 4 | `examples` | Advanced grids, spreadsheets, XLSX and optional local Node server examples |


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
demonstrating file, SQLite and PDF integration.

The example server is for localhost development only. Do not deploy it to the
public internet without adding authentication, authorization, path validation,
parameterized SQL, request-size limits, restrictive CORS and secure process
isolation.

## Documentation

- [FastGrid React](https://www.treegrid.com/FDoc/FastGridReact.html)
- [FastGrid](https://www.treegrid.com/FastGrid)
- [FastSheet](https://www.treegrid.com/FastSheet)
- [Documentation index](https://www.treegrid.com/FDoc/Glossary.htm)
- [API and attribute search](https://www.treegrid.com/FDoc/SearchAttr.html)
- [Live examples](https://www.treegrid.com/Examples)
- [Licensing](https://www.treegrid.com/Licensing)

## License

The generator and generated React source code are open source under
the terms in `LICENSE.md`.

The included trial `FGridE.js` remains commercial COQsoft evaluation software.
Production use requires an appropriate FastGrid/FastSheet license and a
separately supplied registered runtime.