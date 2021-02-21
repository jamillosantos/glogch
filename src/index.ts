import yargs from "yargs";

import initCommand from "./cmd/init";

[initCommand]
  .reduce((yargs, cmd) => {
    return cmd(yargs);
  }, yargs.scriptName("glogch").usage("$0 <cmd> [args]"))
  .help().argv;
