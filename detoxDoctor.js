import macOsCheck from "./environmentChecks/macos.js";
import windowsOsCheck from "./environmentChecks/windows.js";
import linuxOsCheck from "./environmentChecks/linux.js";
import chalk from "chalk";

const detoxDoctor = (os) => {
  switch (os) {
    case "darwin":
      console.log(
        chalk.white(
          `\nChecking ${chalk.blueBright.bold.bgGreenBright(
            " MacOS "
          )} configuration for running Detox tests...\n`
        )
      );
      macOsCheck(); // function to start checking macos for environmental stuff
      break;
    case "win32":
      console.log(
        chalk.white(
          `\nChecking ${chalk.blueBright.bold.bgGreenBright(
            " Windows "
          )} configuration for running Detox tests...\n`
        )
      );
      windowsOsCheck(); // function to start checking windows for environmental stuff
      break;
    case "linux":
      console.log(
        chalk.white(
          `\nChecking ${chalk.blueBright.bold.bgGreenBright(
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
