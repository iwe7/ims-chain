import "./index.scss";
import { ImsCommonTopBar } from "../../common";
import { Row, Col, Card } from "antd";
import { NumberCard } from "../../components/numberCard";
import React = require("react");

export class ImsHomeWelcome extends React.Component<any, any> {
  render() {
    return (
      <div>
        <ImsCommonTopBar />
        <div style={{ width: "1200px", margin: "10px auto" }}>
          <Row gutter={24}>
            <Col lg={6} md={12}>
              <NumberCard
                icon={"right-square"}
                color={"rgb(230, 234, 145)"}
                title={"新关注"}
                number={2781}
              />
            </Col>
            <Col lg={6} md={12}>
              <NumberCard
                icon={"right-square"}
                color={"rgb(150, 134, 145)"}
                title={"取消关注"}
                number={2781}
              />
            </Col>
            <Col lg={6} md={12}>
              <NumberCard
                icon={"right-square"}
                color={"rgb(150, 234, 245)"}
                title={"净增关注"}
                number={2781}
              />
            </Col>
            <Col lg={6} md={12}>
              <NumberCard
                icon={"right-square"}
                color={"rgb(100, 234, 145)"}
                title={"累计关注"}
                number={2781}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
