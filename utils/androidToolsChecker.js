import fs from "fs";
import chalk from "chalk";
import { execSync } from "child_process";
import { printLocation, printSuccess } from "./logger.js";

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
    } else {
      console.log(chalk.red("❌ Android Studio not installed"));
    }
  }

  static checkJavaInstallation() {
    try {
      let response = execSync("java --version");
      printSuccess(`Java version: ${response}`);
    } catch (error) {
      console.error(chalk.red("❌ Could not get java version: ", error));
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
        )}\n   Available CMake versions: ${cmakeVersions.toString()}`
      );
    } else {
      console.log(chalk.red("❌ Cmake not installed"));
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
        )}\n   Available NDK versions: ${ndkVersions.toString()}`
      );
    } else {
      console.log(chalk.red("❌ NDK not installed"));
    }
  }

  static checkEnvironmentalVariables() {
    if (shell === "/bin/zsh" && fs.existsSync(`${process.env.HOME}/.zshrc`)) {
      const zshrcContents = fs.readFileSync(
        `${process.env.HOME}/.zshrc`,
        "utf-8"
      );

      if (zshrcContents.includes(javahomeEnvVariable)) {
        printSuccess(`Shell profile contains Javahome:
            ${printLocation(javahomeEnvVariable)}`);
      } else {
        console.log(
          chalk.yellow(
            `⚠️ Shell profile does not contain JAVA_HOME variable: ${printLocation(
              javahomeEnvVariable
            )} - Your Android SDK environment may not be configured properly`
          )
        );
      }

      if (zshrcContents.includes(androidHomeEnvVariable)) {
        printSuccess(
          `Shell profile contains Android Home: ${printLocation(
            androidHomeEnvVariable
          )}`
        );
      } else {
        console.log(
          chalk.yellow(
            `⚠️ Shell profile does not contain the ANDROID_HOME variable: ${printLocation(
              androidHomeEnvVariable
            )} - Your Android SDK environment may not be configured properly`
          )
        );
      }

      if (zshrcContents.includes(androidEmulatorVariable)) {
        printSuccess(`Shell profile contains Android Emulator variable: 
            ${printLocation(androidEmulatorVariable)}`);
      } else {
        console.log(
          chalk.yellow(
            `⚠️ Shell profile does not contain the Android Emulator variable: ${printLocation(
              androidEmulatorVariable
            )} - Your Android SDK environment may not be configured properly`
          )
        );
      }

      if (zshrcContents.includes(androidSdkManagerVariable)) {
        printSuccess(`Shell profile contains Android SDK Manager variable: 
            ${printLocation(androidSdkManagerVariable)}`);
      } else {
        console.log(
          chalk.yellow(
            `⚠️ Shell profile does not contain the Android SDK Manager variable: ${printLocation(
              androidSdkManagerVariable
            )} - Your Android SDK environment may not be configured properly`
          )
        );
      }

      if (zshrcContents.includes(androidPlatformToolsVariable)) {
        printSuccess(
          `Shell profile contains Android Platform Tools Variable: ${printLocation(
            androidPlatformToolsVariable
          )}`
        );
      } else {
        console.log(
          chalk.yellow(
            `⚠️ Shell profile does not contain the Android Platform Tools variable: ${printLocation(
              androidPlatformToolsVariable
            )} - Your Android SDK environment may not be configured properly`
          )
        );
      }

      if (zshrcContents.includes(androidCommandLineToolsVariable)) {
        printSuccess(
          `Shell profile contains Android Command Line Tools Variable: ${printLocation(
            androidCommandLineToolsVariable
          )}`
        );
      } else {
        console.log(
          chalk.red(
            "❌ Shell profile does not contain Android Command Line Tools Variable:",
            printLocation(androidCommandLineToolsVariable)
          )
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
        )}\n   Available Command line tools: ${cmdlineToolsVersions.toString()}`
      );
    } else {
      console.log(chalk.red("❌ Command Line tools not installed"));
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
        )}\n   Available Platforms: ${platforms.toString()}`
      );
    } else {
      console.log(chalk.red("❌ Platforms available"));
    }
  }

  static checkSdkVersion() {
    try {
      const sdkResult = execSync("sdkmanager --version");
      printSuccess(
        `SDK Manager version: ${sdkResult.toString().replace(/[\r\n]/gm, "")}` // \r is a windows line break, \n is a UNIX one
      );
    } catch (error) {
      console.error(chalk.red("❌ Could not get SDK Manager version: ", error));
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
      console.error(chalk.red("❌ Could not get Emulator version: ", error));
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
      console.error(chalk.red("❌ Could not get AVDs: ", error));
    }
  }
}

export default AndroidToolsChecker;
