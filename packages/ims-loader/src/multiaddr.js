"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multiaddr = require("multiaddr");
class Multiaddr {
    constructor(address) {
        this.address = address;
        this.addr = multiaddr(address);
    }
    get tuples() {
        return this.addr.tuples();
    }
    get protoNames() {
        return this.addr.protoNames();
    }
    get protoCodes() {
        return this.addr.protoCodes();
    }
    get protos() {
        return this.addr.protos();
    }
    get options() {
        return this.addr.toOptions();
    }
    get value() {
        return this.addr.toString();
    }
    get stringTuples() {
        return this.addr.stringTuples();
    }
    get peerId() {
        return this.addr.getPeerId();
    }
    get nodeAddress() {
        return this.addr.nodeAddress();
    }
    fromStupidString(str) {
        return this.addr.fromStupidString();
    }
    isThinWaistAddress(addr) {
        return this.addr.isThinWaistAddress(addr);
    }
    equals(addr) {
        return this.addr.equals(addr);
    }
    encapsulate(addr) {
        return this.addr.encapsulate(addr);
    }
    decapsulate(addr) {
        return this.addr.decapsulate(addr);
    }
}
exports.Multiaddr = Multiaddr;
