import "./index.scss";
import React = require("react");
import { Injector } from "ims-core";
import { ImsIpfs } from "ims-web";

export class ImsPeersHome extends React.Component<any, any> {
  get ipfs() {
    return Injector.get(ImsIpfs);
  }
  async componentDidMount() {
    this.ipfs;
  }
  render() {
    return <div>peers home!</div>;
  }
}
