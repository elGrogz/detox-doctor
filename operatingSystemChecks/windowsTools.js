import OperatingSystemTools from "./operatingSystemTools.js";
import { printChecksComplete } from "../utils/logger.js";
import NodeDetector from "../utils/nodeChecker.js";
import AndroidToolsChecker from "../utils/androidToolsChecker.js";
import ChocolateyChecker from "../utils/chocolateyChecker.js";

class WindowsTools extends OperatingSystemTools {
  runWindowsCheck() {
    // Verify Node is installed
    NodeDetector.printNodeCheckBeginning();
    this.runCheck(NodeDetector.getNodeInfo());

    // Verify Chocolatey is installed
    ChocolateyChecker.checkStarting();
    this.runCheck(ChocolateyChecker.checkChocolateyInstallation());

    // Verify Android tools are installed
    AndroidToolsChecker.checkStarting();

    this.runCheck(AndroidToolsChecker.checkAndroidStudioInstallion());
    this.runCheck(AndroidToolsChecker.checkJavaInstallation());
    this.runCheck(AndroidToolsChecker.checkPlatforms());
    // this.runCheck(AndroidToolsChecker.checkCommandLineTools());
    // this.runCheck(AndroidToolsChecker.checkCmakeInstallation());
    // this.runCheck(AndroidToolsChecker.checkNdkInstallion());

    // Env vars check
    AndroidToolsChecker.envVarCheckStarting;
    this.runCheck(AndroidToolsChecker.checkAndroidHomeEnvVar());
    // this.runCheck(AndroidToolsChecker.checkAndroidEmulatorEnvVar());
    // this.runCheck(
    //   AndroidToolsChecker.checkAndroidSdkManagerEnvVar(shellFileContents)
    // );
    // this.runCheck(
    //   AndroidToolsChecker.checkAndroidPlatformToolsEnvVar(shellFileContents)
    // );
    // this.runCheck(
    //   AndroidToolsChecker.checkAndroidCommandLineToolsEnvVar(
    //     shellFileContents
    //   )
    // );

    printChecksComplete();

    return this.completedChecks;
  }
}

export default WindowsTools;
