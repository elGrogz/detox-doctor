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
        message:
          "XCode could not be found. Ensure it is installed via the XCode website or the Apple app store",
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
        message: `applesimutils could not be found. Ensure it is installed via ${printLocation(
          "brew tap wix/brew; brew install applesimutils"
        )}`,
      };
    }
  }
}

export default IosToolsChecker;
