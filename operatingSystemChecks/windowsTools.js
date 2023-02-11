import OperatingSystemTools from "./operatingSystemTools.js";
import { printCheckMessage, printChecksComplete } from "../utils/logger.js";
import NodeDetector from "../utils/nodeChecker.js";
import AndroidToolsChecker from "../utils/androidToolsChecker.js";
import ShellChecker from "../utils/shellChecker.js";
import ChocolateyChecker from "../utils/chocolateyChecker.js";

class WindowsTools extends OperatingSystemTools {
  runWindowsCheck() {
    // Verify Node is installed
    printCheckMessage("\nChecking Node installation 🟢");
    this.runCheck(NodeDetector.getNodeInfo());

    // Verify Chocolatey is installed
    printCheckMessage("\nChecking Chcocolatey installation 🍫");
    this.runCheck(ChocolateyChecker.checkChocolateyInstallation());

    // Verify Android tools are installed
    printCheckMessage("\nChecking system setup for Android 🤖");

    this.runCheck(AndroidToolsChecker.checkAndroidStudioInstallion());
    // this.runCheck(AndroidToolsChecker.checkJavaInstallation());
    // this.runCheck(AndroidToolsChecker.checkPlatforms());
    // this.runCheck(AndroidToolsChecker.checkCommandLineTools());
    // this.runCheck(AndroidToolsChecker.checkCmakeInstallation());
    // this.runCheck(AndroidToolsChecker.checkNdkInstallion());

    // Env vars check
    printCheckMessage("\nChecking system environmental variables 💻");
    const shellFileContents = ShellChecker.getShellContents(this.shell);

    if (shellFileContents) {
      this.runCheck(AndroidToolsChecker.checkJavaHomeEnvVar(shellFileContents));
      this.runCheck(
        AndroidToolsChecker.checkAndroidHomeEnvVar(shellFileContents)
      );
      this.runCheck(
        AndroidToolsChecker.checkAndroidEmulatorEnvVar(shellFileContents)
      );
      this.runCheck(
        AndroidToolsChecker.checkAndroidSdkManagerEnvVar(shellFileContents)
      );
      this.runCheck(
        AndroidToolsChecker.checkAndroidPlatformToolsEnvVar(shellFileContents)
      );
      this.runCheck(
        AndroidToolsChecker.checkAndroidCommandLineToolsEnvVar(
          shellFileContents
        )
      );
    }

    printChecksComplete();

    return this.completedChecks;
  }
}

export default WindowsTools;
