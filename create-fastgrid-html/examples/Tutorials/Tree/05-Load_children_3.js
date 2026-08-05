FGrid.Data = {
Body:[
   { id:"3-1", Parent:3, V:{ A:"Loaded normal expanded parent" } },
   { id:"3-1-1", Parent:"3-1", V:{ A:"Loaded child, normal child" } },
   { id:"3-2", Parent:3, Collapsed:1, ChildrenL:1, V:{ A:"Loaded normal collapsed parent" } },
   { id:"3-2-1", Parent:"3-2", V:{ A:"Loaded child, normal child" } },
   { id:"3-2-2", Parent:"3-2", Collapsed:1, Children:3, ChildrenL:2, Color:"#FEF", V:{ A:"Loaded child, load children on expand" } },
   { id:"3-2-3", Parent:"3-2", V:{ A:"Loaded child, normal child" } },
   { id:"3-3", Parent:3, Collapsed:1, Children:2, Color:"#FDE", V:{ A:"Loaded child, load children on expand - error" } },
   ]
}