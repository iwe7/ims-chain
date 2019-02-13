"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_core_1 = require("ims-core");
const ims_common_1 = require("ims-common");
const ims_multihash_1 = require("ims-multihash");
const cids = require("cids");
exports.CidFactory = ims_core_1.InjectionToken.fromString("cid");
let CidModule = class CidModule {
};
CidModule = tslib_1.__decorate([
    ims_common_1.Module({
        providers: [
            {
                provide: exports.CidFactory,
                useFactory: async (injector) => {
                    let multihash = await injector.get(ims_multihash_1.Multihash);
                    return (str) => {
                        if (typeof str === "string") {
                            let data = Buffer.from(str);
                            return new cids(multihash.digest(data));
                        }
                        else if (typeof str === "object") {
                            let data = Buffer.from(JSON.stringify(str));
                            return new cids(multihash.digest(data));
                        }
                        else {
                            return new cids(multihash.digest(str));
                        }
                    };
                }
            }
        ]
    })
], CidModule);
exports.CidModule = CidModule;
