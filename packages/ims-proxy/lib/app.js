"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
function server(options) {
    const { app, httpPort, httpsPort } = options;
    const httpPromise = new Promise((resolve, reject) => {
        http.createServer(app).listen(httpPort, (err) => {
            if (err)
                return reject(err);
            console.log(`http start at ${httpPort}`);
            resolve();
        });
    });
    const httpsPromise = new Promise((resolve, reject) => {
        https
            .createServer({
            key: fs.readFileSync(path.join(process.cwd(), "certs/1792891_fs.meepo.com.cn.key")),
            cert: fs.readFileSync(path.join(process.cwd(), "certs/1792891_fs.meepo.com.cn.pem"))
        }, app)
            .listen(httpsPort, (err) => {
            if (err)
                return reject(err);
            console.log(`https start at ${httpsPort}`);
            resolve();
        });
    });
    return Promise.all([httpPromise, httpsPromise]);
}
exports.server = server;
