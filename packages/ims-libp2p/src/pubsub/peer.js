"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Peer {
    constructor(info) {
        this.info = info;
        this.topics = new Set();
        this._references = 0;
    }
    get isConnected() {
        return !!this.conn;
    }
    get isWritable() {
        return !!this.stream;
    }
    write(msg) {
        if (!this.isWritable) {
            const id = this.info.id.toB58String();
            throw new Error("No writable connection to " + id);
        }
        this.stream.push(msg);
    }
}
exports.Peer = Peer;
