import { Icon, Card } from "antd";
import ReactCountUp = require("react-countup");
import React = require("react");
import "./index.scss";

export class NumberCard extends React.Component<any,any>{
	render(){
		const { icon, color, title, number, countUp } = this.props;
		return <Card
			className="numberCard"
			bordered={false}
			bodyStyle={{ padding: 10 }}
			>
			<Icon className={"iconWarp"} style={{color}} type={icon} />
			<div className="content">
				<p className="title">{title || "No Title"}</p>
				<div className="number">
					<ReactCountUp
						start={0}
						end={number}
						duration={2.75}
						useEasing
						separator=","
					/>
				</div>
			</div>
		</Card>
	}
}
