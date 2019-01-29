import { Component, createElement } from "react";
const PeerId = require("peer-id");
export interface HomeState {
  id: string;
  privKey: string;
  pubKey: string;
}
import "./home.scss";
export class HomePage extends Component<any, HomeState> {
  constructor(props: any) {
    super(props);
    this.state = {
      id: "",
      privKey: "",
      pubKey: ""
    };
  }

  createPeerId() {
    return new Promise<HomeState>((resolve, reject) => {
      PeerId.create((err: Error, peerId: any) => {
        if (err) return reject(err);
        resolve(peerId.toJSON());
      });
    });
  }

  componentDidMount() {
    this.createPeerId().then((res: HomeState) => {
      this.setState(res);
    });
  }

  render() {
    return (
      <div className="home_page">
        <div className="account-info" />
        <div className="weui-cells__title">我的</div>
        <div className="weui-cells">
          <a className="weui-cell weui-cell_access" href="javascript:;">
            <div className="weui-cell__bd">
              <p>地址</p>
            </div>
            <div className="weui-cell__ft">{this.state.id}</div>
          </a>
          <a className="weui-cell weui-cell_access" href="javascript:;">
            <div className="weui-cell__bd">
              <p>公钥</p>
            </div>
            <div className="weui-cell__ft">{this.state.pubKey}</div>
          </a>
          <a className="weui-cell weui-cell_access" href="javascript:;">
            <div className="weui-cell__bd">
              <p>私钥</p>
            </div>
            <div className="weui-cell__ft">{this.state.privKey}</div>
          </a>
        </div>
      </div>
    );
  }
}
