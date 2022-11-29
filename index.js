#!/usr/bin/env node;

require("yargs")
  .scriptName("detox-doctor")
  .usage("$0 <cmd> [args]")
  .command(
    "start [os]",
    "test description",
    (yargs) => {
      yargs.positional("os", {
        type: "string",
        default: "MacOS",
        describe: "The OS the user is on",
      });
    },
    function (argv) {
      require("./detox-doctor.js")("linux");
      console.log("Hello", argv.os, ",you're in detox-doctor");
    })
  .help().argv;
