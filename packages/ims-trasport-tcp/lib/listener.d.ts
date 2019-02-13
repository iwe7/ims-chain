/// <reference types="node" />
import { Listener } from "ims-transport";
import { Server } from "net";
export declare class TcpListener extends Listener {
    server: Server;
    constructor();
    listen(addr: string): Promise<void>;
}
//# sourceMappingURL=listener.d.ts.map