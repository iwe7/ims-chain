import { ImsIpfsPubsub } from 'ims-web'
import { Observable, from } from 'rxjs';

export class ImsIpfsPubsubImpl extends ImsIpfsPubsub {
    constructor(private api: any) {
        super();
    }
    subscribe(topic: string): Observable<any> {
        return new Observable((obser) => {
            const handler = (opt) => {
                obser.next(opt);
            }
            this.api.pubsub.subscribe(topic, handler, err => {
                if (err) return obser.error(err)
            });
            return () => this.api.pubsub.unsubscribe(topic, handler, (err) => {
                if (err) return obser.error(err)
            })
        })
    }
    publish(topic: string, data: object): Observable<any> {
        const str = JSON.stringify(data);
        const buf = Buffer.from(str);
        return new Observable(obser => {
            this.api.pubsub.publish(topic, buf, (err) => {
                if (err) {
                    console.log(err);
                }
                obser.next();
                obser.complete();
            });
        })
    }
    ls(): Observable<any> {
        return from(this.api.pubsub.ls())
    }
    peers(topic: string): Observable<any> {
        return from(this.api.pubsub.peers(topic))
    }
}
