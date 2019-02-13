"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IPFS_CODE = 421;
const ip_address_1 = require("ip-address");
const multiaddr = require("multiaddr");
function getIpfsId(ma) {
    return ma.stringTuples().filter(tuple => {
        return tuple[0] === IPFS_CODE;
    })[0][1];
}
exports.getIpfsId = getIpfsId;
function getSocketMultiaddr(socket) {
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
exports.getSocketMultiaddr = getSocketMultiaddr;
