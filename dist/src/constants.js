"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const chalk_1 = __importDefault(require("chalk"));
const promises_1 = __importStar(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const sep = () => {
    console.log();
};
const prompt = (name, version, __dirname) => __awaiter(void 0, void 0, void 0, function* () {
    const t = yield (0, promises_1.readFile)(path_1.default.resolve(path_1.default.join(__dirname, "files/art.txt")), { encoding: "utf8" });
    console.log(chalk_1.default.cyan(t));
    console.log(chalk_1.default.italic(chalk_1.default.gray(" creating nodejs applications(apis) for both development and production.")));
    sep();
    console.log(` ${chalk_1.default.cyan(name)} version ${chalk_1.default.green(version)}`, `(${chalk_1.default.bgYellow(" javascript ")}${chalk_1.default.green("/")}${chalk_1.default.bgBlue("typescript ")})`);
    sep();
    sep();
});
const promptHelp = (name, version, __dirname) => __awaiter(void 0, void 0, void 0, function* () {
    const t = yield (0, promises_1.readFile)(path_1.default.resolve(path_1.default.join(__dirname, "files/help.txt")), { encoding: "utf8" });
    console.log(chalk_1.default.cyan(t));
    console.log(chalk_1.default.italic(chalk_1.default.gray(" creating nodejs applications(apis) for both development and production.")));
    sep();
    console.log(` ${chalk_1.default.cyan(name)} version ${chalk_1.default.green(version)}`, `(${chalk_1.default.bgYellow(" javascript ")}${chalk_1.default.green("/")}${chalk_1.default.bgBlue("typescript ")})`);
    sep();
    sep();
    console.log(chalk_1.default.green(" init <package name>"), chalk_1.default.gray(" for initializing a new backend server."));
    console.log(chalk_1.default.green(" -h"), chalk_1.default.cyan("or"), chalk_1.default.green("--help"), chalk_1.default.gray(" for help."));
    console.log(chalk_1.default.green(" -v"), chalk_1.default.cyan("or"), chalk_1.default.green("--version"), chalk_1.default.gray(" display the version for initializr."));
    sep();
    sep();
});
const creatingFilesPrompt = (fileName, files) => {
    files.push("package.json");
    if (fileName.split(".")[1] === "ts") {
        files.push("tsconfig.json");
    }
    sep();
    console.log(chalk_1.default.green("Generating Basic Files"));
    console.log(`  - ${chalk_1.default.bgBlue(" src ")}`);
    console.log(`     - ${chalk_1.default.bgGreen(" routes ")}`);
    console.log(`       - ${chalk_1.default.blue(`index.${fileName.split(".")[1]} `)}`);
    console.log(`     - ${chalk_1.default.blue(fileName)}`);
    for (let i = 0; i < files.length; i++) {
        console.log(`  - ${chalk_1.default.blue(files[i])}`);
    }
    sep();
};
const message = (packageManager, language) => {
    sep();
    console.log(chalk_1.default.bgGreen("-- all done!! "));
    if (language === "javascript") {
        sep();
        console.log(chalk_1.default.bgBlue(` available commands in ${language} `));
        sep();
        console.log(chalk_1.default.green(` ${packageManager === "yarn"
            ? chalk_1.default.bgBlue(packageManager)
            : chalk_1.default.bgRed(packageManager)} start `));
        console.log(chalk_1.default.green(` ${packageManager === "yarn"
            ? chalk_1.default.bgBlue(packageManager)
            : chalk_1.default.bgRed(packageManager)} dev `));
    }
    else {
        sep();
        console.log(chalk_1.default.bgBlue(` available commands in ${language} `));
        sep();
        console.log(chalk_1.default.white(` ${packageManager === "yarn"
            ? chalk_1.default.bgBlue(packageManager)
            : chalk_1.default.bgRed(packageManager)} start `));
        console.log(chalk_1.default.white(` ${packageManager === "yarn"
            ? chalk_1.default.bgBlue(packageManager)
            : chalk_1.default.bgRed(packageManager)} dev `));
        console.log(chalk_1.default.white(` ${packageManager === "yarn"
            ? chalk_1.default.bgBlue(packageManager)
            : chalk_1.default.bgRed(packageManager)} watch `));
        console.log(chalk_1.default.white(` ${packageManager === "yarn"
            ? chalk_1.default.bgBlue(packageManager)
            : chalk_1.default.bgRed(packageManager)} start:fast `));
    }
};
const createFolders = (pathName) => __awaiter(void 0, void 0, void 0, function* () {
    yield promises_1.default.mkdir(path_1.default.resolve(__dirname, pathName));
});
const installPackages = (packageManager) => __awaiter(void 0, void 0, void 0, function* () {
    sep();
    console.log(chalk_1.default.blue(`--- installing packages using ${packageManager}...`));
    if (packageManager === "yarn") {
        yield (0, child_process_1.exec)("yarn", (_, __, ___) => { });
        yield (0, child_process_1.exec)("yarn upgrade", (_, __, ___) => { });
    }
    else {
        yield (0, child_process_1.exec)("npm install", (_, __, ___) => { });
        yield (0, child_process_1.exec)("npm update", (_, __, ___) => { });
    }
});
const displayMessage = (packageManager, selectedLanguage) => __awaiter(void 0, void 0, void 0, function* () {
    message(packageManager, selectedLanguage);
});
const helperFunction = {
    prompt,
    createFolders,
    sep,
    message,
    creatingFilesPrompt,
    installPackages,
    displayMessage,
    promptHelp,
};
exports.default = helperFunction;
//# sourceMappingURL=constants.js.map