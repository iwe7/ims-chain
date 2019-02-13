"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_transport_1 = require("ims-transport");
const connection_1 = require("./connection");
const listener_1 = require("./listener");
class WsTransport extends ims_transport_1.Transport {
    constructor(injector) {
        super();
        this.injector = injector;
    }
    async connect(addr) {
        const ws = await this.injector.get(connection_1.WsConnection);
        ws.connect(addr);
        return ws;
    }
    async listen(addr) {
        const ws = await this.injector.get(listener_1.WsListener);
        await ws.listen(addr);
        return ws;
    }
}
exports.WsTransport = WsTransport;
