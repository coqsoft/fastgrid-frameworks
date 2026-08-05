// ! Support file only, run Schools.html instead !
//. This file is used as both data url and SaveUrl
//. Generates data by get() function, updates changes, by set() function, adds new users by add() function, reads reviews by getratings() function and saves one review back to database by setreview() function
// -----------------------------------------------------------------------------------------------------------------------------
//. Reads data from database and returns them in JSON
function get(req,res){
var sql = require('better-sqlite3'), db = new sql('SQLite.db'); //. It uses SQLite3 database engine on database in file SQLite.sb
var qstr = require('querystring'), body = ""; 
req.on('data',function(data){ body += data.toString(); });
req.on('end', function(){
   var P = qstr.parse(body); 
   var User = P.User ? P.User.toLowerCase() : "", NewUser = P.New!=null && P.New!="0"; //. Input parameters initalization
   var s = "FGrid.Data = {\n";

   //. --- Adding new user ---
   if(NewUser){
      var rows = db.prepare("SELECT Pass FROM Schools_Users WHERE Name='" + User.replace(/'/g,"''") + "'").all();
      if(!rows.length){   //. Ok, possible
         db.prepare("INSERT INTO Schools_Users(Name,Pass) VALUES ('" + User.replace(/'/g,"''") + "','" + (P.Pass||"").replace(/'/g,"''") + "')").run();
         s += "IO:{Message:'User " + User.replace(/\\/g,"\\\\").replace(/'/g,"\\'") + " has been added successfuly'},";
         }
      else { end(s+"IO:{Result:-1,Message:'User name already exists !'}}",res); return; }
      }

   //. --- Password verification ---
   if(User){
      var rows = db.prepare("SELECT Pass FROM Schools_Users WHERE Name='" + User.replace(/'/g,"''") + "'").all();
      if(!rows.length || P.Pass!=rows[0].Pass){ end(s+"IO:{Result:-1,Message:'Wrong user name or password !'}}",res); return; }
      }
   var Admin = User=="admin";   // @@@ Or change this code to another admin

   //. --- Read data ---
   if(!User) s += "Cfg:{AddingRows:0,DeletingRows:0,Editing:0},Cols:[{id:'CPanel',Hidden:1}],";
   else s += "RightCols:[{id:'CButton',Hidden:1}],";
   if(!Admin) s += "RightCols:[{id:'CUser',Hidden:1,NoHide:1,NoPrint:1,NoExport:1}],";
   s += "\nBody:[\n";
   var SQL = "SELECT * FROM Schools_Schools"; if(User && !Admin) SQL += " WHERE Owner='" + User.replace(/'/g,"''") + "'";
   var rows = db.prepare(SQL).all();
   for(var i=0;i<rows.length;i++){
      var R = rows[i];
      var id = "id:'"+((R.Owner||"")+"").replace(/\\/g,"\\\\").replace(/'/g,"\\'")+"$"+R.Id;
      s += "{D:'Main'," + id+"$1',V:{";
      if(Admin) s += "CUser:'" + ((R.Owner||"")+"").replace(/\\/g,"\\\\").replace(/'/g,"\\'")+"',";
      s += "CName:'" + ((R.Name||"")+"").replace(/\\/g,"\\\\").replace(/'/g,"\\'") + "',";
      s += "CCountry:" + (R.Country||"0") + ",";
      s += "CState:" + (R.State==null||R.State=="-1" ? "''" : R.State||"0") + ",";
      s += "CCounty:" + (R.County==null||R.County=="-1" ? "''" : R.County||"0") + ",";
      s += "CTown:'" + ((R.Town||"")+"").replace(/\\/g,"\\\\").replace(/'/g,"\\'") + "',";
      s += "CLevel:"  + (R.SLevel||"0") + ",";
      s += "CType:" + (R.Type||"0") + ",";
      s += "CGrade1:" + (R.FromGrade||"0") + ",";
      s += "CGrade2:" + (R.ToGrade||"0") + ",";
      s += "CEnrollment:" + (R.Enrollment||"0") + ",";
      s += "CStudents:" + (R.Students||"0");
      s += "}},\n";
      s += "{D:'Address'," + id + "$2',V:{" + "CCountry:'" + ((R.Address||"")+"").replace(/\\/g,"\\\\").replace(/'/g,"\\'") + "'}},\n";
      s += "{D:'Phone'," + id + "$3',V:{" + "CCountry:'" + ((R.Phone||"")+"").replace(/\\/g,"\\\\").replace(/'/g,"\\'") + "'}},\n";
      s += "{D:'Link'," + id + "$4',V:{" + "CCountry:'" + ((R.Link||"")+"").replace(/\\/g,"\\\\").replace(/'/g,"\\'") + "'}},\n";
      s += "{D:'Map'," + id + "$5',V:{" + "CCountry:'" + ((R["Map"]||"")+"").replace(/\\/g,"\\\\").replace(/'/g,"\\'") + "'}},\n";
      s += "{D:'Reviews'," + id + "$6', Children:" + (R.RatingCnt||"0") + ", V:{CRating:"+(R.RatingSum||"0") +"}" + "},\n";
      }
   s += "]}";
   end(s,res);
   });
}
// -----------------------------------------------------------------------------------------------------------------------------
//. Saves changed data in JSON to database
function set(req,res){
var sql = require('better-sqlite3'), db = new sql('SQLite.db'); //. It uses SQLite3 database engine on database in file SQLite.sb
var qstr = require('querystring'), body = ""; 
req.on('data',function(data){ body += data.toString(); });
req.on('end', function(){
   var P = qstr.parse(body); 
   var User = P.User ? P.User.toLowerCase() : ""; //. Input parameters initalization

   //. --- Password verification ---
   if(!User){ end(s+"IO:{Result:-1,Message:'The user have not permission to save data !'}"); return; }  //. Attack or bug
   var rows = db.prepare("SELECT Pass FROM Schools_Users WHERE Name='" + User.replace(/'/g,"''") + "'").all();
   if(!rows.length || P.Pass!=rows[0].Pass){ end("{IO:{Result:-1,Message:'Wrong user name or password !'}}",res); return; }
   var Admin = User=="admin";   // @@@ Or change this code to another admin

   var D = P.Data; if(!D) { err("Empty request",res); return; }
   D = JSON.parse(D); 
   if(!D ||!D.ChangedRows) { err("Request without ChangedRows",res); return; }
   D = D.ChangedRows;
   var SQLNames = ["","","Address","Phone","Link","Map"], S = "";
   for(var di=0;di<D.length;di++){
      var r = D[di], ids = r.id.split("$");  //. User$Ident$Num
      var id = " Owner='" + ids[0].replace(/'/g,"''") + "' AND Id=" + ids[1];
      var num = parseInt(ids[2]), V = r.V||{};
      if(num>1){ //. Child row (Address, Phone, Link, Map)
         if(V.CCountry!=null) db.prepare("UPDATE Schools_Schools SET " + SQLNames[num] + " = '" + V.CCountry.replace(/'/g,"''") + "' WHERE" + id).run();
         }      
      else if(r.Remove){
         db.prepare("DELETE FROM Schools_Schools WHERE" + id).run();
         db.prepare("DELETE FROM Schools_Ratings WHERE" + id).run();
         }     
      else if(r.Add){
         var s = "INSERT INTO Schools_Schools(Owner,Id,Name,Country,State,County,Town,SLevel,Type,FromGrade,ToGrade,Enrollment,Students,RatingSum,RatingCnt) VALUES (";
         s += "'" + (V.CUser||ids[0]).replace(/'/g,"''") + "',";
         s += "'" + ids[1] + "',";
         s += "'" + (V.CName||"").replace(/'/g,"''") + "',";
         s += V.CCountry!=null ? (V.CCountry||"0") + "," : "1,";
         s += V.CState!=null ? (V.CState||"0") + "," : "-1,";
         s += V.CCounty!=null ? (V.CCounty||"0") + "," : "-1,"; 
         s += "'" + (V.CTown||"").replace(/'/g,"''") + "',";
         s += (V.CLevel||"0") + ",";
         s += (V.CType||"0") + ",";
         s += (V.CGrade1||"0") + ",";
         s += (V.CGrade2||"0") + ",";
         s += (V.CEnrollment||"0") + ",";
         s += (V.CStudents||"0") + ",";
         s += "0,0)";
         db.prepare(s).run();
         if(V.CUser!=null) {
            var rows = db.prepare("SELECT MAX(Id) as max FROM Schools_Schools WHERE Owner='"+V.CUser.replace(/'/g,"''")+"'").all();
            var ident = parseInt(rows[0].max)+1;
            var NewId = V.CUser.replace(/'/g,"''")+"$"+ident+"$", oid = r.id.slice(0,-1).replace(/'/g,"''");
            for(var i=1;i<6;i++) S += "{id:'"+oid+i+"',NewId:'"+NewId+i+"'},"; //. Changes id of all the six rows
            } 
         }
      else if (r.V!=null){
         var s = "";
         if (V.CName!=null) s += "Name='" +V.CName.replace(/'/g,"''") + "',";
         if (V.CCountry!=null) s += "Country=" + (V.CCountry==="" ? "1" : V.CCountry) + ",";
         if (V.CState!=null) s += "State=" + (V.CState==="" ? "-1" : V.CState) + ",";
         if (V.CCounty!=null) s += "County=" + (V.CCounty==="" ? "-1" : V.CCounty) + ",";
         if (V.CTown!=null) s += "Town='" + V.CTown.replace(/'/g,"''") + "',";
         if (V.CLevel!=null) s += "SLevel=" + (V.CLevel||"0") + ",";
         if (V.CType!=null) s += "Type=" + (V.CType||"0") + ",";
         if (V.CGrade1!=null) s += "FromGrade=" + (V.CGrade1||"0") + ",";
         if (V.CGrade2!=null) s += "ToGrade=" + (V.CGrade2||"0") + ",";
         if (V.CEnrollment!=null) s += "Enrollment=" + (V.CEnrollment||"0") + ",";
         if (V.CStudents!=null) s += "Students=" + (V.CStudents||"0") + ",";
         if (Admin && V.CUser!=null){
            var rows = db.prepare("SELECT MAX(Id) as max FROM Schools_Schools WHERE Owner='"+V.CUser.replace(/'/g,"''")+"'").all();
            var ident = parseInt(rows[0].max)+1;
            var s2 = "Owner='" + V.CUser.replace(/'/g,"''") + "',Id='" + ident + "'"; s += s2+",";
            var NewId = V.CUser.replace(/'/g,"''")+"$"+ident+"$", oid = r.id.slice(0,-1).replace(/'/g,"''");
            for(var i=1;i<6;i++) S += "{id:'"+oid+i+"',NewId:'"+NewId+i+"'},";       //. Changes id of all the six rows
            db.prepare("UPDATE Schools_Ratings SET " + s2 + " WHERE " + id).run();   //. Updates changes in user/id in Ratings
            }
         if(s) db.prepare("UPDATE Schools_Schools SET " + s.slice(0,-1) + " WHERE " + id).run();
         }
      }
   end("{IO:{Message:'Data saved successfully'}"+(S?",ChangedRows:["+S+"]":"")+"}",res); 
   });
}
// -----------------------------------------------------------------------------------------------------------------------------
//. Returns ratings for the row as server child page
function getratings(req,res){
var sql = require('better-sqlite3'), db = new sql('SQLite.db'); //. It uses SQLite3 database engine on database in file SQLite.sb
var qstr = require('querystring'), body = ""; 
req.on('data',function(data){ body += data.toString(); });
req.on('end', function(){
   var P = qstr.parse(body), DRows = P.Rows;
   if(DRows==null) DRows = "jan$1$6";  //@@@ Just for example if called directly
   var Rows = DRows.split(",");
   var s = "FGrid.Data={Body:[\n";
   for(var i=0;i<Rows.length;i++){
      var id = Rows[i].split("$");  //. User$Def$Ident
      var rows = db.prepare("SELECT * FROM Schools_Ratings WHERE Owner='" + id[0].replace(/'/g,"''") + "' AND Id=" + id[1]).all();
      for(var j=0;j<rows.length;j++){
         var R = rows[j];
         s += "{Parent:'"+Rows[i]+"',D:'Review',V:{CName:'" + (R.ADate||"") 
            + "',CCountry:'" + (R.Review+"").replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\n/g, "\\n").replace(/\r/g, "\\r")
            + "',CRating:" +(R.Stars||"0") + "}},\n";
         }
      }
   s += "]}";
   end(s,res); 
   });
}
// -----------------------------------------------------------------------------------------------------------------------------
//. Saves Review to database
function setreview(req,res){
var sql = require('better-sqlite3'), db = new sql('SQLite.db'); //. It uses SQLite3 database engine on database in file SQLite.sb
var qstr = require('querystring'), body = ""; 
req.on('data',function(data){ body += data.toString(); });
req.on('end', function(){
   var P = qstr.parse(body)
   if(P.id!=null){
      var id = P.id.split("$"); //. User$Def$Ident
      var d = new Date(); d = d.getMonth()+1+"/"+d.getDate()+"/"+d.getFullYear();
      db.prepare("INSERT INTO Schools_Ratings(Owner,Id,Stars,Review,ADate) VALUES ('" + id[0].replace(/'/g,"''") + "'," + id[1] + "," +(P.Stars||"0") + ",'" + P.Text.replace(/'/g,"''") + "','" + d + "')").run();
      db.prepare("UPDATE Schools_Schools SET RatingSum=RatingSum+"+P.Stars+", RatingCnt=RatingCnt+1 WHERE Owner='" + id[0].replace(/'/g,"''") + "' AND Id=" + id[1]).run();
      }
   end("{IO:{Result:0, Message:'Your review was successfully added'}}",res);
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
module.exports = { get, set, getratings, setreview };