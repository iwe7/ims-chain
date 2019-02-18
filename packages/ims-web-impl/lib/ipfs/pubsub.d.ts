import { ImsIpfsPubsub } from 'ims-web';
import { Observable } from 'rxjs';
export declare class ImsIpfsPubsubImpl extends ImsIpfsPubsub {
    private api;
    constructor(api: any);
    subscribe(topic: string): Observable<any>;
    publish(topic: string, data: object): Observable<any>;
    ls(): Observable<any>;
    peers(topic: string): Observable<any>;
}
//# sourceMappingURL=pubsub.d.ts.map