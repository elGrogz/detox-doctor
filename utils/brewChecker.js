import {
  printSuccess,
  printLocation,
  printWarning,
  printCheckMessage,
} from "./logger.js";
import { execSync } from "child_process";

class BrewChecker {
  static checkStarting() {
    printCheckMessage("\nChecking Homebrew installation 🍺");
  }

  static checkBrewInstallation() {
    try {
      const brewInstallationPath = execSync("which brew")
        .toString()
        .replace("\n", "");
      printSuccess(
        `Homebrew installed at: ${printLocation(brewInstallationPath)}`
      );

      return {
        name: "Brew installation check",
        success: true,
        optional: true,
      };
    } catch (error) {
      printWarning("Brew not installed");
      return {
        name: "Brew installation check",
        success: false,
        optional: true,
        message: `Homebrew not installed. It is recommended to have Brew installed for package management on MacOS. Head to ${printLocation(
          "brew.sh"
        )} for install steps`,
      };
    }
  }
}

export default BrewChecker;
