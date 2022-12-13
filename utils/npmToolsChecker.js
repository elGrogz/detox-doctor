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
        chalk.red(
          `❌ Detox CLI not installed globally at ${chalk.white.underline(
            process.env.NVM_BIN
          )}. Ensure you have Node and NVM installed and run ${chalk.blueBright.underline(
            "npm i -g detox-cli"
          )}`
        )
      );
    }
  }
}

export default NpmToolsChecker;
