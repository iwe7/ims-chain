import { ImsIpfsName, ImsIpfsNamePublishOptions } from 'ims-web';
import { ImsIpfsNamePubsubImpl } from './namePubsub'
export class ImsIpfsNameImpl extends ImsIpfsName {
    constructor(private api: any) {
        super();
        this.pubsub = new ImsIpfsNamePubsubImpl(api);
    }
    publish(addr: string, options?: ImsIpfsNamePublishOptions): Promise<any> {
        return this.api.name.publish(addr, options);
    }
    async resolve(name: string): Promise<any> {
        return { name: await this.api.name.resolve(name) };
    }
}
