import { Listener } from "ims-transport";
const utp = require("utp-native");
import multiaddr = require("multiaddr");
import { Injectable } from 'ims-common';

@Injectable()
export class UtpListener extends Listener {
  server: any;
  constructor() {
    super();
    this.server = utp.createServer(socket => {
      // socket
    });
  }
  async listen(addr: string): Promise<void> {
    const multi = multiaddr(addr);
    const options = multi.toOptions();
    this.server.listen(options.port, options.host);
  }
}
