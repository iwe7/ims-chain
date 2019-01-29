import { Component, createElement } from "react";
const PeerId = require("peer-id");
export interface WelcomeState {
  id: string;
  privKey: string;
  pubKey: string;
}
import "./welcome.scss";

export class WelcomePage extends Component<any, WelcomeState> {
  constructor(props: any) {
    super(props);
    this.state = {
      id: "",
      privKey: "",
      pubKey: ""
    };
  }

  createPeerId() {
    return new Promise<WelcomeState>((resolve, reject) => {
      PeerId.create((err: Error, peerId: any) => {
        if (err) return reject(err);
        resolve(peerId.toJSON());
      });
    });
  }

  componentDidMount() {
    this.createPeerId().then((res: WelcomeState) => {
      this.setState(res);
    });
  }

  render() {
    let { id } = this.state;
    return (
      <div className="welcome_page">
        <div className="welcome_body">
          <div className="welcome_body_title">点击下方头像登录</div>
          <div className="welcome_body_avatar">
            <img src="" alt="" />
          </div>
          <div className="welcome_body_address">{id}</div>
        </div>
        <div className="welcome_footer">
          <div className="welcome_footer_account">换个账号登录</div>
          <div className="welcome_footer_tabs">
            <div>注册账号</div>
            <div>快速挂失</div>
          </div>
        </div>
      </div>
    );
  }
}
