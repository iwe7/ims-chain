import { Connection } from "ims-transport";
import { connect, Socket } from "net";
import { Injectable, Type } from "ims-common";
const multiaddr = require("multiaddr");
const rurl = require("relative-url");
const map = { http: "ws", https: "wss" };
const def = "ws";

@Injectable()
export class WsConnection extends Connection {
  constructor() {
    super();
  }
  private getWs(): Type<WebSocket> {
    return "undefined" === typeof WebSocket ? require("ws") : WebSocket;
  }
  private wsurl(url: string, location: Location = {} as any) {
    return rurl(url, location, map, def);
  }
  connect(addr: string): any {
    const loc: Location =
      typeof window === "undefined"
        ? ({
            protocol: "http",
            host: "127.0.0.1",
            pathname: "/"
          } as Location)
        : window.location;
    let remoteAddress = this.wsurl(addr, loc);
    const Ws = this.getWs();
    return new Ws(remoteAddress);
  }
}
