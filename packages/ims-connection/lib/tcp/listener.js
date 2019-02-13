"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const net_1 = require("net");
const multiaddr = require("multiaddr");
const ip_address_1 = require("ip-address");
const connection_1 = require("./connection");
const toPull = require("stream-to-pull-stream");
function noop() { }
const CLOSE_TIMEOUT = 2000;
class TcpListener extends core_1.Listener {
    constructor(options, handler) {
        super(options, handler);
        this.server = net_1.createServer(socket => {
            socket.on("error", noop);
            let addr = getMultiaddr(socket);
            const s = toPull.duplex(socket);
            trackSocket(this.server, socket);
            const conn = new connection_1.TcpConnection(s, [addr]);
            handler(conn);
            this.emit("connection", conn);
        });
        this.server["__connections"] = {};
        this.server.on("listening", () => this.emit("listening"));
        this.server.on("error", err => this.emit("error", err));
        this.server.on("close", () => this.emit("close"));
    }
    close(options = {}, callback) {
        const timeout = setTimeout(() => {
            Object.keys(this.server["__connections"]).forEach(key => {
                this.server["__connections"][key].destroy();
            });
        }, options.timeout || CLOSE_TIMEOUT);
        this.server.close(callback);
        this.server.once("close", () => {
            clearTimeout(timeout);
        });
    }
    listen(ma, callback) {
        let listeningAddr = ma;
        if (ma.protoNames().includes("ipfs")) {
            this.ipfsId = getIpfsId(ma);
            listeningAddr = ma.decapsulate("ipfs");
        }
        const lOpts = listeningAddr.toOptions();
        return this.server.listen(lOpts.port, lOpts.host, callback);
    }
    getAddrs() {
        const multiaddrs = [];
        const address = this.server.address();
        return [];
    }
}
exports.TcpListener = TcpListener;
function getMultiaddr(socket) {
    let ma;
    try {
        if (socket.remoteFamily === "IPv6") {
            const addr = new ip_address_1.Address6(socket.remoteAddress);
            if (addr.v4) {
                const ip4 = addr.to4().correctForm();
                ma = multiaddr("/ip4/" + ip4 + "/tcp/" + socket.remotePort);
            }
            else {
                ma = multiaddr("/ip6/" + socket.remoteAddress + "/tcp/" + socket.remotePort);
            }
        }
        else {
            ma = multiaddr("/ip4/" + socket.remoteAddress + "/tcp/" + socket.remotePort);
        }
    }
    catch (err) { }
    return ma;
}
function trackSocket(server, socket) {
    const key = `${socket.remoteAddress}:${socket.remotePort}`;
    server[`__connections`][key] = socket;
    socket.on("close", () => {
        delete server["__connections"][key];
    });
}
const IPFS_CODE = 421;
function getIpfsId(ma) {
    return ma.stringTuples().filter(tuple => {
        return tuple[0] === IPFS_CODE;
    })[0][1];
}
