import ipfsClient = require("ipfs-http-client");
import { Injectable } from "ims-common";
import {
  ImsIpfs,
  ImsIpfsAdd,
  ImsIpfsFileLs,
  ImsIpfsFileGet,
  IpfsAddFile,
  ImsIpfsName,
  ImsIpfsNamePubsub,
  ImsIpfsKey,
  ImsIpfsNamePublishOptions
} from "ims-web";

export class ImsIpfsKeyImpl extends ImsIpfsKey {
  constructor(private api: any) {
    super();
  }
  gen(name: string): Promise<any> {
    return this.api.key.gen(name, {
      type: "rsa",
      size: 2048
    });
  }
  async get(name: string): Promise<{ id: string, name: string }> {
    const list = await this.list();
    let it = list.find(item => item.name === name);
    if (it) return it;
    return this.gen(name);
  }
  list(): Promise<any> {
    return this.api.key.list();
  }
  rm(name: string): Promise<any> {
    return this.api.key.rm(name);
  }
  rename(oldName: string, newName: string): Promise<any> {
    return this.api.key.rename(oldName, newName);
  }
  export(name: string, password: string): Promise<any> {
    return this.api.key.export(name, password);
  }
  import(name: string, pem: string, password: string): Promise<any> {
    return this.api.key.import(name, pem, password);
  }
}

export class ImsIpfsNamePubsubImpl extends ImsIpfsNamePubsub {
  constructor(private api: any) {
    super();
  }
  cancel(): Promise<any> {
    return this.api.name.pubsub.cancel();
  }
  state(): Promise<any> {
    return this.api.name.pubsub.state();
  }
  subs(): Promise<any> {
    return this.api.name.pubsub.subs();
  }
}

export class ImsIpfsNameImpl extends ImsIpfsName {
  constructor(private api: any) {
    super();
    this.pubsub = new ImsIpfsNamePubsubImpl(api);
  }
  publish(addr: string, options?: ImsIpfsNamePublishOptions): Promise<any> {
    return this.api.name.publish(addr, options);
  }
  async resolve(name: string): Promise<any> {
    return { name: await this.api.name.resolve(name) };
  }
}

@Injectable()
export class ImsIpfsImpl extends ImsIpfs {
  api: any = ipfsClient("/ip4/127.0.0.1/tcp/5001");

  constructor() {
    super();
    this.name = new ImsIpfsNameImpl(this.api);
    this.key = new ImsIpfsKeyImpl(this.api);
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
