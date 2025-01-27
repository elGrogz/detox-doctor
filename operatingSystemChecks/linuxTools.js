import OperatingSystemTools from "./operatingSystemTools.js";
import NodeDetector from "../utils/nodeChecker.js";
import AndroidToolsChecker from "../utils/androidToolsChecker.js";
import ShellChecker from "../utils/shellChecker.js";

class LinuxTools extends OperatingSystemTools {
  runLinuxCheck() {
    // Verify Node is installed
    NodeDetector.checkStarting();
    this.runCheck(NodeDetector.getNodeInfo());

    // Verify Android tools
    AndroidToolsChecker.checkStarting();
    this.runCheck(AndroidToolsChecker.checkAndroidStudioInstallion());
    this.runCheck(AndroidToolsChecker.checkJavaInstallation());
    this.runCheck(AndroidToolsChecker.checkPlatforms());
    this.runCheck(AndroidToolsChecker.checkCommandLineTools());
    this.runCheck(AndroidToolsChecker.checkCmakeInstallation());
    this.runCheck(AndroidToolsChecker.checkNdkInstallion());
    this.runCheck(AndroidToolsChecker.checkSdkVersion());
    this.runCheck(AndroidToolsChecker.checkAdbVersion());
    this.runCheck(AndroidToolsChecker.checkEmulatorVersion());
    this.runCheck(AndroidToolsChecker.checkAvdVersion());

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
