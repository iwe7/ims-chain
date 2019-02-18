import { Observable } from 'rxjs';

export interface ImsIpfsFileLs {
  depth: number;
  name: string;
  path: string;
  size: number;
  hash: string;
  type: string;
}

export interface ImsIpfsAdd {
  path: string;
  hash: string;
  size: number;
}

export interface ImsIpfsFileGet {
  path: string;
  content: Buffer;
}

export interface IpfsAddFile {
  path: string;
  content: string;
}

export abstract class ImsIpfs {
  abstract add(files: IpfsAddFile[]): Promise<ImsIpfsAdd[]>;
  abstract ls(path: string): Promise<ImsIpfsFileLs[]>;
  abstract cat(path: string): Promise<any>;
  abstract get(path: string): Promise<ImsIpfsFileGet[]>;

  object: ImsIpfsObject;
  pin: ImsIpfsPin;
  pubsub: ImsIpfsPubsub;
  repo: ImsIpfsRepo;
  name: ImsIpfsName;
  key: ImsIpfsKey;
  stats: ImsIpfsStats;
  bitswap: ImsIpfsBitswap;
  dag: ImsIpfsDag;
  dht: ImsIpfsDht;

  abstract id(): Promise<any>;
  abstract version(): Promise<any>;
  abstract dns(host: string): Promise<any>;
  abstract stop(): Promise<any>;
  abstract ping(peerId: string): Promise<any>;
  abstract resolve(name: string): Promise<any>;
}

export abstract class ImsIpfsObject {
  abstract new(template?: string): Promise<any>;
  abstract put(obj: any): Promise<any>;
  abstract get(hash: string): Promise<any>;
  abstract data(hash: string): Promise<any>;
  abstract links(hash: string): Promise<any>;
  abstract stat(hash: string): Promise<any>;
  readonly patch: ImsIpfsObjectPatch;
}

export abstract class ImsIpfsObjectPatch {
  abstract addLink(hash: string, link: any): Promise<any>;
  abstract rmLink(hash: string, link: any): Promise<any>;
  abstract appendData(hash: string, data: any): Promise<any>;
  abstract setData(hash: string, data: any): Promise<any>;
}

export abstract class ImsIpfsPin {
  abstract add(hash: string): Promise<any>;
  abstract ls(hash?: string): Promise<any>;
  abstract rm(hash: string): Promise<any>;
}

export interface ImsIpfsPubsubHandlerOptions {
  from: string;
  seqno: Buffer | string;
  data: Buffer | string;
  topicIDs: string[]
}

export interface ImsIpfsPubsubHandler {
  (opt: ImsIpfsPubsubHandlerOptions): any;
}

export abstract class ImsIpfsPubsub {
  abstract subscribe(topic: string): Observable<any>;
  // abstract unsubscribe(topic: String): Observable<any>;
  abstract publish(topic: string, data: any): Observable<any>;
  abstract ls(): Observable<any>;
  abstract peers(topic: string): Observable<any>;
}

export abstract class ImsIpfsRepo {
  abstract gc(): Promise<any>;
  abstract stat(): Promise<any>;
  abstract version(): Promise<any>;
}

export interface ImsIpfsNamePublishOptions {
  resolve?: boolean;
  lifetime?: string;
  ttl?: string;
  key?: string;
}
export abstract class ImsIpfsName {
  abstract publish(addr: string, options?: ImsIpfsNamePublishOptions): Promise<any>;
  abstract resolve(name: string): Promise<any>;
  pubsub: ImsIpfsNamePubsub;
}

export abstract class ImsIpfsNamePubsub {
  abstract cancel(): Promise<any>;
  abstract state(): Promise<any>;
  abstract subs(): Promise<any>;
}

export abstract class ImsIpfsKey {
  abstract gen(name: string): Promise<{ id: string, name: string }>;
  abstract get(name: string): Promise<{ id: string, name: string }>;
  abstract list(): Promise<{ id: string, name: string }[]>;
  abstract rm(name: string): Promise<any>;
  abstract rename(oldName: string, newName: string): Promise<any>;
  abstract export(name: string, password: string): Promise<any>;
  abstract import(name: string, pem: string, password: string): Promise<any>;
}

export abstract class ImsIpfsStats {
  abstract bitswap(): Promise<any>;
  abstract repo(): Promise<any>;
  abstract bw(): Promise<any>;
}

export abstract class ImsIpfsBitswap {
  abstract wantlist(): Promise<any>;
  abstract stat(): Promise<any>;
}

export abstract class ImsIpfsDag {
  abstract put(obj: any): Promise<any>;
  abstract get(cid: string): Promise<any>;
  abstract tree(cid: string): Promise<any>;
}

export abstract class ImsIpfsDht {
  abstract findPeer(id: string): Promise<any>;
  abstract findProvs(hash: string): Promise<any>;
  abstract get(key: string): Promise<any>;
  abstract provide(cid: any): Promise<any>;
  abstract put(key: string, value: any): Promise<any>;
  abstract query(id: any): Promise<any>;
}

export abstract class ImsIpfsBootstrap {
  abstract add(): Promise<any>;
  abstract list(): Promise<any>;
  abstract rm(): Promise<any>;
}
