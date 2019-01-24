import { InjectionToken } from "ims-core";
export interface IpfsApi {
  add(
    content: { path: string; content: any }[]
  ): Promise<{ path: string; hash: string; size: number }>;
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
  libp2p?: object;
  connectionManager?: object;
}
export const IpfsConfig = InjectionToken.fromString("IpfsConfig");
