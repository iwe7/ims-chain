"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defer = require("pull-defer/duplex");
class Transport {
}
exports.Transport = Transport;
class Listener {
}
exports.Listener = Listener;
class Connection {
    constructor(conn, info) {
        this.peerInfo = null;
        this.conn = defer();
        if (conn) {
            this.setInnerConn(conn, info);
        }
        else if (info) {
            this.info = info;
        }
    }
    get source() {
        return this.conn.source;
    }
    get sink() {
        return this.conn.sink;
    }
    getPeerInfo() {
        if (this.info && this.info.getPeerInfo) {
            return this.info.getPeerInfo();
        }
        if (!this.peerInfo) {
            throw new Error("Peer Info not set yet");
        }
        return this.peerInfo;
    }
    setPeerInfo(info) {
        if (this.info && this.info.setPeerInfo) {
            return this.info.setPeerInfo(info);
        }
        this.peerInfo = info;
    }
    getObservedAddrs(cb) {
        if (this.info && this.info.getObservedAddrs) {
            return this.info.getObservedAddrs();
        }
        return cb(null, []);
    }
    setInnerConn(conn, info) {
        this.conn.resolve(conn);
        if (info) {
            this.info = info;
        }
        else {
            this.info = conn;
        }
    }
}
exports.Connection = Connection;
