import { existsSync } from "fs";

const NODE_COMMON_PATHS = [
  process.env.NODE_BIN,
  "/usr/local/bin/node",
  "/opt/local/bin/node",
];

class NodeDetector {
  static async getNodeVersion() {
    for (let path of NODE_COMMON_PATHS) {
      if (path && (await existsSync(path))) {
        console.log("HERE WE GO", path);
        console.log(chalk.green(`✅ Node binary available at: ${path}`));
        return;
      }
      consoleconsole.log(chalk.red("❌ Node binary could not be found"));
    }
  }
}

export default NodeDetector;
