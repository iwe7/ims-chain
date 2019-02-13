import { Connection } from "ims-transport";
const spdy = require("spdy-transport");
export class SpdyConnection extends Connection {
  connect(addr: string): any {}
}
