var port = 8000, host = "127.0.0.1"; // The NodeJS server will run on this server and port. If you change it, you have to change it also in all examples that communicates with this server
// -----------------------------------------------------------------------------------------------------------------------------
//. Main listening function
function run(req, res){
try{
   var U = require("url").parse(req.url), cmd = U.pathname, query = require('querystring').parse(U.query); 
   if(cmd.search(/\/Grid\/|\/GridSrc\/|\/JS\//i)>=0) rewrite("/../../.."+cmd,req,res); //. Request for FastGrid script that is located outside the examples
   else if(!query.func) rewrite(cmd,req,res);                           //. Request for html or static data file
   else require("."+cmd.replace("/","\\"))[query.func](req,res);        //. Request for Node script generating data with function in U.query as "get" or "set"
   }
catch(e){ 
   console.log("!Error: "+e.message); 
   res.writeHead(200, {"Content-Type":"text/plain; charset=utf-8","Access-Control-Allow-Origin":"*"}); // Sets response header to UTF8 text and allows requests from other domains / ports
   res.end(e.message);
   }
}
// -----------------------------------------------------------------------------------------------------------------------------
//. Simple rewriting the cmd url from path
function rewrite(cmd,req,res) {
if(cmd.indexOf(".well-known")>=0){ res.end(""); return; }
var ext = cmd.replace(/[\?\#].*/,"").match(/\.\w+$/gi)[0].toLowerCase().slice(1);
var type = {htm:"text/html",html:"text/html",css:"text/css",js:"text/javascript",svg:"image/svg+xml",gif:"image/gif",png:"image/png",jpeg:"image/jpeg",jpg:"image/jpg",ico:"image/x-icon"}[ext];
if(!type) type = "text/plain";
if(type.indexOf("text")>=0) type += "; charset=utf-8";
var fs = require('fs'), file = __dirname+cmd.replace(/[\?\#].*/,"");
res.writeHead(200, {"Content-Type":type,"Access-Control-Allow-Origin":"*"});
try { 
   res.end(fs.readFileSync(file)); 
   //console.log("serving file:"+file); 
   }
catch(e){ 
   if(file.indexOf("favicon.ico")>=0){ res.end(""); return; }
   try { 
      file = __dirname.replace(/[\\\/]server$/,"/public")+cmd.replace(/[\?\#].*/,"")
      res.end(fs.readFileSync(file)); 
      //console.log("serving file:"+file); 
      }
   catch(e){ 
      res.end("File "+file+" from url "+cmd+" read error: "+e.message);
      console.log("File "+file+" from url "+cmd+" read error: "+e.message); 
      }
   } 
}
// -----------------------------------------------------------------------------------------------------------------------------
//. Starts NodeJS server on given url and part and listens to requests
require('http').createServer(run).listen(port,host,null,function(){ console.log("The server running at http://"+host+":"+port+"/"); });

//. Or the same using Node Express (install it by running "npm install express")
//var express = require('express'), app = express();
//app.get('/',run);
//app.listen(port,function(){ console.log("The server running at http://"+host+":"+port+"/"); });
// -----------------------------------------------------------------------------------------------------------------------------