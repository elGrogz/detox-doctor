import { execSync } from "child_process";
import chalk from "chalk";

class IosToolsChecker {
  static checkXcodePath() {
    try {
      const xcodePathResult = execSync("xcode-select -p");
      console.log(chalk.green("✅ Xcode Installed at:", xcodePathResult));
    } catch (error) {
      console.error(chalk.red("❌ Could not find Xcode installation:", error));
    }
  }
}

export default IosToolsChecker;
