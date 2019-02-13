/// <reference types="node" />
import { InjectionToken } from "ims-core";
export interface Cid {
    toBaseEncodedString(base?: string): string;
    toString(base?: string): string;
}
export interface CidFactory {
    (str: string | Buffer | object): Cid;
}
export declare const CidFactory: InjectionToken<CidFactory>;
export declare class CidModule {
}
//# sourceMappingURL=index.d.ts.map