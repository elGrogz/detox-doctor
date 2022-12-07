import fs from "fs";
import chalk from "chalk";
import { execSync } from "child_process";

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

  // MAIN SYSTEM CHECKS
  console.log(
    chalk.blueBright.bold.bgGreenBright("\nChecking Android and Java stuff:")
  );

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
  try {
    let response = execSync("java --version");
    console.log(chalk.green("✅ Java version:", response));
  } catch (error) {
    console.error(chalk.red("❌ Could not get java version: ", error));
  }

  // verify cmake, NDK, etc

  // ENV VARS CHECK
  console.log(
    chalk.blueBright.bold.bgGreenBright(
      "\nChecking system environmental variables:"
    )
  );

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
  console.log(
    chalk.blueBright.bold.bgGreenBright(
      "\nChecking Android tools are installed correctly:"
    )
  );

  try {
    const sdkResult = execSync("sdkmanager --version");
    console.log(chalk.green("✅ SDK Manager version:", sdkResult)); //todo: truncate line
  } catch (error) {
    console.error(chalk.red("❌ Could not get SDK Manager version: ", error));
  }

  try {
    const emulatorResult = execSync("emulator -version");
    console.log(chalk.green("✅ Emulator version:", emulatorResult)); //todo: truncate line
  } catch (error) {
    console.error(chalk.red("❌ Could not get Emulator version: ", error));
  }

  try {
    const avdResult = execSync("avdmanager list avd");
    console.log(chalk.green("✅ AVDs available:", avdResult)); //todo: truncate line
  } catch (error) {
    console.error(chalk.red("❌ Could not get AVDs version: ", error));
  }
};

export default macOsCheck;
