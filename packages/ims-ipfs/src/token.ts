import { InjectionToken } from "ims-core";
export interface IpfsApi {
  add(
    content: { path: string; content: any }[]
  ): Promise<{ path: string; hash: string; size: number }[]>;
  addReadableStream(options?: {
    ["cid-version"]?: 0 | 1;
    progress?: Function;
    hash?: string;
    wrapWithDirectory?: boolean;
    pin?: boolean;
  }): Promise<{ path: string; content: Buffer }>;
  mkdir(
    dir: string
  ): Promise<{
    blocks: number;
    cumulativeSize: number;
    hash: string;
    local: any;
    size: number;
    sizeLocal: number;
    type: string;
    withLocality: boolean;
  }>;
}
export const Ipfs = InjectionToken.fromString<any>("Ipfs");
export const IpfsApi = InjectionToken.fromString<IpfsApi>("IpfsApi");
export interface IpfsConfig {
  repo?: string | object;
  init?: boolean | object;
  start?: boolean;
  pass?: boolean;
  silent?: boolean;
  relay?: {
    enabled?: boolean;
    hop?: {
      enabled?: boolean;
      active?: boolean;
    };
  };
  preload?: {
    enabled?: boolean;
    addresses?: any[];
  };
  EXPERIMENTAL?: {
    pubsub?: boolean;
    sharding?: boolean;
    dht?: boolean;
  };
  config?: object;
  libp2p?: {
    modules: {
      transport: object;
      peerDiscovery: object[];
    };
    config: object;
  };
  connectionManager?: {
    peerDiscovery: object;
  };
}
export const IpfsConfig = InjectionToken.fromString("IpfsConfig");
