"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
require("./index.scss");
const react_router_dom_1 = require("react-router-dom");
class ImsCommonTopBar extends react_1.Component {
    render() {
        return (react_1.createElement("div", { className: "common-topbar" },
            react_1.createElement("div", { className: "common-topbar-wrapper" },
                react_1.createElement(react_router_dom_1.Link, { className: "common-topbar-wrapper-all-nav", to: "/" },
                    react_1.createElement("span", null, "IMS")),
                react_1.createElement("div", { className: "common-topbar-wrapper-content" },
                    react_1.createElement(react_router_dom_1.Link, { to: "/user/register", className: "common-topbar-register-btn" }, "\u514D\u8D39\u6CE8\u518C"),
                    react_1.createElement("div", { className: "common-topbar-menu" },
                        react_1.createElement("div", { className: "common-topbar-menu-link" },
                            react_1.createElement(react_router_dom_1.Link, { to: "/user/login" }, "\u767B\u5F55"))))),
            react_1.createElement("div", { className: "common-topbar-line" })));
    }
}
exports.ImsCommonTopBar = ImsCommonTopBar;
