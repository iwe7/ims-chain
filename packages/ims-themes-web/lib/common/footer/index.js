"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
require("./index.scss");
class ImsCommonFooter extends react_1.Component {
    render() {
        return (react_1.createElement("div", { className: "common-footer" },
            react_1.createElement("div", { className: "common-footer-wrapper" },
                react_1.createElement("div", null,
                    react_1.createElement("a", { href: "" }, "\u5173\u4E8E\u6211\u4EEC"),
                    react_1.createElement("a", { href: "" }, "\u6CD5\u5F8B\u6CD5\u89C4"),
                    react_1.createElement("a", { href: "" }, "\u8054\u7CFB\u6211\u4EEC"),
                    react_1.createElement("a", { href: "" }, "\u52A0\u5165\u6211\u4EEC")))));
    }
}
exports.ImsCommonFooter = ImsCommonFooter;
