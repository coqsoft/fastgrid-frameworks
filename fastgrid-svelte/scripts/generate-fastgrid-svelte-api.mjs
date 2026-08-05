import ts from "typescript";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const apiPath = resolve(process.cwd(),"types/FastGrid.TypeScript.API.d.ts");
const sveltePath = resolve(process.cwd(),"src/FastGrid.svelte");
const typesPath = resolve(process.cwd(),"types/fastgrid-svelte.d.ts");

const source = ts.createSourceFile(
   apiPath,
   readFileSync(apiPath,"utf8"),
   ts.ScriptTarget.Latest,
   true,
   ts.ScriptKind.TS
   );

let tGrid = null;

function visit(node){
   if(ts.isInterfaceDeclaration(node)&&node.name.text==="TGrid") {
      tGrid = node;
      }
   ts.forEachChild(node,visit);
   }

visit(source);

if(!tGrid) {
   throw new Error(`Interface TGrid was not found in ${apiPath}`);
   }

const methods = [];
const names = new Set();

for(const member of tGrid.members) {
   if(!ts.isMethodSignature(member)||!member.name) continue;

   const name = ts.isIdentifier(member.name)
      ? member.name.text
      : member.name.getText(source);

   if(!name||names.has(name)) continue;

   names.add(name);
   methods.push(name);
   }

function replaceGenerated(text,startMarker,endMarker,content){
   const start = text.indexOf(startMarker);
   const end = text.indexOf(endMarker);

   if(start<0||end<0||end<start) {
      throw new Error(`Generated markers not found: ${startMarker}`);
      }

   return text.slice(0,start+startMarker.length)+
      "\n"+
      content+
      "\n"+
      text.slice(end);
   }

const svelteMethods = methods.map(name =>
   `export function ${name}(...args){ return requireGrid().${name}(...args); }`
   ).join("\n");

const typeMethods = methods.map(name =>
   `   ${name}(...args:any[]):any;`
   ).join("\n");

let svelte = readFileSync(sveltePath,"utf8");
svelte = replaceGenerated(
   svelte,
   "// FASTGRID_API_METHODS_START",
   "// FASTGRID_API_METHODS_END",
   svelteMethods
   );
writeFileSync(sveltePath,svelte,"utf8");

let types = readFileSync(typesPath,"utf8");
types = replaceGenerated(
   types,
   "// FASTGRID_API_METHODS_START",
   "// FASTGRID_API_METHODS_END",
   typeMethods
   );
writeFileSync(typesPath,types,"utf8");

console.log(`Generated ${methods.length} direct FastGrid API methods from TGrid`);
