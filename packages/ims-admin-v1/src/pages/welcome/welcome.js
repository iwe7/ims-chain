"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const PeerId = require("peer-id");
const React = require("react");
require("./welcome.scss");
class WelcomePage extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            privKey: "",
            pubKey: ""
        };
    }
    createPeerId() {
        return new Promise((resolve, reject) => {
            PeerId.create((err, peerId) => {
                if (err)
                    return reject(err);
                resolve(peerId.toJSON());
            });
        });
    }
    componentDidMount() {
        this.createPeerId().then((res) => {
            this.setState(res);
        });
    }
    render() {
        let { id } = this.state;
        return (React.createElement("div", { className: "welcome_page" },
            React.createElement("div", { className: "welcome_body" },
                React.createElement("div", { className: "welcome_body_title" }, "\u70B9\u51FB\u4E0B\u65B9\u5934\u50CF\u767B\u5F55"),
                React.createElement("div", { className: "welcome_body_avatar" },
                    React.createElement("img", { src: "", alt: "" })),
                React.createElement("div", { className: "welcome_body_address" }, id)),
            React.createElement("div", { className: "welcome_footer" },
                React.createElement("div", { className: "welcome_footer_account" }, "\u6362\u4E2A\u8D26\u53F7\u767B\u5F55"),
                React.createElement("div", { className: "welcome_footer_tabs" },
                    React.createElement("div", null, "\u6CE8\u518C\u8D26\u53F7"),
                    React.createElement("div", null, "\u5FEB\u901F\u6302\u5931")))));
    }
}
exports.WelcomePage = WelcomePage;
