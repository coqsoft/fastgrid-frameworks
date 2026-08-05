# FastGrid Angular Tutorials (example)

This folder contains Angular application package with FastGrid tutorials demonstrating usage of `FastGrid` JavaScript grid and its individual features.

## Install and run these examples

```bash
npm install
npm run dev
```


## Using `fastgrid-angular` in your own project

### Install the package:
```bash
npm install fastgrid-angular
```

### Import:
```ts
import { FastGridComponent, FastGridOutputEvent } from "fastgrid-angular";
@Component({ ... imports:[ FastGridComponent ] ... })
```

### Minimal usage:
```html
<fast-grid [src]="sources"></fast-grid>
```

## Access FastGrid API via `@ViewChild`

```html
<fast-grid #grid [src]="sources"></fast-grid>
```

```ts
@ViewChild(FastGridComponent) grid! : FastGridComponent;

// later use the API
this.grid.Get(1, "A");
this.grid.Set(1, "A", "", "XXX", 1);
```

## Assign FastGrid events as Angular input or output events

```html
<fast-grid #grid [src]="sources" (click)="onClick1($event)" [onClick]="onClick2"></fast-grid>
```

```ts
onClick1(event:FastGridOutputEvent<"click">) : void { if(event.row&&event.col) console.log("clicked grid "+event.grid.id+" ["+event.row.id+","+event.col.id+"]"); }
readonly onClick2:TFGrid["OnClick"] = (grid,row,col) => { if(row&&col) console.log("clicked grid "+grid.id+" ["+row.id+","+col.id+"]"); };
```

The Angular wrapper maps:
- `(click)` to FastGrid `OnClick` as output event handler - returned value is always ignored
- `[onClick]` to FastGrid `OnClick` as input event handler - returned value is accepted

## Complete usage snippet

```html
<fast-grid [src]="src" (setValue)="onSetValue($event)" (click)="onClick($event)" (ready)="onReady($event)" [onEndEdit]="onEndEdit"
   style="display:inline-block;max-width:100%"></fast-grid>
<button (click)="readValue()">Read value [1,A]</button>
<button (click)="changeValue(grid, 1, 'A', 'XXX')">Change value [1,A]</button>
```

```ts
import { Component, ViewChild } from "@angular/core";
import { FastGridComponent, type FastGridOutputEvent } from "fastgrid-angular";
@Component({ selector:"app-root", standalone:true, imports:[ FastGridComponent ], templateUrl:"./app.component.html" }) export class AppComponent {
   readonly src = { Cols:["A","B",{id:"C",Width:80}], Head:["Header"], Body:[ { V:[1,2,3] }, { V:{A:4,B:5,C:6} } ] };
   @ViewChild(FastGridComponent) grid! : FastGridComponent;
   readValue() : void { alert("Read value from cell [1,A]: "+this.grid.Get(1,"A")); }
   changeValue(grid:FastGridComponent,row:TRow|string|number,col:TCol|string|number,val:any) : void { grid.Set(row,col,"",val,1); } 
   onSetValue(event:FastGridOutputEvent<"setValue">) : void { 
      if(event.changes) console.log("Value "+event.value+" set to cell ["+event.row?.id+","+event.col?.id+"]"); 
      }
   onEndEdit: TFGrid["OnEndEdit"] = (grid,row,col,value,save) => {
      if(!save||!value||!isNaN(Number(value))) return null;
      grid.ShowMessage("Enter string?","Confirm",(but:string) => { if(but==="Ok") grid.EndEdit(1,1); }); return true;
      };
   onClick(event:FastGridOutputEvent<"click">) : void { if(event.row&&event.col) console.log("Clicked",event.row.id,event.col.id); }
   onReady(event:FastGridOutputEvent<"ready">) : void { console.log("FastGrid "+event.grid.id+" is ready"); }
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
