import { ImsAccount, ImsAccountAction } from "./base";
export declare class ImsAccountWechat extends ImsAccount {
    appid: string;
    appsecret: string;
    constructor(appid: string, appsecret: string);
    apply<T = any>(action: ImsAccountAction<T>): void;
}
//# sourceMappingURL=wechat.d.ts.map