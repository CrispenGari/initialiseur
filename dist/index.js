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
const promises_1 = __importDefault(require("fs/promises"));
const inquirer_1 = __importDefault(require("inquirer"));
const process_1 = require("process");
const shelljs_1 = __importDefault(require("shelljs"));
const utils_1 = __importDefault(require("./utils"));
utils_1.default.prompt();
shelljs_1.default.mkdir(path_1.default.resolve(__dirname, "test/test/test"));
const hello = () => __awaiter(void 0, void 0, void 0, function* () {
    yield promises_1.default.mkdir(path_1.default.resolve(__dirname, "test"));
});
hello();
process_1.exit(0);
const cwd = process.cwd();
const base_name = path_1.default.basename(cwd);
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const { language } = yield inquirer_1.default.prompt([
        {
            choices: ["JavaScript", "TypeScript"],
            type: "checkbox",
            default: "TypeScript",
            name: "language",
            message: "which language do you want to use for your backend app?",
        },
    ]);
    const { packageName } = yield inquirer_1.default.prompt([
        {
            default: base_name,
            name: "packageName",
            message: "backend/package name:",
        },
    ]);
    const { version } = yield inquirer_1.default.prompt([
        {
            default: "1.0.0",
            name: "version",
            message: "backend/package version:",
        },
    ]);
    const { description } = yield inquirer_1.default.prompt([
        {
            name: "description",
            message: "backend/package description:",
        },
    ]);
    const { entryPoint } = yield inquirer_1.default.prompt([
        {
            default: language[0] === "JavaScript" ? "server.js" : "server.ts",
            name: "entryPoint",
            message: "backend/package entry point:",
        },
    ]);
    const { testCommand } = yield inquirer_1.default.prompt([
        {
            name: "testCommand",
            message: "backend/package test command:",
        },
    ]);
    const { gitRepository } = yield inquirer_1.default.prompt([
        {
            name: "gitRepository",
            message: "backend/package git repository:",
        },
    ]);
    const { keywords } = yield inquirer_1.default.prompt([
        {
            name: "keywords",
            message: "backend/package keywords:",
        },
    ]);
    const { author } = yield inquirer_1.default.prompt([
        {
            name: "author",
            message: "backend/package author:",
        },
    ]);
    const { license } = yield inquirer_1.default.prompt([
        {
            name: "license",
            default: "MIT",
            message: "backend/package license:",
        },
    ]);
    console.log(description, testCommand, entryPoint, license, keywords, gitRepository, packageName, language, version, author);
});
main()
    .catch((error) => console.error(error))
    .finally(() => { });
//# sourceMappingURL=index.js.map