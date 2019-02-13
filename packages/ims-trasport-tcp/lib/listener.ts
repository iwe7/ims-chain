import { Listener } from "ims-transport";
import { createServer, Server, Socket } from "net";
const multiaddr = require("multiaddr");
export class TcpListener extends Listener {
  server: Server;
  constructor() {
    super();
    this.server = createServer((socket: Socket) => {
      // 监听链接
      console.log("socket");
    });
  }
  listen(addr: string): Promise<void> {
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
