#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const inquirer_1 = __importDefault(require("inquirer"));
const promises_1 = require("fs/promises");
const fs_1 = __importDefault(require("fs"));
const constants_1 = __importDefault(require("./constants"));
const child_process_1 = require("child_process");
const utils_1 = require("./utils");
const chalk_1 = __importDefault(require("chalk"));
constants_1.default.prompt();
const cwd = process.cwd();
const base_name = path_1.default.basename(cwd);
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const baseDir = "src";
    let fileName = "";
    let packageObject;
    const { language } = yield inquirer_1.default.prompt([
        {
            choices: ["JavaScript", "TypeScript"],
            type: "checkbox",
            default: "TypeScript",
            name: "language",
            message: "which language do you want to use for your backend app?",
        },
    ]);
    packageObject = language[0] === "JavaScript" ? utils_1.objJS : utils_1.objTS;
    const { packageName } = yield inquirer_1.default.prompt([
        {
            default: base_name,
            name: "packageName",
            message: "backend/package name:",
        },
    ]);
    packageObject.name = packageName;
    const { version } = yield inquirer_1.default.prompt([
        {
            default: "1.0.0",
            name: "version",
            message: "backend/package version:",
        },
    ]);
    packageObject.version = version;
    const { description } = yield inquirer_1.default.prompt([
        {
            name: "description",
            message: "backend/package description:",
        },
    ]);
    packageObject.description = description;
    const { entryPoint } = yield inquirer_1.default.prompt([
        {
            default: language[0] === "JavaScript" ? "server.js" : "server.ts",
            name: "entryPoint",
            message: "backend/package entry point:",
        },
    ]);
    if (entryPoint.split(".").length > 1) {
        if (entryPoint.split(".")[1] === "js" ||
            entryPoint.split(".")[1] === "ts") {
            fileName = entryPoint;
        }
        else {
            fileName =
                language[0] === "JavaScript" ? `${entryPoint}.js` : `${entryPoint}.ts`;
        }
    }
    else {
        fileName =
            language[0] === "JavaScript" ? `${entryPoint}.js` : `${entryPoint}.ts`;
    }
    packageObject.main = fileName;
    if (fileName.split(".")[1] === "js") {
        packageObject.scripts.start = `node src/${fileName}`;
        packageObject.scripts.dev = `nodemon src/${fileName}`;
    }
    else {
        packageObject.scripts.start = `ts-node src/${fileName}`;
        packageObject.scripts.dev = `nodemon src/${fileName}`;
    }
    const { keywords } = yield inquirer_1.default.prompt([
        {
            name: "keywords",
            message: "backend/package keywords:",
        },
    ]);
    packageObject.keywords = keywords === null || keywords === void 0 ? void 0 : keywords.split(" ");
    const { author } = yield inquirer_1.default.prompt([
        {
            name: "author",
            message: "backend/package author:",
        },
    ]);
    packageObject.author = author;
    const { license } = yield inquirer_1.default.prompt([
        {
            name: "license",
            default: "MIT",
            message: "backend/package license:",
        },
    ]);
    packageObject.license = license;
    if (!fs_1.default.existsSync(baseDir)) {
        yield constants_1.default.createFolders(baseDir);
    }
    yield promises_1.writeFile(path_1.default.resolve(path_1.default.join(__dirname, baseDir, fileName)), fileName.split(".")[1].toLocaleLowerCase() === "ts"
        ? `const message:string = "hello world!";\nconsole.log(message)`
        : `const message = "hello world!";\nconsole.log(message)`);
    yield promises_1.writeFile(path_1.default.join(__dirname, "package.json"), JSON.stringify(packageObject, null, 2));
    yield promises_1.writeFile(path_1.default.join(__dirname, ".gitignore"), `# node modules\nnode_modules\n\n# .env\n.env\n\n`);
    yield promises_1.writeFile(path_1.default.join(__dirname, "README.md"), `## Node Backend`);
    let config = "";
    if (fileName.split(".")[1].toLocaleLowerCase() === "ts") {
        constants_1.default.sep();
        console.log(chalk_1.default.bgGreen("we have detected that you are using typescript therefore we are generating tsconfig.json for you.."));
        constants_1.default.sep();
        const tsconfigPath = path_1.default.resolve(path_1.default.join(__dirname, "/configs/tsconfig.json"));
        config = yield promises_1.readFile(tsconfigPath, "utf8");
        yield promises_1.writeFile(path_1.default.join(__dirname, "tsconfig.json"), JSON.stringify(JSON.parse(config), null, 2));
    }
});
constants_1.default.sep();
main()
    .catch((error) => console.error(error))
    .then(() => {
    child_process_1.exec("npm install", function (_error, _stdout, _stderr) { });
})
    .finally(() => {
    constants_1.default.message();
});
//# sourceMappingURL=index.js.map