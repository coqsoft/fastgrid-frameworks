#!/usr/bin/env node
     
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import readline from "node:readline/promises";
import { spawn } from "node:child_process";
import http from "node:http";

const pack = JSON.parse(fs.readFileSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)), "./package.json"), "utf8")), ver = pack.version;
console.log(`\nCreating FastGrid Html sample application using create-fastgrid-html v${ver}\n`);

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
      if(compareVersions(ver, latestVersion) < 0) console.warn(`\n! To install the newest version ${latestVersion} run: npm create fastgrid-html@latest\n`);
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
console.log(""); console.log(`Created FastGrid Html project '${templateName}' in ${targetDir}`);
console.log(""); console.log("Next steps:"); console.log(`  cd ${projectName}`); console.log("  index.html"); console.log("");

const rl2 = readline.createInterface({ input: process.stdin, output: process.stdout });
let answer = (await rl2.question("Do you want to automatically run 'index.html' now? (y/N): ")).trim().toLowerCase();
rl2.close();
if(answer === "y" || answer === "yes"){
   // console.log(""); console.log("Opening index.html in browser"); await openInBrowser(`${projectName}/index.html`);
   const url = "http://localhost:3000";
   console.log(""); console.log("Starting local server with 'npx serve'...");
   startServe(targetDir);
   await waitForServer(url);
   console.log(`Opening ${url} in browser`);
   await openInBrowser(url);
   }
      
async function askTemplateName(templateName){
   if(templateName) console.error(`Template "${templateName}" does not exist.`);
   console.log(""); console.log("Select FastGrid Html examples template:"); 
   console.log("  1 - quick-start (one example with simple grid)"); 
   console.log("  2 - examples (tutorials and complex examples and SQL and file server examples)"); 
   while(true){
      const answer = (await rl.question("Template: ")).trim();
      if(answer === "1" || answer === "quick-start") return "quick-start";
      if(answer === "2" || answer === "examples") return "examples";
      console.error("Invalid template. Use 1, 2, quick-start or examples.");
      }
   }
async function askProjectName() { 
   while(1){ 
      const answer = (await rl.question("Enter target directory to create the new FastGrid Html examples project in: ")).trim(); if(answer) return answer; 
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
         const packageJson = JSON.parse(txt);
         packageJson.name = normalizePackageName(projectName+source.replace(templateDir,"").replace(/\//g,"-"));
         packageJson.version = ver;
         fs.writeFileSync(destinationPath, JSON.stringify(packageJson, null, 2) + "\n");
         }
      else if(entry.name === "vite.config.js"){
         let txt = fs.readFileSync(sourcePath,"utf8");
         txt = txt.replace(/[\t ]*cacheDir:\s*path\.resolve\(__dirname,\s*["']\.\.\/\.\.\/node_modules\/\.vite["']\s*\),[\t ]*\r?\n/g,"");
         fs.writeFileSync(destinationPath, txt);
         }
      else if(entry.name === "_gitignore") fs.copyFileSync(sourcePath, path.join(destination, ".gitignore"));
      else fs.copyFileSync(sourcePath, destinationPath);
      }
   }
function normalizePackageName(name) { return name.trim().toLowerCase().replace(/[^a-z0-9-_]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, ""); }
function startServe(directory) {
   const isWindows = process.platform === "win32"; // On Windows, npx is a .cmd file. Run it through cmd.exe to avoid spawn EINVAL errors from child_process.spawn().
   const command = isWindows ? (process.env.ComSpec || "cmd.exe") : "npx";
   const args = isWindows ? ["/d", "/s", "/c", "npx --yes serve -l 3000"] : ["--yes", "serve", "-l", "3000"];
   const child = spawn(command, args, { cwd: directory, stdio: "ignore", detached: true, windowsHide: true });
   child.on("error", err => { console.error(`Could not start local server: ${err.message}`); });
   child.unref();
   return child;
   }

function waitForServer(url, timeout = 30000) {
   return new Promise((resolve, reject) => {
      const startedAt = Date.now();
      const retry = () => {
         if(Date.now() - startedAt >= timeout){ reject(new Error(`Local server did not start within ${timeout / 1000} seconds: ${url}`)); return; }
         setTimeout(check, 250);
         };
      const check = () => {
         const request = http.get(url, response => {
            response.resume();
            if(response.statusCode && response.statusCode < 500){ resolve(); return; }
            retry();
            });
         request.on("error", retry);
         request.setTimeout(1000, () => { request.destroy(); retry(); });
         };
      check();
      });
   }

function openInBrowser(url) {
   return new Promise((resolve, reject) => {
      //if(!fs.existsSync(filePath)) { reject(new Error(`File not found: ${filePath}`)); return; }
      let command, args;
      if(process.platform === "win32"){ command = "cmd"; args = ["/c", "start", "", url]; } //. Windows
      else if(process.platform === "darwin"){ command = "open"; args = [url]; } //. macOS
      else { command = "xdg-open"; args = [url]; } //. Linux
      const child = spawn(command, args, { stdio: "ignore", detached: true });
      child.on("error", reject);
      child.unref();
      resolve();
      });
   }
