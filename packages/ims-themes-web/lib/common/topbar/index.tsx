import "./index.scss";
import React = require("react");
import { Link } from "react-router-dom";
export class ImsCommonTopBar extends React.Component {
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
                <Link to={"/"}>首页</Link>
              </div>
              <div className="common-topbar-menu-link">
                <Link to={"/home/install"}>安装</Link>
              </div>
              <div className="common-topbar-menu-link">
                <Link to={"/docs/home"}>文档</Link>
              </div>
              <div className="common-topbar-menu-link">
                <Link to={"/ipfs/home"}>存储</Link>
              </div>
              <div className="common-topbar-menu-link">
                <Link to={"/store/home"}>应用</Link>
              </div>
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
