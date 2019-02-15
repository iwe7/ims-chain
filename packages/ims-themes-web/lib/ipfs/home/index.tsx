import "./index.scss";
import React = require("react");
import { Injector } from "ims-core";
import { ImsIpfs } from "ims-web";

export class ImsIpfsHome extends React.Component<any, any> {
  get ipfs() {
    return Injector.get<ImsIpfs>(ImsIpfs);
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

    const resolve = await ipfs.name.resolve(
      "/ipns/QmaAnAnddGEkwjUEdBqZUmQStKRnNKJeMnVTpbiNn8vLn5/demo/index.html"
    );
    console.log(resolve);

    // const pub = await ipfs.name.publish("/ipfs/" + adds[0].hash);
    // console.log(pub);

    const res = await ipfs.cat(resolve.name);
    console.log(res);
    // ipfs.name.publish();
  }
  render() {
    return <div>ipfs home!</div>;
  }
}
