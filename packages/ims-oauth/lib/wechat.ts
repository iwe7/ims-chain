import querystring = require("querystring");
import urllib = require("urllib");
import { Openid, ImsOauth, AccessToken, UserInfo } from "./base";
export class ImsOauthWechat extends ImsOauth {
  cache: Map<Openid, AccessToken> = new Map();
  async getUser(openid: Openid): Promise<UserInfo> {
    let accessToken = await this.getToken(openid);
    if (!!accessToken) {
      if (this.isValid(accessToken)) {
        return await this._getUser(openid, accessToken.access_token);
      } else {
        const newToken = await this.refreshAccessToken(
          accessToken.refresh_token
        );
        return await this._getUser(openid, newToken.access_token);
      }
    }
  }

  async getToken(openid: string) {
    if (this.cache.has(openid)) {
      return this.cache.get(openid);
    }
  }

  async getUserByCode(code: string): Promise<UserInfo> {
    /**
     * 获取token
     */
    const token = await this.getAccessToken(code);
    /**
     * 保存token
     */
    this.cache.set(token.openid, token);
    /**
     * 获取用户信息
     */
    return await this.getUser(token.openid);
  }

  async _getUser(openid: string, accessToken: string) {
    const url = "https://api.weixin.qq.com/sns/userinfo";
    const info = {
      access_token: accessToken,
      openid: openid,
      lang: "en"
    };
    const args = {
      data: info,
      dataType: "json"
    };
    return await this.request(url, args);
  }

  private isValid(data: AccessToken) {
    return (
      !!data.access_token &&
      new Date().getTime() < data.create_at + data.expires_in * 1000
    );
  }

  getAuthorizeURL(
    redirect: string,
    scope: string = "snsapi_base",
    state: string = ""
  ): string {
    const url = "https://open.weixin.qq.com/connect/oauth2/authorize";
    const info = {
      appid: this.appid,
      redirect_uri: redirect,
      response_type: "code",
      scope: scope,
      state: state
    };
    return url + "?" + querystring.stringify(info) + "#wechat_redirect";
  }

  getAuthorizeURLForWebsite(
    redirect: string,
    scope: string = "snsapi_login",
    state: string = ""
  ): string {
    const url = "https://open.weixin.qq.com/connect/qrconnect";
    const info = {
      appid: this.appid,
      redirect_uri: redirect,
      response_type: "code",
      scope: scope,
      state: state
    };
    return url + "?" + querystring.stringify(info) + "#wechat_redirect";
  }

  async getAccessToken(code: string): Promise<AccessToken> {
    const url = "https://api.weixin.qq.com/sns/oauth2/access_token";
    const info = {
      appid: this.appid,
      secret: this.appsecret,
      code: code,
      grant_type: "authorization_code"
    };
    const args = {
      data: info,
      dataType: "json"
    };
    return await this.request(url, args);
  }

  async refreshAccessToken(refreshToken: string): Promise<AccessToken> {
    const url = "https://api.weixin.qq.com/sns/oauth2/refresh_token";
    const info = {
      appid: this.appid,
      grant_type: "refresh_token",
      refresh_token: refreshToken
    };
    const args = {
      data: info,
      dataType: "json"
    };
    return await this.request<AccessToken>(url, args);
  }

  async request<T = any>(url: string, args: object): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      urllib.request<T>(url, args, (err: Error, data: T) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  }
}
