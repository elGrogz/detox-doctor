import fs from "fs";
import chalk from "chalk";
import { exec } from "child_process";

const macOsCheck = async () => {
  const javahomeEnvVariable = "export JAVA_HOME=`/usr/libexec/java_home`";
  const androidHomeEnvVariable =
    "export ANDROID_HOME=$HOME/Library/Android/sdk";
  const androidEmulatorVariable = "$ANDROID_HOME/emulator";
  const androidSdkManagerVariable = "$ANDROID_HOME/tools/bin/sdkmanager";
  const androidPlatformToolsVariable = "$ANDROID_HOME/platform-tools";
  const androidCommandLineToolsVariable =
    "$ANDROID_HOME/cmdline-tools/latest/bin";

  const shell = process.env.SHELL;

  // Verify Android studio is installed
  if (fs.existsSync("/Applications/Android Studio.app")) {
    console.log(
      chalk.green(
        "✅ Android Studio installed at: /Applications/Android Studio.app"
      )
    );
  } else {
    console.log(chalk.red("❌ Android Studio not installed"));
  }

  // Verify Java is installed correctly
  await exec("java --version", (error, stdout, stderr) => {
    if (error || stdout) {
      console.log(chalk.red("❌ Could not get java version"));
    }
    if (stdout) {
      console.log(chalk.green("✅ Java version:", stdout.replace("\n", ", ")));
    }
  });

  // Verify Shell Env variables are set
  if (shell === "/bin/zsh" && fs.existsSync(`${process.env.HOME}/.zshrc`)) {
    const zshrcContents = fs.readFileSync(
      `${process.env.HOME}/.zshrc`,
      "utf-8"
    );

    if (zshrcContents.includes(javahomeEnvVariable)) {
      console.log(
        chalk.green("✅ Shell profile contains Javahome:", javahomeEnvVariable)
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

  // Verify Android tools are working correctly
  await exec("sdkmanager --version", (error, stdout, stderr) => {
    if (error || stdout) {
      console.log(chalk.red("❌ SDK Manager not running correctly"));
    }
    if (stdout) {
      console.log(chalk.green("✅ SDK Manager version:", stdout));
    }
  });
};

export default macOsCheck;
