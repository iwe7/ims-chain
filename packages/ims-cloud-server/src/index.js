"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
const express = require("express");
const ims_cloud_1 = require("ims-cloud");
const util_1 = require("./util");
function get(key, obj) {
    let keys = key.split(".");
    let instance = obj;
    if (keys.length === 1) {
        return {
            value: obj[keys[0]],
            instance
        };
    }
    else {
        let _keys = keys.reverse();
        let key = _keys.pop();
        while (_keys.length > 0) {
            obj = obj[key];
            instance = obj;
            key = _keys.pop();
        }
        obj = obj[key];
        return { value: obj, instance };
    }
}
let ImsCloudServerModule = class ImsCloudServerModule {
};
ImsCloudServerModule = tslib_1.__decorate([
    ims_common_1.Module({
        providers: [
            {
                provide: ims_cloud_1.Router,
                useFactory: async (injector) => {
                    let router = express.Router();
                    let routes = await injector.get(ims_cloud_1.Routes);
                    if (Array.isArray(routes)) {
                        for (let route of routes) {
                            if (Array.isArray(route)) {
                            }
                            else {
                                let hash = await route.hash;
                                router.post(`/${hash}/:method`, async (req, res, next) => {
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
                                        if (instance) {
                                            try {
                                                const method = get(params.method, instance);
                                                let json = await method.value.bind(method.instance)(...args);
                                                res.end(util_1.toString(json));
                                                return;
                                            }
                                            catch (e) {
                                                let err = e;
                                                res.end(util_1.toString({
                                                    message: err.message,
                                                    name: err.name,
                                                    stack: err.stack
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
                    return router;
                }
            }
        ]
    })
], ImsCloudServerModule);
exports.ImsCloudServerModule = ImsCloudServerModule;
