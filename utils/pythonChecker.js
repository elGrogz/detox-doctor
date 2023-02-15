import { printSuccess, printLocation, printWarning } from "./logger.js";
import { execSync } from "child_process";

// currently only used for Flipper and IDB
class PythonChecker {
  static checkPython3Installation() {
    try {
      const python3InstallationPath = execSync("which python3")
        .toString()
        .replace("\n", "");
      printSuccess(
        `Python3 installed at: ${printLocation(python3InstallationPath)}`
      );

      return {
        name: "Python3 installation check",
        success: true,
        optional: true,
      };
    } catch (error) {
      printWarning("Python3 not installed");
      return {
        name: "Python3 installation check",
        success: false,
        optional: true,
        message: `Python3 not installed. This is needed for IDB to work, which allows iOS simulator debugging`,
      };
    }
  }
}

export default PythonChecker;
