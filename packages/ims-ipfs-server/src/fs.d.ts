import { Injector } from "ims-core";
export declare class ImsFsServer {
    private injector;
    readonly node: any;
    _node: any;
    constructor(injector: Injector);
    cat(hash: string): Promise<any>;
    ls(ipfsPath: string): Promise<any>;
    add(options: {
        path: string;
        content: any;
    }[]): Promise<{} | undefined>;
}
//# sourceMappingURL=fs.d.ts.map