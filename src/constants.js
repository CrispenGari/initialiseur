const chalk = require("chalk");
const fs = require("fs/promises");
const path = require("path");

const sep = () => {
  console.log();
};
const prompt = () => {
  sep();
  console.log(
    chalk.bgBlue("------- NODE BACKEND (JavaScript/TypeScript) ------- ")
  );
  sep();
};

const message = () => {
  sep();
  console.log(chalk.bgBlue("-- all done!! "));
  sep();
  console.log(chalk.bgGreen("-- run npm dev "));
  sep();
};

const createFolders = async (pathName) => {
  await fs.mkdir(path.resolve(__dirname, pathName));
};
const helperFunction = {
  prompt,
  createFolders,
  sep,
  message,
};
module.exports = helperFunction;
