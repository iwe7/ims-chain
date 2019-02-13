/// <reference types="node" />
import { Multiaddr } from "ims-multiaddr";
import { EventEmitter } from "events";
import { CallBack } from "./interface";
export declare abstract class Listener extends EventEmitter {
    options: any;
    handler: any;
    constructor(options: any, handler: any);
    abstract close(options: any, callback: CallBack): void;
    abstract listen(ma: Multiaddr, callback: CallBack): any;
    abstract getAddrs(): Multiaddr[];
}
//# sourceMappingURL=listener.d.ts.map