import { existsSync } from "fs";
import chalk from "chalk";

const NODE_COMMON_PATHS = [
  process.env._,
  "/usr/local/bin/node",
  "/opt/local/bin/node",
];

class NodeDetector {
  static getNodeVersion() {
    for (let path of NODE_COMMON_PATHS) {
      if (existsSync(path)) {
        console.log(chalk.green(`✅ Node binary available at: ${path}`));
        return;
      }
    }
    console.log(
      chalk.red("❌ Node binary could not be found in the expected locations")
    );
  }
}

export default NodeDetector;
