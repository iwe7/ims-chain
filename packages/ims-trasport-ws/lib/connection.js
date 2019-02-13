"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_transport_1 = require("ims-transport");
const ims_common_1 = require("ims-common");
const multiaddr = require("multiaddr");
const rurl = require("relative-url");
const map = { http: "ws", https: "wss" };
const def = "ws";
let WsConnection = class WsConnection extends ims_transport_1.Connection {
    constructor() {
        super();
    }
    getWs() {
        return "undefined" === typeof WebSocket ? require("ws") : WebSocket;
    }
    wsurl(url, location = {}) {
        return rurl(url, location, map, def);
    }
    connect(addr) {
        const loc = typeof window === "undefined"
            ? {
                protocol: "http",
                host: "127.0.0.1",
                pathname: "/"
            }
            : window.location;
        let remoteAddress = this.wsurl(addr, loc);
        const Ws = this.getWs();
        return new Ws(remoteAddress);
    }
};
WsConnection = tslib_1.__decorate([
    ims_common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], WsConnection);
exports.WsConnection = WsConnection;
