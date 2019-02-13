"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_web_1 = require("ims-web");
const ims_common_1 = require("ims-common");
class ImsUserProfileImpl extends ims_web_1.ImsUserProfile {
    async base() {
        return {
            method: "base"
        };
    }
    async post() {
        return {
            method: "post"
        };
    }
    async bind() {
        return {
            method: "bind"
        };
    }
    async validateMobile() {
        return {
            method: "validateMobile"
        };
    }
    async bindMobile() {
        return {
            method: "bindMobile"
        };
    }
    async unbind() {
        return {
            method: "unbind"
        };
    }
}
exports.ImsUserProfileImpl = ImsUserProfileImpl;
let ImsUserImpl = class ImsUserImpl extends ims_web_1.ImsUser {
    constructor() {
        super(...arguments);
        this.profile = new ImsUserProfileImpl();
    }
    async create() {
        return {
            method: "create"
        };
    }
    async login(username, password) {
        return {
            username,
            password
        };
    }
    async logout() {
        return {
            method: "logout"
        };
    }
    async registerset() {
        return {
            method: "registerset"
        };
    }
};
ImsUserImpl = tslib_1.__decorate([
    ims_common_1.Injectable()
], ImsUserImpl);
exports.ImsUserImpl = ImsUserImpl;
