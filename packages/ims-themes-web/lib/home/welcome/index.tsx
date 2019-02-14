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
				<NumberCard icon={"demo"} color={""} title={'title'} number={10} />
			</div>
		);
	}
}
