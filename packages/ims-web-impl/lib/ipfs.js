"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ipfsClient = require("ipfs-http-client");
const ims_common_1 = require("ims-common");
const ims_web_1 = require("ims-web");
class ImsIpfsKeyImpl extends ims_web_1.ImsIpfsKey {
    constructor(api) {
        super();
        this.api = api;
    }
    gen(name) {
        return this.api.key.gen(name, {
            type: "rsa",
            size: 2048
        });
    }
    list() {
        return this.api.key.list();
    }
    rm(name) {
        return this.api.key.rm(name);
    }
    rename(oldName, newName) {
        return this.api.key.rename(oldName, newName);
    }
    export(name, password) {
        return this.api.key.export(name, password);
    }
    import(name, pem, password) {
        return this.api.key.import(name, pem, password);
    }
}
exports.ImsIpfsKeyImpl = ImsIpfsKeyImpl;
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
class ImsIpfsNameImpl extends ims_web_1.ImsIpfsName {
    constructor(api) {
        super();
        this.api = api;
        this.pubsub = new ImsIpfsNamePubsubImpl(api);
    }
    publish(addr, options) {
        return this.api.name.publish(addr, options);
    }
    async resolve(name) {
        return { name: await this.api.name.resolve(name) };
    }
}
exports.ImsIpfsNameImpl = ImsIpfsNameImpl;
let ImsIpfsImpl = class ImsIpfsImpl extends ims_web_1.ImsIpfs {
    constructor() {
        super();
        this.api = ipfsClient("/ip4/127.0.0.1/tcp/5001");
        this.name = new ImsIpfsNameImpl(this.api);
        this.key = new ImsIpfsKeyImpl(this.api);
    }
    add(files) {
        const _fs = files.map(file => {
            return {
                content: Buffer.from(file.content),
                path: file.path
            };
        });
        return this.api.add(_fs);
    }
    ls(path) {
        return this.api.ls(path);
    }
    async cat(path) {
        let content = await this.api.cat(path);
        return {
            content: content.toString("utf8")
        };
    }
    get(path) {
        return this.api.get(path);
    }
    id() {
        return this.api.id();
    }
    version() {
        return this.api.version();
    }
    dns(host) {
        return this.api.dns(host);
    }
    stop() {
        return this.api.stop();
    }
    ping(peerId) {
        return this.api.ping(peerId);
    }
    resolve(name) {
        return this.api.resolve(name);
    }
};
ImsIpfsImpl = tslib_1.__decorate([
    ims_common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], ImsIpfsImpl);
exports.ImsIpfsImpl = ImsIpfsImpl;
