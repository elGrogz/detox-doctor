import NodeDetector from "../utils/nodeChecker.js";
import AndroidToolsChecker from "../utils/androidToolsChecker.js";
import IosToolsChecker from "../utils/iosToolsChecker.js";
import NpmToolsChecker from "../utils/npmToolsChecker.js";
import { printCheckMessage, printChecksComplete } from "../utils/logger.js";
import OperatingSystemTools from "./operatingSystemTools.js";
import DebugToolsChecker from "../utils/debugToolsChecker.js";
import RubyChecker from "../utils/rubyChecker.js";
import ShellChecker from "../utils/shellChecker.js";
import BrewChecker from "../utils/brewChecker.js";
import PythonChecker from "../utils/pythonChecker.js";

class MacOsTools extends OperatingSystemTools {
  runMacOsCheck() {
    // Verify Node is installed
    NodeDetector.printNodeCheckBeginning();
    this.runCheck(NodeDetector.getNodeInfo());

    // Verify Brew is installed (optional)
    printCheckMessage("\nChecking Homebrew installation 🍺");
    this.runCheck(BrewChecker.checkBrewInstallation());

    // Verify Watchman is installed (optional)
    printCheckMessage("\nChecking Watchman installation 👁️");
    this.runCheck(DebugToolsChecker.checkWatchmanInstallation());

    // IOS TOOLS CHECK
    if (!this.options.androidOnly) {
      printCheckMessage("\nChecking system setup for iOS ");

      this.runCheck(IosToolsChecker.checkXcodePath());
      this.runCheck(IosToolsChecker.checkXcrunVersion());
      this.runCheck(IosToolsChecker.getIosSdkPath());
      this.runCheck(IosToolsChecker.getIosSdkVersion());
      this.runCheck(IosToolsChecker.getIosSdkPlatformPath());
      this.runCheck(IosToolsChecker.getIosSdkPlatformVersion());
      this.runCheck(IosToolsChecker.checkAppleSimUtils());
      this.runCheck(RubyChecker.checkRubyInstallation());
    }

    // Verify Android setup - run only if Android Only is true or no other 'only' flags are passed
    if (!this.options.iosOnly) {
      printCheckMessage("\nChecking system setup for Android 🤖");

      this.runCheck(AndroidToolsChecker.checkAndroidStudioInstallion());
      this.runCheck(AndroidToolsChecker.checkJavaInstallation());
      this.runCheck(AndroidToolsChecker.checkPlatforms());
      this.runCheck(AndroidToolsChecker.checkCommandLineTools());
      this.runCheck(AndroidToolsChecker.checkCmakeInstallation());
      this.runCheck(AndroidToolsChecker.checkNdkInstallion());

      // Env vars check
      printCheckMessage("\nChecking system environmental variables 📟");
      const shellFileContents = ShellChecker.getShellContents(this.shell);

      if (shellFileContents) {
        this.runCheck(
          AndroidToolsChecker.checkJavaHomeEnvVar(shellFileContents)
        );
        this.runCheck(AndroidToolsChecker.checkAndroidHomeEnvVar());
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

      // ANDROID TOOLS CHECK
      printCheckMessage("\nChecking Android tools are installed correctly 🤖");

      this.runCheck(AndroidToolsChecker.checkSdkVersion());
      this.runCheck(AndroidToolsChecker.checkAdbVersion());
      this.runCheck(AndroidToolsChecker.checkEmulatorVersion());
      this.runCheck(AndroidToolsChecker.checkAvdVersion());
    }

    // NPM TOOLS CHECK
    printCheckMessage("\nChecking system setup for NPM Tools 🧰");
    this.runCheck(NpmToolsChecker.checkForDetoxCli());

    // FLIPPER CHECK
    printCheckMessage("\nChecking Flipper installation 🐬");
    this.runCheck(DebugToolsChecker.checkFlipperInstallation());
    if (!this.options.androidOnly) {
      this.runCheck(PythonChecker.checkPython3Installation());
      this.runCheck(PythonChecker.checkPip3Installation());
      this.runCheck(DebugToolsChecker.checkIdbInstallation());
    }

    printChecksComplete();

    return this.completedChecks;
  }
}

export default MacOsTools;
