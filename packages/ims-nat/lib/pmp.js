"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const natPmp = require("nat-pmp");
const util = require("./util");
class NatPMP extends base_1.Nat {
    constructor() {
        super("nat-pmp");
    }
    async _addPortMapping(intPort, extPort, ttl) {
        const activeIf = await util.getActiveInterface();
        const client = natPmp.connect(activeIf.gateway_ip);
        const mapping = this.newMapping(intPort);
        mapping.routerIp = activeIf.gateway_ip;
        mapping.externalIp = (await util.externalIp(client)).ip.join(".");
        const info = await util.portMapping(client, intPort, extPort, ttl);
        mapping.externalPort = info.public;
        mapping.internalPort = info.private;
        mapping.internalIp = activeIf.ip_address;
        mapping.ttl = info.ttl;
        client.close();
        return mapping;
    }
    async _removePortMapping(intPort, extPort) {
        let routerIp = await util.getGatewayIp();
        const client = natPmp.connect(routerIp);
        let info = await util.portUnmapping(client, intPort, extPort);
        return info;
    }
}
exports.NatPMP = NatPMP;
