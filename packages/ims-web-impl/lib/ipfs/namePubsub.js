"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_web_1 = require("ims-web");
class ImsIpfsNamePubsubImpl extends ims_web_1.ImsIpfsNamePubsub {
    constructor(api) {
        super();
        this.api = api;
    }
    cancel() {
        return this.api.name.pubsub.cancel();
    }
    state() {
        return this.api.name.pubsub.state();
    }
    subs() {
        return this.api.name.pubsub.subs();
    }
}
exports.ImsIpfsNamePubsubImpl = ImsIpfsNamePubsubImpl;
