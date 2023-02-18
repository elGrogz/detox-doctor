import {
  printSuccess,
  printLocation,
  printWarning,
  printCheckMessage,
} from "./logger.js";
import { existsSync } from "fs";
import { execSync } from "child_process";

const COMMON_FLIPPER_LOCATIONS = ["/Applications/Flipper.app"];

class DebugToolsChecker {
  static flipperCheckStarting() {
    printCheckMessage("\nChecking Flipper installation 🐬");
  }

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

  static watchmanCheckStarting() {
    printCheckMessage("\nChecking Watchman installation 👁️");
  }

  static checkWatchmanInstallation() {
    try {
      const watchmanInstallationPath = execSync("which watchman")
        .toString()
        .replace("\n", "");
      printSuccess(
        `Watchman installed at: ${printLocation(watchmanInstallationPath)}`
      );

      return {
        name: "Watchman installation check",
        success: true,
        optional: true,
      };
    } catch (error) {
      printWarning("Watchman not installed");
      return {
        name: "Watchman installation check",
        success: false,
        optional: true,
        message: `Watchman not installed. This tool watches for changes on your mchine and can help improve React Native performance. Install with ${printLocation(
          "brew install watchman"
        )} (requires Homebrew)`,
      };
    }
  }
}

export default DebugToolsChecker;
