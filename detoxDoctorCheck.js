import WindowsTools from "./operatingSystemChecks/windowsTools.js";
import LinuxTools from "./operatingSystemChecks/linuxTools.js";
import chalk from "chalk";
import MacOsTools from "./operatingSystemChecks/macosTools.js";
import { printFail, printWarning, printCheckMessage } from "./utils/logger.js";

class DetoxDoctorCheck {
  constructor(options) {
    this.options = options;
  }

  start() {
    this.reportOptionsUsed();

    switch (process.platform) {
      case "darwin":
        const macosTools = new MacOsTools(this.options);

        macosTools.reportSystemInfo();
        const macOsResults = macosTools.runMacOsCheck();

        if (!this.options.excludeOptional) {
          this.reportOptionalActionsToTake(macOsResults);
        }

        this.reportActionsToTake(macOsResults);
        break;
      case "win32":
        const windowsTools = new WindowsTools(this.options);

        windowsTools.reportSystemInfo();
        const windowResults = windowsTools.runWindowsCheck(this.options);

        if (!this.options?.excludeOptional) {
          this.reportOptionalActionsToTake(windowResults);
        }
        this.reportActionsToTake(windowResults);
        break;
      case "linux":
        const linuxTools = new LinuxTools();

        linuxTools.reportSystemInfo();
        const linuxResults = linuxTools.runLinuxCheck(this.options);

        if (!this.options.excludeOptional) {
          this.reportOptionalActionsToTake(linuxResults);
        }
        this.reportActionsToTake(linuxResults);
        break;
      default:
        console.log(chalk.red.bold("Unrecognised OS"));
        break;
    }
  }

  reportOptionsUsed() {
    printCheckMessage("\nChecks to be performed");

    if (!this.options.iosOnly) {
      console.log(chalk.white("Android"));
    }

    if (!this.options.androidOnly && process.platform === "darwin") {
      console.log(chalk.white("iOS"));
    }

    console.log(chalk.white("Mandatory Detox Checks"));

    if (!this.options.excludeOptional) {
      console.log(chalk.white("Optional Detox Checks"));
    }
  }

  reportOptionalActionsToTake(results) {
    if (results) {
      let filteredOptionalResults = results.filter(
        (result) => result.optional === true && result.success === false
      );

      if (filteredOptionalResults.length > 0) {
        console.log(chalk.bgYellowBright("Optional Steps to take:"));
        filteredOptionalResults.forEach((result) => {
          printWarning(chalk.yellow(result.message));
        });
      }
    } else {
      console.log(chalk.bgGreen("\nNo optional steps to take!\n"));
    }
  }

  reportActionsToTake(results) {
    if (results) {
      let filteredResults = results.filter(
        (result) => result.optional === false && result.success === false
      );

      if (filteredResults.length > 0) {
        console.log(chalk.bgRed("\nMandatory Steps to take:"));
        filteredResults.forEach((result) => {
          printFail(chalk.red(result.message));
        });
      } else {
        console.log(
          chalk.bgGreen(
            "\nNo mandatory steps to take! You are ready to use Detox!"
          )
        );
      }
    }
  }
}

export default DetoxDoctorCheck;
