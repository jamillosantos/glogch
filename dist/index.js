"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = __importDefault(require("yargs"));
var init_1 = __importDefault(require("./cmd/init"));
var root_1 = __importDefault(require("./cmd/root"));
[root_1.default, init_1.default]
    .reduce(function (yargs, cmd) {
    return cmd(yargs);
}, yargs_1.default.scriptName("glogch").usage("$0 <cmd> [args]"))
    .help().argv;
//# sourceMappingURL=index.js.map