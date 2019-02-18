"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    async get(name) {
        const list = await this.list();
        let it = list.find(item => item.name === name);
        if (it)
            return it;
        return this.gen(name);
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
