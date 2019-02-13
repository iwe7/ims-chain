import { Openid, ImsOauth, AccessToken, UserInfo } from "./base";
export declare class ImsOauthWechat extends ImsOauth {
    cache: Map<Openid, AccessToken>;
    getUser(openid: Openid): Promise<UserInfo>;
    getToken(openid: string): Promise<AccessToken>;
    getUserByCode(code: string): Promise<UserInfo>;
    _getUser(openid: string, accessToken: string): Promise<any>;
    private isValid;
    getAuthorizeURL(redirect: string, scope?: string, state?: string): string;
    getAuthorizeURLForWebsite(redirect: string, scope?: string, state?: string): string;
    getAccessToken(code: string): Promise<AccessToken>;
    refreshAccessToken(refreshToken: string): Promise<AccessToken>;
    request<T = any>(url: string, args: object): Promise<T>;
}
//# sourceMappingURL=wechat.d.ts.map