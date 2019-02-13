/// <reference types="node" />
export declare type AbstractBatch<K = any, V = any> = PutBatch<K, V> | DelBatch<K, V>;
export interface PutBatch<K = any, V = any> {
    readonly type: "put";
    readonly key: K;
    readonly value: V;
}
export interface DelBatch<K = any, V = any> {
    readonly type: "del";
    readonly key: K;
}
export declare abstract class ImsFs {
    abstract isOpen(): boolean;
    abstract isClosed(): boolean;
    abstract open(): Promise<void>;
    abstract close(): Promise<any>;
    abstract batch(array: AbstractBatch[], options?: any): Promise<void>;
    abstract get<T = any>(key: string): Promise<T>;
    abstract put<T = any>(key: string, value: T): Promise<any>;
    abstract del(key: string): Promise<any>;
    abstract createReadStream(): NodeJS.ReadableStream;
    abstract createKeyStream(): NodeJS.ReadableStream;
    abstract createValueStream(): NodeJS.ReadableStream;
}
//# sourceMappingURL=index.d.ts.map