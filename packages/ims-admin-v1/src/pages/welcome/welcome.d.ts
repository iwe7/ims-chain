import { Component } from "react";
export interface WelcomeState {
    id: string;
    privKey: string;
    pubKey: string;
}
import "./welcome.scss";
export declare class WelcomePage extends Component<any, WelcomeState> {
    constructor(props: any);
    createPeerId(): Promise<WelcomeState>;
    componentDidMount(): void;
    render(): JSX.Element;
}
//# sourceMappingURL=welcome.d.ts.map