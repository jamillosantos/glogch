"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var clui_1 = require("clui");
var cli_progress_1 = require("cli-progress");
var workspace_1 = __importDefault(require("../../clubhouse/workspace"));
var log_1 = require("../../git/log");
var time = __importStar(require("../../time"));
var coauthors_1 = require("../../git/coauthors");
var util_1 = require("util");
var printf = function (f) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    process.stdout.write(util_1.format.apply(void 0, __spreadArrays([f], args)));
};
var println = function (content) {
    if (content)
        process.stdout.write(content);
    process.stdout.write("\n");
};
var progressBarFormat = function (title) { return title + " [{bar}] {percentage}%"; };
var renderStoryResponsibles = function (workspace, story) { return __awaiter(void 0, void 0, void 0, function () {
    var owners_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(story.owner_ids.length === 0)) return [3 /*break*/, 1];
                printf("Sem responsável");
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, Promise.all(story.owner_ids.map(function (id) { return __awaiter(void 0, void 0, void 0, function () {
                    var e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, workspace.getMember(id)];
                            case 1: return [2 /*return*/, _a.sent()];
                            case 2:
                                e_1 = _a.sent();
                                return [2 /*return*/, null];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); }))];
            case 2:
                owners_1 = (_a.sent()).filter(function (owner) { return owner !== null; });
                owners_1.forEach(function (owner, idx) {
                    if (idx > 0 && idx < owners_1.length - 1) {
                        printf(", ");
                    }
                    else if (idx > 0) {
                        printf(" and ");
                    }
                    printf("%s", owner === null || owner === void 0 ? void 0 : owner.profile.name);
                });
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
var render = function (el, ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var workspace, story, _i, _a, linkedStory, commit_1, subject, stories_1, coauthors_2, labels, _b, _c, storyId, story, _d, _e, label, e_2, group, _f, _g, elToRender;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                workspace = ctx.workspace;
                if (typeof el == "function") {
                    return [2 /*return*/, el(__assign(__assign({}, ctx), { level: ctx.level + 1 }))];
                }
                if (!(el.id && el.app_url)) return [3 /*break*/, 6];
                story = el;
                printf("* [[ch%s]](%s) %s", story.id, story.app_url, story.name);
                printf(" (");
                return [4 /*yield*/, renderStoryResponsibles(workspace, story)];
            case 1:
                _h.sent();
                println(")");
                if (!story.render)
                    return [2 /*return*/];
                _i = 0, _a = story.render;
                _h.label = 2;
            case 2:
                if (!(_i < _a.length)) return [3 /*break*/, 5];
                linkedStory = _a[_i];
                printf("  * [[ch%s]](%s) %s (", linkedStory.id, linkedStory.app_url, linkedStory.name);
                return [4 /*yield*/, renderStoryResponsibles(workspace, linkedStory)];
            case 3:
                _h.sent();
                println(")");
                _h.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5: return [2 /*return*/];
            case 6:
                if (!el.hash) return [3 /*break*/, 15];
                commit_1 = el;
                subject = commit_1.subject;
                if (!!ctx.ignoreStories) return [3 /*break*/, 8];
                return [4 /*yield*/, Promise.all(commit_1.stories.map(function (storyId) { return __awaiter(void 0, void 0, void 0, function () {
                        var e_3;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, workspace.getStory(storyId)];
                                case 1: return [2 /*return*/, _a.sent()];
                                case 2:
                                    e_3 = _a.sent();
                                    return [2 /*return*/, null];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 7:
                stories_1 = (_h.sent()).filter(function (story) { return story !== null; });
                subject = (function () {
                    // Add link to story tags.
                    var subject = commit_1.subject;
                    stories_1.forEach(function (story) {
                        if (story)
                            subject = subject.replace("[ch" + story.id + "]", "[[ch" + story.id + "]](" + story.app_url + ")");
                    });
                    return subject;
                })();
                _h.label = 8;
            case 8:
                printf("* %s %s (%s", commit_1.hash, subject, commit_1.authorName);
                coauthors_2 = coauthors_1.extractCoauthors(commit_1.body);
                if (coauthors_2) {
                    coauthors_2.forEach(function (coauthor, idx) {
                        if (idx < coauthors_2.length - 1) {
                            printf(", ");
                        }
                        else {
                            printf(" and ");
                        }
                        printf("%s", coauthor.name);
                    });
                }
                printf(")");
                if (!commit_1.stories || commit_1.stories.length == 0) {
                    println();
                    return [2 /*return*/];
                }
                labels = [];
                _b = 0, _c = commit_1.stories;
                _h.label = 9;
            case 9:
                if (!(_b < _c.length)) return [3 /*break*/, 14];
                storyId = _c[_b];
                _h.label = 10;
            case 10:
                _h.trys.push([10, 12, , 13]);
                return [4 /*yield*/, workspace.getStory(storyId)];
            case 11:
                story = _h.sent();
                for (_d = 0, _e = story.labels; _d < _e.length; _d++) {
                    label = _e[_d];
                    labels.push(label.name);
                }
                return [3 /*break*/, 13];
            case 12:
                e_2 = _h.sent();
                return [3 /*break*/, 13];
            case 13:
                _b++;
                return [3 /*break*/, 9];
            case 14:
                if (labels.length > 0) {
                    printf(" [%s]", labels.join(","));
                }
                println();
                return [2 /*return*/];
            case 15:
                if (!el.render) return [3 /*break*/, 20];
                group = el;
                printf("%s %s", "#".repeat(ctx.level), group.title);
                println();
                println();
                _f = 0, _g = group.render;
                _h.label = 16;
            case 16:
                if (!(_f < _g.length)) return [3 /*break*/, 19];
                elToRender = _g[_f];
                return [4 /*yield*/, render(elToRender, __assign(__assign({}, ctx), { level: ctx.level + 1 }))];
            case 17:
                _h.sent();
                _h.label = 18;
            case 18:
                _f++;
                return [3 /*break*/, 16];
            case 19:
                println();
                _h.label = 20;
            case 20: return [2 /*return*/];
        }
    });
}); };
function rootCommand(yargs) {
    var _this = this;
    return yargs.command("$0 <revisionRange>", "", function (yargs) {
        yargs.option("token", {
            alias: "t",
            type: "string",
            describe: "Clubhouse API Token",
        });
        yargs.option("repo", {
            alias: "r",
            type: "string",
            default: ".",
            describe: "The repository folder for extracting the git log",
        });
        yargs.option("include-merge-commits", {
            alias: "m",
            type: "boolean",
            default: false,
            describe: "When enabled, the merge commits will be listed",
        });
        yargs.option("ignore-stories", {
            alias: "s",
            type: "boolean",
            default: false,
            describe: "When enabled, do not get any story information",
        });
        yargs.option("all-commits", {
            alias: "a",
            type: "boolean",
            default: false,
            describe: "When enabled, do not get any story information",
        });
        yargs.positional("revisionRange", {
            type: "string",
            describe: "revision range (ex: v2.6.1..HEAD)",
        });
    }, function (argv) { return __awaiter(_this, void 0, void 0, function () {
        var fileContent, data, workspace, spinnerGettingLog, commits, stories, relatedStories, members, epics, projects, e_4, pb, _a, _b, _i, storyId, story, e_5, _c, _d, _e, storyId, story, e_6, _f, _g, _h, memberId, e_7, _j, _k, _l, epicId, epic, e_8, _m, _o, _p, projectId, e_9, obj, renderGroup, scriptFileName, es, _q, _r, _s, group;
        var _t;
        var _this = this;
        var _u, _v, _w, _x, _y, _z;
        return __generator(this, function (_0) {
            switch (_0.label) {
                case 0:
                    if (!argv.token && fs_1.default.existsSync(".glogch.json")) {
                        try {
                            fileContent = fs_1.default.readFileSync(".glogch.json");
                            data = JSON.parse(fileContent.toString());
                            argv.token = data.token;
                        }
                        catch (e) {
                            console.error("error loading .glogch.json:", e);
                            process.exit(1);
                        }
                    }
                    workspace = new workspace_1.default(argv.token);
                    spinnerGettingLog = new clui_1.Spinner("Retrieving git log...  ", [
                        "⣾",
                        "⣽",
                        "⣻",
                        "⢿",
                        "⡿",
                        "⣟",
                        "⣯",
                        "⣷",
                    ]);
                    spinnerGettingLog.start();
                    stories = {};
                    relatedStories = {};
                    members = {};
                    epics = {};
                    projects = {};
                    _0.label = 1;
                case 1:
                    _0.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, time.sleep(250)];
                case 2:
                    _0.sent();
                    return [4 /*yield*/, log_1.gitLog({
                            revisionRange: argv.revisionRange,
                            repo: argv.repo,
                            all: argv.all,
                        })];
                case 3:
                    commits = (_0.sent()).filter(function (commit) { return argv.includeMergeCommits || !commit.isMerge; });
                    return [4 /*yield*/, time.sleep(250)];
                case 4:
                    _0.sent();
                    spinnerGettingLog.message("👍 Done getting git log");
                    return [4 /*yield*/, time.sleep(250)];
                case 5:
                    _0.sent();
                    spinnerGettingLog.stop();
                    return [3 /*break*/, 7];
                case 6:
                    e_4 = _0.sent();
                    spinnerGettingLog.stop();
                    console.error("error listing the commits: ", e_4);
                    process.exit(1);
                    return [3 /*break*/, 7];
                case 7:
                    if (!!argv.ignoreStories) return [3 /*break*/, 45];
                    /*************************************************************************
                     * Stories
                     */
                    // Collect stories from all commits.
                    commits.forEach(function (commit) {
                        commit.stories.forEach(function (id) { return (stories[id] = true); });
                    });
                    pb = new cli_progress_1.SingleBar({
                        stream: process.stderr,
                        format: progressBarFormat("Fetching stories"),
                    }, cli_progress_1.Presets.legacy);
                    _0.label = 8;
                case 8:
                    _0.trys.push([8, , 44, 45]);
                    pb.start(Object.keys(stories).length, 0);
                    _a = [];
                    for (_b in stories)
                        _a.push(_b);
                    _i = 0;
                    _0.label = 9;
                case 9:
                    if (!(_i < _a.length)) return [3 /*break*/, 15];
                    storyId = _a[_i];
                    _0.label = 10;
                case 10:
                    _0.trys.push([10, 12, 13, 14]);
                    return [4 /*yield*/, workspace.getStory(storyId)];
                case 11:
                    story = _0.sent();
                    if (story.epic_id)
                        epics[story.epic_id] = true;
                    story.owner_ids.forEach(function (id) { return (members[id] = true); });
                    story.story_links.forEach(function (storyLink) {
                        relatedStories[storyLink.object_id] = true;
                    });
                    projects[story.project_id] = true;
                    return [3 /*break*/, 14];
                case 12:
                    e_5 = _0.sent();
                    switch ((_u = e_5 === null || e_5 === void 0 ? void 0 : e_5.response) === null || _u === void 0 ? void 0 : _u.status) {
                        case 401:
                            pb.stop();
                            console.error("ERROR:".red + " Cloud not fetch the story from Clubhouse: invalid token");
                            process.exit(1);
                            break;
                        case 404:
                            console.error();
                            console.error("WARNING:".yellow + " Story " + storyId + " was not found.");
                            break;
                        default:
                            console.log("error getting story " + storyId + ":", e_5);
                    }
                    return [3 /*break*/, 14];
                case 13:
                    pb.increment();
                    return [7 /*endfinally*/];
                case 14:
                    _i++;
                    return [3 /*break*/, 9];
                case 15:
                    /*************************************************************************
                     * Related Stories
                     */
                    pb.start(Object.keys(relatedStories).length, 0, {});
                    pb.options.format = progressBarFormat("Fetching related stories");
                    _c = [];
                    for (_d in relatedStories)
                        _c.push(_d);
                    _e = 0;
                    _0.label = 16;
                case 16:
                    if (!(_e < _c.length)) return [3 /*break*/, 22];
                    storyId = _c[_e];
                    _0.label = 17;
                case 17:
                    _0.trys.push([17, 19, 20, 21]);
                    return [4 /*yield*/, workspace.getStory(storyId)];
                case 18:
                    story = _0.sent();
                    if (story.epic_id)
                        epics[story.epic_id] = true;
                    story.owner_ids.forEach(function (id) { return (members[id] = true); });
                    projects[story.project_id] = true;
                    return [3 /*break*/, 21];
                case 19:
                    e_6 = _0.sent();
                    switch ((_v = e_6 === null || e_6 === void 0 ? void 0 : e_6.response) === null || _v === void 0 ? void 0 : _v.status) {
                        case 401:
                            pb.stop();
                            console.error("ERROR:".red + " Cloud not fetch the story from Clubhouse: invalid token");
                            process.exit(1);
                            break;
                        case 404:
                            console.error();
                            console.error("WARNING:".yellow + " Story " + storyId + " was not found.");
                            break;
                        default:
                            console.log("error getting story " + storyId + ":", e_6);
                    }
                    return [3 /*break*/, 21];
                case 20:
                    pb.increment();
                    return [7 /*endfinally*/];
                case 21:
                    _e++;
                    return [3 /*break*/, 16];
                case 22:
                    /*************************************************************************
                     * Members
                     */
                    pb.start(Object.keys(members).length, 0, {});
                    pb.options.format = progressBarFormat("Fetching members");
                    _f = [];
                    for (_g in members)
                        _f.push(_g);
                    _h = 0;
                    _0.label = 23;
                case 23:
                    if (!(_h < _f.length)) return [3 /*break*/, 29];
                    memberId = _f[_h];
                    _0.label = 24;
                case 24:
                    _0.trys.push([24, 26, 27, 28]);
                    return [4 /*yield*/, workspace.getMember(memberId)];
                case 25:
                    _0.sent();
                    return [3 /*break*/, 28];
                case 26:
                    e_7 = _0.sent();
                    switch ((_w = e_7 === null || e_7 === void 0 ? void 0 : e_7.response) === null || _w === void 0 ? void 0 : _w.status) {
                        case 401:
                            pb.stop();
                            console.error("ERROR:".red + " Cloud not fetch the member from Clubhouse: invalid token");
                            process.exit(1);
                            break;
                        case 404:
                            console.error();
                            console.error("WARNING:".yellow + " Member " + memberId + " was not found.");
                            break;
                        default:
                            console.log("error getting member " + memberId + ":", e_7);
                    }
                    return [3 /*break*/, 28];
                case 27:
                    pb.increment();
                    return [7 /*endfinally*/];
                case 28:
                    _h++;
                    return [3 /*break*/, 23];
                case 29:
                    /*************************************************************************
                     * Epics
                     */
                    pb.start(Object.keys(epics).length, 0, {});
                    pb.options.format = progressBarFormat("Fetching epics");
                    _j = [];
                    for (_k in epics)
                        _j.push(_k);
                    _l = 0;
                    _0.label = 30;
                case 30:
                    if (!(_l < _j.length)) return [3 /*break*/, 36];
                    epicId = _j[_l];
                    _0.label = 31;
                case 31:
                    _0.trys.push([31, 33, 34, 35]);
                    return [4 /*yield*/, workspace.getEpic(epicId)];
                case 32:
                    epic = _0.sent();
                    epic.project_ids.forEach(function (projectId) { return (projects[projectId] = true); });
                    return [3 /*break*/, 35];
                case 33:
                    e_8 = _0.sent();
                    switch ((_x = e_8 === null || e_8 === void 0 ? void 0 : e_8.response) === null || _x === void 0 ? void 0 : _x.status) {
                        case 401:
                            pb.stop();
                            console.error("ERROR:".red + " Cloud not fetch the member from Clubhouse: invalid token");
                            process.exit(1);
                            break;
                        case 404:
                            console.error();
                            console.error("WARNING:".yellow + " Member " + epicId + " was not found.");
                            break;
                        default:
                            console.log("error getting member " + epicId + ":", e_8);
                    }
                    return [3 /*break*/, 35];
                case 34:
                    pb.increment();
                    return [7 /*endfinally*/];
                case 35:
                    _l++;
                    return [3 /*break*/, 30];
                case 36:
                    /*************************************************************************
                     * Projects
                     */
                    pb.start(Object.keys(projects).length, 0, {});
                    pb.options.format = progressBarFormat("Fetching projects");
                    _m = [];
                    for (_o in projects)
                        _m.push(_o);
                    _p = 0;
                    _0.label = 37;
                case 37:
                    if (!(_p < _m.length)) return [3 /*break*/, 43];
                    projectId = _m[_p];
                    _0.label = 38;
                case 38:
                    _0.trys.push([38, 40, 41, 42]);
                    return [4 /*yield*/, workspace.getProject(projectId)];
                case 39:
                    _0.sent();
                    return [3 /*break*/, 42];
                case 40:
                    e_9 = _0.sent();
                    switch ((_y = e_9 === null || e_9 === void 0 ? void 0 : e_9.response) === null || _y === void 0 ? void 0 : _y.status) {
                        case 401:
                            pb.stop();
                            console.error("ERROR:".red + " Cloud not fetch the project from Clubhouse: invalid token");
                            process.exit(1);
                            break;
                        case 404:
                            console.error();
                            console.error("WARNING:".yellow + " Project " + projectId + " was not found.");
                            break;
                        default:
                            console.log("error getting project " + projectId + ":", e_9);
                    }
                    return [3 /*break*/, 42];
                case 41:
                    pb.increment();
                    return [7 /*endfinally*/];
                case 42:
                    _p++;
                    return [3 /*break*/, 37];
                case 43: return [3 /*break*/, 45];
                case 44:
                    pb.stop();
                    return [7 /*endfinally*/];
                case 45:
                    _t = {
                        workspace: workspace,
                        commits: commits
                    };
                    return [4 /*yield*/, Promise.all(Object.keys(stories).map(function (storyId) { return __awaiter(_this, void 0, void 0, function () {
                            var e_10;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, workspace.getStory(storyId)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                    case 2:
                                        e_10 = _a.sent();
                                        return [2 /*return*/, null];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 46:
                    obj = (_t.stories = (_0.sent()).filter(function (story) { return story !== null; }),
                        _t.groups = [],
                        _t);
                    renderGroup = render;
                    scriptFileName = path_1.default.join(process.cwd(), ".glogch.js");
                    if (!fs_1.default.existsSync(scriptFileName)) return [3 /*break*/, 50];
                    es = require(scriptFileName);
                    if (!es.default.render) return [3 /*break*/, 48];
                    return [4 /*yield*/, es.default.render(render)];
                case 47:
                    renderGroup = _0.sent();
                    _0.label = 48;
                case 48:
                    if (!es.default.classify) return [3 /*break*/, 50];
                    _q = obj;
                    return [4 /*yield*/, es.default.classify(obj)];
                case 49:
                    _q.groups = _0.sent();
                    _0.label = 50;
                case 50:
                    if (!((_z = obj.groups) === null || _z === void 0 ? void 0 : _z.length)) {
                        obj.groups = [];
                        if (!argv.ignoreStories) {
                            obj.groups.push({
                                title: "Stories",
                                render: obj.stories,
                            });
                        }
                        obj.groups.push({
                            title: "Commits",
                            render: obj.commits,
                        });
                    }
                    _r = 0, _s = obj.groups;
                    _0.label = 51;
                case 51:
                    if (!(_r < _s.length)) return [3 /*break*/, 54];
                    group = _s[_r];
                    return [4 /*yield*/, renderGroup(group, {
                            workspace: workspace,
                            level: 1,
                            ignoreStories: argv.ignoreStories,
                        })];
                case 52:
                    _0.sent();
                    _0.label = 53;
                case 53:
                    _r++;
                    return [3 /*break*/, 51];
                case 54: return [2 /*return*/, argv];
            }
        });
    }); });
}
exports.default = rootCommand;
//# sourceMappingURL=index.js.map