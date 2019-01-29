"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const PeerId = require("peer-id");
require("./home.scss");
class HomePage extends react_1.Component {
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
        return (react_1.createElement("div", null,
            react_1.createElement("div", { className: "weui-cells__title" }, "\u6211\u7684"),
            react_1.createElement("div", { className: "weui-cells" },
                react_1.createElement("a", { className: "weui-cell weui-cell_access", href: "javascript:;" },
                    react_1.createElement("div", { className: "weui-cell__bd" },
                        react_1.createElement("p", null, "\u5730\u5740")),
                    react_1.createElement("div", { className: "weui-cell__ft" }, this.state.id)),
                react_1.createElement("a", { className: "weui-cell weui-cell_access", href: "javascript:;" },
                    react_1.createElement("div", { className: "weui-cell__bd" },
                        react_1.createElement("p", null, "\u516C\u94A5")),
                    react_1.createElement("div", { className: "weui-cell__ft" }, this.state.pubKey)),
                react_1.createElement("a", { className: "weui-cell weui-cell_access", href: "javascript:;" },
                    react_1.createElement("div", { className: "weui-cell__bd" },
                        react_1.createElement("p", null, "\u79C1\u94A5")),
                    react_1.createElement("div", { className: "weui-cell__ft" }, this.state.privKey)))));
    }
}
exports.HomePage = HomePage;
//# sourceMappingURL=index.js.map