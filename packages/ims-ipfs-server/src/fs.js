"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
const ims_core_1 = require("ims-core");
const ims_ipfs_1 = require("ims-ipfs");
let ImsFsServer = class ImsFsServer {
    constructor(injector) {
        this.injector = injector;
    }
    get node() {
        if (this._node)
            return this._node;
        return this.injector.get(ims_ipfs_1.Ipfs).then(node => {
            this._node = node;
            return node;
        });
    }
    async cat(hash) {
        try {
            let node = await this.node;
            hash = hash || "QmbSnCcHziqhjNRyaunfcCvxPiV3fNL3fWL8nUrp5yqwD5";
            return await node.cat(`/ipfs/${hash}`);
        }
        catch (e) {
        }
    }
    async mkdir(path) {
        if (!path.startsWith("/")) {
            path = `/${path}`;
        }
        let stat = await this.stat(path);
        if (stat.hash) {
            return stat;
        }
        else {
            let node = await this.node;
            await node.files.mkdir(path);
            return await node.files.stat(path);
        }
    }
    async stat(path) {
        let node = await this.node;
        return await node.files.stat(path);
    }
    async ls(ipfsPath) {
        let node = await this.node;
        return await node.ls(ipfsPath);
    }
    async add(options) {
        options = options || [];
        let node = await this.node;
        let files = options.map(opt => {
            if (typeof opt.content === "string") {
                return {
                    path: opt.path,
                    content: Buffer.from(opt.content)
                };
            }
            else {
                return opt;
            }
        });
        if (files.length > 0) {
            return await node.add(files);
        }
        return undefined;
    }
};
ImsFsServer = tslib_1.__decorate([
    ims_common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [ims_core_1.Injector])
], ImsFsServer);
exports.ImsFsServer = ImsFsServer;
