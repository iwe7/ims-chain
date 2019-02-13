export declare type Openid = string;
export interface AccessToken {
    access_token: string;
    expires_in: number;
    create_at?: number;
    refresh_token: string;
    openid: Openid;
    scope: string;
}
export interface SessionKey {
    session_key: string;
    openid: string;
}
export interface UserInfo {
    openid: Openid;
    nickname: string;
    sex: string;
    province: string;
    city: string;
    country: string;
    headimgurl: string;
    privilege: string[];
}
export declare abstract class ImsOauth {
    appid: string;
    appsecret: string;
    constructor(appid: string, appsecret: string);
    abstract getAuthorizeURL(redirect: string, scope?: string, state?: string): string;
    abstract getAuthorizeURLForWebsite(redirect: string, scope?: string, state?: string): string;
    abstract getAccessToken(code: string): Promise<AccessToken>;
    abstract refreshAccessToken(refreshToken: string): Promise<AccessToken>;
    abstract getUserByCode(code: string): Promise<any>;
    abstract getUser(openid: string): Promise<UserInfo>;
    abstract getToken(openid: string): Promise<AccessToken>;
}
//# sourceMappingURL=base.d.ts.map