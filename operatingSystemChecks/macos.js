import chalk from "chalk";
import NodeDetector from "../utils/nodeChecker.js";
import AndroidToolsChecker from "../utils/androidToolsChecker.js";
import IosToolsChecker from "../utils/iosToolsChecker.js";

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

  AndroidToolsChecker.checkPlatforms();
  AndroidToolsChecker.checkCommandLineTools();
  AndroidToolsChecker.checkAndroidStudioInstallion();
  AndroidToolsChecker.checkJavaInstallation();
  AndroidToolsChecker.checkCmakeInstallation();
  AndroidToolsChecker.checkNdkInstallion();

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

  AndroidToolsChecker.checkSdkVersion();
  AndroidToolsChecker.checkEmulatorVersion();
  AndroidToolsChecker.checkAvdVersion();

  // Verify iOS system setup
  console.log(
    chalk.blueBright.bold.bgGreenBright("\nChecking system setup for iOS ")
  );

  IosToolsChecker.checkXcodePath();
  IosToolsChecker.checkAppleSimUtils();
};

export default macOsCheck;
