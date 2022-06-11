#!/usr/bin/env ts-node
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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const inquirer_1 = __importDefault(require("inquirer"));
const promises_1 = require("fs/promises");
const fs_1 = __importDefault(require("fs"));
const constants_1 = __importDefault(require("./constants"));
const utils_1 = require("./utils");
const package_json_1 = require("../package.json");
const licenses_json_1 = __importDefault(require("./utils/licenses/licenses.json"));
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const process_1 = __importDefault(require("process"));
const cwd = process_1.default.cwd();
const args = process_1.default.argv
    .slice(2)
    .map((ele) => ele.toLowerCase().trim());
const base_name = (_a = args[1]) !== null && _a !== void 0 ? _a : path_1.default.basename(cwd);
let selectedLanguage = "typescript";
const currentVersion = package_json_1.version;
const prompt = () => __awaiter(void 0, void 0, void 0, function* () {
    yield constants_1.default.prompt(package_json_1.name, currentVersion, __dirname);
});
const help = () => __awaiter(void 0, void 0, void 0, function* () {
    yield constants_1.default.promptHelp(package_json_1.name, currentVersion, __dirname);
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield constants_1.default.prompt(package_json_1.name, currentVersion, __dirname);
    const baseDir = "src";
    let fileName = "";
    let packageObject;
    let { packageName } = yield inquirer_1.default.prompt([
        {
            default: base_name,
            name: "packageName",
            message: "backend/package name:",
            type: "input",
        },
    ]);
    const { language } = yield inquirer_1.default.prompt([
        {
            choices: ["javascript", "typescript"],
            type: "list",
            default: "typescript",
            name: "language",
            message: "which language do you want to use for your backend app?",
        },
    ]);
    packageObject = language === "javascript" ? utils_1.objJS : utils_1.objTS;
    selectedLanguage = language;
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
            default: language === "javascript" ? "server.js" : "server.ts",
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
                language === "javascript" ? `${entryPoint}.js` : `${entryPoint}.ts`;
        }
    }
    else {
        fileName =
            language === "javascript" ? `${entryPoint}.js` : `${entryPoint}.ts`;
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
            type: "list",
            choices: licenses_json_1.default.map((l) => l.spdx_id),
        },
    ]);
    const { files } = yield inquirer_1.default.prompt([
        {
            name: "files",
            type: "checkbox",
            choices: [".gitignore", "Readme.md", "LICENSE", ".env"],
            message: "which additional files do you want to add for your backend app?",
            default: [".gitignore", ".env"],
        },
    ]);
    const chosenLicense = licenses_json_1.default.find((l) => l.spdx_id === license);
    let res = yield (0, cross_fetch_1.default)(chosenLicense === null || chosenLicense === void 0 ? void 0 : chosenLicense.url);
    const licenseData = yield res.json();
    packageObject.license = license;
    if (!fs_1.default.existsSync(path_1.default.resolve(cwd, baseDir))) {
        yield constants_1.default.createFolders(path_1.default.resolve(cwd, baseDir));
    }
    let routesFolder = "src/routes";
    if (!fs_1.default.existsSync(path_1.default.resolve(cwd, routesFolder))) {
        yield constants_1.default.createFolders(path_1.default.resolve(cwd, routesFolder));
    }
    const jsCode = yield (0, promises_1.readFile)(path_1.default.resolve(path_1.default.join(__dirname, "utils/server.js")), "utf8");
    const tsCode = yield (0, promises_1.readFile)(path_1.default.resolve(path_1.default.join(__dirname, "utils/server.ts")), "utf8");
    const jsCodeRouter = yield (0, promises_1.readFile)(path_1.default.resolve(path_1.default.join(__dirname, "utils/router.js")), "utf8");
    const tsCodeRouter = yield (0, promises_1.readFile)(path_1.default.resolve(path_1.default.join(__dirname, "utils/router.ts")), "utf8");
    constants_1.default.creatingFilesPrompt(fileName, files);
    yield (0, promises_1.writeFile)(path_1.default.resolve(path_1.default.resolve(cwd, `${baseDir}/${fileName}`)), fileName.split(".")[1].toLocaleLowerCase() === "ts" ? tsCode : jsCode);
    const routesFile = fileName.split(".")[1].toLocaleLowerCase() === "ts"
        ? "index.ts"
        : "index.js";
    yield (0, promises_1.writeFile)(path_1.default.resolve(path_1.default.resolve(cwd, `${routesFolder}/${routesFile}`)), fileName.split(".")[1].toLocaleLowerCase() === "ts"
        ? tsCodeRouter
        : jsCodeRouter);
    yield (0, promises_1.writeFile)(path_1.default.resolve(cwd, "package.json"), JSON.stringify(packageObject, null, 2));
    const readMePath = path_1.default.resolve(path_1.default.join(__dirname, "utils/readme.md"));
    const gitIgnorePath = path_1.default.resolve(path_1.default.join(__dirname, "utils/gitignore.txt"));
    const readMe = yield (0, promises_1.readFile)(readMePath, "utf8");
    const gitIgnore = yield (0, promises_1.readFile)(gitIgnorePath, "utf8");
    files.indexOf(".gitignore") !== -1 &&
        (yield (0, promises_1.writeFile)(path_1.default.resolve(cwd, ".gitignore"), gitIgnore));
    files.indexOf(".env") !== -1 &&
        (yield (0, promises_1.writeFile)(path_1.default.resolve(cwd, ".env"), `# environment variables here`));
    files.indexOf("README.md") !== -1 &&
        (yield (0, promises_1.writeFile)(path_1.default.resolve(cwd, "README.md"), readMe));
    files.indexOf("LICENSE") !== -1 &&
        (yield (0, promises_1.writeFile)(path_1.default.resolve(cwd, "LICENSE"), licenseData === null || licenseData === void 0 ? void 0 : licenseData.body));
    let config = "";
    if (fileName.split(".")[1].toLocaleLowerCase() === "ts") {
        const tsconfigPath = path_1.default.resolve(path_1.default.join(__dirname, "configs/tsconfig.json"));
        config = yield (0, promises_1.readFile)(tsconfigPath, "utf8");
        yield (0, promises_1.writeFile)(path_1.default.resolve(cwd, "tsconfig.json"), JSON.stringify(JSON.parse(config), null, 2));
    }
});
constants_1.default.sep();
if (args.length === 0) {
    prompt();
}
else if (args[0] === "-h" || args[0] === "--help") {
    help();
}
else if (args[0] === "-v" || args[0] === "--version") {
    prompt();
}
else if (args[0] === "init") {
    main()
        .catch((error) => console.error(error))
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        const { packageManager } = yield inquirer_1.default.prompt([
            {
                choices: ["yarn", "npm"],
                type: "list",
                default: "yarn",
                name: "packageManager",
                message: "which package manager are you using?",
            },
        ]);
        yield constants_1.default.installPackages(packageManager);
        yield constants_1.default.displayMessage(packageManager, selectedLanguage);
    }));
}
else {
    prompt();
}
//# sourceMappingURL=index.js.map