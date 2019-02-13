"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const net = require("net");
const get_multiaddr_1 = require("./get-multiaddr");
const CLOSE_TIMEOUT = 2000;
function noop() { }
let ipfsId;
let listeningAddr;
class Tcp extends events_1.EventEmitter {
    constructor() {
        super();
        this.server = net.createServer(socket => {
            socket.on("error", noop);
            const addr = get_multiaddr_1.getMultiaddr(socket);
            this.emit("connection", { socket, addr });
        });
        this.server.on("listening", () => this.emit("listening"));
        this.server.on("error", err => this.emit("error", err));
        this.server.on("close", () => this.emit("close"));
    }
    close(options) {
        const timeout = setTimeout(() => {
        }, options.timeout || CLOSE_TIMEOUT);
        this.server.close();
        this.server.once("close", () => {
            clearTimeout(timeout);
        });
    }
    listen(ma) {
        return new Promise((resolve, reject) => {
            let listeningAddr = ma;
            if (ma.protoNames().includes("ipfs")) {
                ipfsId = getIpfsId(ma);
                listeningAddr = ma.decapsulate("ipfs");
            }
            const lOpts = listeningAddr.toOptions();
            this.server.listen(lOpts.port, lOpts.host, err => {
                if (err)
                    return reject(err);
                resolve(ma);
            });
        });
    }
}
exports.Tcp = Tcp;
const IPFS_CODE = 421;
function getIpfsId(ma) {
    return ma.stringTuples().filter(tuple => {
        return tuple[0] === IPFS_CODE;
    })[0][1];
}
