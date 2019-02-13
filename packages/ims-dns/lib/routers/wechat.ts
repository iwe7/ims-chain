import { Router } from "express";
import { ImsOauthWechat } from "ims-oauth";
/**
 * mobile
 */
const router = Router();
/**
 * 获取Openid
 */
router.get("/oauth/getOpenid", () => {});
/**
 * 获取用户消息
 */
router.get("/oauth/userInfo", () => {});

router.get("/oauth/:appid?", async (req, res) => {
  let { appid, appsecret } = req.params;
  const query = req.query;
  const { code } = query;
  appid = appid || "wx6e41c8b66a4a3cf1";
  appsecret = appsecret || "3424388c2f56020bb28fc87e75ab0c74";
  const wechat = new ImsOauthWechat(appid, appsecret);
  if (!!code) {
    const userInfo = await wechat.getUserByCode(code);
    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    res.end(JSON.stringify(userInfo));
  } else {
    const url = wechat.getAuthorizeURL(
      `http://im.meepo.com.cn/wechat/oauth/${appid}`,
      "snsapi_userinfo"
    );
    res.redirect(url);
  }
});

export default router;
