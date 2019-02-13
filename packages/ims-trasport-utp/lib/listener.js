"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_transport_1 = require("ims-transport");
const utp = require("utp-native");
const multiaddr = require("multiaddr");
const ims_common_1 = require("ims-common");
let UtpListener = class UtpListener extends ims_transport_1.Listener {
    constructor() {
        super();
        this.server = utp.createServer(socket => {
        });
    }
    async listen(addr) {
        const multi = multiaddr(addr);
        const options = multi.toOptions();
        this.server.listen(options.port, options.host);
    }
};
UtpListener = tslib_1.__decorate([
    ims_common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], UtpListener);
exports.UtpListener = UtpListener;
