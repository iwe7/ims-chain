"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./index.scss");
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
class ImsCommonTopBar extends React.Component {
    render() {
        return (React.createElement("div", { className: "common-topbar" },
            React.createElement("div", { className: "common-topbar-wrapper" },
                React.createElement(react_router_dom_1.Link, { className: "common-topbar-wrapper-all-nav", to: "/" },
                    React.createElement("span", null, "IMS")),
                React.createElement("div", { className: "common-topbar-wrapper-content" },
                    React.createElement(react_router_dom_1.Link, { to: "/user/register", className: "common-topbar-register-btn" }, "\u514D\u8D39\u6CE8\u518C"),
                    React.createElement("div", { className: "common-topbar-menu" },
                        React.createElement("div", { className: "common-topbar-menu-link" },
                            React.createElement(react_router_dom_1.Link, { to: "/" }, "\u9996\u9875")),
                        React.createElement("div", { className: "common-topbar-menu-link" },
                            React.createElement(react_router_dom_1.Link, { to: "/home/install" }, "\u5B89\u88C5")),
                        React.createElement("div", { className: "common-topbar-menu-link" },
                            React.createElement(react_router_dom_1.Link, { to: "/docs/home" }, "\u6587\u6863")),
                        React.createElement("div", { className: "common-topbar-menu-link" },
                            React.createElement(react_router_dom_1.Link, { to: "/ipfs/home" }, "\u5B58\u50A8")),
                        React.createElement("div", { className: "common-topbar-menu-link" },
                            React.createElement(react_router_dom_1.Link, { to: "/store/home" }, "\u5E94\u7528")),
                        React.createElement("div", { className: "common-topbar-menu-link" },
                            React.createElement(react_router_dom_1.Link, { to: "/user/login" }, "\u767B\u5F55"))))),
            React.createElement("div", { className: "common-topbar-line" })));
    }
}
exports.ImsCommonTopBar = ImsCommonTopBar;
