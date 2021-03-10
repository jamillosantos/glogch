"use strict";
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
exports.__esModule = true;
var clubhouse_lib_1 = require("clubhouse-lib");
var Workspace = /** @class */ (function () {
    function Workspace(token) {
        this.members = {};
        this.membersErr = {};
        this.projects = {};
        this.projectsErr = {};
        this.stories = {};
        this.storiesErr = {};
        this.epics = {};
        this.epicsErr = {};
        this.client = clubhouse_lib_1["default"].create(token);
    }
    Workspace.prototype.getMember = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var member, memberErr, member_1, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        member = this.members[id];
                        if (member) {
                            return [2 /*return*/, member];
                        }
                        memberErr = this.membersErr[id];
                        if (memberErr)
                            throw memberErr;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.getMember(id)];
                    case 2:
                        member_1 = _a.sent();
                        this.members[id] = member_1;
                        return [2 /*return*/, member_1];
                    case 3:
                        e_1 = _a.sent();
                        this.membersErr[id] = e_1;
                        throw e_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Workspace.prototype.getProject = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var project, project_1, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        project = this.projects[id];
                        if (project)
                            return [2 /*return*/, project];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.getProject(id)];
                    case 2:
                        project_1 = _a.sent();
                        delete this.projectsErr[id];
                        this.projects[id] = project_1;
                        return [2 /*return*/, project_1];
                    case 3:
                        e_2 = _a.sent();
                        this.projectsErr[id] = e_2;
                        throw e_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Workspace.prototype.getStory = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var story, storyErr, story_1, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        story = this.stories[id];
                        if (story) {
                            return [2 /*return*/, story];
                        }
                        storyErr = this.storiesErr[id];
                        if (storyErr) {
                            throw storyErr;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.getStory(id)];
                    case 2:
                        story_1 = (_a.sent());
                        this.stories[id] = story_1;
                        delete this.storiesErr[id];
                        return [2 /*return*/, story_1];
                    case 3:
                        e_3 = _a.sent();
                        this.storiesErr[id] = e_3;
                        throw e_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Workspace.prototype.getEpic = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var epic, epic_1, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        epic = this.epics[id];
                        if (epic) {
                            return [2 /*return*/, epic];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.getEpic(id)];
                    case 2:
                        epic_1 = _a.sent();
                        this.epics[id] = epic_1;
                        return [2 /*return*/, epic_1];
                    case 3:
                        e_4 = _a.sent();
                        this.epicsErr[id] = e_4;
                        throw e_4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Workspace;
}());
exports["default"] = Workspace;
