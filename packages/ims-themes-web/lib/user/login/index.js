"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
require("./index.scss");
const ims_core_1 = require("ims-core");
const ims_web_1 = require("ims-web");
const rxjs_1 = require("rxjs");
const react_router_dom_1 = require("react-router-dom");
const React = require("react");
class ImsUserLogin extends react_1.Component {
    get user() {
        return ims_core_1.Injector.get(ims_core_1.InjectionToken.fromType(ims_web_1.ImsUser));
    }
    constructor(props) {
        super(props);
    }
    async componentDidMount() {
        rxjs_1.fromEvent(this.refs.username, "change").subscribe((res) => {
            let username = res.target.value;
            this.setState({ username });
        });
        rxjs_1.fromEvent(this.refs.password, "change").subscribe((res) => {
            let password = res.target.value;
            this.setState({ password });
        });
    }
    async login() {
        const user = await this.user;
        await user.login(this.state.username, this.state.password);
    }
    render() {
        return (React.createElement("div", { className: "ims-user-login" },
            React.createElement("div", { className: "ims-user-login-wrapper" },
                React.createElement("div", { className: "ims-user-login-adv" },
                    React.createElement("div", { className: "ims-user-login-adv-title" }, "\u667A\u80FD\u94FE\u4EAB\uFF0C\u5171\u4EAB\u4E92\u901A"),
                    React.createElement("ul", null,
                        React.createElement("li", null, " \u6D77\u91CF\u5E94\u7528\uFF0C\u5343\u6B3E\u63D2\u4EF6\uFF0C\u81EA\u7531\u642D\u914D "),
                        React.createElement("li", null, " \u6570\u636E360\u5EA6\u52A0\u5BC6\uFF0C\u4FDD\u8BC1\u9690\u79C1\u5B89\u5168 "),
                        React.createElement("li", null, " \u7EDF\u4E00\u4F1A\u5458\u3001\u5171\u8BC6\u673A\u5236\u3001\u667A\u80FD\u5408\u7EA6 "),
                        React.createElement("li", null, " \u53BB\u4E2D\u5FC3\u5316\u3001\u516C\u5F00\u900F\u660E\uFF0C\u8054\u5408\u8FD0\u8425 "))),
                React.createElement("div", { className: "ims-user-login-box" },
                    React.createElement("div", { className: "ims-user-login-form" },
                        React.createElement("div", { className: "ims-user-login-header" },
                            React.createElement("div", { className: "ims-user-login-header-title" }, "\u5BC6\u7801\u767B\u5F55")),
                        React.createElement("div", { className: "ims-user-login-username" },
                            React.createElement("input", { type: "text", ref: "username", placeholder: "\u90AE\u7BB1/\u4F1A\u5458\u540D/8\u4F4DID" })),
                        React.createElement("div", { className: "ims-user-login-password" },
                            React.createElement("input", { type: "password", ref: "password", placeholder: "\u8BF7\u8F93\u5165\u767B\u5F55\u5BC6\u7801" })),
                        React.createElement("div", { className: "ims-user-login-btn" },
                            React.createElement("button", { onClick: () => this.login() }, "\u767B\u5F55")),
                        React.createElement("div", { className: "ims-user-login-links" },
                            React.createElement(react_router_dom_1.Link, { to: "/user/findPassword" }, "\u5FD8\u8BB0\u5BC6\u7801"),
                            React.createElement(react_router_dom_1.Link, { to: "/user/findUsername" }, "\u5FD8\u8BB0\u4F1A\u5458\u540D"),
                            React.createElement(react_router_dom_1.Link, { to: "/user/register" }, "\u514D\u8D39\u6CE8\u518C")),
                        React.createElement("div", { className: "ims-user-login-third" },
                            React.createElement("div", null, "\u5176\u4ED6\u65B9\u5F0F\u767B\u5F55"),
                            React.createElement("div", { className: "content" },
                                React.createElement("a", { href: "javascript:;" }, "\u6E38\u5BA2\u767B\u5F55"))))))));
    }
}
exports.ImsUserLogin = ImsUserLogin;
