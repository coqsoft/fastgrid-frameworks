#!/usr/bin/env node
     
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import readline from "node:readline/promises";
import { spawn } from "node:child_process";

const pack = JSON.parse(fs.readFileSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)), "./package.json"), "utf8")), ver = pack.version;
console.log(`\nCreating FastGrid React sample application using create-fastgrid-react v${ver}\n`);

function compareVersions(a, b) {
   const aParts = a.replace(/^v/, "").split(".").map(Number);
   const bParts = b.replace(/^v/, "").split(".").map(Number);
   for (let i=0;i<3;i++) { if((aParts[i]||0) > (bParts[i]||0)) return 1; if((aParts[i]||0) < (bParts[i]||0)) return -1; }
   return 0;
   }
async function checkLatestVersion() {
   const controller = new AbortController();
   const timeout = setTimeout(() => controller.abort(), 3000);
   try {
      const registry = (process.env.npm_config_registry || process.env.NPM_CONFIG_REGISTRY || "https://registry.npmjs.org/").replace(/\/+$/, "");
      const response = await fetch(`${registry}/${encodeURIComponent(pack.name)}`, { signal: controller.signal, headers: { accept: "application/json" } });
      if(!response.ok) throw new Error(`Registry returned HTTP ${response.status}`);
      const metadata = await response.json(), latestVersion = metadata?.["dist-tags"]?.latest; if(!latestVersion) return;
      if(compareVersions(ver, latestVersion) < 0) console.warn(`\n! To install the newest version ${latestVersion} run: npm create fastgrid-react@latest\n`);
      } catch (e){ console.warn(`Could not verify the newest package version: ${e.message}`); } finally { clearTimeout(timeout); }
   }
await checkLatestVersion();

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const args = process.argv.slice(2);
let projectName = args[0] || await askProjectName();
const templateArgIndex = args.indexOf("--template");
let templateName = templateArgIndex >= 0 && args[templateArgIndex + 1] ? args[templateArgIndex + 1] : "";
let templateDir = path.join(path.dirname(fileURLToPath(import.meta.url)), templateName);
if(!templateName || !fs.existsSync(templateDir)) templateName = await askTemplateName(templateName);
templateDir = path.join(path.dirname(fileURLToPath(import.meta.url)), templateName);
let targetDir = path.resolve(process.cwd(), projectName);
while(!projectName || fs.existsSync(targetDir)){
   if(fs.existsSync(targetDir)) console.error(`Target directory "${projectName}" already exists.`);
   projectName = await askProjectName();
   targetDir = path.resolve(process.cwd(), projectName);
   }
rl.close();
if(!fs.existsSync(templateDir)) { console.error(`Template "${templateName}" does not exist.`); console.error(`Expected template directory: ${templateDir}`); process.exit(1); }
fs.mkdirSync(targetDir, { recursive: true });
copyDirectory(templateDir, targetDir);
console.log(""); console.log(`Created FastGrid React project '${templateName}' in ${targetDir}`);
console.log(""); console.log("Next steps:"); console.log(`  cd ${projectName}`); console.log("  npm install"); console.log("  npm run dev"); console.log("");

const rl2 = readline.createInterface({ input: process.stdin, output: process.stdout });
let answer = (await rl2.question("Do you want to automatically run 'npm install' and 'npm run dev' now? (y/N): ")).trim().toLowerCase();
rl2.close();
if(answer === "y" || answer === "yes"){
   console.log(""); console.log("Running: npm install");
   await runNpm(targetDir, [ "install" ]);
   console.log(""); console.log("Running: npm run dev");
   await runNpm(targetDir, [ "run", "dev" ]);
   }
      
async function askTemplateName(templateName){
   if(templateName) console.error(`Template "${templateName}" does not exist.`);
   console.log(""); console.log("Select FastGrid React examples template:"); 
   console.log("  1 - quick-start (one example with simple grid)"); 
   console.log("  2 - quick-start-typescript (one example with simple grid using TypeScript tsx)"); 
   console.log("  3 - tutorials (many individual tutorial examples demonstrating selected FastGrid features)"); 
   console.log("  4 - examples (complex FastGrid examples and SQL and file server examples)"); 
   while(true){
      const answer = (await rl.question("Template: ")).trim();
      if(answer === "1" || answer === "quick-start") return "quick-start";
      if(answer === "2" || answer === "quick-start-typescript") return "quick-start-typescript";
      if(answer === "3" || answer === "tutorials") return "tutorials";
      if(answer === "4" || answer === "examples") return "examples";
      console.error("Invalid template. Use 1, 2, 3, 4, quick-start, quick-start-typescript, tutorials or examples.");
      }
   }
async function askProjectName() { 
   while(1){ 
      const answer = (await rl.question("Enter target directory to create the new FastGrid React examples project in: ")).trim(); if(answer) return answer; 
      console.error("Target directory is required."); 
      } 
   }
function copyDirectory(source, destination) {
   fs.mkdirSync(destination, { recursive: true });
   for(const entry of fs.readdirSync(source, { withFileTypes: true })){
      const sourcePath = path.join(source, entry.name);
      const destinationPath = path.join(destination, entry.name);
      if(entry.isDirectory()) copyDirectory(sourcePath, destinationPath);
      else if(entry.name === "package.json"){
         let txt = fs.readFileSync(sourcePath,"utf8");
         txt = txt.replace(/"fastgrid-react":\s*"file:[\.\/]*fastgrid-react"/g,"\"fastgrid-react\":\"latest\"");
         const packageJson = JSON.parse(txt);
         packageJson.name = normalizePackageName(projectName+source.replace(templateDir,"").replace(/\//g,"-"));
         packageJson.version = ver;
         fs.writeFileSync(destinationPath, JSON.stringify(packageJson, null, 2) + "\n");
         }
      else if(entry.name === "vite.config.js"){
         let txt = fs.readFileSync(sourcePath,"utf8");
         txt = txt.replace(/^[\t ]*cacheDir\s*:[^\r\n]*(?:\r?\n|$)/gm,"");
         fs.writeFileSync(destinationPath, txt);
         }
      else if(entry.name === "_gitignore") fs.copyFileSync(sourcePath, path.join(destination, ".gitignore"));
      else fs.copyFileSync(sourcePath, destinationPath);
      }
   }
function normalizePackageName(name) { return name.trim().toLowerCase().replace(/[^a-z0-9-_]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, ""); }
function runNpm(cwd, args) {
   return new Promise((resolve, reject) => {
      const isWindows = process.platform === "win32";
      let command, commandArgs;
      if(isWindows) {
         const npmCliFromEnv = process.env.npm_execpath;
         const npmCli = npmCliFromEnv && fs.existsSync(npmCliFromEnv) ? npmCliFromEnv : path.join(path.dirname(process.execPath),"node_modules","npm","bin","npm-cli.js");
         if(!fs.existsSync(npmCli)) {
            const child = spawn("npm", args, { cwd, stdio:"inherit", shell:true });
            child.on("exit",(code)=> code===0 ? resolve() : reject(new Error(`Command npm ${args.join(" ")} failed with exit code ${code}`)) );
            child.on("error",reject);
            return;
            }
         command = process.execPath;
         commandArgs = [npmCli, ...args];
         } 
      else { command = "npm"; commandArgs = args; }
      console.log(`Launching: ${command} ${commandArgs.join(" ")}`);
      console.log(`Working directory: ${cwd}`);
      const child = spawn(command, commandArgs, { cwd, stdio: "inherit", shell: false });
      child.once("error", reject);
      child.once("close", (code, signal) => {
         if(code===0) resolve();
         else reject(new Error(`Command failed: ${command} ${commandArgs.join(" ")}` + (signal ? ` because of signal ${signal}` : ` with exit code ${code}`)));
         });
      });
   }