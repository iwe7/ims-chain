"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./index.scss");
const React = require("react");
const ims_core_1 = require("ims-core");
const ims_web_1 = require("ims-web");
const rxjs_1 = require("rxjs");
const JSZip = require("jszip");
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
        const appFile = this.refs.app;
        rxjs_1.fromEvent(appFile, 'change').subscribe(async (res) => {
            const files = res.target.files;
            const entries = [];
            const fileEntries = [];
            const results = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                fileEntries.push(JSZip.loadAsync(file).then(zip => {
                    zip.forEach((relativePath, zipEntry) => {
                        if (!zipEntry.dir) {
                            entries.push(zipEntry.async('text').then(res => {
                                console.log(res);
                                results.push({
                                    path: relativePath,
                                    content: res
                                });
                            }));
                        }
                    });
                }));
            }
            await Promise.all(fileEntries);
            await Promise.all(entries);
            const addResults = await ipfs.add(results);
            const hash = addResults[addResults.length - 1].hash;
            ipfs.name.publish(`/ipfs/${hash}`).then(res => {
                console.log('publish', res);
            });
            const subs = ipfs.name.pubsub.subs();
            console.log(subs);
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
            React.createElement("input", { type: "file", ref: "app" }),
            React.createElement("ul", null, keys.map((key, index) => React.createElement("li", { key: index },
                key.name,
                "-",
                key.id))));
    }
}
exports.ImsStoreHome = ImsStoreHome;
