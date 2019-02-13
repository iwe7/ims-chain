"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
class ImsAccountWechat extends base_1.ImsAccount {
    constructor(appid, appsecret) {
        super();
        this.appid = appid;
        this.appsecret = appsecret;
    }
    apply(action) { }
}
exports.ImsAccountWechat = ImsAccountWechat;
