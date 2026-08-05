# FastGrid React Quick Start with TypeScript (example)

This folder contains a minimal React + Vite example demonstrating how to use the `fastgrid-react` wrapper for `FastGrid` JavaScript grid in TypeScript project.

## Install and run this example

```bash
npm install
npm run dev
```


## Using `fastgrid-react` in your own project

### Install the package:
```bash
npm install fastgrid-react
```

### Import:
```tsx
import { FastGrid } from "fastgrid-react";
```

### Minimal usage:
```tsx
<FastGrid src={src} />
```

## Access FastGrid API via `ref`

```tsx
const gridRef = useRef<TGrid|null>(null);

<FastGrid ref={gridRef} src={src} />

// later use the API
gridRef.current?.Get(1, "A");
gridRef.current?.Set(1, "A", "", "XXX", 1);
```

## Assign FastGrid events as React props

```tsx
<FastGrid src={src} onSetValue={onSetValue} onClick={onClick}/>
```

The React wrapper maps:
- `onSetValue` to FastGrid `OnSetValue`
- `onClick` to FastGrid `OnClick`

## Complete usage snippet

```tsx
import React, { useMemo, useRef } from "react";
import { FastGrid } from "fastgrid-react";
export default function App() {
   const src = useMemo(() => ({ Cols:["A","B",{id:"C",Width:80}], Head:["Header"], Body:[ { V:[1,2,3] }, { V:{A:4,B:5,C:6} } ] }), []);
   const gridRef = useRef<TGrid|null>(null);
   function readValue() { alert("Read value from cell [1,A]: "+ gridRef.current?.Get(1,"A"));  }
   function changeValue(gridRef: TGridRef,row:TRow|string|number,col:TCol|string|number,val:any) { gridRef.current?.Set(row,col,"",val,1); }
   function onSetValue(grid:TGrid,row?:TRow,col?:TCol,value?:any,changes?:number){ if(changes) console.log("Value "+value+" set to cell ["+row?.id+","+col?.id+"]"); }
   function onClick(grid?:TGrid,row?:TRow,col?:TCol){ if(row&&col) console.log("clicked cell ["+row.id+","+col.id+"] with value "+grid?.GetValue(row,col)); }
   return(<>
      <FastGrid src={src} ref={gridRef} onSetValue={onSetValue} onClick={onClick} style={{height:"500px"}} />
      <button onClick={readValue}>Read value</button> 
      <button onClick={ () => { changeValue(gridRef,1,"A","XXX"); } }>Change value</button>
      </>)
   }
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
