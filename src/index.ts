#!/usr/bin/env ts-node
import path from "path";
import inquirer from "inquirer";
import { writeFile, readFile } from "fs/promises";
import fs from "fs";
import helperFunction from "./constants";
import { exec } from "child_process";
import { objJS, objTS } from "./utils";
import chalk from "chalk";

helperFunction.prompt();
const cwd = process.cwd();
const base_name = path.basename(cwd); // node
let selectedLanguage: string = "typescript";

const main = async () => {
  const baseDir = "src";
  let fileName = "";
  let packageObject: typeof objJS | typeof objTS;
  const { packageName } = await inquirer.prompt([
    {
      default: chalk.blue(base_name),
      name: "packageName",
      message: "backend/package name:",
    },
  ]);
  const { language } = await inquirer.prompt([
    {
      choices: ["javascript", "typescript"],
      type: "list",
      default: chalk.blue("typescript"),
      name: "language",
      message: "which language do you want to use for your backend app?",
    },
  ]);
  packageObject = language === "javascript" ? objJS : objTS;
  selectedLanguage = language;
  packageObject.name = packageName;

  const { version } = await inquirer.prompt([
    {
      default: chalk.blue("1.0.0"),
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
      default: chalk.blue(
        language === "javascript" ? "server.js" : "server.ts"
      ),
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
      choices: ["MIT"],
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

  helperFunction.creatingFilesPrompt(fileName);
  await writeFile(
    path.resolve(path.resolve(cwd, `${baseDir}/${fileName}`)),
    fileName.split(".")[1].toLocaleLowerCase() === "ts" ? tsCode : jsCode
  );
  await writeFile(
    path.resolve(cwd, "package.json"),
    JSON.stringify(packageObject, null, 2)
  );

  const readMePath = path.resolve(path.join(__dirname, "utils/readme.md"));
  const gitIgnorePath = path.resolve(path.join(__dirname, "utils/.gitignore"));
  const licencePath = path.resolve(path.join(__dirname, "utils/LICENSE"));
  const readMe = await readFile(readMePath, "utf8");
  const gitIgnore = await readFile(gitIgnorePath, "utf8");
  const licenceText = await readFile(licencePath, "utf8");

  await writeFile(path.resolve(cwd, ".gitignore"), gitIgnore);
  await writeFile(path.resolve(cwd, ".env"), `# environment variables here`);
  await writeFile(path.resolve(cwd, "README.md"), readMe);
  await writeFile(path.resolve(cwd, "LICENCE"), licenceText);

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
        type: "list",
        default: "yarn",
        name: "packageManager",
        message: "which package manager are you using?",
      },
    ]);
    const installing = async () => {
      if (packageManager === "yarn") {
        await exec("yarn", (_, __, ___) => {});
      } else {
        await exec("npm install", (_, __, ___) => {});
      }
      helperFunction.sep();
      console.log(
        chalk.blue(`--- installing packages using ${packageManager}...`)
      );
    };
    await installing().then(() => {
      helperFunction.message(packageManager, selectedLanguage);
    });
  });
