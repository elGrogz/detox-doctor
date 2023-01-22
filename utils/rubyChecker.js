import { printSuccess, printFail, printLocation } from "./logger.js";
import { execSync } from "child_process";

class RubyChecker {
  static checkRubyInstallation() {
    try {
      const rubyVersion = execSync("ruby -v").toString();
      const rubyInstallLocation = execSync("which ruby")
        .toString()
        .replace(/[\r\n]/gm, "");

      printSuccess(
        `Ruby Installation found at ${printLocation(rubyInstallLocation)}`
      );

      printSuccess(`Ruby Version: ${printLocation(rubyVersion)}`);
      return {
        name: "Ruby Installation check",
        success: true,
        optional: false,
        message: ``,
      };
    } catch (error) {}

    printFail("Ruby installation not found");
    return {
      name: "Ruby Installation check",
      success: false,
      optional: false,
      message: `Ruby not installed in expected location`,
    };
  }
}

export default RubyChecker;
