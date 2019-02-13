"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_nat_1 = require("ims-nat");
async function bootstrap() {
    let upnp = new ims_nat_1.NatUpnp();
    let natmapping = await upnp.addMapping(8088, 80, 0);
    console.log(natmapping);
    debugger;
}
bootstrap();
