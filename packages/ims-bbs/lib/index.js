"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
class ImsBbs {
    static createPlatform(type) {
        switch (type) {
            case types_1.PlatformType.ali:
            case types_1.PlatformType.android:
            case types_1.PlatformType.baidu:
            case types_1.PlatformType.electron:
            case types_1.PlatformType.h5:
            case types_1.PlatformType.ios:
            case types_1.PlatformType.pc:
            case types_1.PlatformType.wechat:
            case types_1.PlatformType.wxapp:
            default:
                break;
        }
    }
    static install() { }
    static uninstall() { }
    static upgrade() { }
}
exports.ImsBbs = ImsBbs;
