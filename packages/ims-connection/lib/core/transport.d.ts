import { Multiaddr } from "ims-multiaddr";
import { Listener } from "./listener";
import { Connection } from "./connection";
import { CallBack } from "./interface";
export declare abstract class Transport<O extends object = any> {
    abstract dial(ma: Multiaddr, options?: O, cb?: CallBack): Connection;
    abstract createListener(options: O, handler: Function): Listener;
    abstract filter(multiaddrs: Multiaddr[]): Multiaddr[];
}
//# sourceMappingURL=transport.d.ts.map