import { Transport, Connection, Listener } from "ims-transport";
import { TcpConnection } from "./connection";
import { TcpListener } from "./listener";

export class TcpTransport extends Transport {
  constructor() {
    super();
  }
  async connect(addr: string): Promise<Connection> {
    const tcp = new TcpConnection();
    tcp.connect(addr);
    return tcp;
  }
  async listen(addr: string): Promise<Listener> {
    const tcp = new TcpListener();
    tcp.listen(addr);
    return tcp;
  }
}
