/// <reference types="node" />
import { Listener } from "ims-transport";
import { Server } from "ws";
import http = require("http");
import https = require("https");
import { HttpServer } from "ims-http";
export declare type HttpServer = http.Server | https.Server;
export declare class WsListener extends Listener {
    server?: HttpServer;
    wsServer: Server;
    constructor(server?: HttpServer);
    listen(addr: string): Promise<void>;
}
//# sourceMappingURL=listener.d.ts.map