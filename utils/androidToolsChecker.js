import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import {
  printLocation,
  printSuccess,
  printFail,
  printWarning,
} from "./logger.js";

const commonMacosAndroidStudioAppLocation = path.join(
  "Applications",
  "Android Studio.app"
);
const commonWindowsAndroidStudioAppLocation = path.join(
  "C:",
  "Program Files",
  "Android",
  "Android Studio",
  "bin",
  "studio64.exe"
);
// const commonLinuxAndroidStudioAppLocation = "/Applications/Android Studio.app";
const javahomeEnvVariable = "JAVA_HOME";
const androidHomeEnvVariable = "ANDROID_HOME";
const androidSdkRootEnvVariable = "ANDROID_SDK_ROOT";
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
    // add logic for linux
    if (fs.existsSync(commonMacosAndroidStudioAppLocation)) {
      printSuccess(
        `Android Studio installed at: ${printLocation(
          commonMacosAndroidStudioAppLocation
        )}`
      );

      return {
        name: "Android Studio Check",
        success: true,
        optional: false,
      };
    } else if (fs.existsSync(commonWindowsAndroidStudioAppLocation)) {
      printSuccess(
        `Android Studio installed at: ${printLocation(
          commonWindowsAndroidStudioAppLocation
        )}`
      );

      return {
        name: "Android Studio Check",
        success: true,
        optional: false,
      };
    } else {
      printFail("Android Studio not installed");

      return {
        name: "Android Studio Check",
        success: false,
        optional: false,
        message: `Android Studio is required to run Detox tests on Android. Download at the Android website or run ${printLocation(
          "brew install --cask android-studio"
        )} if you are on MacOS`,
      };
    }
  }

  static checkJavaInstallation() {
    try {
      let response = execSync("java --version");
      printSuccess(
        `Java version: ${printLocation(
          response
            .toString()
            .replace(/[\r\n]/gm, ", ")
            .slice(-0, -2)
        )}`
      );

      return {
        name: "Java Installation Check",
        success: true,
        optional: false,
      };
    } catch (error) {
      printFail(`Could not get java version: ${error}`);

      // have different messages depending on OS
      return {
        name: "Java Installation Check",
        success: false,
        optional: false,
        message: `Java v11 and the Java JDK are required to run Detox tests on Android. On macOs run ${printLocation(
          `brew tap homebrew/cask-versions\nbrew install --cask zulu11`
        )}. \nOn Windows run: ${printLocation(
          `choco install -y nodejs-lts microsoft-openjdk11`
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
        )}\nAvailable CMake versions: ${printLocation(
          cmakeVersions.toString()
        )}\n`
      );

      return {
        name: "CMake Check",
        success: true,
        optional: true,
      };
    } else {
      printWarning(`Cmake not installed`);

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
        )}\nAvailable NDK versions: ${printLocation(ndkVersions.toString())}`
      );

      return {
        name: "NDK Check",
        success: true,
        optional: true,
      };
    } else {
      printWarning(`NDK not installed`);

      return {
        name: "NDK Check",
        success: false,
        optional: true,
        message: `The Android NDK is required to run Detox tests on Android, depending on your app. Install via Android Studio > SDK Manager > Tools`,
      };
    }
  }

  // TODO: replace zshrc contents stuff
  static checkJavaHomeEnvVar(zshrcContents) {
    if (zshrcContents.includes(javahomeEnvVariable)) {
      printSuccess(
        `Shell profile contains Javahome: ${printLocation(javahomeEnvVariable)}`
      );

      return {
        name: "JAVAHOME environmental variable check",
        success: true,
        optional: false,
      };
    } else {
      printWarning(
        `Shell profile does not contain JAVA_HOME variable: ${printLocation(
          javahomeEnvVariable
        )} - Your Android SDK environment may not be configured properly`
      );
      return {
        name: "JAVA_HOME environmental variable check",
        success: false,
        optional: false,
        message: `The ${printLocation(
          "JAVA_HOME"
        )} environmental variable is required to run Detox tests on Android.\nSet it in your shell profile file`,
      };
    }
  }

  // static checkAndroidHomeEnvVar(zshrcContents) {
  //   if (zshrcContents.includes(androidHomeEnvVariable)) {
  //     printSuccess(
  //       `Shell profile contains Android Home variable: ${printLocation(
  //         androidHomeEnvVariable
  //       )}`
  //     );
  //     return {
  //       name: "ANDROID_HOME environmental variable check",
  //       success: true,
  //       optional: false,
  //     };
  //   } else if (zshrcContents.includes(androidSdkRootEnvVariable)) {
  //     printWarning(
  //       `Shell profile contains ${printLocation(
  //         androidSdkRootEnvVariable
  //       )} environmental variable`
  //     );

  //     return {
  //       name: "Shell profile environmental variable check",
  //       success: false,
  //       optional: true,
  //       message: `Shell profile contains ${printLocation(
  //         androidSdkRootEnvVariable
  //       )} environmental variable. This is deprecated in favour of ${printLocation(
  //         "ANDROID_HOME"
  //       )}. Consider replacing the ${printLocation(
  //         "ANDROID_SDK_ROOT"
  //       )} environmental variable with this.`,
  //     };
  //   } else {
  //     printFail(
  //       `Shell profile does not contain the ${printLocation(
  //         androidHomeEnvVariable
  //       )} variable`
  //     );

  //     return {
  //       name: "ANDROID_HOME environmental variable check",
  //       success: false,
  //       optional: false,
  //       message: `The ${printLocation(
  //         androidHomeEnvVariable
  //       )} environmental variable is required to run Detox tests on Android.\nSet it in your shell profile file`,
  //     };
  //   }
  // }

  static checkAndroidHomeEnvVar() {
    try {
      const androidHomePath = process.env["ANDROID_HOME"];
      printSuccess(
        `Local Environment contains the ${printLocation(
          androidHomeEnvVariable
        )} variable at : ${printLocation(androidHomePath)}`
      );

      return {
        name: "ANDROID_HOME environmental variable check",
        success: true,
        optional: false,
      };
    } catch (error) {
      printFail(
        `Windows environment does not contain the ${printLocation(
          androidHomeEnvVariable
        )} variable`
      );

      return {
        name: "ANDROID_HOME environmental variable check",
        success: false,
        optional: false,
        message: `The ${printLocation(
          androidHomeEnvVariable
        )} environmental variable is required to run Detox tests on Android.\nSet it in your environmental variables or shell profile file`,
      };
    }
  }

  // TODO: replace zshrc contents stuff
  static checkAndroidEmulatorEnvVar(zshrcContents) {
    if (zshrcContents.includes(androidEmulatorVariable)) {
      printSuccess(
        `Shell profile contains Android Emulator variable: ${printLocation(
          androidEmulatorVariable
        )}`
      );
      return {
        name: "EMULATOR $PATH check",
        success: true,
        optional: true,
      };
    } else {
      printWarning(
        `$PATH does not contain Android Emulator: ${printLocation(
          androidEmulatorVariable
        )}`
      );
      return {
        name: "EMULATOR $PATH check",
        success: false,
        optional: true,
        message: `${printLocation(
          androidEmulatorVariable
        )} is not set in your shell profile file and is not available in your $PATH. This means you won't be able to use the convenience ${printLocation(
          "emulator"
        )} method to setup and run Android emulators from the command line. Consider adding it with ${printLocation(
          "export PATH=$PATH:$ANDROID_HOME/emulator"
        )}`,
      };
    }
  }

  // TODO: replace zshrc contents stuff
  static checkAndroidSdkManagerEnvVar(zshrcContents) {
    if (
      zshrcContents.includes(androidSdkManagerVariable) ||
      zshrcContents.includes(androidCommandLineToolsVariable)
    ) {
      printSuccess(
        `Shell profile contains Android SDK Manager variable: ${printLocation(
          androidSdkManagerVariable
        )}`
      );
      return {
        name: "ANDROID SDK MANAGER $PATH check",
        success: true,
        optional: true,
      };
    } else {
      printWarning(
        `$PATH does not contain the Android SDK Manager variable: ${printLocation(
          androidSdkManagerVariable
        )} - Your Android SDK environment may not be configured properly`
      );
      return {
        name: "ANDROID SDK MANAGER $PATH check",
        success: false,
        optional: true,
        message: `${printLocation(
          androidSdkManagerVariable
        )} is not set in your shell profile file and is not available in your $PATH. This means you won't be able to use the convenience ${printLocation(
          "sdkmanager"
        )} method to install and manage Android system images, platforms and APIs from the command line. Consider adding it with ${printLocation(
          "export PATH=$PATH:$ANDROID_HOME/sdkmanager"
        )} or if you have Android Command Line tools installed: ${printLocation(
          "export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin"
        )}`,
      };
    }
  }

  // TODO: replace zshrc contents stuff
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
        optional: true,
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
        optional: true,
        message: `${printLocation(
          "ANDROID_PLATFORM"
        )} is not set in your shell profile file and is not available in your $PATH. You may not be able to run commands with Android Debug Bridge ${printLocation(
          "(adb)"
        )} or ${printLocation(
          "logcat"
        )} for help with debugging and emulator management.`,
      };
    }
  }

  // TODO: replace zshrc contents stuff
  static checkAndroidCommandLineToolsEnvVar(zshrcContents) {
    if (zshrcContents.includes(androidCommandLineToolsVariable)) {
      printSuccess(
        `Shell profile contains Android Command Line Tools Variable: ${printLocation(
          androidCommandLineToolsVariable
        )}`
      );
      return {
        name: "ANDROID_COMMAND_LINE_TOOLS $PATH check",
        success: true,
        optional: true,
      };
    } else {
      printWarning(
        `$PATH does not contain Android Command Line Tools Variable: ${printLocation(
          androidCommandLineToolsVariable
        )}`
      );
      return {
        name: "ANDROID_COMMAND_LINE_TOOLS $PATH check",
        success: false,
        optional: true,
        message: `${printLocation(
          androidCommandLineToolsVariable
        )} is not set in your shell profile file and is not available in your $PATH. This means you may not be able to use the convenience command line tools like ${printLocation(
          "sdkmanager"
        )} or ${printLocation(
          "avdmanager"
        )}. Consider adding it with ${printLocation(
          "export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin"
        )}`,
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
        )}\nAvailable Command line tools: ${printLocation(
          cmdlineToolsVersions.toString()
        )}\n`
      );

      return {
        name: "Android Command Line Tools Check",
        success: true,
        optional: true,
      };
    } else {
      printFail("Command Line tools not installed");

      return {
        name: "Android Command Line Tools Check",
        success: false,
        optional: true,
        message: `Android Command line tools directory does not exist at ${printLocation(
          "cmdline-tools"
        )}. Install via Android Studio > SDK Manager > Tools`,
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
        `Android API Platforms available at: ${printLocation(
          platformsDirectory
        )}\nAvailable Platforms: ${printLocation(platforms.toString())}\n`
      );
      return {
        name: "Android Platforms Check",
        success: true,
        optional: false,
      };
    } else {
      printFail("Android API Platforms not available");

      return {
        name: "Android Platforms Check",
        success: false,
        optional: false,
        message: `No Android API platforms are currently available. Install via Android Studio > SDK Manager > Tools, or via the ${printLocation(
          "sdkmanager"
        )} command line tool`,
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
      };
    } catch (error) {
      printFail(`Could not get SDK Manager version: ${error}`);

      return {
        name: "Android SDK Check",
        success: false,
        optional: false,
        message: `SDK Manager not available. Install via Android Studio > SDK Manager > Tools`,
      };
    }
  }

  static checkAdbVersion() {
    try {
      const adbResult = execSync("adb version");
      printSuccess(
        `ADB version: ${printLocation(
          adbResult
            .toString()
            .replace(/[\r\n]/gm, ", ")
            .slice(-0, -2)
        )}` // \r is a windows line break, \n is a UNIX one
      );

      return {
        name: "Android ADB Check",
        success: true,
        optional: false,
      };
    } catch (error) {
      printFail(`Could not get ADB version: ${error}`);

      return {
        name: "Android SDK Check",
        success: false,
        optional: false,
        message: `ADB not available. Install via Android Studio > SDK Manager > Tools > Platform Tools`,
      };
    }
  }

  static checkEmulatorVersion() {
    try {
      const emulatorResult = execSync("emulator -version");
      const emulatorString = emulatorResult.toString();
      const regex = /Android emulator version(.*)/; // separate actual version number from this string (which includes Android emulator version)
      const regexResult = regex.exec(emulatorString);
      printSuccess(regexResult[0]);
      return {
        name: "Android Emulator Check",
        success: true,
        optional: false,
      };
    } catch (error) {
      printFail(`Could not get Emulator version: ${error}`);

      return {
        name: "Android Emulator Check",
        success: false,
        optional: false,
        message: `Emulator not available. Install via Android Studio > SDK Manager > Tools`,
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
      printSuccess(`Android Virtual Devices available: ${strippedResult}`);

      return {
        name: "Android AVD Check",
        success: true,
        optional: false,
      };
    } catch (error) {
      printFail(`Could not get AVDs: ${error}`);

      return {
        name: "Android AVD Check",
        success: false,
        optional: false,
        message: `Could not find avdmanager or any android virtual devices. Install avdmanager via Android Studio > SDK Manager > Tools and virtual devices via Android Studio > Device Manager`,
      };
    }
  }
}

export default AndroidToolsChecker;
