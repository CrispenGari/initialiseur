import chalk from "chalk";
import fs from "fs/promises";
import path from "path";

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

const createFolders = async (pathName: string) => {
  await fs.mkdir(path.resolve(__dirname, pathName));
};
const helperFunction = {
  prompt,
  createFolders,
  sep,
  message,
};
export default helperFunction;
