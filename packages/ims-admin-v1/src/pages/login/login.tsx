import { Component, createElement } from "react";
const PeerId = require("peer-id");
export interface LoginState {
  id: string;
  privKey: string;
  pubKey: string;
}
import "./login.scss";
export class LoginPage extends Component<any, LoginState> {
  constructor(props: any) {
    super(props);
    this.state = {
      id: "",
      privKey: "",
      pubKey: ""
    };
  }

  createPeerId() {
    return new Promise<LoginState>((resolve, reject) => {
      PeerId.create((err: Error, peerId: any) => {
        if (err) return reject(err);
        resolve(peerId.toJSON());
      });
    });
  }

  componentDidMount() {
    const refs = this.refs;
    this.createPeerId().then((res: LoginState) => {
      this.setState(res);
    });
  }

  render() {
    return (
      <div>
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
