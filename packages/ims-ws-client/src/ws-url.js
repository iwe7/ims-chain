"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_core_1 = require("ims-core");
const rurl = require("relative-url");
const map = { http: "ws", https: "wss" };
const def = "ws";
exports.WsUrl = ims_core_1.InjectionToken.fromString("WsUrl");
exports.providers = [
    {
        provide: exports.WsUrl,
        useFactory: () => {
            return (url, location = {}) => rurl(url, location, map, def);
        }
    }
];
