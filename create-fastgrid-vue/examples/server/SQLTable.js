//. This file is used as both data url and SaveUrl
//. Generates data for FastGrid by get() function or saves received changes to database by set() function
// -----------------------------------------------------------------------------------------------------------------------------
//. Reads data from database and returns them in JSON
function get(req,res){
var sql = require('better-sqlite3'), db = new sql('SQLite.db'); //. It uses SQLite3 database engine on database in file SQLite.sb
try { var rows = db.prepare("SELECT * FROM TableData").all(); } //. Selects the whole table and calls the process function with the results
catch(e){ err("SQL select error: "+e.message,res); return; } 
var s = "FGrid.Data={Body:[";
for(var i=0;i<rows.length;i++){ 
   var r = rows[i];
   s += "{ id:" + r.ID + ", V:["
     + "'" + (r.Project?r.Project.replace("'","\\'").replace("\\","\\\\"):"") + "',"
     + "'" + (r.Resource?r.Resource.replace("'","\\'").replace("\\","\\\\"):"") + "',"
     + r.Week + ","
     + r.Hours + "]},\n";
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
      if(R.Remove){
         s = "DELETE FROM TableData WHERE ID="+R.id+"\n";
         }
      else if(R.Add==1){
         s = "INSERT INTO TableData(ID,Project,Resource,Week,Hours) VALUES("
               + R.id + "," 
               + "'" + (V.Project ? (V.Project+"").replace("'","''") : '') + "',"
               + "'" + (V.Resource ? (V.Resource+"").replace("'","''") : '') + "',"
               + (V.Week ? V.Week : '0') + ","
               + (V.Hours ? V.Hours : '0') + ")\n";
         }
      else if(R.V){
         s = "UPDATE TableData SET ";
         for(var name in V){
            if(name=="Project" || name=="Resource") s += name+" = '" + (V[name]+"").replace("'","''") + "',";
            else if(name=="Week" || name=="Hours") s += name+" = " + V[name] + ",";
            }
         s = s.slice(0,-1) + " WHERE ID="+R.id+"\n";
         }
      S.push(s);
      }
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