"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
const multiaddr = require("multiaddr");
class Multiaddr {
}
exports.Multiaddr = Multiaddr;
exports.MultiaddrFactory = ims_common_1.InjectionToken.fromString("MultiaddrFactory");
let MultiaddrModule = class MultiaddrModule {
};
MultiaddrModule = tslib_1.__decorate([
    ims_common_1.Module({
        providers: [
            {
                provide: exports.MultiaddrFactory,
                useFactory: () => {
                    return (address) => {
                        return multiaddr(address);
                    };
                }
            }
        ]
    })
], MultiaddrModule);
exports.MultiaddrModule = MultiaddrModule;
