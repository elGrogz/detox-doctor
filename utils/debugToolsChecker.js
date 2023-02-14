import { printSuccess, printLocation, printWarning } from "./logger.js";
import { existsSync } from "fs";

const COMMON_FLIPPER_LOCATIONS = ["/Applications/Flipper.app"];

class DebugToolsChecker {
  static checkFlipperInstallation() {
    for (let location of COMMON_FLIPPER_LOCATIONS) {
      if (existsSync(location)) {
        printSuccess("Flipper installed");

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

  // check for idb and python
  static checkIdbInstallation() {}
}

export default DebugToolsChecker;
