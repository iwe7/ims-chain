import ipfsClient = require("ipfs-http-client");
import { Injectable } from "ims-common";
import {
  ImsIpfs,
  ImsIpfsAdd,
  ImsIpfsFileLs,
  ImsIpfsFileGet,
  IpfsAddFile,
} from "ims-web";

import { ImsIpfsPubsubImpl, ImsIpfsKeyImpl, ImsIpfsNameImpl } from './ipfs/index';

@Injectable()
export class ImsIpfsImpl extends ImsIpfs {
  api: any = ipfsClient("/ip4/127.0.0.1/tcp/5001");

  constructor() {
    super();
    this.name = new ImsIpfsNameImpl(this.api);
    this.key = new ImsIpfsKeyImpl(this.api);
    this.pubsub = new ImsIpfsPubsubImpl(this.api);
  }

  addZip() { }

  add(files: IpfsAddFile[]): Promise<ImsIpfsAdd[]> {
    const _fs = files.map(file => {
      return {
        content: Buffer.from(file.content),
        path: file.path
      };
    });
    return this.api.add(_fs);
  }

  ls(path: string): Promise<ImsIpfsFileLs[]> {
    return this.api.ls(path);
  }

  async cat(path: string): Promise<any> {
    let content: Buffer = await this.api.cat(path);
    return {
      content: content.toString("utf8")
    };
  }

  get(path: string): Promise<ImsIpfsFileGet[]> {
    return this.api.get(path);
  }

  id(): Promise<any> {
    return this.api.id();
  }
  version(): Promise<any> {
    return this.api.version();
  }
  dns(host: string): Promise<any> {
    return this.api.dns(host);
  }
  stop(): Promise<any> {
    return this.api.stop();
  }
  ping(peerId: string): Promise<any> {
    return this.api.ping(peerId);
  }
  resolve(name: string): Promise<any> {
    return this.api.resolve(name);
  }
}
