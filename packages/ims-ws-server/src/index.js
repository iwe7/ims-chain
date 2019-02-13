"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const WebSocket = require("ws");
const events_1 = require("events");
const ims_http_1 = require("ims-http");
const ims_common_1 = require("ims-common");
let WsServer = class WsServer extends events_1.EventEmitter {
    constructor(server) {
        super();
        this.server = server;
        this.wsServer = new WebSocket.Server({
            server,
            perMessageDeflate: false
        });
        this.wsServer.on("connection", (socket) => {
            this.emit("connection", socket);
        });
        this.proxy("listening");
        this.proxy("request");
        this.proxy("close");
    }
    on(event, listener) {
        super.on(event, listener);
        return this;
    }
    address() {
        return this.server.address.bind(this.server)();
    }
    listen(addr, onListening) {
        if (onListening)
            this.once("listening", onListening);
        this.server.listen(addr.port || addr);
        return this;
    }
    close(onClose) {
        this.server.close(onClose);
        this.wsServer.close();
        return this;
    }
    proxy(event) {
        return this.server.on(event, (...args) => {
            this.emit(event, args);
        });
    }
};
WsServer = tslib_1.__decorate([
    ims_common_1.Injectable(),
    tslib_1.__param(0, ims_common_1.Inject(ims_http_1.HttpServer)),
    tslib_1.__metadata("design:paramtypes", [Object])
], WsServer);
exports.WsServer = WsServer;
let WsServerModule = class WsServerModule {
};
WsServerModule = tslib_1.__decorate([
    ims_common_1.Module({
        imports: [ims_http_1.HttpModule]
    })
], WsServerModule);
exports.WsServerModule = WsServerModule;
