"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
class ImsNode {
    constructor() {
        const nets = os.networkInterfaces();
        debugger;
        Object.keys(nets).map(key => {
            let net = nets[key];
            for (let n of net) {
                if (n.family === "IPv4" && !n.internal) {
                    this.ip = n.address;
                    this.mac = n.mac;
                }
            }
        });
    }
}
exports.ImsNode = ImsNode;
const node = new ImsNode();
debugger;
