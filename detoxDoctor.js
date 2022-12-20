import WindowsTools from "./operatingSystemChecks/windowsTools.js";
import LinuxTools from "./operatingSystemChecks/linuxTools.js";
import chalk from "chalk";
import MacOsTools from "./operatingSystemChecks/macosTools.js";

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
        macosTools.runMacOsCheck(); // function to start checking macos for environmental stuff
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
        windowsTools.runWindowsCheck(); // function to start checking windows for environmental stuff
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
        linuxTools.runLinuxCheck(); // function to start checking linux for environmental stuff
        break;
      default:
        console.log(chalk.red.bold("Unrecognised OS"));
        break;
    }
  }
}

export default DetoxDoctor;
