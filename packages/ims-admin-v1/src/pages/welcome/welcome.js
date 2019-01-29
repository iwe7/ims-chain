"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const PeerId = require("peer-id");
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
        return (react_1.createElement("div", { className: "welcome_page" },
            react_1.createElement("div", { className: "welcome_body" },
                react_1.createElement("div", { className: "welcome_body_title" }, "\u70B9\u51FB\u4E0B\u65B9\u5934\u50CF\u767B\u5F55"),
                react_1.createElement("div", { className: "welcome_body_avatar" },
                    react_1.createElement("img", { src: "", alt: "" })),
                react_1.createElement("div", { className: "welcome_body_address" }, id)),
            react_1.createElement("div", { className: "welcome_footer" },
                react_1.createElement("div", { className: "welcome_footer_account" }, "\u6362\u4E2A\u8D26\u53F7\u767B\u5F55"),
                react_1.createElement("div", { className: "welcome_footer_tabs" },
                    react_1.createElement("div", null, "\u6CE8\u518C\u8D26\u53F7"),
                    react_1.createElement("div", null, "\u5FEB\u901F\u6302\u5931")))));
    }
}
exports.WelcomePage = WelcomePage;
