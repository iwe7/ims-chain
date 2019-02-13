/// <reference types="node" />
import { ImsFs, AbstractBatch } from "ims-fs";
import { LevelUp } from "levelup";
export declare class ImsFsLevel extends ImsFs {
    db: LevelUp;
    constructor(location: string);
    isOpen(): boolean;
    isClosed(): boolean;
    open(): Promise<void>;
    close(): Promise<void>;
    batch(array: AbstractBatch[], options?: any): Promise<void>;
    get<T = any>(key: string): Promise<T>;
    put<T = any>(key: string, value: T): Promise<any>;
    del(key: string): Promise<any>;
    createReadStream(): NodeJS.ReadableStream;
    createKeyStream(): NodeJS.ReadableStream;
    createValueStream(): NodeJS.ReadableStream;
}
//# sourceMappingURL=index.d.ts.map