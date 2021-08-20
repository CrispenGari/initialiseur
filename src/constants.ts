import chalk from "chalk";
import fs from "fs/promises";
import path from "path";

const sep = (): void => {
  console.log();
};
const prompt = (): void => {
  sep();
  console.log(
    chalk.bgBlue("------- NODE BACKEND (JavaScript/TypeScript) ------- ")
  );
  sep();
};

const message = (packageManager: string, language: string): void => {
  sep();
  console.log(chalk.bgGreen("-- all done!! "));

  if (language === "JavaScript") {
    sep();
    console.log(chalk.bgBlue(`-- Available commands in ${language} --- `));
    sep();
    console.log(chalk.green(`-- $ ${packageManager} start `));
    console.log(chalk.green(`-- $ ${packageManager} dev `));
  } else {
    sep();
    console.log(chalk.bgBlue(`-- Available commands in ${language} --- `));
    sep();
    console.log(chalk.green(`-- $ ${packageManager} start `));
    console.log(chalk.blue(`-- $ ${packageManager} dev `));
    console.log(chalk.blue(`-- $ ${packageManager} watch `));
    console.log(chalk.green(`-- $ ${packageManager} start:fast `));
  }
};

const createFolders = async (pathName: string): Promise<any> => {
  await fs.mkdir(path.resolve(__dirname, pathName));
};
const helperFunction: any = {
  prompt,
  createFolders,
  sep,
  message,
};
export default helperFunction;
