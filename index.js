#!/usr/bin/env node;

// Inputs to take:
// Check environment?
// Full install?
// Standard AVD to install?
// Name of AVD

// ANDROID CHECKS TO MAKE:
// - Android Studio (with Homebrew) ✅
// - Java 11 (with Homebrew - `brew install --cask zulu11`) ✅
// - Install SDK, command line tools, NDK, CMake ✅

// - Env vars:
// # Android environmental variables
// export JAVA_HOME=`/usr/libexec/java_home`
// export ANDROID_HOME=$HOME/Library/Android/sdk
// export PATH=$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/tools/bin/sdkmanager:$ANDROID_HOME/platform-tools:$ANDROID_HOME/cmdline-tools/latest/bin

// INSTALL STEPS FOR ANDROID
// sdkmanager --install emulator
// sdkmanager "system-images;android-30;default;arm64-v8a"
// sdkmanager --licenses
// avdmanager create avd -n test_emulator -k "system-images;android-30;default;arm64-v8a"
// emulator -avd test_emulator


import { program } from "commander";
import inquirer from "inquirer";
import detoxDoctor from "./detoxDoctor.js";

program
  .name("detox-doctor")
  .description("CLI tool to help you setup your local environment for running Detox tests")
  .command("check")
  // .option("-e, --check-mobile-environment", "flag to tell detox-doctor to check the user's local environment for running detox tests", false)
  .option("-i, --full-environment-install", "tell ", false)
  .option("-e, --check-mobile-environment", "flag to tell detox-doctor to check the user's local environment for running detox tests", false)
  .option("-e, --check-mobile-environment", "flag to tell detox-doctor to check the user's local environment for running detox tests", false)
  .action((options) => {
    const os = process.platform; //https://nodejs.org/api/process.html#processplatform
    if (os) {
      detoxDoctor(os);
    }
  })
  .parse();

// const options = program.opts();
// console.log({options})


// require("yargs")
//   .scriptName("detox-doctor")
//   // .usage("$0 <cmd> [args]")
//   .command(
//     "start",
//     "Start Detox Doctor",
//     // (yargs) => {
//     //   yargs.positional("os", {
//     //     type: "string",
//     //     default: "MacOS",
//     //     describe: "The OS the user is on",
//     //   });
//     // },
//     function (argv) {
//       console.log("Welcome to detox-doctor");
//       require("./detox-doctor.js")(argv.os);
//     })
//   .help().argv;
