#!/usr/bin/env ts-node
const inquirer = require("inquirer");
const path = require("path");
const { writeFile, readFile } = require("fs/promises");
const fs = require("fs");
const helperFunction = require("./constants");
const { objJS, objTS } = require("./utils/index.js");
const { name, version } = require("../package.json");
const licenses = require("./utils/licenses/licenses.json");
const fetch = require("cross-fetch");
const process = require("process");

const cwd = process.cwd();
const args = process.argv.slice(2).map((ele) => ele.toLowerCase().trim());

const base_name = args[1] ?? path.basename(cwd); // node or the one chosen during init
let selectedLanguage = "typescript";
const currentVersion = version;

// interface

const prompt = async () => {
  await helperFunction.prompt(name, currentVersion, __dirname);
};
// unknown command
const help = async () => {
  await helperFunction.promptHelp(name, currentVersion, __dirname);
};

// main initializer
const main = async () => {
  await helperFunction.prompt(name, currentVersion, __dirname);
  const baseDir = "src";
  let fileName = "";
  let packageObject;
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

  const { files } = await inquirer.prompt([
    {
      name: "files",
      type: "checkbox",
      choices: [".gitignore", "Readme.md", "LICENSE", ".env"],
      message:
        "which additional files do you want to add for your backend app?",
      default: [".gitignore", ".env"],
    },
  ]);

  const chosenLicense = licenses.find((l) => l.spdx_id === license);
  let res = await fetch(chosenLicense?.url);
  const licenseData = await res.json();
  packageObject.license = license;

  if (!fs.existsSync(path.resolve(cwd, baseDir))) {
    await helperFunction.createFolders(path.resolve(cwd, baseDir));
  }
  let routesFolder = "src/routes";
  if (!fs.existsSync(path.resolve(cwd, routesFolder))) {
    await helperFunction.createFolders(path.resolve(cwd, routesFolder));
  }

  const jsCode = await readFile(
    path.resolve(path.join(__dirname, "utils/js/server")),
    "utf8"
  );
  const tsCode = await readFile(
    path.resolve(path.join(__dirname, "utils/ts/server")),
    "utf8"
  );
  const jsCodeRouter = await readFile(
    path.resolve(path.join(__dirname, "utils/js/router")),
    "utf8"
  );
  const tsCodeRouter = await readFile(
    path.resolve(path.join(__dirname, "utils/ts/router")),
    "utf8"
  );

  helperFunction.creatingFilesPrompt(fileName, files);
  await writeFile(
    path.resolve(path.resolve(cwd, `${baseDir}/${fileName}`)),
    fileName.split(".")[1].toLocaleLowerCase() === "ts" ? tsCode : jsCode
  );

  const routesFile =
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
  files.indexOf(".gitignore") !== -1 &&
    (await writeFile(path.resolve(cwd, ".gitignore"), gitIgnore));
  files.indexOf(".env") !== -1 &&
    (await writeFile(
      path.resolve(cwd, ".env"),
      `# environment variables here`
    ));
  files.indexOf("README.md") !== -1 &&
    (await writeFile(path.resolve(cwd, "README.md"), readMe));
  files.indexOf("LICENSE") !== -1 &&
    (await writeFile(path.resolve(cwd, "LICENSE"), licenseData?.body));
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

if (args.length === 0) {
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
