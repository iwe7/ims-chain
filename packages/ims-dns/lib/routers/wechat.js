"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ims_oauth_1 = require("ims-oauth");
const router = express_1.Router();
router.get("/oauth/getOpenid", () => { });
router.get("/oauth/userInfo", () => { });
router.get("/oauth/:appid?", async (req, res) => {
    let { appid, appsecret } = req.params;
    const query = req.query;
    const { code } = query;
    appid = appid || "wx6e41c8b66a4a3cf1";
    appsecret = appsecret || "3424388c2f56020bb28fc87e75ab0c74";
    const wechat = new ims_oauth_1.ImsOauthWechat(appid, appsecret);
    if (!!code) {
        const userInfo = await wechat.getUserByCode(code);
        res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
        res.end(JSON.stringify(userInfo));
    }
    else {
        const url = wechat.getAuthorizeURL(`http://im.meepo.com.cn/wechat/oauth/${appid}`, "snsapi_userinfo");
        res.redirect(url);
    }
});
exports.default = router;
