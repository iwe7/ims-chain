import { ImsIpfsName, ImsIpfsNamePublishOptions } from 'ims-web';
export declare class ImsIpfsNameImpl extends ImsIpfsName {
    private api;
    constructor(api: any);
    publish(addr: string, options?: ImsIpfsNamePublishOptions): Promise<any>;
    resolve(name: string): Promise<any>;
}
//# sourceMappingURL=name.d.ts.map