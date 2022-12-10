import fs from "fs";
import chalk from "chalk";
import { execSync } from "child_process";
import NodeDetector from "../utils/nodeChecker.js";
import AndroidToolsChecker from "../utils/androidToolsChecker.js";

const macOsCheck = async () => {
  // MAIN SYSTEM CHECKS
  console.log(
    chalk.blueBright.bold.bgGreenBright("\nChecking Node installation")
  );

  // Verify Node is installed
  NodeDetector.getNodeVersion();

  // Verify Android setup
  console.log(
    chalk.blueBright.bold.bgGreenBright(
      "\nChecking system setup for Android 🤖"
    )
  );

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
  AndroidToolsChecker.checkCmakeInstallation();

  // Verify iOS system setup
  console.log(
    chalk.blueBright.bold.bgGreenBright("\nChecking system setup for iOS ")
  );

  // ENV VARS CHECK
  console.log(
    chalk.blueBright.bold.bgGreenBright(
      "\nChecking system environmental variables:"
    )
  );
  AndroidToolsChecker.checkEnvironmentalVariables();

  // ANDROID TOOLS CHECK
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
