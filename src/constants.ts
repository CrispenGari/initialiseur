import chalk from "chalk";
import fs from "fs/promises";
import path from "path";
const sep = (): void => {
  console.log();
};
const prompt = (): void => {
  sep();
  console.log(
    " ",
    chalk.bgGreen(" NODE BACKEND "),
    `(${chalk.bgYellow(" javascript")}${chalk.green("/")}${chalk.bgBlue(
      "typescript "
    )})`
  );
  sep();
};

const creatingFilesPrompt = (fileName: string): void => {
  const files: string[] = [
    "README.md",
    ".gitignore",
    ".env",
    "LICENCE",
    "package.json",
  ];
  if (fileName.split(".")[1] === "ts") {
    files.push("tsconfig.json");
  }
  sep();
  console.log(chalk.green("Generating Basic Files"));
  console.log(`  - ${chalk.bgBlue(" src ")}`);
  console.log(`     - ${chalk.blue(fileName)}`);
  for (let i = 0; i < files.length; i++) {
    console.log(`  - ${chalk.blue(files[i])}`);
  }
  sep();
};

const message = (packageManager: string, language: string): void => {
  sep();
  console.log(chalk.bgGreen("-- all done!! "));

  if (language === "javascript") {
    sep();
    console.log(chalk.bgBlue(` available commands in ${language} `));
    sep();
    console.log(
      chalk.green(
        ` ${
          packageManager === "yarn"
            ? chalk.bgBlue(packageManager)
            : chalk.bgRed(packageManager)
        } start `
      )
    );
    console.log(
      chalk.green(
        ` ${
          packageManager === "yarn"
            ? chalk.bgBlue(packageManager)
            : chalk.bgRed(packageManager)
        } dev `
      )
    );
  } else {
    sep();
    console.log(chalk.bgBlue(` available commands in ${language} `));
    sep();
    console.log(
      chalk.white(
        ` ${
          packageManager === "yarn"
            ? chalk.bgBlue(packageManager)
            : chalk.bgRed(packageManager)
        } start `
      )
    );
    console.log(
      chalk.white(
        ` ${
          packageManager === "yarn"
            ? chalk.bgBlue(packageManager)
            : chalk.bgRed(packageManager)
        } dev `
      )
    );
    console.log(
      chalk.white(
        ` ${
          packageManager === "yarn"
            ? chalk.bgBlue(packageManager)
            : chalk.bgRed(packageManager)
        } watch `
      )
    );
    console.log(
      chalk.white(
        ` ${
          packageManager === "yarn"
            ? chalk.bgBlue(packageManager)
            : chalk.bgRed(packageManager)
        } start:fast `
      )
    );
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
  creatingFilesPrompt,
};
export default helperFunction;
