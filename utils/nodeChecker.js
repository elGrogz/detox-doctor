import { execSync } from "child_process";
import { existsSync } from "fs";
import { printSuccess, printLocation, printFail } from "./logger.js";

const NODE_COMMON_PATHS = [
  process.env._,
  "/usr/local/bin/node",
  "/opt/local/bin/node",
];

class NodeDetector {
  static getNodeVersion() {
    const version = execSync("node -v");
    return version;
  }

  static getNodeInfo() {
    for (let path of NODE_COMMON_PATHS) {
      if (existsSync(path)) {
        printSuccess(
          `Node ${printLocation(this.getNodeVersion())} available at: ${printLocation(path)}`
        );
        return {
          name: "Node Version Check",
          success: true,
          optional: false,
        };
      }
    }
    printFail("Node binary could not be found in the expected locations");
    return {
      name: "Node Version Check",
      success: false,
      optional: false,
      message:
        "Node could not be found. Ensure it is installed via the Node website, a tool such as Homebrew, or an version manager like NVM",
    };
  }
}

export default NodeDetector;
