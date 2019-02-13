"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
require("./index.scss");
class ImsTopBar extends react_1.Component {
    render() {
        return (react_1.createElement("div", { className: "topbar" },
            react_1.createElement("div", { className: "ims-logo pull-left logo-box" },
                react_1.createElement("div", { className: "ims-logo-wrapper pull-left" },
                    react_1.createElement("a", { href: "", className: "ims-icon pull-left" },
                        react_1.createElement("span", null, "IMS")),
                    react_1.createElement("a", { href: "", className: "console-link pull-left" },
                        react_1.createElement("span", null, "\u4E2D\u63A7\u53F0")))),
            react_1.createElement("div", { className: "pull-left regionbar-new" },
                react_1.createElement("div", { className: "ims-console-regionbar" },
                    react_1.createElement("div", { className: "console-regionbar" },
                        react_1.createElement("div", { className: "topbar-btn" },
                            react_1.createElement("i", { className: "console-topbar-iconfont regionbar-international vertical" }),
                            react_1.createElement("span", { className: "console-regionbar-global vertical" }, "\u4E16\u754C")))))));
    }
}
exports.ImsTopBar = ImsTopBar;
