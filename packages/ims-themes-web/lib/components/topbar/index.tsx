import { Component, createElement } from "react";
import "./index.scss";
export class ImsTopBar extends Component {
  render() {
    return (
      <div className="topbar">
        {/* 企业logo */}
        <div className="ims-logo pull-left logo-box">
          <div className="ims-logo-wrapper pull-left">
            <a href="" className="ims-icon pull-left">
              <span>IMS</span>
            </a>
            <a href="" className="console-link pull-left">
              <span>中控台</span>
            </a>
          </div>
        </div>
        {/* 世界 */}
        <div className="pull-left regionbar-new">
          <div className="ims-console-regionbar">
            <div className="console-regionbar">
              <div className="topbar-btn">
                <i className="console-topbar-iconfont regionbar-international vertical" />
                <span className="console-regionbar-global vertical">世界</span>
              </div>
            </div>
          </div>
        </div>


      </div>
    );
  }
}
