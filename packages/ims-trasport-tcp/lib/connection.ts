import { Connection } from "ims-transport";
import { connect, Socket } from "net";
const multiaddr = require("multiaddr");

export class TcpConnection extends Connection {
  constructor() {
    super();
  }
  connect(addr: string): Socket {
    const multi = multiaddr(addr);
    const options = multi.toOptions();
    const socket = connect(options);
    return socket;
  }
}
