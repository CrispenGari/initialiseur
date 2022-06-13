const chalk = require("chalk");
const { readFile, mkdir } = require("fs/promises");
const path = require("path");
const { exec } = require("child_process");
const sep = () => {
  console.log();
};
const prompt = async (name, version, __dirname) => {
  const t = await readFile(
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

const promptHelp = async (name, version, __dirname) => {
  const t = await readFile(
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
const creatingFilesPrompt = (fileName, files) => {
  files.push("package.json");
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

const message = (packageManager, language) => {
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

const createFolders = async (pathName) => {
  await mkdir(path.resolve(__dirname, pathName));
};

const installPackages = async (packageManager) => {
  sep();
  console.log(chalk.blue(`--- installing packages using ${packageManager}...`));
  if (packageManager === "yarn") {
    await exec("yarn", (_, __, ___) => {});
    await exec("yarn upgrade", (_, __, ___) => {});
  } else {
    await exec("npm install", (_, __, ___) => {});
    await exec("npm update", (_, __, ___) => {});
  }
};

const displayMessage = async (packageManager, selectedLanguage) => {
  message(packageManager, selectedLanguage);
};
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
module.exports = helperFunction;
