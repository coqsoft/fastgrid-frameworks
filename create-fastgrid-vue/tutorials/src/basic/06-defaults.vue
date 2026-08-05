<script setup>
import { FastGrid } from "fastgrid-vue";
import "../Tutorial.css";


   const src = { //. All layout and data for grid.

      Script: {
         //. Sample custom calculation function
         //. Sums the seven days in a week. col is SUMX, where X is the week index
         MySum : function(G,row,col){
            var D = ["SU","MO","TU","WE","TH","FR","SA"];
            col = col.id.slice(3);

            for(var i=0,sum=0;i<D.length;i++){
               var n = G.GetValue(row,G.Cols[D[i]+"N"+col]), v = G.GetValue(row,G.Cols[D[i]+"V"+col]);
               if(v && n) sum += v*n;
               }
            return sum?sum:"";
            }
         },

      Cfg : { id: "Defaults", Sorting: 0 }, 

      DefCols : {
         DAY: { Width: 60, Type: "Number", Format: ",0" }, 
         WORKDAY: { D: "DAY" }, 
         WEEKEND: { D: "DAY", Color: "#AFF" }, 
         NAME: { }, 
         VALUE: { }, 
         WORKDAYNAME: { D:"WORKDAY,NAME" },
         WORKDAYVALUE: { D:"WORKDAY,VALUE" },
         WEEKENDNAME: { D:"WEEKEND,NAME" },
         WEEKENDVALUE: { D:"WEEKEND,VALUE" },
         SUM: { Formula: "Grid.Script.MySum(Grid,Row,Col)", Type: "Number", Format: ",0" }, 
         SEP: { Width: 4, Color: "#333", NoFocus: 1, Important:1 }  
         }, 

      LeftCols: [ 
         { id:"Panel", D:"Panel", LeftIcons:"SelectRow,DeleteRow,AddRow" },
         { id: "N", Width: 150, UseMove:1 }
         ], 

      Cols: [ 
         { id: "SUN1", D: "WEEKENDNAME" }, { id: "SUV1", D: "WEEKENDVALUE" }, { id: "MON1", D: "WORKDAYNAME" }, { id: "MOV1", D: "WORKDAYVALUE" },  
         { id: "TUN1", D: "WORKDAYNAME" }, { id: "TUV1", D: "WORKDAYVALUE" }, { id: "WEN1", D: "WORKDAYNAME" }, { id: "WEV1", D: "WORKDAYVALUE" }, 
         { id: "THN1", D: "WORKDAYNAME", Width:80 }, { id: "THV1", D: "WORKDAYVALUE" }, { id: "FRN1", D: "WORKDAYNAME" }, { id: "FRV1", D: "WORKDAYVALUE" }, 
         { id: "SAN1", D: "WEEKENDNAME" }, { id: "SAV1", D: "WEEKENDVALUE" }, 
         { id: "SUM1", D: "SUM" }, 
         { id: "SEP1", D: "SEP" }, 

         { id: "SUN2", D: "WEEKENDNAME" }, { id: "SUV2", D: "WEEKENDVALUE" }, { id: "MON2", D: "WORKDAYNAME" }, { id: "MOV2", D: "WORKDAYVALUE" },  
         { id: "TUN2", D: "WORKDAYNAME" }, { id: "TUV2", D: "WORKDAYVALUE" }, { id: "WEN2", D: "WORKDAYNAME" }, { id: "WEV2", D: "WORKDAYVALUE" }, 
         { id: "THN2", D: "WORKDAYNAME" }, { id: "THV2", D: "WORKDAYVALUE" }, { id: "FRN2", D: "WORKDAYNAME" }, { id: "FRV2", D: "WORKDAYVALUE" }, 
         { id: "SAN2", D: "WEEKENDNAME" }, { id: "SAV2", D: "WEEKENDVALUE" }, 
         { id: "SUM2", D: "SUM" }  
         ], 

      Head: [ 
         {  D: "Header", id:"Header2", CS: { SUN1:2, MON1:2, TUN1:2, WEN1:2, THN1:2, FRN1:2, SAN1:2, SUN2:2, MON2:2, TUN2:2, WEN2:2, THN2:2, FRN2:2, SAN2:2 },
            V: { 
               N: "Day", SUM1: "", SUM2: "", SEP1: "",
               SUN1: "Sunday", MON1: "Monday", TUN1: "Tuesday", WEN1: "Wednesday", THN1: "Thursday", FRN1: "Friday", SAN1: "Saturday",
               SUV1: "Sunday", MOV1: "Monday", TUV1: "Tuesday", WEV1: "Wednesday", THV1: "Thursday", FRV1: "Friday", SAV1: "Saturday",
               SUN2: "Sunday", MON2: "Monday", TUN2: "Tuesday", WEN2: "Wednesday", THN2: "Thursday", FRN2: "Friday", SAN2: "Saturday",
               SUV2: "Sunday", MOV2: "Monday", TUV2: "Tuesday", WEV2: "Wednesday", THV2: "Thursday", FRV2: "Friday", SAV2: "Saturday"
            
               }, 
            A: { SEP1: { Color: "#333" } }
            }, 
         {  D: "Header", id: "Header", 
            V: { N: "Car", SUM1: "Sum",  SUM2: "Sum", SEP1: "", 
               SUN1: "Price", SUV1: "Count", MON1: "Price", MOV1: "Count", TUN1: "Price", TUV1: "Count", WEN1: "Price", WEV1: "Count", THN1: "Price", THV1: "Count", FRN1: "Price", FRV1: "Count", SAN1: "Price", SAV1: "Count", 
               SUN2: "Price", SUV2: "Count", MON2: "Price", MOV2: "Count", TUN2: "Price", TUV2: "Count", WEN2: "Price", WEV2: "Count", THN2: "Price", THV2: "Count", FRN2: "Price", FRV2: "Count", SAN2: "Price", SAV2: "Count", 
               },
            A: { SEP1: { Color: "#333" } }
            }  
         ], 

      DefCells: { 
         NW: { Color:"#AEE" }
         },

      DefRows: {
         SEPARATOR: { L:-1, ColBorder:"panel", Height: 10, CD: "", Accept:"", NoFocus:1, NoHover:7, NoEdit:1, Color:"panel", A: { Panel: { LeftIcons:"" } } }, 

         NODE: { F: { SUM1: "sum()", SUM2: "sum()" }, NoEdit:1, A: { N: { NoEdit:0 } } }, 
         BRAND: { D: "NODE", CD: "TYPE", DragId:"BRAND", Accept: "TYPE", A: { N: { TextSize: 15 } }, L:0 }, 
         TYPE: { D: "NODE", CD: "NAME", DragId:"TYPE", Accept: "NAME", A: { N: { TextStyle: 1 } }, L:1 }, 
         NAME: { 
            D: "NODE", CD: "COLOR", DragId:"NAME", Accept: "COLOR", Color: "#FFEEEE", L:2, 
            A: { SUN1:"NW", SUV1:"NW", SAN1:"NW", SAV1:"NW", SUN2:"NW", SUV2:"NW", SAN2:"NW", SAV2:"NW" } 
            }, 

         COLOR: { L:3, CD: "", DragId:"COLOR", Accept: "", V: { N: "Unknown" }, A: { N: { RightIcons:"List", List: "|Red|Green|Blue|White|Black", OnChange: "Grid.SetD(Row,null,Value)" } } }, 
         Red: { D: "COLOR", V: { N: "Red" }, TextColor: "red" }, 
         Green: { D: "COLOR", V: { N: "Green" }, TextColor: "green" }, 
         Blue: { D: "COLOR", V: { N: "Blue" }, TextColor: "blue" }, 
         Black: { D: "COLOR", V: { N: "Black" }, TextColor: "black" }, 
         White: { D: "COLOR", V: { N: "White" }, TextColor: "gray" }  
         }, 

      Body_Cfg: { CD:"BRAND", Accept:"BRAND", Tree:"N" },
      Body: [ 
         { V: { N: "Chevrolet" } },
         { L:1, V: { N: "Car" } },
         { L:2, V: { N: "Corvette" } },
         { D: "Red",  V: { MON1: 40000, MOV1: 1, THN1: 45000, THV1: 2 } }, 
         { D: "Blue", V: { TUN1: 39000, TUV1: 3, FRN1: 42000, FRV1: 1, FRN2: 40000, FRV2: 3 } },  
         { L:1, V: { N: "SUV" } },
         { L:2, V: { N: "Equinox" } },
         { D: "Blue", V: { WEN1: 60000, WEV1: 1, THN1: 58000, THV1: 2, SAN1: 56000, SAV1: 1, MON2: 60000, MOV2: 2 } },
         { L:2, V: { N: "Traverse" } },
         { D: "White", V: { TUN1: 40000, TUV1: 1 } }, 
         { D: "Black", V: { FRN1: 42000, FRV1: 2, FRN2: 43000, FRV2: 1 } },
         { L:1, V: { N: "Truck" } },
         { L:2, V: { N: "Avalanche" } },
         { D: "Red", V: { SUN1: 25000, SUV1: 1, MON1: 28000, MOV1: 2, THN1: 23000, THV1: 4, TUN2: 33000, TUV2: 2, THN2: 30000, THV2: 1 } } ,
         { L:2, V: { N: "Colorado" } },
         { D: "Green", V: { MON1: 40000, MOV1: 3, FRN1: 30000, FRV1: 2 } },
         { D: "Black", V: { WEN1: 42000, WEV1: 7, MON2: 43000, MOV2: 1 } },
         { L:1, V: { N: "Van" } },
         { L:2, V: { N: "Express"} },
         { D: "Blue", V: { TUN1: 45000, TUV1: 1, WEN1: 42000, WEV1: 1, THN1: 40000, THV1: 2, SUN2: 45000, SUV2: 1, WEN2: 45000, WEV2: 1 } },

         "SEPARATOR", 

         { V: { N: "Ford" } },
         { L:1, V: { N: "Car" } },
         { L:2, V: { N: "Fusion" } },
         { D: "Blue", V: { SUN1: 25000, SUV1: 1, MON1: 28000, MOV1: 2, THN1: 23000, THV1: 4, TUN2: 33000, TUV2: 2, THN2: 30000, THV2: 1 } },
         { L:2, V: { N: "Mustang" } }, 
         { D: "Green", V: { MON1: 40000, MOV1: 3, FRN1: 30000, FRV1: 2 } },
         { L:2, V: { N: "Taurus" } },
         { D: "Blue", V: { MON1: 40000, MOV1: 1, THN1: 45000, THV1: 2 } }, 
         { D: "White", V: { FRN1: 42000, FRV1: 2, FRN2: 43000, FRV2: 1 } },
         { L:1, V: { N: "SUV" } },
         { L:2, V: { N: "Edge" } },
         { D: "Red", V: { SUN1: 25000, SUV1: 1, MON1: 28000, MOV1: 2, THN1: 23000, THV1: 4, TUN2: 33000, TUV2: 2, THN2: 30000, THV2: 1 } },
         { L:2, V: { N: "Explorer" } },
         { D: "White", V: { SUN1: 25000, SUV1: 1, MON1: 28000, MOV1: 2, THN1: 23000, THV1: 4, TUN2: 33000, TUV2: 2, THN2: 30000, THV2: 1 } },
         { L:1, V: { N: "Truck" } },
         { L:2, V: { N: "F-250" } },
         { D: "White", V: { MON1: 40000, MOV1: 3, FRN1: 30000, FRV1: 2 } },
         { L:2, V: { N: "F-450" } },
         { D: "White", V: { FRN1: 42000, FRV1: 2, FRN2: 43000, FRV2: 1 } },
         { L:1, V: { N: "Van" } },
         { L:2, V: { N: "Transit" } },
         { D: "Green", V: { SUN1: 25000, SUV1: 1, MON1: 28000, MOV1: 2, THN1: 23000, THV1: 4, TUN2: 33000, TUV2: 2, THN2: 30000, THV2: 1 } },

         "SEPARATOR",

         { V: { N: "Skoda" } },
         { L:1, V: { N: "SUV" } },
         { L:2, V: { N: "Yeti" } },
         { D: "Blue", V: { MON1: 40000, MOV1: 1, THN1: 45000, THV1: 2 } }, 
         { D: "Red", V: { SUN1: 25000, SUV1: 1, MON1: 28000, MOV1: 2, THN1: 23000, THV1: 4, TUN2: 33000, TUV2: 2, THN2: 30000, THV2: 1 } },

         "SEPARATOR",

         { V: { N: "Subaru" } },
         { L:1, V: { N: "Car" } },
         { L:2, V: { N: "BRZ" } },
         { D: "Green", V: { TUN1: 40000, TUV1: 1 } },
         { L:2, V: { N: "Impreza" } },
         { D: "Green", V: { SUN1: 25000, SUV1: 1, MON1: 28000, MOV1: 2, THN1: 23000, THV1: 4, TUN2: 33000, TUV2: 2, THN2: 30000, THV2: 1 } },
         { L:2, V: { N: "Legacy" } },
         { D: "Red", V: { MON1: 40000, MOV1: 3, FRN1: 30000, FRV1: 2 } },
         { L:1, V: { N: "SUV" } },
         { L:2, V: { N: "Forester" } },
         { D: "Red", V: { TUN1: 40000, TUV1: 1 } }, 
         { D: "Black", V: { MON1: 40000, MOV1: 1, THN1: 45000, THV1: 2 } },
         { L:2, V: { N: "Tribeca" } },
         { D: "White" },
         { L:2, V: { N: "XV Crosstrek" } },
         { D: "White", V: { SUN1: 25000, SUV1: 1, MON1: 28000, MOV1: 2, THN1: 23000, THV1: 4, TUN2: 33000, TUV2: 2, THN2: 30000, THV2: 1 } },

         "SEPARATOR",

         { V: { N: "Toyota" } },
         { L:1, V: { N: "Car" } },
         { L:2, V: { N: "Camry" } },
         { D: "Green", V: { FRN1: 42000, FRV1: 2, FRN2: 43000, FRV2: 1 } }, 
         { D: "Blue", V: { TUN1: 45000, TUV1: 1, WEN1: 42000, WEV1: 1, THN1: 40000, THV1: 2, SUN2: 45000, SUV2: 1, WEN2: 45000, WEV2: 1 } },
         { L:2, V: { N: "Corolla" } },
         { D: "Blue", V: { TUN1: 40000, TUV1: 1 } },
         { L:2, V: { N: "Yaris" } },
         { D: "Black", V: { SUN1: 25000, SUV1: 1, MON1: 28000, MOV1: 2, THN1: 23000, THV1: 4, TUN2: 33000, TUV2: 2, THN2: 30000, THV2: 1 } },
         { L:1, V: { N: "SUV" } },
         { L:2, V: { N: "FJ Cruiser" } },
         { D: "Green", V: { MON1: 40000, MOV1: 1, THN1: 45000, THV1: 2 } }, 
         { D: "Red", V: { TUN1: 40000, TUV1: 1 } },
         { L:2, V: { N: "Highlander" } },
         { D: "Blue", V: { TUN1: 45000, TUV1: 1, WEN1: 42000, WEV1: 1, THN1: 40000, THV1: 2, SUN2: 45000, SUV2: 1, WEN2: 45000, WEV2: 1 } },
         { L:2, V: { N: "RAV4" } },
         { D: "White", V: { MON1: 40000, MOV1: 3, FRN1: 30000, FRV1: 2 } },
         { L:2, V: { N: "Sequoia" } },
         { D: "Red", V: { FRN1: 42000, FRV1: 2, FRN2: 43000, FRV2: 1 } },
         { L:1, V: { N: "Truck" } },
         { L:2, V: { N: "Tacoma" } },
         { D: "Green", V: { TUN1: 40000, TUV1: 1 } },
         { L:2, V: { N: "Tundra" } },
         { D: "Black", V: { SUN1: 25000, SUV1: 1, MON1: 28000, MOV1: 2, THN1: 23000, THV1: 4, TUN2: 33000, TUV2: 2, THN2: 30000, THV2: 1 } },
         { L:1, V: { N: "Van" } },
         { L:2, V: { N: "Sienna" } },
         { D: "White", V: { SUN1: 25000, SUV1: 1, MON1: 28000, MOV1: 2, THN1: 23000, THV1: 4, TUN2: 33000, TUV2: 2, THN2: 30000, THV2: 1 } },

         "SEPARATOR", 

         { V: { N: "Volkswagen" } },
         { L:1, V: { N: "Car" } },
         { L:2, V: { N: "Beetle" } }, 
         { D: "Blue", V: { TUN1: 40000, TUV1: 1 } }, 
         { L:2, V: { N: "Golf" } },
         { D: "Black", V: { TUN1: 45000, TUV1: 1, WEN1: 42000, WEV1: 1, THN1: 40000, THV1: 2, SUN2: 45000, SUV2: 1, WEN2: 45000, WEV2: 1 } },
         { L:2, V: { N: "Passat" } },
         { D: "Red", V: { FRN1: 42000, FRV1: 2, FRN2: 43000, FRV2: 1 } },
         { L:1, V: { N: "SUV" } },
         { L:2, V: { N: "Tiguan" } },
         { D: "Red", V: { TUN1: 45000, TUV1: 1, WEN1: 42000, WEV1: 1, THN1: 40000, THV1: 2, SUN2: 45000, SUV2: 1, WEN2: 45000, WEV2: 1 } }, 
         { D: "White", V: { SUN1: 25000, SUV1: 1, MON1: 28000, MOV1: 2, THN1: 23000, THV1: 4, TUN2: 33000, TUV2: 2, THN2: 30000, THV2: 1 } },
         { L:2, V: { N: "Touareg" } },
         { D: "Black", V: { MON1: 40000, MOV1: 1, THN1: 45000, THV1: 2 } },
         { L:1, V: { N: "Van" } },
         { L:2, V: { N: "Routan" } },
         { D: "Blue", V: { FRN1: 42000, FRV1: 2, FRN2: 43000, FRV2: 1 } },
         ], 
   };

   
</script>

<template>

      <h1>6. Default rows and columns</h1>
      <h5>Predefined values for more rows and columns</h5>
      <section>
         <FastGrid :src="src" style="height:550px;"/>
      </section>

      
      <ul>
         <li>See <a target="FGDoc" href="https://www.treegrid.com/FDoc/Defaults.htm">Defaults documentation</a>.</li>
         <li>
         Default object can be row, column, cell, toolbar, toolbar cell or image.<br />
         The default rows are defined in <b>DefRows</b>.<br />
         The default columns are defined in <b>DefCols</b>.<br />
         The default cells are defined in <b>DefCells</b>.<br />
         The default toolbars are defined in <b>DefToolbars</b>.<br />
         The default toolbar cells are defined in <b>DefTools</b>.<br />
         The default images are defined in <b>DefImages</b>.<br />
         </li>
         <li>
         Default object predefines all object attributes that the object does not explitly set. <br />
         Setting object attribute to empty string still overrides the default value.
         Setting attribute to null or undefined uses the default value.
         </li>
         <li>The object refers to its default object by <dfn>D</dfn> attribute as the <dfn>id</dfn> of the default object.<br />
         If the object is defined as number or string instead of object, it is the reference to default object. For example object "C1" is the same as &#x7B; D:"C1" &#x7D;.<br />
         </li>
         <li>Default row or column can be defined also by <dfn>CD</dfn> attribute that defined default object for children of the object.</li>
         <li>If object has not set its default object by <b>D</b> or parent <b>CD</b> attribute it is automatically set to <b>Row</b> / <b>Col</b> / <b>Cell</b> / <b>Toolbar</b> / <b>Tool</b> / <b>Image</b> according to the object.</li>
         <li><h4>Predefined default rows and columns</h4><br />
            <ul>
               <li><dfn>Header</dfn> - row or column in different color and background displaying column or row ids.</li>
               <li><dfn>Index</dfn> - row or column in different color and background displaying column or row indexes.</li>
               <li><dfn>Panel</dfn> - row or column prepared to display row / column icons. The icons must be defined explicitly, e.g. in <b>LeftIcons</b>.</li>
               <li><dfn>Filter</dfn> - row or column displaying filter operators and permits filtering rows / columns by its values.</li>
               <li><dfn>Group</dfn> - row or column created by grouping. It has <b>Group</b> attribute.</li>
               <li><dfn>PivotGroup</dfn>, <dfn>PivotData</dfn> - row or column created by pivot.</li>
            </ul>
         </li>
         <li><h4>API</h4><br />
         Default attributes can be got / set by methods <dfn>GetDefAttr</dfn> / <dfn>SetDefAttr</dfn>.<br />
         The default object can be got / set by methods <dfn>GetD</dfn> / <dfn>SetD</dfn>.<br />
         </li>
      </ul>
   
</template>
