import { printSuccess, printLocation, printFail } from "./logger.js";
import { execSync } from "child_process";

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
          "Xcode is required to run Detox iOS tests. Install it via the Xcode website or the Apple app store",
      };
    }
  }

  static checkAppleSimUtils() {
    try {
      const appleSimUtilsPath = execSync("which applesimutils")
        .toString()
        .replace(/[\r\n]/gm, ""); // change to -v
      printSuccess(
        `applesimutils installed at: ${printLocation(appleSimUtilsPath)}`
      );

      return {
        name: "iOS applesimutils Check",
        success: true,
        optional: false,
      };
    } catch (error) {
      printFail(`Could not find applesimutils installation: ${error}`);

      return {
        name: "iOS applesimutils Check",
        success: false,
        optional: false,
        message: `applesimutils is required by Detox to run iOS tests. Run ${printLocation(
          "brew tap wix/brew; brew install applesimutils"
        )} to install`,
      };
    }
  }
}

export default IosToolsChecker;
