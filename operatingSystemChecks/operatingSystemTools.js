import { execSync } from "child_process";
import chalk from "chalk";
import { printCheckMessage } from "../utils/logger.js";

class OperatingSystemTools {
  constructor(options) {
    this.options = options;
    this.completedChecks = [];
    this.platform = this.getPlatform();
    this.operatingSystem = this.getOs();
    this.shell = this.getShell();
    this.architecture = this.getArchitecture();
  }

  runCheck(check) {
    const result = check;
    this.completedChecks.push(result);
  }

  getPlatform() {
    return process.platform;
  }

  getOs() {
    const platform = this.getPlatform();

    switch (platform) {
      case "darwin":
        return "MacOS";
      case "win32":
        return "Windows";
      case "linux":
        return "Linux";
      default:
        return "Unknown Operation System";
    }
  }

  getShell() {
    let response = execSync("echo $SHELL").toString().replace("\n", "");
    return response;
  }

  getArchitecture() {
    return process.arch;
  }

  reportSystemInfo() {
    printCheckMessage("\nSystem Info 💻");
    console.log(
      chalk.white(
        `Operating System: ${chalk.bold.bgBlue(this.operatingSystem)}`
      )
    );
    console.log(
      chalk.white(`Operating Platform: ${chalk.bold.bgBlue(this.platform)}`)
    );
    console.log(
      chalk.white(`Architecture: ${chalk.bold.bgBlue(this.architecture)}`)
    );
    console.log(chalk.white(`Shell: ${chalk.bold.bgBlue(this.shell)}`));
  }
}

export default OperatingSystemTools;
