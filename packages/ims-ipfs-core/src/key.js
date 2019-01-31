"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
let Key = class Key {
    gen() { }
    info() { }
    list() { }
    rm() { }
    rename() { }
    import() { }
    export() { }
};
Key = tslib_1.__decorate([
    ims_common_1.Injectable()
], Key);
exports.Key = Key;
