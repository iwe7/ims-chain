import { InjectionToken } from "ims-core";

export interface ImsRepo {
  init(config: any, callback: (err: Error) => any): void;
  open(callback: (err: Error) => any): void;
  close(callback: (err: Error) => any): void;
  exists(callback: (err: Error, exists: boolean) => any): void;
  stat(options: object, callback: (err: Error, obj: object) => any): void;
}

export const ImsRepos = InjectionToken.fromString<{ [key: string]: ImsRepo }>(
  "ImsRepo"
);

export type Bitswap = any;
export type Block = any;
export type CID = any;

export interface ImsBlockService {
  setExchange(bitswap: Bitswap): void;
  unsetExchange(): void;
  hasExchange(): boolean;
  put(block: Block, callback: (err: Error) => any): void;
  putMany(blocks: Array<Block>, callback: (err: Error) => any): void;
  get(cid: CID, callback: (err: Error, block: Block) => any): void;
  getMany(cids: Array<CID>, callback: (err: Error, block: Block) => any): void;
  delete(cid: CID, callback: (err: Error) => any): void;
}

export const ImsBlockService = InjectionToken.fromString<{
  [key: string]: ImsBlockService;
}>("ImsBlockService");

export interface ImsIpld {}
export const ImsIpld = InjectionToken.fromString<{ [key: string]: ImsIpld }>(
  "ImsIpld"
);

export interface ImsReposOptions {
  path: string;
  lock?: "fs" | "memory";
  storageBackends?: {
    root?: any;
    blocks?: any;
    keys?: any;
    datastore?: any;
  };
  storageBackendOptions?: {
    root?: {
      extension?: string;
    };
    blocks?: {
      sharding?: boolean;
      extension?: string;
    };
    keys?: object;
  };
}

export const ImsReposOptions = InjectionToken.fromString<ImsReposOptions[]>(
  "ImsReposOptions",
  "ImsReposOptions",
  true
);
