import { Listener } from "ims-transport";
const multiaddr = require("multiaddr");
import { Server } from "ws";
import http = require("http");
import https = require("https");
import { Inject, Injectable } from "ims-common";
import { HttpServer } from "ims-http";

export type HttpServer = http.Server | https.Server;

@Injectable()
export class WsListener extends Listener {
  wsServer: Server;
  constructor(@Inject(HttpServer) public server?: HttpServer) {
    super();
    this.wsServer = new Server({
      server: this.server,
      perMessageDeflate: false
    });
  }
  async listen(addr: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const multi = multiaddr(addr);
        const opt: TcpOptions = multi.toOptions();
        this.server.listen(opt.port, opt.host, () => {
          resolve();
        });
      } catch (e) {
        reject(e);
      }
    });
  }
}

interface TcpOptions {
  family: number;
  host: string;
  transport: string;
  port: number;
}
