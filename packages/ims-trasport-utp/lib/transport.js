"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_transport_1 = require("ims-transport");
const connection_1 = require("./connection");
const listener_1 = require("./listener");
class UtpTransport extends ims_transport_1.Transport {
    constructor(injector) {
        super();
        this.injector = injector;
    }
    async connect(addr) {
        const utp = await this.injector.get(connection_1.UtpConnection);
        utp.connect(addr);
        return utp;
    }
    async listen(addr) {
        const utp = await this.injector.get(listener_1.UtpListener);
        utp.listen(addr);
        return utp;
    }
}
exports.UtpTransport = UtpTransport;
