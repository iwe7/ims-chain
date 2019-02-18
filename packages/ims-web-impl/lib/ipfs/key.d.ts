import { ImsIpfsKey } from 'ims-web';
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
//# sourceMappingURL=key.d.ts.map