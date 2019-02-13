"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_transport_1 = require("ims-transport");
const net_1 = require("net");
const multiaddr = require("multiaddr");
class TcpListener extends ims_transport_1.Listener {
    constructor() {
        super();
        this.server = net_1.createServer((socket) => {
            console.log("socket");
        });
    }
    listen(addr) {
        return new Promise((resolve, reject) => {
            try {
                const multi = multiaddr(addr);
                const opt = multi.toOptions();
                this.server.listen(opt.port, opt.host, () => {
                    resolve();
                });
            }
            catch (e) {
                reject(e);
            }
        });
    }
}
exports.TcpListener = TcpListener;
