"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HostAddress {
}
exports.HostAddress = HostAddress;
class HostManaager {
    constructor() {
        this.hostMap = new Map();
    }
    has(hash) {
        return this.hostMap.has(hash);
    }
    get(hash) {
        if (this.has(hash)) {
            return this.hostMap.get(hash);
        }
    }
    set(host) {
        this.hostMap.set(host.hash, host);
    }
}
exports.HostManaager = HostManaager;
class Host {
    get hash() {
        return this.addr.ip + this.addr.port;
    }
}
exports.Host = Host;
