"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_transport_1 = require("ims-transport");
const connection_1 = require("./connection");
const listener_1 = require("./listener");
class SpdyTransport extends ims_transport_1.Transport {
    constructor(injector) {
        super();
        this.injector = injector;
    }
    async connect(addr) {
        const spdy = await this.injector.get(connection_1.SpdyConnection);
        spdy.connect(addr);
        return spdy;
    }
    async listen(addr) {
        const spdy = await this.injector.get(listener_1.SpdyListener);
        spdy.listen(addr);
        return spdy;
    }
}
exports.SpdyTransport = SpdyTransport;
