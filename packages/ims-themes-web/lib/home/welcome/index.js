"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./index.scss");
const common_1 = require("../../common");
const antd_1 = require("antd");
const numberCard_1 = require("../../components/numberCard");
const React = require("react");
class ImsHomeWelcome extends React.Component {
    render() {
        return (React.createElement("div", null,
            React.createElement(common_1.ImsCommonTopBar, null),
            React.createElement("div", { style: { width: "1200px", margin: "10px auto" } },
                React.createElement(antd_1.Row, { gutter: 24 },
                    React.createElement(antd_1.Col, { lg: 6, md: 12 },
                        React.createElement(numberCard_1.NumberCard, { icon: "right-square", color: "rgb(230, 234, 145)", title: "新关注", number: 2781 })),
                    React.createElement(antd_1.Col, { lg: 6, md: 12 },
                        React.createElement(numberCard_1.NumberCard, { icon: "right-square", color: "rgb(150, 134, 145)", title: "取消关注", number: 2781 })),
                    React.createElement(antd_1.Col, { lg: 6, md: 12 },
                        React.createElement(numberCard_1.NumberCard, { icon: "right-square", color: "rgb(150, 234, 245)", title: "净增关注", number: 2781 })),
                    React.createElement(antd_1.Col, { lg: 6, md: 12 },
                        React.createElement(numberCard_1.NumberCard, { icon: "right-square", color: "rgb(100, 234, 145)", title: "累计关注", number: 2781 }))))));
    }
}
exports.ImsHomeWelcome = ImsHomeWelcome;
