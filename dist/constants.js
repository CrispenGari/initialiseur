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
const chalk_1 = __importDefault(require("chalk"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const sep = () => {
    console.log();
};
const prompt = () => {
    sep();
    console.log(chalk_1.default.bgBlue("------- NODE BACKEND (JavaScript/TypeScript) ------- "));
    sep();
};
const message = () => {
    sep();
    console.log(chalk_1.default.bgBlue("-- all done!! "));
    sep();
    console.log(chalk_1.default.bgGreen("-- run npm dev "));
    sep();
};
const createFolders = (pathName) => __awaiter(void 0, void 0, void 0, function* () {
    yield promises_1.default.mkdir(path_1.default.resolve(__dirname, pathName));
});
const helperFunction = {
    prompt,
    createFolders,
    sep,
    message,
};
exports.default = helperFunction;
//# sourceMappingURL=constants.js.map