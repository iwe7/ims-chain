export type Openid = string;

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

export abstract class ImsOauth {
  constructor(public appid: string, public appsecret: string) {}
  /**
   * 获取授权地址
   * @param redirect 回调地址
   * @param scope 作用范围，值为snsapi_userinfo和snsapi_base，前者用于弹出，后者用于跳转
   * @param state
   */
  abstract getAuthorizeURL(
    redirect: string,
    scope?: string,
    state?: string
  ): string;
  /**
   * pc端授权
   * @param redirect 回调地址
   * @param scope 作用范围，值为snsapi_login，前者用于弹出，后者用于跳转
   * @param state 开发者可提供的数据
   */
  abstract getAuthorizeURLForWebsite(
    redirect: string,
    scope?: string,
    state?: string
  ): string;

  /**
   * 根据code获取access token
   * @param code
   */
  abstract getAccessToken(code: string): Promise<AccessToken>;

  /**
   * 刷新access token
   * @param refreshToken
   */
  abstract refreshAccessToken(refreshToken: string): Promise<AccessToken>;

  /**
   * 获取用户信息 用code
   */
  abstract getUserByCode(code: string): Promise<any>;

  /**
   * 获取用户信息
   * @param openid
   */
  abstract getUser(openid: string): Promise<UserInfo>;
  /**
   * 获取access token
   * @param openid
   */
  abstract getToken(openid: string): Promise<AccessToken>;
}
