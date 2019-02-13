import { EventEmitter } from "events";
import net = require("net");
import { getMultiaddr } from "./get-multiaddr";
import { Multiaddr } from "ims-multiaddr";
const CLOSE_TIMEOUT = 2000;
function noop() {}
let ipfsId;
let listeningAddr;
export class Tcp extends EventEmitter {
  server: net.Server;
  constructor() {
    super();
    this.server = net.createServer(socket => {
      socket.on("error", noop);
      const addr = getMultiaddr(socket);
      this.emit("connection", { socket, addr });
    });
    this.server.on("listening", () => this.emit("listening"));
    this.server.on("error", err => this.emit("error", err));
    this.server.on("close", () => this.emit("close"));
  }

  close(options: any) {
    const timeout = setTimeout(() => {
      // todo
    }, options.timeout || CLOSE_TIMEOUT);
    this.server.close();
    this.server.once("close", () => {
      clearTimeout(timeout);
    });
  }

  listen(ma: Multiaddr) {
    return new Promise((resolve, reject) => {
      let listeningAddr: Multiaddr = ma;
      if (ma.protoNames().includes("ipfs")) {
        ipfsId = getIpfsId(ma);
        listeningAddr = ma.decapsulate("ipfs");
      }
      const lOpts = listeningAddr.toOptions();
      this.server.listen(lOpts.port, lOpts.host, err => {
        if (err) return reject(err);
        resolve(ma);
      });
    });
  }
}
const IPFS_CODE = 421;
function getIpfsId(ma) {
  return ma.stringTuples().filter(tuple => {
    return tuple[0] === IPFS_CODE;
  })[0][1];
}
