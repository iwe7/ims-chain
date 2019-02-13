"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
class TcpConnection extends core_1.Connection {
    constructor(conn, addrs) {
        super(conn);
        this.addrs = addrs;
    }
}
exports.TcpConnection = TcpConnection;
