"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dns = require("dns");
class Dns {
    constructor(host) {
        this.host = host;
    }
    resolve(type = "A") {
        dns.resolve(this.host, type, (err, address) => {
            console.log({ err, address });
            debugger;
        });
    }
    lookup() {
        dns.lookup(this.host, (err, address, family) => {
            console.log({ err, address, family });
            debugger;
        });
    }
}
exports.Dns = Dns;
let d = new Dns("test");
d.resolve();
d.lookup();
