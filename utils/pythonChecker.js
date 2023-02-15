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

  static checkPip3Installation() {
    try {
      const pip3InstallationPath = execSync("which pip3")
        .toString()
        .replace("\n", "");
      printSuccess(`Pip3 installed at: ${printLocation(pip3InstallationPath)}`);

      return {
        name: "Pip3 installation check",
        success: true,
        optional: true,
      };
    } catch (error) {
      printWarning("Pip3 not installed");
      return {
        name: "Pip3 installation check",
        success: false,
        optional: true,
        message: `Pip3 not installed. This is needed to install IDB`,
      };
    }
  }
}

export default PythonChecker;
