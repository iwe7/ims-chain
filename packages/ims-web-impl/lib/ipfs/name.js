"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_web_1 = require("ims-web");
const namePubsub_1 = require("./namePubsub");
class ImsIpfsNameImpl extends ims_web_1.ImsIpfsName {
    constructor(api) {
        super();
        this.api = api;
        this.pubsub = new namePubsub_1.ImsIpfsNamePubsubImpl(api);
    }
    publish(addr, options) {
        return this.api.name.publish(addr, options);
    }
    async resolve(name) {
        return { name: await this.api.name.resolve(name) };
    }
}
exports.ImsIpfsNameImpl = ImsIpfsNameImpl;
