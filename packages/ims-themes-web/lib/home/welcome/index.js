"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./index.scss");
const common_1 = require("../../common");
const numberCard_1 = require("../../components/numberCard");
const React = require("react");
class ImsHomeWelcome extends React.Component {
    render() {
        return (React.createElement("div", null,
            React.createElement(common_1.ImsCommonTopBar, null),
            React.createElement(numberCard_1.NumberCard, { icon: "demo", color: "", title: 'title', number: 10 })));
    }
}
exports.ImsHomeWelcome = ImsHomeWelcome;
