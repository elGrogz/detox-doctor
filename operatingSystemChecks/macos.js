import NodeDetector from "../utils/nodeChecker.js";
import AndroidToolsChecker from "../utils/androidToolsChecker.js";
import IosToolsChecker from "../utils/iosToolsChecker.js";
import NpmToolsChecker from "../utils/npmToolsChecker.js";
import { printCheckMessage } from "../utils/logger.js";

const macOsCheck = () => {
  // MAIN SYSTEM CHECKS
  printCheckMessage("\nChecking Node installation");

  // Verify Node is installed
  NodeDetector.getNodeVersion();

  // Verify Android setup
  printCheckMessage("\nChecking system setup for Android 🤖");

  AndroidToolsChecker.checkAndroidStudioInstallion();
  AndroidToolsChecker.checkJavaInstallation();
  AndroidToolsChecker.checkPlatforms();
  AndroidToolsChecker.checkCommandLineTools();
  AndroidToolsChecker.checkCmakeInstallation();
  AndroidToolsChecker.checkNdkInstallion();

  // ENV VARS CHECK
  printCheckMessage("\nChecking system environmental variables:");

  AndroidToolsChecker.checkEnvironmentalVariables();

  // ANDROID TOOLS CHECK
  printCheckMessage("\nChecking Android tools are installed correctly:");

  AndroidToolsChecker.checkSdkVersion();
  AndroidToolsChecker.checkEmulatorVersion();
  AndroidToolsChecker.checkAvdVersion();

  // Verify iOS system setup
  printCheckMessage("\nChecking system setup for iOS ");

  IosToolsChecker.checkXcodePath();
  IosToolsChecker.checkAppleSimUtils();

  // Verify NPM tools setup
  printCheckMessage("\nChecking system setup for NPM Tools");
  NpmToolsChecker.checkForDetoxCli();
};

export default macOsCheck;
