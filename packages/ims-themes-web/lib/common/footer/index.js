"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
require("./index.scss");
const react_router_dom_1 = require("react-router-dom");
class ImsCommonFooter extends react_1.Component {
    render() {
        return (react_1.createElement("div", { className: "common-footer" },
            react_1.createElement("div", { className: "common-footer-wrapper" },
                react_1.createElement("div", null,
                    react_1.createElement(react_router_dom_1.Link, { to: "/about" }, "\u5173\u4E8E\u6211\u4EEC"),
                    react_1.createElement(react_router_dom_1.Link, { to: "/concat" }, "\u8054\u7CFB\u6211\u4EEC"),
                    react_1.createElement(react_router_dom_1.Link, { to: "/joinus" }, "\u52A0\u5165\u6211\u4EEC")))));
    }
}
exports.ImsCommonFooter = ImsCommonFooter;
