import { printSuccess, printLocation, printWarning } from "./logger.js";
import { execSync } from "child_process";

class DebugToolsChecker {
  static checkFlipperInstallation() {
    try {
      const result = execSync("ruby -v");
      const rubyVersion = result.toString();
      // regex: /(?<=ruby )(.*?)(?=.)/gi
    } catch (error) {}

    printWarning("Ruby installation not found");
    return {
      name: "Ruby Installation check",
      success: false,
      optional: false,
      message: ``,
    };
  }
}

export default DebugToolsChecker;
