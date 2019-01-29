"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const ims_cloud_1 = require("ims-cloud");
const util_1 = require("./util");
let ImsCloudServerModule = class ImsCloudServerModule {
};
ImsCloudServerModule = tslib_1.__decorate([
    ims_common_1.Module({
        providers: [
            {
                provide: ims_common_1.AppInitialization,
                useFactory: async (injector) => {
                    let app = express();
                    let server = new http.Server(app);
                    app.use(bodyParser.urlencoded({ extended: true }));
                    app.use(bodyParser.json());
                    let gets = await injector.get(ims_cloud_1.Get);
                    if (gets) {
                        if (Array.isArray(gets)) {
                            gets.forEach(async (get) => {
                                let item = await get;
                                app.get(item.path, async (req, res, next) => {
                                    item &&
                                        item.handler &&
                                        res.end(await item.handler(req, res, next));
                                });
                            });
                        }
                    }
                    let routes = await injector.get(ims_cloud_1.Routes);
                    if (Array.isArray(routes)) {
                        for (let route of routes) {
                            if (Array.isArray(route)) {
                            }
                            else {
                                let hash = await route.hash;
                                app.post(`/${hash}/:method`, async (req, res, next) => {
                                    debugger;
                                    res.writeHead(200, {
                                        "Content-Type": "text/html;charset=utf-8"
                                    });
                                    let data = ``;
                                    req.on("data", chunk => {
                                        data += chunk.toString();
                                    });
                                    req.on("end", async () => {
                                        let args = [];
                                        if (data.length > 0) {
                                            let parseData = JSON.parse(data);
                                            if (Array.isArray(parseData)) {
                                                args = parseData;
                                            }
                                        }
                                        let instance = await injector.get(route);
                                        let params = req.params;
                                        if (Reflect.has(instance, params.method)) {
                                            try {
                                                console.log(args);
                                                let json = await instance[params.method](...args);
                                                res.end(util_1.toString(json));
                                                return;
                                            }
                                            catch (e) {
                                                res.end(util_1.toString({
                                                    message: e.message
                                                }));
                                                return;
                                            }
                                        }
                                        else {
                                            next();
                                        }
                                    });
                                });
                            }
                        }
                    }
                    let config = await injector.get(ims_cloud_1.Config);
                    if (!config)
                        config = { port: 4802, host: "192.168.1.101" };
                    server.listen(config.port, (err) => {
                        if (err)
                            throw err;
                        console.log(`app start at http://${config.host || "localhost"}:${config.port ||
                            "4200"}`);
                    });
                    return server;
                }
            }
        ]
    })
], ImsCloudServerModule);
exports.ImsCloudServerModule = ImsCloudServerModule;
