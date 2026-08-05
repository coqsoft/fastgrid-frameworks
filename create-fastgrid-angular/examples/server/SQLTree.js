// ! Support file only, run Tree.html instead !
//. This file is used as both data url and SaveUrl
//. Generates data for FastGrid by get() function or saves received changes to database by set() function
// -----------------------------------------------------------------------------------------------------------------------------
//. Reads data from database and returns them in JSON
function get(req,res){
var sql = require('better-sqlite3'), db = new sql('SQLite.db'); //. It uses SQLite3 database engine on database in file SQLite.sb
try { var rows = db.prepare("SELECT * FROM TreeData ORDER BY (SELECT TRIM(pid || ' ' || id))").all(); } //. Selects the whole table and calls the process function with the results
catch(e){ err("SQL select error: "+e.message,res); return; } 
var s = "FGrid.Data={Body:[", F = "],Foot:[";
for(var i=0;i<rows.length;i++){ 
   var r = rows[i];
   if(r.pid=="#") F += "{id:\"" + r.id + "\",V:[,,,," + r.G + "]},";
   else {
      s += "{id:\"" + r.id + "\",L:" + (r.pid=="" ? 0 : 1) + ",V:[";
      s += "\"" + (r.A?r.A.replace("\"","\\\"").replace("\\","\\\\"):"") + "\","; //. A = Product / Order name
      s += "\"" + (r.C?r.C.replace("\"","\\\"").replace("\\","\\\\"):"") + "\","; //. C = Customer
      s += r.D + ",";      //. D = Amount
      s += r.E + ",";      //. E = Unit price
      s += r.G + ",";      //. G = Discount
      s += r.H + ",";      //. H = Shipping
      s += r.I ? "\"" + r.I + "\"" : "";  //. I = Date
      s += "]},";
      }
   }
s += "]}";
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
   D = D.ChangedRows;
   for(var di=0,S=[];di<D.length;di++){
      var R = D[di], V = R.V || {}, s;
      if(R.Remove) s = "DELETE FROM TreeData WHERE ID="+R.id;
      else if(R.Add==1){
         s = "INSERT INTO TreeData(id,pid,"; var sv = "'" + R.id + "','" + (R.Parent||"") + "',";
         if(R.V) for(var n in V) { s += n + ","; sv += n=="A"||n=="C"||n=="I" ? "'" + (V[n]+"").replace("'","''") + "'," : V[n] + ","; }
         s = s.slice(0,-1) + ") VALUES(" + sv.slice(0,-1) + ")"; //. Last commas away
         }
      else if(R.Parent||R.V){
         s = "UPDATE TreeData SET ";
         if(R.V) for(var n in V) s += n=="A"||n=="C"||n=="I" ? n + " = '" + (V[n]+"").replace("'","''") + "'," : n + " = " + V[n] + ",";
         if(R.Parent) s += "pid = '" + R.Parent.replace("'","''") + ".',";
         s = s.slice(0,-1) + " WHERE id='" + R.id + "'"; //. Last comma away
         }
      S.push(s);
      }
   console.log(S.join("\n"));
   try { 
      var sql = require('better-sqlite3'), db = new sql('SQLite.db'); //. It uses SQLite3 database engine on database in file SQLite.sb
      for(var i=0;i<S.length;i++) db.prepare(S[i]).run(); //. Runs the commands one by one, because SQLite cannot run more commands at once
      }
   catch(e){ err("SQL command error: "+e.message,res); return; }
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
module.exports = { get, set };