import fs from "fs";
import chalk from "chalk";
import { execSync } from "child_process";

const javahomeEnvVariable = "export JAVA_HOME=`/usr/libexec/java_home`";
const androidHomeEnvVariable = "export ANDROID_HOME=$HOME/Library/Android/sdk";
const androidEmulatorVariable = "$ANDROID_HOME/emulator";
const androidSdkManagerVariable = "$ANDROID_HOME/tools/bin/sdkmanager";
const androidPlatformToolsVariable = "$ANDROID_HOME/platform-tools";
const androidCommandLineToolsVariable =
  "$ANDROID_HOME/cmdline-tools/latest/bin";
const cmakeDirectory = `${process.env.ANDROID_HOME}/cmake`;

const shell = process.env.SHELL;

class AndroidToolsChecker {
  static checkAndroidStudioInstallion() {
    if (fs.existsSync("/Applications/Android Studio.app")) {
      console.log(
        chalk.green(
          "✅ Android Studio installed at: /Applications/Android Studio.app"
        )
      );
    } else {
      console.log(chalk.red("❌ Android Studio not installed"));
    }
  }

  static checkJavaInstallation() {
    try {
      let response = execSync("java --version");
      console.log(chalk.green("✅ Java version:", response));
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

      console.log(
        chalk.green(
          `✅ Cmake versions available at: ${cmakeDirectory}\nAvailable CMake versions: ${cmakeVersions.toString()}`
        )
      );
    } else {
      console.log(chalk.red("❌ Cmake not installed"));
    }
  }

  static checkEnvironmentalVariables() {
    if (shell === "/bin/zsh" && fs.existsSync(`${process.env.HOME}/.zshrc`)) {
      const zshrcContents = fs.readFileSync(
        `${process.env.HOME}/.zshrc`,
        "utf-8"
      );

      if (zshrcContents.includes(javahomeEnvVariable)) {
        console.log(
          chalk.green(
            "✅ Shell profile contains Javahome:",
            javahomeEnvVariable
          )
        );
      } else {
        console.log(
          chalk.red(
            "❌ Shell profile does not contain Javahome variable:",
            javahomeEnvVariable
          )
        );
      }

      if (zshrcContents.includes(androidHomeEnvVariable)) {
        console.log(
          chalk.green(
            "✅ Shell profile contains Android Home:",
            androidHomeEnvVariable
          )
        );
      } else {
        console.log(
          chalk.red(
            "❌ Shell profile does not contain Android Home variable:",
            androidHomeEnvVariable
          )
        );
      }

      if (zshrcContents.includes(androidEmulatorVariable)) {
        console.log(
          chalk.green(
            "✅ Shell profile contains Android Emulator variable:",
            androidEmulatorVariable
          )
        );
      } else {
        console.log(
          chalk.red(
            "❌ Shell profile does not contain Android Emulator variable:",
            androidSdkManagerVariable
          )
        );
      }

      if (zshrcContents.includes(androidSdkManagerVariable)) {
        console.log(
          chalk.green(
            "✅ Shell profile contains Android SDK Manager variable:",
            androidSdkManagerVariable
          )
        );
      } else {
        console.log(
          chalk.red(
            "❌ Shell profile does not contain Android SDK Manager variable:",
            androidSdkManagerVariable
          )
        );
      }

      if (zshrcContents.includes(androidPlatformToolsVariable)) {
        console.log(
          chalk.green(
            "✅ Shell profile contains Android Platform Tools Variable:",
            androidPlatformToolsVariable
          )
        );
      } else {
        console.log(
          chalk.red(
            "❌ Shell profile does not contain Android Platform Tools Variable:",
            androidPlatformToolsVariable
          )
        );
      }

      if (zshrcContents.includes(androidCommandLineToolsVariable)) {
        console.log(
          chalk.green(
            "✅ Shell profile contains Android Command Line Tools Variable:",
            androidCommandLineToolsVariable
          )
        );
      } else {
        console.log(
          chalk.red(
            "❌ Shell profile does not contain Android Command Line Tools Variable:",
            androidCommandLineToolsVariable
          )
        );
      }
    } else {
      console.log("unexpected shell");
    }
  }
}

export default AndroidToolsChecker;
