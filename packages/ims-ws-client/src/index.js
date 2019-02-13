"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_core_1 = require("ims-core");
const ws_url_1 = require("./ws-url");
const web_socket_1 = require("./web-socket");
const ims_common_1 = require("ims-common");
exports.WsClientFactory = ims_core_1.InjectionToken.fromString("WsClientFactory");
exports.providers = [
    {
        provide: exports.WsClientFactory,
        useFactory: async (injector) => {
            const wsurl = await injector.get(ws_url_1.WsUrl);
            const WsSocket = await injector.get(web_socket_1.WebSocketToken);
            return (addr) => {
                const loc = typeof window === "undefined"
                    ? {
                        protocol: "http",
                        host: "127.0.0.1",
                        pathname: "/"
                    }
                    : window.location;
                let remoteAddress = wsurl(addr, loc);
                let socket = new WsSocket(remoteAddress);
                return socket;
            };
        }
    }
];
let WsClientModule = class WsClientModule {
};
WsClientModule = tslib_1.__decorate([
    ims_common_1.Module({
        providers: [...exports.providers, ...ws_url_1.providers, ...web_socket_1.providers]
    })
], WsClientModule);
exports.WsClientModule = WsClientModule;
var web_socket_2 = require("./web-socket");
exports.WebSocketToken = web_socket_2.WebSocketToken;
var ws_url_2 = require("./ws-url");
exports.WsUrl = ws_url_2.WsUrl;
