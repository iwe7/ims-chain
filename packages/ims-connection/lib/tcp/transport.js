"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const net = require("net");
const listener_1 = require("./listener");
const toPull = require("stream-to-pull-stream");
const mafmt = require("mafmt");
const connection_1 = require("./connection");
class TcpTransport extends core_1.Transport {
    dial(ma, options, cb) {
        const cOpts = ma.toOptions();
        const rawSocket = net.connect(cOpts);
        rawSocket.once("timeout", () => {
            rawSocket.emit("error", new Error("Timeout"));
        });
        rawSocket.once("error", cb);
        rawSocket.once("connect", () => {
            rawSocket.removeListener("error", cb);
            cb();
        });
        const socket = toPull.duplex(rawSocket);
        return new connection_1.TcpConnection(socket, [ma]);
    }
    createListener(options, handler) {
        return new listener_1.TcpListener(options, handler);
    }
    filter(multiaddrs) {
        return multiaddrs.filter(ma => {
            if (ma.protoNames().includes("p2p-circuit")) {
                return false;
            }
            if (ma.protoNames().includes("ipfs")) {
                ma = ma.decapsulate("ipfs");
            }
            return mafmt.TCP.matches(ma);
        });
    }
}
exports.TcpTransport = TcpTransport;
