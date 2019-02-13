import { Component, createElement } from "react";
import "./index.scss";
import { Link } from "react-router-dom";

export class ImsCommonTopBar extends Component {
  render() {
    return (
      <div className="common-topbar">
        <div className="common-topbar-wrapper">
          <Link className="common-topbar-wrapper-all-nav" to={"/"}>
            <span>IMS</span>
          </Link>
          <div className="common-topbar-wrapper-content">
            <Link to={"/user/register"} className="common-topbar-register-btn">
              免费注册
            </Link>
            <div className="common-topbar-menu">
              <div className="common-topbar-menu-link">
                <Link to={"/user/login"}>登录</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="common-topbar-line" />
      </div>
    );
  }
}
