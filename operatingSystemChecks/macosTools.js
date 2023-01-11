import NodeDetector from "../utils/nodeChecker.js";
import AndroidToolsChecker from "../utils/androidToolsChecker.js";
import IosToolsChecker from "../utils/iosToolsChecker.js";
import NpmToolsChecker from "../utils/npmToolsChecker.js";
import { printCheckMessage, printFail } from "../utils/logger.js";
import OperatingSystemTools from "./operatingSystemTools.js";
import fs from "fs";
import DebugToolsChecker from "../utils/debugToolsChecker.js";
import RubyChecker from "../utils/rubyChecker.js";
import chalk from "chalk";

class MacOsTools extends OperatingSystemTools {
  reportSystemInfo() {
    console.log(chalk.white.underline("\nSystem Info"));
    console.log(
      chalk.white(
        `Operating System: ${chalk.bold.bgBlue(this.operatingSystem)}`
      )
    );
    console.log(
      chalk.white(`Operating Platform: ${chalk.bold.bgBlue(this.platform)}`)
    );
    console.log(chalk.white(`Shell: ${chalk.bold.bgBlue(this.shell)}`));
  }

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

    let shellFileContents;

    if (
      process.env.SHELL === "/bin/zsh" &&
      fs.existsSync(`${process.env.HOME}/.zshrc`)
    ) {
      shellFileContents = fs.readFileSync(
        `${process.env.HOME}/.zshrc`,
        "utf-8"
      );
    } else if (
      process.env.SHELL === "/bin/bash" &&
      fs.existsSync(`${process.env.HOME}/.bashrc`)
    ) {
      shellFileContents = fs.readFileSync(
        `${process.env.HOME}/.bashrc`,
        "utf-8"
      );
    } else {
      printFail("Could not find valid zshrc or bashrc Shell file");
    }

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
      // this.runCheck(
      //   AndroidToolsChecker.checkAndroidPlatformToolsEnvVar(shellFileContents)
      // );
      this.runCheck(
        AndroidToolsChecker.checkAndroidCommandLineToolsEnvVar(
          shellFileContents
        )
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
