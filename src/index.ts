#!/usr/bin/env ts-node
import path from "path";
import "dotenv/config";
import inquirer from "inquirer";
import { writeFile, readFile } from "fs/promises";
import fs from "fs";
import helperFunction from "./constants";
import { objJS, objTS } from "./utils";
import { name, version } from "../package.json";
import licenses from "./utils/licenses/licenses.json";
import fetch from "cross-fetch";
import process from "process";

const cwd = process.cwd();
const args: string[] = process.argv
  .slice(2)
  .map((ele) => ele.toLowerCase().trim());

const base_name: string = args[1] ?? path.basename(cwd); // node or the one chosen during init
let selectedLanguage: string = "typescript";
const currentVersion: string = version;

// interface

const prompt = async (): Promise<void> => {
  await helperFunction.prompt(name, currentVersion, __dirname);
};
// unknown command
const help = async (): Promise<void> => {
  await helperFunction.promptHelp(name, currentVersion, __dirname);
};

// main initializer
const main = async () => {
  await helperFunction.prompt(name, currentVersion, __dirname);
  const baseDir = "src";
  let fileName = "";
  let packageObject: typeof objJS | typeof objTS;
  let { packageName } = await inquirer.prompt([
    {
      default: base_name,
      name: "packageName",
      message: "backend/package name:",
      type: "input",
    },
  ]);

  const { language } = await inquirer.prompt([
    {
      choices: ["javascript", "typescript"],
      type: "list",
      default: "typescript",
      name: "language",
      message: "which language do you want to use for your backend app?",
    },
  ]);
  packageObject = language === "javascript" ? objJS : objTS;
  selectedLanguage = language;
  packageObject.name = packageName;

  const { version } = await inquirer.prompt([
    {
      default: "1.0.0",
      name: "version",
      message: "backend/package version:",
    },
  ]);
  packageObject.version = version;
  const { description } = await inquirer.prompt([
    {
      name: "description",
      message: "backend/package description:",
    },
  ]);
  packageObject.description = description;
  const { entryPoint } = await inquirer.prompt([
    {
      default: language === "javascript" ? "server.js" : "server.ts",

      name: "entryPoint",
      message: "backend/package entry point:",
    },
  ]);
  if (entryPoint.split(".").length > 1) {
    if (
      entryPoint.split(".")[1] === "js" ||
      entryPoint.split(".")[1] === "ts"
    ) {
      fileName = entryPoint;
    } else {
      fileName =
        language === "javascript" ? `${entryPoint}.js` : `${entryPoint}.ts`;
    }
  } else {
    fileName =
      language === "javascript" ? `${entryPoint}.js` : `${entryPoint}.ts`;
  }
  packageObject.main = fileName;
  if (fileName.split(".")[1] === "js") {
    packageObject.scripts.start = `node src/${fileName}`;
    packageObject.scripts.dev = `nodemon src/${fileName}`;
  } else {
    packageObject.scripts.start = `ts-node src/${fileName}`;
    packageObject.scripts.dev = `nodemon src/${fileName}`;
  }
  const { keywords } = await inquirer.prompt([
    {
      name: "keywords",
      message: "backend/package keywords:",
    },
  ]);
  packageObject.keywords = keywords?.split(" ");
  const { author } = await inquirer.prompt([
    {
      name: "author",
      message: "backend/package author:",
    },
  ]);
  packageObject.author = author;
  const { license } = await inquirer.prompt([
    {
      name: "license",
      default: "MIT",
      message: "backend/package license:",
      type: "list",
      choices: licenses.map((l) => l.spdx_id),
    },
  ]);
  const chosenLicense = licenses.find((l) => l.spdx_id === license);

  let res = await fetch(chosenLicense?.url as any);
  const licenseData = await res.json();
  packageObject.license = license;

  if (!fs.existsSync(path.resolve(cwd, baseDir))) {
    await helperFunction.createFolders(path.resolve(cwd, baseDir));
  }
  let routesFolder: string = "src/routes";
  if (!fs.existsSync(path.resolve(cwd, routesFolder))) {
    await helperFunction.createFolders(path.resolve(cwd, routesFolder));
  }

  const jsCode = await readFile(
    path.resolve(path.join(__dirname, "utils/server.js")),
    "utf8"
  );
  const tsCode = await readFile(
    path.resolve(path.join(__dirname, "utils/server.ts")),
    "utf8"
  );
  const jsCodeRouter = await readFile(
    path.resolve(path.join(__dirname, "utils/router.js")),
    "utf8"
  );
  const tsCodeRouter = await readFile(
    path.resolve(path.join(__dirname, "utils/router.ts")),
    "utf8"
  );

  helperFunction.creatingFilesPrompt(fileName);
  await writeFile(
    path.resolve(path.resolve(cwd, `${baseDir}/${fileName}`)),
    fileName.split(".")[1].toLocaleLowerCase() === "ts" ? tsCode : jsCode
  );

  const routesFile: string =
    fileName.split(".")[1].toLocaleLowerCase() === "ts"
      ? "index.ts"
      : "index.js";
  await writeFile(
    path.resolve(path.resolve(cwd, `${routesFolder}/${routesFile}`)),
    fileName.split(".")[1].toLocaleLowerCase() === "ts"
      ? tsCodeRouter
      : jsCodeRouter
  );
  await writeFile(
    path.resolve(cwd, "package.json"),
    JSON.stringify(packageObject, null, 2)
  );
  const readMePath = path.resolve(path.join(__dirname, "utils/readme.md"));
  const gitIgnorePath = path.resolve(
    path.join(__dirname, "utils/gitignore.txt")
  );
  const readMe = await readFile(readMePath, "utf8");
  const gitIgnore = await readFile(gitIgnorePath, "utf8");
  await writeFile(path.resolve(cwd, ".gitignore"), gitIgnore);
  await writeFile(path.resolve(cwd, ".env"), `# environment variables here`);
  await writeFile(path.resolve(cwd, "README.md"), readMe);
  await writeFile(path.resolve(cwd, "LICENCE"), licenseData?.body);
  let config = "";
  if (fileName.split(".")[1].toLocaleLowerCase() === "ts") {
    const tsconfigPath = path.resolve(
      path.join(__dirname, "configs/tsconfig.json")
    );
    config = await readFile(tsconfigPath, "utf8");
    await writeFile(
      path.resolve(cwd, "tsconfig.json"),
      JSON.stringify(JSON.parse(config), null, 2)
    );
  }
};

helperFunction.sep();

main()
  .catch((error) => console.error(error))
  .then(async () => {
    const { packageManager } = await inquirer.prompt([
      {
        choices: ["yarn", "npm"],
        type: "list",
        default: "yarn",
        name: "packageManager",
        message: "which package manager are you using?",
      },
    ]);
    await helperFunction.installPackages(packageManager);
    await helperFunction.displayMessage(packageManager, selectedLanguage);
  });

if (args.length === 1) {
  prompt();
} else if (args[0] === "-h" || args[0] === "--help") {
  help();
} else if (args[0] === "-v" || args[0] === "--version") {
  prompt();
} else if (args[0] === "init") {
  main()
    .catch((error) => console.error(error))
    .then(async () => {
      const { packageManager } = await inquirer.prompt([
        {
          choices: ["yarn", "npm"],
          type: "list",
          default: "yarn",
          name: "packageManager",
          message: "which package manager are you using?",
        },
      ]);
      await helperFunction.installPackages(packageManager);
      await helperFunction.displayMessage(packageManager, selectedLanguage);
    });
} else {
  prompt();
}
