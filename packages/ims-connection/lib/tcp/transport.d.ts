import { Transport, Connection, Listener, CallBack } from "../core";
import { Multiaddr } from "ims-multiaddr";
import { TcpOptions } from "./listener";
export declare class TcpTransport extends Transport<TcpOptions> {
    dial(ma: Multiaddr, options?: TcpOptions, cb?: CallBack): Connection;
    createListener(options: TcpOptions, handler: Function): Listener;
    filter(multiaddrs: Multiaddr[]): Multiaddr[];
}
//# sourceMappingURL=transport.d.ts.map