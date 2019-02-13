"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_transport_1 = require("ims-transport");
const utp = require("utp-native");
const multiaddr = require("multiaddr");
const ims_common_1 = require("ims-common");
let UtpConnection = class UtpConnection extends ims_transport_1.Connection {
    connect(addr) {
        const multi = multiaddr(addr);
        const options = multi.toOptions();
        return utp.connect(options);
    }
};
UtpConnection = tslib_1.__decorate([
    ims_common_1.Injectable()
], UtpConnection);
exports.UtpConnection = UtpConnection;
