"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_discovery_1 = require("ims-discovery");
const multicastDNS = require("multicast-dns");
class MulticastDNS extends ims_discovery_1.Discovery {
    constructor(options) {
        super();
    }
    start() { }
    stop() { }
}
MulticastDNS.tag = "mdns";
exports.MulticastDNS = MulticastDNS;
