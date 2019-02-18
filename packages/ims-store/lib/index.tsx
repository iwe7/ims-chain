export const version = 1.0;
import React = require('react');
import { ImsIpfs } from 'ims-web'
import { Injector } from 'ims-core'

export interface ImsStoreState {
    apps: any[];
}
export class ImsStore extends React.Component<any, ImsStoreState> {
    constructor(props: any) {
        super(props);
        this.state = {
            apps: []
        }
    }
    async componentDidMount() {
        const ipfs = await Injector.get<ImsIpfs>(ImsIpfs);
        ipfs.pubsub.subscribe('store.application.publish').subscribe(res => {
            console.log(res)
        });;
        ipfs.pubsub.publish('store.application.publish', { title: 'demo' }).subscribe(res => {
            console.log(res)
        });
    }

    render() {
        let { apps } = this.state;
        apps = apps || [];
        return <ul>
            {apps.map((app, key) => <li key={key}>{app.title}</li>)}
        </ul>
    }
}
