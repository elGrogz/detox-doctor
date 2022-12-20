import NodeDetector from "../utils/nodeChecker.js";
import AndroidToolsChecker from "../utils/androidToolsChecker.js";
import IosToolsChecker from "../utils/iosToolsChecker.js";
import NpmToolsChecker from "../utils/npmToolsChecker.js";
import { printCheckMessage } from "../utils/logger.js";
import OperatingSystemTools from "./operatingSystemTools.js";

class MacOsTools extends OperatingSystemTools {
  runMacOsCheck() {
    // MAIN SYSTEM CHECKS
    printCheckMessage("\nChecking Node installation");

    // Verify Node is installed
    this.runCheck(NodeDetector.getNodeVersion());

    // Verify Android setup
    printCheckMessage("\nChecking system setup for Android 🤖");

    this.runCheck(AndroidToolsChecker.checkAndroidStudioInstallion());
    this.runCheck(AndroidToolsChecker.checkJavaInstallation());
    this.runCheck(AndroidToolsChecker.checkPlatforms());
    this.runCheck(AndroidToolsChecker.checkCommandLineTools());
    this.runCheck(AndroidToolsChecker.checkCmakeInstallation());
    this.runCheck(AndroidToolsChecker.checkNdkInstallion());

    // ENV VARS CHECK
    printCheckMessage("\nChecking system environmental variables:");

    this.runCheck(AndroidToolsChecker.checkEnvironmentalVariables());

    // ANDROID TOOLS CHECK
    printCheckMessage("\nChecking Android tools are installed correctly:");

    this.runCheck(AndroidToolsChecker.checkSdkVersion());
    this.runCheck(AndroidToolsChecker.checkEmulatorVersion());
    this.runCheck(AndroidToolsChecker.checkAvdVersion());

    // IOS TOOLS CHECK
    printCheckMessage("\nChecking system setup for iOS ");

    this.runCheck(IosToolsChecker.checkXcodePath());
    this.runCheck(IosToolsChecker.checkAppleSimUtils());

    // NPM TOOLS CHECK
    printCheckMessage("\nChecking system setup for NPM Tools");
    this.runCheck(NpmToolsChecker.checkForDetoxCli());

    return this.completedChecks;
  }
}

export default MacOsTools;
