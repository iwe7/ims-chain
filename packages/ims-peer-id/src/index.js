"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
const Id = require("peer-id");
function createPeerId() {
    return new Promise((resolve, reject) => {
        Id.create({ bits: 1024 }, (err, id) => {
            if (err) {
                reject(err);
            }
            resolve(id.toJSON());
        });
    });
}
exports.createPeerId = createPeerId;
exports.PeerId = ims_common_1.InjectionToken.fromString("peer_id");
let PeerIdModule = class PeerIdModule {
};
PeerIdModule = tslib_1.__decorate([
    ims_common_1.Module({
        providers: [
            {
                provide: exports.PeerId,
                useFactory: () => createPeerId()
            }
        ]
    })
], PeerIdModule);
exports.PeerIdModule = PeerIdModule;
