import { Component } from "react";
export interface HomeState {
    id: string;
    privKey: string;
    pubKey: string;
}
import "./home.scss";
export declare class HomePage extends Component<any, HomeState> {
    constructor(props: any);
    createPeerId(): Promise<HomeState>;
    componentDidMount(): void;
    render(): JSX.Element;
}
//# sourceMappingURL=index.d.ts.map