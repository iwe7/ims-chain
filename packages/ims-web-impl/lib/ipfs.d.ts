import { ImsIpfs, ImsIpfsAdd, ImsIpfsFileLs, ImsIpfsFileGet, IpfsAddFile } from "ims-web";
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