"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tokens_1 = require("../tokens");
const ims_proxy_1 = require("ims-proxy");
exports.proxy = {
    provide: tokens_1.Commands,
    useFactory: async (injector) => {
        let commander = await injector.get(tokens_1.Commander);
        return commander.command("proxy").action(() => {
            console.log("proxy");
            ims_proxy_1.bootstrap();
        });
    }
};
