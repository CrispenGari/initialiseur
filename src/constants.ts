import chalk from "chalk";
import fs, { readFile } from "fs/promises";
import path from "path";
import { exec } from "child_process";
const sep = (): void => {
  console.log();
};
const prompt = async (
  name: string,
  version: string,
  __dirname: string
): Promise<void> => {
  const t: string = await readFile(
    path.resolve(path.join(__dirname, "files/art.txt")),
    { encoding: "utf8" }
  );
  console.log(chalk.cyan(t));
  console.log(
    chalk.italic(
      chalk.gray(
        " creating nodejs applications(apis) for both development and production."
      )
    )
  );
  sep();
  console.log(
    ` ${chalk.cyan(name)} version ${chalk.green(version)}`,
    `(${chalk.bgYellow(" javascript ")}${chalk.green("/")}${chalk.bgBlue(
      "typescript "
    )})`
  );
  sep();
  sep();
};

const promptHelp = async (
  name: string,
  version: string,
  __dirname: string
): Promise<void> => {
  const t: string = await readFile(
    path.resolve(path.join(__dirname, "files/help.txt")),
    { encoding: "utf8" }
  );
  console.log(chalk.cyan(t));
  console.log(
    chalk.italic(
      chalk.gray(
        " creating nodejs applications(apis) for both development and production."
      )
    )
  );
  sep();

  console.log(
    ` ${chalk.cyan(name)} version ${chalk.green(version)}`,
    `(${chalk.bgYellow(" javascript ")}${chalk.green("/")}${chalk.bgBlue(
      "typescript "
    )})`
  );
  sep();
  sep();
  console.log(
    chalk.green(" init <package name>"),
    chalk.gray(" for initializing a new backend server.")
  );
  console.log(
    chalk.green(" -h"),
    chalk.cyan("or"),
    chalk.green("--help"),
    chalk.gray(" for help.")
  );
  console.log(
    chalk.green(" -v"),
    chalk.cyan("or"),
    chalk.green("--version"),
    chalk.gray(" display the version for initializr.")
  );
  sep();
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
  console.log(`     - ${chalk.bgGreen(" routes ")}`);
  console.log(`       - ${chalk.blue(`index.${fileName.split(".")[1]} `)}`);
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

const installPackages = async (packageManager: string): Promise<void> => {
  if (packageManager === "yarn") {
    await exec("yarn", (_, __, ___) => {});
  } else {
    await exec("npm install", (_, __, ___) => {});
  }
  sep();
  console.log(chalk.blue(`--- installing packages using ${packageManager}...`));
};

const displayMessage = async (
  packageManager: string,
  selectedLanguage: string
): Promise<void> => {
  message(packageManager, selectedLanguage);
};
const helperFunction: any = {
  prompt,
  createFolders,
  sep,
  message,
  creatingFilesPrompt,
  installPackages,
  displayMessage,
  promptHelp,
};
export default helperFunction;
