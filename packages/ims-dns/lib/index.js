"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const wechat_1 = require("./routers/wechat");
app.use("/wechat", wechat_1.default);
app.listen(4203, () => {
    console.log("start");
});
