import ts from "typescript";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
const apiPath = resolve(process.cwd(),"types/FastGrid.TypeScript.API.d.ts");
const source = ts.createSourceFile(apiPath, readFileSync(apiPath,"utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
let tfGrid;
let tGrid;
function visit(node){
   if(ts.isInterfaceDeclaration(node) && node.name.text==="TFGrid") tfGrid = node;
   if(ts.isInterfaceDeclaration(node) && node.name.text==="TGrid") tGrid = node;
   ts.forEachChild(node,visit);
   }
visit(source);
if(!tfGrid) throw new Error(`Interface TFGrid was not found in ${apiPath}`);
if(!tGrid) throw new Error(`Interface TGrid was not found in ${apiPath}`);
function getName(node){ return !node.name ? "" : ts.isIdentifier(node.name) || ts.isStringLiteral(node.name) ? node.name.text : node.name.getText(source); }
function lowerFirst(value){ return value ? value[0].toLowerCase()+value.slice(1) : value; }
function outputName(eventName){ return lowerFirst(eventName.slice(2)); }
function typeText(node){ return node.type ? node.type.getText(source) : "any"; }
const events = tfGrid.members
   .filter(member => ts.isMethodSignature(member))
   .map(member => ({
      name:getName(member),
      parameters:member.parameters.map((parameter,index) => ({ name:lowerFirst(getName(parameter) || `arg${index}`), type:typeText(parameter), optional:!!parameter.questionToken }))
      }))
   .filter(event => event.name.startsWith("On"))
   .sort((a,b) => a.name.localeCompare(b.name));
if(!events.length) throw new Error("No TFGrid On... events were found");
const methods = new Map();
for(const member of tGrid.members){
   if(!ts.isMethodSignature(member)) continue;
   const name = getName(member);
   if(!name) continue;
   const typeParameters = member.typeParameters?.length ? `<${member.typeParameters.map(parameter => parameter.getText(source)).join(",")}>` : "";
   const parameters = member.parameters.map(parameter => parameter.getText(source)).join(", ");
   const returnType = member.type ? member.type.getText(source) : "any";
   const signature = `   ${name}${typeParameters}(${parameters}) : ${returnType};`;
   const method = methods.get(name) || { name,signatures:[] };
   if(!method.signatures.includes(signature)) method.signatures.push(signature);
   methods.set(name,method);
   }
if(!methods.size) throw new Error("No TGrid methods were found");
const sortedMethods = [ ...methods.values() ].sort((a,b) => a.name.localeCompare(b.name));
const eventNames = events.map(event => `   "${event.name}"`).join(",\n");
const inputMap = events.map(event => `   "${event.name}": "on${event.name.slice(2)}"`).join(",\n");
const outputMap = events.map(event => `   "${event.name}": "${outputName(event.name)}"`).join(",\n");
function payloadType(event){ return `FastGrid${event.name.slice(2)}Event`; }
const interfaces = events.map(event => {
   const interfaceName = payloadType(event);
   const fields = event.parameters.length ? event.parameters.map(parameter => `${parameter.name}${parameter.optional ? "?" : ""}: ${parameter.type};`).join(" ") : "args: any[];";
   return `export interface ${interfaceName} { ${fields} }`;
   }).join("\n");
const payloadFactories = events.map(event => {
   const interfaceName = payloadType(event);
   const fields = event.parameters.length ? event.parameters.map((parameter,index) => `${parameter.name}:args[${index}]`).join(", ") : "args";
   return `   "${event.name}": (args:any[]) => ({ ${fields} }) as ${interfaceName}`;
   }).join(",\n");
const inputs = events.map(event => `   @Input() on${event.name.slice(2)}?: TFGrid["${event.name}"];`).join("\n");
const outputs = events.map(event => { return `   @Output() readonly ${outputName(event.name)} = new EventEmitter<${payloadType(event)}>();`; }).join("\n");
const outputEventMap = events.map(event => `   "${outputName(event.name)}": ${payloadType(event)};`).join("\n");
const apiMethods = sortedMethods.map(method => {
   const signatures = method.signatures.join("\n");
   const implementation = `   ${method.name}(...args:any[]) : any { const grid = this.requireGrid(); return (grid.${method.name} as any).apply(grid,args); }`;
   return `${signatures}\n${implementation}`;
   }).join("\n\n");
function generate(referencePath){
   return `/// <reference path="${referencePath}" />\n
import { Directive, EventEmitter, Input, Output } from "@angular/core";
${interfaces}\n
export interface FastGridOutputEventMap {
${outputEventMap}
}\n
export type FastGridOutputEvent<K extends keyof FastGridOutputEventMap> = FastGridOutputEventMap[K];\n
export const FASTGRID_EVENT_NAMES = [\n${eventNames}\n] as const;\n
export const FASTGRID_EVENT_INPUTS: Readonly<Record<string,string>> = {\n${inputMap}\n};\n
export const FASTGRID_EVENT_OUTPUTS: Readonly<Record<string,string>> = {\n${outputMap}\n};\n
export const FASTGRID_EVENT_PAYLOAD_FACTORIES: Readonly<Record<string,(args:any[])=>any>> = {\n${payloadFactories}\n};\n
@Directive({ standalone:true })\n
export abstract class FastGridEventBindings {
   protected abstract requireGrid() : TGrid;\n
${inputs}\n\n${outputs}\n\n${apiMethods}\n}`;
   }
const outputFiles = [
   [ "core/fast-grid-events.generated.ts", "../types/FastGrid.TypeScript.API.d.ts" ]
   ];
for(const [file,referencePath] of outputFiles){
   const target = resolve(process.cwd(),file);
   mkdirSync(dirname(target),{ recursive:true });
   writeFileSync(target,generate(referencePath),"utf8");
   }
console.log(`Generated ${events.length} FastGrid Angular event inputs and outputs from FastGrid.TypeScript.API.d.ts`);
console.log(`Generated ${methods.size} FastGrid API forwarding methods from TGrid`);
