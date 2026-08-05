# FastGrid Svelte Quick Start (example)

This folder contains a minimal Svelte + Vite example demonstrating how to use the `fastgrid-svelte` wrapper for `FastGrid` JavaScript grid.

## Install and run this example

```bash
npm install
npm run dev
```


## Using `fastgrid-svelte` in your own project

### Install the package:
```bash
npm install fastgrid-svelte
```

### Import in TypeScript:
```svelte
import { FastGrid } from "fastgrid-svelte";
```

### Minimal usage:
```svelte
<FastGrid src={src} />
```

## Access FastGrid API via grid instance

```svelte
let grid:FastGrid|null = null;

<FastGrid bind:this={grid} {src} />

// later use the API
grid?.Get(1, "A");
grid?.Set(1, "A", "", "XXX", 1);
```

## Assign FastGrid events as Svelte props

```svelte
<FastGrid {src} {onSetValue} {onClick}/>
```

The Svelte wrapper maps:
- `onSetValue` to FastGrid `OnSetValue`
- `onClick` to FastGrid `OnClick`

## Complete usage snippet

```svelte
<script lang="ts">
   import { FastGrid } from "fastgrid-svelte";
   const src = { Cols:["A","B",{id:"C",Width:80}], Head:["Header"], Body:[ { V:[1,2,3] }, { V:{A:4,B:5,C:6} } ] };
   let grid:FastGrid|null = null;
   function readValue() : void { alert("Read value from cell [1,A]: "+grid?.Get(1,"A")); }
   function changeValue(grid:FastGrid|null,row:TRow|string|number,col:TCol|string|number,val:any) : void {
      grid?.Set(row,col,"",val,1);
      }
   const onSetValue:TFGrid["OnSetValue"] = (_grid,row,col,value,changes) => {
      if(changes) console.log("Value "+value+" set to cell ["+row?.id+","+col?.id+"]");
      };
   function onClick(grid?:TGrid,row?:TRow,col?:TCol) : void|boolean|number {
      if(row&&col) console.log("clicked cell ["+row.id+","+col.id+"] with value "+grid?.GetValue(row,col));
      }
   function onReady(grid:TGrid) : void { console.log("FastGrid "+grid?.id+" is ready"); }
</script>
<FastGrid bind:this={grid} {src} {onSetValue} {onClick} {onReady} style="display:inline-block; max-width:100%"/>
<button onclick={readValue}>Read value [1,A]</button>
<button onclick={() => changeValue(grid,1,"A","XXX")}>Change value [1,A]</button>
```

## FastGrid documentation
- Index and glossary: https://www.treegrid.com/FDoc/Glossary.htm
- Search: https://www.treegrid.com/FDoc/SearchAttr.html


## License & commercial use

FastGrid is commercial software.
A license is required to use it in production.

- Licensing: https://www.treegrid.com/Licensing
- Prices: https://www.treegrid.com/Prices
- Purchase: https://www.treegrid.com/Purchase
