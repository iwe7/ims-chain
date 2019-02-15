"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./index.scss");
const React = require("react");
const ims_core_1 = require("ims-core");
const ims_web_1 = require("ims-web");
class ImsPeersHome extends React.Component {
    get ipfs() {
        return ims_core_1.Injector.get(ims_web_1.ImsIpfs);
    }
    async componentDidMount() {
        this.ipfs;
    }
    render() {
        return React.createElement("div", null, "peers home!");
    }
}
exports.ImsPeersHome = ImsPeersHome;
