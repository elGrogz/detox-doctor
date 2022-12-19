import { printSuccess, printLocation, printFail } from "./logger.js";
import { execSync } from "child_process";
import chalk from "chalk";

class IosToolsChecker {
  static checkXcodePath() {
    try {
      const xcodePathResult = execSync("xcode-select -p");
      printSuccess(
        `Xcode Installed at: ${printLocation(
          xcodePathResult.toString().replace(/[\r\n]/gm, "")
        )}`
      );
    } catch (error) {
      printFail(`Could not find Xcode installation: ${error}`);
    }
  }

  static checkAppleSimUtils() {
    try {
      const appleSimUtilsPath = execSync("which applesimutils");
      printSuccess(
        `applesimutils installed at: ${printLocation(appleSimUtilsPath)}`
      );
    } catch (error) {
      printFail(`Could not find applesimutils installation: ${error}`);
    }
  }
}

export default IosToolsChecker;
