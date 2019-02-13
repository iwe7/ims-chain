import { Component, createElement } from "react";
import "./index.scss";
export class ImsCommonTopBar extends Component {
  render() {
    return (
      <div className="common-topbar">
        <div className="common-topbar-wrapper">
          <div className="common-topbar-wrapper-all-nav">
            <span>IMS</span>
          </div>
          <div className="common-topbar-wrapper-content">
            <a className="common-topbar-register-btn" href="">
              免费注册
            </a>
            <div className="common-topbar-menu">
              <div className="common-topbar-menu-link">
                <a href="">登录</a>
              </div>
            </div>
          </div>
        </div>
        <div className="common-topbar-line"></div>
      </div>
    );
  }
}
