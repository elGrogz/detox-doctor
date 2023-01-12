#!/usr/bin/env node

// Inputs to take:
// Check environment?
// Full install?
// Standard AVD to install?
// Name of AVD

// ANDROID CHECKS TO MAKE:
// - Android Studio (with Homebrew) ✅
// - Java 11 (with Homebrew - `brew install --cask zulu11`) ✅
// - Install SDK, command line tools, NDK, CMake ✅

// ANDROID ENV VARS:
// export JAVA_HOME=`/usr/libexec/java_home`  ✅
// export ANDROID_HOME=$HOME/Library/Android/sdk  ✅
// export PATH=$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/tools/bin/sdkmanager:$ANDROID_HOME/platform-tools:$ANDROID_HOME/cmdline-tools/latest/bin  ✅

// INSTALL STEPS FOR ANDROID:
// sdkmanager --install emulator
// sdkmanager "system-images;android-30;default;arm64-v8a"
// sdkmanager --licenses
// avdmanager create avd -n test_emulator -k "system-images;android-30;default;arm64-v8a"
// emulator -avd test_emulator

// OTHER STUFF:
// Have a way of saving errors and output a report at the end ✅
// check architecture for M1 vs intel and report it at start
// also report other system information at the start?
// iOS install steps ✅
// flipper check ✅
// watchman check
// ruby check ✅

import { program } from "commander";
import DetoxDoctor from "./detoxDoctor.js";
import chalk from "chalk";

const startDetoxDoctorCheck = (os) => {
  // process.stdin.setRawMode(true);

  const detoxDoctor = new DetoxDoctor();

  // return new Promise((resolve) =>
  //   process.stdin.once("data", () => {
  //     process.stdin.setRawMode(false);
  detoxDoctor.start();
  //     resolve();
  //   })
  // );
};

program
  .name("detox-doctor")
  .description(
    "CLI tool to help you setup your local environment for running Detox tests"
  )
  .version("1.0.19");

program
  .command("check")
  .description(
    "Run a check to make sure your local environment has the correct installations and tools to run React Native and Detox tests."
  )
  .option("-o, --exclude-optional", "Exclude optional checks - WIP")
  .option("-a, --android-only", "Run the check for Android only - WIP")
  .option("-i, --ios-only", "Run the check for iOS only - WIP")
  .action(() => {
    const os = process.platform; //https://nodejs.org/api/process.html#processplatform
    if (os) {
      console.log(
        chalk.italic.bold.bgMagentaBright(
          "\nWelcome to Detox Doctor - a tool that checks your local environment for running Detox tests."
        )
      );
      // console.log(
      //   chalk.italic.bold.bgMagentaBright("Press any key to continue...\n")
      // );
      startDetoxDoctorCheck(os);
      // .then(() => {
      //   process.exit();
      // });
    }
  });

program
  .command("install-emulator")
  .description(
    "Install a basic android emulator for React Native development and detox tests - WORK IN PROGRESS"
  );

program.parse();
