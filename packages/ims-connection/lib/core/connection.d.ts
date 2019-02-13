import { CallBack } from "./interface";
import { Multiaddr } from "ims-multiaddr";
export interface IConnection {
    source: any;
    sink: any;
    resolve: any;
}
export declare abstract class Connection<C extends IConnection = any> {
    private conn;
    addrs: Multiaddr[];
    peerInfo: any;
    constructor(conn: C);
    readonly source: any;
    readonly sink: any;
    getObservedAddrs(cb?: CallBack<Multiaddr[]>): any;
}
//# sourceMappingURL=connection.d.ts.map