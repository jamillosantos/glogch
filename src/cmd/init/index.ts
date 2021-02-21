import fs from "fs";
import yargs from "yargs";
import prompts from "prompts";

function initCommand(yargs: yargs.Argv) {
  return yargs.command(
    "init",
    "Initializes the configuration for start using the glogch",
    (yargs) => {
      yargs.option("token", {
        alias: "t",
        type: "string",

        describe: "Clubhouse API Token",
      });
      yargs.option("output", {
        alias: "o",
        type: "string",
        default: ".glogch.json",
        describe: "The path of the config file that will be created",
      });
      /*
      yargs.option("advanced", {
        alias: "a",
        type: "boolean",
        default: false,
        describe: "Initialize all options for the config file",
      });
      yargs.option("timeout", {
        alias: "i",
        type: "number",
        default: 5,
        describe:
          "Number of seconds the client will wait Clubhouse requests to respond",
      });
      yargs.option("max-concurrent-requests", {
        alias: "c",
        type: "number",
        default: 3,
        describe:
          "Max number of concurrent requests the CLI will fire against Clubhouse Server  (default: 3s)",
      });
      */
    },
    async (argv) => {
      prompts.override(argv);

      if (!argv.token) {
        const response = await prompts({
          type: "text",
          name: "token",
          message: "Enter the Clubhouse API Token?",
          hint:
            "If you don't have a token. Access https://app.clubhouse.io/<Your Organization>/settings/account/api-tokens",
        });
        argv.token = response.token;
      }
      /*
      if (!argv.advanced) {
        const response = await prompts([
          {
            type: "number",
            name: "timeout",
            message: "Enter the timeout (in seconds):",
          },
        ]);
        argv.token = response.timeout;
      }
      */

      try {
        fs.writeFileSync(
          argv.output as string,
          JSON.stringify({
            token: argv.token,
          })
        );
      } catch (e) {
        console.log("error writing configuration:", e);
      }
      return argv;
    }
  );
}

export default initCommand;
