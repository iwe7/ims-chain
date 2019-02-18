import { Injector } from 'ims-core';
import { Inject } from 'ims-common';
import { ImsIpfs } from 'ims-web';
import { join } from 'path';
import fs = require('fs-extra');

const root = process.cwd();
export class ImsInstaller {
    root: string = join(root, 'addons')
    constructor(@Inject() public injector: Injector, @Inject() public ipfs: ImsIpfs) { }

    /**
     * 安装
     */
    async install(hash: string) {
        const files = await this.ipfs.get(hash);
        files.forEach(file => {
            fs.outputFileSync(file.path, file.content)
        });
    }

    /**
     * 更新
     */
    async update(hash: string) {

    }

    /**
     * 卸载
     */
    async uninstall(hash: string) {
        const files = await this.ipfs.get(hash);
        files.forEach(file => {
            fs.removeSync(file.path)
        });
    }
}
