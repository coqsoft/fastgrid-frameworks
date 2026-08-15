# fastgrid - FastGrid framework detection CLI

`DO NOT RUN 'npm install fastgrid' → RUN 'npx fastgrid' INSTEAD`

This directory contains the source code of the FastGrid framework detection
CLI.

The unscoped npm package name `fastgrid` is not published because npm rejects it
as too similar to the existing `fast-grid` package.

This source remains available in the public GitHub repository for transparency,
future development and possible publication under a scoped package name.

## Install

Install the official FastGrid wrapper for the frontend framework detected in the
current project.

Supported projects:

- Angular → `fastgrid-angular`
- React → `fastgrid-react`
- Vue → `fastgrid-vue`
- Svelte → `fastgrid-svelte`

## Usage

Run inside an existing project:

```bash
npx fastgrid
```

or:

```bash
npm exec fastgrid
```

The CLI inspects the nearest `package.json` and detects the framework from the
installed dependencies and project files.

## Examples

Angular:

```bash
npx fastgrid
# installs fastgrid-angular
```

React:

```bash
npx fastgrid --framework react
# installs fastgrid-react
```

Vue:

```bash
npx fastgrid --framework vue
# installs fastgrid-vue
```

Svelte:

```bash
npx fastgrid --framework svelte
# installs fastgrid-svelte
```

## Options

```text
--framework <angular|react|vue|svelte>
--pm <npm|pnpm|yarn|bun>
--save-dev
--dry-run
--yes
--help
--version
```

Preview the detected installation without changing the project:

```bash
npx fastgrid --dry-run
```

Force a package manager:

```bash
npx fastgrid --pm pnpm
npx fastgrid --pm yarn
npx fastgrid --pm bun
```

Install the wrapper as a development dependency:

```bash
npx fastgrid --save-dev
```

## Detection rules

The CLI detects:

- Angular from `angular.json`, `@angular/core` or `@angular/cli`;
- React from `react` or `react-dom`;
- Vue from `vue`;
- Svelte from `svelte`, `svelte.config.js` or `svelte.config.ts`.

If multiple frameworks are detected, the CLI asks you to choose one. In
non-interactive mode, pass `--framework` explicitly.

If no framework is detected, the CLI stops without modifying the project.

## Package manager detection

The CLI checks, in order:

1. `packageManager` in the project's `package.json`;
2. `pnpm-lock.yaml`;
3. `yarn.lock` or `.yarn`;
4. `bun.lock` or `bun.lockb`;
5. npm as the default.

## Important behavior

This package is a command-line installer and should not be added as a normal
project dependency.

If you run:

```bash
npm install fastgrid
```

the installation intentionally stops with:

```text
The "fastgrid" package is a command-line installer.
Run npx fastgrid instead.
```

Use the CLI directly instead:

```bash
npx fastgrid
```

or:

```bash
npm exec fastgrid
```

The package allows its install guard to pass when npm/npx is installing it into
the temporary `_npx` cache for immediate execution.

The installed wrapper packages are:

- `fastgrid-angular`
- `fastgrid-react`
- `fastgrid-vue`
- `fastgrid-svelte`

## Products

FastGrid is a high-performance JavaScript and TypeScript data grid for large
datasets, virtual scrolling, tree data, editing, sorting, filtering, grouping,
pivoting, XLSX/CSV import and export, formulas, charts and AI-assisted data
operations.

FastSheet is the spreadsheet-oriented configuration of the same
`FGridE.js` runtime and supports workbook, sheet, XLSX, formulas, formatting,
images, charts and AI-assisted spreadsheet operations.

- FastGrid: https://www.treegrid.com/FastGrid
- FastSheet: https://www.treegrid.com/FastSheet
- Documentation: https://www.treegrid.com/FDoc/Glossary.htm
- Angular: https://www.treegrid.com/FDoc/FastGridAngular.html
- React: https://www.treegrid.com/FDoc/FastGridReact.html
- Vue: https://www.treegrid.com/FDoc/FastGridVue.html
- Svelte: https://www.treegrid.com/FDoc/FastGridSvelte.html
- Licensing: https://www.treegrid.com/Licensing

## Security

The CLI does not execute arbitrary shell strings from `package.json` values.
It uses an allowlist of package names and invokes the selected package manager
without a shell.

## License

The `fastgrid` installer CLI is MIT licensed. The installed FastGrid/FastSheet
wrapper packages and their trial or registered `FGridE.js` runtimes have their
own licensing terms.
