#!/usr/bin/env node
import path from "path";
import inquirer from "inquirer";
import { writeFile } from "fs/promises";
import fs from "fs";

import helperFunction from "./constants";
import { objJS, objTS } from "./test";
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
    path.resolve(path.join(baseDir, fileName)),
    fileName.split(".")[1] === "ts"
      ? `const message:string = "hello world!";\nconsole.log(message)`
      : `const message = "hello world!";\nconsole.log(message)`
  );

  // await writeFile(path.join(__dirname, 'package.json', JSON.stringify(JSON.parse(config), null, 2)))
  await writeFile(
    path.join(__dirname, "package.json"),
    JSON.stringify(packageObject, null, 2)
  );
};

main()
  .catch((error) => console.error(error))
  .finally(() => {});
