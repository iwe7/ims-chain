"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Nat {
    constructor(name) {
        this.name = name;
        this.mappings = {};
    }
    newMapping(port) {
        return {
            routerIp: null,
            internalIp: null,
            internalPort: port,
            externalIp: null,
            externalPort: null,
            ttl: null,
            protocol: this.name,
            nonce: null,
            errInfo: null
        };
    }
    async addMapping(intPort, extPort, ttl) {
        ttl = !ttl ? 24 * 60 * 60 : ttl;
        let mapping = await this._addPortMapping(intPort, extPort, ttl);
        this.mappings[`${mapping.externalIp}:${mapping.externalPort}`] = mapping;
        return mapping;
    }
    async deleteMapping(mapping) {
        delete this.mappings[`${mapping.externalIp}:${mapping.externalPort}`];
        await this._removePortMapping(mapping.internalPort, mapping.externalPort);
    }
}
exports.Nat = Nat;
