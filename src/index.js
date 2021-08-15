#!/usr/bin/env node
const path = require("path");
const inquirer = require("inquirer");
const { writeFile, readFile } = require("fs/promises");
const fs = require("fs");
const helperFunction = require("./constants.js");
const { exec } = require("child_process");
const { objJS, objTS } = require("./utils/index.js");
const chalk = require("chalk");

helperFunction.prompt();
const cwd = process.cwd();
const base_name = path.basename(cwd); // node

const main = async () => {
  const baseDir = "src";
  let fileName = "";
  let packageObject = {};
  const { language } = await inquirer.prompt([
    {
      choices: ["JavaScript", "TypeScript"],
      type: "checkbox",
      default: "TypeScript",
      name: "language",
      message: "which language do you want to use for your backend app?",
    },
  ]);
  packageObject = language[0] === "JavaScript" ? objJS : objTS;

  const { packageName } = await inquirer.prompt([
    {
      default: base_name,
      name: "packageName",
      message: "backend/package name:",
    },
  ]);
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
      default: language[0] === "JavaScript" ? "server.js" : "server.ts",
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
        language[0] === "JavaScript" ? `${entryPoint}.js` : `${entryPoint}.ts`;
    }
  } else {
    fileName =
      language[0] === "JavaScript" ? `${entryPoint}.js` : `${entryPoint}.ts`;
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
    },
  ]);
  packageObject.license = license;

  if (!fs.existsSync(path.resolve(cwd, baseDir))) {
    await helperFunction.createFolders(path.resolve(cwd, baseDir));
  }

  const jsCode = await readFile(
    path.resolve(path.join(__dirname, "utils/server.js")),
    "utf8"
  );
  const tsCode = await readFile(
    path.resolve(path.join(__dirname, "utils/server.ts")),
    "utf8"
  );

  await writeFile(
    path.resolve(path.resolve(cwd, `${baseDir}/${fileName}`)),
    fileName.split(".")[1].toLocaleLowerCase() === "ts" ? tsCode : jsCode
  );
  await writeFile(
    path.resolve(cwd, "package.json"),
    JSON.stringify(packageObject, null, 2)
  );

  const readMePath = path.resolve(path.join(__dirname, "utils/readme.md"));
  const readMe = await readFile(readMePath, "utf8");

  await writeFile(
    path.resolve(cwd, ".gitignore"),
    `# node modules\nnode_modules\n\n# .env\n.env\n\n`
  );
  await writeFile(path.resolve(cwd, ".env"), `# environment variables here`);
  await writeFile(path.resolve(cwd, "README.md"), readMe);

  let config = "";
  if (fileName.split(".")[1].toLocaleLowerCase() === "ts") {
    helperFunction.sep();
    console.log(
      chalk.bgGreen(
        "we have detected that you are using typescript therefore we are generating tsconfig.json for you.."
      )
    );
    helperFunction.sep();
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
        type: "checkbox",
        default: "yarn",
        name: "packageManager",
        message: "which package manager are you using?",
      },
    ]);

    const installing = async () => {
      if (packageManager[0] === "yarn") {
        await exec("yarn", (_, __, ___) => {});
      } else {
        await exec("npm install", (_, __, ___) => {});
      }
      helperFunction.sep();
      console.log(
        chalk.blue(`--- installing packages using ${packageManager[0]}...`)
      );
    };
    installing().finally(() => {
      helperFunction.message();
    });
  });
