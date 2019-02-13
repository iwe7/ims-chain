import { CallBack } from "./interface";
import { Multiaddr } from "ims-multiaddr";

export interface IConnection {
  source: any;
  sink: any;
  resolve: any;
}
/**
 * 链接 拨号返回链接
 */
export abstract class Connection<C extends IConnection = any> {
  public addrs: Multiaddr[];
  public peerInfo: any;

  constructor(private conn: C) {}

  get source() {
    return this.conn.source;
  }

  get sink() {
    return this.conn.sink;
  }

  getObservedAddrs(cb?: CallBack<Multiaddr[]>) {
    if (cb) return cb(null, this.addrs);
    return this.addrs;
  }
}
