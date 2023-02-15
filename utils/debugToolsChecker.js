import { printSuccess, printLocation, printWarning } from "./logger.js";
import { existsSync } from "fs";
import { execSync } from "child_process";

const COMMON_FLIPPER_LOCATIONS = ["/Applications/Flipper.app"];

class DebugToolsChecker {
  static checkFlipperInstallation() {
    for (let location of COMMON_FLIPPER_LOCATIONS) {
      if (existsSync(location)) {
        printSuccess(`Flipper installed at: ${printLocation(location)}`);

        return {
          name: "Flipper installation check",
          success: true,
          optional: true,
        };
      }
    }

    printWarning("Flipper not installed");
    return {
      name: "Flipper installation check",
      success: false,
      optional: true,
      message: `Flipper not installed. It is recommended to have Flipper installed for debugging Detox tests and React Native apps. Install at the Flipper website or with ${printLocation(
        "brew install --cask flipper"
      )}`,
    };
  }

  // check for idb and python - iOS only
  static checkIdbInstallation() {
    try {
      const idbInstallationPath = execSync("which idb")
        .toString()
        .replace("\n", "");
      printSuccess(
        `IDB Companion installed at: ${printLocation(idbInstallationPath)}`
      );

      return {
        name: "IDB installation check",
        success: true,
        optional: true,
      };
    } catch (error) {
      printWarning("IDB companion not installed");
      return {
        name: "IDB installation check",
        success: false,
        optional: true,
        message: `IDB Companion not installed. This package is needed for iOS and Flipper to work together. Head to ${printLocation(
          "https://fbidb.io/docs/installation"
        )} for install steps (requires Homebrew)`,
      };
    }
  }
}

export default DebugToolsChecker;
