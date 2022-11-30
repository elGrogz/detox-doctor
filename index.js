#!/usr/bin/env node;

// Inputs to take:
// Check environment?
// Full install?
// Standard AVD to install?
// Name of AVD

const { program } = require("commander");
const detoxDoctor = require("./detox-doctor.js");

program
  .name("detox-doctor")
  .description("CLI tool to help you setup your local environment for running Detox tests")
  .option("-e, --check-mobile-environment", "flag to tell detox-doctor to check the user's local environment for running detox tests", false)
  .option("-i, --full-environment-install", "tell ", false)
  .option("-e, --check-mobile-environment", "flag to tell detox-doctor to check the user's local environment for running detox tests", false)
  .option("-e, --check-mobile-environment", "flag to tell detox-doctor to check the user's local environment for running detox tests", false)
  .parse();

const options = program.opts();
const os = process.platform; //https://nodejs.org/api/process.html#processplatform
console.log({options})

if (os && options.checkMobileEnvironment) {
  detoxDoctor(os);
}

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
