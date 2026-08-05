import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const packageDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const packageJsonPath = path.join(packageDirectory,"package.json");
const distDirectory = path.join(packageDirectory,"dist");
const distPackageJsonPath = path.join(distDirectory,"package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath,"utf8"));
const distPackageJson = JSON.parse(fs.readFileSync(distPackageJsonPath,"utf8"));

function prefixDist(value,key){
   if(typeof(value) === "string"){
      if(key === "./package.json" || value === "./package.json") return "./package.json";
      return value.startsWith("./") ? "./dist/"+value.slice(2) : value;
      }
   if(Array.isArray(value)) return value.map(item => prefixDist(item,key));
   if(value && typeof(value) === "object"){
      const result = {};
      for(const name in value) result[name] = prefixDist(value[name],name);
      return result;
      }
   return value;
   }

function addApiReference(file){
   if(!file || !fs.existsSync(file)) return;
   const api = path.join(distDirectory,"types","FastGrid.TypeScript.API.d.ts");
   const relative = path.relative(path.dirname(file),api).replace(/\\/g,"/");
   const reference = `/// <reference path="${relative}" />`;
   const text = fs.readFileSync(file,"utf8");
   if(!text.startsWith(reference)) fs.writeFileSync(file,reference+"\n"+text);
   }

for(const name in distPackageJson.exports){
   const item = distPackageJson.exports[name];
   if(item && typeof(item) === "object" && typeof(item.types) === "string") addApiReference(path.resolve(distDirectory,item.types));
   }

for(const name of [ "module","types","typings","exports","sideEffects" ]){
   if(distPackageJson[name] !== undefined) packageJson[name] = prefixDist(distPackageJson[name],"");
   }
packageJson.files = [ "dist","README.md","LICENSE" ];
fs.writeFileSync(packageJsonPath,JSON.stringify(packageJson,null,3)+"\n");
fs.rmSync(distPackageJsonPath,{ force:true });
fs.rmSync(path.join(distDirectory,"registered","package.json"),{ force:true });
fs.rmSync(path.join(distDirectory,"core","package.json"),{ force:true });
console.log("Updated root fastgrid-angular/package.json from Angular package manifest");
console.log("Removed package.json files from dist");
