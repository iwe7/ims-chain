import { Transport, Connection, Listener } from "ims-transport";
import { Injector } from "ims-core";
import { SpdyConnection } from "./connection";
import { SpdyListener } from "./listener";

export class SpdyTransport extends Transport {
  constructor(public injector: Injector) {
    super();
  }
  async connect(addr: string): Promise<Connection> {
    const spdy = await this.injector.get(SpdyConnection);
    spdy.connect(addr);
    return spdy;
  }
  async listen(addr: string): Promise<Listener> {
    const spdy = await this.injector.get(SpdyListener);
    spdy.listen(addr);
    return spdy;
  }
}
