import { printSuccess, printLocation, printWarning } from "./logger.js";
import { existsSync } from "fs";
import path from "path";

const COMMON_CHOCOLATEY_LOCATION = path.join(
  "C:",
  "ProgramData",
  "chocolatey",
  "bin",
  "choco.exe"
);

class ChocolateyChecker {
  static checkChocolateyInstallation() {
    if (existsSync(COMMON_CHOCOLATEY_LOCATION)) {
      printSuccess(
        `Chcoclatey installed at: ${printLocation(COMMON_CHOCOLATEY_LOCATION)}`
      );

      return {
        name: "Chocolatey installation check",
        success: true,
        optional: true,
      };
    }

    printWarning("Chocolatey not installed");
    return {
      name: "Chocolatey installation check",
      success: false,
      optional: true,
      message: `Chocolatey not installed. It is recommended to have Chocolatey installed for package management on Windows. Install via Powershell with the following command: ${printLocation(
        `Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))`
      )}`,
    };
  }
}

export default ChocolateyChecker;
