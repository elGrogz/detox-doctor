#!/usr/bin/env node;

// Inputs to take:
// Check environment?
// Full install?
// Standard AVD to install?
// Name of AVD

// ANDROID CHECKS TO MAKE:
// - Android Studio (with Homebrew) ✅
// - Java 11 (with Homebrew - `brew install --cask zulu11`) ✅
// - Install SDK, command line tools, NDK, CMake

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
// Have a way of saving errors and output a report at the end
// check architecture for M1 vs intel
// iOS install steps

import { program } from "commander";
import detoxDoctor from "./detoxDoctor.js";
import chalk from "chalk";

const keypress = (os) => {
  process.stdin.setRawMode(true);

  return new Promise((resolve) =>
    process.stdin.once("data", () => {
    process.stdin.setRawMode(false);
    detoxDoctor(os).then(() => {resolve()})
    }) 
  );
};

program
  .name("detox-doctor")
  .description(
    "CLI tool to help you setup your local environment for running Detox tests"
  )
  .command("check")
  .action(() => {
    const os = process.platform; //https://nodejs.org/api/process.html#processplatform
    if (os) {
      console.log(
        chalk.blueBright.bold.bgGreenBright(
          "\nWelcome to Detox Doctor - press any key to continue...\n"
        )
      );
      keypress(os)
      .then(() => {
        process.exit();
      });
    }
  })
  .parse();
