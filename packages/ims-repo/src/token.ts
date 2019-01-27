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
