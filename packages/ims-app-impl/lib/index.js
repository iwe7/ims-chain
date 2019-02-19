"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_app_1 = require("ims-app");
class ImsAuthImpl extends ims_app_1.ImsAuth {
    constructor() {
        super(...arguments);
        this.forget = new ImsAuthForgetImpl();
        this.login = new ImsAuthLoginImpl();
        this.register = new ImsAuthRegisterImpl();
        this.session = new ImsAuthSessionImpl();
    }
    async forward() { }
    async oauth() { }
}
exports.ImsAuthImpl = ImsAuthImpl;
class ImsAuthForgetImpl extends ims_app_1.ImsAuthForget {
    async reset() { }
    async forget() { }
    async verifycode() { }
}
exports.ImsAuthForgetImpl = ImsAuthForgetImpl;
class ImsAuthLoginImpl extends ims_app_1.ImsAuthLogin {
    async basic() { }
    async uc() { }
    async mobile_exist() { }
}
exports.ImsAuthLoginImpl = ImsAuthLoginImpl;
class ImsAuthRegisterImpl extends ims_app_1.ImsAuthRegister {
    async register() { }
    async uc() { }
}
exports.ImsAuthRegisterImpl = ImsAuthRegisterImpl;
class ImsAuthSessionImpl extends ims_app_1.ImsAuthSession {
    async openid() { }
    async userinfo() { }
    async check() { }
}
exports.ImsAuthSessionImpl = ImsAuthSessionImpl;
class ImsUtilityImpl extends ims_app_1.ImsUtility {
    constructor() {
        super(...arguments);
        this.file = new ImsUtilityFileImpl();
        this.wxcode = new ImsUtilityWxcodeImpl();
    }
    async click() { }
    async share() { }
}
exports.ImsUtilityImpl = ImsUtilityImpl;
class ImsUtilityFileImpl extends ims_app_1.ImsUtilityFile {
    async upload() { }
    async delete() { }
}
exports.ImsUtilityFileImpl = ImsUtilityFileImpl;
class ImsUtilityWxcodeImpl extends ims_app_1.ImsUtilityWxcode {
    async verifycode() { }
    async image() { }
    async qrcode() { }
}
exports.ImsUtilityWxcodeImpl = ImsUtilityWxcodeImpl;
