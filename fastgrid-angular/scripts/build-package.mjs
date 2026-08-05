import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const packageDirectory = resolve(dirname(fileURLToPath(import.meta.url)),"..");
const packageJsonPath = resolve(packageDirectory,"package.json");
const originalPackageJsonText = readFileSync(packageJsonPath,"utf8");
const originalPackageJson = JSON.parse(originalPackageJsonText);

function findWorkspaceRoot(start){
   let directory = resolve(start);
   while(1){
      const packageJson = resolve(directory,"package.json");
      if(existsSync(packageJson) && JSON.parse(readFileSync(packageJson,"utf8")).workspaces) return directory;
      const parent = dirname(directory);
      if(parent === directory) return start;
      directory = parent;
      }
   }

const workspaceRoot = findWorkspaceRoot(packageDirectory);
const cacheDirectory = resolve(workspaceRoot,"node_modules",".cache","ng-packagr","fastgrid-angular");
const buildPackageJson = { ...originalPackageJson };
for(const name of [ "main","module","types","typings","exports","files" ]) delete buildPackageJson[name];
writeFileSync(packageJsonPath,JSON.stringify(buildPackageJson,null,3)+"\n");
const originalDirectory = process.cwd();
process.chdir(workspaceRoot);
try {
   const { ngPackagr } = await import("ng-packagr");
   console.log(`Workspace root: ${workspaceRoot}`);
   console.log(`ng-packagr cache: ${cacheDirectory}`);
   await ngPackagr()
      .forProject(resolve(packageDirectory,"ng-package.json"))
      .withTsConfig(resolve(packageDirectory,"tsconfig.lib.json"))
      .withOptions({ cacheEnabled:true, cacheDirectory })
      .build();
   }
finally {
   process.chdir(originalDirectory);
   writeFileSync(packageJsonPath,originalPackageJsonText);
   }
