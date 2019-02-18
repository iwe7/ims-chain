"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_web_1 = require("ims-web");
const rxjs_1 = require("rxjs");
class ImsIpfsPubsubImpl extends ims_web_1.ImsIpfsPubsub {
    constructor(api) {
        super();
        this.api = api;
    }
    subscribe(topic) {
        return new rxjs_1.Observable((obser) => {
            const handler = (opt) => {
                obser.next(opt);
            };
            this.api.pubsub.subscribe(topic, handler, err => {
                if (err)
                    return obser.error(err);
            });
            return () => this.api.pubsub.unsubscribe(topic, handler, (err) => {
                if (err)
                    return obser.error(err);
            });
        });
    }
    publish(topic, data) {
        const str = JSON.stringify(data);
        const buf = Buffer.from(str);
        return new rxjs_1.Observable(obser => {
            this.api.pubsub.publish(topic, buf, (err) => {
                if (err) {
                    console.log(err);
                }
                obser.next();
                obser.complete();
            });
        });
    }
    ls() {
        return rxjs_1.from(this.api.pubsub.ls());
    }
    peers(topic) {
        return rxjs_1.from(this.api.pubsub.peers(topic));
    }
}
exports.ImsIpfsPubsubImpl = ImsIpfsPubsubImpl;
