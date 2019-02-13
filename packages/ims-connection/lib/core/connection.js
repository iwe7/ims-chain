"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Connection {
    constructor(conn) {
        this.conn = conn;
    }
    get source() {
        return this.conn.source;
    }
    get sink() {
        return this.conn.sink;
    }
    getObservedAddrs(cb) {
        if (cb)
            return cb(null, this.addrs);
        return this.addrs;
    }
}
exports.Connection = Connection;
