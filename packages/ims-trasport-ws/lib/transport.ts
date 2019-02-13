import { Transport, Connection, Listener } from "ims-transport";
import { WsConnection } from "./connection";
import { WsListener } from "./listener";
import { Injector } from "ims-core";

export class WsTransport extends Transport {
  constructor(public injector: Injector) {
    super();
  }
  async connect(addr: string): Promise<Connection> {
    const ws = await this.injector.get<WsConnection>(WsConnection);
    ws.connect(addr);
    return ws;
  }
  async listen(addr: string): Promise<Listener> {
    const ws = await this.injector.get<WsListener>(WsListener);
    await ws.listen(addr);
    return ws;
  }
}
