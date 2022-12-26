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
const androidSdkRootEnvVariable = "ANDROID_SDK_ROOT=$HOME/Library/Android/sdk";
const androidEmulatorVariable = "$ANDROID_HOME/emulator";
const androidSdkManagerVariable = "$ANDROID_HOME/tools/bin/sdkmanager";
const androidPlatformToolsVariable = "$ANDROID_HOME/platform-tools";
const androidCommandLineToolsVariable =
  "$ANDROID_HOME/cmdline-tools/latest/bin";
const cmakeDirectory = `${process.env.ANDROID_HOME}/cmake`;
const ndkDirectory = `${process.env.ANDROID_HOME}/ndk`;
const commandLineToolsDirectory = `${process.env.ANDROID_HOME}/cmdline-tools/latest/bin`;
const platformsDirectory = `${process.env.ANDROID_HOME}/platforms`;

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
        message: `Android Studio is required to run Detox tests on Android. Download at the Android website or run ${printLocation(
          "brew install --cask android-studio"
        )}`,
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
        message: `Java v11 and the Java JDK are required to run Detox tests on Android. Run ${printLocation(
          `brew tap homebrew/cask-versions\nbrew install --cask zulu11`
        )}`,
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
        optional: true,
        message: "",
      };
    } else {
      printFail(`Cmake not installed`);

      return {
        name: "CMake Check",
        success: false,
        optional: true,
        message: `CMake may required to run Detox tests on Android, depending on your app. Install via Android Studio > SDK Manager > Tools`,
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

      return {
        name: "NDK Check",
        success: true,
        optional: false,
        message: "",
      };
    } else {
      printFail(`NDK not installed`);

      return {
        name: "NDK Check",
        success: false,
        optional: false,
        message: `The Android NDK is required to run Detox tests on Android, depending on your app. Install via Android Studio > SDK Manager > Tools`,
      };
    }
  }

  static checkJavaHomeEnvVar(zshrcContents) {
    if (zshrcContents.includes(javahomeEnvVariable)) {
      printSuccess(
        `Shell profile contains Javahome: ${printLocation(javahomeEnvVariable)}`
      );

      return {
        name: "JAVAHOME environmental variable check",
        success: true,
        optional: false,
        message: "",
      };
    } else {
      printWarning(
        `⚠️ Shell profile does not contain JAVA_HOME variable: ${printLocation(
          javahomeEnvVariable
        )} - Your Android SDK environment may not be configured properly`
      );
      return {
        name: "JAVA_HOME environmental variable check",
        success: false,
        optional: false,
        message: `The ${printLocation(
          JAVA_HOME
        )} environmental variable is required to run Detox tests on Android.\nSet it in your shell profile file`,
      };
    }
  }

  static checkAndroidHomeEnvVar(zshrcContents) {
    // check SDK root too
    if (zshrcContents.includes(androidHomeEnvVariable)) {
      printSuccess(
        `Shell profile contains Android Home: ${printLocation(
          androidHomeEnvVariable
        )}`
      );
      return {
        name: "ANDROID_HOME environmental variable check",
        success: true,
        optional: false,
        message: "",
      };
    } else if (zshrcContents.includes(androidHomeEnvVariable)) {
      printWarning(
        `Shell profile contains Android SDK Root: ${printLocation(
          androidSdkRootEnvVariable
        )}. This is deprecated in favour of ${printLocation(
          "ANDROID_HOME"
        )}. Consider replacing the ${printLocation(
          "ANDROID_SDK_ROOT"
        )} environmental variable`
      );

      return {
        name: "ANDROID_HOME environmental variable check",
        success: false,
        optional: true,
        message: `Shell profile contains Android SDK Root: ${printLocation(
          androidSdkRootEnvVariable
        )}. This is deprecated in favour of ${printLocation(
          "ANDROID_HOME"
        )}. Consider replacing the ${printLocation(
          "ANDROID_SDK_ROOT"
        )} environmental variable`,
      };
    } else {
      printWarning(
        `⚠️ Shell profile does not contain the ANDROID_HOME variable: ${printLocation(
          androidHomeEnvVariable
        )} - Your Android SDK environment may not be configured properly`
      );

      return {
        name: "ANDROID_HOME environmental variable check",
        success: false,
        optional: false,
        message: `The ${printLocation(
          "ANDROID_HOME"
        )} environmental variable is required to run Detox tests on Android.\nSet it in your shell profile file`,
      };
    }
  }

  static checkAndroidEmulatorEnvVar(zshrcContents) {
    if (zshrcContents.includes(androidEmulatorVariable)) {
      printSuccess(
        `Shell profile contains Android Emulator variable: ${printLocation(
          androidEmulatorVariable
        )}`
      );
      return {
        name: "EMULATOR environmental variable check",
        success: true,
        optional: false,
        message: "",
      };
    } else {
      printWarning(
        `⚠️ Shell profile does not contain the Android Emulator variable: ${printLocation(
          androidEmulatorVariable
        )} - Your Android SDK environment may not be configured properly`
      );
      return {
        name: "EMULATOR environmental variable check",
        success: false,
        optional: false,
        message: "",
      };
    }
  }

  static checkAndroidSdkManagerEnvVar(zshrcContents) {
    if (zshrcContents.includes(androidSdkManagerVariable)) {
      printSuccess(
        `Shell profile contains Android SDK Manager variable: ${printLocation(
          androidSdkManagerVariable
        )}`
      );
      return {
        name: "ANDROID_SDK_MANAGER environmental variable check",
        success: true,
        optional: false,
        message: "",
      };
    } else {
      printWarning(
        `⚠️ Shell profile does not contain the Android SDK Manager variable: ${printLocation(
          androidSdkManagerVariable
        )} - Your Android SDK environment may not be configured properly`
      );
      return {
        name: "ANDROID_SDK_MANAGER environmental variable check",
        success: false,
        optional: false,
        message: "",
      };
    }
  }

  static checkAndroidPlatformToolsEnvVar(zshrcContents) {
    if (zshrcContents.includes(androidPlatformToolsVariable)) {
      printSuccess(
        `Shell profile contains Android Platform Tools Variable: ${printLocation(
          androidPlatformToolsVariable
        )}`
      );
      return {
        name: "ANDROID_PLATFORM environmental variable check",
        success: true,
        optional: false,
        message: "",
      };
    } else {
      printWarning(
        `Shell profile does not contain the Android Platform Tools variable: ${printLocation(
          androidPlatformToolsVariable
        )} - Your Android SDK environment may not be configured properly`
      );
      return {
        name: "ANDROID_PLATFORM environmental variable check",
        success: false,
        optional: false,
        message: "",
      };
    }
  }

  static checkAndroidCommandLineToolsEnvVar(zshrcContents) {
    if (zshrcContents.includes(androidCommandLineToolsVariable)) {
      printSuccess(
        `Shell profile contains Android Command Line Tools Variable: ${printLocation(
          androidCommandLineToolsVariable
        )}`
      );
      return {
        name: "ANDROID_COMMAND_LINE_TOOLS environmental variable check",
        success: true,
        optional: true,
        message: "",
      };
    } else {
      printWarning(
        `Shell profile does not contain Android Command Line Tools Variable: ${printLocation(
          androidCommandLineToolsVariable
        )}`
      );
      return {
        name: "ANDROID_COMMAND_LINE_TOOLS environmental variable check",
        success: false,
        optional: true,
        message: "",
      };
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

      return {
        name: "Android Command Line Tools Check",
        success: true,
        optional: true,
        message: "",
      };
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
      return {
        name: "Android Platforms Check",
        success: true,
        optional: false,
        message: "",
      };
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

      return {
        name: "Android SDK Check",
        success: true,
        optional: false,
        message: "",
      };
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
      return {
        name: "Android Emulator Check",
        success: true,
        optional: false,
        message: "",
      };
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

      return {
        name: "Android AVD Check",
        success: true,
        optional: false,
        message: "",
      };
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
