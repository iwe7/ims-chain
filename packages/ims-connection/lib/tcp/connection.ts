import { Connection } from "../core";
import { Multiaddr } from "ims-multiaddr";

export class TcpConnection extends Connection {
  constructor(conn: any, addrs: Multiaddr[]) {
    super(conn);
    this.addrs = addrs;
  }
}
