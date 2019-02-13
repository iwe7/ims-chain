"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const util = require("./util");
const natUpnp = require("nat-upnp");
class NatUpnp extends base_1.Nat {
    constructor() {
        super("upnp");
    }
    async _addPortMapping(intPort, extPort, ttl) {
        const activeIf = await util.getActiveInterface();
        const client = natUpnp.createClient();
        const mapping = this.newMapping(intPort);
        let ip = await util.externalIp(client);
        mapping.externalIp = ip;
        await util.portMapping(client, intPort, extPort, ttl);
        mapping.externalPort = extPort;
        mapping.internalPort = intPort;
        mapping.ttl = ttl;
        mapping.internalIp = activeIf.ip_address;
        client.close();
        return mapping;
    }
    async _removePortMapping(intPort, extPort) {
        const client = natUpnp.createClient();
        await util.portUnmapping(client, intPort, extPort);
        client.close();
        return;
    }
}
exports.NatUpnp = NatUpnp;
