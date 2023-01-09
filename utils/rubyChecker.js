import { printSuccess, printFail, printLocation } from "./logger.js";
import { execSync } from "child_process";

class RubyChecker {
  static checkRubyInstallation() {
    try {
      const result = execSync("ruby -v");
      const rubyInstallLocation = execSync("which ruby");
      const rubyVersion = result.toString();
      // regex: /(?<=ruby )(.*?)(?=.)/gi
      printSuccess(
        `Ruby Installation found at ${printLocation(rubyInstallLocation)}: ${printLocation(rubyVersion)}`
      );
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
