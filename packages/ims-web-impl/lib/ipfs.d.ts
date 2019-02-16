import { ImsIpfs, ImsIpfsAdd, ImsIpfsFileLs, ImsIpfsFileGet, IpfsAddFile, ImsIpfsName, ImsIpfsNamePubsub, ImsIpfsKey, ImsIpfsNamePublishOptions } from "ims-web";
export declare class ImsIpfsKeyImpl extends ImsIpfsKey {
    private api;
    constructor(api: any);
    gen(name: string): Promise<any>;
    get(name: string): Promise<{
        id: string;
        name: string;
    }>;
    list(): Promise<any>;
    rm(name: string): Promise<any>;
    rename(oldName: string, newName: string): Promise<any>;
    export(name: string, password: string): Promise<any>;
    import(name: string, pem: string, password: string): Promise<any>;
}
export declare class ImsIpfsNamePubsubImpl extends ImsIpfsNamePubsub {
    private api;
    constructor(api: any);
    cancel(): Promise<any>;
    state(): Promise<any>;
    subs(): Promise<any>;
}
export declare class ImsIpfsNameImpl extends ImsIpfsName {
    private api;
    constructor(api: any);
    publish(addr: string, options?: ImsIpfsNamePublishOptions): Promise<any>;
    resolve(name: string): Promise<any>;
}
export declare class ImsIpfsImpl extends ImsIpfs {
    api: any;
    constructor();
    addZip(): void;
    add(files: IpfsAddFile[]): Promise<ImsIpfsAdd[]>;
    ls(path: string): Promise<ImsIpfsFileLs[]>;
    cat(path: string): Promise<any>;
    get(path: string): Promise<ImsIpfsFileGet[]>;
    id(): Promise<any>;
    version(): Promise<any>;
    dns(host: string): Promise<any>;
    stop(): Promise<any>;
    ping(peerId: string): Promise<any>;
    resolve(name: string): Promise<any>;
}
//# sourceMappingURL=ipfs.d.ts.map