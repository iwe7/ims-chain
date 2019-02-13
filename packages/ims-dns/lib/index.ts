// dns 解析
// baidu => hash
import express = require("express");
const app = express();
import wechatRouter from "./routers/wechat";
app.use("/wechat", wechatRouter);
app.listen(4203, () => {
  console.log("start");
});
