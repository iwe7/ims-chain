"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_nat_1 = require("ims-nat");
async function bootstrap() {
    const manager = new ims_nat_1.NatManager();
    let mapping = await manager.addMapping(80, 80, 60000);
    debugger;
}
bootstrap();
