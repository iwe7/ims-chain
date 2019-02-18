import { ImsIpfsNamePubsub } from 'ims-web'
export class ImsIpfsNamePubsubImpl extends ImsIpfsNamePubsub {
    constructor(private api: any) {
        super();
    }
    cancel(): Promise<any> {
        return this.api.name.pubsub.cancel();
    }
    state(): Promise<any> {
        return this.api.name.pubsub.state();
    }
    subs(): Promise<any> {
        return this.api.name.pubsub.subs();
    }
}
