const path = require("path");
const { promisify } = require("util");
const rimraf = promisify(require("rimraf"));

const {
  getOptions,
  checkIfEmpty,
  copyTemplate,
  generateConfig,
  generateReadme,
  generatePackageJson,
  installDependencies,
  logger
} = require("./util");

module.exports = async function createApp() {
  const cwd = process.cwd();
  const options = await getOptions();
  const destination = path.join(cwd, options.name);

  try {
    await checkIfEmpty(destination);
  } catch (err) {
    logger(["", ["red", `☠ there was an error: ${err.message}`]]);
    return;
  }

  try {
    logger(["", ["blueBright", "‣ setting up project from template"], ""]);

    await copyTemplate(destination, options.name);

    generateConfig(destination, options);

    logger([["green", "✔ succefully copied files"]]);

    generatePackageJson(destination, options);

    logger([["green", "✔ succefully generated package.json"]]);

    generateReadme(destination, options);

    logger([
      ["green", "✔ succefully generated readme.md"],
      ["green", "✔ project setup successful"],
      [],
      ["blue", "‣ going to install dependencies"],
      [],
    ]);

    await installDependencies(destination);

    logger([
      ["green", "✔ depencies installed successfully"],
      [],
      ["white", `All done! created ${options.name} in ${destination}`],
      ["white", "Start developing by typing:"],
      ["blueBright", `  cd ${destination}`],
      [],
      ["white", "Start developing by typing:"],
      ["blueBright", "  npm run start"],
    ]);
  } catch (err) {
    await rimraf(destination);

    if (err.message) {
      logger([["red", `☠ there was an error: ${err.message}`]]);
    } else {
      console.error(err)
    }
  }
};
