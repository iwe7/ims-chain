"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_core_1 = require("ims-core");
exports.WebSocketToken = ims_core_1.InjectionToken.fromString("WebSocket");
exports.providers = [
    {
        provide: exports.WebSocketToken,
        useFactory: () => {
            return "undefined" === typeof WebSocket ? require("ws") : WebSocket;
        }
    }
];
