/// <reference types="node" />
export interface PeerInfo {
    id: any;
}
export interface Connection {
}
export interface Pushable {
    push: any;
}
export declare class Peer {
    info: PeerInfo;
    conn: Connection;
    topics: Set<any>;
    stream: Pushable;
    private _references;
    readonly isConnected: boolean;
    readonly isWritable: boolean;
    constructor(info: PeerInfo);
    write(msg: Buffer): void;
}
//# sourceMappingURL=peer.d.ts.map