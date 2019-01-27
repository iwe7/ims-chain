import { Injectable } from "ims-common";
import { Injector } from "ims-core";
import { Ipfs } from "ims-ipfs";
const pull = require("pull-stream");

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

  async mkdir(path: string) {
    if (!path.startsWith("/")) {
      path = `/${path}`;
    }
    let stat = await this.stat(path);
    if (stat.hash) {
      return stat;
    } else {
      let node = await this.node;
      await node.files.mkdir(path);
      return await node.files.stat(path);
    }
  }

  async stat(path: string) {
    let node = await this.node;
    return await node.files.stat(path);
  }

  async ls(ipfsPath: string) {
    let node = await this.node;
    return await node.ls(ipfsPath);
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
      if (typeof opt.content === "string") {
        return {
          path: opt.path,
          content: Buffer.from(opt.content)
        };
      } else {
        return opt;
      }
    });
    if (files.length > 0) {
      return await node.add(files);
    }
    return undefined;
  }
}
