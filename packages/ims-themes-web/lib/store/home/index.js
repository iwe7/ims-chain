"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./index.scss");
const React = require("react");
const ims_core_1 = require("ims-core");
const ims_web_1 = require("ims-web");
class ImsStoreHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keys: []
        };
    }
    get ipfs() {
        return ims_core_1.Injector.get(ims_web_1.ImsIpfs);
    }
    async componentDidMount() {
        const ipfs = await this.ipfs;
        const keys = await ipfs.key.list();
        this.setState({
            keys
        });
    }
    async newApp() {
        const name = this.refs.appname.value;
        const ipfs = await this.ipfs;
        const res = await ipfs.key.gen(name);
        console.log(res);
    }
    render() {
        const { keys } = this.state;
        return React.createElement("div", null,
            React.createElement("input", { type: "text", ref: "appname" }),
            React.createElement("button", { onClick: e => this.newApp() }, "\u65B0\u5EFA\u5E94\u7528"),
            React.createElement("ul", null, keys.map((key, index) => React.createElement("li", { key: index },
                key.name,
                "-",
                key.id))));
    }
}
exports.ImsStoreHome = ImsStoreHome;
