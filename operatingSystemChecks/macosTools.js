import NodeDetector from "../utils/nodeChecker.js";
import AndroidToolsChecker from "../utils/androidToolsChecker.js";
import IosToolsChecker from "../utils/iosToolsChecker.js";
import NpmToolsChecker from "../utils/npmToolsChecker.js";
import { printCheckMessage } from "../utils/logger.js";
import OperatingSystemTools from "./operatingSystemTools.js";
import fs from "fs";
import DebugToolsChecker from "../utils/debugToolsChecker.js";
import RubyChecker from "../utils/rubyChecker.js";

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

    if (
      process.env.SHELL === "/bin/zsh" &&
      fs.existsSync(`${process.env.HOME}/.zshrc`)
    ) {
      const zshrcContents = fs.readFileSync(
        `${process.env.HOME}/.zshrc`,
        "utf-8"
      );

      this.runCheck(AndroidToolsChecker.checkJavaHomeEnvVar(zshrcContents));
      this.runCheck(AndroidToolsChecker.checkAndroidHomeEnvVar(zshrcContents));
      this.runCheck(
        AndroidToolsChecker.checkAndroidEmulatorEnvVar(zshrcContents)
      );
      this.runCheck(
        AndroidToolsChecker.checkAndroidSdkManagerEnvVar(zshrcContents)
      );
      // this.runCheck(
      //   AndroidToolsChecker.checkAndroidPlatformToolsEnvVar(zshrcContents)
      // );
      this.runCheck(
        AndroidToolsChecker.checkAndroidCommandLineToolsEnvVar(zshrcContents)
      );
    }

    // ANDROID TOOLS CHECK
    printCheckMessage("\nChecking Android tools are installed correctly:");

    this.runCheck(AndroidToolsChecker.checkSdkVersion());
    this.runCheck(AndroidToolsChecker.checkEmulatorVersion());
    this.runCheck(AndroidToolsChecker.checkAvdVersion());

    // IOS TOOLS CHECK
    printCheckMessage("\nChecking system setup for iOS ");

    this.runCheck(IosToolsChecker.checkXcodePath());
    this.runCheck(IosToolsChecker.checkAppleSimUtils());
    this.runCheck(RubyChecker.checkRubyInstallation());

    // NPM TOOLS CHECK
    printCheckMessage("\nChecking system setup for NPM Tools");
    this.runCheck(NpmToolsChecker.checkForDetoxCli());

    // FLIPPER CHECK
    printCheckMessage("\nChecking Flipper installation");
    this.runCheck(DebugToolsChecker.checkFlipperInstallation());

    return this.completedChecks;
  }
}

export default MacOsTools;
