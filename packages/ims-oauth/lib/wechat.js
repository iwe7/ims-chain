"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const querystring = require("querystring");
const urllib = require("urllib");
const base_1 = require("./base");
class ImsOauthWechat extends base_1.ImsOauth {
    constructor() {
        super(...arguments);
        this.cache = new Map();
    }
    async getUser(openid) {
        let accessToken = await this.getToken(openid);
        if (!!accessToken) {
            if (this.isValid(accessToken)) {
                return await this._getUser(openid, accessToken.access_token);
            }
            else {
                const newToken = await this.refreshAccessToken(accessToken.refresh_token);
                return await this._getUser(openid, newToken.access_token);
            }
        }
    }
    async getToken(openid) {
        if (this.cache.has(openid)) {
            return this.cache.get(openid);
        }
    }
    async getUserByCode(code) {
        const token = await this.getAccessToken(code);
        this.cache.set(token.openid, token);
        return await this.getUser(token.openid);
    }
    async _getUser(openid, accessToken) {
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
    isValid(data) {
        return (!!data.access_token &&
            new Date().getTime() < data.create_at + data.expires_in * 1000);
    }
    getAuthorizeURL(redirect, scope = "snsapi_base", state = "") {
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
    getAuthorizeURLForWebsite(redirect, scope = "snsapi_login", state = "") {
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
    async getAccessToken(code) {
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
    async refreshAccessToken(refreshToken) {
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
        return await this.request(url, args);
    }
    async request(url, args) {
        return new Promise((resolve, reject) => {
            urllib.request(url, args, (err, data) => {
                if (err)
                    return reject(err);
                resolve(data);
            });
        });
    }
}
exports.ImsOauthWechat = ImsOauthWechat;
