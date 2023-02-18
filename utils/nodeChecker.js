import { execSync } from "child_process";
import {
  printSuccess,
  printLocation,
  printFail,
  printCheckMessage,
} from "./logger.js";

class NodeDetector {
  static checkStarting() {
    printCheckMessage("\nChecking Node installation 🟢");
  }

  static getNodeInfo() {
    try {
      const nodeVersion = execSync("node -v").toString().replace("\n", "");
      const nodeLocation = execSync("which node").toString().replace("\n", "");

      printSuccess(`Node version: ${printLocation(nodeVersion)}`);
      printSuccess(`Node binary found at: ${printLocation(nodeLocation)}`);

      return {
        name: "Node Version Check",
        success: true,
        optional: false,
      };
    } catch (error) {
      printFail("Node binary could not be found in an expected location");
      return {
        name: "Node Version Check",
        success: false,
        optional: false,
        message:
          "Node could not be found. Ensure it is installed via the Node website, a tool such as Homebrew, or an version manager like NVM",
      };
    }
  }
}

export default NodeDetector;
