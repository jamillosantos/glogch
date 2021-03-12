#!/usr/bin/env node

import yargs from "yargs";

import initCommand from "./cmd/init";
import rootCommand from "./cmd/root";

[rootCommand, initCommand]
  .reduce((yargs, cmd) => {
    return cmd(yargs);
  }, yargs.scriptName("glogch").usage("$0 <cmd> [args]"))
  .help().argv;
