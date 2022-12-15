import fs from "fs";
import chalk from "chalk";

class NpmToolsChecker {
  static checkForDetoxCli() {
    if (fs.existsSync(`${process.env.NVM_BIN}/detox`)) {
      console.log(
        chalk.green(
          `✅ Detox CLI installed globally at: ${chalk.white.underline(
            process.env.NVM_BIN + "/detox"
          )} via npm`
        )
      );
    } else {
      console.log(
        chalk.yellow(
          `⚠️ Detox CLI not installed globally at ${chalk.white.underline(
            process.env.NVM_BIN
          )}.\nThis tool is not required to run Detox if it's installed in your app, but it will allow you to run detox from anywhere.\nEnsure you have Node and NVM installed and run ${chalk.blueBright.underline(
            "npm i -g detox-cli"
          )}`
        )
      );
    }
  }
}

export default NpmToolsChecker;
