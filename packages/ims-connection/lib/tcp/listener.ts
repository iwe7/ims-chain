import { Listener, CallBack } from "../core";
import { Multiaddr } from "ims-multiaddr";
import { createServer, Server, Socket } from "net";
const multiaddr = require("multiaddr");
import { Address6 } from "ip-address";
import { TcpConnection } from "./connection";
const toPull = require("stream-to-pull-stream");
function noop() {}
const CLOSE_TIMEOUT = 2000;
export interface TcpOptions {
  timeout?: number;
}
export class TcpListener extends Listener {
  server: Server;
  constructor(options: TcpOptions, handler: any) {
    super(options, handler);
    this.server = createServer(socket => {
      socket.on("error", noop);
      let addr = getMultiaddr(socket);
      const s = toPull.duplex(socket);
      trackSocket(this.server, socket);
      const conn = new TcpConnection(s, [addr]);
      handler(conn);
      this.emit("connection", conn);
    });
    this.server["__connections"] = {};
    this.server.on("listening", () => this.emit("listening"));
    this.server.on("error", err => this.emit("error", err));
    this.server.on("close", () => this.emit("close"));
  }
  close(options: TcpOptions = {}, callback: CallBack): void {
    const timeout = setTimeout(() => {
      Object.keys(this.server["__connections"]).forEach(key => {
        this.server["__connections"][key].destroy();
      });
    }, options.timeout || CLOSE_TIMEOUT);
    this.server.close(callback);
    this.server.once("close", () => {
      clearTimeout(timeout);
    });
  }
  ipfsId: any;
  listen(ma: Multiaddr, callback: CallBack): Server {
    let listeningAddr = ma;
    if (ma.protoNames().includes("ipfs")) {
      this.ipfsId = getIpfsId(ma);
      listeningAddr = ma.decapsulate("ipfs");
    }
    const lOpts = listeningAddr.toOptions();
    return this.server.listen(lOpts.port, lOpts.host, callback);
  }
  getAddrs(): Multiaddr[] {
    const multiaddrs = [];
    const address = this.server.address();
    return [];
  }
}

function getMultiaddr(socket: Socket) {
  let ma: any;
  try {
    if (socket.remoteFamily === "IPv6") {
      const addr = new Address6(socket.remoteAddress);
      if (addr.v4) {
        const ip4 = addr.to4().correctForm();
        ma = multiaddr("/ip4/" + ip4 + "/tcp/" + socket.remotePort);
      } else {
        ma = multiaddr(
          "/ip6/" + socket.remoteAddress + "/tcp/" + socket.remotePort
        );
      }
    } else {
      ma = multiaddr(
        "/ip4/" + socket.remoteAddress + "/tcp/" + socket.remotePort
      );
    }
  } catch (err) {}
  return ma;
}

function trackSocket(server: Server, socket: Socket) {
  const key = `${socket.remoteAddress}:${socket.remotePort}`;
  server[`__connections`][key] = socket;
  socket.on("close", () => {
    delete server["__connections"][key];
  });
}
const IPFS_CODE = 421;
function getIpfsId(ma: Multiaddr) {
  return ma.stringTuples().filter(tuple => {
    return tuple[0] === IPFS_CODE;
  })[0][1];
}
