# FastGrid Vue Tutorials (example)

This folder contains Vue application package with FastGrid tutorials demonstrating usage of `FastGrid` JavaScript grid and its individual features.

## Install and run these examples

```bash
npm install
npm run dev
```


## Using `fastgrid-vue` in your own project

### Install the package:
```bash
npm install fastgrid-vue
```

### Import:
```vue
import { FastGrid } from "fastgrid-vue";
```

### Minimal usage:
```vue
<FastGrid :src='src' />
```

## Access FastGrid API via `ref`

```vue
const gridRef = ref(null);

<FastGrid ref='gridRef' :src='src' />

// later use the API
gridRef.value?.Get(1, "A");
gridRef.value?.Set(1, "A", "", "XXX", 1);
```

## Assign FastGrid events as Vue props

```vue
<FastGrid :src='src' @set-value='onSetValue' @click='onClick'/>
```

The Vue wrapper maps:
- `@set-value` to FastGrid `OnSetValue`
- `@click` to FastGrid `OnClick`

## Complete usage snippet

```vue
<script setup>
   import { ref } from "vue";
   import { FastGrid } from "fastgrid-vue";
   const src = { Cols:["A","B",{id:"C",Width:80}], Head:["Header"], Body:[ { V:[1,2,3] }, { V:{A:4,B:5,C:6} } ] };
   const gridRef = ref(null);
   function readValue() { alert("Read value from cell [1,A]: "+ gridRef.value?.Get(1,"A"));  }
   function changeValue(grid,row,col,val) { grid?.Set(row,col,"",val,1); }
   function onSetValue(grid,row,col,value,changes){ if(changes) console.log("Value "+value+" set to cell ["+row.id+","+col.id+"]"); }
   function onClick(grid,row,col){ if(row&&col) console.log("clicked cell ["+row.id+","+col.id+"] with value "+grid.GetValue(row,col)); }
</script>
<template>
   <FastGrid ref="gridRef" :src="src" @set-value="onSetValue" @click="onClick" style="height:500px;"/>
   <button @click="readValue">Read value</button>
   <button @click="changeValue(gridRef, 1, 'A', 'XXX')">Change value</button>
</template>
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
