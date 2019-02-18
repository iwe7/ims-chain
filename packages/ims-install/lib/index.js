"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_core_1 = require("ims-core");
const ims_common_1 = require("ims-common");
const ims_web_1 = require("ims-web");
const path_1 = require("path");
const fs = require("fs-extra");
const root = process.cwd();
let ImsInstaller = class ImsInstaller {
    constructor(injector, ipfs) {
        this.injector = injector;
        this.ipfs = ipfs;
        this.root = path_1.join(root, 'addons');
    }
    async install(hash) {
        const files = await this.ipfs.get(hash);
        files.forEach(file => {
            fs.outputFileSync(file.path, file.content);
        });
    }
    async update(hash) {
    }
    async uninstall(hash) {
        const files = await this.ipfs.get(hash);
        files.forEach(file => {
            fs.removeSync(file.path);
        });
    }
};
ImsInstaller = tslib_1.__decorate([
    tslib_1.__param(0, ims_common_1.Inject()), tslib_1.__param(1, ims_common_1.Inject()),
    tslib_1.__metadata("design:paramtypes", [ims_core_1.Injector, ims_web_1.ImsIpfs])
], ImsInstaller);
exports.ImsInstaller = ImsInstaller;
