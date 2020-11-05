const fs = require("fs");
const path = require("path");
const promisify = require("util").promisify;
const chalk = require("chalk");
const inquirer = require("inquirer");
const mustache = require("mustache");
const ncp = promisify(require("ncp").ncp);
const yaml = require("json-to-pretty-yaml");
const unflatten = require("flat").unflatten;
const spawn = require("cross-spawn");
const rimraf = promisify(require("rimraf"));
const { kebabCaseIt } = require("case-it");

const questions = require("./questions");
const defaultConfig = require("./default-config");

const log = console.log;
const root = __dirname;

async function getOptions() {
  const answers = await inquirer.prompt(questions);
  const formattedAnswers = unflatten(answers);

  formattedAnswers.name = kebabCaseIt(formattedAnswers.name);

  return {
    ...formattedAnswers,
    ...defaultConfig,
  };
}

async function checkIfEmpty(destination) {
  const dirExists = fs.existsSync(destination);

  if (dirExists) {
    const files = await fs.promises.readdir(destination);

    if (files.length) {
      throw new Error("directory not empty", {
        type: "notEmpty",
      });
    }
  }

  return;
}

async function copyTemplate(destination) {
  const origin = path.join(root, "template");

  await ncp(origin, destination);
}

function generateConfig(destination, options) {
  const yamlOutput = yaml.stringify(options);

  fs.writeFileSync(path.join(destination, "config", "config.yml"), yamlOutput);
}

function generatePackageJson(destination, options) {
  const filePath = path.join(destination, "package.json");
  const template = fs.readFileSync(filePath).toString();
  const packageJson = mustache.render(template, options);

  fs.writeFileSync(filePath, packageJson);
}

function installDependencies(destination) {
  return new Promise((resolve, reject) => {
    const process = spawn("npm", ["install"], {
      stdio: "inherit",
      cwd: destination,
    });
    const errorMessage = "installation failed";

    process.on("error", function (err) {
      reject(err);
    });

    process.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(errorMessage));

        return;
      }

      resolve();
    });
  });
}

module.exports = async function createApp() {
  const cwd = process.cwd();
  const options = await getOptions();
  const destination = path.join(cwd, options.name);

  try {
    await checkIfEmpty(destination);
  } catch (err) {
    log();
    log(chalk.red(`☠ there was an error: ${err.message}`));
    return;
  }

  try {
    log();
    log(chalk.blueBright("‣ setting up project from template"));
    log();

    await copyTemplate(destination, options.name);

    generateConfig(destination, options);

    log(chalk.green("✔ succefully copied files"));

    generatePackageJson(destination, options);

    log(chalk.green("✔ succefully generated package.json"));
    log(chalk.green("✔ project setup successful"));
    log();

    log(chalk.blueBright("‣ going to install dependencies"));
    log();

    await installDependencies(destination);

    log(chalk.green("✔ depencies installed successfully"));
    log();
    log(chalk.white(`All done! created ${options.name} in ${destination}`));
    log(chalk.white("Start developing by typing:"));
    log(chalk.blueBright("  cd "), chalk.white(destination));
    log();
    log(chalk.white("Start developing by typing:"));
    log(chalk.blueBright("  npm run start"));
  } catch (err) {
    console.log(err);

    await rimraf(destination);

    log(chalk.red(`☠ there was an error: ${err.message}`));
    return;
  }
};
