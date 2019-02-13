import { Transport, Listener, Connection } from "ims-transport";
import { Injector } from "ims-core";
import { UtpConnection } from "./connection";
import { UtpListener } from "./listener";

export class UtpTransport extends Transport {
  constructor(public injector: Injector) {
    super();
  }
  async connect(addr: string): Promise<Connection> {
    const utp = await this.injector.get(UtpConnection);
    utp.connect(addr);
    return utp;
  }
  async listen(addr: string): Promise<Listener> {
    const utp = await this.injector.get(UtpListener);
    utp.listen(addr);
    return utp;
  }
}
