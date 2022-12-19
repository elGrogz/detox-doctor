import { existsSync } from "fs";
import { printSuccess, printLocation } from "./logger.js";
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
        printSuccess(`Node binary available at: ${printLocation(path)}`);
        return { name: "Node Version Check", success: true, optional: false };
      }
    }
    printFailre("Node binary could not be found in the expected locations");
    return { name: "Node Version Check", success: false, optional: false };
  }
}

export default NodeDetector;
