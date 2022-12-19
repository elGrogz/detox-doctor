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

      return {
        name: "iOS Xcode Check",
        success: true,
        optional: false,
        message: "",
      };
    } catch (error) {
      printFail(`Could not find Xcode installation: ${error}`);

      return {
        name: "iOS Xcode Check",
        success: false,
        optional: false,
        message: "",
      };
    }
  }

  static checkAppleSimUtils() {
    try {
      const appleSimUtilsPath = execSync("which applesimutils");
      printSuccess(
        `applesimutils installed at: ${printLocation(appleSimUtilsPath)}`
      );

      return {
        name: "iOS applesimutils Check",
        success: true,
        optional: false,
        message: "",
      };
    } catch (error) {
      printFail(`Could not find applesimutils installation: ${error}`);

      return {
        name: "iOS applesimutils Check",
        success: false,
        optional: false,
        message: "",
      };
    }
  }
}

export default IosToolsChecker;
