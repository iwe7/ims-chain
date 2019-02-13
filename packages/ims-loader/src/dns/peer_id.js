"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Id = require("peer-id");
const ims_common_1 = require("ims-common");
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
exports.PeerIdProviders = [
    {
        provide: exports.PeerId,
        useFactory: () => createPeerId()
    }
];
