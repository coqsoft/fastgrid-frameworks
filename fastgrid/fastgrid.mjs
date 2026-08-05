#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import readline from "node:readline/promises";
const WRAPPERS = { angular: "fastgrid-angular", react: "fastgrid-react", vue: "fastgrid-vue", svelte: "fastgrid-svelte" };
const FRAMEWORKS = Object.keys(WRAPPERS);
const packageDirectory = path.dirname(fileURLToPath(import.meta.url));
const packageJson = JSON.parse(fs.readFileSync(path.join(packageDirectory, "package.json"), "utf8"));
function printHelp() {
   console.log(`
fastgrid v${packageJson.version}

Install the official FastGrid wrapper for the detected frontend framework.

Usage:
  npx fastgrid
  npx fastgrid --framework angular
  npm exec fastgrid -- --framework react

Options:
  --framework <angular|react|vue|svelte>
  --pm <npm|pnpm|yarn|bun>
  --save-dev
  --dry-run
  --yes
  --help
  --version

The command must be executed inside an existing project containing package.json.
The installer never uses a postinstall script and never executes shell commands
from package.json values.
`);
}

function fail(message) { console.error(`\nfastgrid: ${message}\n`); process.exit(1); }

function parseArgs(argv) {
   const result = { framework: "", packageManager: "", saveDev: false, dryRun: false, yes: false };
   for(let index = 0; index < argv.length; index++) {
      const arg = argv[index];
      if(arg === "--help" || arg === "-h") { printHelp(); process.exit(0); }
      if(arg === "--version" || arg === "-v") { console.log(packageJson.version); process.exit(0); }
      if(arg === "--framework" || arg === "-f") { result.framework = String(argv[++index] || "").toLowerCase(); continue; }
      if(arg === "--pm" || arg === "--package-manager") { result.packageManager = String(argv[++index] || "").toLowerCase(); continue; }
      if(arg === "--save-dev" || arg === "-D") { result.saveDev = true; continue; }
      if(arg === "--dry-run") { result.dryRun = true; continue; }
      if(arg === "--yes" || arg === "-y") { result.yes = true; continue; }
      fail(`Unknown option "${arg}". Use --help for usage.`);
      }
   if(result.framework && !FRAMEWORKS.includes(result.framework)) fail(`Unknown framework "${result.framework}". Use angular, react, vue or svelte.`);
   if(result.packageManager && !["npm", "pnpm", "yarn", "bun"].includes(result.packageManager)) fail(`Unknown package manager "${result.packageManager}". Use npm, pnpm, yarn or bun.`);
   return result;
   }

function findProjectRoot(startDirectory) {
   let directory = path.resolve(startDirectory);
   while(true) {
      const packagePath = path.join(directory, "package.json");
      if(fs.existsSync(packagePath)) return { directory, packagePath, packageJson: JSON.parse(fs.readFileSync(packagePath, "utf8")) };
      const parent = path.dirname(directory);
      if(parent === directory) return null;
      directory = parent;
      }
   }

function hasDependency(projectPackage, name) {
   for(const field of ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies" ]) if(projectPackage[field]?.[name]) return true;
   return false;
   }

function detectFramework(projectRoot, projectPackage) {
   const detected = [];
   const angularJson = path.join(projectRoot, "angular.json");
   if(fs.existsSync(angularJson) || hasDependency(projectPackage, "@angular/core") || hasDependency(projectPackage, "@angular/cli")) detected.push("angular");
   if(hasDependency(projectPackage, "react") || hasDependency(projectPackage, "react-dom")) detected.push("react");
   if(hasDependency(projectPackage, "vue")) detected.push("vue");
   if(hasDependency(projectPackage, "svelte") || fs.existsSync(path.join(projectRoot, "svelte.config.js")) || fs.existsSync(path.join(projectRoot, "svelte.config.ts"))) detected.push("svelte");
   return detected;
   }

function packageManagerFromProject(projectRoot, projectPackage) {
   const declared = String(projectPackage.packageManager || "");
   if(declared.startsWith("pnpm@")) return "pnpm";
   if(declared.startsWith("yarn@")) return "yarn";
   if(declared.startsWith("bun@")) return "bun";
   if(declared.startsWith("npm@")) return "npm";

   if(fs.existsSync(path.join(projectRoot, "pnpm-lock.yaml"))) return "pnpm";
   if(fs.existsSync(path.join(projectRoot, "yarn.lock")) || fs.existsSync(path.join(projectRoot, ".yarn"))) return "yarn";
   if(fs.existsSync(path.join(projectRoot, "bun.lockb")) || fs.existsSync(path.join(projectRoot, "bun.lock"))) return "bun";
   return "npm";
   }

function makeInstallCommand(packageManager, wrapper, saveDev) {
   const packageSpec = `${wrapper}@latest`;
   const devFlag = saveDev ? ["--save-dev"] : [];
   switch(packageManager) {
      case "pnpm": return ["pnpm", ["add", packageSpec, ...devFlag]];
      case "yarn": return ["yarn", ["add", packageSpec, ...(saveDev ? ["--dev"] : [])]];
      case "bun":  return ["bun", ["add", packageSpec, ...(saveDev ? ["--dev"] : [])]];
      default:     return ["npm", ["install", packageSpec, ...devFlag]];
      }
   }

/*function runCommand(command, args, cwd) {
   return new Promise((resolve, reject) => {
      const executable = process.platform === "win32" && command === "npm" ? "npm.cmd" : command;
      console.log(`\nRunning: ${executable} ${args.join(" ")}`);
      console.log(`Directory: ${cwd}\n`);
      const child = spawn(executable, args, { cwd, stdio: "inherit", shell: false });
      child.once("error", reject);
      child.once("close", (code, signal) => {
         if(code === 0) { resolve(); return; }
         reject(new Error(`Command failed with exit code ${code}` + (signal ? ` because of signal ${signal}` : "")));
         });
      });
   }*/

function runCommand(command, args, cwd) {
   return new Promise((resolve, reject) => {
      let executable = command;
      let spawnArgs = args;
      let spawnOptions = { cwd, stdio: "inherit", shell: false };
      if(process.platform === "win32") {
         const comspec = process.env.ComSpec || "cmd.exe";
         executable = comspec;
         spawnArgs = ["/d", "/s", "/c", [command, ...args].join(" ") ];
         }
      console.log(`\nRunning: ${command} ${args.join(" ")}`);
      console.log(`Directory: ${cwd}\n`);
      const child = spawn(executable, spawnArgs, spawnOptions);
      child.once("error", reject);
      child.once("close", (code, signal) => {
         if(code === 0) { resolve(); return; }
         reject(new Error(`Command failed with exit code ${code}` + (signal ? ` because of signal ${signal}` : "")));
         });
      });
   }

async function chooseFramework(detected, interactive) {
   if(detected.length === 1) return detected[0];

   if(detected.length > 1) {
      if(!interactive) fail(`Multiple frameworks detected: ${detected.join(", ")}. Use --framework explicitly.`);
      console.log("\nMultiple frontend frameworks detected:");
      detected.forEach((framework, index) => { console.log(`  ${index + 1} - ${framework}`); });
      const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
      try {
         while(true) {
            const answer = (await rl.question("Choose framework: ")).trim();
            const selected = Number(answer) - 1;
            if(detected[selected]) return detected[selected];
            console.error("Choose one of the displayed numbers.");
            }
         } 
      finally { rl.close(); }
      }

   if(!interactive) fail("No supported frontend framework detected. Use --framework angular, react, vue or svelte.");
   const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
   try {
      console.log("\nNo frontend framework was detected.");
      console.log("  1 - Angular");
      console.log("  2 - React");
      console.log("  3 - Vue");
      console.log("  4 - Svelte");
      while(true) {
         const answer = (await rl.question("Choose framework: ")).trim();
         const selected = FRAMEWORKS[Number(answer) - 1];
         if(selected) return selected;
         console.error("Choose 1, 2, 3 or 4.");
         }
      } 
   finally { rl.close(); }
   }

async function main() {
   const options = parseArgs(process.argv.slice(2));
   const project = findProjectRoot(process.cwd());
   if(!project) fail("No package.json found. Run this command inside an existing Angular, React, Vue or Svelte project.");
   if(hasDependency(project.packageJson, packageJson.name)){
      console.warn(`"${packageJson.name}" is listed in this project's package.json. It is a one-time CLI and should not be a project dependency.\n\nRemove "fastgrid" from dependencies.`);
      }
   const interactive = Boolean(process.stdin.isTTY && process.stdout.isTTY);
   const detected = detectFramework(project.directory, project.packageJson);
   const framework = options.framework || await chooseFramework(detected, interactive);
   const packageManager = options.packageManager || packageManagerFromProject(project.directory, project.packageJson);
   const wrapper = WRAPPERS[framework];
   const [command, args] = makeInstallCommand(packageManager, wrapper, options.saveDev);
   console.log(`\nDetected project: ${project.directory}`);
   console.log(`Detected framework: ${framework}`);
   console.log(`Package manager: ${packageManager}`);
   console.log(`Wrapper: ${wrapper}`);
   if(hasDependency(project.packageJson, wrapper)) { console.log(`\n${wrapper} is already present in package.json.`); console.log("No installation was performed."); return; }
   if(options.dryRun) { console.log(`\nDry run: ${command} ${args.join(" ")}`); return; }
   if(!options.yes && interactive) {
      const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
      try {
         const answer = ( await rl.question(`\nInstall ${wrapper} into this project? (Y/n): `) ).trim().toLowerCase();
         if(answer && answer !== "y" && answer !== "yes") { console.log("Installation cancelled.");  return; }
         } 
      finally { rl.close(); }
      }
   await runCommand(command, args, project.directory);
   console.log(`\nInstalled ${wrapper}.`);
   }

main().catch((error) => { console.error(`\nfastgrid: ${error.message}\n`); process.exitCode = 1; });
