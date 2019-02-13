"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PeerId = require("peer-id");
class ImsPeerInfo extends Set {
    constructor(peer) {
        super();
        this.peer = peer;
    }
    static async create() {
        const peer = await ImsPeer.create();
        return new ImsPeerInfo(peer);
    }
}
exports.ImsPeerInfo = ImsPeerInfo;
class ImsPeer {
    constructor(id, privKey, pubKey) {
        this.id = id;
        this.privKey = privKey;
        this.pubKey = pubKey;
    }
    static create() {
        return new Promise((resolve, reject) => {
            PeerId.create({ bits: 1024 }, (err, id) => {
                if (err)
                    reject(err);
                const peerId = id.toJSON();
                resolve(new ImsPeer(peerId.id, peerId.privKey, peerId.pubKey));
            });
        });
    }
}
exports.ImsPeer = ImsPeer;
