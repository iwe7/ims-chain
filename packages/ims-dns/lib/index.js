"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
const dgram = require("dgram");
const ims_web_1 = require("ims-web");
let ImsDnsModule = class ImsDnsModule {
};
ImsDnsModule = tslib_1.__decorate([
    ims_common_1.Module({
        providers: [{
                provide: ims_common_1.AppInitialization,
                useFactory: async (injector) => {
                    const server = dgram.createSocket('udp4');
                    const ipfs = await injector.get(ims_web_1.ImsIpfs);
                    const dnsKey = await ipfs.key.get('dns');
                    const dnsId = dnsKey.id;
                    try {
                        const address = await ipfs.name.resolve(`/ipns/${dnsId}`);
                        let dns = await ipfs.object.get(address);
                        dns = dns || {};
                    }
                    catch (e) { }
                }
            }],
        imports: []
    })
], ImsDnsModule);
exports.ImsDnsModule = ImsDnsModule;
ims_common_1.bootstrapModule(ImsDnsModule);
