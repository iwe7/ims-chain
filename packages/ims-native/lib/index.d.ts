import { ImsNativeMdns } from "./mdns";
export declare abstract class ImsNative {
    readonly mdns: ImsNativeMdns;
    abstract login(): any;
    abstract checkSession(): any;
    abstract navigateToMiniProgram(): any;
    abstract navigateBackMiniProgram(): any;
    abstract getAccountInfoSync(): any;
    abstract getUserInfo(): any;
    abstract getPaidUnionId(): any;
    abstract reportMonitor(): any;
}
//# sourceMappingURL=index.d.ts.map