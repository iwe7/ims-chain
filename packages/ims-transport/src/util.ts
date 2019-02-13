const IPFS_CODE = 421;
import { Address6 } from "ip-address";
const multiaddr = require("multiaddr");
import { Socket } from "net";

export function getIpfsId(ma: any) {
  return ma.stringTuples().filter(tuple => {
    return tuple[0] === IPFS_CODE;
  })[0][1];
}

export function getSocketMultiaddr(socket: Socket) {
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
