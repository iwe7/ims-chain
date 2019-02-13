import { Component, createElement } from "react";
import "./index.scss";
export class ImsCommonContent extends Component {
  render() {
    return <div className="common-content">{this.props.children}</div>;
  }
}
