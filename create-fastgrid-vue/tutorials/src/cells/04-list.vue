<script setup>
import { FastGrid } from "fastgrid-vue";
import "../Tutorial.css";


   const src = { //. All layout and data for grid.
      Cfg: { id: "List", IndexList:1, AutoHtml:1, HtmlHeight:1, HtmlWidth:1, Focus:2, HideVScroll:1, ExportIcons:15 },
      DefCols: {
         Col: { Width:80, SuggestType:8 }
         },
      DefTools: {
         List: { SuggestType:8 }
         },
      LeftCols: [
         { id: "id", D:"HeaderFocus" }, 
         ],
      Cols: [
         { id:"INFO", Type:"String", Wrap:1, Color:"#EEE", NoEdit:1, Width:120 },
         { id:"LIST", RightIcons:"List", List:"|Zero|One|Two|<b style='color:red'>Three</b>|Four|Five|<i style='color:blue'>Six</i>|Seven|Eight|Nine|Ten", Suggest:1, Width:140 },
         { id:"VALUE", Formula:"Grid.GetValue(Row,Grid.Cols.LIST)", NoEdit:1, TextColor:"#888", Color:"#EEE" },
         { id:"LIST1", RightIcons:"List", ClearCells:"LIST2,LIST3", List:"|A|<b style='color:red'>B</b>|C", Suggest:1 },
         { id:"LIST2", RightIcons:"List", ListRelated:"LIST1", ClearCells:"LIST3", Suggest:1, List: { A:"|A1|<i style='color:blue'>A2</i>|A3", "<b style='color:red'>B</b>": "|B1|B2", C: "|C1|C2" } },
         { id:"LIST3", RightIcons:"List", ListRelated:"LIST1,LIST2", Width:105, Suggest:1,
            List: { A: { A1:"|A1-a|A1-b|A1-c", "<i style='color:blue'>A2</i>":"|A2-a|A2-b", A3:"|A3-a|<b style='color:red'>A3-b</b>|A3-c|A3-d" }, "<b style='color:red'>B</b>": { B1:"|B1-a|B1-b", B2:"|B2-a" }, C: { C1:"|C1-a|C1-b", C2:"|C2-a|C2-b|C2-c" } }, 
            },
         { id:"VALUE123", Formula:"LIST1 + (LIST2!=='' ? ' : '+LIST2 : '') + (LIST3!=='' ? ' : '+LIST3 : '')", NoEdit:1, TextColor:"#888", Width:120, Color:"#EEE" },
         { id:"INFO2", Type:"String", Wrap:1, Color:"#EEE", NoEdit:1, Width:125 }, 
         { id:"SUGGEST", Suggest:1, Width:97, List:",AliceBlue,AntiqueWhite,Aqua,Aquamarine,Azure,Beige,Bisque,Black,BlanchedAlmond,Blue,BlueViolet,Brown,BurlyWood,CadetBlue,Chartreuse,Chocolate,Coral,CornflowerBlue,Cornsilk,Crimson,Cyan,DarkBlue,DarkCyan,DarkGoldenRod,DarkGray,DarkGreen,DarkKhaki,DarkMagenta,DarkOliveGreen,Darkorange,DarkOrchid,DarkRed,DarkSalmon,DarkSeaGreen,DarkSlateBlue,DarkSlateGray,DarkTurquoise,DarkViolet,DeepPink,DeepSkyBlue,DimGray,DodgerBlue,Ecru,Emerald,FireBrick,FloralWhite,ForestGreen,Fuchsia,Gainsboro,GhostWhite,Gold,GoldenRod,Gray,Green,GreenYellow,HoneyDew,HotPink,IndianRed,Indigo,Ivory,Jade,Jonquil,Khaki,Lavender,LavenderBlush,LawnGreen,LemonChiffon,LightBlue,LightCoral,LightCyan,LightGoldenRodYellow,LightGrey,LightGreen,LightPink ,LightSalmon,LightSeaGreen,LightSkyBlue,LightSlateGray,LightSteelBlue,LightYellow,Lime,LimeGreen,Linen,Magenta,Maroon,MediumAquaMarine,MediumBlue,MediumOrchid,MediumPurple,MediumSeaGreen,MediumSlateBlue,MediumSpringGreen,MediumTurquoise,MediumVioletRed,MidnightBlue,MintCream,MistyRose,Moccasin,NavajoWhite,Navy,OldLace,Olive,OliveDrab,Orange,OrangeRed,Orchid,PaleGoldenRod,PaleGreen,PaleTurquoise,PaleVioletRed,PapayaWhip,PeachPuff,Peru,Pink,Plum,PowderBlue,Purple,Red,RosyBrown,RoyalBlue,SaddleBrown,Salmon,SandyBrown,SeaGreen,SeaShell,Sienna,Silver,SkyBlue,SlateBlue,SlateGray,Snow,SpringGreen,SteelBlue,Tan,Teal,Thistle,Tomato,Turquoise,UltraMarine,Umber,Violet,Wheat,White,WhiteSmoke,Xanadu,Yellow,YellowGreen,Zaffre" }
         ],
      Body: [
         { id:0, 
            V: { LIST:"XXX", LIST1:1.3, INFO:"List with NoListValue", INFO2:"Basic Suggest" }, 
            A: { LIST: { NoListValue:"<span style='color:silver;'>Unknown: *Value</span>" }, LIST1: { NoListValue:"*Number", NoListFormat:"0.000" } } },
         { id:1, 
            V: { LIST:"Two", LIST1:"<b style='color:red'>B</b>", LIST2:"B1", LIST3:"B1-b", INFO:"List by string and with CellBorder", INFO2:"Suggest with List" }, 
            A: { LIST: { CellBorder:"List,,,,edittool" }, SUGGEST: { RightIcons:"List" } } 
            },
         { id:2,
            V: { LIST:3, LIST1:2, LIST2:1, LIST3:0, INFO:"List by indexed string + existing", INFO2:"Suggest existing"  }, 
            A: { 
               LIST: { IndexList:1, LeftIcons:"List", RightIcons:"" }, 
               LIST1: { IndexList:1, List:"|A|<b style='color:red'>B</b>|C" }, 
               LIST2: { IndexList:1, List:"@|A1|<i style='color:blue'>A2</i>|A3@|B1|B2@|C1|C2" }, 
               LIST3: { IndexList:1, List:"~@|A1-a|A1-b|A1-c@|A2-a|A2-b@|A3-a|<b style='color:red'>A3-b</b>|A3-c|A3-d~@|B1-a|B1-b@|B2-a~@|C1-a|C1-b@|C2-a|C2-b|C2-c" },
               SUGGEST: { SuggestExisting:1 }
               } 
            },
         { id:3, 
            V: { LIST:8, LIST1:0, LIST2:2, LIST3:1, INFO:"List by indexed array, Button", INFO2:"Suggest on start and on empty" }, 
            A: { 
               LIST: { Button:"List", IndexList:1,  List: ["Zero","One","Two","<b style='color:red'>Three</b>","Four","Five","<i style='color:blue'>Six</i>","Seven","Eight","Nine","Ten"] },
               LIST1: { Button:"List", IndexList:1, List: [ "A", "<b style='color:red'>B</b>", "C" ] }, 
               LIST2: { Button:"List", IndexList:1, List: [ [ "A1", "<i style='color:blue'>A2</i>", "A3" ], [ "B1", "B2" ], [ "C1", "C2" ] ] }, 
               LIST3: { Button:"List", IndexList:1, List: [ 
                     [ [ "A1-a", "A1-b", "A1-c" ], [ "A2-a", "A2-b" ], [ "A3-a", "<b style='color:red'>A3-b</b>", "A3-c", "A3-d" ] ],
                     [ [ "B1-a", "B1-b" ], [ "B2-a" ] ],
                     [ [ "C1-a", "C1-b" ], [ "C2-a", "C2-b", "C2-c" ] ] 
                     ] 
                  },
               SUGGEST: { Suggest:2, SuggestMin:0 }
               } 
            },
         { id:4, 
            V: { LIST:"g", LIST1:"c", LIST2:"aa", LIST3:"bbb", INFO:"List by object as key: value", INFO2:"Search suggest also inside words" },
            A: { 
               LIST: { 
                  LeftIcons:"List", RightIcons:"", ListIcon:"Prev", ListMenu: { Place: { Align:3, VertAlign:0 } },
                  List: { a:"Zero", b:"One", c:"Two", d:"<b style='color:red'>Three</b>", e:"Four", f:"Five", g:"<i style='color:blue'>Six</i>", h:"Seven", i:"Eight", j:"Nine", k:"Ten" } 
                  },
               LIST1: { List: { a:"A", b:"<b style='color:red'>B</b>", c:"C" } },
               LIST2: { List: { a: { aa : "A1", bb:"<i style='color:blue'>A2</i>", cc:"A3" }, b: { aa:"B1", bb:"B2" }, c: { aa:"C1", bb:"C2" } } },
               LIST3: { List: {
                     a: { aa: { aaa:"A1-a", bbb:"A1-b", ccc:"A1-c" }, bb: { aaa:"A2-a", bbb:"A2-b" }, cc: { aaa:"A3-a", bbb:"<b style='color:red'>A3-b</b>", ccc:"A3-c", ddd:"A3-d" } },
                     b: { aa: { aaa:"B1-a", bbb:"B1-b" }, bb: { aaa:"B2-a" } },
                     c: { aa: { aaa:"C1-a", bbb:"C1-b" }, bb: { aaa:"C2-a", bbb:"C2-b", ccc:"C2-c" } }
                     }
                  },
               SUGGEST: { SuggestSearch:2 }
               } 
            },
         { id:5, 
            V: { LIST:"b", LIST1:"c", LIST2:"bb", LIST3:"ccc", INFO:"List by full object with keys, values and menu texts", INFO2:"Replace item selected in suggest " }, 
            A: { 
               LIST: { List: { 
                  a: { Value:"Zero", Text:"0 - zero <i>(very wide menu item text)</i>" }, b: { Value:"One", Text:"1 - one" }, c: { Value:"Two", Text:"2 - two", A: { Color:"#FDA" } }, 
                  d: { Value:"<b style='color:red'>Three</b>", Text:"3 - <b style='color:red'>three</b>" }, e: { Value:"Four", Text:"4 - four" }, f: { Value:"Five", Text:"5 - five" }, g: { Value:"<i style='color:blue'>Six</i>", Text:"6 - <i style='color:blue'>six</i>" }, 
                  h: { Value:"Seven", Text:"7 - seven" }, i: { Value:"Eight", Text:"8 - eight" }, j: { Value:"Nine", Text:"9 - nine", A: { Color:"#7AD", TextColor:"white" } }, k: { Value:"Ten", Text:"10 - ten" } 
                  } },
               LIST1: { List: { a: { Value:"A", Text:"A (a)" }, b:{ Value:"<b style='color:red'>B</b>", Text:"B (b)" }, c: { Value:"C",Text:"C (c)" } } },
               LIST2: { List: { 
                  a: { aa: { Value:"A1", Text:"A1 (a:aa)" }, bb: { Value:"<i style='color:blue'>A2</i>", Text:"A2 (a:bb)" }, cc: { Value:"A3", Text:"A3 (a:cc)" } }, 
                  b: { aa: { Value:"B1", Text:"B1 (b:aa)" }, bb: { Value:"B2",Text:"B2 (b:bb)" } }, 
                  c: { aa: { Value:"C1", Text:"C1 (c:aa)" }, bb: { Value:"C2", Text:"C2 (c:bb)" } }
                  } },
               LIST3: { List: {
                     a: { 
                        aa: { aaa: { Value:"A1-a", Text:"A1-a (a:aa:aaa)" }, bbb: { Value:"A1-b", Text:"A1-b (a:aa:bbb)" }, ccc: { Value:"A1-c", Text:"A1-c (a:aa:ccc" } }, 
                        bb: { aaa: { Value:"A2-a", Text:"A2-a (a:bb:aaa)" }, bbb: { Value:"A2-b", Text:"A2-b (a:bb:bbb)" } }, 
                        cc: { aaa: { Value:"A3-a", Text:"A3-a (a:cc:aaa)" }, bbb: { Value:"<b style='color:red'>A3-b</b>", Text:"A3-b (a:cc:bbb)" }, ccc: { Value:"A3-c", Text:"A3-c (a:cc:ccc)" }, ddd:{ Value:"A3-d", Text:"A3-d (a:cc:ddd)" } } 
                        },
                     b: { aa: { aaa: { Value: "B1-a", Text:"B1-a (b:aa:aaa)" }, bbb: { Value:"B1-b", Text:"B1-b (b:aa:bbb)" } }, bb: { aaa: { Value:"B2-a", Text:"B2-a (b:bb:aaa)" } } },
                     c: { aa: { aaa: { Value: "C1-a", Text:"C1-a (c:aa:aaa)" }, bbb: { Value:"C1-b", Text:"C1-b (c:aa:bbb)" } }, bb: { aaa: { Value:"C2-a", Text:"C2-a (c:bb:aaa)" }, bbb: { Value:"C2-b", Text:"C2-b (c:bb:bbb)" }, ccc: { Value:"C2-c", Text:"C2-a (c:bbb:ccc)" } } }
                     }
                  },
                 SUGGEST: { SuggestReplace:3 }
               } 
            },
         { id:6, 
            V: { LIST:6, LIST1:2, LIST2:1, LIST3:2, INFO:"List for Bool type" }, 
            A: { 
               LIST: { Type:"Bool", BoolMax:11, BoolCycle:10, IndexList:1 },
               LIST1: { Type:"Bool", BoolMax:3, BoolCycle:10, Button:"List", IndexList:1, List:"|A|<b style='color:red'>B</b>|C" },
               LIST2: { Type:"Bool", BoolMaxFormula:"var L = Grid.GetList(Row,Col); return L ? L.split(L[0]).length-1 : 0", BoolCycle:10, Button:"List", IndexList:1, List:"@|A1|<i style='color:blue'>A2</i>|A3@|B1|B2@|C1|C2" },
               LIST3: { Type:"Bool", BoolMaxFormula:"var L = Grid.GetList(Row,Col); return L ? L.split(L[0]).length-1 : 0", BoolCycle:10, Button:"List", IndexList:1, List:"~@|A1-a|A1-b|A1-c@|A2-a|A2-b@|A3-a|<b style='color:red'>A3-b</b>|A3-c|A3-d~@|B1-a|B1-b@|B2-a~@|C1-a|C1-b@|C2-a|C2-b|C2-c" },
               } 
            },
         { id:7, 
            V: { 
               LIST:"Five;<i style='color:blue'>Six</i>", LIST1:"A;<b style='color:red'>B</b>", LIST2:"<i style='color:blue'>A2</i>;B1", LIST3:"A2-b;B1-a", 
               INFO:"List range by values", INFO2:"Suggest in range,\nuse ctrl+up/down"
               }, 
            A: { 
               LIST: { Range:1, Wrap:1 }, VALUE: { Wrap:2 },
               LIST1: { Range:1, Wrap:1 }, VALUE123: { Wrap:2 },
               LIST2: { Range:1, Wrap:1 },
               LIST3: { Range:1, Wrap:1 },
               SUGGEST: { Range:1, Wrap:3, SuggestKeys:1, SuggestSeparator:";", SuggestSeparatorType:1 },
               } 
            },
         { id:8, 
            V: { LIST:"2;3;10", LIST1:"1;2", LIST2:"0;2;3", LIST3:"0;2;3;5", INFO:"List range by indexes", INFO2:"Suggest in range,\nreplace selected" },
            A: { 
               LIST: { Range:1, IndexList:1, Wrap:1, ListIcon:"ArrowDown" }, VALUE: { Wrap:2 },
               LIST1: { Range:1, IndexList:1, Wrap:1, List:"|A|<b style='color:red'>B</b>|C" }, VALUE123: { Wrap:2 }, 
               LIST2: { Range:1, IndexList:1, Wrap:1, List:"@|A1|<i style='color:blue'>A2</i>|A3@|B1|B2@|C1|C2" }, 
               LIST3: { Range:1, IndexList:1, Wrap:1, List:"~@|A1-a|A1-b|A1-c@|A2-a|A2-b@|A3-a|<b style='color:red'>A3-b</b>|A3-c|A3-d~@|B1-a|B1-b@|B2-a~@|C1-a|C1-b@|C2-a|C2-b|C2-c" }, 
               SUGGEST: { Range:1, Wrap:3, SuggestKeys:1, SuggestSeparator:";", SuggestSeparatorType:1, SuggestReplace:3 },
               } 
            },
         { id:9, 
            V: { LIST:"a;d;g", LIST1:"a;c", LIST2:"aa;ac;ca", LIST3:"aab;acb;caa", INFO:"List range by keys", INFO2:"Suggest with LF separator" },
            A: { 
               LIST: { Range:1, Wrap:1, List: { a:"Zero", b:"One", c:"Two", d:"<b style='color:red'>Three</b>", e:"Four", f:"Five", g:"<i style='color:blue'>Six</i>", h:"Seven", i:"Eight", j:"Nine", k:"Ten" } },
               LIST1: { Range:1, Wrap:1, List: { a:"A", b:"<b style='color:red'>B</b>", c:"C" } }, VALUE123: { Wrap:2 },
               LIST2: { Range:1, Wrap:1, List: { a: { aa : "A1", ab:"<i style='color:blue'>A2</i>", ac:"A3" }, b: { ba:"B1", bb:"B2" }, c: { ca:"C1", bb:"C2" } } },
               LIST3: { Range:1, Wrap:1, List: {
                     a: { aa: { aaa:"A1-a", aab:"A1-b", aac:"A1-c" }, ab: { aba:"A2-a", abb:"A2-b" }, ac: { aca:"A3-a", acb:"<b style='color:red'>A3-b</b>", acc:"A3-c", acd:"A3-d" } },
                     b: { ba: { baa:"B1-a", bab:"B1-b" }, bb: { bba:"B2-a" } },
                     c: { ca: { caa:"C1-a", cab:"C1-b" }, cb: { cba:"C2-a", cbb:"C2-b", cbc:"C2-c" } }
                     }
                  },
               SUGGEST: { Wrap:7, SuggestKeys:1, SuggestSeparator:"\n", SuggestSeparatorType:1 },
               } 
            },
         { id:10, 
            V: { LIST:"Two", LIST1:"b", LIST2:"aa", LIST3:"bbb", INFO:"ListMenu", INFO2:"SuggestMenu" },
            A: { 
               LIST: { ListIcon:"Menu", ListMenu: { Place: { Align:4, VertAlign:1 }, Script: { Items: [ 
                     "Zero",
                     { Text:"1-10", Menu: "|One|Two|<b style='color:red'>Three</b>|Four|Five|<i style='color:blue'>Six</i>|Seven|Eight|Nine|Ten" },
                     { Text:"11-20", Menu: ["Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen","Twenty"] },
                     "21-30", { Value:21, L:1 }, { Value:22, L:1 }, { Value:23, L:1 }, { Value:24, L:1 }, { Value:25, L:1 }, { Value:26, L:1 }, { Value:27, L:1 }, { Value:28, L:1 }, { Value:29, L:1 }, { Value:30, L:1 },
                     { Text:"31-60", A: { Color:"#ADF", TextColor:"blue" }, AV: { Color:"#ADF" }, Menu: { Script: { Items:[ { Text:"31-40", Menu:[31,32,33,34,35,36,37,38,39,30] }, { Text:"41-50", Menu:[41,42,43,44,45,46,47,48,49,50] }, { Text:"51-60", Menu:[51,52,53,54,55,56,57,58,59,60] } ] } } },
                  ] } } },
               LIST1: { 
                  List: { a:"A", b:"<b style='color:red'>B</b>", c:"C" },
                  ListMenu: [ { Value:"a", Text:"A (a)" }, { Value:"b", Text:"B (b)" }, { Value:"c",Text:"C (c)" } ] 
                  },
               LIST2: { 
                  List: { a: { aa : "A1", bb:"<i style='color:blue'>A2</i>", cc:"A3" }, b: { aa:"B1", bb:"B2" }, c: { aa:"C1", bb:"C2" } },
                  ListMenu: { 
                     a: [ { Value:"aa", Text:"A1 (a:aa)" }, { Value:"bb", Text:"A2 (a:bb)" }, { Value:"cc", Text:"A3 (a:cc)" } ],
                     b: [ { Value:"bb", Text:"B1 (b:aa)" }, { Value:"bb", Text:"B2 (b:bb)" } ], 
                     c: [ { Value:"cc", Text:"C1 (c:aa)" }, { Value:"bb", Text:"C2 (c:bb)" } ]
                     } },
               LIST3: { 
                  List: {
                     a: { aa: { aaa:"A1-a", bbb:"A1-b", ccc:"A1-c" }, bb: { aaa:"A2-a", bbb:"A2-b" }, cc: { aaa:"A3-a", bbb:"<b style='color:red'>A3-b</b>", ccc:"A3-c", ddd:"A3-d" } },
                     b: { aa: { aaa:"B1-a", bbb:"B1-b" }, bb: { aaa:"B2-a" } },
                     c: { aa: { aaa:"C1-a", bbb:"C1-b" }, bb: { aaa:"C2-a", bbb:"C2-b", ccc:"C2-c" } }
                     },
                  ListMenu: {
                     a: { 
                        aa: [ { Value:"aaa", Text:"A1-a (a:aa:aaa)" }, { Value:"bbb", Text:"A1-b (a:aa:bbb)" }, { Value:"ccc", Text:"A1-c (a:aa:ccc" } ], 
                        bb: [ { Value:"aaa", Text:"A2-a (a:bb:aaa)" }, { Value:"bbb", Text:"A2-b (a:bb:bbb)" } ], 
                        cc: [ { Value:"aaa", Text:"A3-a (a:cc:aaa)" }, { Value:"bbb", Text:"A3-b (a:cc:bbb)" }, { Value:"ccc", Text:"A3-c (a:cc:ccc)" }, { Value:"ddd", Text:"A3-d (a:cc:ddd)" } ] 
                        },
                     b: { aa: [ { Value: "aaa", Text:"B1-a (b:aa:aaa)" }, { Value:"bbb", Text:"B1-b (b:aa:bbb)" } ], bb: [ { Value:"aaa", Text:"B2-a (b:bb:aaa)" } ] },
                     c: { aa: [ { Value: "aaa", Text:"C1-a (c:aa:aaa)" }, { Value:"bbb", Text:"C1-b (c:aa:bbb)" } ], bb: [ { Value:"aaa", Text:"C2-a (c:bb:aaa)" }, { Value:"bbb", Text:"C2-b (c:bb:bbb)" }, { Value:"ccc", Text:"C2-a (c:bbb:ccc)" } ] }
                     }
                  },
               SUGGEST: { SuggestMenu: { Place: { VertAlign:3 } } }
               }
            },
         { id:11, MaxHeight:95,
            V: { LIST:"Zero;Two;<b style='color:red'>Three</b>;11;48;49", LIST1:"b;c", LIST2:"ba;cb", LIST3:"bab;cbb;cbc", INFO:"ListMenu range", INFO2:"SuggestMenu with Items" },
            A: { 
               LIST: { Range:1, Wrap:1, CellBorder:"ListHigh,,,,edittool", ListMenu: { Place: { Modal:1 }, Script: { MenuValueWidth:150, Html:2, Items: [
                     { Text:"1-10", Menu: "|One|Two|<b style='color:red'>Three</b>|Four|Five|<i style='color:blue'>Six</i>|Seven|Eight|Nine|Ten" },
                     { Text:"11-20", Menu: ["Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen","Twenty"] },
                     { Text:"21-50", A: { Color:"#ADF", TextColor:"blue" }, AV: { Color:"#ADF" }, Menu: { Script: { MenuValueWidth:100, Items:[
                        { Text:"21-30", Menu:[21,22,23,24,25,26,27,28,29,30] },{ Text:"31-40", Menu:[31,32,33,34,35,36,37,38,39,30] }, { Text:"41-50", Menu:[41,42,43,44,45,46,47,48,49,50] } 
                        ] } } }
                  ] } } },
               LIST1: { Range:1, Wrap:1, 
                  List: { a:"A", b:"<b style='color:red'>B</b>", c:"C" },
                  ListMenu: [ { Value:"a", Text:"A (a)" }, { Value:"b", Text:"B (b)" }, { Value:"c",Text:"C (c)" } ] 
                  },
               LIST2: { Range:1, Wrap:1, 
                  List: { a: { aa : "A1", ab:"<i style='color:blue'>A2</i>", ac:"A3" }, b: { ba:"B1", bb:"B2" }, c: { ca:"C1", cb:"C2" } },
                  ListMenu: { 
                     a: [ { Value:"aa", Text:"A1 (a:aa)" }, { Value:"ab", Text:"A2 (a:ab)" }, { Value:"ac", Text:"A3 (a:ac)" } ],
                     b: [ { Value:"ba", Text:"B1 (b:ba)" }, { Value:"bb", Text:"B2 (b:bb)" } ], 
                     c: [ { Value:"ca", Text:"C1 (c:ca)" }, { Value:"cb", Text:"C2 (c:cb)" } ]
                     } },
               LIST3: { Range:1, Wrap:1, 
                  List: {
                     a: { aa: { aaa:"A1-a", aab:"A1-b", aac:"A1-c" }, ab: { aba:"A2-a", abb:"A2-b" }, ac: { aca:"A3-a", acb:"<b style='color:red'>A3-b</b>", acc:"A3-c", acd:"A3-d" } },
                     b: { ba: { baa:"B1-a", bab:"B1-b" }, bb: { bba:"B2-a" } },
                     c: { ca: { caa:"C1-a", cab:"C1-b" }, cb: { cba:"C2-a", cbb:"C2-b", cbc:"C2-c" } }
                     },
                  ListMenu: {
                     a: { 
                        aa: [ { Value:"aaa", Text:"A1-a (a:aa:aaa)" }, { Value:"aab", Text:"A1-b (a:aa:aab)" }, { Value:"aac", Text:"A1-c (a:aa:aac" } ], 
                        ab: [ { Value:"aba", Text:"A2-a (a:ab:aba)" }, { Value:"abb", Text:"A2-b (a:ab:abb)" } ], 
                        ac: [ { Value:"aca", Text:"A3-a (a:ac:aca)" }, { Value:"acb", Text:"A3-b (a:ac:acb)" }, { Value:"acc", Text:"A3-c (a:ac:acc)" }, { Value:"acd", Text:"A3-d (a:ac:acd)" } ] 
                        },
                     b: { ba: [ { Value: "baa", Text:"B1-a (b:ba:baa)" }, { Value:"bab", Text:"B1-b (b:ba:bab)" } ], bb: [ { Value:"bba", Text:"B2-a (b:bb:bba)" } ] },
                     c: { ca: [ { Value: "caa", Text:"C1-a (c:ca:caa)" }, { Value:"cab", Text:"C1-b (c:ca:cab)" } ], cb: [ { Value:"cba", Text:"C2-a (c:cb:cba)" }, { Value:"cbb", Text:"C2-b (c:cb:cbb)" }, { Value:"ccc", Text:"C2-a (c:cb:cbc)" } ] }
                     }
                  },
               VALUE: { Wrap:2 }, VALUE123: { Wrap:2 },
               SUGGEST: { RightIcons:"List", SuggestMenu: { Script: { Items:"|Zero|One|Two|<b style='color:red'>Three</b>|Four|Five|<i style='color:blue'>Six</i>|Seven|Eight|Nine|Ten" } } }
               }
            },
         { id:12, V: { LIST:"Server_1", LIST1:"Srv_2", INFO:"ListMenuUrl", INFO2:"SuggestMenuUrl" },
            A: {
               LIST: { ListMenuUrl:"*Col" },
               LIST1: { ListMenuUrl:"*Col" },
               LIST2: { ListMenuUrl:"*Col$*Rel1", ListMenuReload:1 },
               LIST3: { ListMenuUrl:"*Col$*Rel1$*Rel2", ListMenuReload:1 },
               SUGGEST: { SuggestMenuUrl:"*Col" },
               }
            }
         ],
      Head: [
         { D:"HeaderFocus", V: { INFO:"Description", LIST:"List", VALUE:"List value", LIST1:"Rel List 1", LIST2:"Rel List 2", LIST3:"Rel List 3", VALUE123:"List 1:2:3 values", INFO2:"Description", SUGGEST:"Suggest" } }
         ],
      CellBorders: {
         ListOut: { D:"Edit", Type:127, Left:4, Right:4 }
         },
      Top: [
         { id:"Data 1", Cells:"Reload,Print,Pdf,Export,Copy" }, { id:"Data 2", Pos:4, Cells:"Settings,Undo,Redo" }, { D:"Layout", Pos:3 },
         { id:"Testbar", Height:0, Pos:1, MarginTop:6, UseResize:3, Narrow:32, MinWidth:15, NoUndo:0, Cells: [ 
            { D:"List", EmptyString:"<i style='color:gray;'>Basic List</i>", Type:"Auto", List:"|Zero|One|Two|<b style='color:red'>Three</b>|Four|Five|<i style='color:blue'>Six</i>|Seven|Eight|Nine|Ten", Suggest:1, Width:60 },
            { D:"List", EmptyString:"<i style='color:gray;'>Left Icon</i>", CellBorder:"List,,,,yellow", IconAlign:0, Type:"Auto", List:"|Zero (very long value to wide the menu)|One|Two|<b style='color:red'>Three</b>|Four|Five|<i style='color:blue'>Six</i>|Seven|Eight|Nine|Ten", Suggest:1, Width:55 },
            { D:"List", EmptyString:"<i style='color:gray;'>High CellBorder</i>", CellBorder:"ListHigh,,,,edittool", Type:"Auto", List:"|Zero (very long value to wide the menu)|One|Two|<b style='color:red'>Three</b>|Four|Five|<i style='color:blue'>Six</i>|Seven|Eight|Nine|Ten", Suggest:1, Width:100 },
            { D:"List", EmptyString:"<i style='color:gray;'>No CellBorder</i>", CellBorder:"", Type:"Auto", List:"|Zero|One|Two|<b style='color:red'>Three</b>|Four|Five|<i style='color:blue'>Six</i>|Seven|Eight|Nine|Ten", Suggest:1, Width:87 },
            { D:"List", EmptyString:"<i style='color:gray;'>Outside icon</i>", CellBorder:"ListOut,,,,edittool", Type:"Auto", List:"|Zero (very long value to wide the menu)|One|Two|<b style='color:red'>Three</b>|Four|Five|<i style='color:blue'>Six</i>|Seven|Eight|Nine|Ten", Suggest:1, Width:80 },
            { D:"List", EmptyString:"<i style='color:gray;'>Editable</i>", Button:"", CellBorder:"ListOut,,,,edittool", Type:"Auto", List:"|Zero|One|Two|<b style='color:red'>Three</b>|Four|Five|<i style='color:blue'>Six</i>|Seven|Eight|Nine|Ten", Suggest:1, Width:53 },
            { D:"List", EmptyString:"<i style='color:gray;'>Editable & Range list</i>", Range:1, Color:"white", Wrap:6, Button:"", CellBorder:"", Type:"Auto", List:"|Zero (very long value to wide the menu)|One|Two|<b style='color:red'>Three</b>|Four|Five|<i style='color:blue'>Six</i>|Seven|Eight|Nine|Ten", Suggest:1, Width:65, MinWidth:65 },
         ] },
         "Version"
         ],
      Media: {
         Mobile: {
            Top:[ { id:"Data 2", Pos:0 }, { id:"Layout", Pos:0 } ]
            }
         }
   };

   //. Sample data for dynamically generated popup lists and suggests, in real application it should be loaded dynamically from data source in the onDataSend event handler or directly from given server url
   const ListData = {
      LIST: { Body:[ { id:12, A: { LIST: { ListMenu: "|Server_1|Server_2|Server_3|Server_4|Server_5" } } } ] },
      LIST1: { Body:[ { id:12, A: { LIST1: { ListMenu: "|Srv_1|Srv_2" } } } ] },
      LIST2$Srv_1: { Body:[ { id:12, A: { LIST2: { ListMenu: { Srv_1: "|S1_V1|S1_V2" } } } } ] },
      LIST2$Srv_2: { Body:[ { id:12, A: { LIST2: { ListMenu: { Srv_2: "|S2_V1|S2_V2" } } } } ] },
      LIST3$Srv_1$: "",
      LIST3$Srv_2$: "",
      LIST3$Srv_1$S1_V1: { Body:[ { id:12, A: { LIST3: { ListMenu: { Srv_1: { S1_V1: "|S1_V1_N1|S1_V1_N2|S1_V1_N3|S1_V1_N4" } } } } } ] },
      LIST3$Srv_1$S1_V2: { Body:[ { id:12, A: { LIST3: { ListMenu: { Srv_1: { S1_V2: "|S1_V2_N1|S1_V2_N2|S1_V2_N3" } } } } } ] },
      LIST3$Srv_2$S2_V1: { Body:[ { id:12, A: { LIST3: { ListMenu: { Srv_2: { S2_V1: "|S2_V1_N1|S2_V1_N2|S2_V1_N3|S2_V1_N4|S2_V1_N5" } } } } } ] },
      LIST3$Srv_2$S2_V2: { Body:[ { id:12, A: { LIST3: { ListMenu: { Srv_2: { S2_V2: "|S2_V2_N1|S2_V2_N2|S2_V2_N3" } } } } } ] },
      SUGGEST: { Body:[ { id:12, A: { SUGGEST: { SuggestMenu: ",AliceBlue-Server,AntiqueWhite-Server,Aqua-Server,Aquamarine-Server,Azure-Server,Beige-Server,Bisque-Server,Black-Server,BlanchedAlmond-Server,Blue-Server,BlueViolet-Server,Brown-Server,BurlyWood-Server,CadetBlue-Server,Chartreuse-Server,Chocolate-Server,Coral-Server,CornflowerBlue-Server,Cornsilk-Server,Crimson-Server,Cyan-Server,DarkBlue-Server,DarkCyan-Server,DarkGoldenRod-Server,DarkGray-Server,DarkGreen-Server,DarkKhaki-Server,DarkMagenta-Server,DarkOliveGreen-Server,Darkorange-Server,DarkOrchid-Server,DarkRed-Server,DarkSalmon-Server,DarkSeaGreen-Server,DarkSlateBlue-Server,DarkSlateGray-Server,DarkTurquoise-Server,DarkViolet-Server,DeepPink-Server,DeepSkyBlue-Server,DimGray-Server,DodgerBlue-Server,Ecru-Server,Emerald-Server,FireBrick-Server,FloralWhite-Server,ForestGreen-Server,Fuchsia-Server,Gainsboro-Server,GhostWhite-Server,Gold-Server,GoldenRod-Server,Gray-Server,Green-Server,GreenYellow-Server,HoneyDew-Server,HotPink-Server,IndianRed-Server,Indigo-Server,Ivory-Server,Jade-Server,Jonquil-Server,Khaki-Server,Lavender-Server,LavenderBlush-Server,LawnGreen-Server,LemonChiffon-Server,LightBlue-Server,LightCoral-Server,LightCyan-Server,LightGoldenRodYellow-Server,LightGrey-Server,LightGreen-Server,LightPink ,LightSalmon-Server,LightSeaGreen-Server,LightSkyBlue-Server,LightSlateGray-Server,LightSteelBlue-Server,LightYellow-Server,Lime-Server,LimeGreen-Server,Linen-Server,Magenta-Server,Maroon-Server,MediumAquaMarine-Server,MediumBlue-Server,MediumOrchid-Server,MediumPurple-Server,MediumSeaGreen-Server,MediumSlateBlue-Server,MediumSpringGreen-Server,MediumTurquoise-Server,MediumVioletRed-Server,MidnightBlue-Server,MintCream-Server,MistyRose-Server,Moccasin-Server,NavajoWhite-Server,Navy-Server,OldLace-Server,Olive-Server,OliveDrab-Server,Orange-Server,OrangeRed-Server,Orchid-Server,PaleGoldenRod-Server,PaleGreen-Server,PaleTurquoise-Server,PaleVioletRed-Server,PapayaWhip-Server,PeachPuff-Server,Peru-Server,Pink-Server,Plum-Server,PowderBlue-Server,Purple-Server,Red-Server,RosyBrown-Server,RoyalBlue-Server,SaddleBrown-Server,Salmon-Server,SandyBrown-Server,SeaGreen-Server,SeaShell-Server,Sienna-Server,Silver-Server,SkyBlue-Server,SlateBlue-Server,SlateGray-Server,Snow-Server,SpringGreen-Server,SteelBlue-Server,Tan-Server,Teal-Server,Thistle-Server,Tomato-Server,Turquoise-Server,UltraMarine-Server,Umber-Server,Violet-Server,Wheat-Server,White-Server,WhiteSmoke-Server,Xanadu-Server,Yellow-Server,YellowGreen-Server,Zaffre" } } } ] }
      }

   //. Called for every FastGrid request, but used only for dynamically loaded data for popup lists and suggests by ListMenuUrl / SuggestMenuUrl
   //. Returns direct data without loading them from server, just for demonstration
   function onDataSend(grid,source,func,index){
      var data = ListData[source.Url]; 
      if(data!=null){ func(data); console.log("Loaded dynamic data from url: "+source.Url); return true; } //. If ListData contains the url, it is request for dynamic list/suggest data, returns them and stops the communication. func can be called also asynchronously, after data are loaded
      return null;                               //. Other requests are unchanged
      }

   
</script>

<template>

      <h1>4. Cell popup menus - List &amp; Suggest</h1>
      <h5>Combo boxes - choosing cell values from popup list</h5>
      <section>
         <FastGrid :src="src" @data-send="onDataSend" style="display:inline-block; max-width:100%;"/>
      </section>

      
      <ul>
         <li>For more information see <a target="FGDoc" href="https://www.treegrid.com/FDoc/Menu.htm#List">List</a>.</li>
         <li><h4>Defining popup list</h4><br />
            The popup list can be defined by cell attribute <dfn>List</dfn> or <dfn>ListMenu</dfn>.<br />
            <ul>
               <li><dfn>List</dfn><br />
               <b>List</b> affects the value in the cell. The Cell value contain(s) the <b>List</b> key(s) and shows the <b>List</b> value(s).<br />
               <b>List</b> can set also other text attributes like <b>TextColor</b> with the individual items.<br />
               <b>List</b> can be defined by three ways:
               <ul>
                  <li>As first character separated string or array. In this case the keys are the values themselves. Or their indexes if set <dfn>IndexList</dfn>.</li>
                  <li>By object with key / value pairs.</li>
                  <li>By object with key / object pairs, where the object contains attribute <b>Value</b> for the cell value and optionally <b>Text</b> for menu text and / or <b>Suggest</b> for suggest menu text and text attributes like <b>TextColor</b> to be applied to cell text.</li>
               </ul>
               </li>
               <li><dfn>ListMenu</dfn><br />
               <b>ListMenu</b> does <b>not</b> affect the cell value, it just defines the popup menu and can set only cell value, not any other attribute.<br />
               It can be used to define the list instead of the <b>List</b> attribute or 
               to change the popup menu setting showing the list defined by <b>List</b> or by the <b>ListMenu</b>.<br />
               <b>ListMenu</b> can be defined in three ways:
               <ul>
                  <li>As first character separated string or array as simple menu defition with only values.</li>
                  <li>Array of objects, where the object contains attribute <b>Value</b> for the cell value and optionally <b>Text</b> for menu text and / or <b>Suggest</b> for suggest menu text and / or other attributes affecting the menu item display.</li>
                  <li>Full FastGrid menu definition with <b>Script</b> tag.</li>
               </ul>
               <b>ListMenu</b> can be downloaded also from server on demand by setting <b>Cfg</b> or cell attribute <dfn>ListMenuUrl</dfn>. It can be loaded once or on every show by setting <dfn>ListMenuReload</dfn> attribute.<br />
               </li>
            </ul>
         </li>
      
         <li><h4>Showing popup list</h4><br />
            The popup list can be shown by:
            <ul>
               <li>adding "<b>List</b>" to icons in <dfn>LeftIcons</dfn> / <dfn>RightIcons</dfn> / <dfn>TextIcons</dfn> or <b>toolbar</b> cell <dfn>Icon</dfn>.</li>
               <li>on <b>toolbar</b> setting <dfn>D</dfn> to "<b>List</b>" or "<b>ListSmall</b>".</li>
               <li>adding the "<b>List</b>" to cell attribute <dfn>Button</dfn>.</li>
               <li>assigning <b>action</b> <dfn>ShowList</dfn> to some event (e.g. <span class="inline-code">Actions: &#x7B; OnRightClick:"ShowList()" &#x7D;</span>.</li>
               <li>calling <b>API method</b> <dfn>ShowList</dfn>.</li>
               <li>setting cell attribute <dfn>Suggest</dfn>.</li>
            </ul>
            The cell with list can be visually marked by inner border set by <dfn>CellBorder</dfn>. On toolbar it is already set by <b>D:"List"</b>.<br />
         </li>
         <li><h4>Related popup lists</h4><br />
         The <b>List</b> and / or <b>ListMenu</b> can be related to another cell value, usually also with <b>List</b> / <b>ListMenu</b>, to use specific list according the value in the related cell.<br />
         There can be more related cells in the chain. In the sample there are three related cells in LIST1 / LIST2 / LIST3 columns. LIST2 is related to LIST1 and LIST3 is related to LIST2 (and to LIST1).<br />
         The related cell is set by attribute <dfn>ListRelated</dfn> containing column to id to refer another cell in the same row or it can contain row and column ids to refer another cell.<br />
         If the cell is related to more cells, their ids are listed all, comma separated, starting by the most distant one in the chain.<br />
         After change of the related cell, the next cells in related chain should be cleared using <dfn>ClearCells</dfn> attribute, its format is the same as <b>ListRelated</b>.<br />
         </li>
         <li><h4>Not existing items in popup list</h4><br />
            If the cell contains value not included in the <b>List</b>, it is normally shown or there can be shown <dfn>NoListValue</dfn> if defined.<br />
            The cell with popup list is still editable, to restrict editing and show the list always set <dfn>Button</dfn> = "<b>List</b>.<br />
            To restrict entering not existing values or enter case sensitive or without white space set <dfn>ListEdit</dfn> to appropriate value.<br />
         </li>
         <li><h4>Suggest items in popup list during editing</h4><br />
            To show popup list with suggested items for entered text set <dfn>Suggest</dfn> attribute, it also controls when the suggest list is shown.<br />
            The suggest list shows subset of <dfn>List</dfn> or <dfn>SuggestMenu</dfn> items that pass search settings set by <dfn>SuggestSearch</dfn> and <dfn>SuggestType</dfn> attributes for actually entered text. 
            The suggest list is updated whenever the entered text changes during editing.<br />
            It is possible to show suggest list only for part of the entered text, separated by <dfn>SuggestSeparator</dfn> character, often set to ";" like for <b>Range</b> cells.<br />
            <b>SuggestMenu</b> can be downloaded also from server on demand by setting <b>Cfg</b> or cell attribute <dfn>SuggestMenuUrl</dfn>. 
            The server can return full suggest menu once or can return different suggest menu per edited value, according to <dfn>SuggestMenuReload</dfn> attribute.<br />
            There are various other attributes for Suggest, see <a target="FGDoc" href="https://www.treegrid.com/FDoc/Menu.htm#Suggest">Suggest</a>.<br />
         </li>
      </ul>
      
</template>
