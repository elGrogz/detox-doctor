import fs from "fs";
import chalk from "chalk";
import { printLocation, printWarning, printSuccess } from "./logger.js";

class NpmToolsChecker {
  static checkForDetoxCli() {
    if (fs.existsSync(`${process.env.NVM_BIN}/detox`)) {
      printSuccess(
        `Detox CLI installed globally at: ${printLocation(
          process.env.NVM_BIN + "/detox"
        )} via npm`
      );
    } else {
      printWarning(
        `Detox CLI not installed globally at ${printLocation(
          process.env.NVM_BIN
        )}.\nThis tool is not required to run Detox if it's installed in your app, but it will allow you to run detox from anywhere.\nEnsure you have Node and NVM installed and run ${chalk.blueBright.underline(
          "npm i -g detox-cli"
        )}`
      );
    }
  }
}

export default NpmToolsChecker;
