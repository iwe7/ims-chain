/// <reference types="node" />
import { EventEmitter } from "events";
import net = require("net");
import { Multiaddr } from "ims-multiaddr";
export declare class Tcp extends EventEmitter {
    server: net.Server;
    constructor();
    close(options: any): void;
    listen(ma: Multiaddr): Promise<{}>;
}
//# sourceMappingURL=listener.d.ts.map