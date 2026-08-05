# FastGrid website metadata

This directory contains source metadata for the official FastGrid and FastSheet
documentation website.

## Published paths

The files are not npm packages. They are deployed or copied into the public
TreeGrid website:

```text
website/llms.txt
  -> https://www.treegrid.com/llms.txt
```

The JSON-LD files are source files for the canonical documentation pages:

```text
FastGridAngular.jsonld
  -> /FDoc/FastGridAngular.html

FastGridReact.jsonld
  -> /FDoc/FastGridReact.html

FastGridVue.jsonld
  -> /FDoc/FastGridVue.html

FastGridSvelte.jsonld
  -> /FDoc/FastGridSvelte.html

FastGridHtml.jsonld
  -> /FDoc/FastGridHtml.html
```

The JSON-LD files should be embedded into the corresponding HTML page inside:

```html
<script type="application/ld+json">
  ...
</script>
```

Do not only link to the `.jsonld` file from the HTML page. The structured data
must be present in the rendered page source and must match visible page content.

Update package versions in the JSON-LD files when a new public package release
is published.