import { InjectionToken } from "ims-core";
export interface ImsRepo {
    init(config: any, callback: (err: Error) => any): void;
    open(callback: (err: Error) => any): void;
    close(callback: (err: Error) => any): void;
    exists(callback: (err: Error, exists: boolean) => any): void;
    stat(options: object, callback: (err: Error, obj: object) => any): void;
}
export declare const ImsRepos: InjectionToken<{
    [key: string]: ImsRepo;
}>;
export declare type Bitswap = any;
export declare type Block = any;
export declare type CID = any;
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
export declare const ImsBlockService: InjectionToken<{
    [key: string]: ImsBlockService;
}>;
export interface ImsIpld {
}
export declare const ImsIpld: InjectionToken<{
    [key: string]: ImsIpld;
}>;
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
export declare const ImsReposOptions: InjectionToken<ImsReposOptions[]>;
//# sourceMappingURL=token.d.ts.map