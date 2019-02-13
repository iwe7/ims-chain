"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
const ims_openid_1 = require("ims-openid");
let Dns = class Dns {
    constructor(openind) {
        this.openind = openind;
        this.dnsCache = new Map();
    }
    async resolve(hash) {
        if (this.dnsCache.has(hash)) {
            return this.dnsCache.get(hash);
        }
    }
};
Dns = tslib_1.__decorate([
    ims_common_1.Injectable(),
    tslib_1.__param(0, ims_common_1.Inject(ims_openid_1.Openid)),
    tslib_1.__metadata("design:paramtypes", [String])
], Dns);
exports.Dns = Dns;
let ModuleTest = class ModuleTest {
};
ModuleTest = tslib_1.__decorate([
    ims_common_1.Module({
        imports: [ims_openid_1.OpenidModule]
    })
], ModuleTest);
exports.ModuleTest = ModuleTest;
ims_common_1.bootstrapModule(ModuleTest).then(async (res) => {
    let dns = await res.injector.get(Dns);
    debugger;
});
