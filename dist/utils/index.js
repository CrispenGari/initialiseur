"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const prompt = () => {
    console.log();
    console.log(chalk_1.default.bgBlue("------- NODE BACKEND (JavaScript/TypeScript) -------"));
    console.log();
};
const helperFunction = {
    prompt,
};
exports.default = helperFunction;
//# sourceMappingURL=index.js.map