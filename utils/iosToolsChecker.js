import { printLocation } from "./logger.js";
import { execSync } from "child_process";
import chalk from "chalk";

class IosToolsChecker {
  static checkXcodePath() {
    try {
      const xcodePathResult = execSync("xcode-select -p");
      console.log(
        chalk.green(
          "✅ Xcode Installed at:",
          printLocation(xcodePathResult.toString().replace(/[\r\n]/gm, ""))
        )
      );
    } catch (error) {
      console.error(chalk.red("❌ Could not find Xcode installation:", error));
    }
  }

  static checkAppleSimUtils() {
    try {
      const appleSimUtilsPath = execSync("which applesimutils");
      console.log(
        chalk.green(
          "✅ applesimutils installed at:",
          printLocation(appleSimUtilsPath)
        )
      );
    } catch (error) {
      console.error(
        chalk.red("❌ Could not find applesimutils installation:", error)
      );
    }
  }
}

export default IosToolsChecker;
