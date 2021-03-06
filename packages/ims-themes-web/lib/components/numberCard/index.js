"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
const react_countup_1 = require("react-countup");
const React = require("react");
require("./index.scss");
class NumberCard extends React.Component {
    render() {
        const { icon, color, title, number } = this.props;
        return (React.createElement(antd_1.Card, { className: "numberCard", bordered: false, bodyStyle: { padding: 10 } },
            React.createElement(antd_1.Icon, { className: "iconWarp", style: { color }, type: icon }),
            React.createElement("div", { className: "content" },
                React.createElement("p", { className: "title" }, title || "No Title"),
                React.createElement("div", { className: "number" },
                    React.createElement(react_countup_1.default, { start: 0, end: number, duration: 2.75, separator: "," })))));
    }
}
exports.NumberCard = NumberCard;
