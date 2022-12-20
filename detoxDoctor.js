import WindowsTools from "./operatingSystemChecks/windowsTools.js";
import LinuxTools from "./operatingSystemChecks/linuxTools.js";
import chalk from "chalk";
import MacOsTools from "./operatingSystemChecks/macosTools.js";
import { printChecksComplete } from "./utils/logger.js";

class DetoxDoctor {
  constructor(context) {
    this.context = context;
  }

  start() {
    switch (this.context.os) {
      case "darwin":
        console.log(
          chalk.white(
            `\nChecking ${chalk.bold.bgBlue(
              " MacOS "
            )} configuration for running Detox tests...\n`
          )
        );
        const macosTools = new MacOsTools();
        const results = macosTools.runMacOsCheck();
        printChecksComplete();
        this.reportOptionalActionsToTake(results);
        break;
      case "win32":
        console.log(
          chalk.white(
            `\nChecking ${chalk.bold.bgBlue(
              " Windows "
            )} configuration for running Detox tests...\n`
          )
        );
        const windowsTools = new WindowsTools();
        windowsTools.runWindowsCheck();
        break;
      case "linux":
        console.log(
          chalk.white(
            `\nChecking ${chalk.bold.bgBlue(
              " Linux "
            )} configuration for running Detox tests...\n`
          )
        );
        const linuxTools = new LinuxTools();
        linuxTools.runLinuxCheck();
        break;
      default:
        console.log(chalk.red.bold("Unrecognised OS"));
        break;
    }
  }

  reportOptionalActionsToTake(results) {
    console.log("reporting optional actions to take");
  }
}

export default DetoxDoctor;
