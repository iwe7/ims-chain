import { Injectable } from "ims-common";
import { Injector } from "ims-core";
import { Ipfs } from "ims-ipfs";

@Injectable()
export class ImsFsServer {
  get node() {
    return this._node || this.injector.get(Ipfs);
  }
  _node: any;
  constructor(private injector: Injector) {
    this.injector.get(Ipfs).then(node => (this._node = node));
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
        content: Buffer.from("content")
      };
    });
    if (files.length > 0) {
      return await node.add(files);
    }
  }
}
