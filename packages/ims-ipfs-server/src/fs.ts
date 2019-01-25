import { Injectable } from "ims-common";
import { Injector } from "ims-core";
import { Ipfs } from "ims-ipfs";

@Injectable()
export class ImsFsServer {
  get node() {
    if (this._node) return this._node;
    return this.injector.get(Ipfs).then(node => {
      this._node = node;
      return node;
    });
  }
  _node: any;
  constructor(private injector: Injector) {}
  async cat(hash: string) {
    let node = await this.node;
    hash = hash || "QmbSnCcHziqhjNRyaunfcCvxPiV3fNL3fWL8nUrp5yqwD5";
    return await node.cat(`/ipfs/${hash}`);
  }

  async add(
    options: {
      path: string;
      content: any;
    }[]
  ) {
    options = options || [];
    let node = await this.node;
    let files = options.map(opt => {
      return {
        path: opt.path,
        content: Buffer.from(opt.content)
      };
    });
    if (files.length > 0) {
      return await node.add(files);
    }
  }
}
