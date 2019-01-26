"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
const ims_core_1 = require("ims-core");
const ims_ipfs_1 = require("ims-ipfs");
const pull = require("pull-stream");
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
        let node = await this.node;
        hash = hash || "QmbSnCcHziqhjNRyaunfcCvxPiV3fNL3fWL8nUrp5yqwD5";
        return await node.cat(`/ipfs/${hash}`);
    }
    async ls(ipfsPath) {
        let node = await this.node;
        return await node.ls(ipfsPath);
    }
    async add(options) {
        options = options || [];
        let node = await this.node;
        let files = options.map(opt => {
            return {
                path: opt.path,
                content: Buffer.from(opt.content)
            };
        });
        if (files.length > 0) {
            const stream = node.addPullStream();
            return await new Promise((resolve, reject) => {
                pull(pull.values(files), stream, pull.collect((err, values) => {
                    console.log({ err, values });
                    resolve(values);
                }));
            });
        }
        return undefined;
    }
};
ImsFsServer = tslib_1.__decorate([
    ims_common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [ims_core_1.Injector])
], ImsFsServer);
exports.ImsFsServer = ImsFsServer;
//# sourceMappingURL=fs.js.map