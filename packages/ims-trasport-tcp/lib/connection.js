"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_transport_1 = require("ims-transport");
const net_1 = require("net");
const multiaddr = require("multiaddr");
class TcpConnection extends ims_transport_1.Connection {
    constructor() {
        super();
    }
    connect(addr) {
        const multi = multiaddr(addr);
        const options = multi.toOptions();
        const socket = net_1.connect(options);
        return socket;
    }
}
exports.TcpConnection = TcpConnection;
