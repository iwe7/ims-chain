import "./index.scss";
import React = require("react");
import { ImsIpfs } from 'ims-web';
export declare class ImsStoreHome extends React.Component<any, any> {
    constructor(props: any);
    readonly ipfs: Promise<ImsIpfs>;
    componentDidMount(): Promise<void>;
    newApp(): Promise<void>;
    render(): JSX.Element;
}
//# sourceMappingURL=index.d.ts.map