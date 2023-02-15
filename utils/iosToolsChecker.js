import { printSuccess, printLocation, printFail } from "./logger.js";
import { execSync } from "child_process";

class IosToolsChecker {
  static checkXcodePath() {
    try {
      const xcodePathResult = execSync("xcode-select -p");
      printSuccess(
        `Xcode Installed at: ${printLocation(
          xcodePathResult.toString().replace(/[\r\n]/gm, "")
        )}`
      );

      return {
        name: "iOS Xcode Check",
        success: true,
        optional: false,
        message: "",
      };
    } catch (error) {
      printFail(`Could not find Xcode installation: ${error}`);

      return {
        name: "iOS Xcode Check",
        success: false,
        optional: false,
        message:
          "Xcode is required to run Detox iOS tests. Install it via the Xcode website or the Apple app store",
      };
    }
  }

  static checkAppleSimUtils() {
    try {
      const appleSimUtilsPath = execSync("which applesimutils")
        .toString()
        .replace(/[\r\n]/gm, ""); // change to -v
      printSuccess(
        `applesimutils installed at: ${printLocation(appleSimUtilsPath)}`
      );

      return {
        name: "iOS applesimutils Check",
        success: true,
        optional: false,
      };
    } catch (error) {
      printFail(`Could not find applesimutils installation: ${error}`);

      return {
        name: "iOS applesimutils Check",
        success: false,
        optional: false,
        message: `applesimutils is required by Detox to run iOS tests. Run ${printLocation(
          "brew tap wix/brew; brew install applesimutils"
        )} to install`,
      };
    }
  }

  static checkXcrunVersion() {
    try {
      const xcrunVersion = execSync("xcrun --version").toString().match(/\d+/g);

      printSuccess(`xcrun version ${printLocation(xcrunVersion[0])} installed`);

      return {
        name: "iOS xcrun Check",
        success: true,
        optional: false,
      };
    } catch (error) {
      printFail(`Could not find xcrun installation: ${error.toString()}`);

      return {
        name: "iOS applesimutils Check",
        success: false,
        optional: false,
        message: `xcrun is a tool that helps manage Xcode versions and tools. You can download it with ${printLocation(
          "xcode-select --install"
        )}`,
      };
    }
  }

  static getIosSdkPath() {
    try {
      const sdkPath = execSync("xcrun --show-sdk-path")
        .toString()
        .replace("\n", "");

      printSuccess(`iOS SDK installed at: ${printLocation(sdkPath)}`);

      return {
        name: "iOS SDK Path",
        success: true,
        optional: false,
      };
    } catch (error) {
      printFail(`Could not find iOS SDK path: ${error.toString()}`);

      return {
        name: "iOS SDK Path",
        success: false,
        optional: false,
        message: `The iOS SDK path should be set`,
      };
    }
  }

  static getIosSdkVersion() {
    try {
      const sdkPath = execSync("xcrun --show-sdk-version")
        .toString()
        .replace("\n", "");

      printSuccess(`iOS SDK version: ${printLocation(sdkPath)}`);

      return {
        name: "iOS SDK Version",
        success: true,
        optional: false,
      };
    } catch (error) {
      printFail(`Could not find iOS SDK Version: ${error.toString()}`);

      return {
        name: "iOS SDK Version",
        success: false,
        optional: false,
        message: `The iOS SDK should be installed`,
      };
    }
  }

  static getIosSdkVersion() {
    try {
      const sdkVersion = execSync("xcrun --show-sdk-version")
        .toString()
        .replace("\n", "");

      printSuccess(`iOS SDK version: ${printLocation(sdkVersion)}`);

      return {
        name: "iOS SDK Version",
        success: true,
        optional: false,
      };
    } catch (error) {
      printFail(`Could not find iOS SDK Version: ${error.toString()}`);

      return {
        name: "iOS SDK Version",
        success: false,
        optional: false,
        message: `The iOS SDK should be installed`,
      };
    }
  }

  static getIosSdkPlatformPath() {
    try {
      const sdkPlatformPath = execSync("xcrun --show-sdk-platform-path")
        .toString()
        .replace("\n", "");

      printSuccess(`iOS SDK Platform path: ${printLocation(sdkPlatformPath)}`);

      return {
        name: "iOS SDK Platform Path",
        success: true,
        optional: false,
      };
    } catch (error) {
      printFail(`Could not find iOS SDK Platform Path: ${error.toString()}`);

      return {
        name: "iOS SDK Version",
        success: false,
        optional: false,
        message: `The iOS SDK Path should be set`,
      };
    }
  }

  static getIosSdkPlatformVersion() {
    try {
      const sdkPlatformVersion = execSync("xcrun --show-sdk-platform-version")
        .toString()
        .replace("\n", "");

      printSuccess(
        `iOS SDK Platform version: ${printLocation(sdkPlatformVersion)}`
      );

      return {
        name: "iOS SDK Platform Version",
        success: true,
        optional: false,
      };
    } catch (error) {
      printFail(`Could not find iOS SDK Platform Path: ${error.toString()}`);

      return {
        name: "iOS SDK Platform Version",
        success: false,
        optional: false,
        message: `The iOS SDK Platform should be installed`,
      };
    }
  }

  // TODO: display what simulators and iOS versions are installed
}

export default IosToolsChecker;
