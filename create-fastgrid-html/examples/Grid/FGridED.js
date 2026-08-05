//. Include this script FGridED.js instead of FGridE.js to load the FastGrid main script FGridE.js on demand only when some FastGrid is being created
if(!window.FGrid){
   var FGrid = {};
   FGrid.FastGrid = function(src,tag,finish,dialog){
      var G = new function(){}();
      FGrid.LoadFGridE(function(){ FGrid.FastGrid(src,tag,finish,dialog,G); } );
      return G;
      }
   FGrid.PrintFastGrid = function(src,add,finish){
      var G = new function(){}();
      FGrid.LoadFGridE(function(){ FGrid.PrintFastGrid(src,add,finish,G); } );
      return G;
      }
   FGrid.StartFastGrid = function(){ FGrid.LoadFGridE(function(){ FGrid.StartFastGrid(); } ); }
   FGrid.InitFastGridTag = function(tag){ FGrid.LoadFGridE(function(){ FGrid.InitFastGridTag(tag); } ); }
   FGrid.AjaxCall = function(src,data,onfinish){ FGrid.LoadFGridE(function(){ FGrid.AjaxCall(src,data,onfinish); } ); } //. Cannot be used with Sync !
   FGrid.GetDocument = function(){ return document; }
   FGrid.Grids = [];
   FGrid.Sources = {};

   FGrid.LoadFGridE = function(func){
      if(FGrid.LoadFunc){ FGrid.LoadFunc.push(func); return; }
      var OFGrid = FGrid, LF = []; FGrid.LoadFunc = LF; LF.push(func);
      try {
         var F = document.getElementsByTagName("script"), S = document.createElement("script"); S.type = "text/javascript";
         for(var i=0;i<F.length;i++) if(F[i].src && F[i].src.indexOf("FGridED.js")>=0){ S.src = F[i].src.replace("FGridED.js","FGridE.js"); break; }
         if(!S.src) for(var i=0;i<F.length;i++) if(F[i].src && F[i].src.indexOf("FGridED")>=0){ S.src = F[i].src.replace("FGridED","FGridE"); break; }
         if(!S.src){ alert("Cannot download FastGrid script!\r\n\r\nThe FastGrid on demand script name is not FGridED"); return; }
         S.onload = function(ev){ 
            FGrid.Sources = OFGrid.Sources; 
            for(var n in OFGrid) if(FGrid[n]===undefined) FGrid[n] = OFGrid[n];
            for(var i=0;i<LF.length;i++) LF[i](); 
            }
         S.onerror = function(ev){  alert("Cannot download FastGrid script!\r\n\r\nThe FastGrid full script name is not FGridE or does not exist in the same directory as FGridED"); return; };
         document.documentElement.firstElementChild.appendChild(S);
         }
      catch(e){ alert("Cannot download FastGrid script!\r\n\r\nError message:\r\n"+(e.message ? e.message:e)); }
      }

   var E = function (){ return Reflect.construct(HTMLElement,[],E); };
   E.prototype = Object.create(HTMLElement.prototype);
   E.prototype.connectedCallback = function(){ FGrid.InitFastGridTag(this); }
   try { customElements.define("fast-grid",E); }
   catch(e){ window.addEventListener("load",FGrid.StartFastGrid); }
   }   