import { Component } from "react";
import "./index.scss";
import { ImsUser } from "ims-web";
export declare class ImsUserLogin extends Component<any, any> {
    readonly user: Promise<ImsUser>;
    constructor(props: any);
    componentDidMount(): Promise<void>;
    login(): Promise<void>;
    render(): JSX.Element;
}
//# sourceMappingURL=index.d.ts.map