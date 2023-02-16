import OperatingSystemTools from "./operatingSystemTools.js";
import NodeDetector from "../utils/nodeChecker.js";
import AndroidToolsChecker from "../utils/androidToolsChecker.js";
import ShellChecker from "../utils/shellChecker.js";
import { printCheckMessage } from "../utils/logger.js";

class LinuxTools extends OperatingSystemTools {
  runLinuxCheck() {
    // MAIN SYSTEM CHECKS
    printCheckMessage("\nChecking Node installation 🟢");

    // Verify Node is installed
    this.runCheck(NodeDetector.getNodeInfo());

    // Env vars check
    printCheckMessage("\nChecking system environmental variables 📟");
    const shellFileContents = ShellChecker.getShellContents(this.shell);

    if (shellFileContents) {
      this.runCheck(
        AndroidToolsChecker.checkAndroidHomeEnvVar(shellFileContents)
      );
      this.runCheck(
        AndroidToolsChecker.checkAndroidEmulatorEnvVar(shellFileContents)
      );
      this.runCheck(
        AndroidToolsChecker.checkAndroidSdkManagerEnvVar(shellFileContents)
      );
      // this.runCheck(
      //   AndroidToolsChecker.checkAndroidPlatformToolsEnvVar(shellFileContents)
      // );
      this.runCheck(
        AndroidToolsChecker.checkAndroidCommandLineToolsEnvVar(
          shellFileContents
        )
      );
    }

    return this.completedChecks;
  }
}

export default LinuxTools;
