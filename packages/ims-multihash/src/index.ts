import { Injectable } from "ims-common";
const multihashing = require("multihashing");

@Injectable()
export class Multihash {
  constructor() {}
  digest(buf: Buffer, codec: string = "sha2-256"): Buffer {
    return multihashing(buf, codec);
  }
}
