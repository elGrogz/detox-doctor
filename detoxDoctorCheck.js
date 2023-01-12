import WindowsTools from "./operatingSystemChecks/windowsTools.js";
import LinuxTools from "./operatingSystemChecks/linuxTools.js";
import chalk from "chalk";
import MacOsTools from "./operatingSystemChecks/macosTools.js";
import { printChecksComplete } from "./utils/logger.js";

class DetoxDoctorCheck {
  start() {
    switch (process.platform) {
      case "darwin":
        const macosTools = new MacOsTools();

        macosTools.reportSystemInfo();
        const results = macosTools.runMacOsCheck();

        printChecksComplete();

        this.reportOptionalActionsToTake(results);
        this.reportActionsToTake(results);
        break;
      case "win32":
        const windowsTools = new WindowsTools();

        windowsTools.reportSystemInfo();
        windowsTools.runWindowsCheck();
        break;
      case "linux":
        const linuxTools = new LinuxTools();

        linuxTools.reportSystemInfo();
        linuxTools.runLinuxCheck();
        break;
      default:
        console.log(chalk.red.bold("Unrecognised OS"));
        break;
    }
  }

  reportOptionalActionsToTake(results) {
    console.log(chalk.bgYellowBright("Optional Steps to take:"));

    let filteredOptionalResults = results.filter(
      (result) => result.optional === true && result.success === false
    );

    if (filteredOptionalResults.length > 0) {
      filteredOptionalResults.forEach((result) => {
        console.log(`⚠️ ${chalk.yellow(result.message)}`);
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
        console.log(`✖ ${chalk.red(result.message)}`);
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
