"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_core_1 = require("ims-core");
const ims_common_1 = require("ims-common");
const ims_peer_id_1 = require("ims-peer-id");
const ims_cid_1 = require("ims-cid");
exports.Openid = ims_core_1.InjectionToken.fromString("openid");
let OpenidModule = class OpenidModule {
};
OpenidModule = tslib_1.__decorate([
    ims_common_1.Module({
        providers: [
            {
                provide: exports.Openid,
                useFactory: async (injector) => {
                    let peerId = await injector.get(ims_peer_id_1.PeerId);
                    let cidFact = await injector.get(ims_cid_1.CidFactory);
                    let pubKey = peerId.pubKey;
                    return cidFact({
                        pubKey,
                        ip: "127.0.0.1",
                        port: 3000
                    }).toString();
                }
            }
        ],
        imports: [ims_cid_1.CidModule, ims_peer_id_1.PeerIdModule]
    })
], OpenidModule);
exports.OpenidModule = OpenidModule;
