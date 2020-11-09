const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const chalk = require("chalk");
const inquirer = require("inquirer");
const mustache = require("mustache");
const ncp = promisify(require("ncp").ncp);
const yaml = require("json-to-pretty-yaml");
const { unflatten } = require("flat");
const spawn = require("cross-spawn");
const { kebabCaseIt } = require("case-it");
const rename = promisify(fs.rename)

const questions = require("./questions");

const root = __dirname;
const log = console.log;

const defaultConfig = {
  i18n: {
    locale: "en",
  },
  map: {
    center: [5.2913, 52.1326],
    zoom: 7,
  },
};

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

function generateReadme(destination, options) {
  const filePath = path.join(destination, "app", "readme.md");
  const template = fs.readFileSync(filePath).toString();
  const packageJson = mustache.render(template, options);

  fs.writeFileSync(filePath, packageJson);
}

function generatePackageJson(destination, options) {
  const filePath = path.join(destination, "app", "package.json");
  const template = fs.readFileSync(filePath).toString();
  const packageJson = mustache.render(template, options);

  fs.writeFileSync(filePath, packageJson);
}

function installDependencies(destination) {
  return new Promise((resolve, reject) => {
    const process = spawn("npm", ["install"], {
      stdio: "inherit",
      cwd: path.join(destination, "app"),
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

async function initializeDotfiles(destination) {
  const files = ['env', 'gitignore']

  await Promise.all(files.map(async file => {
    await rename(path.join(destination, "app", file), path.join(destination, "app", `.${file}`))
  }))
}

function logger(config) {
  config.forEach((line) => {
    if (line.length) {
      const [color, message] = line;
      return log(chalk[color](message));
    } else {
      log();
    }
  });
}

module.exports = {
  getOptions,
  checkIfEmpty,
  copyTemplate,
  generateConfig,
  generateReadme,
  generatePackageJson,
  installDependencies,
  initializeDotfiles,
  logger
}
