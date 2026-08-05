#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { spawn } from "node:child_process";
import readline from "node:readline/promises";

const GENERATORS = { angular: "create-fastgrid-angular", react: "create-fastgrid-react", vue: "create-fastgrid-vue", svelte: "create-fastgrid-svelte", html: "create-fastgrid-html" };
const FRAMEWORKS = Object.keys(GENERATORS);

async function askFramework(rl) {
   console.log("\nSelect the FastGrid starter generator:");
   console.log("  1 - Angular       create-fastgrid-angular");
   console.log("  2 - React         create-fastgrid-react");
   console.log("  3 - Vue           create-fastgrid-vue");
   console.log("  4 - Svelte        create-fastgrid-svelte");
   console.log("  5 - HTML/JavaScript create-fastgrid-html");
   while(true) {
      const answer = (await rl.question("Framework: ")).trim().toLowerCase();
      const index = Number(answer) - 1;
      if(FRAMEWORKS[index]) return FRAMEWORKS[index];
      if(FRAMEWORKS.includes(answer)) return answer;
      console.error("Choose 1, 2, 3, 4, 5, angular, react, vue, svelte or html.");
      }
   }

function getNpmCliPath() {
   const candidates = [ process.env.npm_execpath, path.join(path.dirname(process.execPath),"node_modules","npm","bin","npm-cli.js") ].filter(Boolean);
   const npmCli = candidates.find(candidate => fs.existsSync(candidate));
   if(!npmCli) throw new Error("Cannot find npm-cli.js. Run this command with a Node.js/npm installation.");
   return npmCli;
   }

function runNpx(projectName, generator, forwarded, cwd) {
   return new Promise((resolve, reject) => {
      // Invoke npm CLI through Node directly. This works on Windows without spawning npx.cmd with shell:false, which can result in spawn EINVAL.
      const npmCli = getNpmCliPath();
      const command = process.execPath;
      const args = [ npmCli, "exec", "--yes", `--package=${generator}@latest`, "--", generator, ...(projectName ? [projectName] : []), ...forwarded ];
      console.log(`\nRunning: ${command} ${args.join(" ")}\n`);
      const child = spawn(command, args, { cwd, stdio: "inherit", shell: false });
      child.once("error", reject);
      child.once("close", (code, signal) => {
         if(code === 0) { resolve(); return; }
         reject(new Error(`Generator ${generator} failed with exit code ${code}` + (signal ? ` because of signal ${signal}` : "")));
         });
      });
   }

async function main() {
   const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
   try {
      let framework = await askFramework(rl);
      const generator = GENERATORS[framework];
      console.log(`\nSelected generator: ${generator}`);
      await runNpx(process.argv[2], generator, process.argv.slice(3), process.cwd());
      } 
   finally { rl?.close(); }
   }

main().catch((error) => { console.error(`\ncreate-fastgrid: ${error.message}\n`); process.exitCode = 1; });
