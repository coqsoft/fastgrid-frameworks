import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const sourcePath = resolve(process.cwd(),"trial/FGridE.js");
const targetPath = resolve(process.cwd(),"trial/FGridE.source.generated.ts");
if(!existsSync(sourcePath)) throw new Error(`FastGrid trial engine was not found in ${sourcePath}`);
const source = readFileSync(sourcePath,"utf8");
writeFileSync(targetPath,`export const FASTGRID_ENGINE_SOURCE = ${JSON.stringify(source)};\n`,"utf8");
console.log("Generated trial/FGridE.source.generated.ts from trial/FGridE.js");
