import OperatingSystemTools from "./operatingSystemTools.js";
import NodeDetector from "../utils/nodeChecker.js";
import AndroidToolsChecker from "../utils/androidToolsChecker.js";
import ShellChecker from "../utils/shellChecker.js";

class LinuxTools extends OperatingSystemTools {
  runLinuxCheck() {
    // Verify Node is installed
    NodeDetector.printNodeCheckBeginning();
    this.runCheck(NodeDetector.getNodeInfo());

    // Verify Android tools
    AndroidToolsChecker.checkStarting();

    // Env vars check
    AndroidToolsChecker.envVarCheckStarting();
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
