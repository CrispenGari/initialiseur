#!/usr/bin/env node
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

const main = async () => {
  const baseDir: string = "src";
  let fileName: string = "";
  let packageObject: typeof objTS | typeof objJS;
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

  if (!fs.existsSync(baseDir)) {
    await helperFunction.createFolders(baseDir);
  }

  await writeFile(
    path.resolve(path.join(__dirname, baseDir, fileName)),
    fileName.split(".")[1].toLocaleLowerCase() === "ts"
      ? `const message:string = "hello world!";\nconsole.log(message)`
      : `const message = "hello world!";\nconsole.log(message)`
  );
  await writeFile(
    path.join(__dirname, "package.json"),
    JSON.stringify(packageObject, null, 2)
  );
  await writeFile(
    path.join(__dirname, ".gitignore"),
    `# node modules\nnode_modules\n\n# .env\n.env\n\n`
  );
  await writeFile(path.join(__dirname, "README.md"), `## Node Backend`);

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
      path.join(__dirname, "/configs/tsconfig.json")
    );
    config = await readFile(tsconfigPath, "utf8");
    await writeFile(
      path.join(__dirname, "tsconfig.json"),
      JSON.stringify(JSON.parse(config), null, 2)
    );
  }
};

helperFunction.sep();

main()
  .catch((error) => console.error(error))
  .then(() => {
    exec("npm install", function (_error, _stdout, _stderr) {});
  })
  .finally(() => {
    helperFunction.message();
  });
