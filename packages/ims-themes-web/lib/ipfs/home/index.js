"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./index.scss");
const React = require("react");
const ims_core_1 = require("ims-core");
const ims_web_1 = require("ims-web");
class ImsIpfsHome extends React.Component {
    get ipfs() {
        return ims_core_1.Injector.get(ims_web_1.ImsIpfs);
    }
    async componentDidMount() {
        const ipfs = await this.ipfs;
        const adds = await ipfs.add([
            {
                path: "/demo/index.html",
                content: `/demo/index.html`
            }
        ]);
        const subs = await ipfs.name.pubsub.subs();
        console.log(subs);
        const keys = await ipfs.key.list();
        const key = keys[1];
        ipfs.name.publish(adds[1].hash, { key: key.id }).then(res => {
            console.log(res);
        });
        const resolve = await ipfs.name.resolve("/ipns/QmaAnAnddGEkwjUEdBqZUmQStKRnNKJeMnVTpbiNn8vLn5/demo/index.html");
        console.log(resolve);
        const res = await ipfs.cat(resolve.name);
        console.log(res);
    }
    render() {
        return React.createElement("div", null, "ipfs home!");
    }
}
exports.ImsIpfsHome = ImsIpfsHome;
