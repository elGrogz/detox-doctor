import NodeDetector from "../utils/nodeChecker.js";
import AndroidToolsChecker from "../utils/androidToolsChecker.js";
import IosToolsChecker from "../utils/iosToolsChecker.js";
import NpmToolsChecker from "../utils/npmToolsChecker.js";
import { printChecksComplete } from "../utils/logger.js";
import OperatingSystemTools from "./operatingSystemTools.js";
import DebugToolsChecker from "../utils/debugToolsChecker.js";
import RubyChecker from "../utils/rubyChecker.js";
import ShellChecker from "../utils/shellChecker.js";
import BrewChecker from "../utils/brewChecker.js";
import PythonChecker from "../utils/pythonChecker.js";

class MacOsTools extends OperatingSystemTools {
  runMacOsCheck() {
    // Verify Node is installed
    NodeDetector.checkStarting();
    this.runCheck(NodeDetector.getNodeInfo());

    // Verify Brew is installed (optional)
    BrewChecker.checkStarting();
    this.runCheck(BrewChecker.checkBrewInstallation());

    // Verify Watchman is installed (optional)
    DebugToolsChecker.watchmanCheckStarting();
    this.runCheck(DebugToolsChecker.checkWatchmanInstallation());

    // IOS TOOLS CHECK
    if (!this.options.androidOnly) {
      IosToolsChecker.checkStarting();
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
    }

    // NPM TOOLS CHECK
    NpmToolsChecker.checkStarting();
    this.runCheck(NpmToolsChecker.checkForDetoxCli());

    // FLIPPER CHECK
    DebugToolsChecker.flipperCheckStarting();
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
