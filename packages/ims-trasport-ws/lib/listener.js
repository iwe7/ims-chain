"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_transport_1 = require("ims-transport");
const multiaddr = require("multiaddr");
const ws_1 = require("ws");
const ims_common_1 = require("ims-common");
const ims_http_1 = require("ims-http");
let WsListener = class WsListener extends ims_transport_1.Listener {
    constructor(server) {
        super();
        this.server = server;
        this.wsServer = new ws_1.Server({
            server: this.server,
            perMessageDeflate: false
        });
    }
    async listen(addr) {
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
};
WsListener = tslib_1.__decorate([
    ims_common_1.Injectable(),
    tslib_1.__param(0, ims_common_1.Inject(ims_http_1.HttpServer)),
    tslib_1.__metadata("design:paramtypes", [Object])
], WsListener);
exports.WsListener = WsListener;
