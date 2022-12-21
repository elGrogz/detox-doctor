import WindowsTools from "./operatingSystemChecks/windowsTools.js";
import LinuxTools from "./operatingSystemChecks/linuxTools.js";
import chalk from "chalk";
import MacOsTools from "./operatingSystemChecks/macosTools.js";
import { printChecksComplete, printWarning } from "./utils/logger.js";

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
    console.log(chalk.bgYellowBright("Optional Steps to take:"));

    let filteredOptionalResults = results.filter(
      (result) => result.optional === true && result.success === false
    );

    filteredOptionalResults.forEach((result) => {
      console.log(chalk.yellow(result.message));
    });
  }
}

export default DetoxDoctor;

// results: [
//   {
//     name: 'Node Version Check',
//     success: true,
//     optional: false,
//     message: ''
//   },
//   {
//     name: 'Android Studio Check',
//     success: true,
//     optional: false,
//     message: ''
//   },
//   {
//     name: 'Java Installation Check',
//     success: true,
//     optional: false,
//     message: ''
//   },
//   {
//     name: 'Android Platforms Check',
//     success: false,
//     optional: false,
//     message: ''
//   },
//   {
//     name: 'Android Command Line Tools Check',
//     success: false,
//     optional: true,
//     message: ''
//   },
//   {
//     name: 'CMake Check',
//     success: false,
//     optional: false,
//     message: ''
//   },
//   { name: 'NDK Check', success: false, optional: false, message: '' },
//   undefined,
//   {
//     name: 'Android SDK Check',
//     success: false,
//     optional: false,
//     message: ''
//   },
//   undefined,
//   {
//     name: 'Android AVD Check',
//     success: false,
//     optional: false,
//     message: ''
//   },
//   {
//     name: 'iOS Xcode Check',
//     success: true,
//     optional: false,
//     message: ''
//   },
//   {
//     name: 'iOS applesimutils Check',
//     success: true,
//     optional: false,
//     message: ''
//   },
//   {
//     name: 'NPM Detox CLI Check',
//     success: true,
//     optional: true,
//     message: ''
//   }
// ]
