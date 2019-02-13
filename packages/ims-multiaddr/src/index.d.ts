/// <reference types="node" />
import { InjectionToken } from "ims-common";
export declare abstract class Multiaddr {
    port: number;
    abstract tuples(): Array<[number, Buffer]>;
    abstract protoNames(): string[];
    abstract protoCodes(): number[];
    abstract protos(): {
        code: number;
        size: number;
        name: string;
    }[];
    abstract toOptions(): {
        family: number;
        host: string;
        transport: string;
        port: number;
    };
    abstract stringTuples(): Array<[number, string]>;
    abstract nodeAddress(): {
        family: string;
        address: string;
        port: number;
    };
    abstract fromStupidString(str: string): any;
    abstract isThinWaistAddress(addr: any): boolean;
    abstract equals(addr: any): boolean;
    abstract encapsulate(addr: any): any;
    abstract decapsulate(addr: any): any;
}
export interface MultiaddrFactory {
    (address: string): Multiaddr;
}
export declare const MultiaddrFactory: InjectionToken<MultiaddrFactory>;
export declare class MultiaddrModule {
}
//# sourceMappingURL=index.d.ts.map