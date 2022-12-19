import macOsCheck from "./operatingSystemChecks/macos.js";
import windowsOsCheck from "./operatingSystemChecks/windows.js";
import linuxOsCheck from "./operatingSystemChecks/linux.js";
import chalk from "chalk";
import MacOs from "./operatingSystemChecks/macos.js";

const detoxDoctor = (os) => {
  switch (os) {
    case "darwin":
      console.log(
        chalk.white(
          `\nChecking ${chalk.bold.bgBlue(
            " MacOS "
          )} configuration for running Detox tests...\n`
        )
      );
      const macOs = new MacOs();
      macOs.runCheck(); // function to start checking macos for environmental stuff
      break;
    case "win32":
      console.log(
        chalk.white(
          `\nChecking ${chalk.bold.bgBlue(
            " Windows "
          )} configuration for running Detox tests...\n`
        )
      );
      windowsOsCheck(); // function to start checking windows for environmental stuff
      break;
    case "linux":
      console.log(
        chalk.white(
          `\nChecking ${chalk.bold.bgBlue(
            " Linux "
          )} configuration for running Detox tests...\n`
        )
      );
      linuxOsCheck(); // function to start checking linux for environmental stuff
      break;
    default:
      console.log(chalk.red.bold("Unrecognised OS"));
      break;
  }
};

export default detoxDoctor;
