"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_nat_1 = require("ims-nat");
const ims_close_port_1 = require("ims-close-port");
async function bootstrap() {
    await ims_close_port_1.close(80);
    await ims_close_port_1.close(443);
    const manager = new ims_nat_1.NatManager();
    await manager.addMapping(80, 80, 0);
    await manager.addMapping(443, 443, 0);
}
exports.bootstrap = bootstrap;
