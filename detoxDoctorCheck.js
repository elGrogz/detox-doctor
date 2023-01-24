import WindowsTools from "./operatingSystemChecks/windowsTools.js";
import LinuxTools from "./operatingSystemChecks/linuxTools.js";
import chalk from "chalk";
import MacOsTools from "./operatingSystemChecks/macosTools.js";
import { printFail, printWarning } from "./utils/logger.js";

class DetoxDoctorCheck {
  constructor(options) {
    this.options = options;
  }

  start() {
    this.reportOptionsUsed();
    switch ("win32") {
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

        this.reportOptionalActionsToTake(windowResults);
        this.reportActionsToTake(windowResults);
        break;
      case "linux":
        const linuxTools = new LinuxTools();

        linuxTools.reportSystemInfo();
        const linuxResults = linuxTools.runLinuxCheck(this.options);

        this.reportOptionalActionsToTake(linuxResults);
        this.reportActionsToTake(linuxResults);
        break;
      default:
        console.log(chalk.red.bold("Unrecognised OS"));
        break;
    }
  }

  reportOptionsUsed() {
    // todo
  }

  reportOptionalActionsToTake(results) {
    console.log(chalk.bgYellowBright("Optional Steps to take:"));

    let filteredOptionalResults = results.filter(
      (result) => result.optional === true && result.success === false
    );

    if (filteredOptionalResults.length > 0) {
      filteredOptionalResults.forEach((result) => {
        printWarning(chalk.yellow(result.message));
      });
    } else {
      console.log(chalk.green.underline("No optional steps to take!"));
    }
  }

  reportActionsToTake(results) {
    console.log(chalk.bgRed("\nMandatory Steps to take:"));

    let filteredResults = results.filter(
      (result) => result.optional === false && result.success === false
    );

    if (filteredResults.length > 0) {
      filteredResults.forEach((result) => {
        printFail(chalk.red(result.message));
      });
    } else {
      console.log(
        chalk.green.underline(
          "No mandatory steps to take! You are ready to use Detox"
        )
      );
    }
  }
}

export default DetoxDoctorCheck;
