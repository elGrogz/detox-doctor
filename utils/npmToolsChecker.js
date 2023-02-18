import fs from "fs";
import chalk from "chalk";
import {
  printLocation,
  printWarning,
  printSuccess,
  printCheckMessage,
} from "./logger.js";

class NpmToolsChecker {
  static checkStarting() {
    printCheckMessage("\nChecking system setup for NPM Tools 🧰");
  }

  static checkForDetoxCli() {
    if (fs.existsSync(`${process.env.NVM_BIN}/detox`)) {
      printSuccess(
        `Detox CLI installed globally at: ${printLocation(
          process.env.NVM_BIN + "/detox"
        )} via npm`
      );

      return {
        name: "NPM Detox CLI Check",
        success: true,
        optional: true,
      };
    } else {
      printWarning(
        `Detox CLI not installed globally at ${printLocation(
          process.env.NVM_BIN
        )}`
      );

      return {
        name: "NPM Detox CLI Check",
        success: false,
        optional: true,
        message: `detox-cli is not required to run Detox if it's already installed as a dependency in your app, but it will allow you to run detox from anywhere. Ensure you have Node and NVM installed and run ${chalk.blueBright.underline(
          "npm i -g detox-cli"
        )}`,
      };
    }
  }
}

export default NpmToolsChecker;
