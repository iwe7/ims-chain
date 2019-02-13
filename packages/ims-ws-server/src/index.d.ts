/// <reference types="node" />
import WebSocket = require("ws");
import { EventEmitter } from "events";
import { HttpServer } from "ims-http";
export declare class WsServer extends EventEmitter {
    server: HttpServer;
    wsServer: WebSocket.Server;
    constructor(server: HttpServer);
    on(event: "listening", listener: (...args: any[]) => void): this;
    on(event: "request", listener: (...args: any[]) => void): this;
    on(event: "close", listener: (...args: any[]) => void): this;
    on(event: "connection", listener: (socket: WebSocket) => void): this;
    address(): any;
    listen(addr: any, onListening?: (...args: any[]) => any): this;
    close(onClose?: Function): this;
    private proxy;
}
export declare class WsServerModule {
}
//# sourceMappingURL=index.d.ts.map