"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.version = 1.0;
const React = require("react");
const ims_web_1 = require("ims-web");
const ims_core_1 = require("ims-core");
class ImsStore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apps: []
        };
    }
    async componentDidMount() {
        const ipfs = await ims_core_1.Injector.get(ims_web_1.ImsIpfs);
        ipfs.pubsub.subscribe('store.application.publish').subscribe(res => {
            console.log(res);
        });
        ;
        ipfs.pubsub.publish('store.application.publish', { title: 'demo' }).subscribe(res => {
            console.log(res);
        });
    }
    render() {
        let { apps } = this.state;
        apps = apps || [];
        return React.createElement("ul", null, apps.map((app, key) => React.createElement("li", { key: key }, app.title)));
    }
}
exports.ImsStore = ImsStore;
