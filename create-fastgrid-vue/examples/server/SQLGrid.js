// ! Support file only, run Grid.html instead !
//. This file is used as layout url, data url and SaveUrl
//. Generates layout for FastGrid by getlayout() function, data for FastGrid by getdata() function or saves received changes to database by set() function
// -----------------------------------------------------------------------------------------------------------------------------
//. Reads data from database and returns them in JSON
function getdef(req,res){
var sql = require('better-sqlite3'), db = new sql('SQLite.db'); //. It uses SQLite3 database engine on database in file SQLite.sb
try { var rows = db.prepare("SELECT MIN(Week) as min,MAX(Week) as max FROM TableData WHERE Week>0 AND Week<53").all(); } //. Selects the whole table and calls the process function with the results
catch(e){ err("SQL select error: "+e.message,res); return; } 
var r = rows[0];
var Cols = [], CSum = "", DRes = { Sum:'sum()' }, FRes = { Sum:'sum(null,"Body")' }, DDef = {};
for(var i=r.min;i<=r.max;i++){
   var Week = "W" + i;
   Cols.push({ id:Week, Type:'Number', Format:',0.##' }); //. Column definitions
   CSum += Week+"+";                                      //. Right fixed result column formula
   DRes[Week] = 'sum()';                                  //. Parent row formulas
   FRes[Week] = 'sum(null,\'Body\')';                     //. Result row formulas
   DDef[Week] = 0;                                        //. Default values for data rows
   }

var Data = {
   Cfg: { id:'ResourceGrid', 
      DateFormatOut:"yyyy-MM-dd",         //. Date format for all saved dates
      SaveUrl: { Url:"Grid.js?func=set", Debug:1 },     //. Uploads changes to this url
      SaveFlags:"Changed,State,Quote,Parent,ParentId",  //. Uploads parent row ids for moved / added rows
      SaveIdCols:"Project",               //. Uses values of Parent column instead of row id for upload
      PdfUrl:'../Pdf.js?func=getpdf',     //. Uses this url for PDF export
      RowChanges:239,                     //. Marks moved rows only between parents, to support ParentId in SaveFlags
      },
   DefCols: { 
      Col: { UseMove:1 }
      },  
   LeftCols: [
      { id: 'Panel', D:'Panel', LeftIcons:"SelectRow,DeleteRow,AddRow" },
      { id: 'Project', Width:200, Type:'String' }
      ],
   Cols: Cols,
   RightCols: [
      { id:'Sum', Width:60, Type:'Number', Formula:CSum.slice(0,-1), NoEdit:1, Format:',0.##' }
      ],
   DefRows: {
      Row: {  V: { Project:'New resource' }, CD:'', DragId:'Row', Accept:'', V: DDef },
      Node: { V: { Project:'New project' }, CD:'Row', DragId:'Node', Accept:'Row', NoEdit:1, F: DRes, A:{ Project: { TextStyle:1, NoEdit:0 }} }
      },
   Body: {
      CD:"Node", Accept:"Node", Tree:"Project"
      },
   Head: [
      { D:'Header', id:'Header', V: { Project:'Project / resource' } }
      ],
   Foot: [
      { D:'Node', id:"Results", F: FRes, V:{ Project:'Total results'}, A: { Project: { NoEdit:1 } } }
      ],
   Top: [ { id:"Data", Cells:"Settings,Save,Reload,PrintPdf,Export,Copy,AddRowEnd,AddRows,Undo,Redo" }, "Layout" ],
   Media: {
      Tablet: { DefCols: { Col: { UseMove:0 } }, LeftCols:[{ id:"Panel",UseMove:1 } ] },
      Mobile: { LeftCols: [{ id:'Project', Width:180 }] }
      }
   }


end("FGrid.Data="+JSON.stringify(Data),res);
}

// -----------------------------------------------------------------------------------------------------------------------------
//. Reads data from database and returns them in JSON
function getdata(req,res){
var sql = require('better-sqlite3'), db = new sql('SQLite.db'); //. It uses SQLite3 database engine on database in file SQLite.sb
try { var rows = db.prepare("SELECT * FROM TableData WHERE Week>0 AND Week<53 ORDER BY Project,Resource").all(); } //. Selects the whole table and calls the process function with the results
catch(e){ err("SQL select error: "+e.message,res); return; } 
var Prj = null, Res = null, s = "FGrid.Data={Body:[";
for(var i=0;i<rows.length;i++){ 
   var R = rows[i], p = R.Project, r = R.Resource;
   if(p!=Prj){                     //. New project row
      if(Prj!=null) s += "}},";    //. Ends previous project and resource rows
      Prj = p; Res = null; 
      s += "\n{ L:0, V: { Project:'" + Prj.replace(/\\/g,"\\\\").replace(/'/g,"\\'") + "' }},";
      }
   if(r!=Res){                      //. New resource row
      if(Res!=null) s += "}},";     //. Ends previous resource row
      Res = r; 
      s += "\n{ L:1, V: { Project:'" + Res.replace(/\\/g,"\\\\").replace(/'/g,"\\'") + "', ";
      }
   s += "W" + R.Week + ":" + (R.Hours-0||0) + ", "; //. Week = Hours (like W42:17)
   }
if(Prj != null) s += "}}";          //. Ends previous project and resource rows
s += "\n]}";
end(s,res);
}
// -----------------------------------------------------------------------------------------------------------------------------
//. Saves changed data in JSON to database
function set(req,res){
var qstr = require('querystring'), body = ""; 
req.on('data',function(data){ body += data.toString(); });
req.on('end', function(){
   var D = qstr.parse(body).Data; if(!D) { err("Empty request",res); return; }
   D = JSON.parse(D); 
   if(!D ||!D.ChangedRows) { err("Request without ChangedRows",res); return; }
   var sql = require('better-sqlite3'), db = new sql('SQLite.db'); //. It uses SQLite3 database engine on database in file SQLite.sb
   D = D.ChangedRows;
   var Last = [];
   for(var di=0;di<D.length;di++) try {
      var r = D[di], V = r.V || {};
      var id = (r.id+"").split("\u007F");

      //. --- Project row ---
      if(id.length==1){  
         var prj = "'" + id[0].replace(/'/g,"''") + "'";
         var where = " WHERE Project=" + prj + " ";
         if(r.Remove) db.prepare("DELETE FROM TableData" + where).run();
         else if(r.V!=null) Last.push("UPDATE TableData SET Project='" + (V["Project"]+"").replace(/'/g,"''") + "'" + where); //. Project cell is the only editable
         }   

      //. --- Resource row ---
      else {
         var prj = "'" + id[0].replace(/'/g,"''") + "'";
         var re = "'" + id[1].replace(/'/g,"''") + "'";
         var where = " WHERE Project=" + prj + " AND Resource=" + re + " ";
         if(r.Remove) db.prepare("DELETE FROM TableData" + where).run();
         else if(r.V!=null) {
            for(var name in V){
               var v = V[name];
               if(name[0]=='W'){   //. Hours number
                  var week = name.slice(1);
                  var rows = db.prepare("SELECT ID FROM TableData" + where + " AND Week=" + week).all();
                  if(!rows.length){ //. New item
                     var rows = db.prepare("SELECT MAX(ID) as max FROM TableData").all();
                     db.prepare("INSERT INTO TableData(ID,Project,Resource,Week,Hours) VALUES (" + (rows[0].max+1) + "," + prj + "," + re + "," + week + "," + v + ")").run();
                     }
                  else db.prepare("UPDATE TableData SET Hours=" + v + where + " AND Week=" + week).run(); //. Existing item
                  }
               else if(name=="Project") db.prepare("UPDATE TableData SET Resource=" + "'" + (v+"").replace(/'/g,"''") + "'" + where).run(); //. Changed resource name
               }
            }
         if(r.Parent) db.prepare("UPDATE TableData SET Project='" + (r.Parent+"").replace(/'/g,"''") + "'" + where).run(); //. Parent
         }
      }
   catch(e){ err("SQL command error: "+e.message,res); return; }

   //. --- Delayed changing project names ---'
   //. It must be done after changing all resources for the project
   for(var j=0;j<Last.length;j++) db.prepare(Last[j]).run();

   end("{IO:{Message:'Data saved successfully'}}",res);
   });
}
// -----------------------------------------------------------------------------------------------------------------------------
//. Support function,ends with str
function end(str,res){ 
res.writeHead(200, {"Content-Type":"text/plain; charset=utf-8","Access-Control-Allow-Origin":"*"}); //. Sets response header to UTF8 text and allows requests from other domains / ports
res.end(str);
}
// -----------------------------------------------------------------------------------------------------------------------------
//. Support function, logs given error and ends with JSON error
function err(e,res){ 
console.log("!"+e); 
end("{IO:{Result:\"-1\",Message:\""+e.replace(/"/g,"'")+"\"}}",res);
}
// -----------------------------------------------------------------------------------------------------------------------------
module.exports = { getdef, getdata, set };