/// <reference types="node" />
import { Listener, CallBack } from "../core";
import { Multiaddr } from "ims-multiaddr";
import { Server } from "net";
export interface TcpOptions {
    timeout?: number;
}
export declare class TcpListener extends Listener {
    server: Server;
    constructor(options: TcpOptions, handler: any);
    close(options: TcpOptions, callback: CallBack): void;
    ipfsId: any;
    listen(ma: Multiaddr, callback: CallBack): Server;
    getAddrs(): Multiaddr[];
}
//# sourceMappingURL=listener.d.ts.map