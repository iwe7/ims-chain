"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
const multihashing = require("multihashing");
let Multihash = class Multihash {
    constructor() { }
    digest(buf, codec = "sha2-256") {
        return multihashing(buf, codec);
    }
};
Multihash = tslib_1.__decorate([
    ims_common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], Multihash);
exports.Multihash = Multihash;
