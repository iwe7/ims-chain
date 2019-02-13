export interface ImsAddress {
    family?: string;
    host?: string;
    transport?: string;
    port: number;
}
export declare class ImsPeerInfo extends Set<ImsAddress> {
    peer: ImsPeer;
    constructor(peer: ImsPeer);
    static create(): Promise<ImsPeerInfo>;
}
export declare class ImsPeer {
    id: ImsPeerId;
    privKey?: ImsPeerPrivKey;
    pubKey?: ImsPeerPubKey;
    constructor(id: ImsPeerId, privKey?: ImsPeerPrivKey, pubKey?: ImsPeerPubKey);
    static create(): Promise<ImsPeer>;
}
export declare type ImsPeerId = string;
export declare type ImsPeerPrivKey = string;
export declare type ImsPeerPubKey = string;
//# sourceMappingURL=peer.d.ts.map