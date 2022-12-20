import fs from "fs";
import { execSync } from "child_process";
import {
  printLocation,
  printSuccess,
  printFail,
  printWarning,
} from "./logger.js";

const androidStudioAppLocation = "/Applications/Android Studio.app";
const javahomeEnvVariable = "export JAVA_HOME=`/usr/libexec/java_home`";
const androidHomeEnvVariable = "ANDROID_HOME=$HOME/Library/Android/sdk";
const androidEmulatorVariable = "$ANDROID_HOME/emulator";
const androidSdkManagerVariable = "$ANDROID_HOME/tools/bin/sdkmanager";
const androidPlatformToolsVariable = "$ANDROID_HOME/platform-tools";
const androidCommandLineToolsVariable =
  "$ANDROID_HOME/cmdline-tools/latest/bin";
const cmakeDirectory = `${process.env.ANDROID_HOME}/cmake`;
const ndkDirectory = `${process.env.ANDROID_HOME}/ndk`;
const commandLineToolsDirectory = `${process.env.ANDROID_HOME}/cmdline-tools/latest/bin`;
const platformsDirectory = `${process.env.ANDROID_HOME}/platforms`;

const shell = process.env.SHELL;

class AndroidToolsChecker {
  static checkAndroidStudioInstallion() {
    if (fs.existsSync(androidStudioAppLocation)) {
      printSuccess(
        `Android Studio installed at: ${printLocation(
          androidStudioAppLocation
        )}`
      );

      return {
        name: "Android Studio Check",
        success: true,
        optional: false,
        message: "",
      };
    } else {
      printFail("Android Studio not installed");

      return {
        name: "Android Studio Check",
        success: false,
        optional: false,
        message: "",
      };
    }
  }

  static checkJavaInstallation() {
    try {
      let response = execSync("java --version");
      printSuccess(
        `Java version: ${response.toString().replace("\n", "\n\t\t\t")}`
      );

      return {
        name: "Java Installation Check",
        success: true,
        optional: false,
        message: "",
      };
    } catch (error) {
      printFail(`Could not get java version: ${error}`);

      return {
        name: "Java Installation Check",
        success: false,
        optional: false,
        message: "",
      };
    }
  }

  static checkCmakeInstallation() {
    if (fs.existsSync(cmakeDirectory)) {
      const cmakeVersions = fs
        .readdirSync(cmakeDirectory, { withFileTypes: true })
        .filter((item) => {
          item.isDirectory();
          return item;
        })
        .map((directory) => directory.name);

      printSuccess(
        `Cmake versions available at: ${printLocation(
          cmakeDirectory
        )}\n\t\t\tAvailable CMake versions: ${cmakeVersions.toString()}`
      );

      return {
        name: "CMake Check",
        success: true,
        optional: false,
        message: "",
      };
    } else {
      printFail(`Cmake not installed`);

      return {
        name: "CMake Check",
        success: false,
        optional: false,
        message: "",
      };
    }
  }

  static checkNdkInstallion() {
    if (fs.existsSync(ndkDirectory)) {
      const ndkVersions = fs
        .readdirSync(ndkDirectory, { withFileTypes: true })
        .filter((item) => {
          item.isDirectory();
          return item;
        })
        .map((directory) => directory.name);

      printSuccess(
        `NDK versions available at: ${printLocation(
          ndkDirectory
        )}\n\t\t\tAvailable NDK versions: ${ndkVersions.toString()}`
      );
    } else {
      printFail(`NDK not installed`);

      return {
        name: "NDK Check",
        success: false,
        optional: false,
        message: "",
      };
    }
  }

  static checkEnvironmentalVariables() {
    if (shell === "/bin/zsh" && fs.existsSync(`${process.env.HOME}/.zshrc`)) {
      const zshrcContents = fs.readFileSync(
        `${process.env.HOME}/.zshrc`,
        "utf-8"
      );

      if (zshrcContents.includes(javahomeEnvVariable)) {
        printSuccess(
          `Shell profile contains Javahome: ${printLocation(
            javahomeEnvVariable
          )}`
        );
      } else {
        printWarning(
          `⚠️ Shell profile does not contain JAVA_HOME variable: ${printLocation(
            javahomeEnvVariable
          )} - Your Android SDK environment may not be configured properly`
        );
      }

      if (zshrcContents.includes(androidHomeEnvVariable)) {
        printSuccess(
          `Shell profile contains Android Home: ${printLocation(
            androidHomeEnvVariable
          )}`
        );
      } else {
        printWarning(
          `⚠️ Shell profile does not contain the ANDROID_HOME variable: ${printLocation(
            androidHomeEnvVariable
          )} - Your Android SDK environment may not be configured properly`
        );
      }

      if (zshrcContents.includes(androidEmulatorVariable)) {
        printSuccess(
          `Shell profile contains Android Emulator variable: ${printLocation(
            androidEmulatorVariable
          )}`
        );
      } else {
        printWarning(
          `⚠️ Shell profile does not contain the Android Emulator variable: ${printLocation(
            androidEmulatorVariable
          )} - Your Android SDK environment may not be configured properly`
        );
      }

      if (zshrcContents.includes(androidSdkManagerVariable)) {
        printSuccess(
          `Shell profile contains Android SDK Manager variable: ${printLocation(
            androidSdkManagerVariable
          )}`
        );
      } else {
        printWarning(
          `⚠️ Shell profile does not contain the Android SDK Manager variable: ${printLocation(
            androidSdkManagerVariable
          )} - Your Android SDK environment may not be configured properly`
        );
      }

      if (zshrcContents.includes(androidPlatformToolsVariable)) {
        printSuccess(
          `Shell profile contains Android Platform Tools Variable: ${printLocation(
            androidPlatformToolsVariable
          )}`
        );
      } else {
        printWarning(
          `Shell profile does not contain the Android Platform Tools variable: ${printLocation(
            androidPlatformToolsVariable
          )} - Your Android SDK environment may not be configured properly`
        );
      }

      if (zshrcContents.includes(androidCommandLineToolsVariable)) {
        printSuccess(
          `Shell profile contains Android Command Line Tools Variable: ${printLocation(
            androidCommandLineToolsVariable
          )}`
        );
      } else {
        printWarning(
          `Shell profile does not contain Android Command Line Tools Variable: ${printLocation(
            androidCommandLineToolsVariable
          )}`
        );
      }
    } else {
      console.log("Unexpected shell");
    }
  }

  static checkCommandLineTools() {
    if (fs.existsSync(commandLineToolsDirectory)) {
      const cmdlineToolsVersions = fs
        .readdirSync(commandLineToolsDirectory, { withFileTypes: true })
        .filter((item) => {
          item.isDirectory();
          return item;
        })
        .map((directory) => directory.name);

      printSuccess(
        `Command Line tools available at: ${printLocation(
          commandLineToolsDirectory
        )}\n\t\t\tAvailable Command line tools: ${cmdlineToolsVersions.toString()}`
      );
    } else {
      printFail("Command Line tools not installed");

      return {
        name: "Android Command Line Tools Check",
        success: false,
        optional: true,
        message: "",
      };
    }
  }

  static checkPlatforms() {
    if (fs.existsSync(platformsDirectory)) {
      const platforms = fs
        .readdirSync(platformsDirectory, { withFileTypes: true })
        .filter((item) => {
          item.isDirectory();
          return item;
        })
        .map((directory) => directory.name);

      printSuccess(
        `Platforms available at: ${printLocation(
          platformsDirectory
        )}\n\t\t\tAvailable Platforms: ${platforms.toString()}`
      );
    } else {
      printFail("Platforms not available");

      return {
        name: "Android Platforms Check",
        success: false,
        optional: false,
        message: "",
      };
    }
  }

  static checkSdkVersion() {
    try {
      const sdkResult = execSync("sdkmanager --version");
      printSuccess(
        `SDK Manager version: ${sdkResult.toString().replace(/[\r\n]/gm, "")}` // \r is a windows line break, \n is a UNIX one
      );
    } catch (error) {
      printFail(`Could not get SDK Manager version: ${error}`);

      return {
        name: "Android SDK Check",
        success: false,
        optional: false,
        message: "",
      };
    }
  }

  static checkEmulatorVersion() {
    try {
      const emulatorResult = execSync("emulator -version");
      const emulatorString = emulatorResult.toString();
      const regex = /Android emulator version(.*)/;
      const regexResult = regex.exec(emulatorString);
      printSuccess(regexResult[0]);
    } catch (error) {
      printFail(`Could not get Emulator version: ${error}`);

      return {
        name: "Android Emulator Check",
        success: false,
        optional: false,
        message: "",
      };
    }
  }

  static checkAvdVersion() {
    try {
      const avdResult = execSync("avdmanager list avd");
      const avdString = avdResult.toString();
      const regex = /Name:(.*)/g;
      const regexResult = avdString.match(regex);
      const strippedResult = regexResult.map((result) =>
        result.replace(/Name: /, " ")
      );
      printSuccess(`AVDs available: ${strippedResult}`);
    } catch (error) {
      printFail(`Could not get AVDs: ${error}`);

      return {
        name: "Android AVD Check",
        success: false,
        optional: false,
        message: "",
      };
    }
  }
}

export default AndroidToolsChecker;
