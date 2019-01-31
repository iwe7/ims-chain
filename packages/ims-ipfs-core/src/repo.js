"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
let Repo = class Repo {
    init() { }
    version() { }
    gc() { }
    stat() { }
    path() { }
};
Repo = tslib_1.__decorate([
    ims_common_1.Injectable()
], Repo);
exports.Repo = Repo;
