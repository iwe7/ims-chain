"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ipfsClient = require("ipfs-http-client");
const ims_common_1 = require("ims-common");
const ims_web_1 = require("ims-web");
const index_1 = require("./ipfs/index");
let ImsIpfsImpl = class ImsIpfsImpl extends ims_web_1.ImsIpfs {
    constructor() {
        super();
        this.api = ipfsClient("/ip4/127.0.0.1/tcp/5001");
        this.name = new index_1.ImsIpfsNameImpl(this.api);
        this.key = new index_1.ImsIpfsKeyImpl(this.api);
        this.pubsub = new index_1.ImsIpfsPubsubImpl(this.api);
    }
    addZip() { }
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
