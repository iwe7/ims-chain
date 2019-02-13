import { Connection } from "ims-transport";
import utp = require("utp-native");
import multiaddr = require("multiaddr");
import { Injectable } from 'ims-common';

@Injectable()
export class UtpConnection extends Connection {
  connect(addr: string): any {
    const multi = multiaddr(addr);
    const options = multi.toOptions();
    return utp.connect(options);
  }
}
