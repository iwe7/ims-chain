import { InjectionToken } from "ims-common";
export declare function createPeerId(): Promise<{}>;
export interface PeerId {
    id: string;
    privKey: string;
    pubKey: string;
}
export declare const PeerId: InjectionToken<PeerId>;
export declare class PeerIdModule {
}
//# sourceMappingURL=index.d.ts.map