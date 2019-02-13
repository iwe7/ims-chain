/// <reference types="node" />
import { EventEmitter } from "events";
export declare class Loader2 extends EventEmitter {
    cacheName: Map<string, any>;
    cacheHash: Map<string, any>;
    constructor();
    ready(): Promise<void>;
    import(id: string): void;
    register(name: string, deps: string[], fileContent: any): Promise<any>;
}
//# sourceMappingURL=loader2.d.ts.map