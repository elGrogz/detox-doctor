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
// - adb version

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
// check architecture for M1 vs intel and report it at start ✅
// also report other system information at the start? ✅
// iOS install steps ✅
// flipper check ✅
// idb check for flipper ✅
// watchman check (ios ✅)
// ruby check ✅
// break check strings with emojis into their respective tools
// check for minimum versions of things: node, ios and android platforms, etc
// add global state of os or whatever so it's accessible by the whole program

import { program } from "commander";
import DetoxDoctorCheck from "./detoxDoctorCheck.js";
import { printDetoxAsciiDude } from "./utils/logger.js";
import chalk from "chalk";

const startDetoxDoctorCheck = (options) => {
  const detoxDoctor = new DetoxDoctorCheck(options);
  detoxDoctor.start();
};

program
  .name("detox-doctor")
  .description(
    "CLI tool to help you setup your local environment for running Detox tests"
  )
  .version("1.0.42");

program
  .command("check")
  .description(
    "Run a check to make sure your local environment has the correct installations and tools to run React Native and Detox tests."
  )
  .option("-o, --exclude-optional", "Exclude optional checks")
  .option("-a, --android-only", "Run the check for Android only")
  .option("-i, --ios-only", "Run the check for iOS only")
  .action((options) => {
    if (options.androidOnly && options.iosOnly) {
      console.log(
        "Cannot use the Android-only and iOS-only flags at the same time. Please choose one or the other.\nExiting..."
      );
      return;
    }

    console.log(
      chalk.italic.bold.bgMagentaBright(
        "\nWelcome to Detox Doctor - a tool that checks your local environment for running Detox tests"
      )
    );

    console.log(printDetoxAsciiDude());

    startDetoxDoctorCheck(options);
  });

program
  .command("install-emulator")
  .description(
    "Install a basic android emulator for React Native development and detox tests - WORK IN PROGRESS"
  );

program.parse();
