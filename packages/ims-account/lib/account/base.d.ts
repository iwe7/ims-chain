export interface ImsAccountAction<T = any> {
    type: string;
    payload: T;
}
export declare abstract class ImsAccountFactory {
    abstract create(appid: string, appsecret: string, type: string): ImsAccount;
    abstract get(hash: string): ImsAccount;
}
export declare abstract class ImsAccount {
    hash: string;
    appid: string;
    appsecret: string;
    type: string;
}
//# sourceMappingURL=base.d.ts.map