#!/usr/bin/env node
const inquirer = require("inquirer");
const path = require("path");
const { writeFile, readFile } = require("fs/promises");
const fs = require("fs");
const helperFunction = require("./constants");
const { objJS, objTS } = require("./utils/index.js");

const {
  getScriptObject,
  getEntryPoint,
  getDependencies,
  getDevDependencies,
} = require("./helper/index.js");
const { name, version } = require("../package.json");
const licenses = require("./utils/licenses/licenses.json");
const fetch = require("cross-fetch");
const process = require("process");

const cwd = process.cwd();
const args = process.argv.slice(2).map((ele) => ele.toLowerCase().trim());

const base_name = args[1] ?? path.basename(cwd); // node or the one chosen during init
let selectedLanguage = "typescript";
let selectedBoilerPlate = "express";
const currentVersion = version;
let selectedPackageName = base_name;

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

  const { boilerPlate } = await inquirer.prompt([
    {
      name: "boilerPlate",
      type: "list",
      choices: ["koa", "express", "electron"],
      message: "which boiler plate application do you want to initialize?",
      default: "express",
    },
  ]);

  let { packageName } = await inquirer.prompt([
    {
      default: base_name,
      name: "packageName",
      message: "boiler plate name:",
      type: "input",
    },
  ]);
  selectedPackageName = packageName;

  const { language } = await inquirer.prompt([
    {
      choices:
        boilerPlate === "electron"
          ? ["javascript"]
          : ["javascript", "typescript"],
      type: "list",
      default: boilerPlate === "electron" ? "javascript" : "typescript",
      name: "language",
      message: `which language do you want to use for your (${boilerPlate}) boiler plate app?`,
    },
  ]);
  packageObject = language === "javascript" ? objJS : objTS;
  selectedLanguage = language;
  selectedBoilerPlate = boilerPlate;
  packageObject.name = packageName;
  packageObject.scripts = getScriptObject(boilerPlate, language);

  const { version } = await inquirer.prompt([
    {
      default: "1.0.0",
      name: "version",
      message: "boiler plate version:",
    },
  ]);
  packageObject.version = version;
  const { description } = await inquirer.prompt([
    {
      name: "description",
      message: "boiler plate description:",
    },
  ]);

  packageObject.description = description;
  const { entryPoint } = await inquirer.prompt([
    {
      default: getEntryPoint(boilerPlate, language),
      name: "entryPoint",
      message: "boiler plate entry point:",
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
  const { keywords } = await inquirer.prompt([
    {
      name: "keywords",
      message: "boiler plate keywords:",
    },
  ]);
  packageObject.keywords = keywords?.split(" ");
  const { author } = await inquirer.prompt([
    {
      name: "author",
      message: "boiler plate author:",
    },
  ]);
  packageObject.author = author;
  const { license } = await inquirer.prompt([
    {
      name: "license",
      default: "MIT",
      message: "boiler plate license:",
      type: "list",
      choices: licenses.map((l) => l.spdx_id),
    },
  ]);

  const { files } = await inquirer.prompt([
    {
      name: "files",
      type: "checkbox",
      choices: [".gitignore", "README.md", "LICENSE", ".env"],
      message: `which additional files do you want to add for your (${boilerPlate}) boiler plate app?`,
      default: [".gitignore", ".env"],
    },
  ]);

  packageObject.dependencies = getDependencies(boilerPlate, language);
  packageObject.devDependencies = getDevDependencies(boilerPlate, language);

  const chosenLicense = licenses.find((l) => l.spdx_id === license);
  let res = await fetch(chosenLicense?.url);
  const licenseData = await res.json();
  packageObject.license = license;

  if (!fs.existsSync(path.resolve(cwd, baseDir))) {
    await helperFunction.createFolders(path.resolve(cwd, baseDir));
  }

  let routesFolder =
    boilerPlate === "express"
      ? "src/routes"
      : boilerPlate === "koa"
      ? "src/routes/hello"
      : null;

  if (routesFolder !== null) {
    if (!fs.existsSync(path.resolve(cwd, routesFolder))) {
      await helperFunction.createFolders(path.resolve(cwd, routesFolder));
    }
  }
  //************ CREATING FOLDERS and Files FOR ELECTRON APP****************** */
  if (boilerPlate === "electron") {
    const htmlElectronCode = await readFile(
      path.resolve(path.join(__dirname, "utils/electron/files/index.html")),
      "utf8"
    );

    const mainElectronCode = await readFile(
      path.resolve(path.join(__dirname, "utils/electron/js/main")),
      "utf8"
    );
    const preloadElectronCode = await readFile(
      path.resolve(path.join(__dirname, "utils/electron/files/preload")),
      "utf8"
    );

    const rendererElectronCode = await readFile(
      path.resolve(path.join(__dirname, "utils/electron/files/index")),
      "utf8"
    );

    const cssElectronCode = await readFile(
      path.resolve(path.join(__dirname, "utils/electron/files/index.css")),
      "utf8"
    );

    if (!fs.existsSync(path.resolve(cwd, "src/public"))) {
      await helperFunction.createFolders(path.resolve(cwd, "src/public"));
    }
    if (!fs.existsSync(path.resolve(cwd, "styles"))) {
      await helperFunction.createFolders(path.resolve(cwd, "src/styles"));
    }
    if (!fs.existsSync(path.resolve(cwd, "scripts"))) {
      await helperFunction.createFolders(path.resolve(cwd, "src/scripts"));
    }

    await writeFile(
      path.resolve(path.resolve(cwd, `${baseDir}/scripts/preload.js`)),
      preloadElectronCode
    );
    await writeFile(
      path.resolve(path.resolve(cwd, `${baseDir}/scripts/index.js`)),
      rendererElectronCode
    );
    await writeFile(
      path.resolve(path.resolve(cwd, `${baseDir}/styles/index.css`)),
      cssElectronCode
    );
    await writeFile(
      path.resolve(path.resolve(cwd, `${baseDir}/public/index.html`)),
      htmlElectronCode
    );
    await writeFile(
      path.resolve(path.resolve(cwd, `${baseDir}/main.js`)),
      mainElectronCode
    );
  }

  //************************ Done Creating Folders for an electron app. */
  const jsCodeKoa = await readFile(
    path.resolve(path.join(__dirname, "utils/koa/js/server")),
    "utf8"
  );
  const tsCodeKoa = await readFile(
    path.resolve(path.join(__dirname, "utils/koa/ts/server")),
    "utf8"
  );
  const jsCodeExpress = await readFile(
    path.resolve(path.join(__dirname, "utils/express/js/server")),
    "utf8"
  );
  const tsCodeExpress = await readFile(
    path.resolve(path.join(__dirname, "utils/express/ts/server")),
    "utf8"
  );

  const jsCodeRouterKoa = await readFile(
    path.resolve(path.join(__dirname, "utils/koa/js/router")),
    "utf8"
  );
  const tsCodeRouterKoa = await readFile(
    path.resolve(path.join(__dirname, "utils/koa/ts/router")),
    "utf8"
  );

  const jsCodeRouterExpress = await readFile(
    path.resolve(path.join(__dirname, "utils/express/js/router")),
    "utf8"
  );
  const tsCodeRouterExpress = await readFile(
    path.resolve(path.join(__dirname, "utils/express/ts/router")),
    "utf8"
  );

  helperFunction.creatingFilesPrompt(fileName, files, boilerPlate);

  const routesFile =
    fileName.split(".")[1].toLocaleLowerCase() === "ts"
      ? "index.ts"
      : "index.js";
  if (boilerPlate === "express") {
    await writeFile(
      path.resolve(path.resolve(cwd, `${baseDir}/${fileName}`)),
      fileName.split(".")[1].toLocaleLowerCase() === "ts"
        ? tsCodeExpress
        : jsCodeExpress
    );
    await writeFile(
      path.resolve(path.resolve(cwd, `${routesFolder}/${routesFile}`)),
      fileName.split(".")[1].toLocaleLowerCase() === "ts"
        ? tsCodeRouterExpress
        : jsCodeRouterExpress
    );
  } else if (boilerPlate === "koa") {
    await writeFile(
      path.resolve(path.resolve(cwd, `${baseDir}/${fileName}`)),
      fileName.split(".")[1].toLocaleLowerCase() === "ts"
        ? tsCodeKoa
        : jsCodeKoa
    );
    await writeFile(
      path.resolve(path.resolve(cwd, `${routesFolder}/${routesFile}`)),
      fileName.split(".")[1].toLocaleLowerCase() === "ts"
        ? tsCodeRouterKoa
        : jsCodeRouterKoa
    );
  }

  await writeFile(
    path.resolve(cwd, "package.json"),
    JSON.stringify(packageObject, null, 2)
  );
  const readMePath = path.resolve(path.join(__dirname, "files/readme.md"));
  const gitIgnorePath = path.resolve(
    path.join(__dirname, "files/gitignore.txt")
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
      path.join(__dirname, `utils/${boilerPlate}/configs/tsconfig.json`)
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

      await helperFunction.displayMessage(
        packageManager,
        selectedLanguage,
        selectedBoilerPlate,
        path.join(cwd.replace(base_name, ""), selectedPackageName)
      );
    });
} else {
  prompt();
}
