#!/usr/bin/env node

require("yargs")
  .scriptName("detox-doctor")
  .usage("$0 <cmd> [args]")
  .command(
    "start [os]",
    "test description",
    (yargs) => {
      yargs.positional("os", {
        type: "string",
        default: "Blah",
        describe: "The OS the user is on",
      });
    },
    function (argv) {
      console.log("Hello", argv.os, "you're in detox-doctor");
    }
  )
  .help().argv;
