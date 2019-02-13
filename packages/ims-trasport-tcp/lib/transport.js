"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_transport_1 = require("ims-transport");
const connection_1 = require("./connection");
const listener_1 = require("./listener");
class TcpTransport extends ims_transport_1.Transport {
    constructor() {
        super();
    }
    async connect(addr) {
        const tcp = new connection_1.TcpConnection();
        tcp.connect(addr);
        return tcp;
    }
    async listen(addr) {
        const tcp = new listener_1.TcpListener();
        tcp.listen(addr);
        return tcp;
    }
}
exports.TcpTransport = TcpTransport;
