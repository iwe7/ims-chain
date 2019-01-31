"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
let Swarm = class Swarm {
    peers() { }
    addrs() { }
    localAddrs() { }
    connect() { }
    disconnect() { }
    filters() { }
};
Swarm = tslib_1.__decorate([
    ims_common_1.Injectable()
], Swarm);
exports.Swarm = Swarm;
