import { Component, createElement } from "react";
import "./index.scss";
export class ImsCommonFooter extends Component {
  render() {
    return (
      <div className="common-footer">
        <div className="common-footer-wrapper">
          <div>
            <a href="">关于我们</a>
            <a href="">法律法规</a>
            <a href="">联系我们</a>
            <a href="">加入我们</a>
          </div>
        </div>
      </div>
    );
  }
}
