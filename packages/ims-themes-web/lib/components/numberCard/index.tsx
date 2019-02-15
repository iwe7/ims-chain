import { Icon, Card } from "antd";
import CountUp from "react-countup";
import * as React from "react";
import "./index.scss";
export class NumberCard extends React.Component<any, any> {
  render() {
    const { icon, color, title, number } = this.props;
    return (
      <Card className="numberCard" bordered={false} bodyStyle={{ padding: 10 }}>
        <Icon className={"iconWarp"} style={{ color }} type={icon} />
        <div className="content">
          <p className="title">{title || "No Title"}</p>
          <div className="number">
            <CountUp start={0} end={number} duration={2.75} separator="," />
          </div>
        </div>
      </Card>
    );
  }
}
