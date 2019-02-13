import { Transport, Connection, Listener, CallBack } from "../core";
import { Multiaddr } from "ims-multiaddr";
import net = require("net");
import { TcpListener } from "./listener";
const toPull = require("stream-to-pull-stream");
const mafmt = require("mafmt");
import { TcpConnection } from "./connection";
import { TcpOptions } from "./listener";
export class TcpTransport extends Transport<TcpOptions> {
  /**
   * 拨号 建立链接
   * @param ma 地址
   * @param options 配置项目
   */
  dial(ma: Multiaddr, options?: TcpOptions, cb?: CallBack): Connection {
    const cOpts = ma.toOptions();
    const rawSocket = net.connect(cOpts);
    rawSocket.once("timeout", () => {
      rawSocket.emit("error", new Error("Timeout"));
    });
    rawSocket.once("error", cb);
    rawSocket.once("connect", () => {
      rawSocket.removeListener("error", cb);
      cb();
    });
    const socket = toPull.duplex(rawSocket);
    return new TcpConnection(socket, [ma]);
  }
  /**
   * 设置监听
   * @param options 配置项目
   * @param handler 操作
   */
  createListener(options: TcpOptions, handler: Function): Listener {
    return new TcpListener(options, handler);
  }
  /**
   * 过滤
   * @param multiaddrs
   */
  filter(multiaddrs: Multiaddr[]): Multiaddr[] {
    return multiaddrs.filter(ma => {
      if (ma.protoNames().includes("p2p-circuit")) {
        return false;
      }
      if (ma.protoNames().includes("ipfs")) {
        ma = ma.decapsulate("ipfs");
      }
      return mafmt.TCP.matches(ma);
    });
  }
}
