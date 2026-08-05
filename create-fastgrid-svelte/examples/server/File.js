//. Generates data for FastGrid by get() function or saves received changes to database by set() function
// -----------------------------------------------------------------------------------------------------------------------------
//. Reads JSON from file in query "file" and returns it in response
function get(req,res){
var qstr = require('querystring'); 
var U = require("url").parse(req.url), cmd = U.pathname, query = qstr.parse(U.query); 
var fs = require('fs'), fn = (__dirname+cmd.replace(/\/[^\/]+$/,"/")+query.file).replace("/","\\");
try { var data = fs.readFileSync(fn); }
catch(e){ console.log(e.message); end("FGrid.Data={}",res); return; }
console.log("Serving file: "+fn);
end(data,res);
}

// -----------------------------------------------------------------------------------------------------------------------------
//. Saves changed data in text JSON to file in query "file"
function set(req,res){
var qstr = require('querystring'), body = ""; 
var U = require("url").parse(req.url), cmd = U.pathname, query = qstr.parse(U.query); 
req.on('data',function(data){ body += data.toString(); });
req.on('end', function(){
   var D = qstr.parse(body).Data; if(!D) { err("Empty request",res); return; }
   var f = query.file; if(!f) { err("Unknown file",res); return; }
   var fs = require('fs'), fn = (__dirname+cmd.replace(/\/[^\/]+$/,"/")+f).replace("/","\\");
   console.log("Saving to file: "+fn);
   fs.writeFileSync(fn,D);
   end("FGrid.Data={IO:{Message:'Data saved successfully'}}",res);
   });
}
// -----------------------------------------------------------------------------------------------------------------------------
//. Appends changed data in text JSON to file in query "file", merges the ChangedRows arrays
function add(req,res){
var qstr = require('querystring'), body = ""; 
var U = require("url").parse(req.url), cmd = U.pathname, query = qstr.parse(U.query); 
req.on('data',function(data){ body += data.toString(); });
req.on('end', function(){
   var D = qstr.parse(body).Data; if(!D) { err("Empty request",res); return; }
   var f = query.file; if(!f) { err("Unknown file",res); return; }
   var fs = require('fs'), fn = (__dirname+cmd.replace(/\/[^\/]+$/,"/")+f).replace("/","\\");
   console.log("Appending to file: "+fn);
   try { var O = fs.readFileSync(fn); D = O.slice(0,-2) + "," + D.slice(D.indexOf("ChangedRows:[")+13); }
   catch(e){ console.log(e.message); }
   fs.writeFileSync(fn,D);
   end("{IO:{Message:'Data saved successfully'}}",res);
   });
}
// -----------------------------------------------------------------------------------------------------------------------------
//. Reads binary XLSX from file in query "file" and returns it in response
function getbin(req,res){
var qstr = require('querystring'); 
var U = require("url").parse(req.url), cmd = U.pathname, query = qstr.parse(U.query); 
var fs = require('fs'), fn = (__dirname+cmd.replace(/\/[^\/]+$/,"/")+query.file).replace("/","\\");
var data = fs.readFileSync(fn);
console.log("Serving binary file: "+fn);
res.writeHead(200, {"Content-Type":"vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=utf-8","Access-Control-Allow-Origin":"*"}); //. Sets response header to UTF8 text and allows requests from other domains / ports
res.end(data);
}
// -----------------------------------------------------------------------------------------------------------------------------
//. Saves changed data in binary XLSX to file in query "file"
function setbin(req,res){
var qstr = require('querystring'), body = ""; 
var U = require("url").parse(req.url), cmd = U.pathname, query = qstr.parse(U.query); 
var formidable = require('formidable');
var form = new formidable.IncomingForm();
form.parse(req, function (error,fields,files){
   var D = files.Data; if(!D) { err("Empty request",res); return; }
   var f = query.file; if(!f) { err("Unknown file",res); return; }
   var fs = require('fs'), fn = (__dirname+cmd.replace(/\/[^\/]+$/,"/")+f).replace("/","\\");
   console.log("Saving to binary file: "+fn);
   fs.renameSync(D[0].filepath,fn);
   end("FGrid.Data={IO:{Message:'Data saved successfully'}}",res);
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
end("FGrid.Data={IO:{Result:\"-1\",Message:\""+e.replace(/"/g,"'")+"\"}}",res);
}
// -----------------------------------------------------------------------------------------------------------------------------
module.exports = { get, set, add, getbin, setbin };