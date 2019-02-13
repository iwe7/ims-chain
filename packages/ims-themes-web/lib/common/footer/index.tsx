import { Component, createElement } from "react";
import "./index.scss";
import { Link } from "react-router-dom";

export class ImsCommonFooter extends Component {
  render() {
    return (
      <div className="common-footer">
        <div className="common-footer-wrapper">
          <div>
            <Link to={"/about"}>关于我们</Link>
            <Link to={"/concat"}>联系我们</Link>
            <Link to={"/joinus"}>加入我们</Link>
          </div>
        </div>
      </div>
    );
  }
}
