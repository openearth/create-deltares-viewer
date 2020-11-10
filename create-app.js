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
  initializeDotfiles,
  logger,
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

    initializeDotfiles(destination);

    generateConfig(destination, options);

    logger([["green", "✔ succefully copied files"]]);

    generatePackageJson(destination, options);

    logger([["green", "✔ succefully generated package.json"]]);

    generateReadme(destination, options);

    logger([
      ["green", "✔ succefully generated readme.md"],
      ["green", "✔ project setup successful"],
      [],
      ["blueBright", "‣ going to install dependencies"],
      [],
    ]);

    await installDependencies(destination);

    logger([
      ["green", "✔ depencies installed successfully"],
      [],
      [["white", `All done! created ${options.name} in `], ["yellow", destination]],
      [],
      ["white", "The configuration can be found here:"],
      [["white", `  ${destination}`], ["yellow", "/config"]],
      [],
      ["white", "The app can be found here:"],
      [["white", `  ${destination}`], ["yellow", "/app"]],
      [],
      ["white", "Start developing by navigating into the app:"],
      [["blueBright", `  cd ./${options.name}/app`]],
      [],
      ["white", "Then, start developing by typing:"],
      ["blueBright", "  npm run start"],
    ]);
  } catch (err) {
    await rimraf(destination);

    if (err.message) {
      logger([["red", `☠ there was an error: ${err.message}`]]);
    } else {
      console.error(err);
    }
  }
};
