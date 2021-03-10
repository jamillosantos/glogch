"use strict";
exports.__esModule = true;
var yargs_1 = require("yargs");
var init_1 = require("./cmd/init");
var root_1 = require("./cmd/root");
[root_1["default"], init_1["default"]]
    .reduce(function (yargs, cmd) {
    return cmd(yargs);
}, yargs_1["default"].scriptName("glogch").usage("$0 <cmd> [args]"))
    .help().argv;
