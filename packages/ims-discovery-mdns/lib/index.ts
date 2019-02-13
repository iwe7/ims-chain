import { Discovery } from "ims-discovery";
const multicastDNS = require("multicast-dns");

export class MulticastDNS extends Discovery {
  static tag: string = "mdns";
  constructor(options) {
    super();
  }
  start() {}
  stop() {}
}
