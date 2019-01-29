import { Component } from "react";
export interface LoginState {
    id: string;
    privKey: string;
    pubKey: string;
}
import "./login.scss";
export declare class LoginPage extends Component<any, LoginState> {
    constructor(props: any);
    createPeerId(): Promise<LoginState>;
    componentDidMount(): void;
    render(): JSX.Element;
}
//# sourceMappingURL=login.d.ts.map