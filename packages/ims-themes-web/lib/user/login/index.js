"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
require("./index.scss");
const ims_core_1 = require("ims-core");
const ims_web_1 = require("ims-web");
class ImsUserLogin extends react_1.Component {
    constructor(props) {
        super(props);
    }
    async componentDidMount() {
        const user = await ims_core_1.Injector.get(ims_core_1.InjectionToken.fromType(ims_web_1.ImsUser));
        let res = await user.login();
        console.log(user);
    }
    render() {
        return (react_1.createElement("div", { className: "ims-user-login" },
            react_1.createElement("div", { className: "ims-user-login-wrapper" },
                react_1.createElement("div", { className: "ims-user-login-adv" },
                    react_1.createElement("div", { className: "ims-user-login-adv-title" }, "\u667A\u80FD\u94FE\u4EAB\uFF0C\u5171\u4EAB\u4E92\u901A"),
                    react_1.createElement("ul", null,
                        react_1.createElement("li", null, " \u6D77\u91CF\u5E94\u7528\uFF0C\u5343\u6B3E\u63D2\u4EF6\uFF0C\u81EA\u7531\u642D\u914D "),
                        react_1.createElement("li", null, " \u6570\u636E360\u5EA6\u52A0\u5BC6\uFF0C\u4FDD\u8BC1\u9690\u79C1\u5B89\u5168 "),
                        react_1.createElement("li", null, " \u7EDF\u4E00\u4F1A\u5458\u3001\u5171\u8BC6\u673A\u5236\u3001\u667A\u80FD\u5408\u7EA6 "),
                        react_1.createElement("li", null, " \u53BB\u4E2D\u5FC3\u5316\u3001\u516C\u5F00\u900F\u660E\uFF0C\u8054\u5408\u8FD0\u8425 "))),
                react_1.createElement("div", { className: "ims-user-login-box" },
                    react_1.createElement("div", { className: "ims-user-login-form" },
                        react_1.createElement("div", { className: "ims-user-login-header" },
                            react_1.createElement("div", { className: "ims-user-login-header-title" }, "\u5BC6\u7801\u767B\u5F55")),
                        react_1.createElement("div", { className: "ims-user-login-username" },
                            react_1.createElement("input", { type: "text", placeholder: "\u90AE\u7BB1/\u4F1A\u5458\u540D/8\u4F4DID" })),
                        react_1.createElement("div", { className: "ims-user-login-password" },
                            react_1.createElement("input", { type: "text", placeholder: "\u8BF7\u8F93\u5165\u767B\u5F55\u5BC6\u7801" })),
                        react_1.createElement("div", { className: "ims-user-login-btn" },
                            react_1.createElement("button", null, "\u767B\u5F55")),
                        react_1.createElement("div", { className: "ims-user-login-links" },
                            react_1.createElement("a", { href: "" }, "\u5FD8\u8BB0\u5BC6\u7801"),
                            react_1.createElement("a", { href: "" }, "\u5FD8\u8BB0\u4F1A\u5458\u540D"),
                            react_1.createElement("a", { href: "" }, "\u514D\u8D39\u6CE8\u518C")),
                        react_1.createElement("div", { className: "ims-user-login-third" },
                            react_1.createElement("div", null, "\u5176\u4ED6\u65B9\u5F0F\u767B\u5F55"),
                            react_1.createElement("div", { className: "content" },
                                react_1.createElement("a", { href: "" }, "\u6E38\u5BA2\u767B\u5F55"))))))));
    }
}
exports.ImsUserLogin = ImsUserLogin;
