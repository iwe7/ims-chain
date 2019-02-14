"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
require("./index.scss");
const React = require("react");
class ImsCommonContent extends react_1.Component {
    render() {
        return React.createElement("div", { className: "common-content" }, this.props.children);
    }
}
exports.ImsCommonContent = ImsCommonContent;
